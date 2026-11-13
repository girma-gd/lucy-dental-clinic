const ADMIN_LOGS_KEY = 'lucy_admin_activity_logs';
const MAX_LOGS = 200;

export interface AdminLogEvent {
  id: string;
  timestamp: string; // ISO string
  type: 'booking' | 'sync' | 'status_change' | 'blog' | 'gallery' | 'config' | 'auth';
  level: 'info' | 'success' | 'warning' | 'error';
  title: string;
  details?: string;
  metadata?: Record<string, unknown>;
}

export const getAdminLogs = (): AdminLogEvent[] => {
  try {
    const raw = localStorage.getItem(ADMIN_LOGS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Failed to parse admin logs:', err);
    return [];
  }
};

export const addAdminLog = (
  event: Omit<AdminLogEvent, 'id' | 'timestamp'> & { timestamp?: string }
): AdminLogEvent => {
  const newLog: AdminLogEvent = {
    id: 'log_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    timestamp: event.timestamp || new Date().toISOString(),
    ...event,
  };

  try {
    const existing = getAdminLogs();
    const updated = [newLog, ...existing].slice(0, MAX_LOGS);
    localStorage.setItem(ADMIN_LOGS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('lucy_logs_updated'));
  } catch (err) {
    console.warn('Could not persist admin log:', err);
  }

  // Also output to dev console with pretty prefix
  const style =
    event.level === 'error'
      ? 'color: #ef4444; font-weight: bold;'
      : event.level === 'warning'
      ? 'color: #f59e0b; font-weight: bold;'
      : event.level === 'success'
      ? 'color: #10b981; font-weight: bold;'
      : 'color: #0d9488; font-weight: bold;';

  console.log(`%c[Lucy Event Log] ${event.title}`, style, {
    type: event.type,
    details: event.details,
    metadata: event.metadata,
    time: newLog.timestamp,
  });

  return newLog;
};

export const clearAdminLogs = (): void => {
  try {
    localStorage.removeItem(ADMIN_LOGS_KEY);
    window.dispatchEvent(new Event('lucy_logs_updated'));
  } catch (err) {
    console.warn('Failed to clear admin logs:', err);
  }
};

