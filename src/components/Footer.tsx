import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, MapPin, Clock, Calendar } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  currentLang: Language;
}

export const Footer: React.FC<FooterProps> = ({ currentLang }) => {
  const navigate = useNavigate();
  const t = (key: string) => translations[currentLang][key] || key;

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform">
                L
              </div>
              <span className="text-xl font-black text-white tracking-tight group-hover:text-teal-400 transition-colors">
                LUCY DENTAL CLINIC
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              {t('footer.desc')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/booking')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-teal-600 hover:bg-teal-500 transition-all cursor-pointer shadow-xs"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>{t('nav.book')}</span>
              </button>
              <a
                href="tel:+251911234567"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-rose-400 bg-rose-950/60 border border-rose-900/60 hover:bg-rose-900/50 transition-all"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+251 911 234 567</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t('footer.quicklinks')}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-teal-400 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-teal-400 transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-teal-400 transition-colors">
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-teal-400 transition-colors">
                  {t('nav.staff')}
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-teal-400 transition-colors">
                  {t('nav.reviews')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-teal-400 transition-colors">
                  {t('nav.blog')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-400 transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/booking" className="hover:text-teal-400 transition-colors">
                  {t('nav.book')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              {t('footer.hours')}
            </h4>
            <div className="text-sm text-slate-400 space-y-2.5">
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{t('top.hours')}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>Bole, Behind Edna Mall & Bole Medhanialem, Lex Plaza 3rd Floor, Addis Ababa</span>
              </p>
              <div className="pt-2">
                <Link
                  to="/contact"
                  className="text-xs font-semibold text-teal-400 hover:text-teal-300 underline underline-offset-4"
                >
                  View Interactive Map & Directions →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="max-w-2xl leading-relaxed">
            {t('footer.disclaimer')}
          </p>
          <p className="shrink-0 font-medium">
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};
