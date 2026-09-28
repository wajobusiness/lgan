'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Store, ShoppingBag, TrendingUp, Package, 
  CreditCard, Plus, ArrowRight, DollarSign 
} from 'lucide-react';
import { INITIAL_PRODUCTS } from '@/lib/mockData';
import { formatNaira } from '@/lib/utils';

export default function VendorDashboardPage() {
  const products = INITIAL_PRODUCTS;

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-[#0B3B24] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">
            Pro Shop Merchant
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif">
            Fairway Luxury Pro Shop
          </h1>
          <p className="text-xs text-slate-300">
            Official LGAN Marketplace Vendor • Commission: 10% Platform Retention
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/vendor/products/new"
            className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </Link>
          <Link
            href="/vendor/earnings"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition border border-white/20 flex items-center gap-2"
          >
            <TrendingUp className="w-4 h-4 text-amber-400" />
            <span>Payouts &amp; Balance</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Sales Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="text-2xl font-black font-mono text-slate-900">{formatNaira(4850000)}</p>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
            +18% from last month
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Available Payout</span>
            <CreditCard className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black font-mono text-[#0B3B24]">{formatNaira(1250000)}</p>
          <span className="text-[10px] text-slate-400 font-medium">Net of 10% LGAN commission</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Active Products</span>
            <ShoppingBag className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="text-2xl font-black text-slate-900">{products.length}</p>
          <span className="text-[10px] text-slate-400">All inventory in stock</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Fulfilled Orders</span>
            <Package className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="text-2xl font-black text-slate-900">48 Orders</p>
          <span className="text-[10px] text-emerald-700 font-bold">100% On-Time Delivery</span>
        </div>
      </div>

      {/* Products Catalog Summary */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-serif text-slate-900">
              Active Store Listings
            </h3>
            <p className="text-xs text-slate-500">Live products in the official LGAN Pro Shop</p>
          </div>
          <Link
            href="/vendor/products"
            className="text-xs font-bold text-[#0B3B24] hover:underline flex items-center gap-1"
          >
            <span>Manage All Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-3 px-6">Product Title</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-center">Inventory</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-6 font-bold text-slate-900">{p.title}</td>
                  <td className="py-3.5 px-4 text-slate-500">{p.category}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0B3B24]">{formatNaira(p.price)}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold">{p.inventory} units</td>
                  <td className="py-3.5 px-6 text-right">
                    <Link href={`/marketplace/${p.slug}`} target="_blank" className="text-xs font-bold text-[#0B3B24] hover:underline">
                      View Live →
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
