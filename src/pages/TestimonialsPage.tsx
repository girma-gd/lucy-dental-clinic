import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star,
  CheckCircle2,
  MessageSquarePlus,
  X,
  Send,
} from 'lucide-react';
import type { Language } from '../types';
import { translations } from '../data/translations';
import { ScrollReveal } from '../components/ScrollReveal';

interface TestimonialsPageProps {
  currentLang: Language;
}

interface UserReview {
  id: string;
  author: string;
  location: string;
  treatment: string;
  rating: number;
  text: string;
  date: string;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({ currentLang }) => {
  const navigate = useNavigate();
  const t = (key: string) => translations[currentLang][key] || key;
  const isAm = currentLang === 'am';

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // New review form state
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    treatment: 'Root Canal Therapy',
    rating: 5,
    review: '',
  });

  // Expanded collection of testimonials with realistic, diverse patient experiences
  const [allTestimonials, setAllTestimonials] = useState<UserReview[]>([
    {
      id: '1',
      author: 'Alemayehu Tekle',
      location: 'Bole, Addis Ababa',
      treatment: 'Root Canal Therapy',
      rating: 5,
      date: '2 weeks ago',
      text: isAm
        ? 'የጥርስ ስር ህክምናን በጣም እፈራ ነበር፤ ነገር ግን ዶ/ር ሰላማዊት ምንም አይነት ህመም ሳይሰማኝ ሰርታኛለች። ክሊኒኩ እጅግ ዘመናዊና ንፁህ ነው።'
        : 'I was terrified of root canals for years, but Dr. Selamawit made the procedure 100% painless! The clinic is spotless, modern, and feels like private dental clinics in Europe.',
    },
    {
      id: '2',
      author: 'Martha Bekele',
      location: 'Kazanchis, Addis Ababa',
      treatment: 'Dental Implants',
      rating: 5,
      date: '1 month ago',
      text: isAm
        ? 'ዶ/ር ሳሙኤል ሁለት የጥርስ ተከላ ሰርቶልኛል። ስራቸው እጅግ አስተማማኝ ነው። በቴሌብር በቀላሉ ከፍዬ በሚቀጥለው ቀን ደውለው ደህንነቴን ጠይቀውኛል።'
        : 'Dr. Samuel placed two dental implants for me. His technical precision is remarkable. They accepted Telebirr seamlessly at reception and followed up the next day.',
    },
    {
      id: '3',
      author: 'Tewodros Girma',
      location: 'Sarbet, Addis Ababa',
      treatment: 'Pediatric Dentistry',
      rating: 5,
      date: '1 month ago',
      text: isAm
        ? 'የ7 አመት ልጄ የጥርስ ክሊኒክ ሲደርስ ያለቅስ ነበር። ዶ/ር ዮናስ ልጄን እያጫወተ ጥርሱን አጸዳለት። እጅግ ድንቅ እንክብካቤ ነው።'
        : 'My 7-year-old son used to cry at dentist clinics. Dr. Yonas made him laugh and comfortable throughout the teeth cleaning. Truly exceptional service.',
    },
    {
      id: '4',
      author: 'Sara Mohammed',
      location: 'CMC / Ayat, Addis Ababa',
      treatment: 'Teeth Cleaning & Whitening',
      rating: 5,
      date: '3 weeks ago',
      text: isAm
        ? 'የጥርስ ጽዳትና የሌዘር ማብራት ህክምና ወስጃለሁ። ጥርሴ በሚገርም ሁኔታ ነጭ ሆኗል፤ ድዴም ምንም አልቆሰለም። ለጓደኞቼ በሙሉ ጠቁሜያለሁ።'
        : 'I received ultrasonic teeth scaling and laser whitening. The results exceeded my expectations! My teeth are noticeably whiter without any gum sensitivity.',
    },
    {
      id: '5',
      author: 'Kifle Yohannes',
      location: 'Piassa, Addis Ababa',
      treatment: 'Orthodontics & Braces',
      rating: 5,
      date: '2 months ago',
      text: isAm
        ? 'የተዛነፉ ጥርሶቼን በሸክላ አላይነር እያስተካከልኩ ነው። በየወሩ በብር የመክፈል አማራጭ ማዘጋጀታቸው በጣም ረድቶኛል። ዶ/ር ዮናስ እጅግ ጎበዝ ነው።'
        : 'Getting clear braces at Lucy Dental was the best health decision I made this year. The installment payment plan in ETB is super transparent and fair.',
    },
    {
      id: '6',
      author: 'Hannah Davies',
      location: 'Old Airport / International Visitor',
      treatment: 'Emergency Care',
      rating: 5,
      date: 'Recent visit',
      text: isAm
        ? 'በጉዞ ላይ እያለሁ ጥርሴ ተሰብሮ በድንገት ሄድኩ። በ30 ደቂቃ ውስጥ አስተናግደው የህመሜን እፎይታ ሰጡኝ። የክሊኒኩ ንጽህና አስደናቂ ነው።'
        : 'I cracked a molar while visiting Addis Ababa. Lucy Dental took me in immediately as an emergency walk-in. Professional English-speaking staff and top European sterilization standards.',
    },
  ]);

  const categories = [
    { id: 'all', labelEn: 'All Reviews', labelAm: 'ሁሉም አስተያየቶች' },
    { id: 'Root Canal', labelEn: 'Root Canal', labelAm: 'የጥርስ ስር ህክምና' },
    { id: 'Dental Implants', labelEn: 'Dental Implants', labelAm: 'የጥርስ ተከላ' },
    { id: 'Teeth Cleaning', labelEn: 'Cleaning & Whitening', labelAm: 'ጽዳትና ማብራት' },
    { id: 'Pediatric', labelEn: 'Pediatric Care', labelAm: 'የህፃናት ህክምና' },
    { id: 'Orthodontics', labelEn: 'Braces', labelAm: 'የጥርስ ማስተካከያ' },
  ];

  const filtered = allTestimonials.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.treatment.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.review) return;

    setSubmitting(true);
    setTimeout(() => {
      const newReview: UserReview = {
        id: String(Date.now()),
        author: formData.name,
        location: formData.location || 'Addis Ababa',
        treatment: formData.treatment,
        rating: formData.rating,
        date: 'Just now',
        text: formData.review,
      };
      setAllTestimonials([newReview, ...allTestimonials]);
      setSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
        setModalOpen(false);
        setFormData({
          name: '',
          location: '',
          treatment: 'Root Canal Therapy',
          rating: 5,
          review: '',
        });
      }, 1500);
    }, 600);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/70 mb-3 shadow-2xs">
              {t('reviews.tag')}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
              {t('reviews.title')}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t('reviews.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Aggregate Ratings Scoreboard */}
        <ScrollReveal animation="fade-up" delay={0.2}>
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md mb-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
              {/* Overall Rating */}
              <div className="text-center md:text-left md:pr-4">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-5xl font-black text-slate-900 tracking-tight">4.9</span>
                  <div className="flex flex-col">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-slate-500 mt-0.5">350+ {isAm ? 'ግምገማዎች' : 'Verified Reviews'}</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 font-medium">
                  {isAm ? 'በአዲስ አበባ ከፍተኛ ተመራጭ የጥርስ ክሊኒክ' : 'Addis Ababa’s Highest Rated Dental Practice'}
                </p>
              </div>

              {/* Painless Care Rate */}
              <div className="text-center md:px-6 pt-4 md:pt-0">
                <div className="text-3xl font-black text-teal-700">99.4%</div>
                <p className="text-xs font-bold text-slate-800 mt-1">{isAm ? 'ህመም የሌለው ህክምና' : 'Painless Experience'}</p>
                <p className="text-[11px] text-slate-500">{isAm ? 'የቅድመ ማደንዘዣ ቅባት እርካታ' : 'Topical numbing gel satisfaction'}</p>
              </div>

              {/* Sterilization Protocol */}
              <div className="text-center md:px-6 pt-4 md:pt-0">
                <div className="text-3xl font-black text-emerald-700">100%</div>
                <p className="text-xs font-bold text-slate-800 mt-1">{isAm ? 'የንጽህና እና ማምከኛ ደረጃ' : 'Class-B Sterile Audit'}</p>
                <p className="text-[11px] text-slate-500">{isAm ? 'የአውሮፓ ሆስፒታል ደረጃ ማምከኛ' : 'Vacuum autoclave monitored'}</p>
              </div>

              {/* Leave Review Action CTA */}
              <div className="text-center md:pl-6 pt-4 md:pt-0 flex flex-col items-center justify-center">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <MessageSquarePlus className="w-4 h-4" />
                  <span>{isAm ? 'የራስዎን ምስክርነት ያጋሩ' : 'Share Your Experience'}</span>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Filter Pills */}
        <ScrollReveal animation="fade-up" delay={0.25}>
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                }`}
              >
                {isAm ? cat.labelAm : cat.labelEn}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Testimonials Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filtered.map((item, index) => (
            <ScrollReveal
              key={item.id}
              animation="fade-up"
              delay={0.08 * (index % 6)}
              className="h-full"
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative h-full"
              >
                <div className="space-y-4">
                  {/* Rating & Treatment */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-100">
                      {item.treatment}
                    </span>
                  </div>

                  {/* Quote Text */}
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{item.text}"
                  </p>
                </div>

                {/* Author footer */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                      {item.author
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                        <span>{item.author}</span>
                        <span title="Verified Patient">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        </span>
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">{item.location}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">{item.date}</span>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom Banner */}
        <ScrollReveal animation="zoom-in" delay={0.2}>
          <div className="bg-gradient-to-r from-teal-900 via-teal-800 to-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              {isAm ? 'እርስዎም ጤናማ እና ብሩህ ፈገግታዎን ዛሬውኑ ይቀላቀሉ' : 'Ready for a Pain-Free Dental Experience in Addis Ababa?'}
            </h2>
            <p className="text-sm sm:text-base text-teal-100 max-w-2xl mx-auto mb-8">
              {isAm
                ? 'በቦሌ የሚገኘውን ክሊኒካችንን ይጎብኙ ወይም አሁኑኑ በደቂቃዎች ውስጥ ቀጠሮዎን በድረ-ገጽ ያስይዙ።'
                : 'Join thousands of satisfied patients. Book your consultation today with our experienced Ethiopian dental specialists.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => navigate('/booking')}
                className="px-8 py-3.5 rounded-full text-base font-bold text-teal-950 bg-white hover:bg-teal-50 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {t('nav.book')}
              </button>
              <a
                href="tel:+251911234567"
                className="px-6 py-3.5 rounded-full text-base font-bold text-white bg-teal-700/80 hover:bg-teal-700 border border-teal-500/50 shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                {t('top.emergency')} +251 911 234 567
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>

      {/* Review Submission Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
            <div className="bg-gradient-to-r from-teal-800 to-teal-700 text-white p-6 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{isAm ? 'አስተያየትዎን ያጋሩ' : 'Submit Patient Review'}</h3>
                <p className="text-xs text-teal-200 mt-0.5">
                  {isAm ? 'ስለ ሉሲ የጥርስ ክሊኒክ ያሎትን ተሞክሮ ይንገሩን' : 'Tell us about your experience at Lucy Dental Clinic'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitSuccess ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">{isAm ? 'እናመሰግናለን!' : 'Thank you!'}</h4>
                <p className="text-sm text-slate-600">
                  {isAm ? 'አስተያየትዎ በተሳካ ሁኔታ ተመዝግቧል።' : 'Your review has been successfully submitted and added.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAm ? 'ሙሉ ስም *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dawit Bekele"
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAm ? 'አካባቢ / ከተማ' : 'Neighborhood / Location'}
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g. Bole, Addis Ababa"
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {isAm ? 'ህክምና' : 'Treatment Received'}
                    </label>
                    <select
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Root Canal Therapy">Root Canal Therapy</option>
                      <option value="Dental Implants">Dental Implants</option>
                      <option value="Teeth Cleaning & Whitening">Cleaning & Whitening</option>
                      <option value="Orthodontics & Braces">Braces & Aligners</option>
                      <option value="Pediatric Dentistry">Pediatric Care</option>
                      <option value="General Consultation">General Check-up</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAm ? 'ደረጃ (Rating)' : 'Your Rating'}
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= formData.rating ? 'fill-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isAm ? 'የእርስዎ አስተያየት *' : 'Your Review & Comments *'}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.review}
                    onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    placeholder={isAm ? 'ተሞክሮዎን እዚህ ይጻፉ...' : 'Describe your treatment and how our staff treated you...'}
                    className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                  >
                    {isAm ? 'ሰርዝ' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow-md transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submitting ? (isAm ? 'በመላክ ላይ...' : 'Submitting...') : (isAm ? 'አስተያየትን ላክ' : 'Submit Review')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
