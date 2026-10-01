export interface ServicePillar {
  id: string;
  tag: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  image: string;
  treatments: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'salon' | 'skin' | 'gym' | 'ambience';
  image: string;
  aspectClass: string;
}

export interface CarouselSlide {
  id: string;
  title: string;
  caption: string;
  tag: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  service: string;
  text: string;
  rating: number;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const NFYVE_CONTACT = {
  phone: '+91 9000023050',
  phoneDisplay: '+91 9000023050',
  email: 'support@nfyve.com',
  address: '4th Floor, Kura Towers, Besides Begumpet Old Airport, Hyderabad - 500016',
  hours: 'Mon - Sun: 07:00 AM – 09:30 PM',
  instagram: 'https://www.instagram.com/nfyve_thechange/',
  facebook: 'https://www.facebook.com/profile.php?id=61587495715415',
  logoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCm2FTzRHdSvO3KlmkxHgrMMdtLuZObXqCC2FCQ4Rugh_ZkYUhRXyEaUkL67n5uNfKhmfRq3vrdFwd0rl5rKU2tv9lURUhJf-WF9avgIcMOJdYAxf3WNSmB2ztaCesWYy7CgGR3WCJmQ1jNtons6NQNQyZUfXsv0oumFiO3iIFkAQ6VJfCAzWgq3FaTeFaluh51LUbfNmpo7SUVTfRoC4vFw8K6IplK9RzUVUdVDzl5iPVp6jOZSbQUjMFqsBPeZYcNso',
  footerLogoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhJ44eVcygW9DDK7iI8iUIUlL1oWM5KLv2MZxKtw7henBMlpPY6jXNLF-NMTtlriGm2SI8ALATS43kXj2LchQqoDusUKs5waWePriSz2mAxDHoO2IeVQDRTUlWl6-99PBDxajGy13HzGP5LYtb3mcN3dB2i6-ccbO9cC8lqyhe9Rc3gwgC2Pef5RKHZXZtBNtlwlHKhug_v9tTLf3Mr17Pc2Ib-motYkc3YOipxt2BhWhUQueU8kdoa5xP-krGK7yHBSI',
};

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'salon',
    tag: 'Salon Care',
    title: 'Salon & Hair Lounge',
    shortDesc: 'Balayage, nanoplastia, bespoke nail bar & restorative scalp lounge.',
    fullDesc: 'Relax and refresh with professional salon care: hair colouring, balayage, nanoplastia, keratin, bespoke nail art, and hair botox in private acoustic suites.',
    icon: 'Sparkles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfGeMLafSLEJol07Wx03a-HM0q6lGC8YSOI7pBhGs26aZ-Ea3P4sYfHkz8q8QOfs1h7ZPZ_ectGaF15-S6s3xTt-bihWVicXaI53VViIqnDNjncalAnfxhOiDkvuwzLrcqqVadDj0T4tANcZOLti3jdsCxc6Mb1SdT6zed2LWGNw4bXQfjze9IhX5BxP-uBcYTJRudkLICpABANjYYzhPt5niDf9YttVoVRnoloITf11ksLV0Q7k_p4nGRNf3xGnPUn20',
    treatments: [
      'Precision Balayage & Ombré Hair Color',
      'Nanoplastia & Hair Botox Smoothing',
      'Advanced Keratin Restructuring Treatment',
      'Bespoke Gel & Acrylic Nail Extensions & Art',
      'Scalp Detox & Micro-Exfoliation Lounge',
    ],
  },
  {
    id: 'skin',
    tag: 'Dermatology',
    title: 'Skin & Clinical Aesthetics',
    shortDesc: 'HydraFacial, Carbon Laser O3, PRP & medical glow therapies.',
    fullDesc: 'Certified medical dermatology treatments designed to renew texture, erase sun damage, and induce collagen synthesis under certified clinical supervision.',
    icon: 'HeartHandshake',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLrIWEMeA_J1Ml20j9u_3KUhUaXouuUdVCfnZynoOk8Uc2KYWl2eQtcgJn06rDTbIuYubL8qa_idkw7UO9yIBj-ZfPVXe6tembfLoAPpii2ZfaDrfEPw-f0SWfeVDqxQmAxzOqWWpE58x8Jp--fk9p-_AtFcn71eV4D-6LWCd5WUx4ZsBhaZBEAXXpNbX5lYlCUImBez7DOV09eCaU8LtKdjrK22OiYHG3Nzsjgrd2TLwC1t06peJk5KIOeCT_5aep5BY',
    treatments: [
      'Medical-Grade HydraFacial Deep Extraction',
      'Carbon Laser Peel (O3 Porcelain Facial)',
      'PRP & GFC Hair Loss Follicle Therapy',
      'Pico Laser & Pigmentation Clearing',
      'MNRF & Micro-Needling Skin Tightening',
      'Chemical Peels & Glutathione Glow Infusions',
    ],
  },
  {
    id: 'slimming',
    tag: 'Fat Loss',
    title: 'Slimming & Weight Loss Clinic',
    shortDesc: 'Cryolipolysis fat freezing, inch loss & Slim-Zone contour.',
    fullDesc: 'Transform your physique with cutting-edge non-invasive fat loss protocols: Cryolipolysis (fat freezing), Lipolysis, Lipo Laser, inch loss, and Slim-Zone therapy with zero downtime.',
    icon: 'Scale',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs3SDmZmchFmKXxy0gQ1Xx4qJV-jI_dcY-Vy7wUL8cmt5DA7GSnYH_D8QQTHIUWRfUYZ8BIb-RetylFewewgQlAghmvRjP0KMXAfsKIej_ZNl2hlqj5VJzV8k-x9EqMFDiDDLTgU-twPP1CPLDF_LEXXKtV6pkRcMBmX3xpEmGlV7zSf2vsaW6WkkpoZkePwwSpTaK-RhLXdkxz2AQ6G6yu-EMo3IGibtQhqgfg6quBLGS7oqo9cB01OimB7yj47Od5NM',
    treatments: [
      'Cryolipolysis (Controlled 360° Fat Freezing)',
      'Targeted Ultrasound Cavitation Lipolysis',
      'Slim-Zone Thermal Inch Loss Therapy',
      'Lymphatic Drainage & Cellulite Smoothing',
      'Visceral Fat Analysis & Metabolic Mapping',
    ],
  },
  {
    id: 'fitness',
    tag: 'Fitness',
    title: 'Gym & Fitness Center',
    shortDesc: 'MaxFit cardio, strength rigs & 1-on-1 ACE certified trainers.',
    fullDesc: 'Build functional strength, lean muscle, and cardiovascular endurance with biomechanically superior MaxFit equipment, functional rigs, and personal trainers.',
    icon: 'Dumbbell',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSFu2y9AXLnQG3BCwyenT7M0CUrZT-5mei7snI7pSeFFA9nqAOyCJuu5L06hUEeuVB8TxKjPixzaEmLU4tKjJOie7-csdenmlBbuK7H9GAXjkcPsFFOWqNUMk0hqgAK3rUjEEH_R3RDN2EJObXp2FHmGv8f_Fcwjt8wnhUEls6DBRDs0Scem-yo1L6X5OSdAB8X82BucpXtaz_v4PkvDpVgqC73UZ2IZvvC5odZXavimtg8tjMQ-7KBO71UMuApWi2EnA',
    treatments: [
      'MaxFit Ergonomic Cardio & Biomechanical Line',
      'Olympic Free Weights & Functional Power Rigs',
      '1-on-1 Certified Personal Strength Coaching',
      'Postural Correction & Core Restoration',
      'HIIT & Athletic Conditioning Tracks',
    ],
  },
  {
    id: 'nutrition',
    tag: 'Nutrition',
    title: 'Nutri Food Cafe & Bar',
    shortDesc: 'Chef-crafted macro bowls, detox juices & meal subscription.',
    fullDesc: 'Stay effortlessly on track with delicious, wholesome meals prepared fresh in-house, precisely calibrated to your metabolic rate, body goals, and daily macros.',
    icon: 'UtensilsCrossed',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCYpCG2dax_L2t6v8q3r_QXL0zfB5VGLClCzdytTGzlphgG3s5qxmWRq4bT5JiYAW--PhoADZl1qLoP03ISEmjfpmM_PEIi77lwZVnLzAkRP11PhTawu_q_ldQWafczGAc5C3z89k4BWZ2xaFgZWQKk3HPfk9SiW04QN8EwAqgpCzGsTcFP578MDQw7w8YepdKUPYKCorOiPZWnt55rGTjD-oawREH7KoQnBpmEII9IwpnxXzQa8WYp02uvRJznTpIw4',
    treatments: [
      'Customized Daily Macro Meal Subscriptions',
      'Cold-Pressed Botanical Detox Elixirs',
      'High-Protein Nutrient-Dense Bowls & Salads',
      'Metabolic Acceleration Herbal Infusions',
      'Clinical Dietitian Consultation & Meal Audits',
    ],
  },
];

