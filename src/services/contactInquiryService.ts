import { getGoogleSheetsUrl } from './bookingNotificationService';
import { addAdminLog } from './adminLogService';

export interface ContactInquiryData {
  inquiryId: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  status?: 'Unread' | 'Contacted' | 'Resolved';
  submittedAt?: string;
  rowNumber?: number;
}

const INQUIRIES_STORAGE_KEY = 'lucy_dental_contact_inquiries';
const TELEGRAM_BOT_TOKEN = (import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string | undefined) || '';
const TELEGRAM_CHAT_ID = (import.meta.env.VITE_TELEGRAM_CHAT_ID as string | undefined) || '';

export const getStoredInquiries = (): ContactInquiryData[] => {
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Failed to parse inquiries:', err);
    return [];
  }
};

export const backupInquiryToLocalStorage = (inquiry: ContactInquiryData): void => {
  try {
    const existing = getStoredInquiries();
    const updated = [
      {
        ...inquiry,
        status: inquiry.status || 'Unread',
        submittedAt: inquiry.submittedAt || new Date().toISOString(),
      },
      ...existing.filter((item) => item.inquiryId !== inquiry.inquiryId),
    ].slice(0, 100);
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('lucy_inquiries_updated'));
  } catch (err) {
    console.warn('Failed to save inquiry to localStorage', err);
  }
};

export const updateInquiryStatus = async (
  inquiryId: string,
  newStatus: 'Unread' | 'Contacted' | 'Resolved'
): Promise<{ success: boolean; sheetUpdated: boolean }> => {
  try {
    const list = getStoredInquiries();
    const target = list.find((i) => i.inquiryId === inquiryId);
    const updated = list.map((i) =>
      i.inquiryId === inquiryId ? { ...i, status: newStatus } : i
    );
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('lucy_inquiries_updated'));

    let sheetUpdated = false;
    try {
      const targetUrl = getGoogleSheetsUrl();
      const params = new URLSearchParams({
        action: 'updateInquiryStatus',
        inquiryId: inquiryId,
        status: newStatus,
        _t: String(Date.now()),
      });
      if (target?.rowNumber) {
        params.append('rowNumber', String(target.rowNumber));
      }

      const url = `${targetUrl}${targetUrl.includes('?') ? '&' : '?'}${params.toString()}`;
      const res = await fetch(url, { method: 'GET', mode: 'cors' });
      if (res.ok) {
        const json = await res.json();
        if (json && json.success) sheetUpdated = true;
      }
    } catch (netErr) {
      console.warn('Google Sheet background inquiry update notice:', netErr);
    }

    addAdminLog({
      type: 'status_change',
      level: 'info',
      title: `Inquiry Status: ${target?.name || inquiryId}`,
      details: `Inquiry ${inquiryId} marked as "${newStatus}". Synced to Google Sheet: ${sheetUpdated ? 'Yes' : 'Local only'}.`,
    });

    return { success: true, sheetUpdated };
  } catch (err) {
    console.error('Failed to update inquiry status', err);
    return { success: false, sheetUpdated: false };
  }
};

const sendInquiryToTelegram = async (data: ContactInquiryData): Promise<boolean> => {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return false;

  try {
    const message = `
📩 *NEW CONTACT INQUIRY / QUESTION* 📩
━━━━━━━━━━━━━━━━━━━━
🆔 *ID:* \`${data.inquiryId}\`
👤 *Sender:* ${data.name}
📱 *Phone:* [${data.phone}](tel:${data.phone})
📧 *Email:* ${data.email || 'N/A'}
📑 *Subject:* ${data.subject}
💬 *Message:*
${data.message}
━━━━━━━━━━━━━━━━━━━━
📍 *Lucy Dental Specialist Clinic • Bole*
🕒 *Time (EAT):* ${new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Addis_Ababa' })}
    `.trim();

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown',
        }),
      }
    );

    return response.ok;
  } catch (err) {
    console.warn('Failed to dispatch inquiry telegram alert:', err);
    return false;
  }
};

