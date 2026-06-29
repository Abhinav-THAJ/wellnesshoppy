import React from 'react';

export default function RefundPage() {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">Refund Guidelines</h1>
        <p className="font-body text-xs text-gray-400">Effective Date: June 24, 2026</p>
        
        <div className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed font-light space-y-6">
          <p>
            We offer complimentary returns and exchanges within 30 days of receiving your package. 
          </p>
          <h2 className="font-heading text-lg font-bold text-primary">1. Eligibility</h2>
          <p>
            Items must be in original unworn, unwashed, and uninstalled condition, with all custom security tags and packaging elements completely intact.
          </p>
          <h2 className="font-heading text-lg font-bold text-primary">2. Processing Time</h2>
          <p>
            Once our Florence or New York ateliers receive and inspect your return shipment, your refund will be processed back to the original method of payment within 5 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