// NOTE: As requested in prompt, the fingernail close-up image is completely excluded!
// Only authentic architectural, equipment, salon, entrance, and treatment spaces are used.
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gallery-1',
    title: 'Illuminated Ripple Corridors & Private Lounges',
    subtitle: 'Flagship Architectural Ambiance',
    category: 'ambience',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5YlUvCut56qjoqoP5zZ0P2nTAltquje6hLWNzvso4snohAH8I1rDNazW7r1mlFnz3qF4wxXPXZCFX2EyzNPELp9dlP8jSGIlAhU4Zu1fgCxeLEmhoe9qCoE9aQaGrW4WcBYltfjRP-FDLyAnUwB5FRh2XxRyc2frc2UPfAydY0M0p_kDOZ50E-_taa4qQ-4tXhkZdDF8-Tf69wW9diWDm0bFAT5wx4cCQPSXSlgFxjfoXdrElQ2H-akEJb0Ufbjursrg',
    aspectClass: 'md:col-span-2 md:row-span-2 min-h-[440px]',
  },
  {
    id: 'gallery-2',
    title: 'Ergonomic Pedicure & Reflexology Spa Suite',
    subtitle: 'Sanctuary Spa Ambiance',
    category: 'salon',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-z2yqPnP_ewQKwtbj8_G4N9ONFDbciFrucWHKH_vaPVHbolKDqxP4t1ybzeF5pa0rSSnG83chCo_Q7XtgywSimdn0nRg3AUpF05QMGbaxbEMU31K8st0cscA629lERbGzQLMBvyqjeBKDvbAMQj-drhydcMXE1g-NBpVuFX--7IuBKfO3q5vfloQKOXsgXdGYNd1QPyRtmcGt_51jlLPesSfmnf-ucXDnmuqpWuB2Rd3HT1shdyi_Ep2QhQpJm0F34wU',
    aspectClass: 'md:col-span-2 min-h-[260px]',
  },
  {
    id: 'gallery-3',
    title: 'NFYVE – The Change Official Welcome Monogram',
    subtitle: 'Begumpet Flagship Entrance',
    category: 'ambience',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjm9GXCBQMPO7rX3dPebG49De6mY2-GSMXVC3IWutgCsuPXU0tYG_Ts3afyPzLHud9geoMtDIpnplRNCbMeK6wFgiClrP_InuN6q-Ba6oYomj7bnvpOdpJ5Yfs-1N23RGDCM8rWy3KspoN50z4S2RPScacdEIFfjLnqoMgV34Wk5CA6oGcn2Fd151Kjtl4uXfJKTtdCFQXAxZaUkHdwD-6MRR-k-C6MXmzURwI04Aviqs1Ehvu68FfvGTLVm9ECFyTGBM',
    aspectClass: 'md:col-span-1 min-h-[260px]',
  },
  {
    id: 'gallery-4',
    title: 'Cardio, Free Weights & Personal Training',
    subtitle: 'Performance Gym Suite',
    category: 'gym',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1GDggeyCU8tHAdDUhAn81iDDpQKK9bF4uxp9PfMclUTgujfPMhp2jK9vee6yQHLblARKzBQcRs5i4baiscodYTdhQRI1b9SLONaIeHiT6FfD2ZpxZBZx_5uxXw0jOOMrtEj7X0s0kpIBAJG2URYf2izcdD8cz7fBuZ5KsD8YUT6EuLqOyV67OZxPuy-psQPbNJBoWkdLOM7ugwykrvBfjLXJn7XqlL5D73Qj_HfFy0sLX7lNFLCFOr1Qu8UeuDBflh5Y',
    aspectClass: 'md:col-span-1 min-h-[260px]',
  },
  {
    id: 'gallery-5',
    title: 'Sculptural Wave Mirrors & Consultation Stations',
    subtitle: 'Private Aesthetic & Salon Wing',
    category: 'salon',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi_wvenJvPRFFOIGvPpC9KnLPhswM3D9hI97gkQKSQCYhUp_ez4W1JaBiRa7LttImulmdKJlI23LHd2idq8xhP0uRWXs317veIZD7MT4fJ88YKkXZhIgh8z0kEar8V_DwoPFZZXa79Pyxy9kTDSQq9IccYMUwGzKL6oRafes8mwptEAUfV0i6S5DT_NXldRLCOL7jeXOsw_DMSmkSSSIFjiRGTt6DS6omUgoAIA6Z-iYD1sJwAfKBF0GL_z4wTO_tA-E4',
    aspectClass: 'md:col-span-2 min-h-[260px]',
  },
  {
    id: 'gallery-6',
    title: 'Golden Travertine Archway & Acoustic Suites',
    subtitle: 'Architectural Corridor',
    category: 'ambience',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD4Y06dF0U0krL-BSCSUMSF7pJxk-1sRX0pDWZ9hO6kmP5oo-ir1vpMEPGU5hjjn-t0H7sg59JiJTFytIQbrx34bX4NLJsa-Yl-QyJ8H0JVioD8cfdcr8Za3VWWs3AfyJwrnVPsAmE_-9sK_S1OQ_M2El1LyUWvFBOB6MzqqQGZ1thkDIYZ3HoOUlleGBxpO1lEzEgfE1XWqD3j1WD1ZaAOXolPcc-Yti7kyO9j2gUAu1frFgu3q0FUpOGsGleJWNCkFg',
    aspectClass: 'md:col-span-1 min-h-[260px]',
  },
  {
    id: 'gallery-7',
    title: 'Doctor-Led Aesthetics Consultation Lounge',
    subtitle: 'Clinical Dermatology Wing',
    category: 'skin',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLrIWEMeA_J1Ml20j9u_3KUhUaXouuUdVCfnZynoOk8Uc2KYWl2eQtcgJn06rDTbIuYubL8qa_idkw7UO9yIBj-ZfPVXe6tembfLoAPpii2ZfaDrfEPw-f0SWfeVDqxQmAxzOqWWpE58x8Jp--fk9p-_AtFcn71eV4D-6LWCd5WUx4ZsBhaZBEAXXpNbX5lYlCUImBez7DOV09eCaU8LtKdjrK22OiYHG3Nzsjgrd2TLwC1t06peJk5KIOeCT_5aep5BY',
    aspectClass: 'md:col-span-1 min-h-[260px]',
  },
];

