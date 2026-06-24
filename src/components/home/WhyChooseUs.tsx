'use client';

import React from 'react';
import { Truck, ShieldCheck, ArrowRightLeft, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';
import { whyChooseUs } from '@/lib/mockData';

const iconMap: Record<string, any> = {
  Truck,
  ShieldCheck,
  ArrowRightLeft,
  Headphones,
};

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Bespoke Service Standard
          </h2>
          <p className="font-body text-xs sm:text-sm text-gray-500 font-light">
            Every order is treated as a private commission. Experience absolute retail care.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((card, idx) => {
            const Icon = iconMap[card.icon] || ShieldCheck;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-6 bg-gray-50/50 rounded-2xl border border-gray-50 flex flex-col items-start gap-4 hover:shadow-lg transition-shadow"
              >
                <div className="p-3 bg-[#111827] text-white rounded-xl">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-heading text-sm font-bold text-gray-900">
                    {card.title}
                  </h3>
                  <p className="font-body text-xs text-gray-500 font-light leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
