import React from 'react';
import { ShieldCheck, Sparkles, Activity, CheckCircle2 } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';

interface SafetySectionProps {
  currentLang: Language;
}

export const SafetySection: React.FC<SafetySectionProps> = ({ currentLang }) => {
  const t = (key: string) => translations[currentLang][key] || key;

  return (
    <section id="safety" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-emerald-800 bg-emerald-100/80 mb-3">
            {t('safety.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            {t('safety.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('safety.subtitle')}
          </p>
        </div>

        {/* Feature Grid with Image Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: 3 Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {t('safety.item1.title')}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('safety.item1.desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {t('safety.item2.title')}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('safety.item2.desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {t('safety.item3.title')}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t('safety.item3.desc')}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clinic Hygiene Photo */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-100 relative group">
              <img
                src="/assets/images/clinic-interior.jpg"
                alt="Lucy Dental Modern Sterile Clinic Interior in Bole Addis Ababa"
                className="w-full h-[400px] object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Addis Ababa Hygiene Standard
                </span>
                <p className="text-sm font-medium mt-1 text-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  100% Autoclave vacuum sterilized patient kits
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
