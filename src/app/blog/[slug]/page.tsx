'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock, Tag } from 'lucide-react';
import { api } from '@/lib/api';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogDetailPage({ params }: ArticlePageProps) {
  const { slug } = React.use(params);
  
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.getBlogArticleBySlug(slug).then((res) => {
      setArticle(res);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 max-w-3xl mx-auto px-4 animate-pulse space-y-6">
        <div className="h-6 w-1/4 bg-gray-100 rounded" />
        <div className="h-10 w-full bg-gray-100 rounded" />
        <div className="h-80 w-full bg-gray-100 rounded-3xl" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-32 pb-20 max-w-md mx-auto text-center px-4">
        <h2 className="font-heading text-2xl font-bold">Article not found</h2>
        <p className="font-body text-xs text-gray-400 mt-2">The article you are searching for is not available.</p>
        <Link href="/blog" className="inline-flex items-center text-xs font-body font-bold text-[#2563EB] hover:underline mt-4">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-white min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/blog" className="inline-flex items-center text-xs font-body uppercase font-bold tracking-wider text-gray-400 hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" /> Return to Journal
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-6 mb-10">
          <div className="flex items-center space-x-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span className="text-[#2563EB]">{article.category}</span>
            <span>•</span>
            <span className="flex items-center"><Calendar className="h-3.5 w-3.5 mr-1" /> {article.date}</span>
            <span>•</span>
            <span className="flex items-center"><Clock className="h-3.5 w-3.5 mr-1" /> {article.readTime}</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          {/* Author */}
          <div className="flex items-center space-x-3.5 py-4 border-y border-gray-100">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-50 flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop" alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-heading text-xs font-bold text-gray-900">{article.author}</p>
              <p className="font-body text-[10px] text-gray-400 font-medium">{article.authorRole}</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="aspect-[16/9] w-full bg-gray-50 rounded-3xl overflow-hidden mb-12 shadow-sm">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {/* Article Body HTML content */}
        <div 
          className="font-body text-xs sm:text-base text-gray-700 leading-relaxed font-light space-y-6 prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="mt-12 pt-6 border-t border-gray-100 flex items-center space-x-2">
            <Tag className="h-4 w-4 text-gray-400" />
            <div className="flex gap-2">
              {article.tags.map((tag: string) => (
                <span key={tag} className="px-3.5 py-1 bg-gray-50 border border-gray-100 text-gray-500 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

      </article>
    </div>
  );
}
