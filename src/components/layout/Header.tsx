'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, Heart, ShoppingBag, ChevronDown, ChevronRight,
  Trash2, Plus, Minus, ArrowRight, Mic, Bell, Menu
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { 
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose 
} from '@/components/ui/sheet';

const MEGA_MENU_CATEGORIES = [
  { id: 'womens-fashion', name: "Women's Fashion" },
  { id: 'mens-fashion', name: "Men's Fashion" },
  { id: 'kids-fashion', name: "Kid's Fashion" },
  { id: 'home-kitchen', name: "Home & Kitchen" },
  { id: 'beauty', name: "Beauty" },
  { id: 'gadgets', name: "Gadgets" },
  { id: 'accessories', name: "Accessories" },
  { id: 'health-wellness', name: "Health & Wellness" },
];

const WOMENS_FASHION_DATA = [
  {
    column: 1,
    blocks: [
      {
        title: "Shop All Ethnic Wear",
        links: ["Kurtis & Kurtas", "Suits", "Sarees", "Lehengas", "Bottoms", "Blouses & Fabrics", "Dupattas", "Ethnic dresses"]
      },
      {
        title: "Shop All Western Wear",
        links: ["Tops & T-shirts", "Dresses", "Jeans", "Shirts", "Trousers"]
      }
    ]
  },
  {
    column: 2,
    blocks: [
      {
        title: "",
        links: ["Skirts", "Shorts", "Jackets & Blazers", "Leggings", "Capris", "Jumpsuits", "Shrugs", "Sweaters", "Sweatshirts"]
      },
      {
        title: "Activewear & Sportswear",
        links: ["T-shirts", "Shorts", "Sets", "Jackets", "Track Pants"]
      }
    ]
  },
  {
    column: 3,
    blocks: [
      {
        title: "",
        links: ["Innerwear"]
      },
      {
        title: "Lingerie & Lounge Sets",
        links: ["Bras", "Panties", "Lingerie Sets", "Camisoles", "Sleepwear & Robes", "Shapewear", "Swimwear"]
      },
      {
        title: "Shop All Footwear",
        links: ["Casual Footwear", "Boots", "Sneakers", "Flip Flops", "Sports Shoes"]
      }
    ]
  },
  {
    column: 4,
    blocks: [
      {
        title: "",
        links: ["Ethnic Footwear"]
      },
      {
        title: "Bags, Wallets & Clutches",
        links: ["Handbags", "Tote Bags", "Sling Bags", "Backpacks", "Wallets", "Clutches", "Premium Handbags"]
      },
      {
        title: "Jewellery",
        links: ["Gold", "Diamond", "Silver", "Fashion Jewellery"]
      },
      {
        title: "Watches",
        links: []
      }
    ]
  }
];

