import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhoneCall, X, ShieldAlert } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { getStoredClinicConfig } from '../services/adminContentService';

interface EmergencyStripProps {
  currentLang: Language;
}

export const EmergencyStrip: React.FC<EmergencyStripProps> = ({ currentLang }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [config, setConfig] = useState(() => getStoredClinicConfig());
  const t = (key: string) => translations[currentLang][key] || key;
  const isAm = currentLang === 'am';

  useEffect(() => {
    const handleUpdate = () => {
      setConfig(getStoredClinicConfig());
    };
    window.addEventListener('lucy_config_updated', handleUpdate);
    return () => window.removeEventListener('lucy_config_updated', handleUpdate);
  }, []);

  if (!config.emergencyActive) return null;

  const phone = config.emergencyPhone || '+251 911 234 567';

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.aside
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-950/95 backdrop-blur-md border-b border-rose-500/20 text-slate-200 relative z-30 shadow-xs overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 flex items-center justify-between gap-3">
            
            {/* Left Info: Badge & Text */}
            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap sm:flex-nowrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-rose-500/15 text-rose-300 border border-rose-500/30 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                <span>24/7 Triage</span>
              </span>

              <p className="text-xs text-slate-300 font-medium">
                <strong className="text-white font-bold">
                  {isAm ? config.emergencyBannerTextAm || t('strip.title') : config.emergencyBannerTextEn || t('strip.title')}
                </strong>
              </p>
            </div>

            {/* Right Action: Call Button & Dismiss 'X' */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-xs text-white bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-xs shadow-rose-900/40 hover:scale-102 active:scale-95 transition-all cursor-pointer"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{phone}</span>
              </a>

              <button
                type="button"
                onClick={() => setIsDismissed(true)}
                aria-label="Dismiss emergency banner"
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
                title="Dismiss banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};
