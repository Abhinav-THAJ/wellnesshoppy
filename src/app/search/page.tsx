'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Product } from '@/lib/mockData';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query = '' } = React.use(searchParams);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      api.getProducts({ search: query }).then((res) => {
        setProducts(res.products);
        setLoading(false);
      });
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-10">
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Search Results
          </h1>
          <p className="font-body text-xs text-gray-500 mt-1">
            Query: <span className="text-[#2563EB] font-bold">&ldquo;{query}&rdquo;</span>
          </p>
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-white border rounded-2xl h-80 animate-pulse p-4" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50/50 rounded-3xl p-8 border border-gray-50 max-w-xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-4">
              <img src="/images/illustrations/empty.png" alt="No matches" className="object-contain w-full h-full" />
            </div>
            <h3 className="font-heading text-base font-bold">No items match your search</h3>
            <p className="font-body text-xs text-gray-400 font-light mt-1">
              We could not find any design masterpieces that match your query. Try something different.
            </p>
            <Button asChild className="bg-[#111827] text-white hover:bg-gray-800 rounded-full font-body text-xs uppercase tracking-wider px-6 mt-6">
              <Link href="/shop">Browse Store</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-6 justify-center">
            {products.map((product) => (
              <div key={product.id} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
