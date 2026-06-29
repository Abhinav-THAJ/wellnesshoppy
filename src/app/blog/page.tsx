'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { api } from '@/lib/api';

export default function BlogListingPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBlogArticles().then(res => {
      setArticles(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-12 text-center max-w-xl mx-auto">
          <span className="font-heading text-xs font-bold tracking-[0.2em] text-secondary uppercase">
            Atelier Journal
          </span>
          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-primary mt-2 tracking-tight">
            Design Chronicles
          </h1>
          <p className="font-body text-xs sm:text-sm text-muted-foreground font-light mt-3 leading-relaxed">
            Read critical notes on acoustics, Florentine textile heritage, and high-performance wearable design.
          </p>
        </div>

        {/* Blog Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map(n => (
              <div key={n} className="bg-white border rounded-2xl h-96 animate-pulse p-4" />
            ))}
          </div>
        ) : articles.length === 0 ? (
          <p className="text-center font-body text-xs text-gray-400">No articles published yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((art) => (
              <article key={art.id} className="group flex flex-col justify-between border border-gray-50 rounded-3xl p-6 bg-white shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="space-y-4">
                  {/* Featured Image */}
                  <div className="aspect-[16/9] bg-background rounded-2xl overflow-hidden relative shadow-inner">
                    <Link href={`/blog/${art.slug}`}>
                      <img 
                        src={art.image} 
                        alt={art.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.95]"
                      />
                    </Link>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center space-x-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span className="text-secondary">{art.category}</span>
                    <span>•</span>
                    <span className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1" /> {art.date}</span>
                    <span>•</span>
                    <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> {art.readTime}</span>
                  </div>

                  {/* Content details */}
                  <div className="space-y-2">
                    <h3 className="font-heading text-lg sm:text-xl font-extrabold text-primary group-hover:text-secondary transition-colors leading-tight">
                      <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                    </h3>
                    <p className="font-body text-xs text-muted-foreground font-light leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-50 mt-6 flex justify-between items-center text-xs font-body">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-gray-700">{art.author}</span>
                    <span className="text-gray-400 font-light">({art.authorRole})</span>
                  </div>
                  <Link href={`/blog/${art.slug}`} className="inline-flex items-center font-bold text-secondary hover:underline">
                    Read Article <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
