'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Check, CreditCard, Truck, RefreshCw } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [isShippingSame, setIsShippingSame] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  // Form Fields
  const [billing, setBilling] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zip: '', country: 'United States'
  });
  const [shipping, setShipping] = useState({
    firstName: '', lastName: '',
    address: '', city: '', zip: '', country: 'United States'
  });
  const [card, setCard] = useState({
    number: '', expiry: '', cvv: ''
  });

  // Zustand Store selectors
  const cart = useAppStore((state) => state.cart);
  const clearCart = useAppStore((state) => state.clearCart);
  const couponCode = useAppStore((state) => state.couponCode);
  const couponDiscount = useAppStore((state) => state.couponDiscount);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 animate-pulse">
        <div className="h-64 bg-muted rounded-3xl" />
      </div>
    );
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * (couponDiscount / 100);
  const shippingCost = subtotal >= 500 ? 0 : 25;
  const total = subtotal - discountAmount + shippingCost;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate Billing
    if (!billing.firstName || !billing.lastName || !billing.email || !billing.address || !billing.city || !billing.zip) {
      setCheckoutStatus('error');
      setErrorMessage('Please fill out all required billing fields.');
      return;
    }

    // Validate Card
    if (paymentMethod === 'card' && (!card.number || !card.expiry || !card.cvv)) {
      setCheckoutStatus('error');
      setErrorMessage('Please enter your card payment details.');
      return;
    }

    setCheckoutStatus('loading');

    // Compile line items for api payload
    const lineItems = cart.map(item => ({
      product_id: item.productId,
      quantity: item.quantity,
    }));

    api.createOrder({
      billing: {
        first_name: billing.firstName,
        last_name: billing.lastName,
        email: billing.email,
        phone: billing.phone,
        address_1: billing.address,
        city: billing.city,
        postcode: billing.zip,
        country: billing.country
      },
      shipping: isShippingSame ? {
        first_name: billing.firstName,
        last_name: billing.lastName,
        address_1: billing.address,
        city: billing.city,
        postcode: billing.zip,
        country: billing.country
      } : {
        first_name: shipping.firstName,
        last_name: shipping.lastName,
        address_1: shipping.address,
        city: shipping.city,
        postcode: shipping.zip,
        country: shipping.country
      },
      lineItems,
      paymentMethod,
      couponLines: couponCode ? [{ code: couponCode }] : []
    }).then((res) => {
      if (res.success) {
        setOrderNumber(res.order?.id?.toString() || Math.floor(Math.random() * 90000 + 10000).toString());
        setCheckoutStatus('success');
        clearCart();
      } else {
        setCheckoutStatus('error');
        setErrorMessage(res.error || 'Failed to authorize transaction.');
      }
    });
  };

  if (checkoutStatus === 'success') {
    return (
      <div className="pt-32 pb-20 max-w-xl mx-auto px-4 text-center">
        <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981] mx-auto mb-6">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="font-heading text-3xl font-extrabold text-primary tracking-tight">Order Confirmed</h1>
        <p className="font-body text-xs text-muted-foreground font-light mt-2">
          Thank you for your commission. Your order <span className="font-bold text-primary">#{orderNumber}</span> has been logged.
        </p>
        <p className="font-body text-xs text-muted-foreground font-light mt-1">
          A receipt containing tracking coordinates has been dispatched to {billing.email}.
        </p>
        <div className="mt-8 space-y-3">
          <Button asChild className="w-full rounded-full py-5 font-body text-xs uppercase tracking-wider bg-primary text-white">
            <Link href="/dashboard?tab=orders">Track Orders</Link>
          </Button>
          <Button asChild variant="outline" className="w-full rounded-full py-5 font-body text-xs uppercase tracking-wider border-gray-200">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-xs font-body uppercase font-bold tracking-wider text-gray-400 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Cart
          </Link>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-primary mt-4 tracking-tight">Tailored Checkout</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-background/50 rounded-3xl p-8 border border-gray-50 max-w-sm mx-auto">
            <h3 className="font-heading text-base font-bold">Your cart is empty</h3>
            <Button asChild className="mt-6 rounded-full bg-primary">
              <Link href="/shop">Go to Shop</Link>
            </Button>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            
            {/* Form Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Billing Info */}
              <div className="space-y-4">
                <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-gray-400">1. Billing Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">First Name</label>
                    <input 
                      type="text" 
                      value={billing.firstName}
                      onChange={(e) => setBilling({...billing, firstName: e.target.value})}
                      className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                    <input 
                      type="text" 
                      value={billing.lastName}
                      onChange={(e) => setBilling({...billing, lastName: e.target.value})}
                      className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required 
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                    <input 
                      type="email" 
                      value={billing.email}
                      onChange={(e) => setBilling({...billing, email: e.target.value})}
                      className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Phone</label>
                    <input 
                      type="tel" 
                      value={billing.phone}
                      onChange={(e) => setBilling({...billing, phone: e.target.value})}
                      className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" 
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Street Address</label>
                  <input 
                    type="text" 
                    value={billing.address}
                    onChange={(e) => setBilling({...billing, address: e.target.value})}
                    placeholder="Apartment, suite, unit, block..."
                    className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required 
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">City</label>
                    <input 
                      type="text" 
                      value={billing.city}
                      onChange={(e) => setBilling({...billing, city: e.target.value})}
                      className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">ZIP / Postcode</label>
                    <input 
                      type="text" 
                      value={billing.zip}
                      onChange={(e) => setBilling({...billing, zip: e.target.value})}
                      className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required 
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Country</label>
                    <input 
                      type="text" 
                      value={billing.country}
                      onChange={(e) => setBilling({...billing, country: e.target.value})}
                      className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required 
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address Toggles */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2.5">
                  <input 
                    type="checkbox" 
                    id="sameShipping"
                    checked={isShippingSame}
                    onChange={(e) => setIsShippingSame(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="sameShipping" className="font-body text-xs text-muted-foreground font-medium cursor-pointer select-none">
                    Shipping address is the same as billing address
                  </label>
                </div>

                {!isShippingSame && (
                  <div className="space-y-4 mt-4 p-5 bg-background/50 rounded-3xl border border-gray-50">
                    <h4 className="font-heading text-xs font-bold uppercase text-gray-400 mb-2">Shipping Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">First Name</label>
                        <input 
                          type="text" 
                          value={shipping.firstName}
                          onChange={(e) => setShipping({...shipping, firstName: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required={!isShippingSame} 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Last Name</label>
                        <input 
                          type="text" 
                          value={shipping.lastName}
                          onChange={(e) => setShipping({...shipping, lastName: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required={!isShippingSame} 
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Street Address</label>
                      <input 
                        type="text" 
                        value={shipping.address}
                        onChange={(e) => setShipping({...shipping, address: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required={!isShippingSame} 
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">City</label>
                        <input 
                          type="text" 
                          value={shipping.city}
                          onChange={(e) => setShipping({...shipping, city: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required={!isShippingSame} 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">ZIP / Postcode</label>
                        <input 
                          type="text" 
                          value={shipping.zip}
                          onChange={(e) => setShipping({...shipping, zip: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required={!isShippingSame} 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Country</label>
                        <input 
                          type="text" 
                          value={shipping.country}
                          onChange={(e) => setShipping({...shipping, country: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required={!isShippingSame} 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Payment Methods */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="font-heading text-sm font-bold uppercase tracking-widest text-gray-400">2. Payment Method</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                      paymentMethod === 'card'
                        ? 'border-secondary bg-secondary/5 text-secondary'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <CreditCard className="h-5 w-5 mt-0.5" />
                    <div>
                      <span className="font-heading text-xs font-bold uppercase block">Credit Card</span>
                      <span className="font-body text-[10px] text-gray-400">Visa, Mastercard, Amex, Apple Pay</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-secondary bg-secondary/5 text-secondary'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Truck className="h-5 w-5 mt-0.5" />
                    <div>
                      <span className="font-heading text-xs font-bold uppercase block">Cash on Delivery</span>
                      <span className="font-body text-[10px] text-gray-400">Pay inside home courier transit</span>
                    </div>
                  </button>
                </div>

                {paymentMethod === 'card' && (
                  <div className="mt-4 p-5 bg-background/50 rounded-3xl border border-gray-50 space-y-4">
                    <div className="space-y-1">
                      <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Card Number</label>
                      <input 
                        type="text" 
                        maxLength={19}
                        placeholder="0000 0000 0000 0000"
                        value={card.number}
                        onChange={(e) => setCard({...card, number: e.target.value})}
                        className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required={paymentMethod === 'card'} 
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Expiry Date</label>
                        <input 
                          type="text" 
                          maxLength={5}
                          placeholder="MM/YY"
                          value={card.expiry}
                          onChange={(e) => setCard({...card, expiry: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required={paymentMethod === 'card'} 
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">CVV / Code</label>
                        <input 
                          type="password" 
                          maxLength={4}
                          placeholder="•••"
                          value={card.cvv}
                          onChange={(e) => setCard({...card, cvv: e.target.value})}
                          className="w-full bg-white border border-gray-200 rounded-full py-2.5 px-4 text-xs font-body" required={paymentMethod === 'card'} 
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>

            {/* Checkout Order Summary Column */}
            <div className="bg-background border border-gray-100 rounded-3xl p-6 sm:p-8 space-y-6">
              <h3 className="font-heading text-lg font-bold text-primary">Your Commission</h3>
              
              {/* Items Mini List */}
              <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-3 text-xs font-body">
                    <div className="truncate pr-4 flex-1">
                      <span className="font-bold text-primary">{item.name}</span>
                      {item.selectedAttributes && (
                        <span className="text-[10px] text-gray-400 block mt-0.5">
                          {Object.entries(item.selectedAttributes).map(([k, v]) => `${k}:${v}`).join(' / ')}
                        </span>
                      )}
                      <span className="text-gray-400 block mt-0.5">Qty {item.quantity}</span>
                    </div>
                    <span className="font-bold text-primary flex-shrink-0">${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Totals Summary */}
              <div className="space-y-3 font-body text-xs sm:text-sm text-muted-foreground border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-primary">${subtotal}</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-[#10B981] font-semibold">
                    <span>Discount ({couponDiscount}%)</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between pb-3 border-b border-gray-100">
                  <span>Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="text-[#10B981] font-semibold">Complimentary</span>
                  ) : (
                    <span className="font-bold text-primary">${shippingCost}</span>
                  )}
                </div>
                <div className="flex justify-between text-base font-heading font-bold text-primary pt-3">
                  <span>Grand Total</span>
                  <span>${total}</span>
                </div>
              </div>

              {/* Submit Checkout */}
              <div className="space-y-3 pt-2">
                <Button 
                  type="submit" 
                  disabled={checkoutStatus === 'loading'}
                  className="w-full rounded-full py-6 font-body text-xs uppercase tracking-wider font-bold bg-primary text-white hover:bg-primary h-auto"
                >
                  {checkoutStatus === 'loading' ? 'Processing Transaction...' : 'Place Order & Pay'}
                </Button>
                <div className="flex items-center justify-center space-x-2 text-[9px] text-gray-400 font-body">
                  <ShieldCheck className="h-4 w-4 text-[#10B981]" />
                  <span>3D Secure SSL Encrypted Checkout Lobby</span>
                </div>
              </div>

              {checkoutStatus === 'error' && (
                <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-body font-medium leading-relaxed">
                  {errorMessage}
                </div>
              )}

            </div>

          </form>
        )}

      </div>
    </div>
  );
}
