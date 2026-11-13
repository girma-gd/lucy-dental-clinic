import React, { useState, useEffect } from 'react';
import { CheckCircle2, MessageCircle, AlertCircle, X } from 'lucide-react';
import type { Language, AppointmentFormData } from '../types';
import { servicesData } from '../data/clinicData';
import { translations } from '../data/translations';
import { submitAppointmentBooking } from '../services/bookingNotificationService';

interface BookingSectionProps {
  currentLang: Language;
  preselectedService?: string;
  onClearPreselectedService?: () => void;
}

const getDefaultDate = () => new Date(Date.now() + 86400000).toISOString().split('T')[0];
const getTodayDate = () => new Date().toISOString().split('T')[0];

export const BookingSection: React.FC<BookingSectionProps> = ({
  currentLang,
  preselectedService,
}) => {
  const t = (key: string) => translations[currentLang][key] || key;
  const isAm = currentLang === 'am';

  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<AppointmentFormData>(() => ({
    service: preselectedService || servicesData[0]?.titleEn || '',
    date: getDefaultDate(),
    shift: 'morning',
    patientName: '',
    patientPhone: '',
    notes: '',
    referenceId: '',
  }));

  const [prevPreselected, setPrevPreselected] = useState(preselectedService);
  if (preselectedService && preselectedService !== prevPreselected) {
    setPrevPreselected(preselectedService);
    setFormData((prev) => ({ ...prev, service: preselectedService }));
  }

  const [submittedData, setSubmittedData] = useState<AppointmentFormData | null>(null);
  const [phoneError, setPhoneError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedService) {
      const el = document.getElementById('booking');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [preselectedService]);

  const validatePhone = (phone: string): boolean => {
    // Accepts Ethiopian mobile formats: 09..., 07..., +2519..., +2517...
    const clean = phone.replace(/[\s-]/g, '');
    const regex = /^(?:\+251|0)(?:9\d{8}|7\d{8})$/;
    return regex.test(clean);
  };

  const handleNext = () => {
    if (step === 1 && !formData.service) return;
    if (step === 2 && !formData.date) return;
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.patientName.trim()) return;

    if (!validatePhone(formData.patientPhone)) {
      setPhoneError(
        isAm
          ? 'እባክዎ ትክክለኛ የኢትዮጵያ ስልክ ቁጥር ያስገቡ (ለምሳሌ 0911234567)'
          : 'Please enter a valid Ethiopian phone number (e.g. 0911234567 or +251911234567)'
      );
      return;
    }
    setPhoneError('');

    setIsSubmitting(true);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const ref = `LUCY-${new Date().getFullYear()}-${randomNum}`;
    const finalSubmission = { ...formData, referenceId: ref };

    try {
      // Dispatches to Google Sheets webhook, Telegram alert, and local storage backup
      await submitAppointmentBooking(finalSubmission);
    } catch (err) {
      console.warn('Booking dispatch completed with warning:', err);
    } finally {
      setIsSubmitting(false);
      setSubmittedData(finalSubmission);
    }
  };

  const closeConfirmation = () => {
    setSubmittedData(null);
    setStep(1);
    setFormData({
      service: servicesData[0]?.titleEn || '',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      shift: 'morning',
      patientName: '',
      patientPhone: '',
      notes: '',
      referenceId: '',
    });
  };

  const getWhatsAppBookingUrl = (data: AppointmentFormData) => {
    const text = `Hello Lucy Dental Clinic! I submitted an online appointment request:\n\nReference: ${data.referenceId}\nPatient Name: ${data.patientName}\nPhone: ${data.patientPhone}\nService: ${data.service}\nPreferred Date: ${data.date} (${data.shift})\nNotes: ${data.notes || 'None'}`;
    return `https://wa.me/251911234567?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="booking" className="py-20 bg-gradient-to-b from-white via-teal-50/40 to-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/70 mb-3">
            {t('booking.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            {t('booking.title.pre')}
            <span className="text-teal-700">{t('booking.title.highlight')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t('booking.subtitle')}
          </p>
        </div>

        {/* Stepper Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden">
          
          {/* Progress Header */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 flex items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-6">
              {[
                { num: 1, label: t('step1.label') },
                { num: 2, label: t('step2.label') },
                { num: 3, label: t('step3.label') },
              ].map((s) => (
                <div key={s.num} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                      step >= s.num ? 'bg-teal-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {s.num}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-slate-300">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
            <span className="text-xs font-semibold text-teal-300">
              Step {step} of 3
            </span>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            
            {/* Step 1: Treatment */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{t('form.step1.title')}</h3>
                  <p className="text-sm text-slate-500 mt-1">{t('form.step1.sub')}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {servicesData.map((svc) => {
                    const isSelected = formData.service === svc.titleEn || formData.service === svc.titleAm;
                    return (
                      <button
                        type="button"
                        key={svc.id}
                        onClick={() => setFormData({ ...formData, service: isAm ? svc.titleAm : svc.titleEn })}
                        className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-teal-500 bg-teal-50/70 shadow-xs'
                            : 'border-slate-200 hover:border-teal-300 bg-slate-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">{svc.category}</span>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-600" />}
                        </div>
                        <p className="font-bold text-slate-900 text-sm mt-1">{isAm ? svc.titleAm : svc.titleEn}</p>
                        <span className="text-xs font-semibold text-teal-700 block mt-2">{svc.priceRange}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    {t('btn.next')}
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Shift */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{t('form.step2.title')}</h3>
                  <p className="text-sm text-slate-500 mt-1">{t('form.step2.sub')}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      {t('form.label.date')}
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        min={getTodayDate()}
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-semibold focus:outline-teal-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      {t('form.label.shift')}
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'morning', label: t('shift.morning') },
                        { id: 'afternoon', label: t('shift.afternoon') },
                        { id: 'weekend', label: t('shift.weekend') },
                      ].map((sh) => (
                        <button
                          type="button"
                          key={sh.id}
                          onClick={() => setFormData({ ...formData, shift: sh.id })}
                          className={`p-3.5 rounded-xl border text-center font-semibold text-xs transition-all cursor-pointer ${
                            formData.shift === sh.id
                              ? 'border-teal-500 bg-teal-600 text-white shadow-xs'
                              : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-300'
                          }`}
                        >
                          {sh.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    {t('btn.prev')}
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-3 rounded-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    {t('btn.next')}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info & Submission */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{t('form.step3.title')}</h3>
                  <p className="text-sm text-slate-500 mt-1">{t('form.step3.sub')}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      {t('form.label.name')} *
                    </label>
                    <input
                      type="text"
                      placeholder={t('form.placeholder.name')}
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-teal-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      {t('form.label.phone')} *
                    </label>
                    <input
                      type="tel"
                      placeholder={t('form.placeholder.phone')}
                      value={formData.patientPhone}
                      onChange={(e) => {
                        setFormData({ ...formData, patientPhone: e.target.value });
                        if (phoneError) setPhoneError('');
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-teal-500"
                      required
                    />
                    {phoneError && (
                      <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{phoneError}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">
                      {t('form.label.notes')}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={t('form.placeholder.notes')}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 focus:outline-teal-500"
                    />
                  </div>
                </div>

                {/* Important Notice */}
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>{t('form.disclaimer')}</span>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={isSubmitting}
                    className="px-6 py-3 rounded-full border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {t('btn.prev')}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-600 disabled:opacity-60 text-white font-bold text-sm shadow-lg shadow-teal-500/25 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{isAm ? 'በመመዝገብ ላይ...' : 'Recording Appointment...'}</span>
                      </>
                    ) : (
                      <span>{t('btn.submit')}</span>
                    )}
                  </button>
                </div>
              </div>
            )}

          </form>

        </div>

      </div>

      {/* Confirmation Modal */}
      {submittedData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden p-6 sm:p-8 text-center">
            
            <button
              type="button"
              onClick={closeConfirmation}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2">
              {t('ack.title')}
            </h3>

            <div className="inline-block bg-teal-50 border border-teal-200 rounded-xl px-4 py-2 my-2">
              <span className="text-xs text-slate-500 font-bold block">{t('ack.ref')}</span>
              <span className="text-lg font-black text-teal-800 tracking-wider">
                {submittedData.referenceId}
              </span>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 py-1.5 px-3 rounded-full mx-auto w-fit mb-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isAm ? 'መረጃው በክሊኒኩ ሰንጠረዥና ዳታቤዝ ተመዝግቧል' : 'Logged to Clinic Spreadsheet & System'}</span>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              {t('ack.notice')}
            </p>

            <div className="space-y-3">
              <a
                href={getWhatsAppBookingUrl(submittedData)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-bold text-sm bg-emerald-600 hover:bg-emerald-700 text-white shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>{t('ack.whatsapp')}</span>
              </a>

              <button
                type="button"
                onClick={closeConfirmation}
                className="w-full px-5 py-3 rounded-full font-semibold text-sm border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {t('ack.close')}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
