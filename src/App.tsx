import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import type { Language } from './types';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { EmergencyStrip } from './components/EmergencyStrip';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AiChatBot } from './components/AiChatBot';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { TeamPage } from './pages/TeamPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';
import { AboutPage } from './pages/AboutPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { GalleryPage } from './pages/GalleryPage';
import { AdminPage } from './pages/AdminPage';

export const App: React.FC = () => {
  const [currentLang, setCurrentLang] = useState<Language>('en');

  useEffect(() => {
    if (currentLang === 'am') {
      document.body.classList.add('lang-am');
    } else {
      document.body.classList.remove('lang-am');
    }
  }, [currentLang]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-teal-500 selection:text-white">
        <TopBar currentLang={currentLang} onLanguageChange={setCurrentLang} />
        <Navbar currentLang={currentLang} />
        <EmergencyStrip currentLang={currentLang} />

        <main className="grow">
          <Routes>
            <Route path="/" element={<HomePage currentLang={currentLang} />} />
            <Route path="/services" element={<ServicesPage currentLang={currentLang} />} />
            <Route path="/team" element={<TeamPage currentLang={currentLang} />} />
            <Route path="/staff" element={<TeamPage currentLang={currentLang} />} />
            <Route path="/testimonials" element={<TestimonialsPage currentLang={currentLang} />} />
            <Route path="/reviews" element={<TestimonialsPage currentLang={currentLang} />} />
            <Route path="/about" element={<AboutPage currentLang={currentLang} />} />
            <Route path="/blog" element={<BlogPage currentLang={currentLang} />} />
            <Route path="/blog/:slug" element={<BlogPostPage currentLang={currentLang} />} />
            <Route path="/articles" element={<BlogPage currentLang={currentLang} />} />
            <Route path="/articles/:slug" element={<BlogPostPage currentLang={currentLang} />} />
            <Route path="/gallery" element={<GalleryPage currentLang={currentLang} />} />
            <Route path="/transformations" element={<GalleryPage currentLang={currentLang} />} />
            <Route path="/before-after" element={<GalleryPage currentLang={currentLang} />} />
            <Route path="/contact" element={<ContactPage currentLang={currentLang} />} />
            <Route path="/booking" element={<BookingPage currentLang={currentLang} />} />
            <Route path="/admin" element={<AdminPage currentLang={currentLang} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer currentLang={currentLang} />
        <AiChatBot currentLang={currentLang} />
      </div>
    </BrowserRouter>
  );
};

export default App;
