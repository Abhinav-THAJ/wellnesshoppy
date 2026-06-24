import React from 'react';

export default function ShippingPage() {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">Shipping Service</h1>
        <p className="font-body text-xs text-gray-400">Effective Date: June 24, 2026</p>
        
        <div className="font-body text-xs sm:text-sm text-gray-500 leading-relaxed font-light space-y-6">
          <p>
            We manage premium white-glove logistics in partnership with global couriers to ensure temperature-controlled, insured transport.
          </p>
          <h2 className="font-heading text-lg font-bold text-gray-900">1. Rates and Delivery Times</h2>
          <p>
            We offer complimentary shipping worldwide for orders above $500. For orders under $500, a flat delivery fee of $25 is applied. Transit times range from 2 to 5 business days globally.
          </p>
          <h2 className="font-heading text-lg font-bold text-gray-900">2. Duties and Customs</h2>
          <p>
            All custom duty fees, cross-border taxes, and VAT metrics are calculated and fully pre-paid at checkout. The price you see at checkout is the absolute final cost.
          </p>
        </div>
      </div>
    </div>
  );
}
