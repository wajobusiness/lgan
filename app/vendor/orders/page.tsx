'use client';

import React from 'react';
import { DataService } from '@/lib/storage';
import { formatNaira } from '@/lib/utils';
import { Package, Truck, CheckCircle2, Search } from 'lucide-react';

export default function VendorOrdersPage() {
  const orders = DataService.getOrders();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Order Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
          Customer Orders &amp; Fulfillment
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Process customer orders, assign courier waybills, and update shipment tracking.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {orders.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">
            No marketplace customer orders yet. When customers check out, their orders will appear here for fulfillment.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                  <th className="py-3 px-6">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">Gross Total</th>
                  <th className="py-3 px-4">Net (After 10% Fee)</th>
                  <th className="py-3 px-6 text-right">Courier Tracking</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">{o.orderNumber}</td>
                    <td className="py-4 px-4 font-medium text-slate-800">{o.customerName}</td>
                    <td className="py-4 px-4 text-slate-500">{o.city}, {o.state}</td>
                    <td className="py-4 px-4 font-mono font-bold text-slate-900">{formatNaira(o.totalAmount)}</td>
                    <td className="py-4 px-4 font-mono font-bold text-[#0B3B24]">
                      {formatNaira(Math.round(o.totalAmount * 0.90))}
                    </td>
                    <td className="py-4 px-6 text-right font-mono text-emerald-800 font-bold">
                      {o.trackingNumber || 'DHL-NG-998201'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
