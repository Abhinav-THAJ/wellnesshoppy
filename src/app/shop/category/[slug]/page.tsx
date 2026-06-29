'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Product } from '@/lib/mockData';
import ProductCard from '@/components/product/ProductCard';
import { ArrowLeft, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = React.use(params);
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    // Fetch categories and find info
    api.getCategories().then((cats) => {
      const info = cats.find((c: any) => c.slug === slug);
      setCategoryInfo(info || { name: slug.toUpperCase(), description: 'Custom dynamic design group.' });
    });

    // Fetch products in this category
    api.getProducts({ category: slug }).then((res) => {
      setProducts(res.products);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Header */}
        <div className="mb-10">
          <Link href="/shop" className="inline-flex items-center text-xs font-body uppercase font-bold tracking-wider text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Catalog
          </Link>
          
          {categoryInfo ? (
            <div className="mt-6 max-w-xl">
              <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-primary tracking-tight capitalize">
                {categoryInfo.name}
              </h1>
              <p className="font-body text-xs sm:text-sm text-muted-foreground font-light mt-3 leading-relaxed">
                {categoryInfo.description}
              </p>
            </div>
          ) : (
            <div className="h-24 bg-background animate-pulse rounded-2xl mt-6 max-w-xl" />
          )}
        </div>

        {/* Dynamic List */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-white border rounded-2xl h-80 animate-pulse p-4" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-background/50 rounded-3xl p-8 border border-gray-50 max-w-xl mx-auto">
            <div className="w-24 h-24 mx-auto mb-4">
              <img src="/images/illustrations/empty.png" alt="No items" className="object-contain w-full h-full" />
            </div>
            <h3 className="font-heading text-base font-bold">No products found</h3>
            <p className="font-body text-xs text-gray-400 font-light mt-1">
              There are currently no items available in this category.
            </p>
            <Button asChild className="bg-primary text-white hover:bg-primary rounded-full font-body text-xs uppercase tracking-wider px-6 mt-6">
              <Link href="/shop">Explore Shop</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
