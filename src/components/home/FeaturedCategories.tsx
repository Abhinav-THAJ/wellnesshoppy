'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';

export default function FeaturedCategories() {
  const [cats, setCats] = useState<any[]>([]);

  useEffect(() => {
    api.getCategories().then(res => setCats(res));
  }, []);

  if (cats.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-12 text-center max-w-xl mx-auto">
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-primary tracking-tight mb-3">
            Shop by Category
          </h2>
          <p className="font-body text-xs sm:text-sm text-muted-foreground font-light">
            Discover the essence of pure nature and authentic traditions.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {cats.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative"
            >
              <Link href={`/shop/category/${cat.slug}`} className="block relative overflow-hidden rounded-2xl bg-background aspect-square">
                
                {/* Image */}
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out brightness-[0.9] group-hover:brightness-[0.75]"
                />

                {/* Details Overlay */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end text-white bg-gradient-to-t from-[#111827]/70 via-[#111827]/10 to-transparent">
                  <h3 className="font-heading text-xs sm:text-sm font-bold tracking-wider uppercase truncate">
                    {cat.name}
                  </h3>
                  <p className="font-body text-[10px] text-gray-300 font-medium mt-1">
                    {cat.count} products
                  </p>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
