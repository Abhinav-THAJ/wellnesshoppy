'use client';

import React from 'react';
import { Star, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

// Collect some top reviews from mock products
const featuredReviews = [
  {
    id: 1,
    author: "Meera K.",
    role: "Mother of Two",
    avatar: "/images/kerala_herbs.png",
    rating: 5,
    title: "Amazing Hair Growth",
    content: "I started using PULARI herbal oil after my pregnancy hair fall. Within a month, I can see baby hairs growing. The smell is incredibly natural.",
    product: "PULARI Herbal Hair Growth Oil"
  },
  {
    id: 2,
    author: "Lakshmi S.",
    role: "Wellness Enthusiast",
    avatar: "/images/kerala_handloom.png",
    rating: 5,
    title: "Purest Oil I've Found",
    content: "The Urukku Velichenna is exactly like what my grandmother used to make. It's the only thing I trust for my baby's delicate skin.",
    product: "Home Made Urukku Velichenna"
  },
  {
    id: 3,
    author: "Rajiv V.",
    role: "Ayurveda Practitioner",
    avatar: "/images/kerala_spices.png",
    rating: 5,
    title: "Authentic Aroma",
    content: "The Cow Ghee has a fantastic aroma that reminds me of traditional Bilona churning. We use it daily for cooking and health.",
    product: "Pure Cow Ghee"
  }
];

export default function Reviews() {
  return (
    <section className="py-24 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center max-w-xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-primary tracking-tight mb-3">
            Customer Testimonials
          </h2>
          <p className="font-body text-xs sm:text-sm text-muted-foreground font-light">
            Read real feedback from our happy families and wellness community.
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
                  <h3 className="font-heading text-sm font-bold text-primary">
                    &ldquo;{rev.title}&rdquo;
                  </h3>
                  <p className="font-body text-xs text-muted-foreground font-light leading-relaxed">
                    {rev.content}
                  </p>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3.5 mt-8 pt-6 border-t border-gray-50">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-muted">
                  <img src={rev.avatar} alt={rev.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-heading text-xs font-bold text-primary">{rev.author}</h4>
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
