export type Language = 'en' | 'am';

export interface DentalService {
  id: string;
  titleEn: string;
  titleAm: string;
  descEn: string;
  descAm: string;
  duration: string;
  priceRange: string;
  category: string;
  highlightsEn: string[];
  highlightsAm: string[];
}

export interface Doctor {
  id: string;
  name: string;
  specialtyEn: string;
  specialtyAm: string;
  credentialsEn: string;
  credentialsAm: string;
  bioEn: string;
  bioAm: string;
  languagesEn: string;
  languagesAm: string;
  image: string;
  defaultService: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  quoteEn: string;
  quoteAm: string;
  rating: number;
  initials: string;
}

export interface FaqItem {
  id: string;
  questionEn: string;
  questionAm: string;
  answerEn: string;
  answerAm: string;
}

export interface AppointmentFormData {
  service: string;
  date: string;
  shift: string;
  patientName: string;
  patientPhone: string;
  notes: string;
  referenceId: string;
}
