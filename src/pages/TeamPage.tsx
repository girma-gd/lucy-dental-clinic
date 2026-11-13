import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Globe, Calendar, CheckCircle2, UserCheck, Stethoscope } from 'lucide-react';
import type { Language } from '../types';
import { doctorsData } from '../data/clinicData';
import { translations } from '../data/translations';
import { ScrollReveal } from '../components/ScrollReveal';

interface TeamPageProps {
  currentLang: Language;
}

export const TeamPage: React.FC<TeamPageProps> = ({ currentLang }) => {
  const navigate = useNavigate();
  const t = (key: string) => translations[currentLang][key] || key;
  const isAm = currentLang === 'am';

  const handleBookDoctor = (docName: string, defaultService?: string) => {
    const params = new URLSearchParams();
    if (docName) params.set('doctor', docName);
    if (defaultService) params.set('service', defaultService);
    navigate(`/booking?${params.toString()}`);
  };

  const supportStaff = [
    {
      name: isAm ? 'ሲስተር ሄለን መንግስቱ' : 'Sr. Helen Mengistu',
      role: isAm ? 'ዋና የቀዶ ህክምና ነርስ እና የማምከኛ ክፍል ኃላፊ' : 'Lead Surgical Nurse & Sterilization Officer',
      exp: isAm ? '9+ ዓመታት ልምድ' : '9+ Years Clinical Exp.',
      desc: isAm
        ? 'የአውሮፓ ደረጃውን የጠበቀ የክፍልና የመሳሪያዎች ማምከኛ (Class-B Autoclave) ስራዎችን በሙሉ ሃላፊነት የምትመራ።'
        : 'Oversees hospital-grade Class-B autoclave instrument decontamination, infection barrier controls, and surgical chair prep.',
    },
    {
      name: isAm ? 'ሜሮን ወርቁ' : 'Meron Worku',
      role: isAm ? 'ከፍተኛ የጥርስ ጽዳት እና ጤንነት ባለሙያ (Hygienist)' : 'Senior Dental Hygienist & Preventive Care Specialist',
      exp: isAm ? '7+ ዓመታት ልምድ' : '7+ Years Clinical Exp.',
      desc: isAm
        ? 'የጥርስ ቆሻሻ ማንሳት፣ የድድ ጤንነት እንክብካቤ እና የአፍ ጠረን ህክምና ላይ ያተኮረች።'
        : 'Specializes in ultrasonic calculus scaling, stain polishing, periodontal pockets maintenance, and pediatric dental hygiene education.',
    },
    {
      name: isAm ? 'ቤተልሔም ኃይሉ' : 'Betelhem Hailu',
      role: isAm ? 'የደንበኞች አገልግሎት እና የቀጠሮ አስተባባሪ' : 'Patient Relations & Front Desk Coordinator',
      exp: isAm ? '6+ ዓመታት ልምድ' : '6+ Years Service Exp.',
      desc: isAm
        ? 'በስልክ እና በዋትስአፕ ፈጣን ምላሽ በመስጠት የታካሚዎችን ቀጠሮና ኢንሹራንስ የምታስተናግድ።'
        : 'Handles welcoming patient check-ins, insurance claim paperwork, appointment scheduling, and multilingual telephone inquiries.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/70 mb-3 shadow-2xs">
              {t('doctors.tag')}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
              {t('doctors.title')}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t('doctors.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Lead Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {doctorsData.map((doc, index) => {
            const specialty = isAm ? doc.specialtyAm : doc.specialtyEn;
            const credentials = isAm ? doc.credentialsAm : doc.credentialsEn;
            const bio = isAm ? doc.bioAm : doc.bioEn;
            const languages = isAm ? doc.languagesAm : doc.languagesEn;

            return (
              <ScrollReveal
                key={doc.id}
                animation="fade-up"
                delay={0.1 + index * 0.15}
                className="h-full"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-teal-300 transition-all duration-300 flex flex-col group h-full"
                >
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden bg-slate-100">
                    <img
                      src={doc.image}
                      alt={`${doc.name} - ${doc.specialtyEn}`}
                      className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                      <h3 className="text-2xl font-bold">{doc.name}</h3>
                      <p className="text-xs text-teal-300 font-semibold mt-1">{specialty}</p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-7 flex flex-col grow space-y-4">
                    {/* Credentials Badge */}
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-teal-50/60 border border-teal-100/80 px-3 py-2 rounded-xl">
                      <Award className="w-4 h-4 text-teal-700 shrink-0" />
                      <span>{credentials}</span>
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-slate-600 leading-relaxed grow">{bio}</p>

                    {/* Specializations bullets */}
                    <div className="pt-2 text-xs text-slate-700 space-y-1.5 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span className="font-semibold text-slate-800">
                          {isAm ? 'ዋና የትኩረት መስክ:' : 'Primary Focus:'} {doc.defaultService}
                        </span>
                      </div>
                    </div>

                    {/* Languages Spoken */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 border-t border-slate-100 pt-3">
                      <Globe className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>
                        <strong>{isAm ? 'ቋንቋዎች:' : 'Languages:'}</strong> {languages}
                      </span>
                    </div>

                    {/* Booking CTA */}
                    <button
                      type="button"
                      onClick={() => handleBookDoctor(doc.name, doc.defaultService)}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 shadow-md hover:shadow-lg hover:scale-102 active:scale-98 transition-all cursor-pointer"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>{t('doctors.btn.request')}</span>
                    </button>
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Clinical Support Team Section */}
        <div className="mb-20">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-100/70 px-3 py-1 rounded-full">
                {isAm ? 'የክሊኒካል ድጋፍ ቡድን' : 'Clinical Support Staff'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                {isAm ? 'ከሐኪሞቻችን ጎን ያሉ የሙያ አጋሮቻችን' : 'Our Dedicated Nurses, Hygienists & Coordinators'}
              </h2>
              <p className="text-sm text-slate-600 mt-2">
                {isAm
                  ? 'እያንዳንዱ ታካሚ በከፍተኛ ጥንቃቄ፣ ንጽህና እና አክብሮት እንዲስተናገድ ደከመኝ ሰለቸኝ ሳይሉ የሚሰሩ ባለሙያዎች።'
                  : 'Behind every successful dental procedure is a committed team upholding strict infection control and welcoming patient care.'}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportStaff.map((staff, idx) => (
              <ScrollReveal
                key={idx}
                animation="fade-up"
                delay={0.15 + idx * 0.1}
                className="h-full"
              >
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs hover:border-teal-300 transition-colors flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                        <UserCheck className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                        {staff.exp}
                      </span>
                    </div>
                    <h4 className="font-bold text-base text-slate-900">{staff.name}</h4>
                    <p className="text-xs font-semibold text-teal-700 mb-3">{staff.role}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{staff.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Our Clinical Pledge */}
        <ScrollReveal animation="zoom-in" delay={0.2}>
          <div className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-500/20 px-3 py-1 rounded-full border border-teal-400/30">
                  {isAm ? 'የሉሲ ክሊኒክ ቃል ኪዳን' : 'Our Professional Ethics Pledge'}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                  {isAm
                    ? 'ህመም የሌለው፣ እውነተኛ እና ግልጽ የጥርስ ህክምና ለመስጠት ቆርጠናል'
                    : 'Committed to Ethical, Gentle, and Transparent Dental Care'}
                </h3>
                <p className="text-sm text-teal-100/90 leading-relaxed max-w-2xl">
                  {isAm
                    ? 'በሉሲ የጥርስ ክሊኒክ አላስፈላጊ ጥርስ መንቀልን አንደግፍም፤ የተፈጥሮ ጥርስን ማዳን ቅድሚያ የምንሰጠው ጉዳይ ነው። የዋጋ ግልጽነት እና የአውሮፓ ደረጃ ማምከኛ መመሪያዎችን አጥብቀን እንከተላለን።'
                    : 'We never recommend unnecessary tooth extractions. Our conservative treatment philosophy prioritizes preserving your natural teeth, painless gentle administration, transparent pricing, and verifiable sterilization.'}
                </p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs text-teal-200">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {isAm ? 'የኢትዮጵያ የጥርስ ሐኪሞች ማህበር አባላት' : 'Ethiopian Dental Association Members'}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {isAm ? 'ተከታታይ ዓለም አቀፍ ስልጠናዎች' : 'Continuous International Medical CME'}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center lg:justify-end">
                <button
                  type="button"
                  onClick={() => navigate('/booking')}
                  className="px-8 py-4 rounded-full text-base font-extrabold text-teal-900 bg-white hover:bg-teal-50 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
                >
                  {t('nav.book')}
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
