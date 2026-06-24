import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-28 pb-20 bg-white min-h-screen flex items-center justify-center text-center">
      <div className="max-w-md w-full px-6 space-y-6">
        
        {/* Custom Illustration */}
        <div className="w-48 h-48 mx-auto opacity-80">
          <img src="/images/illustrations/empty.png" alt="Not found" className="object-contain w-full h-full" />
        </div>

        <div className="space-y-2">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-[#2563EB] uppercase">
            Error Code 404
          </span>
          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Design Page Retired
          </h1>
          <p className="font-body text-xs sm:text-sm text-gray-500 font-light leading-relaxed">
            The layout route you requested could not be retrieved. It may have been cataloged under a new slug.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="rounded-full bg-[#111827] text-white hover:bg-gray-800 font-body text-xs uppercase tracking-wider px-8 py-5 h-auto">
            <Link href="/">
              Atelier Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full font-body text-xs uppercase tracking-wider px-8 py-5 border-gray-200 h-auto">
            <Link href="/shop">
              Browse Catalog <ArrowRight className="ml-1.5 h-4 w-4 text-gray-400" />
            </Link>
          </Button>
        </div>

      </div>
    </div>
  );
}
