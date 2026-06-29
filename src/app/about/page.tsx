'use client';

import React from 'react';
import { Sparkles, Hammer, ShieldCheck, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section */}
        <div className="mb-20 text-center max-w-2xl mx-auto space-y-4">
          <span className="font-heading text-xs font-bold tracking-[0.2em] text-secondary uppercase">Our Heritage</span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-primary tracking-tight leading-tight">
            The Architectural Philosophy of Retail
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
            We don&apos;t build traditional online stores. We forge custom digital showcases for the world&apos;s most-refined material creations.
          </p>
        </div>

        {/* Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-6">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-primary tracking-tight">Our Story</h2>
            <p className="font-body text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Founded in 2026, EMPIRE was established to bridge the gap between high-end industrial design and modern headless engineering. We noticed a disconnect: physical items crafted with years of mechanical design testing were often sold on slow, template-driven legacy eCommerce platforms.
            </p>
            <p className="font-body text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              We set out to architect a solution. By separating content from presentation, we allow our clients to experience products in instant, visual fluid layouts that match the craftsmanship of Apple, Dyson, or Tesla.
            </p>
          </div>
          <div className="aspect-[16/10] bg-background rounded-3xl overflow-hidden relative shadow-sm">
            <img 
              src="/images/kerala_coconut_oil.png" 
              alt="Office space" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Grid */}
        <div className="border-t border-gray-100 pt-20">
          <h2 className="font-heading text-2xl font-extrabold text-primary tracking-tight text-center mb-16">Core Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: "Material Rigor", desc: "We utilize only Grade 5 titanium, synthetic sapphire, and organic combed cashmere.", icon: Sparkles },
              { title: "Atelier Customization", desc: "Every garment is hand-stitched and tailored in Florentine mills.", icon: Hammer },
              { title: "Zero Latency", desc: "Our storefront is built on Vercel Edge networks for instant loading speeds.", icon: ShieldCheck },
              { title: "Design Integrity", desc: "We adhere strictly to Scandinavian minimalist layout conventions.", icon: Award },
            ].map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={val.title} className="p-6 bg-background/50 border border-gray-50 rounded-2xl space-y-4">
                  <div className="p-3 bg-primary text-white rounded-xl w-fit">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-primary">{val.title}</h3>
                  <p className="font-body text-xs text-muted-foreground font-light leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
