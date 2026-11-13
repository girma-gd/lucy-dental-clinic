import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Phone,
  Calendar,
  ChevronDown,
  RotateCcw,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import type { Language } from '../types';

interface AiChatBotProps {
  currentLang: Language;
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  suggestions?: string[];
  actionLink?: {
    label: string;
    path?: string;
    href?: string;
    type: 'internal' | 'external';
  };
}

let counter = 1;
const getUniqueId = () => `msg-${counter++}`;

const getFormattedTime = () => {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Knowledge base response logic
const getBotResponse = (userQuery: string, isAm: boolean): Omit<ChatMessage, 'id' | 'timestamp'> => {
  const query = userQuery.toLowerCase().trim();

  // 1. Pricing / Cost queries
  if (
    query.includes('price') ||
    query.includes('cost') ||
    query.includes('fee') ||
    query.includes('etb') ||
    query.includes('birr') ||
    query.includes('ዋጋ') ||
    query.includes('ክፍያ') ||
    query.includes('ብር')
  ) {
    if (isAm) {
      return {
        sender: 'bot',
        text: 'የሉሲ የጥርስ ክሊኒክ ዋና ዋና የህክምና ክፍያዎች ግልጽና ተመጣጣኝ ናቸው:\n\n• አጠቃላይ ምርመራና 3D ኤክስሬይ: 500 – 1,000 ብር\n• የጥርስ ጽዳትና የሌዘር ማብራት: 1,500 – 4,500 ብር\n• ህመም የሌለው የጥርስ ስር ህክምና (Root Canal): 4,000 – 8,000 ብር\n• የህፃናት የጥርስ እንክብካቤ: 800 – 2,500 ብር\n• ቋሚ የጥርስ ተከላ እና ብሬስ: በምክክር እና በወርሃዊ የክፍያ እቅድ።\n\nቴሌብር (Telebirr)፣ የኢትዮጵያ ንግድ ባንክ (CBE Birr) እና የህክምና ኢንሹራንስ እንቀበላለን።',
        actionLink: {
          label: 'ሙሉ የህክምና ዝርዝር ይመልከቱ',
          path: '/services',
          type: 'internal',
        },
        suggestions: ['ቀጠሮ ማስያዝ እፈልጋለሁ', 'የቴሌብር ክፍያ እንዴት ነው?', 'የስራ ሰዓት ስንት ነው?'],
      };
    } else {
      return {
        sender: 'bot',
        text: 'Here is our transparent price guide in Ethiopian Birr (ETB):\n\n• General Check-up & Digital 3D X-Ray: 500 – 1,000 ETB\n• Ultrasonic Cleaning & Whitening: 1,500 – 4,500 ETB\n• Pain-Free Root Canal Therapy: 4,000 – 8,000 ETB\n• Pediatric Gentle Dentistry: 800 – 2,500 ETB\n• Dental Implants & Clear Braces: Consultation-based with flexible monthly installments.\n\nWe accept Telebirr, CBE Birr, Awash Bank, Cash, and major private health insurances.',
        actionLink: {
          label: 'View All Services & Pricing',
          path: '/services',
          type: 'internal',
        },
        suggestions: ['Book an appointment now', 'Which doctors are available?', 'Accepted payment methods'],
      };
    }
  }

  // 2. Emergency / Toothache / Pain queries
  if (
    query.includes('pain') ||
    query.includes('ache') ||
    query.includes('emergency') ||
    query.includes('hurt') ||
    query.includes('bleeding') ||
    query.includes('broken') ||
    query.includes('ህመም') ||
    query.includes('ያማል') ||
    query.includes('ድንገተኛ') ||
    query.includes('ተሰበረ') ||
    query.includes('ደመቀ')
  ) {
    if (isAm) {
      return {
        sender: 'bot',
        text: '⚠️ አፋጣኝ የድንገተኛ የጥርስ ህክምና ምክር:\n\n1. ከፍተኛ የጥርስ ህመም ወይም ደም መፍሰስ ካለዎት አሁኑኑ በድንገተኛ የስልክ መስመራችን +251 911 234 567 ይደውሉ።\n2. ጥርስ በድንገተኛ አደጋ ከወለቀ፣ ስሩን ሳይነኩ በቀዝቃዛ ወተት ወይም ምራቅ ውስጥ በማድረግ በ60 ደቂቃ ውስጥ ወደ ክሊኒካችን ይምጡ።\n3. በሉሲ ክሊኒክ ህመም የሌለው የማደንዘዣ ቅባት እና ዘመናዊ ቴክኖሎጂ ስለምንጠቀም ምንም አይነት ህመም አይሰማዎትም።',
        actionLink: {
          label: 'ድንገተኛ መስመር ይደውሉ (+251 911 234 567)',
          href: 'tel:+251911234567',
          type: 'external',
        },
        suggestions: ['የክሊኒኩ አድራሻ በቦሌ የት ነው?', 'ቀጠሮ ማስያዝ እፈልጋለሁ'],
      };
    } else {
      return {
        sender: 'bot',
        text: '⚠️ Urgent Dental Triage & Pain Relief:\n\n1. For severe throbbing pain, infection, or facial swelling, please call our 24/7 emergency hotline at +251 911 234 567 immediately.\n2. If a tooth was knocked out in an accident, place it in cold milk or saliva (do not touch the root) and arrive at our clinic within 60 minutes for re-implantation.\n3. All our restorative treatments use topical pre-numbing gels and computerized local anesthesia for 100% pain-free care.',
        actionLink: {
          label: 'Call Emergency Hotline (+251 911 234 567)',
          href: 'tel:+251911234567',
          type: 'external',
        },
        suggestions: ['Book urgent appointment', 'Where is your clinic?', 'Chat on WhatsApp'],
      };
    }
  }

  // 3. Appointment / Booking queries
  if (
    query.includes('book') ||
    query.includes('appointment') ||
    query.includes('schedule') ||
    query.includes('visit') ||
    query.includes('ቀጠሮ') ||
    query.includes('ማስያዝ') ||
    query.includes('መመዝገብ')
  ) {
    if (isAm) {
      return {
        sender: 'bot',
        text: 'በድረ-ገጻችን በደቂቃዎች ውስጥ በቀላሉ ቀጠሮ ማስያዝ ይችላሉ! አገልግሎቱን፣ የሚመርጡትን ቀንና ሰዓት በመምረጥ ሲልኩ የክሊኒካችን አስተናጋጆች በ15–30 ደቂቃ ውስጥ በስልክ ደውለው ያረጋግጡልዎታል።',
        actionLink: {
          label: 'ቀጠሮዎን አሁኑኑ ያስይዙ →',
          path: '/booking',
          type: 'internal',
        },
        suggestions: ['የህክምና ዋጋ ስንት ነው?', 'ስፔሻሊስት ሐኪሞቻችሁ እነማን ናቸው?'],
      };
    } else {
      return {
        sender: 'bot',
        text: 'Booking an appointment online takes less than a minute! Choose your preferred treatment, date, and shift. Our front desk reception team will review availability and call your Ethiopian mobile number within 15–30 minutes to confirm your chair time.',
        actionLink: {
          label: 'Schedule Appointment Now →',
          path: '/booking',
          type: 'internal',
        },
        suggestions: ['View Treatment Prices', 'Meet the Specialists', 'Clinic Location & Hours'],
      };
    }
  }

  // 4. Location / Map / Directions queries
  if (
    query.includes('location') ||
    query.includes('where') ||
    query.includes('address') ||
    query.includes('map') ||
    query.includes('bole') ||
    query.includes('edna') ||
    query.includes('አድራሻ') ||
    query.includes('የት') ||
    query.includes('ቦሌ') ||
    query.includes('ኤድና') ||
    query.includes('ካርታ')
  ) {
    if (isAm) {
      return {
        sender: 'bot',
        text: '📍 የሉሲ የጥርስ ስፔሻሊቲ ክሊኒክ አድራሻ:\n\n• አዲስ አበባ፣ ቦሌ ክፍለ ከተማ\n• ከኤድና ሞል እና ከቦሌ መድኃኔዓለም 150 ሜትር ጀርባ\n• ሌክስ ፕላዛ (Lex Plaza) 3ኛ ፎቅ\n• ምቹ ሊፍት እና አስተማማኝ የመኪና ማቆሚያ አለው።',
        actionLink: {
          label: 'አድራሻና ካርታውን ይመልከቱ',
          path: '/contact',
          type: 'internal',
        },
        suggestions: ['የስራ ሰዓት ስንት ነው?', 'ቀጠሮ ማስያዝ እፈልጋለሁ', 'ስልክ ቁጥራችሁ ስንት ነው?'],
      };
    } else {
      return {
        sender: 'bot',
        text: '📍 Lucy Dental Clinic Location:\n\n• Bole Sub-City, Addis Ababa, Ethiopia\n• Behind Edna Mall & Bole Medhanialem Cathedral (approx. 150m, next to Ramada Hotel)\n• Lex Plaza Building, 3rd Floor\n• Equipped with dependable elevator access and secure basement parking.',
        actionLink: {
          label: 'Open Interactive Google Map',
          path: '/contact',
          type: 'internal',
        },
        suggestions: ['What are your opening hours?', 'Request an Appointment', 'Treatment prices'],
      };
    }
  }

  // 5. Working Hours queries
  if (
    query.includes('hour') ||
    query.includes('time') ||
    query.includes('open') ||
    query.includes('close') ||
    query.includes('sunday') ||
    query.includes('ሰዓት') ||
    query.includes('መቼ') ||
    query.includes('እሑድ') ||
    query.includes('ክፍት')
  ) {
    if (isAm) {
      return {
        sender: 'bot',
        text: '⏰ የክሊኒካችን የስራ ሰዓት:\n\n• ከሰኞ እስከ ቅዳሜ: 2:30 ጥዋት – 1:00 ማታ\n• እሑድ: 3:00 ጥዋት – 7:00 ከሰዓት\n• ድንገተኛ የጥርስ ህመም ካለዎት በማንኛውም ሰዓት በስልክ ቁጥር +251 911 234 567 መደወል ይችላሉ።',
        suggestions: ['ቀጠሮ ማስያዝ እፈልጋለሁ', 'የህክምና ዋጋ ስንት ነው?', 'የክሊኒኩ አድራሻ የት ነው?'],
      };
    } else {
      return {
        sender: 'bot',
        text: '⏰ Working Hours:\n\n• Monday – Saturday: 8:30 AM – 7:00 PM\n• Sunday: 9:00 AM – 1:00 PM\n• 24/7 Acute Dental Emergency on-call triage at +251 911 234 567.',
        suggestions: ['Book an appointment', 'Where is the clinic?', 'Treatment pricing'],
      };
    }
  }

  // 6. Doctors / Dentists / Specialists queries
  if (
    query.includes('doctor') ||
    query.includes('dentist') ||
    query.includes('staff') ||
    query.includes('specialist') ||
    query.includes('selam') ||
    query.includes('samuel') ||
    query.includes('yonas') ||
    query.includes('ሐኪም') ||
    query.includes('ዶክተር') ||
    query.includes('ባለሙያ') ||
    query.includes('ሰላም') ||
    query.includes('ሳሙኤል') ||
    query.includes('ዮናስ')
  ) {
    if (isAm) {
      return {
        sender: 'bot',
        text: '👨‍⚕️ የሉሲ የጥርስ ክሊኒክ ስፔሻሊስት ሐኪሞች:\n\n1. ዶ/ር ሰላማዊት ታደሰ - ዋና የጥርስ ስፔሻሊስት፣ የውበትና የጥርስ ስር ህክምና (11+ ዓመታት ልምድ)\n2. ዶ/ር ሳሙኤል ተስፋዬ - የጥርስና አፍ ውስጥ ቀዶ ህክምና፣ ቋሚ የጥርስ ተከላ ስፔሻሊስት (14+ ዓመታት ልምድ)\n3. ዶ/ር ዮናስ አለሙ - የህፃናት የጥርስ ህክምና እና የጥርስ ማስተካከያ/Braces (8+ ዓመታት ልምድ)\n\nሁሉም ሐኪሞቻችን የኢትዮጵያ የጥርስ ሐኪሞች ማህበር አባላት ናቸው።',
        actionLink: {
          label: 'የሐኪሞቻችንን ሙሉ መረጃ ይመልከቱ',
          path: '/team',
          type: 'internal',
        },
        suggestions: ['ከዶክተር ጋር ቀጠሮ ማስያዝ', 'የህክምና ዋጋ ስንት ነው?'],
      };
    } else {
      return {
        sender: 'bot',
        text: '👨‍⚕️ Meet Our Certified Specialists:\n\n1. Dr. Selamawit Tadesse — Lead Restorative Specialist & Aesthetic Surgeon (BDS, MSc Restorative, 11+ Years)\n2. Dr. Samuel Tesfaye — Oral & Maxillofacial Surgeon, Implantologist (DDS, 14+ Years)\n3. Dr. Yonas Alemu — Pediatric Dentist & Orthodontic Specialist (8+ Years)\n\nAll our clinicians are certified members of the Ethiopian Dental Association.',
        actionLink: {
          label: 'Meet Our Specialist Team',
          path: '/team',
          type: 'internal',
        },
        suggestions: ['Request appointment with a doctor', 'Treatment prices in ETB'],
      };
    }
  }

  // 7. Hygiene / Sterilization / Safety queries
  if (
    query.includes('clean') ||
    query.includes('sterile') ||
    query.includes('safety') ||
    query.includes('autoclave') ||
    query.includes('safe') ||
    query.includes('hygiene') ||
    query.includes('ንጽህና') ||
    query.includes('ማምከኛ') ||
    query.includes('ደህንነት')
  ) {
    if (isAm) {
      return {
        sender: 'bot',
        text: '🛡️ የሉሲ ክሊኒክ 100% የአውሮፓ ደረጃ ማምከኛ:\n\n• እያንዳንዱ የህክምና እቃ በClass-B Vacuum Autoclave ማምከኛ ውስጥ ያልፋል።\n• ነጠላ መጠቀሚያ መከላከያዎችን (disposable barriers) እንጠቀማለን።\n• የዲጂታል 3D ኤክስሬይ መሳሪያዎቻችን የጨረር መጠኑን በ80% ይቀንሳሉ።\n• የታካሚዎቻችን ጤንነትና ደህንነት ቀዳሚ ተግባራችን ነው።',
        suggestions: ['ቀጠሮ ማስያዝ እፈልጋለሁ', 'የህክምና ዋጋ ስንት ነው?'],
      };
    } else {
      return {
        sender: 'bot',
        text: '🛡️ Hospital-Grade Infection Control:\n\n• 100% Class-B Vacuum Autoclave sterilization for every single instrument kit.\n• Single-use surgical barrier protections.\n• Advanced low-dose digital 3D sensors reducing radiation exposure by up to 80%.\n• Verified by Ethiopian Ministry of Health standards.',
        suggestions: ['Book consultation', 'View all services'],
      };
    }
  }

  // 8. Before & After / Transformations / Gallery queries
  if (
    query.includes('before') ||
    query.includes('after') ||
    query.includes('gallery') ||
    query.includes('result') ||
    query.includes('transformation') ||
    query.includes('veneer') ||
    query.includes('whitening') ||
    query.includes('ለውጥ') ||
    query.includes('ውጤት') ||
    query.includes('ማሳያ') ||
    query.includes('ፎቶ')
  ) {
    if (isAm) {
      return {
        sender: 'bot',
        text: '✨ በእውነተኛ ታካሚዎቻችን የተመዘገቡ የፈገግታ ለውጦች ማሳያ አለን!\n\n• የሌዘር ጥርስ ማብራት (በ1 ቀጠሮ 8 ደረጃ የነጣ)\n• የጀርመን ሸክላ ቬኒር (የጥርስ ክፍተትና ስብራት ማስተካከል)\n• የማይታይ ግልጽ ብሬስ (ጥርስ ሳይነቀል የተስተካከለ)\n• ቋሚ የቲታኒየም ጥርስ ተከላ (የዕድሜ ልክ ዋስትና)\n\nተንሸራታቹን በማንቀሳቀስ ከህክምና በፊትና በኋላ የነበረውን ልዩነት በዝርዝር መመልከት ይችላሉ።',
        actionLink: {
          label: 'የፈገግታ ለውጦችን በይነ-ተግባራዊ ማሳያ ይመልከቱ →',
          path: '/gallery',
          type: 'internal',
        },
        suggestions: ['ቀጠሮ ማስያዝ እፈልጋለሁ', 'የህክምና ዋጋ ስንት ነው?', 'የክሊኒኩ አድራሻ የት ነው?'],
      };
    } else {
      return {
        sender: 'bot',
        text: '✨ Check out our Interactive Smile Gallery!\n\n• In-Office Laser Whitening (8 shades lighter in 1 visit)\n• German Lithium Disilicate Veneers (gap & chip correction)\n• Clear Invisible Aligners (straight smile without extractions)\n• Titanium Dental Implants (permanent, bio-mimetic teeth)\n\nYou can drag our interactive split-screen slider to inspect real before-and-after results!',
        actionLink: {
          label: 'View Interactive Smile Gallery →',
          path: '/gallery',
          type: 'internal',
        },
        suggestions: ['Book Consultation for a Smile Makeover', 'Treatment Prices in ETB', 'Meet the Cosmetic Dentists'],
      };
    }
  }

  // Default Fallback
  if (isAm) {
    return {
      sender: 'bot',
      text: 'ጥያቄዎ ገብቶኛል! ስለ ጥርስ ህክምና፣ ዋጋ፣ ቀጠሮ ወይም አድራሻችን ተጨማሪ ማብራሪያ ይፈልጋሉ? ወይም በዋትስአፕና በስልክ በቀጥታ ከክሊኒካችን አስተናጋጆች ጋር መነጋገር ይችላሉ።',
      actionLink: {
        label: 'በዋትስአፕ (WhatsApp) ያናግሩን',
        href: 'https://wa.me/251911234567?text=Hello%20Lucy%20Dental',
        type: 'external',
      },
      suggestions: [
        'የህክምና ዋጋ ስንት ነው?',
        'ቀጠሮ ማስያዝ እፈልጋለሁ',
        'የክሊኒኩ አድራሻ የት ነው?',
      ],
    };
  } else {
    return {
      sender: 'bot',
      text: 'Thank you for your question! I can provide detailed guidance on dental treatments, pricing in Birr, appointment reservations, or emergency care. You can also connect directly with our front desk.',
      actionLink: {
        label: 'Chat Directly on WhatsApp',
        href: 'https://wa.me/251911234567?text=Hello%20Lucy%20Dental',
        type: 'external',
      },
      suggestions: [
        'What are your treatment prices?',
        'Book an appointment',
        'Where is the clinic located in Bole?',
      ],
    };
  }
};

const createWelcomeMessage = (isAm: boolean): ChatMessage => ({
  id: 'welcome-msg',
  sender: 'bot',
  text: isAm
    ? 'ጤና ይስጥልኝ! እኔ የሉሲ የጥርስ ክሊኒክ AI ረዳት ነኝ። ስለ አገልግሎቶቻችን፣ የዋጋ ዝርዝር፣ ቀጠሮ ማስያዝ ወይም የጥርስ ጤንነት ጥያቄ ካለዎት በደስታ እመልሳለሁ።'
    : 'Hello! I am Lucy Dental’s AI Clinical Assistant. How can I help you today with treatments, pricing in ETB, appointment bookings, or emergency care?',
  timestamp: getFormattedTime(),
  suggestions: isAm
    ? [
        'የህክምና ዋጋ ዝርዝር ስንት ነው?',
        'ድንገተኛ የጥርስ ህመም አለብኝ',
        'ቀጠሮ እንዴት ማስያዝ እችላለሁ?',
        'የክሊኒኩ አድራሻ የት ነው?',
      ]
    : [
        'What are your treatment prices?',
        'I have acute tooth pain!',
        'How do I book an appointment?',
        'Where is the clinic located in Bole?',
      ],
});

export const AiChatBot: React.FC<AiChatBotProps> = ({ currentLang }) => {
  const navigate = useNavigate();
  const isAm = currentLang === 'am';

  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createWelcomeMessage(isAm)]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: getUniqueId(),
      sender: 'user',
      text: text.trim(),
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and realistic typing delay
    setTimeout(() => {
      const responseData = getBotResponse(text, isAm);
      const botReply: ChatMessage = {
        ...responseData,
        id: getUniqueId(),
        timestamp: getFormattedTime(),
      };
      setMessages((prev) => [...prev, botReply]);
      setIsTyping(false);
    }, 650);
  };

  const handleResetChat = () => {
    setMessages([createWelcomeMessage(isAm)]);
  };

  return (
    <>
      {/* Floating Chat Launcher Button (Bottom Right) */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
        {/* Tooltip prompt when closed */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1 }}
            className="mb-2.5 hidden sm:flex items-center gap-2 bg-slate-950/90 text-white text-xs font-semibold py-2 px-3.5 rounded-2xl shadow-xl border border-teal-500/30 backdrop-blur-md cursor-pointer hover:bg-slate-900"
            onClick={() => setIsOpen(true)}
          >
            <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>{isAm ? 'ጥያቄ አለዎት? የሉሲ AI ረዳትን ይጠይቁ' : 'Have a question? Ask Lucy Dental AI'}</span>
          </motion.div>
        )}

        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-13 h-13 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-teal-700 via-teal-600 to-cyan-500 text-white shadow-2xl shadow-teal-600/40 flex items-center justify-center border-2 border-white/80 cursor-pointer"
          aria-label="Toggle AI Assistant"
        >
          {/* Animated pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-teal-400 opacity-40 animate-ping pointer-events-none" />

          {isOpen ? (
            <X className="w-5 h-5 sm:w-7 sm:h-7" />
          ) : (
            <div className="relative">
              <Bot className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-emerald-400 border-2 border-slate-950 rounded-full" />
            </div>
          )}
        </motion.button>
      </div>

      {/* Chat Window Panel - Compact & non-intrusive on both Mobile & Desktop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="fixed bottom-18 sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-[330px] sm:w-[340px] h-[430px] sm:h-[480px] max-h-[65vh] sm:max-h-[68vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col backdrop-blur-md"
          >
            {/* Header - Compact */}
            <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-teal-900 text-white p-3 sm:p-3.5 flex items-center justify-between border-b border-teal-800/40">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 shadow-md">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-extrabold text-xs sm:text-sm leading-tight">
                      {isAm ? 'ሉሲ የጥርስ AI' : 'Lucy Dental AI'}
                    </h3>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30">
                      24/7
                    </span>
                  </div>
                  <p className="text-[10px] text-teal-200/80 font-medium">
                    {isAm ? 'የክሊኒኩ ረዳት' : 'Clinical Advisor • Bole'}
                  </p>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title={isAm ? 'ውይይት አድስ' : 'Reset Conversation'}
                  className="p-1 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Emergency Hotline Bar inside chat - Slim */}
            <div className="bg-rose-50 px-3 py-1.5 border-b border-rose-100 flex items-center justify-between text-[11px] text-rose-800">
              <span className="flex items-center gap-1 font-semibold truncate">
                <AlertCircle className="w-3 h-3 text-rose-600 shrink-0" />
                <span className="truncate">{isAm ? 'አፋጣኝ ድንገተኛ:' : 'Emergency:'}</span>
              </span>
              <a
                href="tel:+251911234567"
                className="font-bold text-rose-700 hover:underline flex items-center gap-1 shrink-0 ml-1"
              >
                <Phone className="w-2.5 h-2.5" />
                <span>+251 911 234 567</span>
              </a>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-slate-50/70">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`flex gap-2 max-w-[88%] ${
                      msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-2xs ${
                        msg.sender === 'user'
                          ? 'bg-teal-600 text-white'
                          : 'bg-slate-900 text-teal-300'
                      }`}
                    >
                      {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`p-2.5 sm:p-3 rounded-2xl text-[11px] sm:text-xs leading-relaxed whitespace-pre-line shadow-2xs ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-teal-700 to-teal-600 text-white rounded-tr-xs'
                          : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                      }`}
                    >
                      {msg.text}

                      {/* Optional Action Button inside bot response */}
                      {msg.actionLink && (
                        <div className="mt-2.5 pt-2 border-t border-slate-100">
                          {msg.actionLink.type === 'internal' && msg.actionLink.path ? (
                            <button
                              type="button"
                              onClick={() => {
                                setIsOpen(false);
                                navigate(msg.actionLink!.path!);
                              }}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-teal-700 hover:bg-teal-800 shadow-2xs transition-colors cursor-pointer"
                            >
                              <Calendar className="w-3 h-3" />
                              <span>{msg.actionLink.label}</span>
                            </button>
                          ) : (
                            <a
                              href={msg.actionLink.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-2xs transition-colors"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>{msg.actionLink.label}</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[9px] text-slate-400 mt-0.5 px-8">
                    {msg.timestamp}
                  </span>

                  {/* Quick Suggested Follow-up Chips */}
                  {msg.suggestions && (
                    <div className="flex flex-wrap gap-1 mt-1.5 pl-8 max-w-[95%]">
                      {msg.suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSendMessage(suggestion)}
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-white hover:bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs hover:border-teal-300 transition-all cursor-pointer text-left"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-center gap-2 text-slate-500 pl-1">
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-teal-300 flex items-center justify-center">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="bg-white px-3 py-2 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer - Compact */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-2 sm:p-2.5 bg-white border-t border-slate-200 flex items-center gap-1.5"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={isAm ? 'ጥያቄዎን ይጻፉ...' : 'Ask about treatments, pricing...'}
                className="flex-1 px-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-full focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-teal-700 hover:bg-teal-800 disabled:opacity-40 disabled:hover:bg-teal-700 text-white flex items-center justify-center transition-all shadow-xs shrink-0 cursor-pointer"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
