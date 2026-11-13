import React from 'react';
import { Award, Globe, Calendar } from 'lucide-react';
import type { Language } from '../types';
import { doctorsData } from '../data/clinicData';
import { translations } from '../data/translations';

interface DoctorsSectionProps {
  currentLang: Language;
  onRequestDoctor: (doctorName: string, defaultService?: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({
  currentLang,
  onRequestDoctor,
}) => {
  const t = (key: string) => translations[currentLang][key] || key;
  const isAm = currentLang === 'am';

  return (
    <section id="doctors" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/70 mb-3">
            {t('doctors.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            {t('doctors.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('doctors.subtitle')}
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctorsData.map((doc) => {
            const specialty = isAm ? doc.specialtyAm : doc.specialtyEn;
            const credentials = isAm ? doc.credentialsAm : doc.credentialsEn;
            const bio = isAm ? doc.bioAm : doc.bioEn;
            const languages = isAm ? doc.languagesAm : doc.languagesEn;

            return (
              <div
                key={doc.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col group"
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden bg-slate-100">
                  <img
                    src={doc.image}
                    alt={`${doc.name} - ${doc.specialtyEn}`}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                    <h3 className="text-xl font-bold">{doc.name}</h3>
                    <p className="text-xs text-teal-300 font-medium mt-0.5">{specialty}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow space-y-4">
                  {/* Credentials Badge */}
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
                    <Award className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{credentials}</span>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-slate-600 leading-relaxed grow">{bio}</p>

                  {/* Languages Spoken */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 border-t border-slate-100 pt-3">
                    <Globe className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{languages}</span>
                  </div>

                  {/* CTA Button */}
                  <button
                    type="button"
                    onClick={() => onRequestDoctor(doc.name, doc.defaultService)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-teal-700 bg-teal-50 hover:bg-teal-600 hover:text-white border border-teal-200 hover:border-transparent transition-all cursor-pointer shadow-2xs"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{t('doctors.btn.request')}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
