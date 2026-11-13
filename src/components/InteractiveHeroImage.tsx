import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Star,
  CheckCircle2,
  Info,
} from 'lucide-react';
import type { Language } from '../types';

interface InteractiveHeroImageProps {
  currentLang: Language;
}

interface ImageSlide {
  id: string;
  src: string;
  alt: string;
  badge: string;
  title: string;
  role: string;
  tagline: string;
  hotspots: {
    id: string;
    x: number; // percentage
    y: number; // percentage
    title: string;
    desc: string;
  }[];
}

export const InteractiveHeroImage: React.FC<InteractiveHeroImageProps> = ({ currentLang }) => {
  const isAm = currentLang === 'am';
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt coordinates
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const slides: ImageSlide[] = [
    {
      id: 'dentist',
      src: '/assets/images/hero-dentist.jpg',
      alt: 'Dr. Selamawit Tadesse at Lucy Dental Specialist Clinic Bole Addis Ababa',
      badge: isAm ? 'ዋና የጥርስ ስፔሻሊስት' : 'Lead Cosmetic & Restorative Surgeon',
      title: 'Dr. Selamawit Tadesse',
      role: isAm ? 'ከ11 ዓመት በላይ ልምድ • MSc BDS' : '11+ Years Experience • Restorative Specialist',
      tagline: isAm ? 'ህመም የሌለው ዘመናዊ ህክምና' : 'Painless & Gentle Dental Excellence',
      hotspots: [
        {
          id: 'h1',
          x: 72,
          y: 28,
          title: isAm ? 'አነስተኛ ጨረር ያለው 3D ኤክስሬይ' : 'Low-Dose 3D Diagnostics',
          desc: isAm ? '80% አነስተኛ ጨረር ያለው ዲጂታል ቅኝት' : 'Instant high-resolution imaging with 80% less radiation',
        },
        {
          id: 'h2',
          x: 28,
          y: 65,
          title: isAm ? '100% የአውሮፓ ደረጃ ማምከኛ' : 'Class-B Autoclave Sterile',
          desc: isAm ? 'ለእያንዳንዱ ታካሚ በቫኪዩም የተመከኑ እቃዎች' : 'Vacuum autoclave sterilization for every single patient kit',
        },
      ],
    },
    {
      id: 'clinic',
      src: '/assets/images/clinic-interior.jpg',
      alt: 'Lucy Dental Clinic Modern Sterile Interior in Bole Addis Ababa',
      badge: isAm ? 'አለም አቀፍ ደረጃውን የጠበቀ ክሊኒክ' : 'Hospital-Grade Sterile Suite',
      title: isAm ? 'የቦሌ ክሊኒካችን ውስጣዊ ገጽታ' : 'Bole Clinic Surgical Suite',
      role: isAm ? 'ቦሌ መድኃኔዓለም • ሌክስ ፕላዛ 3ኛ ፎቅ' : 'Bole Medhanialem • Lex Plaza 3rd Floor',
      tagline: isAm ? 'ምቹ፣ ንፁህ እና ዘመናዊ ድባብ' : 'Ergonomic chairs & private treatment suites',
      hotspots: [
        {
          id: 'h3',
          x: 50,
          y: 45,
          title: isAm ? 'ዘመናዊ የህክምና ወንበር' : 'Ergonomic Treatment Chair',
          desc: isAm ? 'ለታካሚው ከፍተኛ ምቾት የሚሰጥ' : 'Computerized pain-free patient positioning',
        },
        {
          id: 'h4',
          x: 80,
          y: 30,
          title: isAm ? 'አየር ማጣሪያና ፀረ-ተባይ' : 'HEPA Medical Air Filtration',
          desc: isAm ? 'የክሊኒኩ አየር በየደቂቃው የሚጣራበት' : 'Continuous airborne microbial decontamination',
        },
      ],
    },
    {
      id: 'surgeon',
      src: '/assets/images/doctor-samuel.jpg',
      alt: 'Dr. Samuel Tesfaye - Oral Surgeon and Implantologist',
      badge: isAm ? 'የቀዶ ህክምና እና የጥርስ ተከላ' : 'Oral & Maxillofacial Surgeon',
      title: 'Dr. Samuel Tesfaye',
      role: isAm ? 'የጥርስ ተከላ ስፔሻሊስት • 14+ ዓመታት ልምድ' : 'Implantologist • 14+ Years Clinical Experience',
      tagline: isAm ? 'ቋሚ የቲታኒየም ጥርስ ተከላ' : 'Permanent Titanium Implants & Bone Grafting',
      hotspots: [
        {
          id: 'h5',
          x: 65,
          y: 35,
          title: isAm ? 'የተፈጥሮ ጥርስ መልክ ያለው ተከላ' : 'Titanium Osseointegration',
          desc: isAm ? 'የማኘክ አቅምን 100% የሚመልስ' : 'Restores 100% natural chewing force with real tooth aesthetics',
        },
      ],
    },
    {
      id: 'pediatric',
      src: '/assets/images/doctor-yonas.jpg',
      alt: 'Dr. Yonas Alemu - Pediatric Dentist and Orthodontist',
      badge: isAm ? 'የህፃናት እና የጥርስ ማስተካከያ' : 'Pediatric Dentist & Orthodontics',
      title: 'Dr. Yonas Alemu',
      role: isAm ? 'ለህፃናት ፍርሃት አልባ ህክምና • 8+ ዓመታት' : 'Gentle Kids Care & Braces • 8+ Years Experience',
      tagline: isAm ? 'ህፃናት እየሳቁ የሚታከሙበት' : 'Tear-Free Visits & Invisible Clear Aligners',
      hotspots: [
        {
          id: 'h6',
          x: 60,
          y: 40,
          title: isAm ? 'የህፃናት ፍርሃት ማስወገጃ' : 'Tear-Free Gentle Protocol',
          desc: isAm ? 'በጨዋታ እና በእርጋታ የሚሰጥ ህክምና' : 'Specially trained in psychological comfort for young patients',
        },
      ],
    },
  ];

  const currentSlide = slides[activeSlideIndex];

  // Mouse move handler for smooth 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle tilt: max ±8 degrees
    const rY = ((x - centerX) / centerX) * 8;
    const rX = -((y - centerY) / centerY) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setActiveHotspot(null);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none perspective-1000">
      {/* Interactive Tabs above image */}
      <div className="flex items-center justify-center gap-1.5 mb-4 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-slate-200/90 shadow-sm max-w-md mx-auto">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => {
              setActiveSlideIndex(index);
              setActiveHotspot(null);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeSlideIndex === index
                ? 'bg-teal-700 text-white shadow-sm scale-102'
                : 'text-slate-600 hover:text-teal-700 hover:bg-slate-100'
            }`}
          >
            <span>
              {index === 0 && '👩‍⚕️ '}
              {index === 1 && '🏥 '}
              {index === 2 && '👨‍⚕️ '}
              {index === 3 && '🧑‍⚕️ '}
              {index === 0 && (isAm ? 'ዶ/ር ሰላማዊት' : 'Dr. Selam')}
              {index === 1 && (isAm ? 'ክሊኒኩ' : 'Clinic')}
              {index === 2 && (isAm ? 'ዶ/ር ሳሙኤል' : 'Dr. Samuel')}
              {index === 3 && (isAm ? 'ዶ/ር ዮናስ' : 'Dr. Yonas')}
            </span>
          </button>
        ))}
      </div>

      {/* Main 3D Card Container */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 160,
        }}
        className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group select-none cursor-pointer"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Active Image with Animated Cross-fade */}
        <div className="relative h-[440px] sm:h-[490px] w-full overflow-hidden bg-slate-950">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide.id}
              src={currentSlide.src}
              alt={currentSlide.alt}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-700"
            />
          </AnimatePresence>

          {/* Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-teal-900/10 mix-blend-overlay pointer-events-none" />

          {/* Interactive Radar Hotspots */}
          {currentSlide.hotspots.map((spot) => {
            const isOpen = activeHotspot === spot.id;
            return (
              <div
                key={spot.id}
                style={{ top: `${spot.y}%`, left: `${spot.x}%` }}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(isOpen ? null : spot.id);
                }}
                onMouseEnter={() => setActiveHotspot(spot.id)}
              >
                {/* Glowing Radar Beacon */}
                <div className="relative flex items-center justify-center">
                  <span className="absolute inline-flex h-8 w-8 animate-ping rounded-full bg-teal-400 opacity-75" />
                  <span className="relative flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg border-2 border-white hover:scale-125 transition-transform cursor-pointer">
                    <Info className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Hotspot Popover Tooltip */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 -translate-x-1/2 bottom-8 w-60 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-2xl border border-teal-200 text-slate-800 z-40"
                    >
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{spot.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">{spot.desc}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Top Floating Badge: Patient Satisfaction */}
          <div className="absolute top-4 left-4 z-20 animate-float">
            <div className="bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow-lg flex items-center gap-2 text-xs font-bold text-slate-900">
              <span className="flex text-amber-400">
                <Star className="w-3.5 h-3.5 fill-current" />
              </span>
              <span>4.9 / 5.0</span>
              <span className="text-slate-400 font-normal">|</span>
              <span className="text-teal-700 font-semibold">{isAm ? '350+ ደንበኞች' : '350+ Reviews'}</span>
            </div>
          </div>

          {/* Top Right Floating Badge: Class-B Sterile */}
          <div className="absolute top-4 right-4 z-20 animate-float-delayed">
            <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-teal-500/40 shadow-lg flex items-center gap-2 text-xs font-semibold text-teal-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isAm ? '100% ንፁህ ማምከኛ' : 'Class-B Sterile'}</span>
            </div>
          </div>

          {/* Bottom Interactive Doctor Info Card */}
          <div className="absolute bottom-4 left-4 right-4 z-20">
            <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/90 shadow-xl flex items-center justify-between gap-3 transition-all hover:bg-white">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight">
                    {currentSlide.title}
                  </h4>
                  <p className="text-xs text-teal-700 font-semibold mt-0.5">{currentSlide.role}</p>
                </div>
              </div>

              {/* Tag / Available pill */}
              <div className="hidden sm:flex flex-col items-end shrink-0">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isAm ? 'ክፍት መቀመጫ አለ' : 'Available Today'}
                </span>
                <span className="text-[10px] text-slate-400 font-medium mt-1">Bole Specialist Clinic</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Helper Text */}
      <p className="text-center text-[11px] text-slate-500 mt-2 font-medium flex items-center justify-center gap-1.5">
        <Sparkles className="w-3 h-3 text-teal-600" />
        <span>
          {isAm
            ? 'ፎቶዎቹን ለመቀየር ከላይ ይጫኑ፤ የክሊኒኩን ዝርዝሮች ለማየት ነጥቦቹን ይንኩ'
            : 'Click tabs to view specialists & clinic suite • Hover radar pins for live specs'}
        </span>
      </p>
    </div>
  );
};
