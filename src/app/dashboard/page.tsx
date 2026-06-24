'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  User, ShoppingBag, Heart, MapPin, Settings, LogOut, 
  ChevronRight, Calendar, CreditCard, Box, Check, RefreshCw 
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProductCard from '@/components/product/ProductCard';

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // overview, orders, addresses, wishlist, settings

  // Zustand Store selectors
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const wishlist = useAppStore((state) => state.wishlist);
  const logout = useAppStore((state) => state.logout);

  // Address Form States
  const [address, setAddress] = useState({
    street: '72 Wall Street, Penthouse B',
    city: 'New York',
    state: 'NY',
    zip: '10005',
    country: 'United States'
  });
  const [saveStatus, setSaveStatus] = useState(false);

  // User Profile Form States
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: ''
  });
  const [profileSaveStatus, setProfileSaveStatus] = useState(false);

  // Prepopulate mock orders
  const mockOrders = [
    {
      id: "92831",
      date: "2026-06-18",
      total: 399,
      status: "In Transit",
      method: "Credit Card ending in 4242",
      items: [{ name: "AeroSound Pro Max ANC Headphones", qty: 1, price: 399 }]
    },
    {
      id: "87123",
      date: "2026-04-12",
      total: 1850,
      status: "Delivered",
      method: "Credit Card ending in 4242",
      items: [{ name: "Soren Bauhaus Leather Lounge Chair", qty: 1, price: 1850 }]
    }
  ];

  useEffect(() => {
    setMounted(true);
    
    // Read query tab if set
    const tabQuery = searchParams.get('tab');
    if (tabQuery) {
      setActiveTab(tabQuery);
    }
  }, [searchParams]);

  useEffect(() => {
    if (mounted && !user) {
      router.push('/auth/login');
    } else if (user) {
      setProfile({
        name: user.displayName || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: ''
      });
    }
  }, [user, mounted, router]);

  if (!mounted || !user) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 animate-pulse">
        <div className="h-64 bg-gray-100 rounded-3xl" />
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaveStatus(true);
    setUser({
      ...user,
      displayName: profile.name,
      email: profile.email
    });
    setTimeout(() => setProfileSaveStatus(false), 2000);
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Atelier Dashboard</h1>
            <p className="font-body text-xs text-gray-500 font-light mt-1">Manage credentials, review purchases, and catalog wishlists.</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center text-xs font-body uppercase font-bold text-red-500 hover:opacity-75 transition-opacity border border-red-100 hover:border-red-500 px-4 py-2 rounded-full"
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
          
          {/* Sidebar Menu */}
          <aside className="border border-gray-100 rounded-3xl p-5 bg-gray-50/50 space-y-1">
            <h4 className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4 pb-3">Menu Options</h4>
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'orders', label: 'Order History', icon: ShoppingBag },
              { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
              { id: 'wishlist', label: 'Active Wishlist', icon: Heart },
              { id: 'settings', label: 'Profile Settings', icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-full text-xs font-body uppercase tracking-wider font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#111827] text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </aside>

          {/* Tab Content Display */}
          <div className="lg:col-span-3 border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm min-h-[400px]">
            
            {/* 1. Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-lg sm:text-xl font-extrabold text-gray-900 leading-tight">Welcome, {user.displayName}</h3>
                  <p className="font-body text-xs text-gray-400 font-light mt-1">Email: <span className="font-semibold text-gray-600">{user.email}</span></p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-5 border border-gray-100 rounded-2xl flex flex-col justify-between h-28 shadow-sm">
                    <span className="font-heading text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Wishlist</span>
                    <span className="font-body text-2xl font-extrabold text-gray-900">{wishlist.length} items</span>
                  </div>
                  <div className="p-5 border border-gray-100 rounded-2xl flex flex-col justify-between h-28 shadow-sm">
                    <span className="font-heading text-[10px] font-bold text-gray-400 uppercase tracking-widest">Completed orders</span>
                    <span className="font-body text-2xl font-extrabold text-gray-900">{mockOrders.length} orders</span>
                  </div>
                  <div className="p-5 border border-gray-100 rounded-2xl flex flex-col justify-between h-28 shadow-sm">
                    <span className="font-heading text-[10px] font-bold text-gray-400 uppercase tracking-widest">Session Authority</span>
                    <span className="font-body text-xs font-semibold text-[#10B981] truncate uppercase mt-2">Active Web Token</span>
                  </div>
                </div>

                <div className="pt-4 space-y-4">
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 pb-2">Recent Order Trace</h4>
                  <div className="flex justify-between items-center bg-gray-50/50 p-4 border border-gray-50 rounded-2xl text-xs font-body">
                    <div>
                      <p className="font-bold text-gray-900">Order #{mockOrders[0].id}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{mockOrders[0].items[0].name}</p>
                    </div>
                    <span className="bg-[#2563EB]/10 text-[#2563EB] text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      {mockOrders[0].status}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Order History */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Your Orders</h3>
                
                {mockOrders.length === 0 ? (
                  <p className="font-body text-xs text-gray-400">You have not placed any orders yet.</p>
                ) : (
                  <div className="space-y-6">
                    {mockOrders.map((ord) => (
                      <div key={ord.id} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
                        
                        {/* Header info */}
                        <div className="bg-gray-50/70 p-4 border-b border-gray-100 flex flex-wrap justify-between gap-4 text-xs font-body">
                          <div className="flex gap-6">
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Order Placed</span>
                              <span className="font-bold text-gray-900 mt-0.5 block">{ord.date}</span>
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Grand Total</span>
                              <span className="font-bold text-gray-900 mt-0.5 block">${ord.total}</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Order ID</span>
                            <span className="font-bold text-[#2563EB] mt-0.5 block">#{ord.id}</span>
                          </div>
                        </div>

                        {/* Order details */}
                        <div className="p-5 flex justify-between items-center text-xs font-body">
                          <div>
                            {ord.items.map((item, idx) => (
                              <p key={idx} className="font-semibold text-gray-900">
                                {item.name} <span className="text-gray-400 font-normal">x{item.qty}</span>
                              </p>
                            ))}
                            <p className="text-[10px] text-gray-400 mt-1">Payment Method: {ord.method}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                            ord.status === 'Delivered' 
                              ? 'bg-[#10B981]/10 text-[#10B981]' 
                              : 'bg-[#2563EB]/10 text-[#2563EB]'
                          }`}>
                            {ord.status}
                          </span>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. Saved Addresses */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <h3 className="font-heading text-lg font-bold text-gray-900">Delivery Addresses</h3>
                <form onSubmit={handleSaveAddress} className="space-y-4 max-w-lg text-xs font-body">
                  <div className="space-y-1">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Street Address</label>
                    <Input 
                      type="text" 
                      value={address.street} 
                      onChange={(e) => setAddress({...address, street: e.target.value})}
                      className="rounded-full py-2.5 px-4" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">City</label>
                      <Input 
                        type="text" 
                        value={address.city} 
                        onChange={(e) => setAddress({...address, city: e.target.value})}
                        className="rounded-full py-2.5 px-4" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">State / Territory</label>
                      <Input 
                        type="text" 
                        value={address.state} 
                        onChange={(e) => setAddress({...address, state: e.target.value})}
                        className="rounded-full py-2.5 px-4" 
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">ZIP / Postcode</label>
                      <Input 
                        type="text" 
                        value={address.zip} 
                        onChange={(e) => setAddress({...address, zip: e.target.value})}
                        className="rounded-full py-2.5 px-4" 
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Country</label>
                      <Input 
                        type="text" 
                        value={address.country} 
                        onChange={(e) => setAddress({...address, country: e.target.value})}
                        className="rounded-full py-2.5 px-4" 
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="rounded-full bg-[#111827] text-white font-body text-xs uppercase tracking-wider px-6"
                  >
                    {saveStatus ? <span className="flex items-center"><Check className="h-4 w-4 mr-2" /> Saved</span> : 'Save Address'}
                  </Button>
                </form>
              </div>
            )}

            {/* 4. Active Wishlist */}
            {activeTab === 'wishlist' && (
              <div className="space-y-6">
                <h3 className="font-heading text-lg font-bold text-gray-900 mb-4">Your Wishlist ({wishlist.length})</h3>
                {wishlist.length === 0 ? (
                  <div className="text-center py-10">
                    <p className="font-body text-xs text-gray-400">Your wishlist is currently empty.</p>
                    <Button asChild className="rounded-full bg-[#111827] text-white hover:bg-gray-800 font-body text-xs uppercase tracking-wider px-6 mt-4">
                      <Link href="/shop">Browse Collections</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-6">
                    {wishlist.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="font-heading text-lg font-bold text-gray-900">Profile Credentials</h3>
                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-lg text-xs font-body">
                  <div className="space-y-1">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Display Name</label>
                    <Input 
                      type="text" 
                      value={profile.name} 
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                      className="rounded-full py-2.5 px-4" 
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                    <Input 
                      type="email" 
                      value={profile.email} 
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      className="rounded-full py-2.5 px-4" 
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">New Password</label>
                    <Input 
                      type="password" 
                      placeholder="Enter new password if changing"
                      value={profile.newPassword} 
                      onChange={(e) => setProfile({...profile, newPassword: e.target.value})}
                      className="rounded-full py-2.5 px-4" 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="rounded-full bg-[#111827] text-white font-body text-xs uppercase tracking-wider px-6"
                  >
                    {profileSaveStatus ? <span className="flex items-center"><Check className="h-4 w-4 mr-2" /> Updated</span> : 'Update Profile'}
                  </Button>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <React.Suspense fallback={<div className="pt-32 pb-20 max-w-7xl mx-auto px-4 animate-pulse"><div className="h-64 bg-gray-100 rounded-3xl" /></div>}>
      <DashboardContent />
    </React.Suspense>
  );
}
