import { blogPosts as initialBlogPosts, type BlogPost } from '../data/blogData';
import { transformationsData as initialTransformations, type TransformationCase } from '../data/transformationsData';
import { getLocalBackupSubmissions } from './bookingNotificationService';
import { addAdminLog } from './adminLogService';

const BLOG_STORAGE_KEY = 'lucy_admin_blog_posts';
const GALLERY_STORAGE_KEY = 'lucy_admin_gallery_cases';
const BOOKINGS_STORAGE_KEY = 'lucy_dental_appointment_submissions';
const CLINIC_CONFIG_KEY = 'lucy_admin_clinic_config';
const ADMIN_AUTH_KEY = 'lucy_admin_auth_token';

const GOOGLE_SHEETS_URL_FALLBACK =
  'https://script.google.com/macros/s/AKfycbxLrKHEixmwDizIDjb3PmOLN1l0gn570LyvAVIPrFLhug3-X8W0JMZOG8NfrYck5AYQ/exec';

export const getGoogleSheetsUrl = (): string => {
  try {
    const raw = localStorage.getItem(CLINIC_CONFIG_KEY);
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

export interface ClinicConfig {
  emergencyActive: boolean;
  emergencyPhone: string;
  emergencyLandline: string;
  emergencyBannerTextEn: string;
  emergencyBannerTextAm: string;
  workingHoursEn: string;
  workingHoursAm: string;
  adminPasscode: string;
  googleSheetsWebhookUrl?: string;
}

export const defaultClinicConfig: ClinicConfig = {
  emergencyActive: true,
  emergencyPhone: '+251 911 234 567',
  emergencyLandline: '+251 116 182 020',
  emergencyBannerTextEn: 'Suffering from Acute Tooth Pain or Dental Trauma? Our emergency dentists in Bole provide immediate triage.',
  emergencyBannerTextAm: 'ከፍተኛ የጥርስ ህመም ወይም አደጋ አጋጥሞዎታል? በቦሌ የድንገተኛ የጥርስ ሐኪሞቻችን አፋጣኝ ህክምና ይሰጣሉ።',
  workingHoursEn: 'Mon - Sat: 8:30 AM - 7:00 PM | Sun: 9:00 AM - 1:00 PM',
  workingHoursAm: 'ከሰኞ - ቅዳሜ፡ 2:30 ጥዋት - 1:00 ማታ | እሑድ፡ 3:00 ጥዋት - 7:00 ከሰዓት',
  adminPasscode: 'lucy2026',
  googleSheetsWebhookUrl: GOOGLE_SHEETS_URL_FALLBACK,
};

// ==========================================
// 1. BLOG POSTS CRUD
// ==========================================

export const getStoredBlogPosts = (): BlogPost[] => {
  try {
    const raw = localStorage.getItem(BLOG_STORAGE_KEY);
    if (!raw) return initialBlogPosts;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialBlogPosts;
  } catch {
    return initialBlogPosts;
  }
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  const posts = getStoredBlogPosts();
  return posts.find((p) => p.slug === slug || p.id === slug);
};

export const saveBlogPost = (post: BlogPost): void => {
  try {
    const current = getStoredBlogPosts();
    const existingIndex = current.findIndex((p) => p.id === post.id || p.slug === post.slug);

    let updated: BlogPost[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = post;
    } else {
      updated = [post, ...current];
    }

    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('lucy_blog_updated'));

    addAdminLog({
      type: 'blog',
      level: 'success',
      title: existingIndex >= 0 ? 'Blog Article Updated' : 'Blog Article Published',
      details: `Title: "${post.titleEn}" (/blog/${post.slug})`,
    });
  } catch (err) {
    console.error('Failed to save blog post to localStorage', err);
  }
};

export const deleteBlogPost = (id: string): void => {
  try {
    const current = getStoredBlogPosts();
    const target = current.find((p) => p.id === id || p.slug === id);
    const updated = current.filter((p) => p.id !== id && p.slug !== id);
    localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('lucy_blog_updated'));

    addAdminLog({
      type: 'blog',
      level: 'warning',
      title: 'Blog Article Deleted',
      details: `Deleted article: "${target?.titleEn || id}"`,
    });
  } catch (err) {
    console.error('Failed to delete blog post', err);
  }
};

