'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    if (!email || !password) {
      setStatus('error');
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setStatus('loading');
    
    // Simulate JWT Authentication
    setTimeout(() => {
      if (email === 'admin@empire.com' && password === 'admin123') {
        setUser({
          id: 1,
          username: 'admin',
          email: 'admin@empire.com',
          displayName: 'Marcus Aurelius',
          firstName: 'Marcus',
          lastName: 'Aurelius',
          token: 'mock-jwt-auth-token-12345'
        });
        setStatus('success');
        router.push('/dashboard');
      } else {
        // Create an automatic register/login check for ease of demo (any other email registers/logs in automatically!)
        setUser({
          id: Math.floor(Math.random() * 1000 + 10),
          username: email.split('@')[0],
          email: email,
          displayName: email.split('@')[0].toUpperCase(),
          firstName: '',
          lastName: '',
          token: 'mock-jwt-token-' + Math.random().toString(36).substr(2, 9)
        });
        setStatus('success');
        router.push('/dashboard');
      }
    }, 1200);
  };

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full px-6 text-center space-y-8">
        
        {/* Title */}
        <div className="space-y-2">
          <span className="font-heading text-xs font-bold tracking-[0.2em] text-[#2563EB] uppercase">
            Private Atelier
          </span>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Sign In
          </h1>
          <p className="font-body text-xs text-gray-500 font-light max-w-xs mx-auto">
            Log in to manage orders, track delivery couriers, and browse saved wishlists.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          
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
            <div className="flex justify-between items-center">
              <label className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">Password</label>
              <Link href="/auth/forgot" className="font-body text-[10px] text-gray-400 hover:text-gray-900">Forgot password?</Link>
            </div>
            <div className="relative">
              <Input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="••••••••••••"
                className="rounded-full py-6 pl-5 pr-12 text-xs font-body border-gray-200 focus:border-gray-900"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {status === 'error' && (
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-body font-medium">
              {errorMsg}
            </div>
          )}

          <Button 
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-full py-6 font-body text-xs uppercase tracking-wider font-bold bg-[#111827] text-white hover:bg-gray-800 h-auto"
          >
            {status === 'loading' ? 'Verifying Account...' : (
              <span className="flex items-center justify-center">Enter Dashboard <ArrowRight className="ml-2 h-4 w-4" /></span>
            )}
          </Button>

        </form>

        {/* Demo hints */}
        <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-left">
          <p className="font-heading text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Demo Access Code</p>
          <p className="font-body text-[11px] text-gray-500 font-light">
            You can use <span className="font-bold text-gray-900">admin@empire.com</span> with password <span className="font-bold text-gray-900">admin123</span>, or input any email/password to sign in automatically!
          </p>
        </div>

        {/* Register link */}
        <div className="font-body text-xs text-gray-500">
          New client? <Link href="/auth/register" className="font-bold text-[#2563EB] hover:underline">Create a credentials profile</Link>
        </div>

      </div>
    </div>
  );
}
