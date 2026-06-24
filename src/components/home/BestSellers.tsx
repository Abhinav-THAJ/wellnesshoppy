'use client';

import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { api } from '@/lib/api';
import { Product } from '@/lib/mockData';
import ProductCard from '../product/ProductCard';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function BestSellers() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts({ per_page: 8 }).then((res) => {
      // filter best sellers or just take some products
      const list = res.products.filter(p => p.bestSeller) || res.products;
      setProducts(list.length > 0 ? list : res.products);
      setLoading(false);
    });
  }, []);

  if (loading) return null;
  if (products.length === 0) return null;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              The Best Sellers
            </h2>
            <p className="font-body text-xs sm:text-sm text-gray-500 font-light max-w-sm">
              Our most-coveted, iconic releases, crafted to absolute technical refinement.
            </p>
          </div>
          {/* Navigation Buttons */}
          <div className="flex space-x-2">
            <button className="swiper-button-prev-bestseller p-3 border border-gray-100 hover:border-gray-900 rounded-full hover:bg-gray-50 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="swiper-button-next-bestseller p-3 border border-gray-100 hover:border-gray-900 rounded-full hover:bg-gray-50 transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-button-prev-bestseller',
            nextEl: '.swiper-button-next-bestseller',
          }}
          pagination={{ clickable: true, el: '.swiper-pagination-bestseller' }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="!pb-14"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="h-auto">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Pagination container */}
        <div className="swiper-pagination-bestseller !bottom-0 flex justify-center scale-90 [&_.swiper-pagination-bullet-active]:!bg-gray-900 [&_.swiper-pagination-bullet]:!bg-gray-300" />

      </div>
    </section>
  );
}
