'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
    }, 1200);
  };

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-6 text-center space-y-8">
        
        {/* Navigation */}
        <div className="text-left">
          <Link href="/auth/login" className="inline-flex items-center text-xs font-body uppercase font-bold tracking-wider text-gray-400 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Sign In
          </Link>
        </div>

        {status === 'success' ? (
          <div className="space-y-6">
            <div className="w-12 h-12 bg-[#10B981]/10 rounded-full flex items-center justify-center text-[#10B981] mx-auto">
              <Check className="h-6 w-6" />
            </div>
            <h2 className="font-heading text-2xl font-extrabold text-primary tracking-tight">Email Dispatched</h2>
            <p className="font-body text-xs text-muted-foreground font-light max-w-xs mx-auto">
              Instructions to reset your credentials have been sent to <span className="font-bold text-primary">{email}</span>.
            </p>
            <Button asChild className="rounded-full bg-primary text-white hover:bg-primary w-full font-body text-xs uppercase tracking-wider py-5 h-auto">
              <Link href="/auth/login">Return to Sign In</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-primary tracking-tight">Credentials Recovery</h1>
              <p className="font-body text-xs text-muted-foreground font-light max-w-xs mx-auto">
                Enter your registered email address and we will dispatch code-recovery coordinates.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                <Input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="rounded-full py-6 px-5 text-xs font-body border-gray-200 focus:border-gray-900"
                  required
                />
              </div>

              <Button 
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-full py-6 font-body text-xs uppercase tracking-wider font-bold bg-primary text-white hover:bg-primary h-auto"
              >
                {status === 'loading' ? 'Dispatching Instructions...' : (
                  <span className="flex items-center justify-center">Send Recovery Code <Send className="ml-2 h-4 w-4" /></span>
                )}
              </Button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
