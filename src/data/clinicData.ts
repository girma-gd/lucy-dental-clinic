import type { DentalService, Doctor, Testimonial, FaqItem } from '../types';

export const servicesData: DentalService[] = [
  {
    id: 'consultation',
    titleEn: 'General Check-up & Digital Diagnostics',
    titleAm: 'አጠቃላይ የጥርስ ምርመራ እና የዲጂታል ኤክስሬይ',
    descEn: 'Full intra-oral digital exam, computerized low-dose X-ray, gum health assessment, and personalized treatment roadmap.',
    descAm: 'የአፍ ውስጥ ዲጂታል ምርመራ፣ አነስተኛ ጨረር ያለው ኤክስሬይ፣ የድድ ጤንነት ምርመራ እና ግልጽ የህክምና እቅድ።',
    duration: '30 – 45 mins',
    priceRange: '500 – 1,000 ETB',
    category: 'Preventive',
    highlightsEn: [
      'Digital high-res periapical X-ray',
      'Periodontal gum pocket screening',
      'Detailed consultation with specialist'
    ],
    highlightsAm: [
      'ከፍተኛ ጥራት ያለው ዲጂታል ኤክስሬይ',
      'የድድ ጤንነት እና የኢንፌክሽን ቅኝት',
      'ከስፔሻሊስት ሐኪም ጋር ዝርዝር ምክክር'
    ]
  },
  {
    id: 'cleaning',
    titleEn: 'Ultrasonic Teeth Cleaning & Whitening',
    titleAm: 'የጥርስ ማጽዳት፣ ቆሻሻ ማንሳት እና ሌዘር ማብራት',
    descEn: 'Ultrasonic tartar scaling, deep stain removal, enamel polishing, and safe laser whitening for a radiant smile.',
    descAm: 'በአልትራሶኒክ ማሽን የጠጠረ ቆሻሻ ማንሳት፣ የሻይና ቡና እድፍ ማጽዳት እና ጥርስን በሌዘር ማብራት።',
    duration: '45 – 60 mins',
    priceRange: '1,500 – 4,500 ETB',
    category: 'Cosmetic & Hygiene',
    highlightsEn: [
      'Ultrasonic airflow scaling technology',
      'Gentle on enamel and sensitive gums',
      'Up to 6 shades whiter with safe laser'
    ],
    highlightsAm: [
      'የጥርስን ሽፋን የማይጎዳ የአልትራሶኒክ ቴክኖሎጂ',
      'የድድ ደም መፍሰስን እና የአፍ ጠረንን የሚያስወግድ',
      'በአስተማማኝ ሌዘር ጥርስን የሚያበራ'
    ]
  },
  {
    id: 'root-canal',
    titleEn: 'Pain-Free Root Canal Therapy',
    titleAm: 'ህመም የሌለው የጥርስ ስር ህክምና (Root Canal)',
    descEn: 'Save your natural tooth with painless rotary endodontic therapy, eradicating infection without unnecessary extraction.',
    descAm: 'የጥርስን ስር በዘመናዊ ማሽን በማጽዳት እና በመድሃኒት በመሙላት ጥርስ ሳይነቀል ለዘላቂ አገልግሎት ማዳን።',
    duration: '60 – 90 mins',
    priceRange: '4,000 – 8,000 ETB',
    category: 'Restorative',
    highlightsEn: [
      'Gentle computerized local anesthesia',
      'Preserves natural jawbone & tooth structure',
      'Restored with reinforced zirconia crown'
    ],
    highlightsAm: [
      'ህመም የሌለው ዘመናዊ የማደንዘዣ አሰጣጥ',
      'የጥርስን አጥንት እና መዋቅር በዘላቂነት ማዳን',
      'በጠንካራ የሸክላ (Zirconia) ክራውን መሸፈን'
    ]
  },
  {
    id: 'implants',
    titleEn: 'Dental Implants & Zirconia Crowns',
    titleAm: 'የጥርስ ተከላ እና ቋሚ የሸክላ (Zirconia) ክራውን',
    descEn: 'Permanent titanium implants and ceramic zirconia crowns that replicate the strength and natural aesthetics of real teeth.',
    descAm: 'የተነቀለ ጥርስን በዘላቂነት የሚተካ የቲታኒየም ጥርስ ተከላ እና የተፈጥሮ ጥርስ መልክ ያለው ቋሚ ክራውን።',
    duration: 'Multi-stage / Consult',
    priceRange: 'Consultation-based',
    category: 'Surgical Specialist',
    highlightsEn: [
      'Medical grade titanium osseointegration',
      'Custom 3D scan and shade matching',
      'Restores 100% natural chewing force'
    ],
    highlightsAm: [
      'የአጥንት መሳሳትን የሚከላከል የህክምና ቲታኒየም',
      'ከተፈጥሮ ጥርስ የማይለይ የቀለም ቅንብር',
      'የማኘክ አቅምን ሙሉ በሙሉ የሚመልስ'
    ]
  },
  {
    id: 'orthodontics',
    titleEn: 'Orthodontics & Clear Braces',
    titleAm: 'የጥርስ ማስተካከያ እና የማይታዩ (Clear) አላይነሮች',
    descEn: 'Correct crowded, spaced, or misaligned teeth using traditional ceramic braces or clear invisible aligners for teens and adults.',
    descAm: 'የተዛነፉ፣ የተነባበሩ ወይም የተራራቁ ጥርሶችን በብረት፣ በሸክላ ወይም በማይታዩ አላይነሮች ማስተካከልና ማሳመር።',
    duration: 'Monthly adjustments',
    priceRange: 'Flexible Milestones',
    category: 'Orthodontics',
    highlightsEn: [
      'Digital 3D bite preview and alignment plan',
      'Low-visibility ceramic & clear aligners',
      'Flexible installment payment in Birr'
    ],
    highlightsAm: [
      'የጥርስን አቀማመጥ በ3D ዲጂታል ቅኝት ማቀድ',
      'በማይታዩ ውብ የሸክላ እና የላስቲክ አማራጮች',
      'በወርሃዊ ክፍያ የሚከፈል ምቹ የክፍያ እቅድ'
    ]
  },
  {
    id: 'pediatric',
    titleEn: 'Gentle Pediatric & Child Dentistry',
    titleAm: 'የህፃናት የጥርስ እንክብካቤ እና መከላከያ',
    descEn: 'Friendly, tear-free dental experiences for children. Preventive fluoride varnishes, fissure sealants, and gentle dental education.',
    descAm: 'ለህፃናት አስደሳች እና ፍርሃት አልባ ህክምና። ጥርስ እንዳይበሰብስ የሚከላከሉ ቅባቶች እና የጥርስ ጽዳት ስልጠና።',
    duration: '30 – 45 mins',
    priceRange: '800 – 2,500 ETB',
    category: 'Family & Children',
    highlightsEn: [
      'Patient, child-specialized compassionate care',
      'Cavity preventive fissure sealants',
      'Fun environment to build positive dental habits'
    ],
    highlightsAm: [
      'ህፃናትን በእርጋታ እና በፍቅር የሚያስተናግዱ ባለሙያዎች',
      'የጥርስ መቦርቦርን የሚከላከሉ የሲላንት ህክምናዎች',
      'ለህፃናት አስደሳች እና የሚያዝናና የክሊኒክ ድባብ'
    ]
  }
];

