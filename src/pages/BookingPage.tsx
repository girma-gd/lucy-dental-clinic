import React from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Language } from '../types';
import { BookingSection } from '../components/BookingSection';

interface BookingPageProps {
  currentLang: Language;
}

export const BookingPage: React.FC<BookingPageProps> = ({ currentLang }) => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  return (
    <div className="bg-slate-50 min-h-screen py-6 sm:py-10">
      <BookingSection
        currentLang={currentLang}
        preselectedService={preselectedService}
      />
    </div>
  );
};