export const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: 'slide-1',
    title: 'Strength, Endurance & Transformation',
    caption: 'MaxFit equipment line with personalized biomechanical calibration and private trainer guidance.',
    tag: 'Gym & Cardio Suites',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgMDrD26_69EcMmBMCYDbhU3IMDfh3sGNtj99Jq_UI8chPUIdRg95unu604ebGjXf-omSJ59VzUMlTiv4_NY-HWLJ-8I1qCD9WsL8bP-9FUAldLtzC8cT3G0etkEkWPu2E-_81dJnny6xHgBQXEkF57_8BgCRdWxSlnKwjjPzc40Y-bj7A6ERvUJhZKCY73KyN_QjHt9PJ812C4oGyKICjg5e_DvSJNo0tyIUJDBt3GrRNt_4zncl3cvuDWs5bvQFyejU',
  },
  {
    id: 'slide-2',
    title: 'Sunlit Panoramic Fitness Track',
    caption: 'Ergonomic cardio fleet facing expansive Begumpet city views in climate-controlled acoustic quiet.',
    tag: 'Performance Cardio',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1GDggeyCU8tHAdDUhAn81iDDpQKK9bF4uxp9PfMclUTgujfPMhp2jK9vee6yQHLblARKzBQcRs5i4baiscodYTdhQRI1b9SLONaIeHiT6FfD2ZpxZBZx_5uxXw0jOOMrtEj7X0s0kpIBAJG2URYf2izcdD8cz7fBuZ5KsD8YUT6EuLqOyV67OZxPuy-psQPbNJBoWkdLOM7ugwykrvBfjLXJn7XqlL5D73Qj_HfFy0sLX7lNFLCFOr1Qu8UeuDBflh5Y',
  },
  {
    id: 'slide-3',
    title: 'Advanced Non-Invasive Body Contouring',
    caption: 'FDA-cleared Cryolipolysis fat freezing and localized lipo-laser suites for proven inch loss.',
    tag: 'Slimming Technology',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBs3SDmZmchFmKXxy0gQ1Xx4qJV-jI_dcY-Vy7wUL8cmt5DA7GSnYH_D8QQTHIUWRfUYZ8BIb-RetylFewewgQlAghmvRjP0KMXAfsKIej_ZNl2hlqj5VJzV8k-x9EqMFDiDDLTgU-twPP1CPLDF_LEXXKtV6pkRcMBmX3xpEmGlV7zSf2vsaW6WkkpoZkePwwSpTaK-RhLXdkxz2AQ6G6yu-EMo3IGibtQhqgfg6quBLGS7oqo9cB01OimB7yj47Od5NM',
  },
  {
    id: 'slide-4',
    title: 'Restorative Pedicure & Reflexology Lounge',
    caption: 'Soothing amber illumination and deep hydrotherapy foot rituals in ergonomic massage recliners.',
    tag: 'Luxury Salon Suites',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-z2yqPnP_ewQKwtbj8_G4N9ONFDbciFrucWHKH_vaPVHbolKDqxP4t1ybzeF5pa0rSSnG83chCo_Q7XtgywSimdn0nRg3AUpF05QMGbaxbEMU31K8st0cscA629lERbGzQLMBvyqjeBKDvbAMQj-drhydcMXE1g-NBpVuFX--7IuBKfO3q5vfloQKOXsgXdGYNd1QPyRtmcGt_51jlLPesSfmnf-ucXDnmuqpWuB2Rd3HT1shdyi_Ep2QhQpJm0F34wU',
  },
  {
    id: 'slide-5',
    title: 'Doctor-Led Aesthetics & Clinical Glow',
    caption: 'HydraFacial, Carbon Laser O3, and bespoke dermatology treatments administered by certified specialists.',
    tag: 'Clinical Aesthetics',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLrIWEMeA_J1Ml20j9u_3KUhUaXouuUdVCfnZynoOk8Uc2KYWl2eQtcgJn06rDTbIuYubL8qa_idkw7UO9yIBj-ZfPVXe6tembfLoAPpii2ZfaDrfEPw-f0SWfeVDqxQmAxzOqWWpE58x8Jp--fk9p-_AtFcn71eV4D-6LWCd5WUx4ZsBhaZBEAXXpNbX5lYlCUImBez7DOV09eCaU8LtKdjrK22OiYHG3Nzsjgrd2TLwC1t06peJk5KIOeCT_5aep5BY',
  },
];