export const doctorsData: Doctor[] = [
  {
    id: 'dr-selamawit',
    name: 'Dr. Selamawit Tadesse',
    specialtyEn: 'Lead Restorative Specialist & Cosmetic Surgeon',
    specialtyAm: 'ዋና የጥርስ ስፔሻሊስት እና የውበት ህክምና ሐኪም',
    credentialsEn: 'BDS, MSc Restorative Dentistry • 11+ Years Experience',
    credentialsAm: 'የጥርስ ህክምና ማስተርስ (MSc) • ከ11 ዓመታት በላይ ልምድ',
    bioEn: 'Specializing in aesthetic smile restorations, minimally invasive fillings, and complex root canal therapy with extreme gentleness.',
    bioAm: 'ህመም የሌለው የጥርስ ስር ህክምና፣ የጥርስ ውበት እና የሸክላ ሽፋን (Veneers) ህክምና ላይ ከፍተኛ ልምድ ያላት።',
    languagesEn: 'Amharic, English, Afaan Oromoo',
    languagesAm: 'አማርኛ፣ እንግሊዝኛ፣ አፋን ኦሮሞ',
    image: '/assets/images/doctor-selamawit.jpg',
    defaultService: 'Pain-Free Root Canal Therapy'
  },
  {
    id: 'dr-samuel',
    name: 'Dr. Samuel Tesfaye',
    specialtyEn: 'Oral & Maxillofacial Surgeon, Implantologist',
    specialtyAm: 'የጥርስ እና የአፍ ውስጥ ቀዶ ህክምና፣ የጥርስ ተከላ ስፔሻሊስት',
    credentialsEn: 'DDS, Oral & Maxillofacial Surgery, Member EDA • 14+ Years',
    credentialsAm: 'የጥርስ ቀዶ ህክምና ስፔሻሊስት • ከ14 ዓመታት በላይ ልምድ',
    bioEn: 'Expert in precision dental implant placement, complex surgical extractions, bone grafting, and traumatic dental injury reconstruction.',
    bioAm: 'ቋሚ የጥርስ ተከላ (Dental Implants)፣ ውስብስብ የጥርስ መንቀል እና የቀዶ ህክምና ስራዎችን በከፍተኛ ብቃት የሚሰጥ።',
    languagesEn: 'Amharic, English',
    languagesAm: 'አማርኛ፣ እንግሊዝኛ',
    image: '/assets/images/doctor-samuel.jpg',
    defaultService: 'Dental Implants & Zirconia Crowns'
  },
  {
    id: 'dr-yonas',
    name: 'Dr. Yonas Alemu',
    specialtyEn: 'Pediatric Dentist & Orthodontic Specialist',
    specialtyAm: 'የህፃናት የጥርስ ህክምና እና የጥርስ ማስተካከያ (Braces) ባለሙያ',
    credentialsEn: 'BDS, Paediatric Dentistry Specialist, EDA • 8+ Years',
    credentialsAm: 'የህፃናት የጥርስ ስፔሻሊስት • ከ8 ዓመታት በላይ ልምድ',
    bioEn: 'Warm, patient, and specially trained in gentle dental care for children, early tooth alignment, preventive sealants, and positive habits.',
    bioAm: 'ህፃናት ያለ ምንም ፍርሃት እና ጭንቀት እንዲታከሙ የሚያደርግ፣ የጥርስ ማስተካከያ (Braces) ባለሙያ።',
    languagesEn: 'Amharic, English, Tigrinya',
    languagesAm: 'አማርኛ፣ እንግሊዝኛ፣ ትግርኛ',
    image: '/assets/images/doctor-yonas.jpg',
    defaultService: 'Gentle Pediatric & Child Dentistry'
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    author: 'Alemayehu Tekle',
    location: 'Bole, Addis Ababa',
    quoteEn: 'I was terrified of root canals for years, but Dr. Selamawit made the procedure 100% painless! The clinic is spotless, modern, and feels like private dental clinics in Europe.',
    quoteAm: 'የጥርስ ስር ህክምናን በጣም እፈራ ነበር፤ ነገር ግን ዶ/ር ሰላማዊት ምንም አይነት ህመም ሳይሰማኝ ሰርታኛለች። ክሊኒኩ እጅግ ዘመናዊና ንፁህ ነው።',
    rating: 5,
    initials: 'AT'
  },
  {
    id: '2',
    author: 'Martha Bekele',
    location: 'Kazanchis, Addis Ababa',
    quoteEn: 'Dr. Samuel placed two dental implants for me. His technical precision is remarkable. They accepted Telebirr seamlessly at reception and followed up the next day.',
    quoteAm: 'ዶ/ር ሳሙኤል ሁለት የጥርስ ተከላ ሰርቶልኛል። ስራቸው እጅግ አስተማማኝ ነው። በቴሌብር በቀላሉ ከፍዬ በሚቀጥለው ቀን ደውለው ደህንነቴን ጠይቀውኛል።',
    rating: 5,
    initials: 'MB'
  },
  {
    id: '3',
    author: 'Tewodros Girma',
    location: 'Sarbet, Addis Ababa',
    quoteEn: 'My 7-year-old son used to cry at dentist clinics. Dr. Yonas made him laugh and comfortable throughout the teeth cleaning. Truly exceptional service.',
    quoteAm: 'የ7 አመት ልጄ የጥርስ ክሊኒክ ሲደርስ ያለቅስ ነበር። ዶ/ር ዮናስ ልጄን እያጫወተ ጥርሱን አጸዳለት። እጅግ ድንቅ እንክብካቤ ነው።',
    rating: 5,
    initials: 'TG'
  }
];