export const resetBlogPosts = (): void => {
  localStorage.removeItem(BLOG_STORAGE_KEY);
  window.dispatchEvent(new Event('lucy_blog_updated'));

  addAdminLog({
    type: 'blog',
    level: 'info',
    title: 'Blog Articles Reset to Defaults',
    details: 'Restored original editorial dental articles.',
  });
};

// ==========================================
// 2. SMILE GALLERY / BEFORE & AFTER CRUD
// ==========================================

export const getStoredGalleryCases = (): TransformationCase[] => {
  try {
    const raw = localStorage.getItem(GALLERY_STORAGE_KEY);
    if (!raw) return initialTransformations;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialTransformations;
  } catch {
    return initialTransformations;
  }
};

export const saveGalleryCase = (item: TransformationCase): void => {
  try {
    const current = getStoredGalleryCases();
    const existingIndex = current.findIndex((c) => c.id === item.id);

    let updated: TransformationCase[];
    if (existingIndex >= 0) {
      updated = [...current];
      updated[existingIndex] = item;
    } else {
      updated = [item, ...current];
    }

    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('lucy_gallery_updated'));

    addAdminLog({
      type: 'gallery',
      level: 'success',
      title: existingIndex >= 0 ? 'Smile Transformation Updated' : 'Smile Transformation Added',
      details: `Case: "${item.titleEn}" (${item.category})`,
    });
  } catch (err) {
    console.error('Failed to save gallery case', err);
  }
};

export const deleteGalleryCase = (id: string): void => {
  try {
    const current = getStoredGalleryCases();
    const target = current.find((c) => c.id === id);
    const updated = current.filter((c) => c.id !== id);
    localStorage.setItem(GALLERY_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('lucy_gallery_updated'));

    addAdminLog({
      type: 'gallery',
      level: 'warning',
      title: 'Smile Transformation Deleted',
      details: `Deleted case: "${target?.titleEn || id}"`,
    });
  } catch (err) {
    console.error('Failed to delete gallery case', err);
  }
};

export const resetGalleryCases = (): void => {
  localStorage.removeItem(GALLERY_STORAGE_KEY);
  window.dispatchEvent(new Event('lucy_gallery_updated'));

  addAdminLog({
    type: 'gallery',
    level: 'info',
    title: 'Smile Gallery Reset to Defaults',
    details: 'Restored original clinical photography cases.',
  });
};

// ==========================================
// 3. APPOINTMENTS QUEUE
// ==========================================

export interface StoredBooking {
  referenceId: string;
  sheetRefId?: string;
  rowNumber?: number;
  patientName: string;
  patientPhone: string;
  service: string;
  doctor?: string;
  date?: string;
  shift?: string;
  notes?: string;
  status?: 'Pending Review' | 'Confirmed' | 'Completed' | 'Cancelled';
  savedAt: string;
}

export const getStoredBookings = (): StoredBooking[] => {
  const localList = getLocalBackupSubmissions();
  if (localList && localList.length > 0) {
    return localList
      .filter(
        (item) =>
          !(item.referenceId && item.referenceId.startsWith('INQ-')) &&
          !(item.service && item.service.startsWith('Inquiry:'))
      )
      .map((item) => ({
        referenceId: item.referenceId,
        sheetRefId: (item as unknown as { sheetRefId?: string }).sheetRefId,
        rowNumber: (item as unknown as { rowNumber?: number }).rowNumber,
        patientName: item.patientName || (item as unknown as { fullName?: string }).fullName || 'Patient',
        patientPhone: item.patientPhone || (item as unknown as { phone?: string }).phone || '',
        service: item.service,
        doctor: (item as unknown as { doctor?: string }).doctor,
        date: item.date || (item as unknown as { preferredDate?: string }).preferredDate,
        shift: item.shift,
        notes: item.notes,
        status: (item as unknown as { status?: StoredBooking['status'] }).status || 'Pending Review',
        savedAt: item.savedAt,
      }));
  }

  // Real data only: no fake mock samples
  return [];
};

