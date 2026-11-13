import React from 'react';
import { Star, Quote } from 'lucide-react';
import type { Language } from '../types';
import { testimonialsData } from '../data/clinicData';
import { translations } from '../data/translations';

interface ReviewsSectionProps {
  currentLang: Language;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ currentLang }) => {
  const t = (key: string) => translations[currentLang][key] || key;
  const isAm = currentLang === 'am';

  return (
    <section id="reviews" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/70 mb-3">
            {t('reviews.tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight mb-4">
            {t('reviews.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {t('reviews.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsData.map((item) => {
            const quote = isAm ? item.quoteAm : item.quoteEn;

            return (
              <div
                key={item.id}
                className="bg-slate-50 rounded-3xl p-7 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group"
              >
                <div className="space-y-4">
                  {/* Star Rating & Quote Icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="w-6 h-6 text-slate-300 group-hover:text-teal-400 transition-colors" />
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-200">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-600 to-teal-800 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-xs">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.author}</h4>
                    <p className="text-xs text-slate-500 font-medium">{item.location}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
