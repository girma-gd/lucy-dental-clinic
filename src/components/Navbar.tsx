import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Phone, Menu, X, Calendar } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';

interface NavbarProps {
  currentLang: Language;
}

export const Navbar: React.FC<NavbarProps> = ({ currentLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const t = (key: string) => translations[currentLang][key] || key;

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/team', label: t('nav.staff') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/testimonials', label: t('nav.reviews') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
  ];

  return (
    <>
      <header className="sticky top-0 sm:top-7 lg:top-8 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0" onClick={() => setMobileMenuOpen(false)}>
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform shrink-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M17.5 3C15.5 3 14 4.5 14 6.5c0 1.2.6 2.3 1.5 3-.9 1.5-2.2 2.5-3.5 2.5s-2.6-1-3.5-2.5c.9-.7 1.5-1.8 1.5-3C10 4.5 8.5 3 6.5 3 4.6 3 3 4.6 3 6.5c0 2.2 1.3 4.1 3.2 5.1-.1.5-.2 1-.2 1.4 0 3.3 2.7 6 6 6s6-2.7 6-6c0-.4-.1-.9-.2-1.4 1.9-1 3.2-2.9 3.2-5.1C21 4.6 19.4 3 17.5 3z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight text-slate-900 group-hover:text-teal-700 transition-colors leading-none">
                  LUCY DENTAL
                </span>
                <span className="text-[9px] sm:text-xs font-semibold tracking-wider uppercase text-teal-600 mt-0.5 sm:mt-1">
                  Specialist Clinic • Addis Ababa
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-3.5 xl:gap-6 shrink-0">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `text-xs xl:text-sm font-bold whitespace-nowrap transition-colors relative py-1 hover:text-teal-700 ${
                      isActive
                        ? 'text-teal-700 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-teal-600'
                        : 'text-slate-600 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-500 after:transition-all hover:after:w-full'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Header Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Emergency Hotline Button (shown on ultra-wide screens) */}
              <a
                href="tel:+251911234567"
                className="hidden 2xl:inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-600 hover:text-white transition-all shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse-glow shrink-0" />
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>{t('emergency.call')}</span>
              </a>

              {/* Book Appointment CTA */}
              <button
                type="button"
                onClick={() => navigate('/booking')}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap text-white bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600 shadow-md shadow-teal-500/25 hover:shadow-lg hover:shadow-teal-500/35 hover:-translate-y-0.5 transition-all shrink-0 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>{t('nav.book')}</span>
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-5 py-5 shadow-2xl animate-in slide-in-from-top-4 duration-200">
            <nav className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-sm sm:text-base font-bold py-2.5 px-4 rounded-xl transition-all ${
                      isActive
                        ? 'bg-teal-50 text-teal-700 font-extrabold shadow-2xs'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-teal-700'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2.5">
                <a
                  href="tel:+251911234567"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl text-xs sm:text-sm font-bold bg-rose-50 text-rose-700 border border-rose-200/80 active:scale-98 transition-all"
                >
                  <Phone className="w-4 h-4 text-rose-600" />
                  <span>{t('emergency.call')}: +251 911 234 567</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/booking');
                  }}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-black bg-gradient-to-r from-teal-700 to-teal-500 text-white shadow-md active:scale-98 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{t('nav.book')}</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile menu drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/40 backdrop-blur-xs lg:hidden"
        />
      )}
    </>
  );
};
