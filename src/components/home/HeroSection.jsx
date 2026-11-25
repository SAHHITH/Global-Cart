import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { heroBanners } from '@/data/banners';

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroBanners.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentSlide = heroBanners[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroBanners.length);
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
      <div
        className={`relative overflow-hidden rounded-3xl bg-linear-to-r ${currentSlide.gradient} text-white shadow-xl`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 items-center gap-8 px-6 py-10 sm:px-12 sm:py-14 lg:grid-cols-12"
          >
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#FF9900]">
                <Sparkles className="h-3.5 w-3.5" />
                {currentSlide.badge}
              </span>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-[1.12]">
                {currentSlide.title}
              </h1>

              <p className="max-w-xl text-sm sm:text-base text-slate-300 leading-relaxed">
                {currentSlide.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to={currentSlide.ctaLink}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FF9900] px-6 py-3 text-sm font-extrabold text-[#101828] shadow-md transition hover:bg-[#E68A00]"
                >
                  <span>{currentSlide.ctaText}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  to={currentSlide.secondaryLink}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white backdrop-blur-xs transition hover:bg-white/20"
                >
                  {currentSlide.secondaryText}
                </Link>
              </div>
            </div>

            {/* Right Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto aspect-4/3 max-w-md overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#101828]/60 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Controls */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-xs transition hover:bg-black/65 cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-xs transition hover:bg-black/65 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {heroBanners.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                idx === currentIndex ? 'w-7 bg-[#FF9900]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;