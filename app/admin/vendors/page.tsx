'use client';

import React, { useState } from 'react';
import { Store, Search, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { formatNaira } from '@/lib/utils';

export default function AdminVendorsPage() {
  const vendors = [
    {
      id: 'vnd_1',
      businessName: 'Fairway Luxury Pro Shop',
      contactName: 'Mrs. Ngozi Okonkwo',
      email: 'sales@fairwaygolf.ng',
      phone: '+234 803 344 5566',
      totalSales: 4850000,
      commissionRate: 10,
      status: 'APPROVED',
      bankName: 'GTBank',
      accountNumber: '0123456789',
    },
    {
      id: 'vnd_2',
      businessName: 'Eagle Crest Golf Apparel Abuja',
      contactName: 'Lady Victoria Bello',
      email: 'contact@eaglecrest.ng',
      phone: '+234 802 888 4422',
      totalSales: 1200000,
      commissionRate: 10,
      status: 'APPROVED',
      bankName: 'Zenith Bank',
      accountNumber: '1098234120',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Marketplace Moderation
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
          Registered Vendors &amp; Merchants
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Approve golf merchant applications, audit store sales, and monitor 10% platform commission retention.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-3.5 px-6">Store Name</th>
                <th className="py-3.5 px-4">Contact Person</th>
                <th className="py-3.5 px-4">Bank Settlement Account</th>
                <th className="py-3.5 px-4 text-right">Gross Sales</th>
                <th className="py-3.5 px-4 text-right">LGAN 10% Retained</th>
                <th className="py-3.5 px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {vendors.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">{v.businessName}</td>
                  <td className="py-4 px-4 text-slate-700">{v.contactName}</td>
                  <td className="py-4 px-4 font-mono text-[11px] text-slate-500">
                    {v.bankName} • {v.accountNumber}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-slate-900">
                    {formatNaira(v.totalSales)}
                  </td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-[#0B3B24]">
                    {formatNaira(Math.round(v.totalSales * 0.10))}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {v.status}
                    </span>
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
