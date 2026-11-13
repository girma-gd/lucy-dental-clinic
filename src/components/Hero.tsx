import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Info,
  CheckCircle2,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { ScrollReveal, AnimatedCounter } from './ScrollReveal';

interface HeroProps {
  currentLang: Language;
  onBookClick?: () => void;
}

interface HeroSlide {
  id: string;
  image: string;
  flipHorizontal: boolean; // Flips doctor to the right side of the screen
  badge: { en: string; am: string };
  title: string;
  role: { en: string; am: string };
  experience: { en: string; am: string };
  defaultService: string;
  hotspots?: {
    id: string;
    x: number; // percentage
    y: number; // percentage
    title: { en: string; am: string };
    desc: { en: string; am: string };
  }[];
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onBookClick }) => {
  const navigate = useNavigate();
  const t = (key: string) => translations[currentLang][key] || key;
  const isAm = currentLang === 'am';

  const slides: HeroSlide[] = [
    {
      id: 'dentist',
      image: '/assets/images/hero-dentist.jpg',
      flipHorizontal: true, // Flips Dr. Selamawit to the right side
      badge: {
        en: 'Lead Restorative Specialist & Cosmetic Surgeon',
        am: 'ዋና የጥርስ ስፔሻሊስት እና የውበት ህክምና ሐኪም',
      },
      title: 'Dr. Selamawit Tadesse',
      role: {
        en: 'BDS, MSc Restorative Dentistry • Member EDA',
        am: 'የጥርስ ህክምና ማስተርስ (MSc) • የኢትዮጵያ የጥርስ ሐኪሞች ማህበር አባል',
      },
      experience: {
        en: '11+ Years Clinical Experience',
        am: 'ከ11 ዓመታት በላይ የህክምና ልምድ',
      },
      defaultService: 'Pain-Free Root Canal Therapy',
      hotspots: [
        {
          id: 'h1',
          x: 32,
          y: 35,
          title: {
            en: 'Low-Dose Digital 3D Diagnostics',
            am: 'አነስተኛ ጨረር ያለው 3D ኤክስሬይ',
          },
          desc: {
            en: 'Instant periapical imaging with up to 80% reduced radiation exposure.',
            am: 'የጨረር መጠኑን በ80% የቀነሰ ፈጣንና ግልጽ ዲጂታል ቅኝት።',
          },
        },
        {
          id: 'h2',
          x: 48,
          y: 72,
          title: {
            en: 'Hospital-Grade Sterile Field',
            am: '100% የአውሮፓ ደረጃ ማምከኛ',
          },
          desc: {
            en: 'Vacuum autoclave sterilization monitored before every patient procedure.',
            am: 'ለእያንዳንዱ ታካሚ በቫኪዩም የተመከኑ እቃዎችና ነጠላ መጠቀሚያዎች።',
          },
        },
      ],
    },
    {
      id: 'clinic',
      image: '/assets/images/clinic-interior.jpg',
      flipHorizontal: false, // Clinic interior has chair on right and monitor on left
      badge: {
        en: 'Hospital-Grade Sterile Clinic Suite',
        am: 'አለም አቀፍ ደረጃውን የጠበቀ የህክምና ማዕከል',
      },
      title: isAm ? 'የሉሲ የጥርስ ክሊኒክ የቀዶ ህክምና ክፍል' : 'Lucy Dental Specialist Surgical Suite',
      role: {
        en: 'Bole Medhanialem • Lex Plaza 3rd Floor, Addis Ababa',
        am: 'ቦሌ መድኃኔዓለም • ከኤድና ሞል ጀርባ ሌክስ ፕላዛ 3ኛ ፎቅ',
      },
      experience: {
        en: 'European Class-B Autoclave Certified',
        am: 'በአውሮፓ ደረጃ የተረጋገጠ ማምከኛ',
      },
      defaultService: 'General Check-up & Digital Diagnostics',
      hotspots: [
        {
          id: 'h3',
          x: 68,
          y: 52,
          title: {
            en: 'Ergonomic Computerized Dental Chair',
            am: 'ዘመናዊ የህክምና ወንበር',
          },
          desc: {
            en: 'Micro-adjustable gentle contouring for maximum patient relaxation.',
            am: 'ለታካሚው ፍጹም ምቾት የሚሰጥ በኮምፒዩተር የሚስተካከል ወንበር።',
          },
        },
        {
          id: 'h4',
          x: 82,
          y: 25,
          title: {
            en: 'HEPA Clean Air Filtration',
            am: 'የህክምና ደረጃ የአየር ማጣሪያ',
          },
          desc: {
            en: 'Continuous airborne sterilization removing 99.97% of particles.',
            am: 'በየደቂቃው ጀርሞችን እና ባክቴሪያዎችን የሚያስወግድ አየር ማጣሪያ።',
          },
        },
      ],
    },
    {
      id: 'surgeon',
      image: '/assets/images/doctor-samuel.jpg',
      flipHorizontal: true, // Flips Dr. Samuel to the right side
      badge: {
        en: 'Oral & Maxillofacial Surgeon, Implantologist',
        am: 'የጥርስ እና የአፍ ውስጥ ቀዶ ህክምና፣ የጥርስ ተከላ ስፔሻሊስት',
      },
      title: 'Dr. Samuel Tesfaye',
      role: {
        en: 'DDS Oral Surgery, Member EDA • 14+ Years Experience',
        am: 'የጥርስ ቀዶ ህክምና ስፔሻሊስት • ከ14 ዓመታት በላይ ልምድ',
      },
      experience: {
        en: 'Specialized in Titanium Osseointegration',
        am: 'ቋሚ የቲታኒየም ጥርስ ተከላ ስፔሻሊስት',
      },
      defaultService: 'Dental Implants & Zirconia Crowns',
      hotspots: [
        {
          id: 'h5',
          x: 35,
          y: 42,
          title: {
            en: 'Titanium Dental Implants',
            am: 'ቋሚ የጥርስ ተከላ (Implants)',
          },
          desc: {
            en: 'Restores 100% natural chewing strength with permanent zirconia crowns.',
            am: 'የተነቀለ ጥርስን ሙሉ በሙሉ የሚተካና የተፈጥሮ ውበት ያለው ቋሚ ተከላ።',
          },
        },
      ],
    },
    {
      id: 'pediatric',
      image: '/assets/images/doctor-yonas.jpg',
      flipHorizontal: true, // Flips Dr. Yonas to the right side
      badge: {
        en: 'Pediatric Dentist & Orthodontic Specialist',
        am: 'የህፃናት የጥርስ ህክምና እና የጥርስ ማስተካከያ (Braces) ባለሙያ',
      },
      title: 'Dr. Yonas Alemu',
      role: {
        en: 'BDS Paediatric Specialist, EDA • 8+ Years Experience',
        am: 'የህፃናት የጥርስ ስፔሻሊስት • ከ8 ዓመታት በላይ ልምድ',
      },
      experience: {
        en: 'Tear-Free Pediatric Dental Care',
        am: 'ለህፃናት ፍርሃት አልባ አስደሳች ህክምና',
      },
      defaultService: 'Gentle Pediatric & Child Dentistry',
      hotspots: [
        {
          id: 'h6',
          x: 38,
          y: 46,
          title: {
            en: 'Gentle Pediatric Protocol',
            am: 'ለህፃናት የተዘጋጀ የፍቅር ህክምና',
          },
          desc: {
            en: 'Fun, relaxed approach to prevent anxiety and protect baby teeth.',
            am: 'ህፃናት ያለ ምንም ፍርሃት እና እንባ በደስታ የሚታከሙበት መንገድ።',
          },
        },
      ],
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Auto-advance carousel every 6 seconds when not paused
  useEffect(() => {
    if (isPaused) return;

    timerRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
      setActiveHotspot(null);
    }, 6500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, slides.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setActiveHotspot(null);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setActiveHotspot(null);
  };

  const handleBook = (defaultService?: string, doctorName?: string) => {
    if (onBookClick && !defaultService && !doctorName) {
      onBookClick();
      return;
    }
    const params = new URLSearchParams();
    if (defaultService) params.set('service', defaultService);
    if (doctorName) params.set('doctor', doctorName);
    navigate(`/booking?${params.toString()}`);
  };

  const currentSlide = slides[currentIndex];

  return (
    <section
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full min-h-[92vh] lg:min-h-screen overflow-hidden flex items-center bg-slate-950 text-white select-none"
    >
      {/* 1. FULL-SCREEN BACKGROUND CAROUSEL IMAGES (Flipped to place doctors on the RIGHT side) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={currentSlide.image}
              alt={currentSlide.title}
              className={`w-full h-full object-cover object-[center_15%] sm:object-[center_20%] lg:object-[85%_25%] ${
                currentSlide.flipHorizontal ? '-scale-x-100' : ''
              }`}
            />
          </motion.div>
        </AnimatePresence>

        {/* 2. CINEMATIC GRADIENT OVERLAYS (Protects text on the left, leaves the right side crystal clear for the doctor's face) */}
        {/* Desktop: Solid dark on left, fading to completely transparent by 55% so doctor's face on right is 100% visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent w-full lg:w-[62%] pointer-events-none hidden lg:block" />
        {/* Mobile / Tablet: Gradient on bottom for text, top is clear for face */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent pointer-events-none lg:hidden" />
        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-950/90 to-transparent pointer-events-none" />
      </div>

      {/* 3. INTERACTIVE RADAR HOTSPOTS */}
      <div className="absolute inset-0 w-full h-full z-15 pointer-events-none">
        <div className="relative w-full h-full max-w-7xl mx-auto px-4">
          {currentSlide.hotspots?.map((spot) => {
            const isOpen = activeHotspot === spot.id;
            return (
              <div
                key={spot.id}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto hidden md:block"
                onClick={() => setActiveHotspot(isOpen ? null : spot.id)}
                onMouseEnter={() => setActiveHotspot(spot.id)}
              >
                {/* Glowing Radar Beacon */}
                <div className="relative flex items-center justify-center cursor-pointer">
                  <span className="absolute inline-flex h-9 w-9 animate-ping rounded-full bg-teal-400 opacity-75" />
                  <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-teal-500 text-white shadow-xl border-2 border-white hover:scale-125 transition-transform">
                    <Info className="w-4 h-4" />
                  </span>
                </div>

                {/* Hotspot Info Tooltip */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-10 w-64 bg-slate-900/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-teal-500/50 text-white z-40"
                    >
                      <div className="flex items-center gap-2 text-xs font-bold text-teal-300 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{isAm ? spot.title.am : spot.title.en}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-snug">
                        {isAm ? spot.desc.am : spot.desc.en}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. FOREGROUND TEXT CONTENT (Positioned neatly on the LEFT, leaving the right side wide open) */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-20 lg:py-24">
        <div className="max-w-2xl flex flex-col items-start">
          
          {/* Top Badge: Rated Clinic */}
          <ScrollReveal animation="fade-down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-400/40 backdrop-blur-md shadow-lg mb-4 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5 text-teal-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="truncate">{t('hero.badge')}</span>
            </div>
          </ScrollReveal>

          {/* Main Title */}
          <ScrollReveal animation="fade-up" delay={0.2}>
            <h1 className="text-2xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 sm:mb-6 drop-shadow-md leading-[1.2] sm:leading-[1.15]">
              {t('hero.title.pre')}
              <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-teal-200 bg-clip-text text-transparent">
                {t('hero.title.highlight')}
              </span>
            </h1>
          </ScrollReveal>

          {/* Subtitle */}
          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="text-sm sm:text-lg text-slate-200 leading-relaxed max-w-xl mb-6 sm:mb-8 drop-shadow-sm font-medium">
              {t('hero.subtitle')}
            </p>
          </ScrollReveal>

          {/* CTA Buttons */}
          <ScrollReveal animation="fade-up" delay={0.4} className="w-full sm:w-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleBook(currentSlide.defaultService, currentSlide.title)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-extrabold text-slate-950 bg-gradient-to-r from-teal-400 via-teal-300 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 shadow-xl shadow-teal-500/30 hover:shadow-2xl hover:shadow-teal-400/40 hover:-translate-y-0.5 active:scale-95 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" />
                <span>{t('hero.cta.book')}</span>
              </button>

              <a
                href="https://wa.me/251911234567?text=Hello%20Lucy%20Dental%20Clinic,%20I%20would%20like%20to%20inquire%20about%20dental%20care."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3.5 sm:py-4 rounded-full text-sm sm:text-base font-bold text-white bg-emerald-600/90 hover:bg-emerald-600 border border-emerald-400/40 backdrop-blur-md shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:scale-95 transition-all text-center"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
                <span>{t('hero.cta.whatsapp')}</span>
              </a>
            </div>
          </ScrollReveal>

          {/* Metrics Bar with Animated Counters */}
          <ScrollReveal animation="fade-up" delay={0.5} className="w-full">
            <div className="grid grid-cols-3 gap-2 sm:gap-8 pt-6 sm:pt-8 border-t border-white/20 w-full max-w-lg">
              <div>
                <div className="text-xl sm:text-4xl font-black text-white tracking-tight">
                  <AnimatedCounter end={15000} suffix="+" />
                </div>
                <div className="text-[10px] sm:text-sm font-semibold text-slate-300 mt-1 leading-tight">
                  {t('hero.stat.patients')}
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-4xl font-black text-white tracking-tight">
                  <AnimatedCounter end={12} suffix="+" />
                </div>
                <div className="text-[10px] sm:text-sm font-semibold text-slate-300 mt-1 leading-tight">
                  {t('hero.stat.specialists')}
                </div>
              </div>

              <div>
                <div className="text-xl sm:text-4xl font-black text-teal-300 tracking-tight">
                  <AnimatedCounter end={100} suffix="%" />
                </div>
                <div className="text-[10px] sm:text-sm font-semibold text-slate-300 mt-1 leading-tight">
                  {t('hero.stat.sterilization')}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* 5. SLEEK FLOATING DOCTOR BADGE (Tucked cleanly at bottom-right so the doctor's face remains 100% visible) */}
      <div className="absolute bottom-24 right-4 sm:right-8 lg:right-12 z-25 hidden sm:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-950/75 hover:bg-slate-950/90 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3.5 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 text-slate-950 font-black flex items-center justify-center shrink-0 shadow-md">
              <CheckCircle2 className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-white text-sm">{currentSlide.title}</h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {isAm ? 'ክፍት መቀመጫ አለ' : 'Available'}
                </span>
              </div>
              <p className="text-[11px] text-teal-300 font-medium">
                {isAm ? currentSlide.badge.am : currentSlide.badge.en}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleBook(currentSlide.defaultService, currentSlide.title)}
              className="ml-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-slate-950 bg-teal-400 hover:bg-teal-300 transition-colors shadow-xs cursor-pointer group"
            >
              <span>{isAm ? 'ቀጠሮ' : 'Book'}</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 6. FULL-SCREEN CAROUSEL CONTROLS */}
      {/* Previous / Next Arrow Buttons (hidden on tiny phones, compact on tablet, full on desktop) */}
      <button
        type="button"
        onClick={handlePrev}
        aria-label="Previous Slide"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-13 sm:h-13 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md hidden xs:flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Next Slide"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-13 sm:h-13 rounded-full bg-slate-900/60 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md hidden xs:flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
      </button>

      {/* 7. BOTTOM CAROUSEL SELECTOR TABS */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-3 sm:px-4">
        <div className="bg-slate-950/75 backdrop-blur-xl p-1 sm:p-2 rounded-full border border-white/20 shadow-2xl flex items-center justify-between gap-1 overflow-x-auto">
          {slides.map((slide, index) => {
            const isActive = currentIndex === index;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => {
                  setCurrentIndex(index);
                  setActiveHotspot(null);
                }}
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-1.5 sm:py-2 px-1.5 sm:px-3 rounded-full text-[10px] sm:text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 shadow-md scale-102 font-extrabold'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="shrink-0 text-xs sm:text-sm">
                  {index === 0 && '👩‍⚕️'}
                  {index === 1 && '🏥'}
                  {index === 2 && '👨‍⚕️'}
                  {index === 3 && '🧑‍⚕️'}
                </span>
                <span className="hidden xs:inline truncate">
                  {index === 0 && (isAm ? 'ዶ/ር ሰላማዊት' : 'Dr. Selam')}
                  {index === 1 && (isAm ? 'ክፍል' : 'Suite')}
                  {index === 2 && (isAm ? 'ዶ/ር ሳሙኤል' : 'Dr. Samuel')}
                  {index === 3 && (isAm ? 'ዶ/ር ዮናስ' : 'Dr. Yonas')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

    </section>
  );
};
