'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function RegisterPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);

  useEffect(() => {
    setMounted(true);
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setStatus('error');
      setErrorMsg('Please fill out all fields.');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      setUser({
        id: Math.floor(Math.random() * 1000 + 10),
        username: email.split('@')[0],
        email: email,
        displayName: name,
        firstName: name.split(' ')[0] || '',
        lastName: name.split(' ')[1] || '',
        token: 'mock-jwt-token-registered'
      });
      setStatus('success');
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-6 text-center space-y-8">
        
        {/* Title */}
        <div className="space-y-2">
          <span className="font-heading text-xs font-bold tracking-[0.2em] text-secondary uppercase">
            Private Atelier
          </span>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-primary tracking-tight">
            Create Profile
          </h1>
          <p className="font-body text-xs text-muted-foreground font-light max-w-xs mx-auto">
            Create your credentials profile to unlock early access, custom wishlists, and seamless orders.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
          <div className="space-y-1">
            <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Full Name</label>
            <Input 
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="Marcus Aurelius"
              className="rounded-full py-6 px-5 text-xs font-body border-gray-200 focus:border-gray-900"
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
              placeholder="name@domain.com"
              className="rounded-full py-6 px-5 text-xs font-body border-gray-200 focus:border-gray-900"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Password</label>
            <Input 
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (status === 'error') setStatus('idle');
              }}
              placeholder="••••••••••••"
              className="rounded-full py-6 px-5 text-xs font-body border-gray-200 focus:border-gray-900"
              required
            />
          </div>

          {status === 'error' && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-body font-medium">
              {errorMsg}
            </div>
          )}

          <Button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-full py-6 font-body text-xs uppercase tracking-wider font-bold bg-primary text-white hover:bg-primary h-auto"
          >
            {status === 'loading' ? 'Creating Credentials...' : (
              <span className="flex items-center justify-center">Register Client <ArrowRight className="ml-2 h-4 w-4" /></span>
            )}
          </Button>

        </form>

        {/* Login link */}
        <div className="font-body text-xs text-muted-foreground">
          Already registered? <Link href="/auth/login" className="font-bold text-secondary hover:underline">Sign in to your dashboard</Link>
        </div>

      </div>
    </div>
  );
}
