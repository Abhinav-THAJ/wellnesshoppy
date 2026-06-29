'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Button } from '../ui/button';

export default function PromoBanner() {
  const [promo, setPromo] = useState<any>(null);

  useEffect(() => {
    api.getPromoBanners().then(res => setPromo(res?.summerSale || null));
  }, []);

  if (!promo) return null;

  return (
    <section className="relative py-32 overflow-hidden bg-primary">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={promo.image} 
          alt={promo.title} 
          className="w-full h-full object-cover object-center scale-105 brightness-[0.3]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto space-y-6"
        >
          <span className="font-heading text-xs font-bold tracking-[0.2em] uppercase text-secondary">
            {promo.subtitle}
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold tracking-tight">
            {promo.title}
          </h2>
          <p className="font-body text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-lg mx-auto">
            {promo.desc}
          </p>
          <div className="pt-4">
            <Button asChild className="bg-white text-primary hover:bg-muted rounded-full font-body text-xs uppercase tracking-wider px-8 py-5">
              <Link href={promo.ctaUrl}>
                {promo.ctaText} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
