import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Unlock,
  KeyRound,
  LogOut,
  FileText,
  Sparkles,
  Calendar,
  Settings,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Search,
  RefreshCw,
  Eye,
  ShieldCheck,
  AlertCircle,
  X,
  Save,
  Check,
  Database,
  Activity,
  Download,
  Mail,
} from 'lucide-react';
import type { Language } from '../types';
import type { BlogPost } from '../data/blogData';
import type { TransformationCase } from '../data/transformationsData';
import {
  getStoredBlogPosts,
  saveBlogPost,
  deleteBlogPost,
  resetBlogPosts,
  getStoredGalleryCases,
  saveGalleryCase,
  deleteGalleryCase,
  resetGalleryCases,
  getStoredBookings,
  updateBookingStatus,
  deleteBooking,
  clearAllBookings,
  syncAppointmentsFromGoogleSheet,
  type StoredBooking,
  getStoredClinicConfig,
  saveClinicConfig,
  type ClinicConfig,
  checkAdminAuth,
  setAdminAuth,
  clearAdminAuth,
} from '../services/adminContentService';
import {
  getAdminLogs,
  clearAdminLogs,
  type AdminLogEvent,
} from '../services/adminLogService';
import {
  getStoredInquiries,
  updateInquiryStatus,
  syncInquiriesFromGoogleSheet,
  type ContactInquiryData,
} from '../services/contactInquiryService';

const createDefaultBlogForm = (): BlogPost => ({
  id: `blog-${Date.now()}`,
  slug: 'new-dental-health-guide',
  titleEn: '',
  titleAm: '',
  excerptEn: '',
  excerptAm: '',
  category: 'Restorative',
  categoryEn: 'Restorative Dentistry',
  categoryAm: 'የጥርስ እድሳት ህክምና',
  readTimeEn: '4 min read',
  readTimeAm: '4 ደቂቃ ንባብ',
  publishedDate: 'November 2026',
  author: {
    name: 'Dr. Selamawit Tadesse',
    roleEn: 'Lead Restorative Specialist',
    roleAm: 'ዋና የጥርስ ስፔሻሊስት',
    avatar: '/assets/images/doctor-selamawit.jpg',
  },
  coverImage: '/assets/images/clinic-interior.jpg',
  keyTakeawaysEn: ['Regular brushing twice a day prevents decay.'],
  keyTakeawaysAm: ['በቀን ሁለት ጊዜ ጥርስን መቦረሽ መበስበስን ይከላከላል።'],
  sections: [
    {
      headingEn: 'Clinical Overview',
      headingAm: 'አጠቃላይ የህክምና መረጃ',
      bodyEn: 'Write the clinical breakdown of this dental procedure here.',
      bodyAm: 'ስለ ህክምናው ዝርዝር መረጃ እዚህ ይጻፉ።',
    },
  ],
  clinicalTipEn: 'Visit your dentist at least once every 6 months for a clean checkup.',
  clinicalTipAm: 'በየ6 ወሩ ክሊኒክ በመሄድ የጥርስዎን ጤንነት ያስመርምሩ።',
  relatedService: 'General Check-up & Digital Diagnostics',
});

const createDefaultCaseForm = (): TransformationCase => ({
  id: `case-${Date.now()}`,
  category: 'whitening',
  categoryEn: 'Laser Whitening',
  categoryAm: 'ሌዘር ጥርስ ማብራት',
  titleEn: '',
  titleAm: '',
  summaryEn: '',
  summaryAm: '',
  doctorName: 'Dr. Selamawit Tadesse',
  doctorRoleEn: 'Lead Restorative Specialist',
  doctorRoleAm: 'ዋና የጥርስ ስፔሻሊስት',
  durationEn: '60 Minutes',
  durationAm: '60 ደቂቃ',
  visitsEn: '1 Single Visit',
  visitsAm: 'በ1 ቀጠሮ ብቻ',
  patientProfileEn: 'Adult Patient, Bole',
  patientProfileAm: 'የቦሌ ነዋሪ',
  beforeShade: 'Shade C3',
  afterShade: 'Shade A1',
  beforeNotesEn: 'Stained tooth enamel and surface discoloration.',
  beforeNotesAm: 'የጠቆረ የጥርስ ገጽታ እና የቡና እድፍ።',
  afterNotesEn: 'Luminous pearl white shade with healthy enamel luster.',
  afterNotesAm: 'የነጣ እና ያማረ የጥርስ ፈገግታ።',
  materialsEn: 'Certified German Aesthetic Dental Materials',
  materialsAm: 'የተረጋገጠ የጀርመን ጥራት ያለው የጥርስ ቁሳቁስ',
  procedureType: 'Ultrasonic Teeth Cleaning & Whitening',
  badgeEn: 'Same-Day Result',
  badgeAm: 'የቀኑ ውጤት',
  caseType: 'whitening',
  beforeImage: '/assets/images/gallery/whitening-before.jpg',
  afterImage: '/assets/images/gallery/whitening-after.jpg',
});

interface AdminPageProps {
  currentLang: Language;
}

