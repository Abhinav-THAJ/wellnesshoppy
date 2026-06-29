'use client';

import React from 'react';
import { generalFAQs } from '@/lib/mockData';
import { HelpCircle } from 'lucide-react';

export default function FAQPage() {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="font-heading text-xs font-bold tracking-[0.2em] text-secondary uppercase">FAQ</span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-primary mt-2 tracking-tight">Support Library</h1>
          <p className="font-body text-xs sm:text-sm text-muted-foreground font-light mt-3 leading-relaxed">
            Read common answers regarding logistics, return procedures, leather conditioning, and secure payments.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-8">
          {generalFAQs.map((faq, idx) => (
            <div key={idx} className="p-6 bg-background/50 border border-gray-50 rounded-2xl space-y-2">
              <h3 className="font-heading text-sm font-bold text-primary flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-secondary" /> {faq.question}
              </h3>
              <p className="font-body text-xs sm:text-sm text-muted-foreground font-light leading-relaxed pl-6">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
