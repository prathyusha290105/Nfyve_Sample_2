/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
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
import { SupportChatWidget } from './components/chat/SupportChatWidget';
import { LoginPage } from './components/auth/LoginPage';
import { CustomerAccountPage } from './components/account/CustomerAccountPage';
import { AdminDashboardPage } from './components/admin/AdminDashboardPage';

function AppContent() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [redirectTarget, setRedirectTarget] = useState<string | null>(null);

  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>(
    'Full 5-Pillar Transformation Package'
  );

  // Sync with browser navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Parse redirect query param if present
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    if (redirect) {
      setRedirectTarget(redirect);
    }
  }, [currentPath]);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(window.location.pathname || path);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // If redirected to home with booking intent, scroll to contact
    if (path === '/' || path.startsWith('/?')) {
      if (path.includes('booking') || redirectTarget === 'booking') {
        setTimeout(() => {
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      }
    }
  };

  const scrollToBooking = () => {
    // If not on home page, navigate home first
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return;
    }

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    if (currentPath !== '/') {
      navigate('/');
      setTimeout(() => {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
      return;
    }

    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceFromOrbit = (serviceName: string) => {
    setSelectedServiceForBooking(serviceName);
    scrollToBooking();
  };

  // Route 1: Login Page
  if (currentPath === '/login') {
    return (
      <LoginPage
        onNavigate={navigate}
        redirectUrl={redirectTarget === 'booking' ? '/' : redirectTarget}
      />
    );
  }

  // Route 2: Customer Account Dashboard
  if (currentPath === '/account') {
    return (
      <CustomerAccountPage
        onNavigate={navigate}
        onOpenBooking={scrollToBooking}
      />
    );
  }

  // Route 3: Staff & Admin Command Center
  if (currentPath === '/admin') {
    return <AdminDashboardPage onNavigate={navigate} />;
  }

  // Route 4: Main Public Sanctuary Landing Page
  return (
    <div className="min-h-screen bg-[#211A18] text-[#211A18] flex flex-col font-sans selection:bg-[#D6B16A] selection:text-[#211A18]">
      {/* 1. Header & Navigation (with Login option) */}
      <Header onBookClick={scrollToBooking} onNavigate={navigate} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero onBookClick={scrollToBooking} onExploreClick={scrollToServices} />

        {/* 3. Reliable Animated Statistics Banner */}
        <StatsCounter />

        {/* 4. About NFYVE & Integrated Concept */}
        <AboutSection />

        {/* 5. Services: Interactive 5-Pillars Orbit System */}
        <ServicesOrbit onSelectServiceForBooking={handleSelectServiceFromOrbit} />

        {/* 6. Premium Editorial Gallery */}
        <GallerySection />

        {/* 7. Why Choose NFYVE with Automatic Image Carousel */}
        <WhyChooseUs onBookClick={scrollToBooking} />

        {/* 8. Verified Reviews & Testimonials Marquee */}
        <ReviewsSection />

        {/* 9. Frequently Asked Questions Accordion */}
        <FaqSection />

        {/* 10. Appointment Booking & Contact Section */}
        <BookingSection
          preselectedService={selectedServiceForBooking}
          onNavigate={navigate}
        />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* 12. Floating Customer Support Chat Widget */}
      <SupportChatWidget onBookClick={scrollToBooking} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
