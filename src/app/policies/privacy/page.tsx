import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans">
        <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-primary tracking-tight">Privacy Protocol</h1>
        <p className="font-body text-xs text-gray-400">Effective Date: June 24, 2026</p>
        
        <div className="font-body text-xs sm:text-sm text-muted-foreground leading-relaxed font-light space-y-6">
          <p>
            At EMPIRE, we treat your personal parameters with absolute care and confidentiality. This document details how we collect, catalog, and secure data within our headless network pipelines.
          </p>
          <h2 className="font-heading text-lg font-bold text-primary">1. Data Capture</h2>
          <p>
            We process standard checkout inputs (name, address, email, telephone coordinates) necessary to fulfill custom delivery commissions. Transaction data is tokenized securely via SSL encryption protocols and never stored on local servers.
          </p>
          <h2 className="font-heading text-lg font-bold text-primary">2. Cookies & Telemetry</h2>
          <p>
            We utilize secure session states to preserve cart contents, wishlists, and user credentials. We do not transmit tracking metrics to external third-party brokers.
          </p>
        </div>
      </div>
    </div>
  );
}
