import React from 'react';
import { MapPin, Phone, Clock, CreditCard, Navigation } from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';

interface ContactSectionProps {
  currentLang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ currentLang }) => {
  const t = (key: string) => translations[currentLang][key] || key;

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/70 mb-3">
            {t('contact.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Contact Grid & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Address */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{t('contact.address.title')}</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    {t('contact.address.desc')}
                  </p>
                  <p className="text-xs font-bold text-teal-700 mt-2">
                    {t('contact.landmark')}
                  </p>
                </div>
              </div>
            </div>

            {/* Telephone */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{t('contact.phone.title')}</h3>
                  <div className="mt-1 space-y-1 text-sm font-semibold text-slate-800">
                    <p>
                      Mobile / WhatsApp:{' '}
                      <a href="tel:+251911234567" className="text-teal-700 hover:underline">
                        +251 911 234 567
                      </a>
                    </p>
                    <p>
                      Reception Landline:{' '}
                      <a href="tel:+251116182020" className="text-teal-700 hover:underline">
                        +251 116 182 020
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">{t('contact.hours.title')}</h3>
                  <p className="text-sm text-slate-600 mt-1">{t('top.hours')}</p>
                </div>
              </div>
            </div>

            {/* Payment methods */}
            <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-teal-700 shrink-0" />
              <span>
                <strong>Accepted Payments:</strong> Telebirr, CBE Birr, Awash Bank, Cash, & Medical Insurance.
              </span>
            </div>

          </div>

          {/* Interactive Visual Map Card */}
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 overflow-hidden shadow-xl bg-slate-100 flex flex-col min-h-[400px] relative">
            <iframe
              title="Lucy Dental Clinic Bole Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6695279626356!2d38.7854!3d8.9984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8504f7f6311f%3A0xb367c331ec3fae54!2sEdna%20Mall!5e0!3m2!1sen!2set!4v1714000000000!5m2!1sen!2set"
              className="w-full h-full min-h-[380px] border-0 grow"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">
                Bole Medhanialem / Edna Mall Area, Lex Plaza 3rd Floor
              </span>
              <a
                href="https://maps.google.com/?q=8.9984,38.7876"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
