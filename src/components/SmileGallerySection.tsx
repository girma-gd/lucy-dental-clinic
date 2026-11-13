import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Award,
  Clock,
  Calendar,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  UserCheck,
} from 'lucide-react';
import type { Language } from '../types';
import type { TransformationCase } from '../data/transformationsData';
import { getStoredGalleryCases } from '../services/adminContentService';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ScrollReveal } from './ScrollReveal';

interface SmileGallerySectionProps {
  currentLang: Language;
}

export const SmileGallerySection: React.FC<SmileGallerySectionProps> = ({ currentLang }) => {
  const navigate = useNavigate();
  const isAm = currentLang === 'am';

  const [allCases, setAllCases] = useState<TransformationCase[]>(() => getStoredGalleryCases());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(() => allCases[0]?.id || 'laser-whitening-shade-a1');

  useEffect(() => {
    const handleUpdate = () => {
      const updated = getStoredGalleryCases();
      setAllCases(updated);
      if (updated.length > 0 && !updated.find((c) => c.id === selectedCaseId)) {
        setSelectedCaseId(updated[0].id);
      }
    };
    window.addEventListener('lucy_gallery_updated', handleUpdate);
    return () => window.removeEventListener('lucy_gallery_updated', handleUpdate);
  }, [selectedCaseId]);

  const categories = [
    { id: 'all', labelEn: 'All Treatments', labelAm: 'ሁሉም ህክምናዎች' },
    { id: 'whitening', labelEn: 'Laser Whitening', labelAm: 'ጥርስ ማብራት' },
    { id: 'veneers', labelEn: 'Porcelain Veneers', labelAm: 'የሸክላ ቬኒር' },
    { id: 'orthodontics', labelEn: 'Aligners & Braces', labelAm: 'ብሬስ' },
    { id: 'implants', labelEn: 'Dental Implants', labelAm: 'የጥርስ ተከላ' },
    { id: 'bonding', labelEn: 'Gap Closure & Bonding', labelAm: 'ክፍተት መዝጋት' },
  ];

  const filteredCases =
    activeCategory === 'all'
      ? allCases
      : allCases.filter((c) => c.category === activeCategory);

  const activeCase =
    filteredCases.find((c) => c.id === selectedCaseId) || filteredCases[0] || allCases[0];

  const handleBookCase = (caseItem: TransformationCase) => {
    const params = new URLSearchParams();
    if (caseItem.procedureType) params.set('service', caseItem.procedureType);
    if (caseItem.doctorName) params.set('doctor', caseItem.doctorName);
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <section id="smile-transformations" className="py-20 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Background Lighting Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-teal-500/20 text-teal-300 border border-teal-400/30 mb-4 shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-teal-400" />
              <span>{isAm ? 'የፈገግታ ለውጦች ማሳያ' : 'Interactive Smile Gallery'}</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
              {isAm ? (
                <>
                  በእውነተኛ ታካሚዎቻችን የተመዘገቡ{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-200">
                    የፈገግታ ለውጦች
                  </span>
                </>
              ) : (
                <>
                  Real Patient Smile{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-200">
                    Transformations
                  </span>
                </>
              )}
            </h2>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {isAm
                ? 'ተንሸራታቹን ወደ ግራና ቀኝ በማንቀሳቀስ በሉሲ የጥርስ ክሊኒክ የተከናወኑ የሌዘር ማብራት፣ የሸክላ ሽፋን፣ የብሬስ እና የጥርስ ተከላ ውጤቶችን በቀጥታ ይመልከቱ።'
                : 'Drag the split-slider to inspect real clinical before & after outcomes achieved at our Bole specialist clinic. No filters, no stock models — just genuine dentistry.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Category Filter Pills */}
        <ScrollReveal animation="fade-up" delay={0.15}>
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar touch-pan-x">
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
                      setSelectedCaseId(matching[0].id);
                    }
                  }}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-lg shadow-teal-500/25 scale-105'
                      : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60'
                  }`}
                >
                  {isAm ? cat.labelAm : cat.labelEn}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* Main Stage Grid: Interactive Slider + Detailed Clinical Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left Column (7 cols): Interactive Split Slider Stage */}
          <div className="lg:col-span-7">
            <ScrollReveal animation="fade-right" delay={0.2}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCase.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                >
                  <BeforeAfterSlider caseItem={activeCase} isAm={isAm} />
                </motion.div>
              </AnimatePresence>

              {/* Case Quick Stats Strip */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="bg-slate-800/70 border border-slate-700/70 p-3 rounded-2xl text-center">
                  <div className="flex items-center justify-center gap-1.5 text-teal-400 mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      {isAm ? 'የፈጀው ጊዜ' : 'Duration'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-black text-white truncate">
                    {isAm ? activeCase.durationAm : activeCase.durationEn}
                  </p>
                </div>

                <div className="bg-slate-800/70 border border-slate-700/70 p-3 rounded-2xl text-center">
                  <div className="flex items-center justify-center gap-1.5 text-cyan-400 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      {isAm ? 'ቀጠሮዎች' : 'Visits'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-black text-white truncate">
                    {isAm ? activeCase.visitsAm : activeCase.visitsEn}
                  </p>
                </div>

                <div className="bg-slate-800/70 border border-slate-700/70 p-3 rounded-2xl text-center">
                  <div className="flex items-center justify-center gap-1.5 text-emerald-400 mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">
                      {isAm ? 'ውጤት' : 'Highlight'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-black text-emerald-300 truncate">
                    {isAm ? activeCase.badgeAm : activeCase.badgeEn}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column (5 cols): Clinical Case Details Card */}
          <div className="lg:col-span-5">
            <ScrollReveal animation="fade-left" delay={0.25}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCase.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800/90 border border-slate-700/90 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col justify-between backdrop-blur-md"
                >
                  <div className="space-y-5">
                    {/* Category & Badge */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/30">
                        {isAm ? activeCase.categoryAm : activeCase.categoryEn}
                      </span>
                      <span className="text-xs text-slate-400 font-semibold">
                        {isAm ? activeCase.patientProfileAm : activeCase.patientProfileEn}
                      </span>
                    </div>

                    {/* Case Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                      {isAm ? activeCase.titleAm : activeCase.titleEn}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {isAm ? activeCase.summaryAm : activeCase.summaryEn}
                    </p>

                    {/* Before vs After Clinical Bullet Points */}
                    <div className="space-y-3 pt-2">
                      <div className="p-3.5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-amber-300">
                            {isAm ? 'የነበረው ችግር (Initial Concern):' : 'Pre-Op Clinical Challenge:'}
                          </p>
                          <p className="text-slate-300 mt-0.5 leading-relaxed">
                            {isAm ? activeCase.beforeNotesAm : activeCase.beforeNotesEn}
                          </p>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-teal-950/40 border border-teal-500/30 text-xs flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-teal-300">
                            {isAm ? 'የተገኘው ውጤት (Achieved Result):' : 'Post-Op Clinical Outcome:'}
                          </p>
                          <p className="text-slate-300 mt-0.5 leading-relaxed">
                            {isAm ? activeCase.afterNotesAm : activeCase.afterNotesEn}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Materials & Doctor Attribution */}
                    <div className="pt-2 border-t border-slate-700/60 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>
                          <strong className="text-slate-200">
                            {isAm ? 'የህክምና ጥራት ቁሳቁስ:' : 'Certified Materials:'}
                          </strong>{' '}
                          {isAm ? activeCase.materialsAm : activeCase.materialsEn}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                        <div className="w-9 h-9 rounded-xl bg-teal-600/30 text-teal-300 border border-teal-500/30 flex items-center justify-center shrink-0">
                          <UserCheck className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{activeCase.doctorName}</p>
                          <p className="text-[11px] text-teal-300/80 truncate">
                            {isAm ? activeCase.doctorRoleAm : activeCase.doctorRoleEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Primary Call to Action Button */}
                  <div className="mt-6 pt-4 border-t border-slate-700/60">
                    <button
                      type="button"
                      onClick={() => handleBookCase(activeCase)}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-sm font-black text-slate-950 bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 shadow-xl shadow-teal-500/25 hover:scale-102 active:scale-98 transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-teal-950" />
                      <span>{isAm ? 'ይህን መሰል ህክምና ቀጠሮ ያስይዙ' : 'Book Similar Transformation'}</span>
                      <ArrowRight className="w-4 h-4 text-teal-950" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </ScrollReveal>
          </div>
        </div>

        {/* Thumbnail Selector Cards: All Cases */}
        <ScrollReveal animation="fade-up" delay={0.3}>
          <div className="mb-14">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-400" />
              <span>{isAm ? 'ሌሎች የፈገግታ ለውጦችን ይምረጡ' : 'Explore All Clinical Cases'}</span>
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {allCases.map((c) => {
                const isSelected = c.id === selectedCaseId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCaseId(c.id)}
                    className={`p-3 rounded-2xl text-left transition-all duration-200 flex flex-col justify-between cursor-pointer border ${
                      isSelected
                        ? 'bg-slate-800 border-teal-400 shadow-lg shadow-teal-500/20 scale-102 ring-2 ring-teal-400/40'
                        : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/70 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase text-teal-400 tracking-wider">
                        {isAm ? c.categoryAm : c.categoryEn}
                      </span>
                      <p className="text-xs font-bold text-white mt-1 line-clamp-2 leading-snug">
                        {isAm ? c.titleAm : c.titleEn}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-300">{c.durationEn}</span>
                      {isSelected && <span className="text-teal-400 font-bold">● Active</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Trust & Guarantee Banner */}
        <ScrollReveal animation="fade-up" delay={0.35}>
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-950 via-slate-800 to-slate-900 border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-400/40 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h4 className="text-lg font-black text-white">
                  {isAm ? '100% የተረጋገጠ ጥራት እና የህመም-አልባ ዋስትና' : '100% Pain-Free & Verified Clinical Quality'}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  {isAm
                    ? 'በስዊዘርላንድ እና ጀርመን ጥራት ያላቸው ቁሳቁሶች የተሰሩ ዘላቂ የፈገግታ ለውጦች።'
                    : 'Every cosmetic restoration is custom fabricated using Swiss Straumann® implants and German Ivoclar® ceramics.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 transition-all shadow-xs"
              >
                <span>{isAm ? 'ሙሉ ማሳያውን ይመልከቱ' : 'View Full Case Studies'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={() => navigate('/booking')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-all shadow-lg shadow-teal-500/30 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{isAm ? 'ምክክር ያስይዙ' : 'Book Consultation'}</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

