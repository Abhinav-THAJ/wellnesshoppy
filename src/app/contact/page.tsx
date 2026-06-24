'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1200);
  };

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="mb-20 text-center max-w-xl mx-auto">
          <span className="font-heading text-xs font-bold tracking-[0.2em] text-[#2563EB] uppercase">Connect</span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-gray-900 mt-2 tracking-tight">Atelier Concierge</h1>
          <p className="font-body text-xs sm:text-sm text-gray-500 font-light mt-3">
            Reach out to our global support desk. A representative will be assigned to your query shortly.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Info Details */}
          <div className="space-y-8">
            <h2 className="font-heading text-2xl font-extrabold text-gray-900 tracking-tight">Atelier Channels</h2>
            <p className="font-body text-xs sm:text-sm text-gray-500 font-light leading-relaxed max-w-sm">
              We provide dedicated global account managers. You can reach out directly via secure text or dispatch channels.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#111827] text-white rounded-xl">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-400">Secure Dispatch</h4>
                  <p className="font-body text-sm font-semibold text-gray-900 mt-1">concierge@empire.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#111827] text-white rounded-xl">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-400">Direct Line</h4>
                  <p className="font-body text-sm font-semibold text-gray-900 mt-1">+1 (800) 555-EMPIRE</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-[#111827] text-white rounded-xl">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider text-gray-400">Showroom Address</h4>
                  <p className="font-body text-sm font-semibold text-gray-900 mt-1">72 Wall Street, Penthouse B, New York, NY 10005</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-gray-50/50 border border-gray-100 rounded-3xl p-6 sm:p-8">
            <h3 className="font-heading text-sm font-bold text-gray-900 mb-6">Send Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-body">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Your Name</label>
                  <Input 
                    type="text" 
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    className="rounded-full py-2.5 px-4 bg-white border-gray-200" 
                    required 
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                  <Input 
                    type="email" 
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    className="rounded-full py-2.5 px-4 bg-white border-gray-200" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Subject</label>
                <Input 
                  type="text" 
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="rounded-full py-2.5 px-4 bg-white border-gray-200" 
                />
              </div>

              <div className="space-y-1">
                <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Message Content</label>
                <textarea 
                  rows={4}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  className="w-full bg-white border border-gray-200 rounded-2xl py-3 px-4 text-xs font-body focus:outline-none" 
                  required 
                />
              </div>

              <Button 
                type="submit" 
                disabled={status === 'loading'}
                className="rounded-full bg-[#111827] text-white hover:bg-gray-800 font-body text-xs uppercase tracking-wider px-8"
              >
                {status === 'loading' ? (
                  'Sending Message...'
                ) : status === 'success' ? (
                  <span className="flex items-center"><Check className="h-4 w-4 mr-2" /> Message Sent</span>
                ) : (
                  <span className="flex items-center">Send Message <Send className="ml-2 h-3.5 w-3.5" /></span>
                )}
              </Button>

              {status === 'error' && (
                <p className="text-xs text-[#EF4444] font-medium">Please fill out all required form fields.</p>
              )}
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
