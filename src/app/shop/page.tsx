'use client';

import React, { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Product } from '@/lib/mockData';
import ProductCard from '@/components/product/ProductCard';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { ChevronDown, SlidersHorizontal, Grid, RotateCcw } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [selectedCat, setSelectedCat] = useState<string>('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 3000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>('date-desc'); // date-desc, price-asc, price-desc, rating-desc
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  useEffect(() => {
    // Load Categories
    api.getCategories().then(res => setCategories(res));
  }, []);

  useEffect(() => {
    setLoading(true);
    
    // Parse orderby parameters
    let orderby = 'date';
    let order: 'asc' | 'desc' = 'desc';

    if (sortBy === 'price-asc') {
      orderby = 'price';
      order = 'asc';
    } else if (sortBy === 'price-desc') {
      orderby = 'price';
      order = 'desc';
    } else if (sortBy === 'rating-desc') {
      orderby = 'rating';
      order = 'desc';
    }

    api.getProducts({
      category: selectedCat || undefined,
      orderby,
      order,
      page: currentPage,
      per_page: 9
    }).then((res) => {
      // client-side auxiliary filtering for price range and rating because mock db supports it
      let filtered = res.products;
      
      // price filter
      filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
      
      // rating filter
      if (selectedRating !== null) {
        filtered = filtered.filter(p => p.rating >= selectedRating);
      }

      // availability
      if (inStockOnly) {
        filtered = filtered.filter(p => p.stockStatus === 'instock');
      }

      setProducts(filtered);
      setTotalPages(res.totalPages);
      setLoading(false);
    });
  }, [selectedCat, priceRange, selectedRating, inStockOnly, sortBy, currentPage]);

  const handleResetFilters = () => {
    setSelectedCat('');
    setPriceRange([0, 3000]);
    setSelectedRating(null);
    setInStockOnly(false);
    setSortBy('date-desc');
    setCurrentPage(1);
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'price-asc': return 'Price: Low to High';
      case 'price-desc': return 'Price: High to Low';
      case 'rating-desc': return 'Highly Rated';
      default: return 'Newest Arrivals';
    }
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Title */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">Atelier Catalog</h1>
          <p className="font-body text-xs sm:text-sm text-muted-foreground font-light mt-2">Browse the complete spectrum of design masterworks.</p>
        </div>

        {/* Toolbar */}
        <div className="flex justify-between items-center border-b border-gray-100 pb-5 mb-8">
          <div className="flex items-center space-x-4">
            {/* Filter Toggle on Mobile */}
            <Button 
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="lg:hidden bg-background text-primary hover:bg-muted border border-gray-100 rounded-full text-xs font-body uppercase tracking-wider py-2 px-5"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
            </Button>
            <span className="font-body text-xs text-gray-400 font-medium">
              Showing {products.length} architectural products
            </span>
          </div>

          {/* Sort Menu */}
          <div className="flex items-center space-x-2">
            <span className="font-body text-xs text-gray-400 hidden sm:inline">Sort by:</span>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center font-body text-xs font-bold text-primary hover:opacity-75 uppercase tracking-wider border border-gray-100 px-4 py-2 rounded-full outline-none">
                {getSortLabel()} <ChevronDown className="ml-1 h-3.5 w-3.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-100 shadow-lg rounded-xl">
                <DropdownMenuItem onClick={() => setSortBy('date-desc')} className="text-xs font-body cursor-pointer">Newest Arrivals</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-asc')} className="text-xs font-body cursor-pointer">Price: Low to High</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price-desc')} className="text-xs font-body cursor-pointer">Price: High to Low</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('rating-desc')} className="text-xs font-body cursor-pointer">Highly Rated</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Catalog Body */}
        <div className="flex gap-10 items-start">
          
          {/* Left Column: Desktop Filters Sidebar */}
          <aside className={`lg:w-64 flex-shrink-0 space-y-8 sticky top-28 ${
            showFiltersMobile 
              ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto block' 
              : 'hidden lg:block'
          }`}>
            {showFiltersMobile && (
              <div className="flex justify-between items-center mb-6 lg:hidden">
                <h3 className="font-heading text-lg font-bold">Filters</h3>
                <button onClick={() => setShowFiltersMobile(false)} className="p-2 border rounded-full">
                  ✕
                </button>
              </div>
            )}

            {/* Filter Group: Categories */}
            <div className="space-y-3">
              <h4 className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Categories</h4>
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => setSelectedCat('')}
                  className={`text-left text-xs font-body transition-colors py-1 ${
                    selectedCat === '' ? 'text-secondary font-bold' : 'text-muted-foreground hover:text-primary'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCat(cat.slug);
                      setCurrentPage(1);
                      if (showFiltersMobile) setShowFiltersMobile(false);
                    }}
                    className={`text-left text-xs font-body transition-colors py-1 flex justify-between items-center ${
                      selectedCat === cat.slug ? 'text-secondary font-bold' : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] text-gray-400 font-normal">({cat.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Price Range */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Price Threshold</h4>
                <span className="font-body text-[10px] font-bold">${priceRange[0]} - ${priceRange[1]}</span>
              </div>
              <Slider 
                defaultValue={[0, 3000]}
                max={3000}
                step={50}
                value={priceRange}
                onValueChange={(val) => setPriceRange(val as number[])}
                className="w-full"
              />
            </div>

            {/* Filter Group: Star Ratings */}
            <div className="space-y-3">
              <h4 className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Average Rating</h4>
              <div className="flex flex-col space-y-1.5">
                {[5, 4, 3].map((stars) => (
                  <button
                    key={stars}
                    onClick={() => setSelectedRating(selectedRating === stars ? null : stars)}
                    className={`text-left text-xs font-body py-1 flex items-center space-x-2 transition-colors ${
                      selectedRating === stars ? 'text-secondary font-bold' : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <span>★ {stars}.0 & Up</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter Group: Availability */}
            <div className="flex items-center space-x-2.5 pt-4 border-t border-gray-100">
              <Checkbox 
                id="stock" 
                checked={inStockOnly}
                onCheckedChange={(checked) => setInStockOnly(!!checked)}
              />
              <label htmlFor="stock" className="font-body text-xs text-muted-foreground font-medium cursor-pointer select-none">
                In Stock Only
              </label>
            </div>

            {/* Reset Button */}
            <Button 
              onClick={handleResetFilters}
              variant="outline"
              className="w-full rounded-full font-body text-xs uppercase tracking-wider py-4 border-gray-200"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-2" /> Reset Filters
            </Button>
          </aside>

          {/* Right Column: Products Grid */}
          <div className="flex-grow">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="bg-white border rounded-2xl h-80 animate-pulse p-4" />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-background/50 rounded-3xl p-8 border border-gray-50">
                <div className="w-28 h-28 mx-auto mb-4">
                  <img src="/images/illustrations/empty.png" alt="No results" className="object-contain w-full h-full" />
                </div>
                <h3 className="font-heading text-lg font-bold text-primary">No architectural items found</h3>
                <p className="font-body text-xs text-gray-400 font-light mt-1 max-w-xs mx-auto">
                  Try clearing your filter parameters or exploring other design categories.
                </p>
                <Button 
                  onClick={handleResetFilters}
                  className="bg-primary text-white hover:bg-primary rounded-full font-body text-xs uppercase tracking-wider px-6 mt-6 h-10"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2 mt-12 pt-8 border-t border-gray-50">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border rounded-full text-xs font-body disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="font-body text-xs font-semibold px-4">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 border rounded-full text-xs font-body disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
