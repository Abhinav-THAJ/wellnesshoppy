'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Star, Check, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { Product } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [mounted, setMounted] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [selectedAttrs, setSelectedAttrs] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // Store actions
  const wishlist = useAppStore((state) => state.wishlist);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const isInWishlist = useAppStore((state) => state.isInWishlist);
  const addToCart = useAppStore((state) => state.addToCart);

  useEffect(() => {
    setMounted(true);
    // Set default attributes
    if (product.attributes?.length > 0) {
      const defaults: Record<string, string> = {};
      product.attributes.forEach((attr) => {
        defaults[attr.name] = attr.options[0];
      });
      setSelectedAttrs(defaults);
    }
  }, [product]);

  if (!mounted) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse">
        <div className="bg-gray-100 aspect-square rounded-xl mb-4" />
        <div className="h-4 w-3/4 bg-gray-100 rounded mb-2" />
        <div className="h-3 w-1/2 bg-gray-100 rounded" />
      </div>
    );
  }

  const isFavorite = isInWishlist(product.id);

  const handleAddToCart = () => {
    // Check if variations match attributes
    let finalPrice = product.price;
    let sku = product.sku;
    
    if (product.variations && product.variations.length > 0) {
      const match = product.variations.find(v => 
        Object.entries(selectedAttrs).every(([k, val]) => v.attributes[k] === val)
      );
      if (match) {
        finalPrice = match.price;
        sku = match.sku;
      }
    }

    addToCart({
      productId: product.id,
      name: product.name,
      price: finalPrice,
      regularPrice: product.regularPrice,
      image: product.images[0],
      quantity,
      selectedAttributes: selectedAttrs,
      slug: product.slug,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <div className="group relative bg-white border border-gray-50 hover:border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full">
        <div>
          {/* Image Container */}
          <div className="relative aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden mb-4">
            <Link href={`/product/${product.slug}`} className="block h-full w-full">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </Link>

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              {product.onSale && (
                <span className="bg-[#EF4444] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                  Sale
                </span>
              )}
              {product.newArrival && (
                <span className="bg-[#2563EB] text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                  New
                </span>
              )}
            </div>

            {/* Favorite / Wishlist Button */}
            <button 
              onClick={() => toggleWishlist(product)}
              className={`absolute top-3 right-3 p-2 bg-white rounded-full shadow-md z-10 transition-colors ${
                isFavorite ? 'text-red-500 hover:bg-red-50' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Add to Wishlist"
            >
              <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
            </button>

            {/* Action Overlays */}
            <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 px-4">
              <Button 
                onClick={() => setQuickViewOpen(true)}
                className="bg-white/95 backdrop-blur-sm text-gray-900 hover:bg-white rounded-full p-3 shadow-md flex-1 text-xs uppercase tracking-wider font-body font-semibold h-10 border border-gray-100"
              >
                <Eye className="h-4 w-4 mr-2" /> Quick View
              </Button>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              {product.category}
            </span>
            <h3 className="font-heading text-xs sm:text-sm font-bold text-gray-900 hover:text-[#2563EB] transition-colors truncate">
              <Link href={`/product/${product.slug}`}>{product.name}</Link>
            </h3>
            
            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center space-x-1 py-0.5">
                <Star className="h-3 w-3 text-[#F59E0B] fill-current" />
                <span className="text-[10px] text-gray-500 font-body font-bold">{product.rating}</span>
                <span className="text-[10px] text-gray-300 font-body">({product.reviewCount})</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom pricing and add to cart */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-50">
          <div className="flex items-baseline space-x-1.5">
            <span className="font-body text-sm font-bold text-gray-900">${product.price}</span>
            {product.regularPrice && product.regularPrice > product.price && (
              <span className="font-body text-[11px] text-gray-400 line-through">${product.regularPrice}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            disabled={added}
            className={`p-2 rounded-full border transition-all ${
              added 
                ? 'bg-[#10B981] border-[#10B981] text-white' 
                : 'bg-white border-gray-100 hover:bg-[#111827] hover:border-[#111827] text-gray-900 hover:text-white'
            }`}
            aria-label="Add to Cart"
          >
            {added ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Quick View Dialog Modal */}
      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <DialogContent className="max-w-3xl w-[95%] bg-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 border-none shadow-2xl overflow-y-auto max-h-[90vh]">
          {/* Left Gallery */}
          <div className="flex-1 max-w-sm mx-auto w-full">
            <div className="aspect-[4/5] bg-gray-50 rounded-2xl overflow-hidden relative shadow-inner">
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Info */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <DialogHeader className="p-0 text-left">
                <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                  {product.category}
                </span>
                <DialogTitle className="font-heading text-lg sm:text-2xl font-extrabold text-gray-900 leading-tight">
                  {product.name}
                </DialogTitle>
              </DialogHeader>

              {/* Pricing & Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline space-x-2">
                  <span className="font-body text-xl font-bold text-gray-900">${product.price}</span>
                  {product.regularPrice && product.regularPrice > product.price && (
                    <span className="font-body text-xs text-gray-400 line-through">${product.regularPrice}</span>
                  )}
                </div>
                {product.rating > 0 && (
                  <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-lg">
                    <Star className="h-3.5 w-3.5 text-[#F59E0B] fill-current" />
                    <span className="text-xs font-bold text-gray-700">{product.rating}</span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <p className="font-body text-xs text-gray-500 leading-relaxed font-light">
                {product.shortDescription}
              </p>

              {/* Attributes Selection */}
              {product.attributes?.map((attr) => (
                <div key={attr.name} className="space-y-2">
                  <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    {attr.name}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {attr.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedAttrs(prev => ({ ...prev, [attr.name]: opt }))}
                        className={`px-3 py-1.5 rounded-full text-xs font-body border transition-all ${
                          selectedAttrs[attr.name] === opt
                            ? 'bg-[#111827] border-[#111827] text-white'
                            : 'bg-white border-gray-100 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Quantity Selector */}
              <div className="space-y-2">
                <span className="font-heading text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Quantity
                </span>
                <div className="flex items-center border border-gray-100 rounded-full py-1.5 px-3 bg-gray-50 w-28 justify-between">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="p-1 text-gray-400 hover:text-gray-900"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-body text-xs font-bold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="p-1 text-gray-400 hover:text-gray-900"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <Button 
                onClick={handleAddToCart}
                disabled={added}
                className={`rounded-full py-6 font-body text-xs sm:text-sm uppercase tracking-wider ${
                  added ? 'bg-[#10B981]' : 'bg-[#111827] hover:bg-gray-800 text-white'
                }`}
              >
                {added ? 'Added to Cart' : 'Add to Cart'}
              </Button>
              <Button 
                asChild
                variant="outline"
                className="rounded-full py-6 font-body text-xs sm:text-sm uppercase tracking-wider border-gray-200"
              >
                <Link href={`/product/${product.slug}`} onClick={() => setQuickViewOpen(false)}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