export const submitContactInquiry = async (
  inquiry: ContactInquiryData
): Promise<{ success: boolean; googleSheetsSuccess: boolean }> => {
  // 1. Guaranteed Local Backup
  backupInquiryToLocalStorage(inquiry);

  // 2. Dispatch to Google Sheets "Inquiries" sheet
  const url = getGoogleSheetsUrl();
  let sheetsOk = false;

  if (url) {
    const payload = {
      action: 'submitInquiry',
      type: 'inquiry',
      inquiryId: inquiry.inquiryId,
      name: inquiry.name,
      phone: inquiry.phone,
      email: inquiry.email || 'N/A',
      subject: inquiry.subject,
      message: inquiry.message,
      submittedAt: new Date().toLocaleString('en-US', { timeZone: 'Africa/Addis_Ababa' }),
    };

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      sheetsOk = true;
      console.info('✓ Inquiry dispatched to Google Sheets "Inquiries" tab:', inquiry.inquiryId);
    } catch (err) {
      console.warn('Primary fetch dispatch error for inquiry, using iframe fallback:', err);
      if (typeof document !== 'undefined') {
        try {
          const iframeName = 'inquiry_frame_' + Date.now();
          const iframe = document.createElement('iframe');
          iframe.name = iframeName;
          iframe.style.display = 'none';
          document.body.appendChild(iframe);

          const form = document.createElement('form');
          form.method = 'POST';
          form.action = url;
          form.target = iframeName;
          form.style.display = 'none';

          for (const [k, v] of Object.entries(payload)) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = k;
            input.value = String(v);
            form.appendChild(input);
          }

          document.body.appendChild(form);
          form.submit();
          sheetsOk = true;

          setTimeout(() => {
            try {
              form.remove();
              iframe.remove();
            } catch {
              // ignore
            }
          }, 10000);
        } catch (frameErr) {
          console.warn('Iframe form fallback error for inquiry:', frameErr);
        }
      }
    }
  }

  // 3. Dispatch to Telegram
  sendInquiryToTelegram(inquiry).catch(() => {});

  // 4. Audit Log
  addAdminLog({
    type: 'booking',
    level: 'info',
    title: `Inquiry Received: ${inquiry.name}`,
    details: `Topic: "${inquiry.subject}" | ID: ${inquiry.inquiryId} | Phone: ${inquiry.phone}. Sent to "Inquiries" sheet.`,
    metadata: {
      inquiryId: inquiry.inquiryId,
      name: inquiry.name,
      subject: inquiry.subject,
      phone: inquiry.phone,
      sheetsOk,
    },
  });

  return { success: true, googleSheetsSuccess: sheetsOk };
};

export const syncInquiriesFromGoogleSheet = async (): Promise<{
  success: boolean;
  count: number;
  message?: string;
}> => {
  const url = getGoogleSheetsUrl();
  if (!url) return { success: false, count: 0, message: 'Google Sheets URL not configured' };

  try {
    const fetchUrl = `${url}${url.includes('?') ? '&' : '?'}action=readInquiries&_t=${Date.now()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const res = await fetch(fetchUrl, {
      method: 'GET',
      mode: 'cors',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.inquiries)) {
        const existing = getStoredInquiries();
        const existingMap = new Map<string, ContactInquiryData>();

        existing.forEach((item) => {
          if (item.inquiryId) existingMap.set(item.inquiryId, item);
        });

        data.inquiries.forEach((item: ContactInquiryData) => {
          if (item.inquiryId) {
            existingMap.set(item.inquiryId, item);
          }
        });

        const merged = Array.from(existingMap.values());
        localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(merged));
        window.dispatchEvent(new Event('lucy_inquiries_updated'));

        addAdminLog({
          type: 'sync',
          level: 'success',
          title: 'Google Sheet Inquiries Synced',
          details: `Synchronized ${data.inquiries.length} inquiry record(s) from "Inquiries" sheet tab.`,
        });

        return { success: true, count: data.inquiries.length };
      }
    }
  } catch (err) {
    console.warn('Failed to sync inquiries from Google Sheet:', err);
  }

  return { success: false, count: 0, message: 'Could not fetch inquiries tab from Google Sheets' };
};

