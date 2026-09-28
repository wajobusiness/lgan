'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { DataService } from '@/lib/storage';
import { formatNaira } from '@/lib/utils';
import { ShoppingBag, Package, Truck, ArrowRight, ExternalLink } from 'lucide-react';

export default function MemberOrdersPage() {
  const { currentUser } = useApp();
  const orders = DataService.getOrders();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Pro Shop Purchases
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
            My Marketplace Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Track courier deliveries, view itemized receipts, and order histories.
          </p>
        </div>

        <Link
          href="/marketplace"
          className="px-4 py-2.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white text-xs font-bold uppercase tracking-wider shadow-md transition flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>Shop More Items</span>
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
          <Package className="w-12 h-12 text-slate-300 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-lg font-bold font-serif text-slate-900">No Past Orders Found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven&apos;t placed any orders yet. Visit the official Pro Shop to acquire LGAN merchandise and tournament apparel.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="inline-block px-5 py-2.5 rounded-xl bg-[#0B3B24] text-white text-xs font-bold uppercase"
          >
            Browse Pro Shop
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-sm text-slate-900">{order.orderNumber}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {order.status}
                  </span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {order.items.map((item, idx) => (
                  <div key={idx} className="py-2 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-800">{item.productTitle}</span>
                      <p className="text-slate-400">Qty: {item.quantity} • Merchant: {item.vendorName || 'Fairway Pro'}</p>
                    </div>
                    <span className="font-mono font-bold text-[#0B3B24]">{formatNaira(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <Truck className="w-4 h-4 text-emerald-800" />
                  <span>Tracking: <span className="font-mono font-bold text-slate-800">{order.trackingNumber || 'DHL-NG-984210'}</span> ({order.courierName || 'DHL Express'})</span>
                </div>
                <div className="font-mono font-black text-sm text-[#0B3B24]">
                  Total: {formatNaira(order.totalAmount)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
