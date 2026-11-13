import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  CreditCard,
  Navigation,
  Send,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { ScrollReveal } from '../components/ScrollReveal';
import { submitContactInquiry } from '../services/contactInquiryService';

interface ContactPageProps {
  currentLang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ currentLang }) => {
  const t = (key: string) => translations[currentLang][key] || key;
  const isAm = currentLang === 'am';

  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General Question',
    message: '',
  });
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const refId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const inquiryPayload = {
      inquiryId: refId,
      name: formState.name,
      phone: formState.phone,
      email: formState.email,
      subject: formState.subject,
      message: formState.message,
    };

    try {
      await submitContactInquiry(inquiryPayload);
    } catch (err) {
      console.warn('Inquiry submission notice:', err);
    } finally {
      setIsSubmitting(false);
      setSent(true);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/70 mb-3 shadow-2xs">
              {t('contact.tag')}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t('contact.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Contact Grid: Info Cards + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">

          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">

            {/* Address */}
            <ScrollReveal animation="fade-right" delay={0.15}>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-teal-300 transition-colors">
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
            </ScrollReveal>

            {/* Telephone & WhatsApp */}
            <ScrollReveal animation="fade-right" delay={0.25}>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-teal-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{t('contact.phone.title')}</h3>
                    <div className="mt-1 space-y-2 text-sm font-semibold text-slate-800">
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="text-slate-500 font-normal">Emergency / WhatsApp:</span>
                        <a href="tel:+251911234567" className="text-teal-700 hover:underline font-bold whitespace-nowrap">
                          +251 911 234 567
                        </a>
                      </div>
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="text-slate-500 font-normal">Front Desk Landline:</span>
                        <a href="tel:+251116182020" className="text-teal-700 hover:underline font-bold whitespace-nowrap">
                          +251 116 182 020
                        </a>
                      </div>
                      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                        <span className="text-slate-500 font-normal">Email:</span>
                        <a href="mailto:care@lucydental.et" className="text-teal-700 hover:underline font-bold break-all">
                          care@lucydental.et
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Working Hours */}
            <ScrollReveal animation="fade-right" delay={0.35}>
              <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-teal-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{t('contact.hours.title')}</h3>
                    <div className="mt-2 space-y-1 text-xs text-slate-600 font-medium">
                      <p className="flex justify-between">
                        <span className="text-slate-800 font-bold">Monday – Saturday:</span>
                        <span>8:30 AM – 7:00 PM</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-slate-800 font-bold">Sunday:</span>
                        <span>9:00 AM – 1:00 PM</span>
                      </p>
                      <p className="text-rose-600 font-semibold pt-1">
                        * Emergency acute dental pain triage available 24/7 on call.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Payment methods */}
            <ScrollReveal animation="fade-right" delay={0.45}>
              <div className="p-5 rounded-2xl bg-teal-50/80 border border-teal-200 text-xs text-teal-900 flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-teal-700 shrink-0" />
                <span>
                  <strong>Accepted Payments:</strong> Telebirr, CBE Birr, Awash Bank, Cash, and verified private medical insurance.
                </span>
              </div>
            </ScrollReveal>

          </div>

          {/* Interactive Google Map */}
          <div className="lg:col-span-7 h-full">
            <ScrollReveal animation="fade-left" delay={0.2} className="h-full">
              <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xl bg-white flex flex-col min-h-[460px] h-full relative">
                <iframe
                  title="Lucy Dental Clinic Bole Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6695279626356!2d38.7854!3d8.9984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8504f7f6311f%3A0xb367c331ec3fae54!2sEdna%20Mall!5e0!3m2!1sen!2set!4v1714000000000!5m2!1sen!2set"
                  className="w-full h-full min-h-[400px] border-0 grow"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-700">
                    <span className="font-bold block">Bole Medhanialem / Edna Mall Area, Lex Plaza 3rd Floor</span>
                    <span className="text-slate-500">Accessible elevator • Secure basement parking</span>
                  </div>
                  <a
                    href="https://maps.google.com/?q=8.9984,38.7876"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 px-4 py-2 rounded-full transition-all shadow-xs shrink-0 hover:scale-105 active:scale-95"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps</span>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>

        {/* Message Inquiry Form */}
        <ScrollReveal animation="fade-up" delay={0.3}>
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md max-w-4xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full">
                {isAm ? 'ጥያቄ ወይም አስተያየት ካለዎት' : 'Send an Inquiry'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                {isAm ? 'መልእክትዎን ይላኩልን' : 'Have a Question for Our Dental Team?'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                {isAm
                  ? 'የክሊኒካችን አስተናጋጆች መልእክትዎን አይተው በስልክ ወይም በኢሜይል ምላሽ ይሰጡዎታል።'
                  : 'Fill out the form below and our clinical reception coordinator will get back to you promptly.'}
              </p>
            </div>

            {sent ? (
              <div className="p-8 text-center bg-teal-50 rounded-2xl border border-teal-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-teal-600 mx-auto" />
                <h3 className="text-xl font-bold text-slate-900">{isAm ? 'መልእክትዎ ደርሶናል!' : 'Message Sent Successfully!'}</h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  {isAm
                    ? 'እናመሰግናለን፤ የክሊኒካችን አስተናጋጆች በስልክ ቁጥርዎ በቅርቡ ያነጋግሩዎታል።'
                    : 'Thank you for reaching out. We will respond to your phone number shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAm ? 'ሙሉ ስም *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Abebe Tesfaye"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAm ? 'የስልክ ቁጥር *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder="0911234567"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAm ? 'ኢሜይል (አስገዳጅ ያልሆነ)' : 'Email (Optional)'}
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAm ? 'የጉዳዩ ርዕስ' : 'Inquiry Subject'}
                    </label>
                    <select
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="General Question">General Treatment Question</option>
                      <option value="Price Estimate">Price & Payment Quote</option>
                      <option value="Insurance Coverage">Medical Insurance Inquiry</option>
                      <option value="Emergency Consultation">Urgent Emergency Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAm ? 'መልእክት *' : 'Your Message / Inquiry *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder={isAm ? 'ጥያቄዎን እዚህ ያብራሩ...' : 'How can our dental team assist you today?'}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="text-right pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-white bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 disabled:opacity-60 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isAm ? 'በመላክ ላይ...' : 'Sending...'}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{isAm ? 'መልእክቱን ላክ' : 'Send Message'}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
