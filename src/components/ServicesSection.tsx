import React, { useState } from 'react';
import { ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import type { DentalService, Language } from '../types';
import { servicesData } from '../data/clinicData';
import { translations } from '../data/translations';
import { ServiceDetailModal } from './ServiceDetailModal';

interface ServicesSectionProps {
  currentLang: Language;
  onRequestService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  currentLang,
  onRequestService,
}) => {
  const [selectedService, setSelectedService] = useState<DentalService | null>(null);
  const t = (key: string) => translations[currentLang][key] || key;
  const isAm = currentLang === 'am';

  return (
    <section id="services" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-700 bg-teal-100/70 mb-3">
            {t('services.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            {t('services.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const title = isAm ? service.titleAm : service.titleEn;
            const subtitle = isAm ? service.titleEn : service.titleAm;
            const desc = isAm ? service.descAm : service.descEn;

            return (
              <article
                key={service.id}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-teal-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col group relative overflow-hidden"
              >
                {/* Top Colored Accent Stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                {/* Service Category & Duration Pill */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                    {service.category}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100">
                    {service.duration}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-1 leading-snug">
                  {title}
                </h3>
                <p className="text-xs font-semibold text-teal-600 mb-3">{subtitle}</p>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed mb-5 grow">
                  {desc}
                </p>

                {/* Quick Highlights */}
                <ul className="space-y-2 mb-6 pt-4 border-t border-dashed border-slate-200 text-xs text-slate-600">
                  {(isAm ? service.highlightsAm : service.highlightsEn).slice(0, 2).map((h, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer with Price Tag & Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                  <span className="text-xs font-extrabold text-teal-800 bg-teal-50/80 px-2.5 py-1 rounded-md">
                    {service.priceRange}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className="p-2 rounded-full text-slate-400 hover:text-teal-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      title={t('services.btn.modal')}
                      aria-label="View treatment details"
                    >
                      <Info className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onRequestService(service.titleEn)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors group-hover:translate-x-1 cursor-pointer"
                    >
                      <span>{isAm ? 'ቀጠሮ ያስይዙ' : 'Book Care'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* In-Depth Treatment Detail Modal */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          currentLang={currentLang}
          onClose={() => setSelectedService(null)}
          onBook={onRequestService}
        />
      )}
    </section>
  );
};
