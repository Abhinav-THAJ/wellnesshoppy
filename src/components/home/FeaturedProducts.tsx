'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Product } from '@/lib/mockData';
import ProductCard from '../product/ProductCard';
import { Button } from '../ui/button';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts({ per_page: 8, featured: true }).then((res) => {
      setProducts(res.products);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-background/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-muted animate-pulse rounded mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-white rounded-2xl h-80 animate-pulse border border-gray-100 p-4" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-background/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
          <div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-primary tracking-tight mb-2">
              Featured Essentials
            </h2>
            <p className="font-body text-xs sm:text-sm text-muted-foreground font-light max-w-md">
              A curated catalog of our finest natural products, crafted with extreme care and authentic Ayurvedic precision.
            </p>
          </div>
          <Button asChild variant="ghost" className="font-body text-xs uppercase tracking-wider font-semibold text-secondary hover:text-secondary hover:bg-transparent p-0 flex items-center">
            <Link href="/shop">
              Shop Collections <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="flex flex-wrap gap-3 sm:gap-6 justify-center">
          {products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="w-[calc(50%-6px)] sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