export const updateBookingStatus = async (
  referenceId: string,
  newStatus: 'Pending Review' | 'Confirmed' | 'Completed' | 'Cancelled'
): Promise<{ success: boolean; sheetUpdated: boolean }> => {
  try {
    const list = getStoredBookings();
    const target = list.find(
      (b) => b.referenceId === referenceId || (b as { id?: string }).id === referenceId
    );

    const updated = list.map((b) =>
      b.referenceId === referenceId || (b as { id?: string }).id === referenceId
        ? { ...b, status: newStatus }
        : b
    );
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('lucy_bookings_updated'));

    let sheetUpdated = false;

    // Send status update directly to Google Sheets using exact reference or row
    try {
      const targetUrl = getGoogleSheetsUrl();
      const sendRefId = target?.sheetRefId || referenceId;
      const params = new URLSearchParams({
        action: 'updateStatus',
        referenceId: sendRefId,
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
        if (json && json.success) {
          sheetUpdated = true;
        }
      }
    } catch (netErr) {
      console.warn('Google Sheet background status update notice:', netErr);
    }

    addAdminLog({
      type: 'status_change',
      level: sheetUpdated ? 'success' : 'info',
      title: `Status Changed: ${target?.patientName || referenceId}`,
      details: `Appointment ${referenceId} updated to "${newStatus}". Synced to Google Sheet: ${sheetUpdated ? 'Yes' : 'Local only'}.`,
      metadata: { referenceId, newStatus, sheetUpdated },
    });

    return { success: true, sheetUpdated };
  } catch (err) {
    console.error('Failed to update booking status', err);
    addAdminLog({
      type: 'status_change',
      level: 'error',
      title: `Failed to Change Status for ${referenceId}`,
      details: String(err),
    });
    return { success: false, sheetUpdated: false };
  }
};

/**
 * Helper to process, sanitize and merge appointments into localStorage
 */
