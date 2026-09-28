'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { DataService } from '@/lib/storage';
import { ArrowLeft, Save, Plus, ShoppingBag } from 'lucide-react';

export default function NewProductPage() {
  const router = useRouter();
  const { showToast } = useApp();

  const [formData, setFormData] = useState({
    title: '',
    category: 'APPAREL',
    price: 25000,
    compareAtPrice: 30000,
    inventory: 50,
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=600',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const created = {
      id: `prod_${Date.now()}`,
      vendorId: 'vnd_1',
      vendorName: 'Fairway Luxury Pro Shop',
      title: formData.title,
      slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
      description: formData.description,
      price: Number(formData.price),
      compareAtPrice: Number(formData.compareAtPrice),
      category: formData.category,
      inventory: Number(formData.inventory),
      images: [formData.imageUrl],
      featured: false,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString(),
    };

    DataService.addProduct(created);
    showToast('Product published successfully to LGAN Pro Shop!', 'success');
    router.push('/vendor/products');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <Link
        href="/vendor/products"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-semibold transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Product List</span>
      </Link>

      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Catalog Creation
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
          Add New Golf Product
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Publish new equipment, apparel, or golf accessories to thousands of active golfers.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Product Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. LGAN Championship Ladies Golf Cap (White/Gold)"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700"
              >
                <option value="APPAREL">Apparel &amp; Polos</option>
                <option value="CLUBS">Golf Clubs &amp; Sets</option>
                <option value="BALLS">Golf Balls</option>
                <option value="ACCESSORIES">Visors, Bags &amp; Gear</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Price (₦) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Stock Units *</label>
              <input
                type="number"
                required
                value={formData.inventory}
                onChange={(e) => setFormData({ ...formData, inventory: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Product Description</label>
            <textarea
              rows={4}
              required
              placeholder="Detailed specifications, fabric material, sizes, features..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Image URL</label>
            <input
              type="url"
              required
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold uppercase tracking-wider shadow-lg transition flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Publish Product to Pro Shop</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
