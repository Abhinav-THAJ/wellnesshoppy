'use client';

import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

// Collect some top reviews from mock products
const featuredReviews = [
  {
    id: 1,
    author: "Marcus Vance",
    role: "Acoustic Enthusiast",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    title: "Absolute sonic perfection",
    content: "The sound signature is completely on another level. Very precise, fast transients, and the luxury finish is superb.",
    product: "AeroSound Pro Max ANC Headphones"
  },
  {
    id: 2,
    author: "Eleanor Sterling",
    role: "Design Critic",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    title: "Sleek and comfortable",
    content: "It feels like a high-end luxury accessory. The leather padding does not pressure my ears at all, and it fits comfortably for long-distance travel.",
    product: "AeroSound Pro Max ANC Headphones"
  },
  {
    id: 3,
    author: "Sofia Loren",
    role: "Atelier Client",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    rating: 5,
    title: "Magnificent drape and texture",
    content: "This coat is absolutely flawless. The wool-cashmere blend feels like butter, and the camel sand color is deep and rich.",
    product: "Atelier Minimal Cashmere Trench Coat"
  }
];

export default function Reviews() {
  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            Voices of the Atelier
          </h2>
          <p className="font-body text-xs sm:text-sm text-gray-500 font-light">
            Read real feedback from our global community of designers, musicians, and collectors.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredReviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-gray-50 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                
                {/* Rating and Verified */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 text-[#F59E0B] fill-current" />
                    ))}
                  </div>
                  <span className="flex items-center text-[#10B981] text-[10px] font-bold tracking-wider uppercase bg-[#10B981]/5 px-2.5 py-1 rounded-full">
                    <ShieldCheck className="h-3 w-3 mr-1" /> Verified Buyer
                  </span>
                </div>

                {/* Content */}
                <div className="space-y-1.5">
                  <h3 className="font-heading text-sm font-bold text-gray-900">
                    &ldquo;{rev.title}&rdquo;
                  </h3>
                  <p className="font-body text-xs text-gray-500 font-light leading-relaxed">
                    {rev.content}
                  </p>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3.5 mt-8 pt-6 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                  <img src={rev.avatar} alt={rev.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-heading text-xs font-bold text-gray-900">{rev.author}</h4>
                  <p className="font-body text-[10px] text-gray-400 font-medium mt-0.5">
                    {rev.role} • <span className="text-gray-300 font-normal">{rev.product}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
