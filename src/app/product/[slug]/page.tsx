'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Heart, ShoppingBag, Star, ShieldCheck, Check, Minus, Plus, 
  ArrowRight, ShieldAlert, Sparkles, RefreshCw, BarChart2 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { api } from '@/lib/api';
import { Product, Review } from '@/lib/mockData';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/home/FeaturedProducts'; // Wait, let's just make sure we import ProductCard correctly:
import SingleProductCard from '@/components/product/ProductCard';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = React.use(params);
  const router = useRouter();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [selectedAttrs, setSelectedAttrs] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [fbtProducts, setFbtProducts] = useState<Product[]>([]);
  
  // Review form states
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewEmail, setReviewEmail] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Zustand Store
  const addToCart = useAppStore((state) => state.addToCart);
  const toggleWishlist = useAppStore((state) => state.toggleWishlist);
  const isInWishlist = useAppStore((state) => state.isInWishlist);
  const toggleCompare = useAppStore((state) => state.toggleCompare);
  const isInCompare = useAppStore((state) => state.isInCompare);

  useEffect(() => {
    setLoading(true);
    api.getProductBySlug(slug).then((prod) => {
      if (prod) {
        setProduct(prod);
        setActiveImage(prod.images[0]);
        setReviewsList(prod.reviews || []);
        
        // Initialize attributes
        const attrs: Record<string, string> = {};
        prod.attributes?.forEach(a => {
          attrs[a.name] = a.options[0];
        });
        setSelectedAttrs(attrs);

        // Fetch related products
        api.getProducts({ per_page: 4 }).then(res => {
          setRelatedProducts(res.products.filter(p => p.id !== prod.id).slice(0, 4));
          setFbtProducts(res.products.filter(p => p.id !== prod.id).slice(0, 2));
        });

        // Add to recently viewed products
        trackRecentlyViewed(prod);
      }
      setLoading(false);
    });
  }, [slug]);

  // Track recently viewed products in localStorage
  const trackRecentlyViewed = (prod: Product) => {
    try {
      const items = localStorage.getItem('empire_recently_viewed');
      let parsed = items ? JSON.parse(items) : [];
      parsed = parsed.filter((p: any) => p.id !== prod.id);
      parsed.unshift({
        id: prod.id,
        name: prod.name,
        slug: prod.slug,
        price: prod.price,
        image: prod.images[0],
        category: prod.category
      });
      localStorage.setItem('empire_recently_viewed', JSON.stringify(parsed.slice(0, 4)));
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 animate-pulse space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-gray-100 aspect-square rounded-3xl" />
          <div className="space-y-4">
            <div className="h-6 w-1/4 bg-gray-100 rounded" />
            <div className="h-10 w-3/4 bg-gray-100 rounded" />
            <div className="h-6 w-1/3 bg-gray-100 rounded" />
            <div className="h-20 w-full bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-20 max-w-xl mx-auto text-center px-4">
        <h2 className="font-heading text-2xl font-bold">Product not found</h2>
        <p className="font-body text-xs text-gray-400 mt-2">The design masterpiece you are looking for has been retired or moved.</p>
        <Button asChild className="mt-6 rounded-full bg-[#111827]">
          <Link href="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  // Calculate dynamic price based on variation selected
  let currentPrice = product.price;
  let currentSku = product.sku;
  let isOutOfStock = product.stockStatus === 'outofstock';

  if (product.variations && product.variations.length > 0) {
    const matched = product.variations.find(v => 
      Object.entries(selectedAttrs).every(([k, val]) => v.attributes[k] === val)
    );
    if (matched) {
      currentPrice = matched.price;
      currentSku = matched.sku;
      isOutOfStock = matched.stockQuantity === 0;
    }
  }

  const isFavorite = isInWishlist(product.id);
  const isCompareChecked = isInCompare(product.id);

  const handleAddToCart = (redirect = false) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: currentPrice,
      regularPrice: product.regularPrice,
      image: product.images[0],
      quantity,
      selectedAttributes: selectedAttrs,
      slug: product.slug,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);

    if (redirect) {
      router.push('/checkout');
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewEmail || !reviewContent) {
      setSubmitStatus('error');
      return;
    }
    setSubmitStatus('loading');
    
    api.submitProductReview({
      productId: product.id,
      reviewer: reviewAuthor,
      reviewerEmail: reviewEmail,
      review: reviewContent,
      rating: reviewRating,
    }).then((res) => {
      if (res.success) {
        setSubmitStatus('success');
        const newRev: Review = {
          id: Date.now(),
          author: reviewAuthor,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
          rating: reviewRating,
          date: new Date().toISOString().split('T')[0],
          title: 'Customer Review',
          content: reviewContent,
          verified: true
        };
        setReviewsList(prev => [newRev, ...prev]);
        setReviewAuthor('');
        setReviewEmail('');
        setReviewContent('');
      } else {
        setSubmitStatus('error');
      }
    });
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-gray-900">Shop</Link>
          <span>/</span>
          <Link href={`/shop/category/${product.categorySlug}`} className="hover:text-gray-900">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-900 truncate max-w-[200px]">{product.name}</span>
        </div>

        {/* Product Brief Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-20">
          
          {/* Left Column: Gallery Carousel with zoom preview */}
          <div className="space-y-4">
            <div className="aspect-[4/5] bg-gray-50 rounded-3xl overflow-hidden relative border border-gray-100 shadow-inner group">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover origin-center transition-transform duration-500 hover:scale-125 cursor-zoom-in"
              />
            </div>
            
            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto py-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                      activeImage === img ? 'border-[#111827] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Specification panel */}
          <div className="space-y-6 lg:pl-4">
            
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">{product.category}</span>
              <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                {product.name}
              </h1>
              
              {/* Rating header */}
              <div className="flex items-center space-x-2">
                <div className="flex space-x-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-[#F59E0B] fill-current' : 'text-gray-200'}`} 
                    />
                  ))}
                </div>
                <span className="font-body text-xs font-bold text-gray-700">{product.rating}</span>
                <span className="text-gray-300">|</span>
                <span className="font-body text-xs text-gray-500">{reviewsList.length} verified reviews</span>
              </div>
            </div>

            {/* Price display */}
            <div className="flex items-baseline space-x-3 py-2 border-y border-gray-100">
              <span className="font-body text-2xl sm:text-3xl font-extrabold text-gray-900">${currentPrice}</span>
              {product.regularPrice && product.regularPrice > currentPrice && (
                <span className="font-body text-sm text-gray-400 line-through">${product.regularPrice}</span>
              )}
              {product.onSale && (
                <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">On Sale</span>
              )}
            </div>

            {/* Short Description */}
            <p className="font-body text-xs sm:text-sm text-gray-500 leading-relaxed font-light">
              {product.shortDescription}
            </p>

            {/* Variant selections */}
            {product.attributes?.map((attr) => (
              <div key={attr.name} className="space-y-2">
                <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  Select {attr.name}
                </span>
                <div className="flex flex-wrap gap-2">
                  {attr.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedAttrs(prev => ({ ...prev, [attr.name]: opt }))}
                      className={`px-4 py-2 rounded-full text-xs font-body border transition-all ${
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

            {/* Quantity Selector and Trust badges */}
            <div className="space-y-4 pt-4 border-t border-gray-50">
              <div className="flex flex-wrap items-center gap-6">
                
                {/* Quantity */}
                <div className="flex items-center border border-gray-100 rounded-full py-2 px-4 bg-gray-50">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={isOutOfStock}
                    className="p-1 text-gray-400 hover:text-gray-900 disabled:opacity-30"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="font-body text-xs font-bold px-4 w-10 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    disabled={isOutOfStock}
                    className="p-1 text-gray-400 hover:text-gray-900 disabled:opacity-30"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* SKU Code */}
                <span className="font-body text-[10px] text-gray-400 uppercase tracking-widest">
                  SKU: <span className="text-gray-700 font-bold">{currentSku}</span>
                </span>
                
              </div>
            </div>

            {/* Buying Action buttons */}
            <div className="space-y-3 pt-2">
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleAddToCart(false)}
                  disabled={isOutOfStock || added}
                  className={`flex-1 rounded-full py-6 font-body text-xs sm:text-sm uppercase tracking-wider font-bold ${
                    added ? 'bg-[#10B981]' : 'bg-[#111827] hover:bg-gray-800 text-white'
                  }`}
                >
                  {isOutOfStock ? 'Sold Out' : added ? 'Added to Cart' : 'Add to Cart'}
                </Button>
                
                <Button 
                  onClick={() => handleAddToCart(true)}
                  disabled={isOutOfStock}
                  className="flex-1 rounded-full py-6 font-body text-xs sm:text-sm uppercase tracking-wider font-bold bg-[#2563EB] hover:bg-blue-700 text-white"
                >
                  Buy Now
                </Button>
              </div>

              {/* Utility actions: Wishlist & Compare */}
              <div className="flex justify-between items-center text-xs font-body text-gray-500 pt-2 px-2">
                <button 
                  onClick={() => toggleWishlist(product)}
                  className="flex items-center hover:text-red-500 transition-colors"
                >
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'text-red-500 fill-current' : ''}`} />
                  {isFavorite ? 'Saved in Wishlist' : 'Add to Wishlist'}
                </button>
                <button 
                  onClick={() => toggleCompare(product)}
                  className="flex items-center hover:text-[#2563EB] transition-colors"
                >
                  <BarChart2 className={`h-4 w-4 mr-2 ${isCompareChecked ? 'text-[#2563EB]' : ''}`} />
                  {isCompareChecked ? 'Remove from Compare' : 'Compare Product'}
                </button>
              </div>
            </div>

            {/* Security labels */}
            <div className="grid grid-cols-3 gap-2 bg-gray-50/50 rounded-2xl p-4 text-center border border-gray-50">
              <div className="flex flex-col items-center gap-1">
                <Sparkles className="h-4 w-4 text-[#2563EB]" />
                <span className="font-body text-[9px] font-bold text-gray-700 uppercase">Premium Quality</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw className="h-4 w-4 text-[#2563EB]" />
                <span className="font-body text-[9px] font-bold text-gray-700 uppercase">30-Day Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
                <span className="font-body text-[9px] font-bold text-gray-700 uppercase">Secure Checkout</span>
              </div>
            </div>

          </div>
        </div>

        {/* Tabs System: Description, Specs, Reviews, FAQs */}
        <div className="mb-20">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="flex border-b border-gray-100 bg-transparent p-0 rounded-none w-full justify-start space-x-6">
              {['description', 'specifications', 'reviews', 'faqs'].map((t) => (
                <TabsTrigger
                  key={t}
                  value={t}
                  className="font-heading text-xs uppercase tracking-widest pb-3 rounded-none border-b-2 border-transparent bg-transparent hover:text-gray-900 data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 data-[state=active]:shadow-none font-bold text-gray-400"
                >
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="description" className="py-8 font-body text-xs sm:text-sm text-gray-500 leading-relaxed font-light space-y-4">
              <p>{product.description}</p>
            </TabsContent>

            <TabsContent value="specifications" className="py-8">
              <div className="max-w-xl border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-xs font-body">
                  <tbody>
                    {Object.entries(product.specifications || {}).map(([key, value], idx) => (
                      <tr key={key} className={idx % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}>
                        <td className="px-6 py-4 font-bold text-gray-900 w-1/3 border-b border-gray-50">{key}</td>
                        <td className="px-6 py-4 text-gray-500 border-b border-gray-50">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="py-8 space-y-10">
              {/* Reviews List */}
              <div className="space-y-6">
                <h3 className="font-heading text-sm font-bold text-gray-900">Verified Reviews ({reviewsList.length})</h3>
                {reviewsList.length === 0 ? (
                  <p className="font-body text-xs text-gray-400">There are no reviews for this product yet. Be the first to share your experience.</p>
                ) : (
                  <div className="space-y-4 max-w-2xl">
                    {reviewsList.map((rev) => (
                      <div key={rev.id} className="p-5 border border-gray-50 rounded-2xl shadow-sm space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-3 w-3 ${i < rev.rating ? 'text-[#F59E0B] fill-current' : 'text-gray-200'}`} 
                              />
                            ))}
                          </div>
                          {rev.verified && (
                            <span className="text-[9px] font-bold text-[#10B981] bg-[#10B981]/5 px-2 py-0.5 rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                        <h4 className="font-heading text-xs font-bold text-gray-900">{rev.title}</h4>
                        <p className="font-body text-xs text-gray-500 leading-relaxed font-light">{rev.content}</p>
                        <div className="pt-2 flex items-center space-x-2 text-[10px] text-gray-400 font-body">
                          <span className="font-bold text-gray-600">{rev.author}</span>
                          <span>•</span>
                          <span>{rev.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Review Input Form */}
              <div className="max-w-xl border border-gray-100 rounded-3xl p-6 sm:p-8 bg-gray-50/50">
                <h3 className="font-heading text-sm font-bold text-gray-900 mb-6">Write a Review</h3>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Name</label>
                      <input 
                        type="text" 
                        value={reviewAuthor} 
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        className="w-full bg-white border border-gray-100 rounded-full py-2 px-4 text-xs font-body" 
                        required 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Email</label>
                      <input 
                        type="email" 
                        value={reviewEmail} 
                        onChange={(e) => setReviewEmail(e.target.value)}
                        className="w-full bg-white border border-gray-100 rounded-full py-2 px-4 text-xs font-body" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Rating</label>
                    <div className="flex space-x-1.5 pt-1">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setReviewRating(num)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star className={`h-5 w-5 ${num <= reviewRating ? 'text-[#F59E0B] fill-current' : 'text-gray-200'}`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Review content</label>
                    <textarea 
                      rows={4}
                      value={reviewContent}
                      onChange={(e) => setReviewContent(e.target.value)}
                      className="w-full bg-white border border-gray-100 rounded-2xl py-3 px-4 text-xs font-body focus:outline-none" 
                      required 
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={submitStatus === 'loading'}
                    className="rounded-full bg-[#111827] text-white hover:bg-gray-800 font-body text-xs uppercase tracking-wider px-8"
                  >
                    {submitStatus === 'loading' ? 'Submitting...' : 'Submit Review'}
                  </Button>

                  {submitStatus === 'success' && <p className="text-xs text-[#10B981] font-semibold mt-2">Thank you! Your review has been submitted successfully.</p>}
                  {submitStatus === 'error' && <p className="text-xs text-[#EF4444] mt-2">Failed to submit review. Please try again.</p>}
                </form>
              </div>
            </TabsContent>

            <TabsContent value="faqs" className="py-8 space-y-4 max-w-2xl">
              {product.faqs?.map((faq, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-4">
                  <h4 className="font-heading text-xs sm:text-sm font-bold text-gray-900">{faq.question}</h4>
                  <p className="font-body text-xs text-gray-500 font-light mt-1.5 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-gray-50 pt-16 mb-20">
            <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight mb-8">Related Masterpieces</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((p) => (
                <SingleProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
