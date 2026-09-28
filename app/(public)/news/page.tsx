'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowRight, Sparkles } from 'lucide-react';
import { INITIAL_NEWS } from '@/lib/mockData';

export default function NewsListPage() {
  return (
    <div className="space-y-16 pb-24">
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#0B3B24] to-[#04190E] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Official Communications
          </span>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
            Press &amp; Media Center
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Stay updated with tournament results, continental bulletins, and official executive announcements.
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_NEWS.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-52 w-full bg-slate-900">
                  <Image src={article.image} alt={article.title} fill className="object-cover" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-[#0B3B24] text-amber-300 text-[10px] font-bold uppercase font-mono shadow-md">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                      <span>{article.publishedAt.split('T')[0]}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-emerald-800" />
                      <span>{article.author}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold font-serif text-slate-900 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link
                  href={`/news/${article.slug}`}
                  className="text-xs font-bold text-[#0B3B24] hover:text-emerald-950 flex items-center gap-1 transition"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
