'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { formatNaira } from '@/lib/utils';
import { TrendingUp, CreditCard, DollarSign, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function VendorEarningsPage() {
  const { showToast } = useApp();
  const [balance, setBalance] = useState(1250000);
  const [withdrawing, setWithdrawing] = useState(false);

  const handleWithdraw = () => {
    setWithdrawing(true);
    setTimeout(() => {
      setWithdrawing(false);
      setBalance(0);
      showToast('Payout request of ₦1,250,000 initiated to GTBank Account 0123456789!', 'success');
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Financial Settlements
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
          Earnings &amp; Merchant Payouts
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Track net sales revenue after the standard 10% LGAN platform retention and request instant bank disbursement.
        </p>
      </div>

      <div className="bg-gradient-to-br from-[#0B3B24] to-[#04190E] p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-amber-400/40">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            Withdrawable Merchant Balance
          </span>
          <div className="text-4xl sm:text-5xl font-black font-mono">
            {formatNaira(balance)}
          </div>
          <p className="text-xs text-slate-300">
            Reconciled net revenue ready for disbursement to GTBank • 0123456789
          </p>
        </div>

        {balance > 0 ? (
          <button
            onClick={handleWithdraw}
            disabled={withdrawing}
            className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2 shrink-0 disabled:opacity-50"
          >
            <CreditCard className="w-4 h-4" />
            <span>{withdrawing ? 'Processing Transfer...' : 'Request Instant Payout'}</span>
          </button>
        ) : (
          <span className="text-xs text-emerald-300 font-bold bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-800">
            ✓ All Balance Disbursed
          </span>
        )}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-base font-bold font-serif text-slate-900">
          Commission &amp; Settlement Policy
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-800 block">Platform Commission</span>
            <p className="text-slate-500">LGAN retains 10% on marketplace gross sales for maintenance &amp; payment gateway processing.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-bold text-slate-800 block">Payout Schedule</span>
            <p className="text-slate-500">Withdrawals are processed automatically via Paystack Transfers directly to your Nigerian commercial bank account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
