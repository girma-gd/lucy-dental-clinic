import React from 'react';
import { Phone, Clock, MapPin } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';

interface TopBarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const TopBar: React.FC<TopBarProps> = ({ currentLang, onLanguageChange }) => {
  const t = (key: string) => translations[currentLang][key] || key;

  return (
    <aside className="bg-slate-950 text-slate-200 text-xs py-1.5 sm:py-2 border-b border-slate-800/80 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        {/* Contact Hotline & Location */}
        <div className="flex items-center gap-3 sm:gap-6 truncate">
          <div className="flex items-center gap-1.5 shrink-0">
            <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="hidden xs:inline text-slate-400">{t('top.emergency')}</span>
            <a
              href="tel:+251911234567"
              className="font-bold text-white hover:text-teal-400 transition-colors whitespace-nowrap text-xs"
            >
              +251 911 234 567
            </a>
          </div>
          <div className="hidden md:flex items-center gap-1.5 text-slate-400 truncate">
            <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
            <span className="truncate">Addis Ababa, Bole (Behind Edna Mall)</span>
          </div>
        </div>

        {/* Operating Hours & Bilingual Switcher */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-1.5 bg-teal-950/60 text-teal-300 border border-teal-800/50 px-2.5 py-0.5 rounded-full font-medium text-[11px]">
            <Clock className="w-3 h-3 text-teal-400 shrink-0" />
            <span>{t('top.hours')}</span>
          </div>

          {/* Bilingual Switcher */}
          <div className="inline-flex items-center bg-slate-800/90 rounded-full p-0.5 border border-slate-700/80 shrink-0" role="group" aria-label="Language Selector">
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                currentLang === 'en'
                  ? 'bg-teal-500 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('am')}
              className={`px-2 sm:px-2.5 py-0.5 rounded-full text-[11px] font-bold transition-all duration-200 cursor-pointer ${
                currentLang === 'am'
                  ? 'bg-teal-500 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              አማርኛ
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
