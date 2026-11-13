export interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleAm: string;
  excerptEn: string;
  excerptAm: string;
  category: 'Restorative' | 'Cosmetic' | 'Surgery' | 'Prevention' | 'Pediatric';
  categoryEn: string;
  categoryAm: string;
  readTimeEn: string;
  readTimeAm: string;
  publishedDate: string;
  author: {
    name: string;
    roleEn: string;
    roleAm: string;
    avatar: string;
  };
  coverImage: string;
  keyTakeawaysEn: string[];
  keyTakeawaysAm: string[];
  sections: {
    headingEn: string;
    headingAm: string;
    bodyEn: string;
    bodyAm: string;
  }[];
  clinicalTipEn: string;
  clinicalTipAm: string;
  relatedService: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'root-canal-myths',
    slug: 'pain-free-root-canal-treatment-myths-facts',
    titleEn: 'Debunking Root Canal Myths: Why Modern Rotary Procedures Are Completely Pain-Free',
    titleAm: 'የስር ህክምና (Root Canal) እውነታዎች እና ያለህመም የሚሰጥበት ዘመናዊ ቴክኖሎጂ',
    excerptEn: 'Learn how computerized apex locators, gentle rotary nickel-titanium instruments, and targeted local anesthesia have eliminated the pain traditionally associated with root canals.',
    excerptAm: 'በዘመናዊ የዲጂታል ቴክኖሎጂ እና የህመም ማስታገሻ መሳሪያዎች የስር ህክምና (Root Canal) ያለምንም ህመም እንዴት እንደሚሰጥ እና የቆዩ የተሳሳቱ አመለካከቶችን ይወቁ።',
    category: 'Restorative',
    categoryEn: 'Restorative Dentistry',
    categoryAm: 'የጥርስ እድሳት ህክምና',
    readTimeEn: '4 min read',
    readTimeAm: '4 ደቂቃ ንባብ',
    publishedDate: 'November 2026',
    author: {
      name: 'Dr. Selamawit Tadesse',
      roleEn: 'Lead Restorative Specialist',
      roleAm: 'ዋና የጥርስ ስፔሻሊስት',
      avatar: '/assets/images/doctor-selamawit.jpg',
    },
    coverImage: '/assets/images/clinic-interior.jpg',
    keyTakeawaysEn: [
      'The toothache is caused by the infection inside the pulp, not the root canal procedure itself.',
      'Modern nickel-titanium rotary files complete root canal cleaning in a single relaxed 45-minute visit.',
      'Saving your natural tooth prevents adjacent teeth from drifting and preserves your natural bite balance.',
    ],
    keyTakeawaysAm: [
      'ህመሙ የሚመጣው በጥርስ ውስጥ ካለው ኢንፌክሽን እንጂ ከስር ህክምናው ሂደት አይደለም።',
      'በዘመናዊ መሳሪያዎች በአንድ ጊዜ (በ45 ደቂቃ ውስጥ) ያለምንም ስቃይ ህክምናውን ማጠናቀቅ ይቻላል።',
      'የተፈጥሮ ጥርስዎን ማዳን ሌሎች ጥርሶች ቦታቸውን እንዳይቀይሩ እና ማኘክ እንዳይዛባ ይከላከላል።',
    ],
    sections: [
      {
        headingEn: 'Why Do Patients Fear Root Canals?',
        headingAm: 'ሰዎች የስር ህክምናን (Root Canal) ለምን ይፈራሉ?',
        bodyEn: 'Decades ago, dental anesthetics and hand files were rudimentary. Today, root canal therapy feels no different than getting a routine composite filling. With modern localized numbing agents, patients routinely report feeling zero discomfort during the procedure.',
        bodyAm: 'ከብዙ አመታት በፊት የነበሩ የህክምና መሳሪያዎች እና ማደንዘዣዎች ውስን ነበሩ። ዛሬ ግን በዘመናዊ ማደንዘዣ እና የኮምፒውተር ዲጂታል መሳሪያዎች ታካሚዎች ምንም አይነት ህመም ሳይሰማቸው በሰላም ይታከማሉ።',
      },
      {
        headingEn: 'The 3 Steps of Modern Root Canal Therapy',
        headingAm: 'የዘመናዊ ስር ህክምና 3 ዋና ዋና ደረጃዎች',
        bodyEn: 'First, 3D digital X-rays locate every microscopic canal. Second, gentle rotary files sterilize the infected nerve chamber. Third, biocompatible gutta-percha seals the canals hermetically to prevent reinfection.',
        bodyAm: 'በመጀመሪያ በ3D ዲጂታል ኤክስሬይ የተጎዳው የነርቭ ስር በትክክል ይለያል። በመቀጠል በማምከኛ እቃዎች የነርቭ ክፍሉ ይጸዳል። በመጨረሻም ጀርሞች እንዳይገቡበት በዘላቂነት ተዘግቶ በዘመናዊ ክራውን ይጠናከራል።',
      },
    ],
    clinicalTipEn: 'Never wait until a toothache becomes unbearable. Early sensitivity to hot or cold is often the golden window to save your tooth before the infection spreads to the jawbone.',
    clinicalTipAm: 'ህመሙ እስኪበረታ ድረስ አይጠብቁ። ለሙቀት ወይም ለቅዝቃዜ መጠጦች ስሜት ሲሰማዎት ወዲያውኑ መታየት ኢንፌክሽኑ ወደ መንጋጋ አጥንት ሳይዛመት ጥርስን ለማዳን ይረዳል።',
    relatedService: 'Pain-Free Root Canal Therapy',
  },
  {
    id: 'implants-vs-bridges',
    slug: 'dental-implants-vs-traditional-bridges-comparison',
    titleEn: 'Dental Implants vs Traditional Bridges: Which Tooth Replacement Is Right for You?',
    titleAm: 'የጥርስ ተከላ (Dental Implants) ወይስ ድልድይ (Bridges)? የትኛው ይሻላል?',
    excerptEn: 'Comparing surgical titanium implants with crown-supported dental bridges in terms of longevity, bone preservation, daily maintenance, and overall value in Addis Ababa.',
    excerptAm: 'የወደቀ ወይም የተነቀለ ጥርስን በዘላቂነት ለመተካት የጥርስ ተከላ (Implants) እና የጥርስ ድልድይ (Bridges) ያላቸውን ልዩነት፣ ዘላቂነት እና የዋጋ ንጽጽር ይወቁ።',
    category: 'Surgery',
    categoryEn: 'Oral Surgery & Implants',
    categoryAm: 'የጥርስ ተከላ እና ቀዶ ህክምና',
    readTimeEn: '5 min read',
    readTimeAm: '5 ደቂቃ ንባብ',
    publishedDate: 'October 2026',
    author: {
      name: 'Dr. Samuel Girma',
      roleEn: 'Oral & Maxillofacial Surgeon',
      roleAm: 'የአፍና ጥርስ ቀዶ ህክምና ስፔሻሊስት',
      avatar: '/assets/images/doctor-samuel.jpg',
    },
    coverImage: '/assets/images/hero-dentist.jpg',
    keyTakeawaysEn: [
      'Dental implants replace the tooth root into the jawbone, preventing facial bone collapse.',
      'Unlike bridges, implants do not require grinding down healthy neighboring teeth.',
      'With proper oral hygiene, dental implants last 25+ years or a lifetime.',
    ],
    keyTakeawaysAm: [
      'የጥርስ ተከላ ልክ እንደ ተፈጥሮ ጥርስ ስር በመንጋጋ አጥንት ውስጥ ስለሚተከል የአጥንት መሸርሸርን ይከላከላል።',
      'እንደ ድልድይ አጠገብ ያሉ ጤናማ ጥርሶችን መላጨት ወይም ማሳሳት አያስፈልገውም።',
      'ጥሩ የጥርስ ንጽህና ከተደረገለት የጥርስ ተከላ ከ25 አመታት በላይ ወይም ዕድሜ ልክ ያገለግላል።',
    ],
    sections: [
      {
        headingEn: 'How Dental Implants Integrate with Your Bone',
        headingAm: 'የጥርስ ተከላ ከመንጋጋ አጥንት ጋር እንዴት ይዋሃዳል?',
        bodyEn: 'Using titanium or zirconia posts, osseointegration locks the implant securely into your jaw. Once capped with a custom zirconia crown, you can bite into injera, steak, or apples with full natural strength.',
        bodyAm: 'ከታይታኒየም የተሰራው ሰው ሰራሽ ስር ከመንጋጋ አጥንት ጋር በጠንካራ ሁኔታ ከተዋሃደ በኋላ ውብ የሆነ የዚርኮኒያ ክራውን ይገጠምለታል። እንደ ተፈጥሮ ጥርስ ጠንካራ ምግቦችን በቀላሉ ለማኘክ ያስችላል።',
      },
      {
        headingEn: 'When Are Bridges Still a Great Option?',
        headingAm: 'የጥርስ ድልድይ (Bridges) መቼ ይመረጣል?',
        bodyEn: 'If adjacent teeth already have large fillings or crowns, or if jawbone density is insufficient for immediate grafting, a porcelain bridge provides a rapid, beautiful replacement within days.',
        bodyAm: 'አጠገብ ያሉ ጥርሶች ቀድሞውኑ የተሞሉ ወይም ክራውን ያላቸው ከሆኑ፤ ወይም የአጥንት መጠን አነስተኛ ከሆነ የጥርስ ድልድይ በጥቂት ቀናት ውስጥ ፈጣንና ማራኪ መፍትሄ ይሰጣል።',
      },
    ],
    clinicalTipEn: 'Every month you delay replacing an extracted tooth, adjacent teeth tip inward and the opposing tooth over-erupts. Early replacement protects your entire facial architecture.',
    clinicalTipAm: 'ጥርስ ከተነቀለ በኋላ በቶሎ ካልተተካ አጠገብ ያሉ ጥርሶች ወደ ባዶው ቦታ በማዘንበል የፊት ቅርጽና የአነካከስ ሚዛን እንዲዛባ ያደርጋሉ።',
    relatedService: 'Dental Implants & Restorations',
  },
  {
    id: 'teeth-whitening-secrets',
    slug: 'professional-teeth-whitening-vs-home-remedies',
    titleEn: 'Professional Laser Teeth Whitening vs DIY Home Charcoal: What Dentists Actually Recommend',
    titleAm: 'የጥርስ ማጽዳት እና ማፍካት (Teeth Whitening) ምስጢርና በቤት ውስጥ የሚደረጉ ጥንቃቄዎች',
    excerptEn: 'Why lemon juice and abrasive charcoal powders erode protective enamel, and how in-office cold-light whitening brightens teeth by up to 6 shades safely.',
    excerptAm: 'የሎሚ ጭማቂ እና ከሰል ጥርስን እንዴት እንደሚያበላሹ፣ እና በክሊኒክ ውስጥ በዘመናዊ ሌዘር እና ማሽን ጥርስን በደህና እንዴት ማፍካት እንደሚቻል ይወቁ።',
    category: 'Cosmetic',
    categoryEn: 'Cosmetic Dentistry',
    categoryAm: 'የውበት የጥርስ ህክምና',
    readTimeEn: '4 min read',
    readTimeAm: '4 ደቂቃ ንባብ',
    publishedDate: 'October 2026',
    author: {
      name: 'Dr. Selamawit Tadesse',
      roleEn: 'Lead Restorative & Cosmetic Specialist',
      roleAm: 'የውበትና ጥርስ ስፔሻሊስት',
      avatar: '/assets/images/doctor-selamawit.jpg',
    },
    coverImage: '/assets/images/clinic-interior.jpg',
    keyTakeawaysEn: [
      'DIY remedies like baking soda and charcoal act as abrasives that strip outer enamel permanently.',
      'Professional whitening uses pH-balanced medical gels activated by cold light to lift deep coffee and tea stains.',
      'Custom desensitizing treatments applied after bleaching ensure zero long-term sensitivity.',
    ],
    keyTakeawaysAm: [
      'የከሰል ዱቄት እና ቤኪንግ ሶዳ የጥርስን ውጫዊ ሽፋን (ኢናሜል) በቋሚነት በመሸርሸር ጥርስን የበለጠ ቢጫ ያደርጋሉ።',
      'በክሊኒክ የሚደረግ ማፍካት ጥርስን ሳይጎዳ የሻይና ቡና እድፎችን በደህና ያስወግዳል።',
      'ከህክምናው በኋላ የሚደረግ ልዩ ቅባት ጥርስ ቅዝቃዜ እንዳይሰማው ይከላከላል።',
    ],
    sections: [
      {
        headingEn: 'Why Teeth Stain in the First Place',
        headingAm: 'ጥርስ በምን ምክንያት ይቆሽሻል ወይም ይደበዝዛል?',
        bodyEn: 'Enamel contains microscopic pores that absorb chromogens from Ethiopian coffee, black tea, spices, and smoking over time. Regular brushing cleans surface plaque, but cannot penetrate the deeper dentin layer without medical activation.',
        bodyAm: 'በጥርስ ውጫዊ ሽፋን ላይ ያሉ ጥቃቅን ክፍተቶች በጊዜ ሂደት ከቡና፣ ከሻይ፣ ከቅመማ ቅመሞች እና ከሲጋራ የሚመጡ ቀለሞችን ይመጣሉ። መደበኛ ጥርስ መፋቅ የወለሉን እድፍ ቢያጸዳም የጠለቀውን ቀለም ለማስለቀቅ የህክምና ማሽን ያስፈልጋል።',
      },
    ],
    clinicalTipEn: 'Always obtain a professional dental scaling and polish before whitening. Removing hardened tartar ensures the bleaching gel touches every millimeter of your teeth evenly.',
    clinicalTipAm: 'ጥርስዎን ከማፍካትዎ በፊት መጀመሪያ የካልኩለስ (Tartar) ማጽዳት ያድርጉ፤ ይህ የህክምናው ውጤት ወጥ እና ማራኪ እንዲሆን ያደርጋል።',
    relatedService: 'Teeth Cleaning & Laser Whitening',
  },
  {
    id: 'gum-disease-warnings',
    slug: 'preventing-gum-disease-periodontitis-warning-signs',
    titleEn: 'Silent Warning Signs of Gum Disease (Periodontitis) You Should Never Ignore',
    titleAm: 'የድድ በሽታ (Periodontitis) ድብቅ ምልክቶች እና መከላከያ መንገዶች',
    excerptEn: 'Bleeding while brushing isn’t normal. Understand the progression from gingivitis to bone loss, and how ultrasonic scaling reverses inflammation.',
    excerptAm: 'ጥርስ ሲቦረሽ ድድ መድማት የተለመደ አይደለም። ከቀላል የድድ መቆጣት እስከ አጥንት መሸርሸር የሚያደርሰውን የድድ በሽታ እንዴት መከላከል እንደሚቻል ይወቁ።',
    category: 'Prevention',
    categoryEn: 'Preventive Care',
    categoryAm: 'የመከላከያ ህክምና',
    readTimeEn: '3 min read',
    readTimeAm: '3 ደቂቃ ንባብ',
    publishedDate: 'September 2026',
    author: {
      name: 'Dr. Yonas Bekele',
      roleEn: 'General & Preventive Dental Surgeon',
      roleAm: 'አጠቃላይ የጥርስ ሐኪም',
      avatar: '/assets/images/doctor-yonas.jpg',
    },
    coverImage: '/assets/images/doctor-yonas.jpg',
    keyTakeawaysEn: [
      'Gingivitis (swollen, bleeding gums) is 100% reversible with routine professional ultrasonic cleaning.',
      'Untreated periodontitis is the number one cause of adult tooth loss worldwide.',
      'Flossing once daily cleans the 35% of tooth surfaces your toothbrush cannot physically reach.',
    ],
    keyTakeawaysAm: [
      'የድድ መቅላትና መድማት በባለሙያ በሚደረግ የጥርስ ማጽዳት 100% ሙሉ በሙሉ ይድናል።',
      'ያልታከመ የድድ በሽታ በአዋቂዎች ላይ የጥርስ መነቀል ዋነኛው ምክንያት ነው።',
      'በጥርስ ክር (Dental Floss) ማጽዳት ብሩሽ ሊደርስባቸው የማይችለውን 35% የጥርስ ክፍል ያጸዳል።',
    ],
    sections: [
      {
        headingEn: 'The Link Between Gum Health and Heart Health',
        headingAm: 'በድድ ጤና እና በልብ ጤና መካከል ያለው ትስስር',
        bodyEn: 'Clinical research confirms that oral bacteria from infected gums can enter the bloodstream, elevating cardiovascular inflammation. Maintaining healthy pink gums protects not just your smile, but your whole body.',
        bodyAm: 'የህክምና ጥናቶች እንደሚያረጋግጡት በድድ ውስጥ ያሉ ባክቴሪያዎች ወደ ደም ስር በመግባት የልብ ቧንቧዎችን ሊጎዱ ይችላሉ። ጤናማ ድድ መጠበቅ የጥርስን ብቻ ሳይሆን አጠቃላይ የሰውነት ጤናን ይጠብቃል።',
      },
    ],
    clinicalTipEn: 'Use a soft-bristled toothbrush and brush gently in small circles at a 45-degree angle toward the gumline. Hard scrubbing damages both your enamel and your delicate gums.',
    clinicalTipAm: 'ለስላሳ የጥርስ ብሩሽ (Soft Bristle) ይጠቀሙ እና በክብ እንቅስቃሴ ይቦርሹ። ጠንክሮ ማሸት ድድ እንዲሸሽና ጥርስ እንዲሸረሸር ያደርጋል።',
    relatedService: 'General Consultation & Diagnostics',
  },
  {
    id: 'wisdom-teeth-guide',
    slug: 'wisdom-teeth-extraction-indications-recovery',
    titleEn: 'Wisdom Teeth (Third Molars): When Is Extraction Truly Necessary?',
    titleAm: 'የጥበብ ጥርስ መቼ መነቀል አለበት? የህክምናው ሂደት እና ጥንቃቄዎች',
    excerptEn: 'Impacted wisdom teeth can push neighboring teeth, form painful cysts, or trap food. Here is when to remove them and tips for quick 48-hour recovery.',
    excerptAm: 'የጥበብ ጥርስ ሲወጣ ህመም የሚፈጥረው ለምንድን ነው? መቼ መነቀል እንዳለበት እና ከህክምና በኋላ ቶሎ ለማገገም የሚረዱ ጠቃሚ ምክሮች።',
    category: 'Surgery',
    categoryEn: 'Oral Surgery',
    categoryAm: 'የጥርስ ቀዶ ህክምና',
    readTimeEn: '4 min read',
    readTimeAm: '4 ደቂቃ ንባብ',
    publishedDate: 'September 2026',
    author: {
      name: 'Dr. Samuel Girma',
      roleEn: 'Oral & Maxillofacial Surgeon',
      roleAm: 'የአፍና መንጋጋ ቀዶ ህክምና ስፔሻሊስት',
      avatar: '/assets/images/doctor-samuel.jpg',
    },
    coverImage: '/assets/images/clinic-interior.jpg',
    keyTakeawaysEn: [
      'Not all wisdom teeth require removal; only those impacted, infected, or causing crowding.',
      'Panoramic digital X-rays reveal the exact position of wisdom tooth roots relative to nerves.',
      'Cold compresses for the first 24 hours dramatically minimize post-procedure swelling.',
    ],
    keyTakeawaysAm: [
      'ሁሉም የጥበብ ጥርስ መነቀል የለበትም፤ በመንጋጋ ውስጥ የተጣበቀ ወይም ሌሎች ጥርሶችን የሚገፋ ከሆነ ብቻ ነው የሚነቀለው።',
      'በፓኖራሚክ ዲጂታል ኤክስሬይ የነርቭ መስመሩን በማየት ያለምንም አደጋ በቀዶ ህክምና ይወገዳል።',
      'ከህክምናው በኋላ ባሉት 24 ሰዓታት በበረዶ መያዝ እብጠትን በእጅጉ ይቀንሳል።',
    ],
    sections: [
      {
        headingEn: 'Signs Your Wisdom Teeth Need Attention',
        headingAm: 'የጥበብ ጥርስ መነቀል እንዳለበት የሚያሳዩ ምልክቶች',
        bodyEn: 'Persistent throbbing at the back of the jaw, difficulty opening your mouth, swollen lymph nodes, or food continually trapping behind the second molar are key clinical signs for an evaluation.',
        bodyAm: 'በመንጋጋ ጥግ በኩል የሚከሰት ኃይለኛ ህመም፣ አፍን ለመክፈት መቸገር፣ እና ከኋላ በኩል ምግብ የሚጠራቀም ከሆነ የጥርስ ሐኪም ዘንድ መታየት ያስፈልጋል።',
      },
    ],
    clinicalTipEn: 'Do not use a straw or spit forcefully for 72 hours after tooth extraction. Maintaining the blood clot in the socket is vital to prevent a painful dry socket.',
    clinicalTipAm: 'ጥርስ ከተነቀለ በኋላ ለ3 ቀናት በቧንቧ (Straw) አለመጠጣት እና አክታ አምቆ አለመተፋት ደሙ ቶሎ እንዲረጋና ቦታው ያለምንም ህመም እንዲድን ይረዳል።',
    relatedService: 'Oral & Maxillofacial Surgery',
  },
  {
    id: 'kids-dental-health',
    slug: 'pediatric-dental-care-protecting-milk-teeth',
    titleEn: 'Children’s Dental Care: Why Baby Teeth Matter More Than You Think',
    titleAm: 'የልጆች የጥርስ ጤና አጠባበቅ እና ለወላጆች የሚሰጡ ጠቃሚ ምክሮች',
    excerptEn: 'Baby teeth guide permanent teeth into their rightful positions. Discover fluoride varnish benefits and how to make dental visits fun and tear-free.',
    excerptAm: 'የልጆች የወተት ጥርሶች ቋሚ ጥርሶች በትክክል እንዲወጡ መመሪያ ናቸው። የልጆችን ጥርስ ከበሰበሰ እንዴት መጠበቅ እንደሚቻል እና ለወላጆች የተሰጡ ምክሮች።',
    category: 'Pediatric',
    categoryEn: 'Pediatric Dentistry',
    categoryAm: 'የልጆች የጥርስ ህክምና',
    readTimeEn: '4 min read',
    readTimeAm: '4 ደቂቃ ንባብ',
    publishedDate: 'August 2026',
    author: {
      name: 'Dr. Yonas Bekele',
      roleEn: 'General & Pediatric Surgeon',
      roleAm: 'አጠቃላይና የልጆች የጥርስ ሐኪም',
      avatar: '/assets/images/doctor-yonas.jpg',
    },
    coverImage: '/assets/images/hero-dentist.jpg',
    keyTakeawaysEn: [
      'Losing milk teeth prematurely to cavities leads to crowded, misaligned permanent teeth.',
      'Dental sealants placed on 6-year molars prevent 80% of childhood cavities in deep grooves.',
      'Bring your child to the dentist by their first birthday for a positive, stress-free first experience.',
    ],
    keyTakeawaysAm: [
      'የወተት ጥርስ በወቅቱ ሳይደርስ በመበስበስ ከተነቀለ ቋሚ ጥርሶች ተዛብተው እንዲወጡ ያደርጋል።',
      'በልጆች መንጋጋ ጥርስ ላይ የሚደረግ የጥርስ መከላከያ ሽፋን (Dental Sealant) እስከ 80% ብስባሽን ይከላከላል።',
      'ልጅዎ ገና አንድ አመት ሲሞላው ክሊኒክ ማምጣት የጥርስ ህክምና ፍርሃትን ያስቀራል።',
    ],
    sections: [
      {
        headingEn: 'The Danger of Sugary Nighttime Bottles',
        headingAm: 'በእንቅልፍ ሰዓት የሚሰጡ ጣፋጭ መጠጦች ጉዳት',
        bodyEn: 'Allowing infants to fall asleep with a bottle containing milk, formula, or juice coats the teeth in sugar while saliva flow drops during sleep, triggering rampant baby bottle tooth decay.',
        bodyAm: 'ህጻናት በሚተኙበት ወቅት ወተት ወይም ጣፋጭ ጭማቂ የያዘ ጡጦ ይዘው እንዲተኙ ማድረግ የጥርስ ብስባሽን (Baby Bottle Decay) ያፋጥናል። ከመተኛታቸው በፊት ንጹህ ውሃ መስጠት ይመረጣል።',
      },
    ],
    clinicalTipEn: 'Teach children to brush for 2 full minutes twice a day. Playing their favorite song while brushing turns oral hygiene into a fun daily ritual.',
    clinicalTipAm: 'ልጆች በቀን 2 ጊዜ ለ2 ደቂቃ ጥርሳቸውን እንዲቦርሹ ያበረታቱ። የሚወዱትን ሙዚቃ እያጫወቱ ማለማመድ አስደሳች ያደርገዋል።',
    relatedService: 'Pediatric Dental Care',
  },
];

