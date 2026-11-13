import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Calendar,
  CheckCircle2,
  Share2,
  CalendarCheck,
  Stethoscope,
  ChevronRight,
  ArrowLeft,
  Phone,
  BookmarkCheck,
  Award,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import type { Language } from '../types';
import type { BlogPost } from '../data/blogData';
import { getStoredBlogPosts } from '../services/adminContentService';
import { ScrollReveal } from '../components/ScrollReveal';

interface BlogPostPageProps {
  currentLang: Language;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ currentLang }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const isAm = currentLang === 'am';

  const [allPosts, setAllPosts] = useState<BlogPost[]>(() => getStoredBlogPosts());

  useEffect(() => {
    const handleUpdate = () => {
      setAllPosts(getStoredBlogPosts());
    };
    window.addEventListener('lucy_blog_updated', handleUpdate);
    return () => window.removeEventListener('lucy_blog_updated', handleUpdate);
  }, []);

  const post: BlogPost | undefined = useMemo(() => {
    return allPosts.find((p) => p.slug === slug || p.id === slug);
  }, [allPosts, slug]);

  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return allPosts.filter((p) => p.id !== post.id).slice(0, 3);
  }, [allPosts, post]);

  if (!post) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-md w-full shadow-lg border border-slate-200">
          <Stethoscope className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mb-2">
            {isAm ? 'ጽሁፉ አልተገኘም' : 'Article Not Found'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mb-6 leading-relaxed">
            {isAm
              ? 'የፈለጉት ጽሁፍ ተሰርዟል ወይም አድራሻው ተቀይሯል። ወደ ዋናው የብሎግ ገጽ ተመልሰው ሌሎች ጽሁፎችን መመልከት ይችላሉ።'
              : 'The clinical article you are looking for may have been moved or updated. Browse our full library of dental guides.'}
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 transition-all shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isAm ? 'ወደ ብሎግ ተመለስ' : 'Back to All Articles'}</span>
          </Link>
        </div>
      </div>
    );
  }

  const title = isAm ? post.titleAm : post.titleEn;
  const excerpt = isAm ? post.excerptAm : post.excerptEn;
  const category = isAm ? post.categoryAm : post.categoryEn;
  const readTime = isAm ? post.readTimeAm : post.readTimeEn;
  const authorRole = isAm ? post.author.roleAm : post.author.roleEn;
  const takeaways = isAm ? post.keyTakeawaysAm : post.keyTakeawaysEn;
  const clinicalTip = isAm ? post.clinicalTipAm : post.clinicalTipEn;

  const handleShare = () => {
    const currentUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url: currentUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(currentUrl);
      alert(isAm ? 'የጽሁፉ ሊንክ ተገልብጧል!' : 'Article link copied to clipboard!');
    }
  };

  const handleWhatsAppShare = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this dental guide: ${title}\n\n`);
    window.open(`https://wa.me/?text=${text}${url}`, '_blank');
  };

  const handleBookNow = () => {
    navigate(`/booking?service=${encodeURIComponent(post.relatedService)}`);
  };

  return (
    <article className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8 overflow-x-auto whitespace-nowrap py-1">
          <Link to="/" className="hover:text-teal-700 transition-colors">
            {isAm ? 'ዋና ገጽ' : 'Home'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <Link to="/blog" className="hover:text-teal-700 transition-colors">
            {isAm ? 'የጥርስ ብሎግ' : 'Blog & Advice'}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-md font-bold truncate max-w-[200px] sm:max-w-none">
            {category}
          </span>
        </nav>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto mb-10">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-extrabold bg-teal-700 text-white shadow-xs">
                {category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>{readTime}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-slate-600">
                <Calendar className="w-3.5 h-3.5 text-teal-600" />
                <span>{post.publishedDate}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.2] mb-6">
              {title}
            </h1>

            <p className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal mb-8">
              {excerpt}
            </p>

            {/* Author Byline & Social Sharing Strip */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-b border-slate-200/80 pb-6">
              
              <div className="flex items-center gap-3.5">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-teal-600 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm sm:text-base">
                    <span>{post.author.name}</span>
                    <Sparkles className="w-4 h-4 text-teal-600 fill-teal-100" />
                  </div>
                  <div className="text-xs text-teal-700 font-semibold">
                    {authorRole} • Lucy Dental Clinic
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white border border-emerald-200 transition-all cursor-pointer"
                  title="Share on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer"
                  title="Share link"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{isAm ? 'አጋራ' : 'Share'}</span>
                </button>
              </div>

            </div>
          </ScrollReveal>
        </header>

        {/* Main Content Layout (Article Body + Sticky Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Main Article Body (8 cols) */}
          <main className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs space-y-10">
            
            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden bg-slate-900 shadow-md">
              <img
                src={post.coverImage}
                alt={title}
                className="w-full h-[320px] sm:h-[420px] object-cover object-center"
              />
            </div>

            {/* Key Clinical Takeaways Callout */}
            <section className="bg-gradient-to-br from-teal-50/90 to-cyan-50/60 p-6 sm:p-8 rounded-2xl border border-teal-200/80 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-teal-900 font-extrabold text-sm sm:text-base tracking-wide uppercase">
                <BookmarkCheck className="w-5 h-5 text-teal-700 shrink-0" />
                <span>{isAm ? 'የጽሁፉ ዋና ዋና የህክምና ነጥቦች' : 'Key Clinical Takeaways'}</span>
              </div>
              <ul className="space-y-3">
                {takeaways.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Editorial Body Sections */}
            <div className="space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed">
              {post.sections.map((section, idx) => (
                <section key={idx} className="space-y-3 pt-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                    {isAm ? section.headingAm : section.headingEn}
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    {isAm ? section.bodyAm : section.bodyEn}
                  </p>
                </section>
              ))}
            </div>

            {/* Doctor’s Clinical Recommendation Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-amber-50/80 border-2 border-amber-200 text-amber-950 flex flex-col sm:flex-row items-start gap-4 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm uppercase tracking-wider text-amber-900">
                    {isAm ? 'የሐኪሙ ወሳኝ ክሊኒካዊ ምክር' : 'Doctor’s Clinical Recommendation'}
                  </span>
                  <span className="text-[10px] font-bold bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">
                    Lucy Dental
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                  {clinicalTip}
                </p>
                <div className="text-xs font-bold text-amber-800 pt-1">
                  — {post.author.name}, {authorRole}
                </div>
              </div>
            </div>

            {/* In-Article Booking Banner */}
            <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-teal-950 rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-teal-500/30">
              <div className="space-y-1.5 text-center sm:text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  {isAm ? 'ቀጠሮ ይያዙ' : 'Ready for Consultation?'}
                </div>
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {isAm
                    ? `${post.relatedService} ህክምና ይፈልጋሉ?`
                    : `Schedule Your ${post.relatedService}`}
                </h3>
                <p className="text-xs text-slate-300 max-w-md">
                  {isAm
                    ? 'በቦሌ መድኃኒዓለም በሚገኘው ዘመናዊ ክሊኒካችን በስፔሻሊስት ሐኪሞች ይታከሙ።'
                    : 'Experience gentle, digital 3D dental diagnostics with our certified specialist team.'}
                </p>
              </div>

              <button
                type="button"
                onClick={handleBookNow}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-extrabold text-slate-950 bg-gradient-to-r from-teal-400 to-cyan-300 hover:from-teal-300 hover:to-cyan-200 shadow-md hover:scale-105 active:scale-95 transition-all shrink-0 cursor-pointer w-full sm:w-auto"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{isAm ? 'ቀጠሮ ያስይዙ' : 'Book Appointment'}</span>
              </button>
            </div>

            {/* Back to Blog & Navigation */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:text-teal-800 hover:-translate-x-1 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{isAm ? 'ወደ ሁሉም ጽሁፎች ተመለስ' : 'Back to Blog Library'}</span>
              </Link>

              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
              >
                {isAm ? 'ወደ ላይ ውጣ ↑' : 'Back to Top ↑'}
              </button>
            </div>

          </main>

          {/* Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            
            {/* Quick Treatment Booking Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full inline-block">
                {isAm ? 'ተዛማጅ ህክምና' : 'Related Treatment'}
              </span>

              <h3 className="text-lg font-black text-slate-900 leading-snug">
                {post.relatedService}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {isAm
                  ? 'ከዚህ ጽሁፍ ጋር የተያያዘውን ህክምና በክሊኒካችን ስፔሻሊስቶች ለማግኘት አሁኑኑ ቀጠሮ ያስይዙ።'
                  : 'Interested in this procedure? Request an evaluation with our dental surgery and restorative specialists.'}
              </p>

              <button
                type="button"
                onClick={handleBookNow}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-teal-700 to-teal-600 hover:from-teal-800 hover:to-teal-700 shadow-md hover:scale-102 active:scale-95 transition-all cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>{isAm ? 'ቀጠሮ ያስይዙ' : 'Book Consultation'}</span>
              </button>

              <a
                href="https://wa.me/251911234567?text=Hello%20Lucy%20Dental,%20I%20read%20your%20article%20and%20would%20like%20to%20ask%20a%20question."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{isAm ? 'በዋትስአፕ ይጠይቁ' : 'Inquire on WhatsApp'}</span>
              </a>
            </div>

            {/* Author Credential Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                {isAm ? 'ስለ ጸሐፊው' : 'Article Author'}
              </h4>

              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-teal-500 shadow-xs"
                />
                <div>
                  <div className="font-extrabold text-slate-900 text-base">
                    {post.author.name}
                  </div>
                  <div className="text-xs text-teal-700 font-semibold">
                    {authorRole}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Lucy Dental Specialist Clinic
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-600 font-medium">
                <Award className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Member of Ethiopian Dental Association (EDA)</span>
              </div>
            </div>

            {/* Emergency Hotline Card */}
            <div className="bg-gradient-to-br from-rose-950 to-slate-950 text-white rounded-3xl p-6 border border-rose-500/30 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-xs font-extrabold uppercase tracking-wider text-rose-300">
                  {isAm ? 'ድንገተኛ የጥርስ ህመም?' : 'Acute Dental Emergency?'}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isAm
                  ? 'ከባድ የጥርስ ህመም ወይም አደጋ ካጋጠመዎት የድንገተኛ ህክምና መስመራችን ክፍት ነው።'
                  : 'Severe pain or dental trauma? Our Bole Medhanialem triage team is on-call.'}
              </p>
              <a
                href="tel:+251911234567"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-black bg-rose-600 hover:bg-rose-500 text-white transition-all shadow-md"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+251 911 234 567</span>
              </a>
            </div>

            {/* Related Articles Card */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {isAm ? 'ተጨማሪ የጥርስ ጽሁፎች' : 'Recommended Reading'}
                </h4>

                <div className="space-y-4">
                  {relatedPosts.map((rPost) => (
                    <Link
                      key={rPost.id}
                      to={`/blog/${rPost.slug}`}
                      className="flex items-start gap-3 group"
                    >
                      <img
                        src={rPost.coverImage}
                        alt={isAm ? rPost.titleAm : rPost.titleEn}
                        className="w-16 h-14 rounded-xl object-cover shrink-0 group-hover:opacity-90 transition-opacity"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-2 leading-snug">
                          {isAm ? rPost.titleAm : rPost.titleEn}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-teal-600" />
                          <span>{isAm ? rPost.readTimeAm : rPost.readTimeEn}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
                  >
                    <span>{isAm ? 'ሁሉንም ጽሁፎች ይመልከቱ' : 'View all articles'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

          </aside>

        </div>

      </div>
    </article>
  );
};
