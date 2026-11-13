import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Info,
  CheckCircle2,
  Calendar,
  Clock,
  Search,
} from 'lucide-react';
import type { Language, DentalService } from '../types';
import { servicesData } from '../data/clinicData';
import { translations } from '../data/translations';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
import { FaqSection } from '../components/FaqSection';
import { ScrollReveal } from '../components/ScrollReveal';

interface ServicesPageProps {
  currentLang: Language;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ currentLang }) => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<DentalService | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const t = (key: string) => translations[currentLang][key] || key;
  const isAm = currentLang === 'am';

  const categories = [
    { id: 'all', labelEn: 'All Services', labelAm: 'ሁሉም አገልግሎቶች' },
    { id: 'Preventive', labelEn: 'Preventive', labelAm: 'መከላከያ እና ምርመራ' },
    { id: 'Cosmetic & Hygiene', labelEn: 'Cosmetic & Hygiene', labelAm: 'ጽዳት እና ማብራት' },
    { id: 'Restorative', labelEn: 'Restorative', labelAm: 'የጥርስ ስር ህክምና' },
    { id: 'Surgical Specialist', labelEn: 'Surgical & Implants', labelAm: 'የጥርስ ተከላ እና ቀዶ ህክምና' },
    { id: 'Orthodontics', labelEn: 'Orthodontics', labelAm: 'የጥርስ ማስተካከያ (Braces)' },
    { id: 'Family & Children', labelEn: 'Pediatric', labelAm: 'የህፃናት ህክምና' },
  ];

  const filteredServices = servicesData.filter((svc) => {
    const matchesCategory =
      selectedCategory === 'all' || svc.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const title = isAm ? svc.titleAm : svc.titleEn;
    const desc = isAm ? svc.descAm : svc.descEn;
    const matchesSearch =
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      svc.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleBookService = (serviceName: string) => {
    navigate(`/booking?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-teal-700" />
              <span>{isAm ? 'የሉሲ የጥርስ ክሊኒክ አገልግሎቶች' : 'Full Dental Treatments & Procedures'}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-5">
              {t('services.title')}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Filter and Search Bar */}
        <ScrollReveal animation="fade-up" delay={0.2}>
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full md:flex-wrap w-full md:w-auto scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedCategory === cat.id
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isAm ? cat.labelAm : cat.labelEn}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAm ? 'አገልግሎት ፈልግ...' : 'Search treatments...'}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
              />
            </div>
          </div>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredServices.map((service, index) => {
            const title = isAm ? service.titleAm : service.titleEn;
            const subtitle = isAm ? service.titleEn : service.titleAm;
            const desc = isAm ? service.descAm : service.descEn;
            const highlights = isAm ? service.highlightsAm : service.highlightsEn;

            return (
              <ScrollReveal
                key={service.id}
                animation="fade-up"
                delay={0.08 * (index % 6)}
                className="h-full"
              >
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col group relative overflow-hidden h-full"
                >
                  {/* Top Accent Stripe */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-600 to-cyan-500 opacity-90" />

                  {/* Category & Duration */}
                  <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                      {service.category}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-teal-600" />
                      <span>{service.duration}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-1 leading-snug">
                    {title}
                  </h2>
                  <p className="text-xs font-semibold text-teal-600 mb-3">{subtitle}</p>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-6 grow">
                    {desc}
                  </p>

                  {/* Highlights List */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-dashed border-slate-200 text-xs text-slate-700">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      {isAm ? 'ዋና ዋና ማካተቻዎች' : 'Treatment Highlights'}
                    </span>
                    {highlights.map((h, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer with Price Tag & Action Buttons */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium uppercase tracking-wider">
                        {isAm ? 'የዋጋ ክልል' : 'Price Range'}
                      </span>
                      <span className="text-xs font-black text-teal-900 bg-teal-50 px-2.5 py-1 rounded-md inline-block">
                        {service.priceRange}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedService(service)}
                        className="p-2 rounded-full text-slate-500 hover:text-teal-700 hover:bg-slate-100 transition-colors cursor-pointer"
                        title={t('services.btn.modal')}
                        aria-label="View treatment details"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleBookService(service.titleEn)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{isAm ? 'ቀጠሮ ያስይዙ' : 'Book Now'}</span>
                      </button>
                    </div>
                  </div>
                </motion.article>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Treatment Flow Banner */}
        <ScrollReveal animation="fade-up" delay={0.2}>
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-md mb-20">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                {isAm ? 'ቀላል የህክምና ሂደት' : 'Patient Care Protocol'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                {isAm ? 'በሉሲ የጥርስ ክሊኒክ እንዴት ይታከማሉ?' : 'How Your Treatment Works at Lucy Dental'}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: 1,
                  title: isAm ? 'ቀጠሮ ማስያዝ' : 'Online Booking',
                  desc: isAm ? 'በድረ-ገጽ ወይም በዋትስአፕ በደቂቃዎች ውስጥ ቀጠሮዎን ያስይዛሉ' : 'Reserve your preferred chair date and specialist in under 60 seconds.',
                },
                {
                  step: 2,
                  title: isAm ? 'ዲጂታል 3D ምርመራ' : 'Digital 3D Exam',
                  desc: isAm ? 'አነስተኛ ጨረር ባለው ዘመናዊ ኤክስሬይ ጥርስዎን እንመረምራለን' : 'Low-radiation panoramic X-ray and detailed intraoral assessment.',
                },
                {
                  step: 3,
                  title: isAm ? 'ህመም-አልባ ህክምና' : 'Painless Care',
                  desc: isAm ? 'በቅድመ ማደንዘዣ ቅባት እና በዘመናዊ ቴክኖሎጂ ያለ ምንም ህመም ይታከማሉ' : 'Gentle local anesthesia and precision restorative or surgical treatment.',
                },
                {
                  step: 4,
                  title: isAm ? 'ቀጣይ ክትትል' : 'Aftercare Support',
                  desc: isAm ? 'በስልክ ደውለን ጤንነትዎን እንከታተላለን፤ ምክክርም እንሰጣለን' : 'Follow-up phone review, hygiene guidance, and continuous smile support.',
                },
              ].map((item) => (
                <div key={item.step} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center hover:border-teal-300 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-teal-600 text-white font-bold flex items-center justify-center mx-auto mb-3 shadow-sm">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* FAQs */}
        <ScrollReveal animation="fade-up" delay={0.25}>
          <FaqSection currentLang={currentLang} />
        </ScrollReveal>

      </div>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        currentLang={currentLang}
        onClose={() => setSelectedService(null)}
        onBook={(svcName) => {
          setSelectedService(null);
          handleBookService(svcName);
        }}
      />
    </div>
  );
};
