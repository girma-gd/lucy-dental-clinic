import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, Calendar } from 'lucide-react';
import type { Language } from '../types';
import { getStoredBlogPosts } from '../services/adminContentService';
import { ScrollReveal } from './ScrollReveal';

interface BlogSectionProps {
  currentLang: Language;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ currentLang }) => {
  const navigate = useNavigate();
  const isAm = currentLang === 'am';

  const [posts, setPosts] = useState(() => getStoredBlogPosts());

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(getStoredBlogPosts());
    };
    window.addEventListener('lucy_blog_updated', handleUpdate);
    return () => window.removeEventListener('lucy_blog_updated', handleUpdate);
  }, []);

  // Take top 3 articles for the homepage preview
  const featuredPosts = posts.slice(0, 3);

  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/70 mb-3 shadow-2xs">
                <BookOpen className="w-3.5 h-3.5 text-teal-700" />
                <span>{isAm ? 'የጥርስ ጤና ብሎግ' : 'Dental Advice & Knowledge'}</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                {isAm ? 'ከባለሙያዎቻችን የተሰጡ ጠቃሚ የጤና ምክሮች' : 'Latest Dental Health Insights'}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mt-2">
                {isAm
                  ? 'ስለ ስር ህክምና፣ የጥርስ ተከላ እና የውበት ህክምና በክሊኒካችን ስፔሻሊስቶች የተዘጋጁ መረጃዎች።'
                  : 'Practical, evidence-based advice written by our Addis Ababa dental specialists.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 hover:translate-x-1 transition-all shrink-0 cursor-pointer self-start md:self-auto"
            >
              <span>{isAm ? 'ሁሉንም ጽሁፎች ይመልከቱ' : 'View All Articles'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        {/* 3 Featured Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredPosts.map((post, idx) => {
            const title = isAm ? post.titleAm : post.titleEn;
            const excerpt = isAm ? post.excerptAm : post.excerptEn;
            const category = isAm ? post.categoryAm : post.categoryEn;
            const readTime = isAm ? post.readTimeAm : post.readTimeEn;

            return (
              <ScrollReveal key={post.id} animation="fade-up" delay={0.1 * idx}>
                <div
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group cursor-pointer"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-900">
                    <img
                      src={post.coverImage}
                      alt={title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                    
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-extrabold bg-teal-700 text-white shadow-xs">
                      {category}
                    </span>

                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 text-slate-200 backdrop-blur-xs">
                      <Clock className="w-3 h-3 text-teal-300" />
                      <span>{readTime}</span>
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex flex-col grow">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                      <Calendar className="w-3.5 h-3.5 text-teal-600" />
                      <span>{post.publishedDate}</span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-teal-700 transition-colors line-clamp-2 mb-2 leading-snug">
                      {title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                      {excerpt}
                    </p>

                    <div className="pt-4 border-t border-slate-200 mt-auto flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          {post.author.name}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-700 group-hover:translate-x-0.5 transition-transform">
                        <span>{isAm ? 'አንብብ' : 'Read'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};

