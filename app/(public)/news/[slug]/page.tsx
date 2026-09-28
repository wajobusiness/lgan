'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Calendar, User, ArrowLeft, Share2, ShieldCheck } from 'lucide-react';
import { INITIAL_NEWS } from '@/lib/mockData';

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = INITIAL_NEWS.find((n) => n.slug === slug) || INITIAL_NEWS[0];

  return (
    <div className="space-y-12 pb-24">
      {/* HEADER */}
      <section className="bg-[#0B3B24] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Media Releases</span>
          </Link>

          <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold uppercase font-mono">
            {article.category}
          </span>

          <h1 className="text-3xl sm:text-5xl font-black font-serif leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>{article.publishedAt.split('T')[0]}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-amber-400" />
              <span>{article.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-xl">
          <Image src={article.image} alt={article.title} fill className="object-cover" priority />
        </div>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm space-y-6 text-slate-800 leading-relaxed text-sm sm:text-base">
          <p className="text-lg font-serif font-semibold text-[#0B3B24] border-l-4 border-amber-400 pl-4 py-1 italic">
            {article.summary}
          </p>

          <p className="leading-relaxed">{article.content}</p>

          <p className="leading-relaxed">
            The Ladies Golf Association of Nigeria (LGAN) continues to work closely with the Federal Ministry of Sports Development, the Nigeria Golf Federation, and international sanctioning bodies to ensure state-of-the-art facilities and memorable tournament experiences.
          </p>
        </div>
      </section>
    </div>
  );
}