const processAndStoreAppointments = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  appointments: any[]
): { success: boolean; count: number; message?: string } => {
  const existing = getStoredBookings();
  const existingMap = new Map<string, StoredBooking>();

  existing.forEach((b) => {
    if (b.referenceId) existingMap.set(b.referenceId, b);
  });

  appointments
    .filter(
      (item) =>
        !(item.referenceId && String(item.referenceId).startsWith('INQ-')) &&
        !(item.service && String(item.service).startsWith('Inquiry:'))
    )
    .forEach((item, idx) => {
    let refId = item.referenceId ? String(item.referenceId).trim() : '';
    let extractedDate = item.date ? String(item.date).trim() : '';
    const patientPhone = item.patientPhone || item.phone || '';
    const patientName = item.patientName || item.fullName || 'Patient';

    // If Google Sheet row has a Date string or missing value in the Reference ID cell (e.g. older legacy rows before Reference ID column was added)
    const isDateOrInvalidRef =
      !refId ||
      refId.includes('GMT') ||
      refId.includes('00:00') ||
      /^[A-Za-z]{3}\s[A-Za-z]{3}/.test(refId) ||
      refId.startsWith('LUCY-100');

    if (isDateOrInvalidRef) {
      if (!extractedDate && refId && !refId.startsWith('LUCY-100')) {
        try {
          const d = new Date(refId);
          if (!isNaN(d.getTime())) {
            extractedDate = d.toISOString().split('T')[0];
          }
        } catch {
          // ignore date parse error
        }
      }

      // Check if existing local bookings has this patient's actual LUCY-2026-XXXX ID
      const cleanPhone = patientPhone.replace(/\D/g, '');
      const localMatch = existing.find(
        (b) =>
          b.referenceId &&
          !b.referenceId.startsWith('LUCY-100') &&
          ((cleanPhone.length >= 8 && b.patientPhone && b.patientPhone.replace(/\D/g, '').includes(cleanPhone)) ||
            (patientName && patientName !== 'Patient' && b.patientName.toLowerCase().trim() === patientName.toLowerCase().trim()))
      );

      if (localMatch && localMatch.referenceId) {
        refId = localMatch.referenceId;
      } else {
        refId = `LUCY-2026-${item.rowNumber ? 1000 + item.rowNumber : 5000 + idx}`;
      }
    }

    const rawRef = item.referenceId ? String(item.referenceId).trim() : '';

    const normalized: StoredBooking = {
      referenceId: refId,
      sheetRefId: rawRef || refId,
      rowNumber: item.rowNumber,
      patientName,
      patientPhone,
      service: item.service || 'General Dentistry',
      doctor: item.doctor || 'Any Available Doctor',
      date: extractedDate || item.date || '',
      shift: item.shift || 'Flexible Time',
      notes: item.notes || '',
      status: item.status || 'Pending Review',
      savedAt: item.savedAt || new Date().toISOString(),
    };

    existingMap.set(refId, normalized);
  });

  const merged = Array.from(existingMap.values());
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(merged));
  window.dispatchEvent(new Event('lucy_bookings_updated'));

  addAdminLog({
    type: 'sync',
    level: 'success',
    title: 'Google Sheet Sync Completed',
    details: `Successfully fetched and synchronized ${appointments.length} appointment record(s).`,
    metadata: { count: appointments.length },
  });

  return {
    success: true,
    count: appointments.length,
  };
};

/**
 * Fallback JSONP script injector
 */
const syncWithJsonp = (
  url: string
): Promise<{ success: boolean; count: number; message?: string }> => {
  return new Promise((resolve) => {
    const callbackName = 'lucySheetCallback_' + Math.floor(Math.random() * 1000000);
    let resolved = false;

    const cleanup = () => {
      clearTimeout(timer);
      try {
        delete (window as unknown as Record<string, unknown>)[callbackName];
      } catch {
        (window as unknown as Record<string, unknown>)[callbackName] = undefined;
      }
      const existingScript = document.getElementById(callbackName);
      if (existingScript) existingScript.remove();
    };

    const timer = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve({
          success: false,
          count: 0,
          message: 'Unable to reach Google Sheet. Please check the Webhook URL in Settings.',
        });
      }
    }, 10000);

    (window as unknown as Record<string, (data: unknown) => void>)[callbackName] = (
      data: unknown
    ) => {
      if (resolved) return;
      resolved = true;
      cleanup();

      const resp = data as {
        success?: boolean;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        appointments?: any[];
        error?: string;
      };

      if (resp && resp.success && Array.isArray(resp.appointments)) {
        resolve(processAndStoreAppointments(resp.appointments));
      } else {
        resolve({
          success: false,
          count: 0,
          message: resp?.error || 'No appointment records returned from Google Sheet',
        });
      }
    };

    const script = document.createElement('script');
    script.id = callbackName;
    script.src = `${url}${url.includes('?') ? '&' : '?'}action=read&callback=${callbackName}&_t=${Date.now()}`;
    script.onerror = () => {
      if (!resolved) {
        resolved = true;
        cleanup();
        resolve({
          success: false,
          count: 0,
          message: 'Network error connecting to Google Apps Script.',
        });
      }
    };

    document.head.appendChild(script);
  });
};

/**
 * FETCH LIVE APPOINTMENTS DIRECTLY FROM GOOGLE APPS SCRIPT WEBHOOK
 * Uses resilient dual strategy:
 * 1. Direct fetch (handles CORS-enabled Apps Script responses instantly)
 * 2. Fallback to JSONP script injection if direct fetch encounters strict origin issues
 */
