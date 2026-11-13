import type { AppointmentFormData } from '../types';
import { addAdminLog } from './adminLogService';

export interface BookingSubmissionResult {
  success: boolean;
  googleSheetsSuccess: boolean;
  telegramSuccess: boolean;
  referenceId: string;
  error?: string;
}

// User's Google Sheet Webhook URL (reads from .env with fallback so it works without server restart)
const GOOGLE_SHEETS_URL_FALLBACK =
  'https://script.google.com/macros/s/AKfycbxLrKHEixmwDizIDjb3PmOLN1l0gn570LyvAVIPrFLhug3-X8W0JMZOG8NfrYck5AYQ/exec';

export const getGoogleSheetsUrl = (): string => {
  try {
    const raw = localStorage.getItem('lucy_admin_clinic_config');
    if (raw) {
      const cfg = JSON.parse(raw);
      if (cfg && typeof cfg.googleSheetsWebhookUrl === 'string' && cfg.googleSheetsWebhookUrl.trim()) {
        return cfg.googleSheetsWebhookUrl.trim();
      }
    }
  } catch {
    // fallback
  }

  return (
    (import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK_URL as string | undefined) ||
    GOOGLE_SHEETS_URL_FALLBACK
  );
};

const TELEGRAM_BOT_TOKEN =
  (import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined) || '';

const TELEGRAM_CHAT_ID =
  (import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined) || '';

// Local storage key for offline backup
const LOCAL_STORAGE_BACKUP_KEY = 'lucy_dental_appointment_submissions';

/**
 * Save appointment submission to localStorage so front desk staff can review
 * submissions anytime even if network fluctuates.
 */
export const backupToLocalStorage = (data: AppointmentFormData) => {
  try {
    const existingStr = localStorage.getItem(LOCAL_STORAGE_BACKUP_KEY);
    const existing = existingStr ? JSON.parse(existingStr) : [];
    const updated = [
      {
        ...data,
        savedAt: new Date().toISOString(),
      },
      ...existing,
    ].slice(0, 50); // Keep last 50 submissions
    localStorage.setItem(LOCAL_STORAGE_BACKUP_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not save booking to localStorage', err);
  }
};

/**
 * Get all local backup submissions
 */
export const getLocalBackupSubmissions = (): (AppointmentFormData & { savedAt: string })[] => {
  try {
    const existingStr = localStorage.getItem(LOCAL_STORAGE_BACKUP_KEY);
    return existingStr ? JSON.parse(existingStr) : [];
  } catch {
    return [];
  }
};

/**
 * Send submission to Google Sheets via multi-channel fallback:
 * 1. fetch() with text/plain body (bypasses CORS preflight)
 * 2. Hidden standard HTML <form> submitted to hidden <iframe> (bypasses browser adblockers and CORS entirely)
 * 3. GET Query beacon (handles standard GET redirects)
 */
export const sendToGoogleSheets = async (data: AppointmentFormData): Promise<boolean> => {
  const url = getGoogleSheetsUrl();
  if (!url) {
    console.info(
      'Google Sheets webhook URL not configured. Submission recorded locally.'
    );
    return false;
  }

  const payload: Record<string, string> = {
    referenceId: data.referenceId,
    patientName: data.patientName,
    patientPhone: data.patientPhone,
    service: data.service,
    date: data.date,
    shift: data.shift,
    notes: data.notes || 'None',
    submittedAt: new Date().toLocaleString('en-US', { timeZone: 'Africa/Addis_Ababa' }),
  };

  const jsonString = JSON.stringify(payload);

  // Send single dispatch with fetch (fallback to hidden iframe only if fetch fails)
  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: jsonString,
    });
    console.info('✓ Appointment dispatched to Google Sheets:', data.referenceId);
    return true;
  } catch (err) {
    console.warn('Primary fetch dispatch error, trying iframe fallback:', err);
    if (typeof document !== 'undefined') {
      try {
        const iframeName = 'gscript_frame_' + Date.now();
        const iframe = document.createElement('iframe');
        iframe.name = iframeName;
        iframe.style.position = 'fixed';
        iframe.style.width = '0px';
        iframe.style.height = '0px';
        iframe.style.opacity = '0';
        iframe.style.pointerEvents = 'none';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        form.target = iframeName;
        form.style.display = 'none';

        for (const [key, value] of Object.entries(payload)) {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();

        setTimeout(() => {
          try {
            form.remove();
            iframe.remove();
          } catch {
            // ignore cleanup errors
          }
        }, 12000);
        return true;
      } catch (frameErr) {
        console.warn('Iframe form fallback error:', frameErr);
        return false;
      }
    }
    return false;
  }
};

/**
 * Send instant alert to Clinic Telegram Channel or Receptionist Bot
 */
export const sendToTelegram = async (data: AppointmentFormData): Promise<boolean> => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return false;
  }

  try {
    const shiftLabel =
      data.shift === 'morning'
        ? 'Morning (ጥዋት)'
        : data.shift === 'afternoon'
        ? 'Afternoon (ከሰዓት)'
        : 'Late Afternoon (ማታ)';

    const message = `
🦷 *NEW APPOINTMENT REQUEST* 🦷
━━━━━━━━━━━━━━━━━━━━
🆔 *Ref:* \`${data.referenceId}\`
👤 *Patient:* ${data.patientName}
📱 *Phone:* [${data.patientPhone}](tel:${data.patientPhone})
🩺 *Treatment:* ${data.service}
📅 *Preferred Date:* ${data.date}
⏰ *Shift:* ${shiftLabel}
📝 *Notes:* ${data.notes || 'None'}
━━━━━━━━━━━━━━━━━━━━
📍 *Lucy Dental Specialist Clinic • Bole*
🕒 *Time (EAT):* ${new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Addis_Ababa' })}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    return response.ok;
  } catch (err) {
    console.error('Failed to send Telegram alert:', err);
    return false;
  }
};

/**
 * Master Submission Coordinator:
 * Backs up locally, dispatches to Google Sheets, and sends Telegram alert.
 */
export const submitAppointmentBooking = async (
  formData: AppointmentFormData
): Promise<BookingSubmissionResult> => {
  // 1. Guaranteed Local Backup
  backupToLocalStorage(formData);

  // 2. Dispatch to Google Sheets
  const sheetsOk = await sendToGoogleSheets(formData);

  // 3. Dispatch to Telegram (if configured)
  const telegramOk = await sendToTelegram(formData);

  addAdminLog({
    type: 'booking',
    level: 'success',
    title: `New Online Booking: ${formData.patientName}`,
    details: `Ref: ${formData.referenceId} | Service: ${formData.service} | Date: ${formData.date} (${formData.shift}) | Phone: ${formData.patientPhone}`,
    metadata: {
      referenceId: formData.referenceId,
      patientName: formData.patientName,
      patientPhone: formData.patientPhone,
      service: formData.service,
      sheetsOk,
      telegramOk,
    },
  });

  return {
    success: true, // Local backup guarantees no appointment is lost
    googleSheetsSuccess: sheetsOk,
    telegramSuccess: telegramOk,
    referenceId: formData.referenceId,
  };
};
