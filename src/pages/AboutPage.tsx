import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Building2,
  Microscope,
  Heart,
  Award,
} from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { SafetySection } from '../components/SafetySection';
import { ScrollReveal } from '../components/ScrollReveal';

interface AboutPageProps {
  currentLang: Language;
}

export const AboutPage: React.FC<AboutPageProps> = ({ currentLang }) => {
  const navigate = useNavigate();
  const t = (key: string) => translations[currentLang][key] || key;
  const isAm = currentLang === 'am';

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/70 mb-3 shadow-2xs">
              {t('nav.about')}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
              {isAm ? 'ስለ ሉሲ የጥርስ ስፔሻሊቲ ክሊኒክ' : 'About Lucy Dental Specialist Clinic'}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {isAm
                ? 'በአዲስ አበባ ከተማ አለም አቀፍ ደረጃውን የጠበቀ፣ ህመም የሌለው እና በታማኝነት ላይ የተመሰረተ የጥርስ ህክምና አገልግሎት እንሰጣለን።'
                : 'Addis Ababa’s premier dental center combining European sterilization protocols, cutting-edge digital diagnostics, and compassionate Ethiopian clinicians.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Story & Clinic Intro */}
        <ScrollReveal animation="fade-up" delay={0.2}>
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                  {isAm ? 'የእኛ ታሪክ እና ራዕይ' : 'Our Story & Purpose'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug">
                  {isAm
                    ? 'የታካሚውን ፍርሃትና ህመም የሚያስወግድ ዘመናዊ የህክምና ማዕከል'
                    : 'Transforming Dental Healthcare in Ethiopia Through Gentleness & Technology'}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {isAm
                    ? 'ሉሲ የጥርስ ስፔሻሊቲ ክሊኒክ የተመሰረተው ታካሚዎች የጥርስ ህክምና ሲያስቡ የሚሰማቸውን ፍርሃት፣ ጭንቀት እና ህመም ለማስቀረት ባለው ጽኑ ዓላማ ነው። በአዲስ አበባ ቦሌ መድኃኔዓለም እምብርት የሚገኘው ማዕከላችን እጅግ ዘመናዊ የ3D ዲጂታል ኤክስሬይ እና የጥርስ ህክምና ወንበሮችን አሟልቷል።'
                    : 'Lucy Dental Clinic was founded with a single mission: to eliminate the fear, pain, and uncertainty commonly associated with dental visits in Addis Ababa. Located conveniently in Bole behind Edna Mall, our facility combines cutting-edge diagnostics with doctors who genuinely listen.'}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{isAm ? 'ፍቅር እና ርህራሄ' : 'Patient-First Focus'}</h4>
                      <p className="text-xs text-slate-500">{isAm ? 'እርጋታ የተሞላበት እንክብካቤ' : 'Compassionate bed-side manner'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center shrink-0">
                      <Microscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{isAm ? 'ዲጂታል ቴክኖሎጂ' : 'Digital Diagnostics'}</h4>
                      <p className="text-xs text-slate-500">{isAm ? 'አነስተኛ ጨረር ያለው 3D' : '80% lower radiation imaging'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-slate-100 group">
                  <img
                    src="/assets/images/clinic-interior.jpg"
                    alt="Lucy Dental Modern Clinic in Bole Addis Ababa"
                    className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Safety & Hygiene Section */}
        <ScrollReveal animation="fade-up" delay={0.25}>
          <div className="mb-16">
            <SafetySection currentLang={currentLang} />
          </div>
        </ScrollReveal>

        {/* Clinic Amenities */}
        <ScrollReveal animation="fade-up" delay={0.3}>
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-md mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                {isAm ? 'የክሊኒኩ ምቾቶች' : 'Patient Amenities'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                {isAm ? 'ለእርስዎ እና ለቤተሰብዎ ምቾት የተዘጋጀ' : 'Designed for Comfort & Accessibility'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-300 transition-colors">
                <Building2 className="w-8 h-8 text-teal-600 mb-3" />
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {isAm ? 'ሊፍት እና ሰፊ የመኪና ማቆሚያ' : 'Modern Elevator & Secure Parking'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAm
                    ? 'በሌክስ ፕላዛ 3ኛ ፎቅ ላይ የሚገኘው ክሊኒካችን በአስተማማኝ ሊፍት እና በመሬት ውስጥ የመኪና ማቆሚያ የተደራጀ ነው።'
                    : 'Located on the 3rd floor of Lex Plaza with reliable elevators, wheelchair accessibility, and secure basement parking.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-300 transition-colors">
                <Sparkles className="w-8 h-8 text-teal-600 mb-3" />
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {isAm ? 'የህፃናት መጫወቻ እና ምቹ መቀመጫ' : 'Kids Play Area & Relaxing Lounge'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAm
                    ? 'ህፃናትና ቤተሰቦች ያለምንም ጭንቀት የሚቆዩበት ዘመናዊ እና ሰላማዊ የእንግዳ መቀበያ ሳሎን።'
                    : 'A tranquil reception lounge with complimentary Wi-Fi, refreshments, and interactive entertainment for children.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-teal-300 transition-colors">
                <Award className="w-8 h-8 text-teal-600 mb-3" />
                <h4 className="font-bold text-slate-900 text-base mb-1">
                  {isAm ? 'የተረጋገጠ የህክምና ፍቃድ' : 'Official MOH & EDA Accreditation'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isAm
                    ? 'በኢትዮጵያ ጤና ጥበቃ ሚኒስቴር ሙሉ ፍቃድ ያለው እና የኢትዮጵያ የጥርስ ሐኪሞች ማህበር አባል ክሊኒክ።'
                    : 'Fully certified specialist clinic accredited by the Ethiopian Ministry of Health and active members of the EDA.'}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal animation="zoom-in" delay={0.25}>
          <div className="text-center bg-gradient-to-r from-teal-800 to-teal-700 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
              {isAm ? 'ዛሬውኑ ቀጠሮዎን ያስይዙ' : 'Ready to Experience Gentle Dental Care?'}
            </h3>
            <p className="text-teal-100 text-sm max-w-xl mx-auto mb-6">
              {isAm
                ? 'የጥርስ ጤንነትዎን ለባለሙያዎቻችን በአደራ ይስጡ። በደቂቃዎች ውስጥ ቀጠሮዎን ያስይዙ።'
                : 'Our team is ready to welcome you and restore your confidence with a healthy, radiant smile.'}
            </p>
            <button
              type="button"
              onClick={() => navigate('/booking')}
              className="px-8 py-3.5 rounded-full text-base font-bold text-teal-900 bg-white hover:bg-teal-50 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {t('nav.book')}
            </button>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
