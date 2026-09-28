'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ShoppingBag, Search, Filter, Star, 
  Sparkles, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/mockData';
import { formatNaira } from '@/lib/utils';
import { useApp } from '@/lib/store';

export default function MarketplacePage() {
  const { addToCart } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');

  const filtered = INITIAL_PRODUCTS.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'ALL' || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-16 pb-24">
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#0B3B24] to-[#04190E] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest">
            <ShoppingBag className="w-3.5 h-3.5" /> Official Association Store
          </span>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
            LGAN Golf Pro Shop
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Authentic golf apparel, clubs, commemorative AACT 2026 merchandise, and accessories delivered nationwide across Nigeria.
          </p>
        </div>
      </section>

      {/* SEARCH AND CATEGORY FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search golf equipment, apparel, gear..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B3B24]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['ALL', 'APPAREL', 'CLUBS', 'ACCESSORIES', 'BALLS'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition uppercase tracking-wider shrink-0 ${
                  selectedCat === cat
                    ? 'bg-[#0B3B24] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'All Products' : cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col justify-between"
            >
              <div>
                <Link href={`/marketplace/${product.slug}`} className="block relative h-56 w-full bg-slate-100 group">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  {product.featured && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] uppercase font-mono shadow-md">
                      Featured
                    </span>
                  )}
                </Link>

                <div className="p-5 space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono uppercase">
                    <span>{product.category}</span>
                    <span className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {product.rating || 4.9}
                    </span>
                  </div>

                  <Link href={`/marketplace/${product.slug}`}>
                    <h4 className="text-sm font-bold text-slate-900 line-clamp-2 hover:text-emerald-800 transition leading-snug">
                      {product.title}
                    </h4>
                  </Link>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-lg font-black font-mono text-[#0B3B24]">
                      {formatNaira(product.price)}
                    </span>
                    {product.compareAtPrice && (
                      <span className="text-xs text-slate-400 line-through font-mono">
                        {formatNaira(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => addToCart(product, 1)}
                  className="w-full py-2.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
