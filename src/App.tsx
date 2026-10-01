/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsCounter } from './components/StatsCounter';
import { AboutSection } from './components/AboutSection';
import { ServicesOrbit } from './components/ServicesOrbit';
import { GallerySection } from './components/GallerySection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>(
    'Full 5-Pillar Transformation Package'
  );

  const scrollToBooking = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromOrbit = (serviceName: string) => {
    setSelectedServiceForBooking(serviceName);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[#211A18] text-[#211A18] flex flex-col font-sans selection:bg-[#D6B16A] selection:text-[#211A18]">
      {/* 1. Header & Navigation */}
      <Header onBookClick={scrollToBooking} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onBookClick={scrollToBooking} onExploreClick={scrollToServices} />

        {/* 3. Reliable Animated Statistics Banner */}
        <StatsCounter />

        {/* 4. About NFYVE & Integrated Concept */}
        <AboutSection />

        {/* 5. Services: Interactive 5-Pillars Orbit System */}
        <ServicesOrbit onSelectServiceForBooking={handleSelectServiceFromOrbit} />

        {/* 6. Premium Editorial Gallery (without fingernail close-up) */}
        <GallerySection />

        {/* 7. Why Choose NFYVE with Automatic Image Carousel */}
        <WhyChooseUs onBookClick={scrollToBooking} />

        {/* 8. Verified Reviews & Testimonials Marquee */}
        <ReviewsSection />

        {/* 9. Frequently Asked Questions Accordion */}
        <FaqSection />

        {/* 10. Appointment Booking & Contact Section */}
        <BookingSection preselectedService={selectedServiceForBooking} />
      </main>

      {/* 11. Footer */}
      <Footer />
    </div>
  );
}