export const syncAppointmentsFromGoogleSheet = async (): Promise<{
  success: boolean;
  count: number;
  message?: string;
}> => {
  const url = getGoogleSheetsUrl();

  // Strategy 1: Direct fetch
  try {
    const fetchUrl = `${url}${url.includes('?') ? '&' : '?'}action=read&_t=${Date.now()}`;
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
      if (data && data.success && Array.isArray(data.appointments)) {
        return processAndStoreAppointments(data.appointments);
      }
      if (data && data.error) {
        return { success: false, count: 0, message: String(data.error) };
      }
    }
  } catch (err) {
    console.warn('Direct fetch attempt had an issue, trying JSONP fallback...', err);
  }

  // Strategy 2: Fallback to JSONP
  return syncWithJsonp(url);
};

export const deleteBooking = (referenceId: string): void => {
  try {
    const list = getStoredBookings();
    const target = list.find((b) => b.referenceId === referenceId);
    const updated = list.filter((b) => b.referenceId !== referenceId);
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('lucy_bookings_updated'));

    addAdminLog({
      type: 'booking',
      level: 'warning',
      title: 'Appointment Removed from Queue',
      details: `Removed record for ${target?.patientName || 'patient'} (${referenceId})`,
    });
  } catch (err) {
    console.error('Failed to delete booking', err);
  }
};

export const clearAllBookings = (): void => {
  try {
    const count = getStoredBookings().length;
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify([]));
    window.dispatchEvent(new Event('lucy_bookings_updated'));

    addAdminLog({
      type: 'booking',
      level: 'warning',
      title: 'Queue Cleared by Admin',
      details: `Cleared ${count} appointment records from the active view.`,
    });
  } catch (err) {
    console.error('Failed to clear bookings', err);
  }
};

// ==========================================
// 4. CLINIC CONFIG
// ==========================================

export const getStoredClinicConfig = (): ClinicConfig => {
  try {
    const raw = localStorage.getItem(CLINIC_CONFIG_KEY);
    if (!raw) return defaultClinicConfig;
    return { ...defaultClinicConfig, ...JSON.parse(raw) };
  } catch {
    return defaultClinicConfig;
  }
};

export const saveClinicConfig = (config: ClinicConfig): void => {
  try {
    localStorage.setItem(CLINIC_CONFIG_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event('lucy_config_updated'));

    addAdminLog({
      type: 'config',
      level: 'info',
      title: 'Clinic Settings Saved',
      details: `Emergency: ${config.emergencyActive ? 'Active' : 'Off'} (${config.emergencyPhone}), Hours: ${config.workingHoursEn}`,
    });
  } catch (err) {
    console.error('Failed to save clinic config', err);
  }
};

// ==========================================
// 5. ADMIN AUTHENTICATION
// ==========================================

export const checkAdminAuth = (): boolean => {
  try {
    const token = localStorage.getItem(ADMIN_AUTH_KEY) || sessionStorage.getItem(ADMIN_AUTH_KEY);
    return token === 'authenticated_lucy_admin';
  } catch {
    return false;
  }
};

export const setAdminAuth = (remember: boolean): void => {
  if (remember) {
    localStorage.setItem(ADMIN_AUTH_KEY, 'authenticated_lucy_admin');
  } else {
    sessionStorage.setItem(ADMIN_AUTH_KEY, 'authenticated_lucy_admin');
  }

  addAdminLog({
    type: 'auth',
    level: 'info',
    title: 'Admin Session Login',
    details: 'Master passcode verified. Access granted to Admin Portal.',
  });
};

export const clearAdminAuth = (): void => {
  localStorage.removeItem(ADMIN_AUTH_KEY);
  sessionStorage.removeItem(ADMIN_AUTH_KEY);

  addAdminLog({
    type: 'auth',
    level: 'info',
    title: 'Admin Logged Out',
    details: 'Admin logged out of the session.',
  });
};
