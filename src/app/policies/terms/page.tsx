import React from 'react';

export default function TermsPage() {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">Terms of Engagement</h1>
        <p className="font-body text-xs text-gray-400">Effective Date: June 24, 2026</p>
        
        <div className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed font-light space-y-6">
          <p>
            By accessing the EMPIRE catalog or placing an order, you agree to comply with our global terms of commerce.
          </p>
          <h2 className="font-heading text-lg font-bold text-primary">1. Product Integrity</h2>
          <p>
            Our catalog descriptions contain highly precise material weights. Slight variations in natural aniline leather textures or cashmere combs represent unique marks of craftsmanship and do not constitute defects.
          </p>
          <h2 className="font-heading text-lg font-bold text-primary">2. Financial Orders</h2>
          <p>
            We reserve the right to cancel or request additional verification coordinates for transactions that trigger potential fraud alerts inside our stripe gateways.
          </p>
        </div>
      </div>
    </div>
  );
}
