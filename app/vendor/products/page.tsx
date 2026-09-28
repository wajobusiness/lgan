'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Plus, Search, Edit3, Trash2 } from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/mockData';
import { formatNaira } from '@/lib/utils';
import { useApp } from '@/lib/store';

export default function VendorProductsPage() {
  const { showToast } = useApp();
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Store Inventory
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
            Product Catalog
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage your store listings, stock quantities, and pricing on the LGAN Marketplace.
          </p>
        </div>

        <Link
          href="/vendor/products/new"
          className="px-4 py-2.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white text-xs font-bold uppercase tracking-wider shadow-md transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add New Product</span>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search products by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full text-xs outline-none bg-transparent"
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-3 px-6">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-center">Stock</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                        <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 block">{p.title}</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {p.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-slate-600">{p.category}</td>
                  <td className="py-4 px-4 font-mono font-bold text-[#0B3B24]">{formatNaira(p.price)}</td>
                  <td className="py-4 px-4 text-center font-mono font-bold text-slate-700">{p.inventory}</td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <Link
                      href={`/marketplace/${p.slug}`}
                      target="_blank"
                      className="text-xs font-bold text-[#0B3B24] hover:underline"
                    >
                      View Live
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
