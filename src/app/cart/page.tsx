'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, Minus, Plus, ArrowRight, Ticket, ShieldCheck } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Zustand Store Selectors
  const cart = useAppStore((state) => state.cart);
  const updateQuantity = useAppStore((state) => state.updateCartQuantity);
  const removeFromCart = useAppStore((state) => state.removeFromCart);
  const couponCode = useAppStore((state) => state.couponCode);
  const couponDiscount = useAppStore((state) => state.couponDiscount);
  const applyCoupon = useAppStore((state) => state.applyCoupon);
  const removeCoupon = useAppStore((state) => state.removeCoupon);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 animate-pulse">
        <div className="h-8 w-48 bg-gray-100 rounded mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 h-96 bg-gray-100 rounded-3xl" />
          <div className="h-64 bg-gray-100 rounded-3xl" />
        </div>
      </div>
    );
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * (couponDiscount / 100);
  const shippingCost = subtotal >= 500 || subtotal === 0 ? 0 : 25;
  const total = subtotal - discountAmount + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const success = applyCoupon(couponInput.trim());
    if (success) {
      setCouponMsg({ text: `Promo code ${couponInput.toUpperCase()} applied successfully!`, type: 'success' });
      setCouponInput('');
    } else {
      setCouponMsg({ text: 'Invalid promo code. Try WELCOME10 or VIP25.', type: 'error' });
    }
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title */}
        <div className="mb-10">
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Shopping Cart</h1>
          <p className="font-body text-xs sm:text-sm text-gray-500 font-light mt-1">Review your selections before proceeding to the checkout lobby.</p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24 bg-gray-50/50 rounded-3xl p-8 border border-gray-50 max-w-lg mx-auto">
            <div className="w-28 h-28 mx-auto mb-4">
              <img src="/images/illustrations/empty.png" alt="Empty Cart" className="object-contain w-full h-full animate-pulse" />
            </div>
            <h3 className="font-heading text-lg font-bold text-gray-900">Your bag is empty</h3>
            <p className="font-body text-xs text-gray-400 font-light mt-1">
              Add premium design pieces to your cart to begin your tailored checkout experience.
            </p>
            <Button asChild className="bg-[#111827] text-white hover:bg-gray-800 rounded-full font-body text-xs uppercase tracking-wider px-8 py-5 mt-6 h-auto">
              <Link href="/shop">Explore Catalog</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            
            {/* Cart List */}
            <div className="lg:col-span-2 space-y-6">
              <div className="border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">
                      <th className="px-6 py-4">Product Detail</th>
                      <th className="px-6 py-4 text-center">Quantity</th>
                      <th className="px-6 py-4 text-right">Subtotal</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {cart.map((item) => (
                      <tr key={item.id} className="font-body text-xs sm:text-sm text-gray-900">
                        {/* Info details */}
                        <td className="px-6 py-6 flex space-x-4 items-center">
                          <div className="w-16 h-20 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 relative">
                            <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-heading text-xs font-bold text-gray-900 truncate hover:text-[#2563EB] transition-colors">
                              <Link href={`/product/${item.slug}`}>{item.name}</Link>
                            </h4>
                            {item.selectedAttributes && (
                              <p className="font-body text-[10px] text-gray-400 mt-1">
                                {Object.entries(item.selectedAttributes).map(([k, v]) => `${k}: ${v}`).join(' / ')}
                              </p>
                            )}
                            <span className="font-body text-[10px] text-gray-400 block mt-1">${item.price} each</span>
                          </div>
                        </td>

                        {/* Quantity */}
                        <td className="px-6 py-6 text-center">
                          <div className="inline-flex items-center border border-gray-100 rounded-full py-1.5 px-3 bg-gray-50 justify-between">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-gray-400 hover:text-gray-900"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="font-body text-xs font-bold px-3">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-400 hover:text-gray-900"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>

                        {/* Subtotal */}
                        <td className="px-6 py-6 text-right font-bold text-gray-900">
                          ${item.price * item.quantity}
                        </td>

                        {/* Trash */}
                        <td className="px-6 py-6 text-right">
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Coupon input */}
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-start bg-gray-50/50 p-6 rounded-3xl border border-gray-50">
                <form onSubmit={handleApplyCoupon} className="flex gap-2 max-w-sm w-full">
                  <Input 
                    type="text" 
                    placeholder="Enter promo coupon code"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value);
                      if (couponMsg) setCouponMsg(null);
                    }}
                    className="rounded-full px-4 text-xs font-body bg-white border-gray-100 focus:border-gray-900"
                  />
                  <Button 
                    type="submit"
                    className="rounded-full bg-[#111827] text-white hover:bg-gray-800 font-body text-xs uppercase tracking-wider px-6"
                  >
                    <Ticket className="h-4 w-4 mr-2" /> Apply
                  </Button>
                </form>
                {couponCode && (
                  <div className="flex items-center space-x-2 bg-[#10B981]/10 px-3.5 py-2 rounded-full border border-[#10B981]/20">
                    <span className="font-heading text-[10px] font-bold text-[#10B981] uppercase tracking-wider">
                      Code {couponCode} active ({couponDiscount}% Off)
                    </span>
                    <button onClick={removeCoupon} className="text-xs text-red-500 hover:underline">Remove</button>
                  </div>
                )}
              </div>
              {couponMsg && (
                <p className={`text-xs font-body font-medium mt-2 px-6 ${
                  couponMsg.type === 'success' ? 'text-[#10B981]' : 'text-[#EF4444]'
                }`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Cart Summary */}
            <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-heading text-lg font-bold text-gray-900">Order Summary</h3>
              
              <div className="space-y-3 font-body text-xs sm:text-sm text-gray-500">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#10B981] font-semibold">
                    <span>Discount</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-gray-100 pb-3">
                  <span>White Glove Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="text-[#10B981] font-semibold">Complimentary</span>
                  ) : (
                    <span className="font-bold text-gray-900">${shippingCost}</span>
                  )}
                </div>
                <div className="flex justify-between text-base sm:text-lg font-heading font-bold text-gray-900 pt-3">
                  <span>Grand Total</span>
                  <span>${total}</span>
                </div>
              </div>

              {/* Free shipping milestone indicator */}
              {subtotal < 500 && (
                <div className="bg-[#2563EB]/5 border border-[#2563EB]/10 rounded-2xl p-4 text-xs font-body text-[#2563EB] leading-relaxed">
                  Add <span className="font-bold">${500 - subtotal}</span> more to unlock free white-glove shipping.
                </div>
              )}

              {/* Checkout CTA */}
              <div className="space-y-3">
                <Button asChild className="w-full rounded-full py-6 font-body text-xs sm:text-sm uppercase tracking-wider font-bold bg-[#111827] text-white hover:bg-gray-800 h-auto">
                  <Link href="/checkout">
                    Secure Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <div className="flex items-center justify-center space-x-2 text-[10px] text-gray-400 font-body">
                  <ShieldCheck className="h-4 w-4 text-[#10B981]" />
                  <span>3D Secure SSL encrypted payment protocols</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
