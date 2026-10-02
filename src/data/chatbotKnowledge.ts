import { NFYVE_CONTACT, SERVICE_PILLARS, FAQ_ITEMS } from './nfyveData';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actionButtons?: Array<{
    label: string;
    type: 'phone' | 'email' | 'booking' | 'link';
    value?: string;
  }>;
}

export interface SuggestedQuestion {
  id: string;
  text: string;
}

export const INITIAL_SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { id: 'q1', text: 'I have a question' },
  { id: 'q2', text: 'Tell me about your services' },
  { id: 'q3', text: 'How do I book an appointment?' },
  { id: 'q4', text: 'Where are you located?' },
  { id: 'q5', text: 'What are your opening hours?' },
];

/**
 * Intelligent FAQ Matcher for NFYVE Support Concierge
 * Searches exact and fuzzy keywords against services, location, hours, pricing philosophy,
 * and contact details from the verified sanctuary dataset.
 */
export function getBotResponse(userQuery: string, onBookClick?: () => void): {
  text: string;
  actionButtons?: ChatMessage['actionButtons'];
  followUpQuestions?: SuggestedQuestion[];
} {
  const query = userQuery.toLowerCase().trim();

  // 1. GREETING & GENERAL INQUIRY
  if (
    query === 'hi' ||
    query === 'hello' ||
    query === 'hey' ||
    query === 'good morning' ||
    query === 'good afternoon' ||
    query === 'good evening' ||
    query.includes('i have a question')
  ) {
    return {
      text: `Hello! I am your NFYVE Concierge assistant. I can help you explore our 5 transformation pillars (Aesthetics, Slimming, Fitness, Salon & Nutri Food), check opening hours, sanctuary location in Begumpet, or assist you with booking an appointment. What would you like to know?`,
      followUpQuestions: [
        { id: 'f-services', text: 'Tell me about your services' },
        { id: 'f-booking', text: 'How do I book an appointment?' },
        { id: 'f-location', text: 'Where are you located?' },
      ],
    };
  }

  // 2. LOCATION / ADDRESS / DIRECTIONS
  if (
    query.includes('where') ||
    query.includes('location') ||
    query.includes('address') ||
    query.includes('how to reach') ||
    query.includes('directions') ||
    query.includes('begumpet') ||
    query.includes('kura towers')
  ) {
    return {
      text: `NFYVE – The Change is located at:\n\n📍 ${NFYVE_CONTACT.address}\n\nWe are situated right beside the Old Begumpet Airport with dedicated valet parking and private elevator access to the 4th Floor.`,
      actionButtons: [
        {
          label: 'Call for Directions',
          type: 'phone',
          value: NFYVE_CONTACT.phone,
        },
        {
          label: 'Book Consultation',
          type: 'booking',
        },
      ],
      followUpQuestions: [
        { id: 'f-hours', text: 'What are your opening hours?' },
        { id: 'f-phone', text: 'What is your phone number?' },
      ],
    };
  }

  // 3. OPENING HOURS / TIMINGS
  if (
    query.includes('hour') ||
    query.includes('timing') ||
    query.includes('time') ||
    query.includes('open') ||
    query.includes('close') ||
    query.includes('sunday')
  ) {
    return {
      text: `Our sanctuary operates 7 days a week:\n\n🕒 ${NFYVE_CONTACT.hours}\n\nAll 5 wings (Aesthetics, Slimming Clinic, Gym, Salon, and Nutri Bar) are open throughout these hours. Appointments are recommended for clinical treatments.`,
      actionButtons: [
        {
          label: 'Book an Appointment',
          type: 'booking',
        },
        {
          label: 'Call Concierge',
          type: 'phone',
          value: NFYVE_CONTACT.phone,
        },
      ],
    };
  }

  // 4. BOOKING / APPOINTMENT / CONSULTATION
  if (
    query.includes('book') ||
    query.includes('appointment') ||
    query.includes('schedule') ||
    query.includes('consult') ||
    query.includes('reserve')
  ) {
    return {
      text: `Booking an appointment at NFYVE is quick and easy:\n\n1. Use our online booking form right below on this page to select your preferred date, time slot, and treatment wing.\n2. Call our direct concierge at ${NFYVE_CONTACT.phoneDisplay}.\n3. Every new guest receives a complimentary comprehensive skin analysis, body composition scan, and expert consultation.\n\nWould you like to reserve your appointment now?`,
      actionButtons: [
        {
          label: 'Open Booking Form',
          type: 'booking',
        },
        {
          label: `Call ${NFYVE_CONTACT.phoneDisplay}`,
          type: 'phone',
          value: NFYVE_CONTACT.phone,
        },
      ],
      followUpQuestions: [
        { id: 'f-services', text: 'Tell me about your services' },
        { id: 'f-hours', text: 'What are your opening hours?' },
      ],
    };
  }

  // 5. SERVICES OVERVIEW
  if (
    query.includes('services') ||
    query.includes('tell me about your services') ||
    query.includes('what do you do') ||
    query.includes('pillars') ||
    query.includes('offerings')
  ) {
    return {
      text: `NFYVE unites 5 core transformation pillars under one luxurious architectural roof in Begumpet:\n\n1. 🌟 Skin & Clinical Aesthetics (HydraFacial, Carbon Laser, PRP, Pico Laser)\n2. ⚖️ Slimming & Weight Loss Clinic (Cryolipolysis 360° fat freeze, Lipolysis, Slim-Zone)\n3. 💇 Salon & Hair Lounge (Balayage, Nanoplastia, Keratin, Bespoke Nail Bar)\n4. 🏋️ Gym & Fitness Center (MaxFit equipment, 1-on-1 ACE certified trainers)\n5. 🥗 Nutri Food Cafe & Bar (Macro-balanced chef bowls, botanical detox elixirs)\n\nWhich wing would you like details about?`,
      followUpQuestions: [
        { id: 'f-skin', text: 'Tell me about Skin & Aesthetics' },
        { id: 'f-slimming', text: 'Tell me about Weight Loss' },
        { id: 'f-salon', text: 'Tell me about Salon & Hair' },
        { id: 'f-gym', text: 'Tell me about the Gym' },
      ],
    };
  }

  // 6. SKIN / AESTHETICS / DERMATOLOGY / FACIALS
  if (
    query.includes('skin') ||
    query.includes('aesthetic') ||
    query.includes('dermatolog') ||
    query.includes('facial') ||
    query.includes('hydrafacial') ||
    query.includes('laser') ||
    query.includes('prp') ||
    query.includes('carbon') ||
    query.includes('pico') ||
    query.includes('acne') ||
    query.includes('pigment') ||
    query.includes('glow')
  ) {
    const skinWing = SERVICE_PILLARS.find((p) => p.id === 'skin');
    return {
      text: `Our Skin & Clinical Aesthetics wing is doctor-supervised and features FDA-cleared technologies:\n\n• Medical-Grade HydraFacial Deep Extraction\n• Carbon Laser Peel (O3 Porcelain Facial)\n• PRP & GFC Hair Loss Follicle Therapy\n• Pico Laser for pigmentation & tattoo clearance\n• MNRF & Micro-Needling Skin Tightening\n• Chemical Peels & Glutathione Infusions\n\nAll treatments take place in private acoustic-buffered clinical suites with zero social downtime.`,
      actionButtons: [
        {
          label: 'Book Skin Consultation',
          type: 'booking',
        },
        {
          label: 'Call Clinical Team',
          type: 'phone',
          value: NFYVE_CONTACT.phone,
        },
      ],
      followUpQuestions: [
        { id: 'f-slimming', text: 'Tell me about Weight Loss' },
        { id: 'f-booking', text: 'How do I book an appointment?' },
      ],
    };
  }

  // 7. SLIMMING / WEIGHT LOSS / FAT LOSS / CRYOLIPOLYSIS
  if (
    query.includes('weight') ||
    query.includes('loss') ||
    query.includes('slim') ||
    query.includes('fat') ||
    query.includes('cryo') ||
    query.includes('inch') ||
    query.includes('contour') ||
    query.includes('belly')
  ) {
    return {
      text: `Our Slimming & Weight Loss Clinic delivers 100% non-invasive, medically guided body contouring:\n\n• Cryolipolysis (Controlled 360° Fat Freezing)\n• Targeted Ultrasound Cavitation Lipolysis\n• Slim-Zone Thermal Inch Loss Therapy\n• Lymphatic Drainage & Cellulite Smoothing\n• Visceral Fat Analysis & InBody Metabolic Scans\n\nClients routinely achieve measurable inch reduction in 4–6 weeks without surgery, downtime, or crash dieting.`,
      actionButtons: [
        {
          label: 'Book Slimming Consultation',
          type: 'booking',
        },
        {
          label: 'Call Slimming Clinic',
          type: 'phone',
          value: NFYVE_CONTACT.phone,
        },
      ],
      followUpQuestions: [
        { id: 'f-gym', text: 'Tell me about the Gym' },
        { id: 'f-nutrition', text: 'Tell me about Nutri Food' },
      ],
    };
  }

  // 8. SALON / HAIR / NAILS
  if (
    query.includes('salon') ||
    query.includes('hair') ||
    query.includes('nail') ||
    query.includes('color') ||
    query.includes('balayage') ||
    query.includes('nanoplastia') ||
    query.includes('keratin') ||
    query.includes('botox') ||
    query.includes('pedicure') ||
    query.includes('manicure')
  ) {
    return {
      text: `Our Haute Salon & Hair Lounge offers world-class styling artistry:\n\n• Precision Balayage, Ombré & Creative Hair Color\n• Nanoplastia & Hair Botox Smoothing\n• Advanced Keratin Restructuring Treatments\n• Haute Nail Bar (Gel/Acrylic extensions, chrome, French, & bespoke nail art)\n• Scalp Detox & Micro-Exfoliation Lounge\n\nDesigned with sunlit private styling pods for utmost privacy and luxury.`,
      actionButtons: [
        {
          label: 'Book Salon Service',
          type: 'booking',
        },
        {
          label: 'Call Salon Concierge',
          type: 'phone',
          value: NFYVE_CONTACT.phone,
        },
      ],
      followUpQuestions: [
        { id: 'f-skin', text: 'Tell me about Skin & Aesthetics' },
        { id: 'f-booking', text: 'How do I book an appointment?' },
      ],
    };
  }

  // 9. GYM / FITNESS / TRAINERS
  if (
    query.includes('gym') ||
    query.includes('fitness') ||
    query.includes('trainer') ||
    query.includes('workout') ||
    query.includes('exercise') ||
    query.includes('muscle') ||
    query.includes('cardio')
  ) {
    return {
      text: `NFYVE Gym & Fitness Center is an executive performance haven:\n\n• Biomechanically superior MaxFit ergonomic cardio line\n• Functional power rigs & Olympic free weights\n• 1-on-1 ACE certified personal strength & conditioning trainers\n• Postural alignment & core restoration protocols\n• High-intensity athletic conditioning tracks\n\nPersonalized training programs are synchronized with your nutrition and slimming goals.`,
      actionButtons: [
        {
          label: 'Book Gym Assessment',
          type: 'booking',
        },
        {
          label: 'Call Fitness Wing',
          type: 'phone',
          value: NFYVE_CONTACT.phone,
        },
      ],
      followUpQuestions: [
        { id: 'f-nutrition', text: 'Tell me about Nutri Food' },
        { id: 'f-slimming', text: 'Tell me about Weight Loss' },
      ],
    };
  }

  // 10. NUTRI FOOD / DIET / MEALS / CAFE
  if (
    query.includes('food') ||
    query.includes('nutri') ||
    query.includes('diet') ||
    query.includes('cafe') ||
    query.includes('meal') ||
    query.includes('eat') ||
    query.includes('nutrition') ||
    query.includes('juice')
  ) {
    return {
      text: `NFYVE Nutri Food Cafe & Bar is our in-house culinary nutrition kitchen:\n\n• Chef-crafted, macro-balanced nutrient-dense bowls\n• Cold-pressed botanical detox elixirs\n• High-protein salads & wholesome post-workout fuel\n• Metabolic acceleration herbal infusions\n• Customized daily meal plan subscriptions formulated with clinical dietitians\n\nFuel your body with gourmet dishes tailored to your specific metabolic rate.`,
      actionButtons: [
        {
          label: 'Schedule Nutrition Audit',
          type: 'booking',
        },
        {
          label: 'Call Nutri Cafe',
          type: 'phone',
          value: NFYVE_CONTACT.phone,
        },
      ],
      followUpQuestions: [
        { id: 'f-services', text: 'Tell me about your services' },
        { id: 'f-booking', text: 'How do I book an appointment?' },
      ],
    };
  }

  // 11. CONTACT / PHONE / EMAIL
  if (
    query.includes('contact') ||
    query.includes('phone') ||
    query.includes('call') ||
    query.includes('email') ||
    query.includes('number') ||
    query.includes('talk')
  ) {
    return {
      text: `You can reach our Begumpet concierge team directly:\n\n📞 Phone: ${NFYVE_CONTACT.phoneDisplay}\n✉️ Email: ${NFYVE_CONTACT.email}\n📍 Address: ${NFYVE_CONTACT.address}\n🕒 Hours: ${NFYVE_CONTACT.hours}`,
      actionButtons: [
        {
          label: `Call ${NFYVE_CONTACT.phoneDisplay}`,
          type: 'phone',
          value: NFYVE_CONTACT.phone,
        },
        {
          label: 'Email Support',
          type: 'email',
          value: NFYVE_CONTACT.email,
        },
        {
          label: 'Book Online',
          type: 'booking',
        },
      ],
    };
  }

  // 12. PRICE / COST / PACKAGES
  if (
    query.includes('price') ||
    query.includes('cost') ||
    query.includes('fee') ||
    query.includes('package') ||
    query.includes('rate') ||
    query.includes('charge')
  ) {
    return {
      text: `Because every transformation journey at NFYVE is bespoke, investment packages are tailored based on your comprehensive initial assessment (skin type, body composition scan, and target goals).\n\nWe offer single wing treatments as well as integrated 5-pillar transformation memberships. We invite you to schedule a free initial consultation and tour on the 4th Floor, Begumpet.`,
      actionButtons: [
        {
          label: 'Schedule Free Consultation',
          type: 'booking',
        },
        {
          label: `Call ${NFYVE_CONTACT.phoneDisplay}`,
          type: 'phone',
          value: NFYVE_CONTACT.phone,
        },
      ],
      followUpQuestions: [
        { id: 'f-booking', text: 'How do I book an appointment?' },
        { id: 'f-location', text: 'Where are you located?' },
      ],
    };
  }

  // 13. COMBINED 5-PILLAR MEMBERSHIP
  if (
    query.includes('combine') ||
    query.includes('all in one') ||
    query.includes('membership')
  ) {
    return {
      text: `Yes! NFYVE is designed so you never have to rush between a clinic, a salon, and a gym. You can combine clinical aesthetics, non-invasive fat loss, personal fitness training, salon styling, and Nutri Food meal subscriptions into one synchronized transformation membership with your dedicated wellness concierge.`,
      actionButtons: [
        {
          label: 'Consult with Concierge',
          type: 'booking',
        },
      ],
    };
  }

  // 14. DEFAULT FALLBACK
  return {
    text: `I'm sorry, I couldn't find a reliable answer to that. Please contact our team directly, and we'll be happy to help.`,
    actionButtons: [
      {
        label: `Call ${NFYVE_CONTACT.phoneDisplay}`,
        type: 'phone',
        value: NFYVE_CONTACT.phone,
      },
      {
        label: 'Email Concierge',
        type: 'email',
        value: NFYVE_CONTACT.email,
      },
      {
        label: 'Book an Appointment',
        type: 'booking',
      },
    ],
    followUpQuestions: [
      { id: 'f-services', text: 'Tell me about your services' },
      { id: 'f-location', text: 'Where are you located?' },
      { id: 'f-hours', text: 'What are your opening hours?' },
    ],
  };
}
