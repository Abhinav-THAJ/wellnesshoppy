'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { api } from '@/lib/api';
import { navigationMenu } from '@/lib/mockData';

export default function Footer() {
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
    <footer className="bg-[#111827] text-white pt-20 pb-10 border-t border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-16 border-b border-white/10">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-6">
            <Link href="/" className="font-heading text-xl font-extrabold tracking-widest uppercase text-white">
              EMPIRE
            </Link>
            <p className="font-body text-xs text-gray-400 max-w-sm leading-relaxed">
              Bespoke luxury headless eCommerce platform connecting premium materials, clean code, and fast customer experiences worldwide.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all" aria-label="Instagram">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all" aria-label="Twitter">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all" aria-label="Facebook">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/70 hover:text-white transition-all" aria-label="Youtube">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Col 1: Shop */}
          <div>
            <h4 className="font-heading text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Shop Collections</h4>
            <ul className="space-y-2">
              {navigationMenu.shop.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="font-body text-xs text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 2: Support */}
          <div>
            <h4 className="font-heading text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Concierge Support</h4>
            <ul className="space-y-2">
              {navigationMenu.support.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="font-body text-xs text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Col 3: Company */}
          <div>
            <h4 className="font-heading text-xs font-bold tracking-widest uppercase text-white/40 mb-4">Company & Atelier</h4>
            <ul className="space-y-2">
              {navigationMenu.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="font-body text-xs text-gray-400 hover:text-white transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Policies Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
            {navigationMenu.policies.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="font-body text-[10px] text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-widest"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Newsletter Form */}
          <div className="w-full max-w-sm space-y-3">
            <h5 className="font-heading text-xs font-bold tracking-widest uppercase text-white">Join the Atelier Newsletter</h5>
            <form onSubmit={handleSubscribe} className="relative flex items-center border-b border-white/20 focus-within:border-white transition-colors">
              <input 
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-transparent py-2.5 pr-10 text-xs placeholder-white/30 border-none focus:outline-none focus:ring-0 text-white font-body"
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:opacity-75 transition-opacity"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            {status === 'loading' && <p className="font-body text-[10px] text-gray-400">Verifying address...</p>}
            {status === 'success' && <p className="font-body text-[10px] text-[#10B981] font-semibold">Welcome to the inner circle.</p>}
            {status === 'error' && <p className="font-body text-[10px] text-[#EF4444]">Please enter a valid email address.</p>}
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-16 text-center border-t border-white/5 pt-8">
          <p className="font-body text-[10px] text-gray-600 tracking-wider">
            &copy; {new Date().getFullYear()} EMPIRE ONLINE ATELIER. FOR DEMO PURPOSES ONLY. POWERED BY NEXT.JS 16 & WOOCOMMERCE.
          </p>
        </div>

      </div>
    </footer>
  );
}