export const faqData: FaqItem[] = [
  {
    id: 'faq-1',
    questionEn: 'Is dental treatment at Lucy Dental painful?',
    questionAm: 'በሉሲ የጥርስ ክሊኒክ ህክምና ሲደረግ ያማል?',
    answerEn: 'No. We specialize in pain-free dentistry. We apply a topical anesthetic gel to numb the gum surface prior to any gentle local anesthesia injection. During extractions, fillings, or root canal therapies, you will feel zero sharp pain.',
    answerAm: 'በፍጹም አያምም። የመርፌ ህመምን የሚያስቀር ማደንዘዣ ቅባት በመጠቀም በዘመናዊ የማደንዘዣ ቴክኒክ ስለሚሰጥ ምንም አይነት የህመም ስሜት አይኖርዎትም።'
  },
  {
    id: 'faq-2',
    questionEn: 'How soon will I receive confirmation after requesting an appointment online?',
    questionAm: 'በድረ-ገጽ የቀጠሮ ጥያቄ ከሞላሁ በኋላ በምን ያህል ጊዜ ማረጋገጫ ይደርሰኛል?',
    answerEn: 'Our clinic receptionist monitors all submissions during working hours (8:30 AM – 7:00 PM) and will place a telephone call to your provided Ethiopian mobile number within 15 to 30 minutes to verify availability and confirm your exact chair time.',
    answerAm: 'የክሊኒካችን አስተናጋጆች በስራ ሰዓት (ከ2:30 ጥዋት - 1:00 ማታ) የገቡትን ጥያቄዎች ተከታትለው በ15 እስከ 30 ደቂቃ ውስጥ በስልክ ደውለው ያረጋግጡልዎታል።'
  },
  {
    id: 'faq-3',
    questionEn: 'What payment methods do you accept at the clinic?',
    questionAm: 'ክሊኒኩ ምን ዓይነት የክፍያ አማራጮችን ይቀበላል?',
    answerEn: 'We accept Telebirr, CBE Birr, Awash Birr, direct mobile bank transfers (Commercial Bank of Ethiopia, Dashen, etc.), cash, and approved private medical insurance coverage.',
    answerAm: 'ቴሌብር (Telebirr)፣ የኢትዮጵያ ንግድ ባንክ (CBE Birr)፣ አዋሽ ባንክ፣ የሞባይል ባንኪንግ ዝውውር፣ ጥሬ ገንዘብ እና የህክምና ኢንሹራንስ እንቀበላለን።'
  },
  {
    id: 'faq-4',
    questionEn: 'How often should I have my teeth professionally cleaned?',
    questionAm: 'ጥርስን በባለሙያ ማጽዳት በስንት ጊዜ መደረግ አለበት?',
    answerEn: 'The Ethiopian Dental Association and global health guidelines recommend a professional ultrasonic cleaning and dental check-up every 6 months to remove hardened calculus and prevent gum disease (gingivitis).',
    answerAm: 'የኢትዮጵያ የጥርስ ሐኪሞች ማህበር እና የዓለም ጤና ድርጅት በየ6 ወሩ ጥርስን በባለሙያ ማጽዳት እና ምርመራ ማድረግ ይመክራሉ።'
  },
  {
    id: 'faq-5',
    questionEn: 'What should I do if a tooth is broken or knocked out in an accident?',
    questionAm: 'ጥርስ በድንገተኛ አደጋ ቢሰበር ወይም ቢወልቅ ምን ማድረግ አለብኝ?',
    answerEn: 'Handle the knocked-out tooth by the crown only (do NOT touch the root). Place it immediately in cold milk or saliva, and call our emergency hotline at +251 911 234 567 right away. Re-implantation within 60 minutes offers the highest chance of saving the tooth.',
    answerAm: 'የወለቀውን ጥርስ ስሩን ሳይነኩ ከላይ ብቻ ይያዙት። ወዲያውኑ በቀዝቃዛ ወተት ወይም ምራቅ ውስጥ በማድረግ በስልክ ቁጥር +251 911 234 567 ወዲያውኑ ይደውሉ። በ60 ደቂቃ ውስጥ ከደረሱ ጥርሱን መልሶ መትከል ይቻላል።'
  }
];
