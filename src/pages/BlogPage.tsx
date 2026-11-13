import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  ArrowRight,
  X,
  Sparkles,
  CalendarCheck,
} from 'lucide-react';
import type { Language } from '../types';
import type { BlogPost } from '../data/blogData';
import { getStoredBlogPosts } from '../services/adminContentService';
import { ScrollReveal } from '../components/ScrollReveal';

interface BlogPageProps {
  currentLang: Language;
}

export const BlogPage: React.FC<BlogPageProps> = ({ currentLang }) => {
  const navigate = useNavigate();
  const isAm = currentLang === 'am';

  const [posts, setPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(getStoredBlogPosts());
    };
    window.addEventListener('lucy_blog_updated', handleUpdate);
    return () => window.removeEventListener('lucy_blog_updated', handleUpdate);
  }, []);

  const categories = useMemo(() => {
    return [
      { id: 'All', labelEn: 'All Articles', labelAm: 'ሁሉም ጽሁፎች' },
      { id: 'Restorative', labelEn: 'Restorative & Root Canal', labelAm: 'የጥርስ እድሳትና ስር ህክምና' },
      { id: 'Surgery', labelEn: 'Oral Surgery & Implants', labelAm: 'የጥርስ ተከላና ቀዶ ህክምና' },
      { id: 'Cosmetic', labelEn: 'Whitening & Cosmetics', labelAm: 'የጥርስ ማፍካትና ውበት' },
      { id: 'Prevention', labelEn: 'Preventive & Gum Health', labelAm: 'የድድ ጤናና መከላከያ' },
      { id: 'Pediatric', labelEn: 'Pediatric (Children)', labelAm: 'የልጆች የጥርስ ጤና' },
    ];
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.titleEn.toLowerCase().includes(q) ||
        post.titleAm.toLowerCase().includes(q) ||
        post.excerptEn.toLowerCase().includes(q) ||
        post.excerptAm.toLowerCase().includes(q) ||
        post.categoryEn.toLowerCase().includes(q) ||
        post.categoryAm.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase text-teal-800 bg-teal-100/80 mb-3 shadow-2xs">
              <BookOpen className="w-3.5 h-3.5 text-teal-700" />
              <span>{isAm ? 'የጥርስ ጤና እውቀት እና ብሎግ' : 'Clinical Insights & Dental Blog'}</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight mb-4">
              {isAm ? (
                <>
                  የጥርስ ጤናዎን ለመጠበቅ የሚረዱ{' '}
                  <span className="text-teal-700">የባለሙያ ምክሮች</span>
                </>
              ) : (
                <>
                  Evidence-Based Guides for a{' '}
                  <span className="text-teal-700">Healthier Smile</span>
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {isAm
                ? 'በሉሲ የጥርስ ስፔሻሊቲ ክሊኒክ ሐኪሞች የተዘጋጁ አስተማሪ ጽሁፎች፣ የጥርስ አያያዝ ምስጢሮች እና የዘመናዊ ህክምና እውነታዎች።'
                : 'Written by our licensed Ethiopian dental specialists to help you make informed decisions about restorative, cosmetic, and surgical treatments.'}
            </p>
          </div>
        </ScrollReveal>

        {/* Search & Filter Bar */}
        <ScrollReveal animation="fade-up" delay={0.2}>
          <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200/80 mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isAm ? 'ጽሁፎችን ይፈልጉ (ምሳሌ፡ ስር ህክምና፣ ተከላ...)' : 'Search articles (e.g. implants, root canal)...'}
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Pills (horizontally scrollable on mobile, flex-wrapped on desktop) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 max-w-full md:flex-wrap md:justify-end w-full scrollbar-none">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'bg-teal-700 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                    }`}
                  >
                    {isAm ? cat.labelAm : cat.labelEn}
                  </button>
                );
              })}
            </div>

          </div>
        </ScrollReveal>

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto my-8">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-slate-800 text-lg mb-1">
              {isAm ? 'ምንም ጽሁፍ አልተገኘም' : 'No matching articles found'}
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              {isAm
                ? 'እባክዎ የተለየ ቃል ፈልገው ይሞክሩ ወይም ምድቡን ይቀይሩ።'
                : 'Try adjusting your search terms or filter to find what you are looking for.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-full text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors cursor-pointer"
            >
              {isAm ? 'ሁሉንም አሳይ' : 'Clear Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => {
              const title = isAm ? post.titleAm : post.titleEn;
              const excerpt = isAm ? post.excerptAm : post.excerptEn;
              const category = isAm ? post.categoryAm : post.categoryEn;
              const readTime = isAm ? post.readTimeAm : post.readTimeEn;
              const authorRole = isAm ? post.author.roleAm : post.author.roleEn;

              return (
                <ScrollReveal key={post.id} animation="fade-up" delay={0.05 * idx}>
                  <article className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group">
                    
                    {/* Cover Image - Links to full page */}
                    <Link to={`/blog/${post.slug}`} className="relative h-52 overflow-hidden bg-slate-900 block">
                      <img
                        src={post.coverImage}
                        alt={title}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-teal-700/90 text-white backdrop-blur-md shadow-md">
                          {category}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/75 text-slate-200 backdrop-blur-md">
                          <Clock className="w-3 h-3 text-teal-300" />
                          <span>{readTime}</span>
                        </span>
                      </div>
                    </Link>

                    {/* Content Body */}
                    <div className="p-6 flex flex-col grow">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-teal-600" />
                        <span>{post.publishedDate}</span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-teal-700 transition-colors leading-snug mb-3">
                        <Link to={`/blog/${post.slug}`}>
                          {title}
                        </Link>
                      </h2>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 line-clamp-3">
                        {excerpt}
                      </p>

                      {/* Author & Action footer */}
                      <div className="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-9 h-9 rounded-full object-cover border border-teal-500/30"
                          />
                          <div>
                            <div className="text-xs font-bold text-slate-900 leading-tight">
                              {post.author.name}
                            </div>
                            <div className="text-[10px] text-teal-700 font-medium">
                              {authorRole}
                            </div>
                          </div>
                        </div>

                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-teal-50 text-teal-700 hover:bg-teal-700 hover:text-white transition-all shadow-2xs group-hover:scale-110 cursor-pointer"
                          aria-label={`Read complete guide: ${title}`}
                          title={isAm ? 'ሙሉውን አንብብ' : 'Read Full Guide'}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>

                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* Bottom Booking CTA Banner */}
        <ScrollReveal animation="fade-up" delay={0.3} className="mt-16 sm:mt-24">
          <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-teal-500/30">
            <div className="max-w-xl space-y-3 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isAm ? 'የባለሙያ ምክክር' : 'Specialist Clinical Advice'}</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
                {isAm
                  ? 'ጥያቄ አለዎት ወይም የጥርስ ምርመራ ይፈልጋሉ?'
                  : 'Have Specific Questions About Your Dental Health?'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isAm
                  ? 'የእኛ ስፔሻሊስቶች ዝርዝር የ3D ዲጂታል ቅኝት በማድረግ ትክክለኛውን የህክምና አማራጭ ያብራሩልዎታል።'
                  : 'Book a comprehensive consultation with 3D digital imaging at our modern Bole Medhanialem clinic.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                type="button"
                onClick={() => navigate('/booking')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-extrabold text-sm text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 shadow-xl shadow-teal-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{isAm ? 'ቀጠሮ ያስይዙ' : 'Book a Consultation'}</span>
              </button>

              <a
                href="tel:+251911234567"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white bg-slate-800/90 hover:bg-slate-800 border border-white/20 transition-all"
              >
                <span>{isAm ? 'በስልክ ያነጋግሩ' : 'Call Reception'}</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </div>
  );
};
