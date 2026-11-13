import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Info,
  CheckCircle2,
  Calendar,
  Award,
  Globe,
  Star,
  Quote,
  ShieldCheck,
  Sparkles,
  Activity,
  MapPin,
  Phone,
  Clock,
  CreditCard,
  Navigation,
} from 'lucide-react';
import type { Language, DentalService } from '../types';
import { servicesData, doctorsData, testimonialsData } from '../data/clinicData';
import { translations } from '../data/translations';
import { Hero } from '../components/Hero';
import { BlogSection } from '../components/BlogSection';
import { SmileGallerySection } from '../components/SmileGallerySection';
import { ServiceDetailModal } from '../components/ServiceDetailModal';
import { ScrollReveal } from '../components/ScrollReveal';

interface HomePageProps {
  currentLang: Language;
}

export const HomePage: React.FC<HomePageProps> = ({ currentLang }) => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<DentalService | null>(null);

  const t = (key: string) => translations[currentLang][key] || key;
  const isAm = currentLang === 'am';

  // Highlight 4 top services as floating cards on the homepage
  const featuredServices = servicesData.slice(0, 4);

  const handleBookService = (serviceName: string) => {
    navigate(`/booking?service=${encodeURIComponent(serviceName)}`);
  };

  const handleBookDoctor = (doctorName: string, defaultService?: string) => {
    const params = new URLSearchParams();
    if (doctorName) params.set('doctor', doctorName);
    if (defaultService) params.set('service', defaultService);
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <div className="space-y-0 overflow-hidden">
      {/* 1. Hero Section with Interactive Images & Scroll Animation */}
      <Hero currentLang={currentLang} onBookClick={() => navigate('/booking')} />

      {/* 2. Featured Services with Floating Cards */}
      <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-slate-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/70 mb-3 shadow-2xs">
                {isAm ? 'ዋና ዋና አገልግሎቶች' : 'Our Top Treatments'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
                {t('services.title')}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {t('services.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          {/* Floating Cards Grid with Staggered Scroll Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-14">
            {featuredServices.map((service, index) => {
              const title = isAm ? service.titleAm : service.titleEn;
              const subtitle = isAm ? service.titleEn : service.titleAm;
              const desc = isAm ? service.descAm : service.descEn;

              return (
                <ScrollReveal
                  key={service.id}
                  animation="fade-up"
                  delay={0.1 + index * 0.1}
                  className="h-full"
                >
                  <motion.article
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group relative overflow-hidden backdrop-blur-xs h-full"
                  >
                    {/* Decorative top animated gradient bar */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-600 via-cyan-500 to-teal-400 group-hover:h-2.5 transition-all duration-300" />

                    {/* Header badges */}
                    <div className="flex items-center justify-between gap-2 mb-3.5 pt-1">
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        {service.category}
                      </span>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100">
                        {service.duration}
                      </span>
                    </div>

                    {/* Title & subtitle */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors mb-1 leading-snug">
                      {title}
                    </h3>
                    <p className="text-[11px] font-semibold text-teal-600 mb-3 line-clamp-1">{subtitle}</p>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-4 grow line-clamp-3">
                      {desc}
                    </p>

                    {/* Highlights preview */}
                    <ul className="space-y-1.5 mb-5 pt-3 border-t border-dashed border-slate-200 text-xs text-slate-600">
                      {(isAm ? service.highlightsAm : service.highlightsEn).slice(0, 2).map((h, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-tight">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Price & Action footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                      <span className="text-xs font-black text-teal-900 bg-teal-50/90 px-2.5 py-1 rounded-md">
                        {service.priceRange}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedService(service)}
                          className="p-1.5 rounded-full text-slate-400 hover:text-teal-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          title={t('services.btn.modal')}
                          aria-label="View treatment details"
                        >
                          <Info className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleBookService(service.titleEn)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-xs hover:shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                          <span>{isAm ? 'ቀጠሮ' : 'Book'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Centered CTA leading to the full Services Page */}
          <ScrollReveal animation="zoom-in" delay={0.3}>
            <div className="text-center">
              <Link
                to="/services"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-extrabold text-white bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-600 hover:from-teal-800 hover:to-cyan-700 shadow-xl shadow-teal-600/25 hover:shadow-2xl hover:shadow-teal-600/35 hover:-translate-y-1 transition-all group"
              >
                <span>{isAm ? 'ሁሉንም የጥርስ ህክምና አገልግሎቶች ይመልከቱ' : 'View All Dental Services & Pricing'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. Staff Showcase Section with See Our Staff Button */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/70 mb-3 shadow-2xs">
                {t('doctors.tag')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
                {t('doctors.title')}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                {t('doctors.subtitle')}
              </p>
            </div>
          </ScrollReveal>

          {/* Staff Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
            {doctorsData.map((doc, index) => {
              const specialty = isAm ? doc.specialtyAm : doc.specialtyEn;
              const credentials = isAm ? doc.credentialsAm : doc.credentialsEn;
              const bio = isAm ? doc.bioAm : doc.bioEn;
              const languages = isAm ? doc.languagesAm : doc.languagesEn;

              return (
                <ScrollReveal
                  key={doc.id}
                  animation="fade-up"
                  delay={0.1 + index * 0.15}
                  className="h-full"
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl hover:border-teal-300 transition-all duration-300 flex flex-col group h-full"
                  >
                    {/* Doctor Image with gradient overlay */}
                    <div className="relative h-72 overflow-hidden bg-slate-100">
                      <img
                        src={doc.image}
                        alt={`${doc.name} - ${doc.specialtyEn}`}
                        className="w-full h-full object-cover object-top group-hover:scale-106 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-5 text-white">
                        <h3 className="text-xl font-bold">{doc.name}</h3>
                        <p className="text-xs text-teal-300 font-medium mt-0.5">{specialty}</p>
                      </div>
                    </div>

                    {/* Doctor Content */}
                    <div className="p-6 flex flex-col grow space-y-4">
                      {/* Credentials Badge */}
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
                        <Award className="w-4 h-4 text-teal-600 shrink-0" />
                        <span>{credentials}</span>
                      </div>

                      {/* Bio */}
                      <p className="text-sm text-slate-600 leading-relaxed grow">{bio}</p>

                      {/* Spoken Languages */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 border-t border-slate-100 pt-3">
                        <Globe className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                        <span>{languages}</span>
                      </div>

                      {/* Doctor CTA */}
                      <button
                        type="button"
                        onClick={() => handleBookDoctor(doc.name, doc.defaultService)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold text-teal-700 bg-teal-50 hover:bg-teal-600 hover:text-white border border-teal-200 hover:border-transparent hover:scale-102 active:scale-98 transition-all cursor-pointer shadow-2xs"
                      >
                        <Calendar className="w-4 h-4" />
                        <span>{t('doctors.btn.request')}</span>
                      </button>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Centered CTA leading to the full Staff Page */}
          <ScrollReveal animation="zoom-in" delay={0.2}>
            <div className="text-center">
              <Link
                to="/team"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-base font-extrabold text-teal-800 bg-teal-50 hover:bg-teal-100 border-2 border-teal-200 hover:border-teal-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all group max-w-full text-center"
              >
                <span>{isAm ? 'ሁሉንም የክሊኒካችንን ባለሙያዎች ይመልከቱ' : 'See Our Full Staff & Credentials'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. Interactive Before & After Smile Gallery */}
      <SmileGallerySection currentLang={currentLang} />

      {/* 5. Safety Guarantee & Hygiene Banner */}
      <section className="py-14 bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
            <ScrollReveal animation="fade-up" delay={0.1}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center shrink-0 animate-float">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base">{t('safety.item1.title')}</h4>
                  <p className="text-xs text-teal-200/80 mt-1">100% autoclave sterilized instruments for each patient</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.2}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center justify-center shrink-0 animate-float-delayed">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base">{t('safety.item2.title')}</h4>
                  <p className="text-xs text-cyan-200/80 mt-1">Low-dose computerized imaging with 80% less radiation</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.3}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center shrink-0 animate-float">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base">{t('safety.item3.title')}</h4>
                  <p className="text-xs text-emerald-200/80 mt-1">Topical numbing gel and gentle anesthesia</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 5. Testimonial Highlights Preview */}
      <section className="py-20 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/70 mb-3">
                  {t('reviews.tag')}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                  {t('reviews.title')}
                </h2>
              </div>
              <Link
                to="/testimonials"
                className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 hover:underline shrink-0 group"
              >
                <span>{isAm ? 'ሁሉንም ምስክርነቶች ያንብቡ' : 'Read All Patient Stories'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((item, index) => {
              const quote = isAm ? item.quoteAm : item.quoteEn;

              return (
                <ScrollReveal
                  key={item.id}
                  animation="fade-up"
                  delay={0.1 + index * 0.15}
                  className="h-full"
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <Quote className="w-6 h-6 text-slate-200" />
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed italic">
                        "{quote}"
                      </p>
                    </div>

                    <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                        {item.initials}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{item.author}</h4>
                        <p className="text-xs text-slate-500 font-medium">{item.location}</p>
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Dental Advice & Guides Blog Section */}
      <BlogSection currentLang={currentLang} />

      {/* 6. Contact and Maps at the bottom */}
      <section id="contact-and-maps" className="py-20 bg-white relative border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up" delay={0.1}>
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
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Details Column */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <ScrollReveal animation="fade-right" delay={0.15}>
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-2xs hover:border-teal-300 transition-colors">
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

              <ScrollReveal animation="fade-right" delay={0.25}>
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-2xs hover:border-teal-300 transition-colors">
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
              </ScrollReveal>

              <ScrollReveal animation="fade-right" delay={0.35}>
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-2xs hover:border-teal-300 transition-colors">
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
              </ScrollReveal>

              <ScrollReveal animation="fade-right" delay={0.45}>
                <div className="p-5 rounded-2xl bg-teal-50/70 border border-teal-200 text-xs text-teal-900 flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-teal-700 shrink-0" />
                  <span>
                    <strong>Accepted Payments:</strong> Telebirr, CBE Birr, Awash Bank, Cash, & Medical Insurance.
                  </span>
                </div>
              </ScrollReveal>
            </div>

            {/* Interactive Visual Map Card */}
            <div className="lg:col-span-7 h-full">
              <ScrollReveal animation="fade-left" delay={0.2} className="h-full">
                <div className="rounded-3xl border border-slate-200 overflow-hidden shadow-xl bg-slate-100 flex flex-col min-h-[440px] h-full relative">
                  <iframe
                    title="Lucy Dental Clinic Bole Location Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6695279626356!2d38.7854!3d8.9984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8504f7f6311f%3A0xb367c331ec3fae54!2sEdna%20Mall!5e0!3m2!1sen!2set!4v1714000000000!5m2!1sen!2set"
                    className="w-full h-full min-h-[380px] border-0 grow"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="text-xs font-semibold text-slate-700">
                      Bole Medhanialem / Edna Mall Area, Lex Plaza 3rd Floor
                    </span>
                    <a
                      href="https://maps.google.com/?q=8.9984,38.7876"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 px-3.5 py-1.5 rounded-full transition-all shadow-xs shrink-0 hover:scale-105 active:scale-95"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Open in Google Maps</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        currentLang={currentLang}
        onClose={() => setSelectedService(null)}
        onBook={(svcName) => {
          setSelectedService(null);
          handleBookService(svcName);
        }}
      />
    </div>
  );
};
