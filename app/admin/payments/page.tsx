'use client';

import React from 'react';
import { DataService } from '@/lib/storage';
import { formatNaira } from '@/lib/utils';
import { useApp } from '@/lib/store';
import { CreditCard, Download, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react';

export default function AdminPaymentsPage() {
  const { showToast } = useApp();
  const payments = DataService.getPayments();

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Treasury &amp; Ledger
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
            Paystack Transaction Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time audit of all membership dues, club subscriptions, marketplace orders, and merchant payouts.
          </p>
        </div>

        <button
          onClick={() => showToast('Exporting Complete 2026 Paystack Reconciliation Ledger (CSV)...', 'info')}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Export Ledger CSV</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-3.5 px-6">Timestamp</th>
                <th className="py-3.5 px-4">Paystack Reference</th>
                <th className="py-3.5 px-4">Payer / Remitter</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-6 text-right">Settlement Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-mono text-slate-500">
                    {new Date(p.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-slate-900">{p.reference}</td>
                  <td className="py-4 px-4 font-medium text-slate-800">{p.userName}</td>
                  <td className="py-4 px-4 text-slate-600">{p.type.replace(/_/g, ' ')}</td>
                  <td className="py-4 px-4 text-right font-mono font-bold text-[#0B3B24]">{formatNaira(p.amount)}</td>
                  <td className="py-4 px-6 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Settled via Paystack
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
