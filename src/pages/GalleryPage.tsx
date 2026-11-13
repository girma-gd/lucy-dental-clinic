import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  HelpCircle,
  Phone,
} from 'lucide-react';
import type { Language } from '../types';
import type { TransformationCase } from '../data/transformationsData';
import { getStoredGalleryCases } from '../services/adminContentService';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

interface GalleryPageProps {
  currentLang: Language;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ currentLang }) => {
  const navigate = useNavigate();
  const isAm = currentLang === 'am';

  const [allCases, setAllCases] = useState<TransformationCase[]>(() => getStoredGalleryCases());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCase, setSelectedCase] = useState<TransformationCase>(() => allCases[0] || getStoredGalleryCases()[0]);

  useEffect(() => {
    const handleUpdate = () => {
      const updated = getStoredGalleryCases();
      setAllCases(updated);
      if (updated.length > 0) {
        setSelectedCase(updated[0]);
      }
    };
    window.addEventListener('lucy_gallery_updated', handleUpdate);
    return () => window.removeEventListener('lucy_gallery_updated', handleUpdate);
  }, []);

  const categories = [
    { id: 'all', labelEn: `All Procedures (${allCases.length})`, labelAm: `ሁሉም ህክምናዎች (${allCases.length})` },
    { id: 'whitening', labelEn: 'Laser Whitening', labelAm: 'ጥርስ ማብራት' },
    { id: 'veneers', labelEn: 'Porcelain Veneers', labelAm: 'የሸክላ ቬኒር' },
    { id: 'orthodontics', labelEn: 'Clear Aligners & Braces', labelAm: 'ብሬስ' },
    { id: 'implants', labelEn: 'Dental Implants', labelAm: 'የጥርስ ተከላ' },
    { id: 'bonding', labelEn: 'Composite Edge Bonding', labelAm: 'ክፍተት መዝጋት' },
    { id: 'restorative', labelEn: 'Ceramic Restorations', labelAm: 'የጥርስ እድሳት' },
  ];

  const filteredCases =
    activeCategory === 'all'
      ? allCases
      : allCases.filter((c) => c.category === activeCategory);

  const handleBookCase = (caseItem: TransformationCase) => {
    const params = new URLSearchParams();
    if (caseItem.procedureType) params.set('service', caseItem.procedureType);
    if (caseItem.doctorName) params.set('doctor', caseItem.doctorName);
    navigate(`/booking?${params.toString()}`);
  };

  const smileFaqs = [
    {
      qEn: 'How long do porcelain and zirconia veneers last?',
      qAm: 'የሸክላ እና ዚርኮኒያ ቬኒር ለስንት አመት ያገለግላል?',
      aEn: 'With proper oral hygiene and regular 6-month checkups at Lucy Dental Clinic, high-grade German lithium disilicate (e.max) and zirconia veneers typically last 15 to 20+ years without discoloration or chipping.',
      aAm: 'በጥሩ የጥርስ ንጽህና አያያዝ እና በየ6 ወሩ በሚደረግ የክሊኒክ ምርመራ የጀርመን ጥራት ያላቸው የሸክላ ቬኒሮች ከ15 እስከ 20+ ዓመታት ያለምንም የቀለም መለወጥ ወይም መሰበር ያገለግላሉ።',
    },
    {
      qEn: 'Does in-office laser whitening damage tooth enamel?',
      qAm: 'የሌዘር ጥርስ ማብራት የጥርስ ሽፋንን (ኢናሜል) ይጎዳል?',
      aEn: 'No. Our clinic uses pH-neutral Philips Zoom laser technology combined with potassium fluoride mineral glaze. It safely breaks down organic pigment stains within dentinal tubules without removing or demineralizing the natural enamel layer.',
      aAm: 'በፍጹም አይጎዳም። ክሊኒካችን የጥርስን ሽፋን የማይጎዳ የዘመናዊ ሌዘር ቴክኖሎጂ እና የፍሎራይድ ቅባት ስለሚጠቀም የጥርስን የተፈጥሮ ሽፋን ሳይነካ በቡናና ሻይ የተፈጠሩ እድፎችን ብቻ ያስወግዳል።',
    },
    {
      qEn: 'Can adults straighten crooked teeth without noticeable metal braces?',
      qAm: 'አዋቂዎች የሚታይ የብረት ብሬስ ሳያደርጉ የተዛባ ጥርስን ማስተካከል ይችላሉ?',
      aEn: 'Yes! Dr. Samuel Girma specializes in clear removable thermoplastic aligners. They are virtually invisible, removable during meals and business meetings, and straighten teeth in 6 to 12 months.',
      aAm: 'አዎ! ዶ/ር ሳሙኤል ግርማ የማይታዩ ግልጽ የላስቲክ ማስተካከያዎችን (Clear Aligners) የሚጠቀሙ ሲሆን በምግብ እና በስብሰባ ወቅት የሚወልቁና ከ6 እስከ 12 ወራት ውስጥ ጥርስን የሚያስተካክሉ ናቸው።',
    },
    {
      qEn: 'Is getting a dental implant painful?',
      qAm: 'የጥርስ ተከላ (Dental Implant) ህመም አለው?',
      aEn: 'Our computer-guided implant surgeries performed by Dr. Yonas Bekele are virtually pain-free. We apply local pre-numbing gels and targeted computerized anesthesia, making the actual procedure more comfortable than a routine filling.',
      aAm: 'በዶ/ር ዮናስ በቀለ የሚሰጡ የጥርስ ተከላ ህክምናዎች በኮምፒውተር መሪነትና በዘመናዊ የማደንዘዣ ዘዴ ስለሚከናወኑ በህክምናው ወቅት ምንም አይነት ህመም አይሰማዎትም።',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-teal-950 to-slate-900 text-white pt-12 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-teal-300/80 mb-6 font-medium">
            <Link to="/" className="hover:text-white transition-colors">
              {isAm ? 'መነሻ' : 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white font-bold">{isAm ? 'የፈገግታ ለውጦች' : 'Smile Gallery'}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-400/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>{isAm ? 'ክሊኒካል ማስረጃ እና ውጤቶች' : 'Clinical Proof & Case Studies'}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
              {isAm ? (
                <>
                  በሉሲ የጥርስ ክሊኒክ የተመዘገቡ{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-200">
                    የፈገግታ ለውጦች
                  </span>
                </>
              ) : (
                <>
                  Interactive Smile{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-200">
                    Transformations Gallery
                  </span>
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {isAm
                ? 'በቦሌ ክሊኒካችን የተከናወኑ ትክክለኛ የህክምና ውጤቶች። ተንሸራታቹን በማንቀሳቀስ ከህክምና በፊትና በኋላ የነበረውን ልዩነት በዝርዝር ይመልከቱ።'
                : 'Inspect genuine clinical before-and-after results achieved by our certified dental specialists in Bole, Addis Ababa. Drag the interactive comparative sliders to inspect tooth shade, alignment, and aesthetic restorations.'}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-24 relative z-20">
        {/* Category Selector Tabs */}
        <div className="bg-white rounded-3xl p-3 shadow-xl border border-slate-200/80 mb-10 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(cat.id);
                    const matching =
                      cat.id === 'all'
                        ? allCases
                        : allCases.filter((c) => c.category === cat.id);
                    if (matching.length > 0) {
                      setSelectedCase(matching[0]);
                    }
                  }}
                  className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-700 to-teal-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  }`}
                >
                  {isAm ? cat.labelAm : cat.labelEn}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Interactive Inspection Stage */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 text-white mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-black uppercase text-teal-400 tracking-wider">
                {isAm ? 'በይነ-ተግባራዊ ማሳያ' : 'Interactive Inspector Mode'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                {isAm ? selectedCase.titleAm : selectedCase.titleEn}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                {isAm ? selectedCase.badgeAm : selectedCase.badgeEn}
              </span>
              <button
                type="button"
                onClick={() => handleBookCase(selectedCase)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-teal-400 hover:bg-teal-300 text-slate-950 transition-all shadow-md cursor-pointer"
              >
                <span>{isAm ? 'ቀጠሮ ያስይዙ' : 'Book Case'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Slider */}
            <div className="lg:col-span-7">
              <BeforeAfterSlider caseItem={selectedCase} isAm={isAm} />
            </div>

            {/* Case Details */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{isAm ? 'ታካሚ:' : 'Patient:'}</span>
                  <span className="font-semibold text-slate-200">
                    {isAm ? selectedCase.patientProfileAm : selectedCase.patientProfileEn}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{isAm ? 'የፈጀው ጊዜ:' : 'Duration:'}</span>
                  <span className="font-semibold text-teal-300">
                    {isAm ? selectedCase.durationAm : selectedCase.durationEn} ({isAm ? selectedCase.visitsAm : selectedCase.visitsEn})
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{isAm ? 'ሐኪም:' : 'Treating Dentist:'}</span>
                  <span className="font-semibold text-slate-200">{selectedCase.doctorName}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>{isAm ? 'የቁሳቁስ ጥራት:' : 'Materials:'}</span>
                  <span className="font-semibold text-slate-200 truncate ml-2">
                    {isAm ? selectedCase.materialsAm : selectedCase.materialsEn}
                  </span>
                </div>
              </div>

              {/* Clinical takeaways */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300">
                      {isAm ? 'የነበረው ችግር:' : 'Pre-Op Clinical State:'}
                    </span>
                    <p className="text-slate-300 mt-0.5">
                      {isAm ? selectedCase.beforeNotesAm : selectedCase.beforeNotesEn}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-teal-950/40 border border-teal-500/30 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-teal-300">
                      {isAm ? 'የተገኘው ውጤት:' : 'Achieved Clinical Result:'}
                    </span>
                    <p className="text-slate-300 mt-0.5">
                      {isAm ? selectedCase.afterNotesAm : selectedCase.afterNotesEn}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Grid of All Cases */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                {isAm ? 'ሁሉንም የክሊኒካችንን ውጤቶች ያስሱ' : 'Browse All Clinical Transformations'}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {isAm
                  ? 'ካርዶቹን ጠቅ በማድረግ ከላይ ባለው ማሳያ ላይ በዝርዝር መመርመር ይችላሉ።'
                  : 'Click on any case below to load it into the top interactive comparative slider.'}
              </p>
            </div>
            <span className="text-xs font-bold text-slate-500 bg-slate-200/80 px-3 py-1.5 rounded-full">
              {filteredCases.length} {isAm ? 'ጉዳዮች' : 'Cases'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCases.map((item) => {
              const isSelected = item.id === selectedCase.id;

              return (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5 }}
                  className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl ${
                    isSelected ? 'ring-3 ring-teal-500 border-teal-500' : 'border-slate-200/80 hover:border-teal-300'
                  }`}
                >
                  {/* Slider Preview */}
                  <div className="p-3 bg-slate-950">
                    <BeforeAfterSlider caseItem={item} isAm={isAm} />
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex flex-col grow justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-teal-100 text-teal-800">
                          {isAm ? item.categoryAm : item.categoryEn}
                        </span>
                        <span className="text-xs font-bold text-emerald-600">
                          {isAm ? item.badgeAm : item.badgeEn}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-slate-950 text-base leading-snug">
                        {isAm ? item.titleAm : item.titleEn}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isAm ? item.summaryAm : item.summaryEn}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-teal-600" />
                          <span>{isAm ? item.durationAm : item.durationEn}</span>
                        </span>
                        <span className="font-semibold text-slate-700">{item.doctorName}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCase(item);
                            window.scrollTo({ top: 380, behavior: 'smooth' });
                          }}
                          className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer text-center"
                        >
                          {isAm ? 'በሰፊው መርምር' : 'Inspect Details'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBookCase(item)}
                          className="py-2 px-4 rounded-xl text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 transition-colors cursor-pointer"
                        >
                          {isAm ? 'ቀጠሮ' : 'Book'}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Frequently Asked Questions about Smile Makeovers */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-100 text-teal-800 mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-teal-700" />
              <span>{isAm ? 'የተለመዱ ጥያቄዎች' : 'Smile Makeover FAQs'}</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950">
              {isAm ? 'ስለ ፈገግታ ለውጥ ህክምናዎች ማወቅ የሚገቡዎት' : 'Common Questions About Smile Restorations'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {smileFaqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-teal-600 text-white text-[11px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{isAm ? faq.qAm : faq.qEn}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-7">
                  {isAm ? faq.aAm : faq.aEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Consultation Booking CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-teal-900 via-teal-800 to-slate-950 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase text-teal-300 tracking-wider">
              {isAm ? 'ዛሬውኑ ይጀምሩ' : 'Start Your Smile Journey'}
            </span>
            <h3 className="text-2xl sm:text-4xl font-black mt-2 mb-3">
              {isAm ? 'የእርስዎን የፈገግታ ለውጥ እቅድ በነፃ ይወያዩ' : 'Ready for Your Own Smile Transformation?'}
            </h3>
            <p className="text-xs sm:text-sm text-teal-100/90 leading-relaxed">
              {isAm
                ? 'በቦሌ ክሊኒካችን ከስፔሻሊስት ሐኪሞቻችን ጋር የመጀመሪያ የዲጂታል ምርመራ እና የፈገግታ እቅድ ምክክር ያድርጉ።'
                : 'Schedule a comprehensive consultation with 3D digital imaging at our Bole Medhanealem clinic. We will design your personalized treatment roadmap with clear pricing in ETB.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href="tel:+251911234567"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all shadow-xs"
            >
              <Phone className="w-4 h-4 text-teal-300" />
              <span>+251 911 234 567</span>
            </a>
            <button
              type="button"
              onClick={() => navigate('/booking')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-black bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 text-slate-950 transition-all shadow-xl shadow-teal-500/25 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-teal-950" />
              <span>{isAm ? 'ቀጠሮ ያስይዙ' : 'Request Appointment'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