export default function Header() {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuData, setMenuData] = useState<any>(null);
  
  // Mega Menu State
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState('womens-fashion');

  // Zustand store selectors
  const cart = useAppStore((state) => state.cart);
  const wishlist = useAppStore((state) => state.wishlist);
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const updateQuantity = useAppStore((state) => state.updateCartQuantity);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    api.getNavigation().then(res => setMenuData(res));
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-40 w-full flex flex-col font-sans">
      
      {/* Top Bar - Black */}
      <div className="bg-black text-white text-[12px] font-medium py-2.5 px-4 sm:px-6 lg:px-8 flex justify-between items-center z-50 relative">
        <div className="flex items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity font-semibold">
            Wellnesshoppy
          </Link>
        </div>
        <div className="flex items-center space-x-7">
          <Link href="/cliq-cash" className="hidden md:block hover:opacity-80 transition-opacity font-semibold">CLiQ Cash</Link>
          <Link href="/gift-card" className="hidden md:block hover:opacity-80 transition-opacity font-semibold">Gift Card</Link>
          <Link href="/cliq-care" className="hidden md:block hover:opacity-80 transition-opacity font-semibold">CLiQ Care</Link>
          <Link href="/track-orders" className="hidden md:block hover:opacity-80 transition-opacity font-semibold">Track Orders</Link>
          
          {user ? (
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Hi, {user.displayName}</span>
              <span className="text-gray-500">/</span>
              <button onClick={logout} className="hover:opacity-80 transition-opacity font-semibold">Logout</button>
            </div>
          ) : (
            <Link href="/auth/login" className="hover:opacity-80 transition-opacity font-semibold">
              Sign in / Sign Up
            </Link>
          )}
        </div>
      </div>

      {/* Main Header - Dark Grey */}
      <header className="bg-[#212121] text-white transition-all duration-300 border-t border-[#333333]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-stretch h-[72px]">
          <div className="flex items-center justify-between w-full h-full">
            
            {/* Logo */}
            <div className="flex-shrink-0 mr-8 flex items-center h-full">
              <Link href="/" className="flex flex-col items-start leading-none gap-0.5">
                <span className="text-white font-extrabold text-[8px] sm:text-[11px] tracking-widest ml-0.5 opacity-90">THE</span>
                <span className="text-white font-extrabold text-lg sm:text-2xl tracking-tight flex items-center">
                  WELLNESS <span className="ml-1.5 text-lg sm:text-[22px] font-normal tracking-normal text-pink-500">H</span>
                  <span className="text-lg sm:text-[22px] font-normal tracking-normal text-pink-600">O</span>
                  <span className="text-lg sm:text-[22px] font-normal tracking-normal text-purple-500">P</span>
                  <span className="text-lg sm:text-[22px] font-normal tracking-normal text-blue-500">P</span>
                  <span className="text-lg sm:text-[22px] font-normal tracking-normal text-cyan-400">Y</span>
                </span>
              </Link>
            </div>

            {/* Middle Section (Nav + Search) */}
            <div className="flex-1 flex items-stretch max-w-[900px] ml-2 sm:ml-4 h-full">
              
              {/* Categories & Brands Nav */}
              <nav className="hidden lg:flex mr-6 items-stretch h-full">
                {/* Categories Dropdown Tab */}
                <div 
                  className={`relative flex items-center px-4 cursor-pointer transition-colors ${
                    isCategoriesOpen ? 'bg-white text-black' : 'text-white hover:bg-[#333333]'
                  }`}
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                  <div className="flex items-center text-[15px] font-bold tracking-wide">
                    Categories 
                    <ChevronDown className={`ml-1.5 h-4 w-4 transition-transform ${isCategoriesOpen ? 'rotate-180 text-black' : 'text-white'}`} strokeWidth={3} />
                  </div>

                  {/* Mega Menu Dropdown */}
                  {isCategoriesOpen && (
                    <div 
                      className="absolute top-full left-0 w-[950px] bg-white text-black shadow-2xl flex z-50 cursor-default"
                    >
                      {/* Left Sidebar */}
                      <div className="w-[240px] border-r border-gray-200 py-4 flex flex-col bg-white">
                        {MEGA_MENU_CATEGORIES.map(cat => (
                          <div 
                            key={cat.id}
                            onMouseEnter={() => setActiveCategoryTab(cat.id)}
                            className={`px-6 py-3 text-[14px] flex justify-between items-center transition-colors cursor-pointer ${
                              activeCategoryTab === cat.id ? 'font-bold bg-gray-50' : 'font-medium text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            {cat.name}
                            {activeCategoryTab === cat.id && <ChevronRight className="h-4 w-4 text-gray-400" />}
                          </div>
                        ))}
                      </div>

                      {/* Right Content Area */}
                      <div className="flex-1 p-8 grid grid-cols-4 gap-6 bg-white min-h-[450px]">
                        {activeCategoryTab === 'womens-fashion' ? (
                          WOMENS_FASHION_DATA.map((col, i) => (
                            <div key={i} className="flex flex-col space-y-6">
                              {col.blocks.map((block, j) => (
                                <div key={j} className="flex flex-col space-y-3">
                                  {block.title && (
                                    <Link href="/shop" className="text-[13px] font-bold text-gray-900 hover:text-black">
                                      {block.title}
                                    </Link>
                                  )}
                                  {block.links.length > 0 && (
                                    <div className="flex flex-col space-y-2.5">
                                      {block.links.map((link, k) => (
                                        <Link key={k} href="/shop" className="text-[13px] text-gray-500 hover:text-gray-900 transition-colors">
                                          {link}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))
                        ) : (
                          <div className="col-span-4 flex items-center justify-center text-gray-400 font-medium h-full">
                            More categories coming soon...
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

              </nav>

              {/* Search Bar */}
              <div className="flex-1 relative group min-w-0 sm:min-w-[300px] flex items-center h-full hidden md:flex">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center w-full">
                  <div className="absolute left-3.5 text-gray-400">
                    <Search className="h-[18px] w-[18px]" strokeWidth={2} />
                  </div>
                  <input
                    type="text"
                    placeholder="Search for Products"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-[#333333] text-sm text-white placeholder-gray-400 border-none rounded-[4px] py-2.5 pl-11 pr-12 focus:outline-none focus:ring-1 focus:ring-gray-400 transition-all"
                  />
                  <div className="absolute right-3.5 text-gray-400 cursor-pointer hover:text-white transition-colors">
                    <Mic className="h-[18px] w-[18px]" strokeWidth={2} />
                  </div>
                </form>
              </div>
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center space-x-3 sm:space-x-6 ml-2 sm:ml-8 h-full">
              <button className="text-white hover:text-gray-300 transition-colors hidden sm:block" aria-label="Notifications">
                <Bell className="h-[22px] w-[22px]" strokeWidth={1.5} />
              </button>
              
              <Link href="/dashboard?tab=wishlist" className="text-white hover:text-gray-300 transition-colors relative" aria-label="Wishlist">
                <Heart className="h-[22px] w-[22px]" strokeWidth={1.5} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-white text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Sheet>
                <SheetTrigger render={<button className="text-white hover:text-gray-300 transition-colors relative" aria-label="Cart" />}>
                  <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-white text-black text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md bg-white border-l border-gray-100 flex flex-col p-6 rounded-l-2xl text-black z-50">
                  <SheetHeader className="pb-4 border-b border-gray-100">
                    <SheetTitle className="font-bold flex justify-between items-center text-black">
                      Cart ({cartCount})
                    </SheetTitle>
                  </SheetHeader>

                  {/* Cart Body */}
                  <div className="flex-1 overflow-y-auto py-4 space-y-4">
                    {cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-6 text-black">
                        <h3 className="font-bold mb-1">Your cart is empty</h3>
                        <SheetClose render={<Link href="/shop" />}>
                          <Button asChild className="mt-4 bg-black text-white px-6 rounded-full">
                            <span>Start Shopping</span>
                          </Button>
                        </SheetClose>
                      </div>
                    ) : (
                      cart.map((item) => (
                        <div key={item.id} className="flex space-x-4 pb-4 border-b border-gray-50 items-start text-black">
                          <div className="w-16 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 relative">
                            <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 truncate">
                              <Link href={`/product/${item.slug}`}>{item.name}</Link>
                            </h4>
                            {item.selectedAttributes && (
                              <p className="text-xs text-gray-500 mt-0.5">
                                {Object.entries(item.selectedAttributes).map(([k, v]) => `${k}: ${v}`).join(' / ')}
                              </p>
                            )}
                            <div className="flex items-center justify-between mt-2.5">
                              <div className="flex items-center border border-gray-200 rounded-full py-0.5 px-2 bg-gray-50">
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-gray-500">
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="text-xs font-semibold px-2">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-gray-500">
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                              <span className="text-sm font-bold text-gray-900">${item.price * item.quantity}</span>
                            </div>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="p-1 text-gray-400 hover:text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Cart Footer */}
                  {cart.length > 0 && (
                    <div className="pt-4 border-t border-gray-100 space-y-4 text-black">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-500">Subtotal</span>
                        <span className="text-lg font-bold text-gray-900">${cartTotal}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <SheetClose render={<Link href="/cart" />}>
                          <Button asChild variant="outline" className="rounded-full py-5 border-gray-200 text-black">
                            <span>View Cart</span>
                          </Button>
                        </SheetClose>
                        <SheetClose render={<Link href="/checkout" />}>
                          <Button asChild className="rounded-full bg-black text-white py-5 hover:bg-gray-800">
                            <span>Checkout</span>
                          </Button>
                        </SheetClose>
                      </div>
                    </div>
                  )}
                </SheetContent>
              </Sheet>

              {/* Mobile Menu Slide */}
              <Sheet>
                <SheetTrigger render={<button className="p-2 lg:hidden text-white ml-2" aria-label="Menu" />}>
                  <Menu className="h-6 w-6" />
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-xs bg-white text-black p-6 z-50">
                  <SheetHeader className="pb-4 border-b border-gray-100">
                    <SheetTitle className="font-bold text-black">WELLNESSHOPPY</SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto py-6">
                    <nav className="space-y-4 flex flex-col">
                      <Link href="/shop" className="text-sm font-semibold text-gray-900">Shop All</Link>
                      {menuData?.categories?.map((item: any) => (
                        <Link key={item.name} href={item.href} className="text-sm text-gray-600">{item.name}</Link>
                      ))}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}
