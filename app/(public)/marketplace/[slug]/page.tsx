'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { 
  ShoppingBag, Star, ShieldCheck, Truck, 
  ArrowLeft, CheckCircle2, Heart, Share2 
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/mockData';
import { formatNaira } from '@/lib/utils';
import { useApp } from '@/lib/store';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');

  const product = INITIAL_PRODUCTS.find((p) => p.slug === slug) || INITIAL_PRODUCTS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 pb-24">
      <Link
        href="/marketplace"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-semibold transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Pro Shop</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Product Image */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative h-96 sm:h-[480px] w-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-lg">
            <Image
              src={product.images[0]}
              alt={product.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Info & Purchase Controls */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase font-bold text-amber-600">
              {product.category} • Official Merchandise
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-serif text-slate-900 leading-tight">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 pt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-700">({product.reviewsCount || 24} Verified Reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-3 border-y border-slate-100 py-4">
            <span className="text-3xl font-black font-mono text-[#0B3B24]">
              {formatNaira(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-base text-slate-400 line-through font-mono">
                {formatNaira(product.compareAtPrice)}
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selector for Apparel */}
          {product.category === 'APPAREL' && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Select Size:</span>
              <div className="flex gap-2">
                {['S', 'M', 'L', 'XL', 'XXL'].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition border ${
                      selectedSize === sz
                        ? 'bg-[#0B3B24] text-white border-[#0B3B24]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-xl border border-slate-200 bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-slate-600 font-bold hover:bg-slate-50"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-mono font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-slate-600 font-bold hover:bg-slate-50"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => addToCart(product, quantity)}
                className="flex-1 py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-amber-400" />
                <span>Add {quantity} to Bag • {formatNaira(product.price * quantity)}</span>
              </button>
            </div>
          </div>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>100% Authentic LGAN Gear</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>Express Delivery Nationwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
