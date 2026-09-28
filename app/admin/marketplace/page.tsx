'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Search, Plus, ExternalLink } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/mockData';
import { formatNaira } from '@/lib/utils';

export default function AdminMarketplaceCatalogPage() {
  const products = INITIAL_PRODUCTS;

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Pro Shop Catalog
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
          Marketplace Moderation &amp; Inventory
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Oversee official merchandise listings, product categories, and pricing.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-3.5 px-6">Product</th>
                <th className="py-3.5 px-4">Merchant</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Retail Price</th>
                <th className="py-3.5 px-4 text-center">Stock</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                      </div>
                      <span className="font-bold text-slate-900">{p.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-slate-600">{p.vendorName}</td>
                  <td className="py-4 px-4 text-slate-500">{p.category}</td>
                  <td className="py-4 px-4 font-mono font-bold text-[#0B3B24]">{formatNaira(p.price)}</td>
                  <td className="py-4 px-4 text-center font-mono font-bold text-slate-700">{p.inventory}</td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/marketplace/${p.slug}`}
                      target="_blank"
                      className="text-xs font-bold text-[#0B3B24] hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Live</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
