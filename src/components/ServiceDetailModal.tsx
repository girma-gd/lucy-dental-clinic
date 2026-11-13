import React from 'react';
import { X, Clock, CheckCircle2, DollarSign, Calendar } from 'lucide-react';
import type { DentalService, Language } from '../types';

interface ServiceDetailModalProps {
  service: DentalService | null;
  currentLang: Language;
  onClose: () => void;
  onBook: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  currentLang,
  onClose,
  onBook,
}) => {
  if (!service) return null;

  const isAm = currentLang === 'am';
  const title = isAm ? service.titleAm : service.titleEn;
  const subtitle = isAm ? service.titleEn : service.titleAm;
  const desc = isAm ? service.descAm : service.descEn;
  const highlights = isAm ? service.highlightsAm : service.highlightsEn;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900 to-teal-800 text-white p-6 sm:p-8 flex items-start justify-between">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-2">
              {service.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold">{title}</h3>
            <p className="text-sm text-teal-200 font-medium mt-1">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <p className="text-slate-600 text-base leading-relaxed">{desc}</p>

          {/* Quick Specs */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-medium">Session Duration</span>
                <span className="text-sm font-bold text-slate-800">{service.duration}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-slate-500 block font-medium">Estimated Cost</span>
                <span className="text-sm font-bold text-emerald-700">{service.priceRange}</span>
              </div>
            </div>
          </div>

          {/* Key Clinical Benefits */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-3">
              {isAm ? 'ዋና የህክምና ጥቅሞች' : 'Key Clinical Benefits'}
            </h4>
            <ul className="space-y-2.5">
              {highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-full text-sm font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            {isAm ? 'ዝጋ' : 'Close'}
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onBook(service.titleEn);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600 shadow-md transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>{isAm ? 'ለዚህ ህክምና ቀጠሮ ያስይዙ' : 'Request Appointment for This Treatment'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
