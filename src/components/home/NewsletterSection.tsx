'use client';

import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1200);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-background rounded-3xl p-8 sm:p-16 border border-gray-100 flex flex-col items-center gap-6"
        >
          <div className="space-y-2 max-w-lg">
            <span className="font-heading text-xs font-bold tracking-[0.2em] text-secondary uppercase">
              Join Our Wellness Family
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Receive Updates on Pure Kerala Traditions
            </h2>
            <p className="font-body text-xs sm:text-sm text-muted-foreground font-light leading-relaxed">
              Subscribe to our newsletter for traditional health tips, new herbal product launches, and exclusive offers.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-2 mt-4">
            <div className="flex-1 relative">
              <input 
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'loading' || status === 'success'}
                className="w-full px-5 py-3 rounded-full border border-gray-200 focus:border-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-0 text-xs sm:text-sm text-primary font-body transition-colors disabled:bg-muted"
              />
            </div>
            <Button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className="bg-primary text-white hover:bg-primary rounded-full py-3 px-8 font-body text-xs sm:text-sm uppercase tracking-wider h-auto"
            >
              {status === 'loading' ? (
                'Subscribing...'
              ) : status === 'success' ? (
                <span className="flex items-center"><Check className="h-4 w-4 mr-2" /> Subscribed</span>
              ) : (
                <span className="flex items-center">Subscribe <ArrowRight className="ml-2 h-4 w-4" /></span>
              )}
            </Button>
          </form>

          {status === 'error' && (
            <p className="font-body text-xs text-[#EF4444] font-medium">
              Please enter a valid email address.
            </p>
          )}

        </motion.div>

      </div>
    </section>
  );
}
