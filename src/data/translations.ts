import type { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar & Navigation
    'top.emergency': 'Emergency Hotline:',
    'top.hours': 'Mon - Sat: 8:30 AM - 7:00 PM | Sun: 9:00 AM - 1:00 PM',
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.gallery': 'Gallery',
    'nav.staff': 'Staff',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.doctors': 'Dentists',
    'nav.reviews': 'Testimonials',
    'nav.faq': 'FAQs',
    'nav.contact': 'Contact',
    'nav.book': 'Book Appointment',
    'emergency.call': 'Emergency Call',

    // Home Page specific
    'home.featuredServices': 'Featured Treatments',
    'home.services.viewAll': 'Explore All Services →',
    'home.featuredStaff': 'Specialist Team',
    'home.staff.viewAll': 'See Our Full Staff →',
    'home.reviews.viewAll': 'Read All Patient Testimonials →',

    // Hero Section
    'hero.badge': 'Top Rated Dental Specialist Clinic in Addis Ababa',
    'hero.title.pre': 'Modern, Gentle Dental Care in ',
    'hero.title.highlight': 'Addis Ababa',
    'hero.subtitle': 'Experience world-class dentistry with gentle care, digital 3D diagnostics, and certified Ethiopian specialists. We make your visit relaxed, comfortable, and pain-free.',
    'hero.cta.book': 'Request Appointment',
    'hero.cta.whatsapp': 'Chat on WhatsApp',
    'hero.stat.patients': 'Happy Patients Treated',
    'hero.stat.specialists': 'Certified Specialists',
    'hero.stat.sterilization': 'Class-B Autoclave Sterile',

    // Emergency Strip
    'strip.title': 'Suffering from Acute Tooth Pain or Dental Trauma?',
    'strip.desc': 'Our emergency dentists in Bole provide immediate triage and pain-relief treatment.',
    'strip.btn': 'Call Emergency Hotline',

    // Services
    'services.tag': 'What We Treat',
    'services.title': 'Comprehensive Dental Services',
    'services.subtitle': 'From preventive hygiene to advanced surgical implants and smile makeovers, our clinic uses state-of-the-art modern equipment.',
    'services.btn.book': 'Request This Service →',
    'services.btn.modal': 'View Full Details & Pricing',

    // Safety & Standards
    'safety.tag': 'Hospital-Grade Hygiene',
    'safety.title': 'Your Safety is Our Utmost Priority',
    'safety.subtitle': 'We maintain the highest international infection control protocols with European hospital-grade autoclave sterilization, disposable barriers, and low-radiation digital imaging.',
    'safety.item1.title': 'Class-B Vacuum Autoclave Sterilization',
    'safety.item1.desc': 'Every reusable instrument undergoes rigorous multi-stage ultrasonic cleaning and high-temperature vacuum sterilization before every patient.',
    'safety.item2.title': 'Low-Radiation Digital 3D X-Rays',
    'safety.item2.desc': 'Our cutting-edge panoramic and periapical digital sensors reduce radiation exposure by up to 80% while delivering instant, crystal-clear imaging.',
    'safety.item3.title': 'Gentle, Pain-Free Anesthesia',
    'safety.item3.desc': 'We apply topical pre-numbing gels and gentle computerized anesthesia to ensure virtually painless extractions, root canals, and restorations.',

    // Doctors
    'doctors.tag': 'Experienced Clinicians',
    'doctors.title': 'Meet Our Dental Specialists',
    'doctors.subtitle': 'Compassionate, highly trained practitioners committed to ethical care, continuing education, and patient comfort.',
    'doctors.btn.request': 'Request with this Doctor',

    // Appointment Booking
    'booking.tag': 'Seamless Online Scheduling',
    'booking.title.pre': 'Request Your Dental ',
    'booking.title.highlight': 'Appointment',
    'booking.subtitle': 'Submit your preferred treatment date and contact details in less than a minute. Our clinic receptionist will review availability and call you promptly to confirm.',
    'booking.channel.whatsapp.title': 'Prefer Instant WhatsApp Booking?',
    'booking.channel.whatsapp.desc': 'Click to send our reception team an instant message with your preferred service and time.',
    'booking.channel.phone.title': 'Prefer to Call Us Directly?',
    'booking.channel.phone.desc': 'Speak immediately with our front desk at +251 911 234 567 or +251 116 182 020.',

    // Stepper Form
    'step1.label': 'Service',
    'step2.label': 'Date & Shift',
    'step3.label': 'Contact',
    'form.step1.title': 'Step 1: Choose Your Dental Treatment',
    'form.step1.sub': 'Select the primary care you require today',
    'form.step2.title': 'Step 2: Choose Preferred Date & Shift',
    'form.step2.sub': 'Clinic open Mon - Sat (8:30am - 7:00pm) & Sun morning',
    'form.step3.title': 'Step 3: Patient Information',
    'form.step3.sub': 'We need your contact phone number to confirm your booking',
    'form.label.date': 'Preferred Date',
    'form.label.shift': 'Preferred Time Shift',
    'shift.morning': 'Morning (8:30 AM - 12:30 PM)',
    'shift.afternoon': 'Afternoon (2:00 PM - 6:30 PM)',
    'shift.weekend': 'Weekend Flexible',
    'form.label.name': 'Full Patient Name',
    'form.label.phone': 'Ethiopian Phone Number',
    'form.label.notes': 'Notes / Symptoms (Optional)',
    'form.placeholder.name': 'e.g., Almaz Tesfaye',
    'form.placeholder.phone': 'e.g., 0911234567 or +251911234567',
    'form.placeholder.notes': 'Describe any tooth pain, sensitivity, or dental history...',
    'form.disclaimer': 'Important Notice: Submitting this form requests an appointment reservation. It is NOT an instant confirmation. Our receptionist will call your phone within 15–30 minutes to verify chair availability and confirm your exact slot.',
    'btn.next': 'Continue →',
    'btn.prev': '← Back',
    'btn.submit': 'Submit Appointment Request',

    // Acknowledgment Modal (FR-06)
    'ack.title': 'Appointment Request Received!',
    'ack.ref': 'Request Reference #:',
    'ack.notice': 'Please Note: Your appointment is currently pending verification. Our clinic receptionist in Bole will call you by telephone within 15–30 minutes to confirm your final booking time.',
    'ack.whatsapp': 'Also Send Request via WhatsApp',
    'ack.close': 'Close & Return to Home',

    // Reviews & FAQs
    'reviews.tag': 'Patient Feedback',
    'reviews.title': 'Trusted by Thousands of Addis Smiles',
    'reviews.subtitle': 'Read real experiences from families, professionals, and international visitors treated at Lucy Dental Clinic.',
    'faq.tag': 'Got Questions?',
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Find clear answers about dental treatments, insurance, pricing, and visit preparation.',

    // Contact
    'contact.tag': 'Visit Our Clinic',
    'contact.title': 'Convenient Location in Bole',
    'contact.subtitle': 'Easily accessible from all parts of Addis Ababa with convenient elevator access and dedicated patient parking.',
    'contact.address.title': 'Clinic Address',
    'contact.address.desc': 'Bole Sub-City, Behind Edna Mall & Bole Medhanialem Cathedral, Lex Plaza 3rd Floor, Addis Ababa, Ethiopia.',
    'contact.phone.title': 'Telephone & Mobile',
    'contact.hours.title': 'Working Hours',
    'contact.landmark': 'Landmark: 150m Behind Edna Mall, Next to Ramada Hotel',

    // Footer
    'footer.desc': 'Lucy Dental Specialist Clinic is dedicated to providing painless, international-standard dental healthcare in Addis Ababa, Ethiopia. Committed to gentle care and advanced hygiene.',
    'footer.quicklinks': 'Quick Links',
    'footer.hours': 'Working Hours',
    'footer.disclaimer': 'Medical Disclaimer: The information published on this website is for educational and appointment reservation purposes only. It does not replace a clinical dental examination or diagnosis by a licensed dental professional.',
    'footer.rights': '© 2026 Lucy Dental Specialist Clinic. All rights reserved. Addis Ababa, Ethiopia.'
  },

  am: {
    // Top Bar & Navigation
    'top.emergency': 'የድንገተኛ ህክምና መስመር:',
    'top.hours': 'ከሰኞ - ቅዳሜ፡ 2:30 ጥዋት - 1:00 ማታ | እሑድ፡ 3:00 ጥዋት - 7:00 ከሰዓት',
    'nav.home': 'ዋና ገጽ',
    'nav.services': 'አገልግሎቶች',
    'nav.gallery': 'ውጤቶች',
    'nav.staff': 'ባለሙያዎች',
    'nav.about': 'ስለ እኛ',
    'nav.blog': 'ብሎግ',
    'nav.doctors': 'ሐኪሞች',
    'nav.reviews': 'ምስክርነቶች',
    'nav.faq': 'ጥያቄዎች',
    'nav.contact': 'አድራሻ',
    'nav.book': 'ቀጠሮ ያስይዙ',
    'emergency.call': 'ድንገተኛ ጥሪ',

    // Home Page specific
    'home.featuredServices': 'ዋና ዋና አገልግሎቶች',
    'home.services.viewAll': 'ሁሉንም አገልግሎቶች ይመልከቱ →',
    'home.featuredStaff': 'ስፔሻሊስት የጥርስ ሐኪሞቻችን',
    'home.staff.viewAll': 'ሁሉንም ባለሙያዎቻችንን ይመልከቱ →',
    'home.reviews.viewAll': 'ሁሉንም የታካሚ ምስክርነቶች ይመልከቱ →',

    // Hero Section
    'hero.badge': 'በአዲስ አበባ ከፍተኛ ተመራጭ የጥርስ ስፔሻሊቲ ክሊኒክ',
    'hero.title.pre': 'ዘመናዊ እና አስተማማኝ የጥርስ ህክምና ',
    'hero.title.highlight': 'በአዲስ አበባ',
    'hero.subtitle': 'በዘመናዊ የ3D ዲጂታል ቴክኖሎጂ የታገዘ፣ ህመም የሌለው እና በአስተማማኝ የኢትዮጵያ ስፔሻሊስት ሐኪሞች የሚሰጥ የጥርስ ህክምና። ጤናማ እና ብሩህ ፈገግታዎን እንመልሳለን።',
    'hero.cta.book': 'ቀጠሮ ያስይዙ',
    'hero.cta.whatsapp': 'በዋትስአፕ (WhatsApp) ያናግሩ',
    'hero.stat.patients': 'የታከሙ ደስተኛ ደንበኞች',
    'hero.stat.specialists': 'ብቁ ስፔሻሊስት ሐኪሞች',
    'hero.stat.sterilization': '100% አስተማማኝ ማምከኛ (Autoclave)',

    // Emergency Strip
    'strip.title': 'ድንገተኛ የጥርስ ህመም ወይም ጉዳት አጋጥሞዎታል?',
    'strip.desc': 'በቦሌ የሚገኙ የድንገተኛ ህክምና ሐኪሞቻችን ፈጣን ህመም ማስታገሻ እና ህክምና ይሰጣሉ።',
    'strip.btn': 'ድንገተኛ መስመር ይደውሉ',

    // Services
    'services.tag': 'የምንሰጣቸው ህክምናዎች',
    'services.title': 'አጠቃላይ የጥርስ ህክምና አገልግሎቶች',
    'services.subtitle': 'ከልጆች የጥርስ እንክብካቤ እስከ የላቀ የጥርስ ተከላ እና የውበት ህክምና ድረስ በዘመናዊ የህክምና መሳሪያዎች እንሰጣለን።',
    'services.btn.book': 'ለዚህ ህክምና ቀጠሮ ይጠይቁ →',
    'services.btn.modal': 'ሙሉ መረጃ እና ዋጋ ይመልከቱ',

    // Safety & Standards
    'safety.tag': 'የላቀ ንፅህና እና ደህንነት',
    'safety.title': 'የእርስዎ ጤና እና ደህንነት ቀዳሚ ተግባራችን ነው',
    'safety.subtitle': 'ዓለም አቀፍ ደረጃውን የጠበቀ የሆስፒታል ማምከኛ አሰራርን በመከተል፣ ለእያንዳንዱ ታካሚ 100% የፀዱ መሳሪያዎችን ብቻ እንጠቀማለን።',
    'safety.item1.title': 'ክላስ-ቢ (Class-B) ዘመናዊ የእንፋሎት ማምከኛ',
    'safety.item1.desc': 'እያንዳንዱ መሳሪያ በከፍተኛ ሙቀት እና ግፊት በሚሰራ ዘመናዊ ማሽን ከጀርሞች የፀዳ መሆኑ ይረጋገጣል።',
    'safety.item2.title': 'አነስተኛ ጨረር ያለው የ3D ዲጂታል ኤክስሬይ',
    'safety.item2.desc': 'የጨረር መጠኑን በ80% የሚቀንስ እና ወዲያውኑ የጥርስዎን ሁኔታ በግልጽ የሚያሳይ የዲጂታል ቴክኖሎጂ።',
    'safety.item3.title': 'ህመም የሌለው የማደንዘዣ ዘዴ',
    'safety.item3.desc': 'የመርፌ ስሜትን የሚያስቀሩ ቅባቶች እና ዘመናዊ የማደንዘዣ ቴክኒኮችን በመጠቀም ያለምንም ጭንቀት ይታከማሉ።',

    // Doctors
    'doctors.tag': 'ባለሙያ ሐኪሞቻችን',
    'doctors.title': 'የስፔሻሊስት ሐኪሞች ቡድን',
    'doctors.subtitle': 'ከፍተኛ ልምድ እና ትምህርት ያላቸው፣ ታካሚን በአክብሮት እና በእርጋታ የሚያስተናግዱ የጥርስ ሐኪሞቻችን።',
    'doctors.btn.request': 'ከዚህ ሐኪም ጋር ቀጠሮ ይጠይቁ',

    // Appointment Booking
    'booking.tag': 'ቀላል የቀጠሮ መጠየቂያ',
    'booking.title.pre': 'የጥርስ ህክምና ',
    'booking.title.highlight': 'ቀጠሮዎን ያስይዙ',
    'booking.subtitle': 'የሚፈልጉትን አገልግሎት፣ ቀን እና ስልክ ቁጥርዎን በጥቂት ሰከንዶች ውስጥ ያስገቡ። አስተናጋጆቻችን ወዲያውኑ ደውለው ያረጋግጡልዎታል።',
    'booking.channel.whatsapp.title': 'በቀጥታ በዋትስአፕ (WhatsApp) ማስያዝ ይፈልጋሉ?',
    'booking.channel.whatsapp.desc': 'አሁኑኑ ጠቅ በማድረግ መልዕክት በቀጥታ ወደ ክሊኒኩ የዋትስአፕ መስመር ይላኩ።',
    'booking.channel.phone.title': 'በቀጥታ በስልክ ማነጋገር ይመርጣሉ?',
    'booking.channel.phone.desc': 'በስልክ ቁጥር +251 911 234 567 ወይም +251 116 182 020 አሁኑኑ ይደውሉ።',

    // Stepper Form
    'step1.label': 'አገልግሎት',
    'step2.label': 'ቀንና ሰዓት',
    'step3.label': 'አድራሻ',
    'form.step1.title': 'ደረጃ 1፡ የሚፈልጉትን የጥርስ ህክምና ይምረጡ',
    'form.step1.sub': 'የሚፈልጉትን ዋና አገልግሎት ይምረጡ',
    'form.step2.title': 'ደረጃ 2፡ ምቹ የቀን እና የሰዓት ክፍለ ጊዜ ይምረጡ',
    'form.step2.sub': 'ክሊኒካችን ከሰኞ - ቅዳሜ (ከ2:30 ጥዋት - 1:00 ማታ) እና እሁድ ጥዋት ክፍት ነው',
    'form.step3.title': 'ደረጃ 3፡ የታካሚው መረጃ',
    'form.step3.sub': 'ቀጠሮዎን ለማረጋገጥ የስልክ ቁጥርዎን ያስገቡ',
    'form.label.date': 'የቀጠሮ ቀን',
    'form.label.shift': 'ምቹ የሰዓት ክፍለ ጊዜ',
    'shift.morning': 'ጥዋት (2:30 ጥዋት - 6:30 ቀትር)',
    'shift.afternoon': 'ከሰዓት (8:00 ከሰዓት - 12:30 ማታ)',
    'shift.weekend': 'ቅዳሜ / እሁድ',
    'form.label.name': 'የታካሚው ሙሉ ስም',
    'form.label.phone': 'የሞባይል ስልክ ቁጥር',
    'form.label.notes': 'ተጨማሪ ማስታወሻ / የህመም ስሜት (አስፈላጊ ከሆነ)',
    'form.placeholder.name': 'ምሳሌ፡ አልማዝ ተስፋዬ',
    'form.placeholder.phone': 'ምሳሌ፡ 0911234567 ወይም +251911234567',
    'form.placeholder.notes': 'ያለዎትን የጥርስ ህመም ወይም ስሜት እዚህ መግለጽ ይችላሉ...',
    'form.disclaimer': 'ጠቃሚ ማሳሰቢያ፡ ይህንን ቅጽ መሙላት የቀጠሮ ጥያቄ ማቅረብ እንጂ ወዲያውኑ የተረጋገጠ ቀጠሮ አይደለም። የክሊኒካችን አስተናጋጆች ክፍት መቀመጫ መኖሩን አረጋግጠው በ15–30 ደቂቃ ውስጥ በስልክ ደውለው ያረጋግጡልዎታል።',
    'btn.next': 'ቀጥል →',
    'btn.prev': '← ተመለስ',
    'btn.submit': 'የቀጠሮ ጥያቄውን ላክ',

    // Acknowledgment Modal (FR-06)
    'ack.title': 'የቀጠሮ ጥያቄዎ ደርሶናል!',
    'ack.ref': 'የጥያቄ መለያ ቁጥር (Ref):',
    'ack.notice': 'ጠቃሚ ማስታወሻ፡ የቀጠሮ ጥያቄዎ በክሊኒካችን አስተናጋጆች እየተገመገመ ነው። በቦሌ የሚገኘው የክሊኒካችን ሰራተኛ በ15–30 ደቂቃ ውስጥ በስልክ ደውሎ ትክክለኛውን ሰዓት ያረጋግጥልዎታል።',
    'ack.whatsapp': 'ጥያቄውን በዋትስአፕም ይላኩ',
    'ack.close': 'ዝጋ እና ወደ ዋናው ገጽ ተመለስ',

    // Reviews & FAQs
    'reviews.tag': 'የታካሚዎች ምስክርነት',
    'reviews.title': 'በሺዎች የሚቆጠሩ የአዲስ አበባ ነዋሪዎች እምነት',
    'reviews.subtitle': 'በሉሲ የጥርስ ክሊኒክ የታከሙ ደንበኞቻችን የሰጡትን እውነተኛ አስተያየት ይመልከቱ።',
    'faq.tag': 'ጥያቄ አለዎት?',
    'faq.title': 'ተደጋግመው የሚጠየቁ ጥያቄዎች',
    'faq.subtitle': 'ስለ ህክምናዎች፣ የክፍያ አማራጮች (ቴሌብር/CBE) እና ቅድመ ዝግጅት ግልጽ መረጃ ያግኙ።',

    // Contact
    'contact.tag': 'ክሊኒካችንን ይጎብኙ',
    'contact.title': 'በቦሌ እምብርት የሚገኝ ምቹ አድራሻ',
    'contact.subtitle': 'ከሁሉም የአዲስ አበባ አቅጣጫዎች በቀላሉ የሚደረስበት፣ በቂ የመኪና ማቆሚያ እና የሊፍት አገልግሎት ያለው።',
    'contact.address.title': 'የክሊኒኩ አድራሻ',
    'contact.address.desc': 'ቦሌ ክፍለ ከተማ፣ ከኤድና ሞል እና ከቦሌ መድኃኔዓለም ጀርባ፣ ሌክስ ፕላዛ 3ኛ ፎቅ፣ አዲስ አበባ፣ ኢትዮጵያ።',
    'contact.phone.title': 'ስልክ እና ሞባይል',
    'contact.hours.title': 'የስራ ሰዓት',
    'contact.landmark': 'መለያ ምልክት፡ ከኤድና ሞል 150 ሜትር ጀርባ፣ ከራማዳ ሆቴል አጠገብ',

    // Footer
    'footer.desc': 'ሉሲ የጥርስ ስፔሻሊቲ ክሊኒክ በአዲስ አበባ ከተማ ዓለም አቀፍ ደረጃውን የጠበቀ፣ ህመም የሌለው እና 100% ንፅህናው የተረጋገጠ የጥርስ ህክምና አገልግሎት ይሰጣል።',
    'footer.quicklinks': 'ፈጣን አገናኞች',
    'footer.hours': 'የስራ ሰዓት',
    'footer.disclaimer': 'የህክምና ማሳሰቢያ፡ በዚህ ድረ-ገጽ ላይ የቀረበው መረጃ ለትምህርት እና ለቀጠሮ መጠየቂያ ብቻ የሚውል ሲሆን፣ በባለሙያ ሐኪም የሚደረገውን የህክምና ምርመራ አይተካም።',
    'footer.rights': '© 2026 ሉሲ የጥርስ ስፔሻሊቲ ክሊኒክ። መብቱ በህግ የተጠበቀ ነው። አዲስ አበባ፣ ኢትዮጵያ።'
  }
};