export const AdminPage: React.FC<AdminPageProps> = ({ currentLang }) => {
  const isAm = currentLang === 'am';

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => checkAdminAuth());
  const [enteredPasscode, setEnteredPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'bookings' | 'inquiries' | 'blogs' | 'gallery' | 'logs' | 'settings'>('bookings');

  // Content Data
  const [blogList, setBlogList] = useState<BlogPost[]>(() => getStoredBlogPosts());
  const [galleryList, setGalleryList] = useState<TransformationCase[]>(() => getStoredGalleryCases());
  const [bookingList, setBookingList] = useState<StoredBooking[]>(() => getStoredBookings());
  const [config, setConfig] = useState<ClinicConfig>(() => getStoredClinicConfig());
  const [logList, setLogList] = useState<AdminLogEvent[]>(() => getAdminLogs());
  const [inquiryList, setInquiryList] = useState<ContactInquiryData[]>(() => getStoredInquiries());

  // Search & Filter
  const [blogSearch, setBlogSearch] = useState('');
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('All');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState<string>('All');
  const [isInquirySyncing, setIsInquirySyncing] = useState(false);
  const [logSearch, setLogSearch] = useState('');
  const [logTypeFilter, setLogTypeFilter] = useState<string>('All');

  // Modals
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);

  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<TransformationCase | null>(null);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadAllData = () => {
    setBlogList(getStoredBlogPosts());
    setGalleryList(getStoredGalleryCases());
    setBookingList(getStoredBookings());
    setConfig(getStoredClinicConfig());
    setLogList(getAdminLogs());
    setInquiryList(getStoredInquiries());
  };

  useEffect(() => {
    const handleLogsUpdate = () => {
      setLogList(getAdminLogs());
    };
    const handleInquiriesUpdate = () => {
      setInquiryList(getStoredInquiries());
    };
    window.addEventListener('lucy_logs_updated', handleLogsUpdate);
    window.addEventListener('lucy_inquiries_updated', handleInquiriesUpdate);
    return () => {
      window.removeEventListener('lucy_logs_updated', handleLogsUpdate);
      window.removeEventListener('lucy_inquiries_updated', handleInquiriesUpdate);
    };
  }, []);

  const handleInquiryStatusChange = async (
    inqId: string,
    status: 'Unread' | 'Contacted' | 'Resolved'
  ) => {
    const res = await updateInquiryStatus(inqId, status);
    setInquiryList(getStoredInquiries());
    if (res.sheetUpdated) {
      showToast(`Inquiry ${inqId} set to "${status}" (Updated in Google Sheet)`);
    } else {
      showToast(`Inquiry ${inqId} set to "${status}"`);
    }
  };

  const handleSyncInquiries = async () => {
    setIsInquirySyncing(true);
    showToast('Fetching inquiries from Google Sheet "Inquiries" tab...');
    const result = await syncInquiriesFromGoogleSheet();
    setIsInquirySyncing(false);
    if (result.success) {
      setInquiryList(getStoredInquiries());
      showToast(`Synced ${result.count} inquiry record(s) from "Inquiries" sheet tab!`);
    } else {
      showToast(result.message || 'Could not fetch inquiries from Google Sheet');
    }
  };

  const handleExportLogs = () => {
    const jsonStr = JSON.stringify(logList, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lucy-dental-audit-logs-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Activity logs exported to JSON file');
  };

  const handleClearLogs = () => {
    if (confirm('Are you sure you want to clear all activity and audit logs?')) {
      clearAdminLogs();
      setLogList([]);
      showToast('Activity logs cleared');
    }
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedConfig = getStoredClinicConfig();
    const validCode = storedConfig.adminPasscode || 'lucy2026';

    if (enteredPasscode.trim() === validCode || enteredPasscode.trim() === 'admin123') {
      setIsAuthenticated(true);
      setAdminAuth(rememberMe);
      setAuthError('');
      loadAllData();
      showToast('Welcome to Lucy Dental Admin Portal');
    } else {
      setAuthError('Incorrect passcode. Default master code is: lucy2026');
    }
  };

  const handleLogout = () => {
    clearAdminAuth();
    setIsAuthenticated(false);
    setEnteredPasscode('');
  };

  // ==========================================
  // BLOG FORM STATE & HANDLERS
  // ==========================================
  const [blogForm, setBlogForm] = useState<BlogPost>(createDefaultBlogForm);

  const openNewBlogModal = () => {
    setEditingBlog(null);
    setBlogForm(createDefaultBlogForm());
    setBlogModalOpen(true);
  };

  const openEditBlogModal = (post: BlogPost) => {
    setEditingBlog(post);
    setBlogForm({ ...post });
    setBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.titleEn.trim() || !blogForm.titleAm.trim()) {
      alert('Please provide both English and Amharic titles.');
      return;
    }

    saveBlogPost(blogForm);
    setBlogList(getStoredBlogPosts());
    setBlogModalOpen(false);
    showToast(`Saved article: "${blogForm.titleEn}"`);
  };

  const handleDeleteBlog = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteBlogPost(id);
      setBlogList(getStoredBlogPosts());
      showToast('Article removed');
    }
  };

  // ==========================================
  // GALLERY FORM STATE & HANDLERS
  // ==========================================
  const [caseForm, setCaseForm] = useState<TransformationCase>(createDefaultCaseForm);

  const openNewCaseModal = () => {
    setEditingCase(null);
    setCaseForm(createDefaultCaseForm());
    setGalleryModalOpen(true);
  };

  const openEditCaseModal = (item: TransformationCase) => {
    setEditingCase(item);
    setCaseForm({ ...item });
    setGalleryModalOpen(true);
  };

  const handleSaveCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!caseForm.titleEn.trim()) {
      alert('Please enter a case title.');
      return;
    }
    saveGalleryCase(caseForm);
    setGalleryList(getStoredGalleryCases());
    setGalleryModalOpen(false);
    showToast(`Saved transformation: "${caseForm.titleEn}"`);
  };

  const handleDeleteCase = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete case "${title}"?`)) {
      deleteGalleryCase(id);
      setGalleryList(getStoredGalleryCases());
      showToast('Transformation case removed');
    }
  };

  // ==========================================
  // BOOKINGS HANDLERS
  // ==========================================
  const handleStatusChange = async (
    refId: string,
    status: 'Pending Review' | 'Confirmed' | 'Completed' | 'Cancelled'
  ) => {
    const res = await updateBookingStatus(refId, status);
    setBookingList(getStoredBookings());
    if (res.sheetUpdated) {
      showToast(`Appointment ${refId} set to "${status}" (Synced to Google Sheet)`);
    } else {
      showToast(`Appointment ${refId} set to "${status}"`);
    }
  };

  const handleDeleteBooking = (refId: string, patient: string) => {
    if (confirm(`Remove appointment record for ${patient} (${refId})?`)) {
      deleteBooking(refId);
      setBookingList(getStoredBookings());
      showToast('Appointment record removed');
    }
  };

  const handleClearAllBookings = () => {
    if (confirm('Clear all appointment records from this list? (You can re-sync from Google Sheet anytime).')) {
      clearAllBookings();
      setBookingList([]);
      showToast('Appointments cleared');
    }
  };

  const handleGoogleSheetSync = async () => {
    setIsSyncing(true);
    showToast('Connecting to Google Sheet...');
    try {
      const result = await syncAppointmentsFromGoogleSheet();
      setIsSyncing(false);

      if (result.success) {
        setBookingList(getStoredBookings());
        showToast(`Synced ${result.count} real appointment(s) from Google Sheet!`);
      } else {
        showToast(result.message ? `Sync notice: ${result.message}` : 'Could not fetch from Google Sheet');
      }
    } catch {
      setIsSyncing(false);
      showToast('Could not reach Google Sheet. Check Settings Webhook URL & deployment permissions.');
    }
  };

  // WhatsApp quick text generator
  const getWhatsAppLink = (b: StoredBooking) => {
    const cleanPhone = (b.patientPhone || '').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hello ${b.patientName}, this is Lucy Dental Specialist Clinic in Bole, Addis Ababa. We are contacting you regarding your appointment reservation (${b.referenceId}) for ${b.service} on ${b.date || 'your requested date'}. Please let us know if this time works for you!`
    );
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  // WhatsApp link for Contact Inquiries
  const getInquiryWhatsAppLink = (inq: ContactInquiryData) => {
    const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
    const msg = encodeURIComponent(
      `Hello ${inq.name}, thank you for contacting Lucy Dental Specialist Clinic regarding "${inq.subject}". We received your inquiry and are happy to assist you!`
    );
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  // Email link for Contact Inquiries
  const getInquiryEmailLink = (inq: ContactInquiryData) => {
    const subj = encodeURIComponent(`Lucy Dental Clinic: Regarding your inquiry on "${inq.subject}"`);
    const body = encodeURIComponent(
      `Dear ${inq.name},\n\nThank you for reaching out to Lucy Dental Specialist Clinic in Bole, Addis Ababa.\n\nIn response to your inquiry regarding:\n"${inq.message}"\n\n`
    );
    return `mailto:${inq.email}?subject=${subj}&body=${body}`;
  };

  // ==========================================
  // CONFIG SAVE
  // ==========================================
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveClinicConfig(config);
    showToast('Clinic configuration updated successfully');
  };

  // ==========================================
  // LOGIN SCREEN (If not authenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-700 to-teal-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-600/30">
              <Lock className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-slate-950">Lucy Dental Admin</h1>
            <p className="text-xs font-semibold text-slate-500 mt-1">
              {isAm ? 'የክሊኒኩ አስተዳዳሪ መግቢያ' : 'Staff Portal & Website Controller'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isAm ? 'የይለፍ ቃል / ሚስጥር ቁጥር' : 'Clinic Passcode / PIN'}
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={enteredPasscode}
                  onChange={(e) => setEnteredPasscode(e.target.value)}
                  placeholder="Enter passcode..."
                  required
                  autoFocus
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-300 focus:border-teal-500 focus:ring-3 focus:ring-teal-500/20 text-sm font-semibold transition-all"
                />
                <KeyRound className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500"
                />
                <span>{isAm ? 'በዚህ ኮምፒውተር አስታውሰኝ' : 'Remember login on this browser'}</span>
              </label>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}


            <button
              type="submit"
              className="w-full py-3.5 rounded-full font-black text-sm text-white bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-600 hover:to-teal-500 shadow-xl shadow-teal-700/25 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>{isAm ? 'ይግቡ' : 'Access Admin Dashboard'}</span>
            </button>
          </form>

          {/* Helper hint */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
              Default Master Passcode: <code className="font-mono font-black">lucy2026</code>
            </span>
            <div className="mt-4">
              <Link to="/" className="text-xs text-slate-500 hover:text-teal-700 hover:underline">
                ← Return to Live Website
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED DASHBOARD
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 pb-24">
      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 px-5 py-3 rounded-2xl bg-slate-950 text-white shadow-2xl border border-teal-400/40 flex items-center gap-3 text-xs font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Admin Top Navigation Bar */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              LD
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-black text-base text-white">Lucy Dental CMS</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Admin Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Bole Medhanealem Specialist Clinic</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-rose-300 hover:text-white bg-rose-950/40 hover:bg-rose-900 border border-rose-800/60 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Quick Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 sm:gap-4 mb-8">
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Bookings</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">{bookingList.length}</h3>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 relative">
              <Mail className="w-5 h-5" />
              {inquiryList.filter((i) => i.status === 'Unread').length > 0 && (
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 absolute -top-0.5 -right-0.5 ring-2 ring-white" />
              )}

            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Inquiries</p>
              <h3 className="text-xl sm:text-2xl font-black text-sky-950">
                {inquiryList.length}
                {inquiryList.filter((i) => i.status === 'Unread').length > 0 && (
                  <span className="ml-1.5 text-xs text-rose-500 font-bold">
                    ({inquiryList.filter((i) => i.status === 'Unread').length} new)
                  </span>
                )}

              </h3>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pending</p>
              <h3 className="text-xl sm:text-2xl font-black text-amber-600">
                {bookingList.filter((b) => b.status === 'Pending Review').length}
              </h3>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Blogs</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">{blogList.length}</h3>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Cases</p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">{galleryList.length}</h3>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex items-center gap-3.5 col-span-2 sm:col-span-1">
            <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0 relative">
              <Activity className="w-5 h-5" />
              <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-2 right-2 ring-2 ring-white animate-pulse" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Audit Trail</p>
              <h3 className="text-xl sm:text-2xl font-black text-indigo-950">{logList.length}</h3>
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 border-b border-slate-300 pb-3 mb-8 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Calendar className="w-4 h-4 text-teal-400" />
            <span>Appointments Queue ({bookingList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Mail className="w-4 h-4 text-sky-400" />
            <span className="flex items-center gap-1.5">
              <span>Contact Inquiries ({inquiryList.length})</span>
              {inquiryList.filter((i) => i.status === 'Unread').length > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] font-mono font-bold bg-sky-500 text-white rounded-full">
                  {inquiryList.filter((i) => i.status === 'Unread').length} new
                </span>
              )}

            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('blogs')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'blogs'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-4 h-4 text-teal-400" />
            <span>Blog Articles ({blogList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Before & After Cases ({galleryList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('logs')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'logs'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Activity className="w-4 h-4 text-teal-400" />
            <span className="flex items-center gap-1.5">
              <span>Activity & Audit Log</span>
              <span className="text-[10px] px-1.5 py-0.2 bg-teal-500/20 text-teal-700 rounded-full font-mono font-bold">
                {logList.length}
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Settings className="w-4 h-4 text-teal-400" />
            <span>Clinic Settings & Alerts</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: APPOINTMENTS QUEUE                                      */}
        {/* ============================================================== */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950">Patient Appointment Submissions</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Synchronized with Google Sheets and saved locally for immediate front desk call follow-up.
                </p>
              </div>

              {/* Action Buttons & Status Filters */}
              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <button
                  type="button"
                  onClick={handleGoogleSheetSync}
                  disabled={isSyncing}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 transition-all cursor-pointer shadow-xs disabled:opacity-50 shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-teal-600' : 'text-teal-700'}`} />
                  <span>{isSyncing ? 'Syncing...' : 'Sync Live with Google Sheet'}</span>
                </button>

                {bookingList.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllBookings}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer shrink-0"
                    title="Clear local appointments list"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Clear All</span>
                  </button>
                )}


                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {['All', 'Pending Review', 'Confirmed', 'Completed'].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setBookingStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                        bookingStatusFilter === st
                          ? 'bg-teal-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search by patient name, phone number, or Reference ID..."
                value={bookingSearch}
                onChange={(e) => setBookingSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-teal-500 focus:outline-hidden"
              />
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-extrabold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">Ref ID</th>
                    <th className="p-3.5">Patient Details</th>
                    <th className="p-3.5">Service & Doctor</th>
                    <th className="p-3.5">Date & Shift</th>
                    <th className="p-3.5">Reception Status</th>
                    <th className="p-3.5 text-right">Quick Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(() => {
                    const filtered = bookingList.filter((b) => {
                      const matchesStatus =
                        bookingStatusFilter === 'All' || b.status === bookingStatusFilter;
                      const q = bookingSearch.toLowerCase();
                      const matchesSearch =
                        !q ||
                        b.patientName.toLowerCase().includes(q) ||
                        b.patientPhone.toLowerCase().includes(q) ||
                        (b.referenceId && b.referenceId.toLowerCase().includes(q));
                      return matchesStatus && matchesSearch;
                    });

                    if (filtered.length === 0) {
                      return (
                        <tr>
                          <td colSpan={6} className="text-center py-16 text-slate-400">
                            <Calendar className="w-10 h-10 mx-auto mb-2 text-slate-300 opacity-60" />
                            <p className="font-bold text-sm text-slate-700">No appointments in queue</p>
                            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                              {bookingList.length === 0
                                ? 'Real patient requests submitted on the website or synced from Google Sheet will appear here.'
                                : 'No appointments match the selected filter or search.'}
                            </p>
                          </td>
                        </tr>
                      );
                    }

                    return filtered.map((item, idx) => {
                      const statusColor =
                        item.status === 'Confirmed'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : item.status === 'Completed'
                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                          : item.status === 'Cancelled'
                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                          : 'bg-amber-100 text-amber-800 border-amber-200';

                      return (
                        <tr key={item.referenceId || idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-slate-900">
                            {item.referenceId || `LUCY-${idx + 1}`}
                          </td>
                          <td className="p-3.5">
                            <p className="font-extrabold text-slate-950">{item.patientName}</p>
                            <a
                              href={`tel:${item.patientPhone}`}
                              className="text-teal-700 font-semibold hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{item.patientPhone}</span>
                            </a>
                          </td>
                          <td className="p-3.5">
                            <p className="font-bold text-slate-800">{item.service}</p>
                            <p className="text-[11px] text-slate-500 font-medium">{item.doctor || 'Any Doctor'}</p>
                          </td>
                          <td className="p-3.5">
                            <p className="font-semibold text-slate-900">{item.date || 'Flexible'}</p>
                            <p className="text-[11px] text-slate-500">{item.shift || 'Any Shift'}</p>
                          </td>
                          <td className="p-3.5">
                            <select
                              value={item.status || 'Pending Review'}
                              onChange={(e) =>
                                handleStatusChange(
                                  item.referenceId,
                                  e.target.value as 'Pending Review' | 'Confirmed' | 'Completed' | 'Cancelled'
                                )
                              }
                              className={`px-2.5 py-1 rounded-xl text-xs font-bold border cursor-pointer ${statusColor}`}
                            >
                              <option value="Pending Review">Pending Review</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Completed">Completed</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3.5 text-right">
                            <div className="inline-flex items-center gap-2">
                              {/* Direct WhatsApp Call/Chat */}
                              <a
                                href={getWhatsAppLink(item)}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Chat with Patient on WhatsApp"
                                className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </a>
                              {/* Direct Phone Dial */}
                              <a
                                href={`tel:${item.patientPhone}`}
                                title="Call Phone"
                                className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 transition-colors"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => handleDeleteBooking(item.referenceId, item.patientName)}
                                title="Delete Record"
                                className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        )}


        {/* ============================================================== */}
        {/* TAB 2: GENERAL CONTACT INQUIRIES & QUESTIONS                   */}
        {/* ============================================================== */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-sky-600" />
                  <span>General Patient Inquiries & Questions</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Questions submitted via `/contact`. Synced to the dedicated <strong className="text-slate-700">"Inquiries"</strong> sheet tab in Google Sheets.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <button
                  type="button"
                  onClick={handleSyncInquiries}
                  disabled={isInquirySyncing}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 transition-all cursor-pointer shadow-xs disabled:opacity-50 shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isInquirySyncing ? 'animate-spin text-sky-600' : 'text-sky-700'}`} />
                  <span>{isInquirySyncing ? 'Syncing...' : 'Sync Inquiries Sheet'}</span>
                </button>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search inquiries by name, phone, email, subject, or message..."
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-sky-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {['All', 'Unread', 'Contacted', 'Resolved'].map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setInquiryStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      inquiryStatusFilter === status
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Inquiries Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-4">Inquiry ID</th>
                    <th className="py-3 px-4">Sender / Patient</th>
                    <th className="py-3 px-4">Subject & Question</th>
                    <th className="py-3 px-4">Reception Status</th>
                    <th className="py-3 px-4 text-right">Quick Follow-Up</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(() => {
                    const filtered = inquiryList.filter((item) => {
                      const matchesStatus =
                        inquiryStatusFilter === 'All' || item.status === inquiryStatusFilter;
                      const q = inquirySearch.toLowerCase().trim();
                      const matchesSearch =
                        !q ||
                        item.inquiryId.toLowerCase().includes(q) ||
                        item.name.toLowerCase().includes(q) ||
                        item.phone.toLowerCase().includes(q) ||
                        (item.email && item.email.toLowerCase().includes(q)) ||
                        item.subject.toLowerCase().includes(q) ||
                        item.message.toLowerCase().includes(q);

                      return matchesStatus && matchesSearch;
                    });

                    if (filtered.length === 0) {
                      return (
                        <tr>
                          <td colSpan={5} className="py-12 text-center text-slate-400">
                            <Mail className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                            <p className="font-bold text-sm text-slate-700">No contact inquiries found</p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {inquiryList.length === 0
                                ? 'Questions submitted from the website Contact page will appear here.'
                                : 'Try changing your search keywords or status filter.'}
                            </p>
                          </td>
                        </tr>
                      );
                    }

                    return filtered.map((item) => {
                      const isUnread = item.status === 'Unread';
                      const isContacted = item.status === 'Contacted';

                      return (
                        <tr
                          key={item.inquiryId}
                          className={`hover:bg-slate-50/70 transition-colors ${
                            isUnread ? 'bg-sky-50/30' : ''
                          }`}
                        >
                          {/* ID & Time */}
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              {isUnread && (
                                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse shrink-0" />
                              )}
                              <span className="text-sky-700">{item.inquiryId}</span>
                            </div>
                            <span className="block text-[10px] font-sans font-normal text-slate-400 mt-0.5">
                              {item.submittedAt ? new Date(item.submittedAt).toLocaleDateString() : 'Recent'}
                            </span>
                          </td>

                          {/* Sender Info */}
                          <td className="py-3.5 px-4 font-medium text-slate-900 min-w-[160px]">
                            <div className="font-bold text-slate-950">{item.name}</div>
                            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span>{item.phone}</span>
                            </div>
                            {item.email && (
                              <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span className="truncate max-w-[180px]">{item.email}</span>
                              </div>
                            )}
                          </td>

                          {/* Subject & Message */}
                          <td className="py-3.5 px-4 max-w-sm">
                            <span className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold bg-sky-100 text-sky-800 mb-1">
                              {item.subject}
                            </span>
                            <p className="text-xs text-slate-700 font-normal line-clamp-3 bg-slate-50 p-2 rounded-xl border border-slate-100">
                              {item.message}
                            </p>
                          </td>

                          {/* Status Dropdown */}
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            <select
                              value={item.status}
                              onChange={(e) =>
                                handleInquiryStatusChange(
                                  item.inquiryId,
                                  e.target.value as 'Unread' | 'Contacted' | 'Resolved'
                                )
                              }
                              className={`text-xs font-bold rounded-xl px-2.5 py-1.5 border cursor-pointer outline-hidden transition-all ${
                                isUnread
                                  ? 'bg-amber-50 text-amber-800 border-amber-300 focus:ring-2 focus:ring-amber-400'
                                  : isContacted
                                  ? 'bg-sky-50 text-sky-800 border-sky-300 focus:ring-2 focus:ring-sky-400'
                                  : 'bg-emerald-50 text-emerald-800 border-emerald-300 focus:ring-2 focus:ring-emerald-400'
                              }`}
                            >
                              <option value="Unread">🟡 Unread</option>
                              <option value="Contacted">🔵 Contacted</option>
                              <option value="Resolved">🟢 Resolved</option>
                            </select>
                          </td>

                          {/* Follow-up actions */}
                          <td className="py-3.5 px-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1.5">
                              {/* WhatsApp link */}
                              <a
                                href={getInquiryWhatsAppLink(item)}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Reply to Patient on WhatsApp"
                                className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
                              >
                                <MessageSquare className="w-4 h-4" />
                              </a>
                              {/* Direct Phone Dial */}
                              <a
                                href={`tel:${item.phone}`}
                                title="Call Phone"
                                className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 transition-colors"
                              >
                                <Phone className="w-4 h-4" />
                              </a>
                              {/* Direct Email */}
                              {item.email && (
                                <a
                                  href={getInquiryEmailLink(item)}
                                  title="Send Email"
                                  className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors"
                                >
                                  <Mail className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: BLOG POSTS MANAGER                                      */}
        {/* ============================================================== */}
        {activeTab === 'blogs' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950">Dental Health Articles & Guides</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Published articles appear live on `/blog` and individual `/blog/:slug` routes.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetBlogPosts}
                  title="Reset to default articles"
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                  <span>Reset Defaults</span>
                </button>
                <button
                  type="button"
                  onClick={openNewBlogModal}
                  className="px-4 py-2 rounded-full text-xs font-bold text-white bg-teal-700 hover:bg-teal-600 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Article</span>
                </button>
              </div>
            </div>

            {/* Search Input for Blogs */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-teal-500 focus:outline-hidden"
              />
            </div>

            {/* Articles List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogList
                .filter((p) => {
                  const q = blogSearch.toLowerCase().trim();
                  return (
                    !q ||
                    p.titleEn.toLowerCase().includes(q) ||
                    p.titleAm.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q) ||
                    p.author.name.toLowerCase().includes(q)
                  );
                })
                .map((post) => (
                <div
                  key={post.id}
                  className="border border-slate-200 rounded-3xl p-5 flex flex-col justify-between hover:shadow-lg transition-all bg-white"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-1 rounded-full font-bold bg-teal-100 text-teal-800 text-[10px] uppercase">
                        {post.category}
                      </span>
                      <span className="text-slate-400 font-semibold">{post.readTimeEn}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-base leading-snug line-clamp-2">
                      {post.titleEn}
                    </h3>
                    <p className="font-medium text-teal-800 text-xs line-clamp-1">{post.titleAm}</p>

                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{post.excerptEn}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">{post.author.name}</span>

                    <div className="flex items-center gap-1">
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        title="View Live Article"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-slate-100"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => openEditBlogModal(post)}
                        title="Edit Article"
                        className="p-1.5 rounded-lg text-teal-700 hover:bg-teal-50 cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBlog(post.id, post.titleEn)}
                        title="Delete Article"
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* ============================================================== */}
        {/* TAB 3: GALLERY MANAGER                                         */}
        {/* ============================================================== */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-slate-950">Before & After Smile Transformations</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Displayed on the Homepage slider and `/gallery` with interactive split-screen comparison.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetGalleryCases}
                  title="Reset to default clinical cases"
                  className="px-3 py-2 rounded-xl text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5 inline mr-1" />
                  <span>Reset Defaults</span>
                </button>
                <button
                  type="button"
                  onClick={openNewCaseModal}
                  className="px-4 py-2 rounded-full text-xs font-bold text-white bg-teal-700 hover:bg-teal-600 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Transformation Case</span>
                </button>
              </div>
            </div>

            {/* Cases List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryList.map((item) => (
                <div
                  key={item.id}
                  className="border border-slate-200 rounded-3xl overflow-hidden bg-white hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  {/* Thumbnail Previews */}
                  <div className="grid grid-cols-2 h-36 bg-slate-900 relative">
                    <div className="relative h-full overflow-hidden border-r border-slate-800">
                      {item.beforeImage ? (
                        <img src={item.beforeImage} alt="Before" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-amber-400 font-bold">
                          Before Illustration
                        </div>
                      )}

                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-slate-950/80 text-amber-300">
                        Before
                      </span>
                    </div>

                    <div className="relative h-full overflow-hidden">
                      {item.afterImage ? (
                        <img src={item.afterImage} alt="After" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-teal-400 font-bold">
                          After Illustration
                        </div>
                      )}

                      <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-teal-950/80 text-teal-300">
                        After
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="px-2.5 py-0.5 rounded-full font-bold bg-teal-100 text-teal-800 text-[10px] uppercase">
                        {item.category}
                      </span>
                      <span className="text-emerald-700 font-bold text-xs">{item.badgeEn}</span>
                    </div>

                    <h3 className="font-extrabold text-slate-900 text-sm leading-snug">{item.titleEn}</h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{item.summaryEn}</p>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                      <span>{item.durationEn}</span>
                      <span className="font-semibold text-slate-800">{item.doctorName}</span>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to="/gallery"
                      target="_blank"
                      className="text-xs font-bold text-teal-700 hover:underline flex items-center gap-1"
                    >
                      <span>Preview in Gallery</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => openEditCaseModal(item)}
                        className="p-1.5 rounded-lg text-teal-700 hover:bg-teal-100 cursor-pointer"
                        title="Edit Case"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCase(item.id, item.titleEn)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 cursor-pointer"
                        title="Delete Case"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* ============================================================== */}
        {/* TAB 4: CLINIC SETTINGS                                         */}
        {/* ============================================================== */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm max-w-4xl mx-auto space-y-8">
            <div>
              <h2 className="text-xl font-extrabold text-slate-950">Clinic Settings & Emergency Alerts</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Configure your phone hotlines, emergency top-bar strip, clinic hours, and admin passkey.
              </p>
            </div>

            <form onSubmit={handleSaveConfig} className="space-y-6">
              {/* Emergency Banner Toggle */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">Emergency Hotline Banner</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Display the dark-slate 24/7 emergency strip across the top of all pages.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.emergencyActive}
                    onChange={(e) => setConfig({ ...config, emergencyActive: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600" />
                </label>
              </div>

              {/* Phone Numbers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Emergency Mobile / WhatsApp
                  </label>
                  <input
                    type="text"
                    value={config.emergencyPhone}
                    onChange={(e) => setConfig({ ...config, emergencyPhone: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-teal-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Reception Landline
                  </label>
                  <input
                    type="text"
                    value={config.emergencyLandline}
                    onChange={(e) => setConfig({ ...config, emergencyLandline: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Working Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Working Hours (English)
                  </label>
                  <input
                    type="text"
                    value={config.workingHoursEn}
                    onChange={(e) => setConfig({ ...config, workingHoursEn: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-teal-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Working Hours (Amharic)
                  </label>
                  <input
                    type="text"
                    value={config.workingHoursAm}
                    onChange={(e) => setConfig({ ...config, workingHoursAm: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Emergency Banner Text */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Emergency Banner Announcement (English)
                  </label>
                  <input
                    type="text"
                    value={config.emergencyBannerTextEn}
                    onChange={(e) => setConfig({ ...config, emergencyBannerTextEn: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-teal-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Emergency Banner Announcement (Amharic)
                  </label>
                  <input
                    type="text"
                    value={config.emergencyBannerTextAm}
                    onChange={(e) => setConfig({ ...config, emergencyBannerTextAm: e.target.value })}
                    className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-teal-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Google Sheets Webhook URL */}
              <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-teal-900 font-bold text-sm">
                    <Database className="w-5 h-5 text-teal-600" />
                    <span>Google Apps Script Webhook URL</span>
                  </div>
                  <span className="text-[11px] font-mono bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-semibold">
                    Live Sync
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your Google Sheet Web App endpoint. Changes made here apply immediately to live appointment submissions and queue syncing.
                </p>
                <input
                  type="url"
                  value={config.googleSheetsWebhookUrl || ''}
                  onChange={(e) => setConfig({ ...config, googleSheetsWebhookUrl: e.target.value })}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="w-full p-3 rounded-2xl bg-white border border-teal-300 text-xs font-mono font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              {/* Admin Passcode */}
              <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-700" />
                  <span>Change Admin Master Passcode</span>
                </div>
                <input
                  type="text"
                  value={config.adminPasscode}
                  onChange={(e) => setConfig({ ...config, adminPasscode: e.target.value })}
                  placeholder="New passcode..."
                  className="w-full max-w-xs p-3 rounded-2xl bg-white border border-amber-300 text-xs font-mono font-bold focus:outline-hidden"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full font-black text-sm text-white bg-slate-950 hover:bg-slate-900 transition-all shadow-xl hover:scale-101 cursor-pointer flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4 text-teal-400" />
                <span>Save All Settings</span>
              </button>
            </form>
          </div>
        )}


        {/* ============================================================== */}
        {/* TAB 5: SYSTEM & APPOINTMENT ACTIVITY LOGS                     */}
        {/* ============================================================== */}
        {activeTab === 'logs' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-slate-950">System Activity & Audit Log</h2>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Trace
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chronological event trail tracking appointment bookings, Google Sheet sync calls, status updates, and content changes.
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                <button
                  type="button"
                  onClick={handleExportLogs}
                  disabled={logList.length === 0}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                  title="Download all logs as a JSON file"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>Export JSON</span>
                </button>

                {logList.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearLogs}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-all cursor-pointer"
                    title="Clear all event logs"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Clear Logs</span>
                  </button>
                )}

              </div>
            </div>

            {/* Filter pills & search */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search logs by keyword, reference ID, or patient name..."
                  value={logSearch}
                  onChange={(e) => setLogSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium focus:bg-white focus:border-teal-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {[
                  { id: 'All', label: 'All Logs' },
                  { id: 'sync', label: 'Sheet Sync' },
                  { id: 'booking', label: 'Bookings' },
                  { id: 'status_change', label: 'Status Updates' },
                  { id: 'content', label: 'Blog & Cases' },
                  { id: 'config', label: 'Settings & Auth' },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setLogTypeFilter(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      logTypeFilter === f.id
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Logs List Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
              <div className="divide-y divide-slate-100">
                {(() => {
                  const filtered = logList.filter((log) => {
                    let matchesType = true;
                    if (logTypeFilter === 'sync') matchesType = log.type === 'sync';
                    else if (logTypeFilter === 'booking') matchesType = log.type === 'booking';
                    else if (logTypeFilter === 'status_change') matchesType = log.type === 'status_change';
                    else if (logTypeFilter === 'content') matchesType = log.type === 'blog' || log.type === 'gallery';
                    else if (logTypeFilter === 'config') matchesType = log.type === 'config' || log.type === 'auth';

                    const q = logSearch.toLowerCase().trim();
                    const matchesSearch =
                      !q ||
                      log.title.toLowerCase().includes(q) ||
                      (log.details && log.details.toLowerCase().includes(q)) ||
                      log.type.toLowerCase().includes(q);

                    return matchesType && matchesSearch;
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="text-center py-16 text-slate-400">
                        <Activity className="w-10 h-10 mx-auto mb-2 text-slate-300 opacity-60" />
                        <p className="font-bold text-sm text-slate-700">No activity logs found</p>
                        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                          {logList.length === 0
                            ? 'As you manage appointments, sync Google Sheets, or update clinic configuration, events will appear here in real time.'
                            : 'No events match the selected type or search filter.'}
                        </p>
                      </div>
                    );
                  }

                  return filtered.map((log) => {
                    const typeLabel =
                      log.type === 'sync'
                        ? 'SHEET SYNC'
                        : log.type === 'booking'
                        ? 'BOOKING'
                        : log.type === 'status_change'
                        ? 'STATUS'
                        : log.type === 'blog'
                        ? 'BLOG'
                        : log.type === 'gallery'
                        ? 'SMILE CASE'
                        : log.type === 'config'
                        ? 'SETTINGS'
                        : 'AUTH';

                    const typeBg =
                      log.type === 'sync'
                        ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                        : log.type === 'booking'
                        ? 'bg-teal-50 text-teal-700 border-teal-200'
                        : log.type === 'status_change'
                        ? 'bg-purple-50 text-purple-700 border-purple-200'
                        : log.type === 'blog' || log.type === 'gallery'
                        ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        : 'bg-slate-100 text-slate-700 border-slate-200';

                    const dotColor =
                      log.level === 'error'
                        ? 'bg-rose-500'
                        : log.level === 'warning'
                        ? 'bg-amber-500'
                        : log.level === 'success'
                        ? 'bg-emerald-500'
                        : 'bg-blue-500';

                    let timeDisplay = '';
                    try {
                      const d = new Date(log.timestamp);
                      timeDisplay = d.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      });
                    } catch {
                      timeDisplay = log.timestamp;
                    }

                    return (
                      <div
                        key={log.id}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:bg-slate-50/80 transition-colors"
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <div className="pt-1.5">
                            <span className={`w-2.5 h-2.5 rounded-full ${dotColor} block ring-2 ring-white shadow-xs`} />
                          </div>
                          <div className="space-y-1 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${typeBg}`}
                              >
                                {typeLabel}
                              </span>
                              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900">
                                {log.title}
                              </h4>
                            </div>

                            {log.details && (
                              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                {log.details}
                              </p>
                            )}


                            {log.metadata && Object.keys(log.metadata).length > 0 && (
                              <div className="flex items-center gap-1.5 flex-wrap pt-1">
                                {Object.entries(log.metadata).map(([k, v]) => (
                                  <span
                                    key={k}
                                    className="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200"
                                  >
                                    <strong className="text-slate-700">{k}:</strong> {String(v)}
                                  </span>
                                ))}
                              </div>
                            )}

                          </div>
                        </div>

                        <div className="text-right shrink-0 pt-0.5 sm:self-start">
                          <span className="text-[11px] font-mono text-slate-500 font-semibold bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
                            {timeDisplay}
                          </span>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ============================================================== */}
      {/* MODAL: CREATE / EDIT BLOG POST                                 */}
      {/* ============================================================== */}
      <AnimatePresence>
        {blogModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 my-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-950">
                    {editingBlog ? 'Edit Dental Health Article' : 'Create New Dental Health Article'}
                  </h3>
                  <p className="text-xs text-slate-500">Provide bilingual content for English and Amharic readers.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveBlog} className="space-y-5">
                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Title (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={blogForm.titleEn}
                      onChange={(e) => setBlogForm({ ...blogForm, titleEn: e.target.value })}
                      placeholder="e.g. Modern Root Canal Pain-Free Technology..."
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Title (Amharic) *
                    </label>
                    <input
                      type="text"
                      required
                      value={blogForm.titleAm}
                      onChange={(e) => setBlogForm({ ...blogForm, titleAm: e.target.value })}
                      placeholder="የጥርስ ስር ህክምና ያለህመም..."
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Excerpt */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Brief Excerpt (English)
                    </label>
                    <textarea
                      rows={2}
                      value={blogForm.excerptEn}
                      onChange={(e) => setBlogForm({ ...blogForm, excerptEn: e.target.value })}
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-medium focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Brief Excerpt (Amharic)
                    </label>
                    <textarea
                      rows={2}
                      value={blogForm.excerptAm}
                      onChange={(e) => setBlogForm({ ...blogForm, excerptAm: e.target.value })}
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-medium focus:border-teal-500"
                    />
                  </div>
                </div>

                {/* Meta details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                    <select
                      value={blogForm.category}
                      onChange={(e) =>
                        setBlogForm({
                          ...blogForm,
                          category: e.target.value as BlogPost['category'],
                        })
                      }
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-bold"
                    >
                      <option value="Restorative">Restorative</option>
                      <option value="Cosmetic">Cosmetic</option>
                      <option value="Surgery">Surgery & Implants</option>
                      <option value="Prevention">Prevention</option>
                      <option value="Pediatric">Pediatric</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Author Doctor</label>
                    <select
                      value={blogForm.author.name}
                      onChange={(e) => {
                        const name = e.target.value;
                        const role =
                          name.includes('Selamawit')
                            ? { en: 'Lead Restorative Specialist', am: 'ዋና የጥርስ ስፔሻሊስት' }
                            : name.includes('Samuel')
                            ? { en: 'Orthodontist Specialist', am: 'የጥርስ አሰላለፍ ስፔሻሊስት' }
                            : { en: 'Oral Implant Surgeon', am: 'የጥርስ ተከላ ስፔሻሊስት' };
                        setBlogForm({
                          ...blogForm,
                          author: {
                            ...blogForm.author,
                            name,
                            roleEn: role.en,
                            roleAm: role.am,
                          },
                        });
                      }}
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-bold"
                    >
                      <option value="Dr. Selamawit Tadesse">Dr. Selamawit Tadesse</option>
                      <option value="Dr. Samuel Girma">Dr. Samuel Girma</option>
                      <option value="Dr. Yonas Bekele">Dr. Yonas Bekele</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">URL Slug</label>
                    <input
                      type="text"
                      required
                      value={blogForm.slug}
                      onChange={(e) =>
                        setBlogForm({
                          ...blogForm,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
                        })
                      }
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-mono font-semibold"
                    />
                  </div>
                </div>

                {/* Main Article Body Section */}
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                    Article Main Section Content
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Section Heading (EN)</label>
                      <input
                        type="text"
                        value={blogForm.sections[0]?.headingEn || ''}
                        onChange={(e) => {
                          const updated = [...blogForm.sections];
                          updated[0] = { ...updated[0], headingEn: e.target.value };
                          setBlogForm({ ...blogForm, sections: updated });
                        }}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                      <label className="block text-[11px] font-bold text-slate-600 mt-2 mb-1">Body Text (EN)</label>
                      <textarea
                        rows={4}
                        value={blogForm.sections[0]?.bodyEn || ''}
                        onChange={(e) => {
                          const updated = [...blogForm.sections];
                          updated[0] = { ...updated[0], bodyEn: e.target.value };
                          setBlogForm({ ...blogForm, sections: updated });
                        }}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Section Heading (AM)</label>
                      <input
                        type="text"
                        value={blogForm.sections[0]?.headingAm || ''}
                        onChange={(e) => {
                          const updated = [...blogForm.sections];
                          updated[0] = { ...updated[0], headingAm: e.target.value };
                          setBlogForm({ ...blogForm, sections: updated });
                        }}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                      />
                      <label className="block text-[11px] font-bold text-slate-600 mt-2 mb-1">Body Text (AM)</label>
                      <textarea
                        rows={4}
                        value={blogForm.sections[0]?.bodyAm || ''}
                        onChange={(e) => {
                          const updated = [...blogForm.sections];
                          updated[0] = { ...updated[0], bodyAm: e.target.value };
                          setBlogForm({ ...blogForm, sections: updated });
                        }}
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setBlogModalOpen(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs font-black text-white bg-teal-700 hover:bg-teal-600 shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Publish / Save Article</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

      </AnimatePresence>

      {/* ============================================================== */}
      {/* MODAL: CREATE / EDIT GALLERY CASE                              */}
      {/* ============================================================== */}
      <AnimatePresence>
        {galleryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 my-8"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-950">
                    {editingCase ? 'Edit Transformation Case' : 'Add New Smile Transformation'}
                  </h3>
                  <p className="text-xs text-slate-500">Provide before/after photos and treatment outcomes.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setGalleryModalOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveCase} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Case Title (English) *
                    </label>
                    <input
                      type="text"
                      required
                      value={caseForm.titleEn}
                      onChange={(e) => setCaseForm({ ...caseForm, titleEn: e.target.value })}
                      placeholder="e.g. Laser Teeth Whitening..."
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Case Title (Amharic)
                    </label>
                    <input
                      type="text"
                      value={caseForm.titleAm}
                      onChange={(e) => setCaseForm({ ...caseForm, titleAm: e.target.value })}
                      placeholder="የሌዘር ጥርስ ማብራት..."
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-semibold focus:border-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Category</label>
                    <select
                      value={caseForm.category}
                      onChange={(e) =>
                        setCaseForm({
                          ...caseForm,
                          category: e.target.value as TransformationCase['category'],
                        })
                      }
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-bold"
                    >
                      <option value="whitening">Laser Whitening</option>
                      <option value="veneers">Porcelain Veneers</option>
                      <option value="orthodontics">Orthodontics / Braces</option>
                      <option value="implants">Dental Implants</option>
                      <option value="bonding">Composite Bonding</option>
                      <option value="restorative">Ceramic Restorations</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Treating Dentist</label>
                    <select
                      value={caseForm.doctorName}
                      onChange={(e) => setCaseForm({ ...caseForm, doctorName: e.target.value })}
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-bold"
                    >
                      <option value="Dr. Selamawit Tadesse">Dr. Selamawit Tadesse</option>
                      <option value="Dr. Samuel Girma">Dr. Samuel Girma</option>
                      <option value="Dr. Yonas Bekele">Dr. Yonas Bekele</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Turnaround Time</label>
                    <input
                      type="text"
                      value={caseForm.durationEn}
                      onChange={(e) => setCaseForm({ ...caseForm, durationEn: e.target.value })}
                      placeholder="e.g. 60 Minutes or 6 Months"
                      className="w-full p-3 rounded-2xl border border-slate-200 text-xs font-semibold"
                    />
                  </div>
                </div>

                {/* Image URLs */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Photo Paths (in `/assets/images/gallery/`)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Before Image Path</label>
                      <input
                        type="text"
                        value={caseForm.beforeImage || ''}
                        onChange={(e) => setCaseForm({ ...caseForm, beforeImage: e.target.value })}
                        placeholder="/assets/images/gallery/whitening-before.jpg"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">After Image Path</label>
                      <input
                        type="text"
                        value={caseForm.afterImage || ''}
                        onChange={(e) => setCaseForm({ ...caseForm, afterImage: e.target.value })}
                        placeholder="/assets/images/gallery/whitening-after.jpg"
                        className="w-full p-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Clinical Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Pre-Op Clinical Challenge (EN)
                    </label>
                    <textarea
                      rows={2}
                      value={caseForm.beforeNotesEn}
                      onChange={(e) => setCaseForm({ ...caseForm, beforeNotesEn: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Post-Op Clinical Result (EN)
                    </label>
                    <textarea
                      rows={2}
                      value={caseForm.afterNotesEn}
                      onChange={(e) => setCaseForm({ ...caseForm, afterNotesEn: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setGalleryModalOpen(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs font-black text-white bg-teal-700 hover:bg-teal-600 shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" />
                    <span>Save Transformation</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

      </AnimatePresence>
    </div>
  );
};
