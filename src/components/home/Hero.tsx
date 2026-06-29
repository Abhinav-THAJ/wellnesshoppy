'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function Hero() {
  const [slides, setSlides] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    api.getHeroSlides().then((res) => setSlides(res));
  }, []);

  if (slides.length === 0) {
    return (
      <div className="h-screen bg-primary flex items-center justify-center">
        <div className="animate-pulse space-y-4 text-center">
          <div className="h-8 w-48 bg-white/10 rounded mx-auto" />
          <div className="h-12 w-96 bg-white/10 rounded mx-auto" />
          <div className="h-4 w-72 bg-white/10 rounded mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <section className="relative h-screen w-full bg-primary overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ 
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} !bg-white !opacity-30 [&.swiper-pagination-bullet-active]:!opacity-100 !w-8 !h-[2px] !rounded-none !mx-1 transition-all"></span>`;
          }
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={slide.id} className="relative h-full w-full">
            
            {/* Parallax Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover object-center scale-105 transition-transform duration-[6000ms] ease-out brightness-[0.4]"
              />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start text-white pt-20">
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <div className="max-w-2xl space-y-6">
                    
                    {/* Tagline */}
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="font-heading text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-secondary"
                    >
                      {slide.tagline}
                    </motion.p>

                    {/* Main Title */}
                    <motion.h1
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -30, opacity: 0 }}
                      transition={{ duration: 0.7, delay: 0.4 }}
                      className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      className="font-body text-sm sm:text-base text-gray-300 leading-relaxed font-light"
                    >
                      {slide.description}
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="flex flex-wrap gap-4 pt-4"
                    >
                      <Button asChild className="bg-white text-primary hover:bg-muted rounded-full font-body text-xs sm:text-sm uppercase tracking-wider px-8 py-6 flex items-center">
                        <Link href={slide.primaryUrl}>
                          {slide.primaryCta} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild className="bg-transparent border border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full font-body text-xs sm:text-sm uppercase tracking-wider px-8 py-6">
                        <Link href={slide.secondaryUrl}>
                          {slide.secondaryCta}
                        </Link>
                      </Button>
                    </motion.div>

                  </div>
                )}
              </AnimatePresence>
            </div>

          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block">
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[20px] h-[35px] border border-white/30 rounded-full flex items-start justify-center p-1.5"
        >
          <div className="w-[3px] h-[6px] bg-white rounded-full" />
        </motion.div>
      </div>

    </section>
  );
}
