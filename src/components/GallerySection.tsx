import React, { useState, useEffect } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { GALLERY_ITEMS, GalleryItem } from '../data/nfyveData';
import { luxuryEase } from '../utils/animations';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const categories = [
    { id: 'all', label: 'All Highlights' },
    { id: 'salon', label: 'Salon & Nails' },
    { id: 'skin', label: 'Skin & Aesthetics' },
    { id: 'gym', label: 'Gym & Fitness' },
    { id: 'ambience', label: 'Sanctuary Ambiance' },
  ];

  const handlePrevImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setSelectedImage(filteredItems[prevIndex]);
  };

  const handleNextImage = () => {
    if (!selectedImage) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIndex]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  const gridContainerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 24,
      scale: shouldReduceMotion ? 1 : 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: luxuryEase,
      },
    },
  };

  return (
    <section id="gallery" className="py-8 md:py-10 bg-[#242426] relative text-[#FFFAF4]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: luxuryEase }}
          className="text-center max-w-2xl mx-auto mb-4 sm:mb-5"
        >
          <div className="inline-flex items-center gap-1.5 text-[#F0C46B] text-[10px] font-bold tracking-wider uppercase mb-1">
            <Camera className="w-3.5 h-3.5" />
            <span>Sanctuary Glimpses</span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl md:text-3xl text-[#FFFAF4] mb-1.5">
            Experience the NFYVE Ambience
          </h2>
          <p className="text-[#E8D9C7] text-xs leading-relaxed">
            A visual walk through our sunlit Begumpet sanctuary—from ergonomic styling mirrors to clinical aesthetic lounges and performance suites.
          </p>
        </motion.div>

        {/* Interactive Filter Tabs */}
        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : 0.1, ease: luxuryEase }}
          className="flex items-center justify-center flex-wrap gap-2 mb-4 sm:mb-5"
          role="tablist"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#401724] text-[#FFFAF4] border border-[#D6B16A] shadow-md'
                  : 'bg-[#211A18] border border-[#D6B16A]/40 text-[#E8D9C7] hover:bg-[#401724] hover:text-[#FFFAF4]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Editorial Asymmetric Grid with Sequential Card Entrance */}
        <motion.div
          key={activeCategory}
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[140px] md:auto-rows-[150px]"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
              className={`relative rounded-2xl overflow-hidden group border border-[#D6B16A]/40 hover:border-[#F0C46B] shadow-xl cursor-pointer bg-[#211A18] ${
                item.aspectClass
              }`}
              onClick={() => setSelectedImage(item)}
            >
              <img
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src={item.image}
                referrerPolicy="no-referrer"
              />

              {/* Subtle gradient overlay & readable caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#211A18]/95 via-[#211A18]/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4 sm:p-5">
                <span className="text-[10px] text-[#F0C46B] tracking-wider uppercase font-semibold">
                  {item.subtitle}
                </span>
                <h4 className="font-serif text-base sm:text-lg text-[#FFFAF4] font-medium leading-snug mt-0.5">
                  {item.title}
                </h4>
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-[#D6B16A] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="w-3 h-3" />
                  <span>Click to expand</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: luxuryEase }}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 p-2 rounded-full bg-[#401724] text-[#E8D9C7] hover:text-[#FFFAF4] border border-[#D6B16A]/50 transition-colors cursor-pointer"
                aria-label="Close image preview"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Prev / Next controls */}
              <button
                onClick={handlePrevImage}
                className="absolute left-2 sm:-left-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#401724]/90 text-[#FFFAF4] border border-[#D6B16A]/50 hover:bg-[#571f31] transition-all cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNextImage}
                className="absolute right-2 sm:-right-14 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#401724]/90 text-[#FFFAF4] border border-[#D6B16A]/50 hover:bg-[#571f31] transition-all cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Frame */}
              <div className="rounded-3xl overflow-hidden border-2 border-[#D6B16A]/60 shadow-2xl max-h-[70vh] w-full bg-[#211A18] flex items-center justify-center">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <span className="text-xs text-[#F0C46B] uppercase tracking-wider font-semibold">
                  {selectedImage.subtitle}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#FFFAF4] font-medium mt-1">
                  {selectedImage.title}
                </h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