export const TESTIMONIALS_ROW_1: TestimonialItem[] = [
  {
    id: 'rev-1',
    author: 'Shethalsuvarna',
    role: 'Begumpet Client',
    service: 'Sanctuary Care',
    rating: 5,
    text: 'The staff were very friendly and professional. The ambience is calm, peaceful, and relaxing. Loved the overall vibe and service. Highly recommended!',
  },
  {
    id: 'rev-2',
    author: 'Vamshi Vinnie',
    role: 'HydraFacial Patient',
    service: 'Clinical Skin Aesthetics',
    rating: 5,
    text: 'I recently had a HydraFacial treatment, and the overall experience was very relaxing and refreshing. The cleansing and exfoliation process felt gentle... skin looked brighter, cleaner, and more glowing.',
  },
  {
    id: 'rev-3',
    author: 'Pavan Sai',
    role: 'Slimming Program',
    service: 'Fat Loss & Fitness',
    rating: 5,
    text: "I had an amazing experience at NFYVE! I lost nearly 5 kg in just 1.5 months, & I'm really happy with the results. The team is very supportive, professional, & motivating.",
  },
  {
    id: 'rev-4',
    author: 'Siddu',
    role: 'HydraFacial Glow',
    service: 'Medical Aesthetics',
    rating: 5,
    text: 'Had a wonderful Hydrafacial experience at NFYVE. My skin felt instantly fresh, deeply cleansed, and super glowing right after the session. Best Hydrafacial in Begumpet.',
  },
];

