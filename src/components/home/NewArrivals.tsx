'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Product } from '@/lib/mockData';
import ProductCard from '../product/ProductCard';

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts({ orderby: 'date', order: 'desc', per_page: 4 }).then((res) => {
      const list = res.products.filter(p => p.newArrival) || res.products;
      setProducts(list.length > 0 ? list : res.products.slice(0, 4));
      setLoading(false);
    });
  }, []);

  if (loading) return null;
  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            New Collections
          </h2>
          <p className="font-body text-xs sm:text-sm text-gray-500 font-light max-w-md mx-auto">
            Fresh arrivals fresh from our global design atelier, engineered to set modern styling standards.
          </p>
        </div>

        {/* Grid */}
        <div className="flex flex-wrap gap-6 justify-center">
          {products.map((product) => (
            <div key={product.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