export const TESTIMONIALS_ROW_2: TestimonialItem[] = [
  {
    id: 'rev-5',
    author: 'Suguna FruitBox',
    role: 'Keratin Client',
    service: 'Salon Care',
    rating: 5,
    text: "I got my Keratin treatment done at NFYVE and I'm extremely happy with the results. My hair feels so smooth, soft, frizz-free, and much more manageable now.",
  },
  {
    id: 'rev-6',
    author: 'Pavan',
    role: 'PRP Hair Therapy',
    service: 'Trichology & Aesthetics',
    rating: 5,
    text: 'I had my PRP treatment done at NFYVE... noticed positive changes after a few sessions, especially in hair thickness and reduced hair fall.',
  },
  {
    id: 'rev-7',
    author: 'Mohan',
    role: 'Carbon Laser Patient',
    service: 'Laser Dermatology',
    rating: 5,
    text: 'I recently tried the Carbon Laser Facial (O3 treatment) at NFYVE and I absolutely loved the results. My skin feels much cleaner, smoother, and brighter.',
  },
  {
    id: 'rev-8',
    author: 'Salmanramiz Sayyed',
    role: 'Sanctuary Member',
    service: '5-Pillar Member',
    rating: 5,
    text: 'This place is awesome, and the staff is very polite and experienced with the need for every wellness service. Must visit.',
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'What is NFYVE & what services do you offer?',
    answer: 'NFYVE is a complete transformation centre offering Wellness, Fitness, Aesthetics, Salon & Nutri Food services under one roof in Begumpet, Hyderabad. We focus on helping you achieve your body, skin, hair, and lifestyle goals with cutting-edge technology and certified care.',
  },
  {
    id: 'faq-2',
    question: 'What wellness & slimming treatments are available?',
    answer: 'We offer advanced wellness solutions including weight loss, inch loss, body contouring, Cryolipolysis (fat freezing), lipo laser, and Slim-Zone therapy, all designed for safe, non-invasive body transformation without surgery or downtime.',
  },
  {
    id: 'faq-3',
    question: 'Can I combine multiple services under one membership?',
    answer: 'Absolutely! You can combine fitness training, slimming treatments, dermatological aesthetics, salon styling, and custom nutrition plans into one synchronized monthly regimen with your dedicated transformation concierge.',
  },
  {
    id: 'faq-4',
    question: 'What clinical aesthetic treatments are offered?',
    answer: 'Our medical aesthetics division provides certified treatments including HydraFacial, PRP/GFC for hair loss, Pico Laser, Carbon Laser (O3), Glutathione, MNRF, HIFU, chemical peels, and laser hair removal.',
  },
];
