'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { DataService } from '@/lib/storage';
import { formatNaira } from '@/lib/utils';
import { 
  CreditCard, ShieldCheck, Download, CheckCircle2, 
  Clock, AlertCircle, FileText, Lock 
} from 'lucide-react';

export default function MemberDuesPage() {
  const { currentMember, triggerPayment, showToast } = useApp();

  const duesAmount = currentMember?.category === 'JUNIOR' ? 2500 : 5000;
  const isPaid = currentMember?.duesPaid && new Date(currentMember.expiryDate) > new Date();

  const handlePayDues = () => {
    triggerPayment({
      amount: duesAmount,
      paymentType: 'MEMBERSHIP_DUES',
      title: 'LGAN Annual Membership Dues (2026)',
      description: `Annual renewal for ${currentMember?.fullName || 'Member'} (${currentMember?.membershipNumber || 'LGAN-2026-0042'})`,
      onSuccess: (trxRef) => {
        if (currentMember) {
          DataService.updateMember(currentMember.id, {
            duesPaid: true,
            expiryDate: '2026-12-31T23:59:59.000Z',
          });
        }
        showToast('Annual dues renewed successfully! Valid through Dec 31, 2026', 'success');
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Financial Standing
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
          Annual Membership Dues
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Keep your official national membership active to retain WHS handicap indexing and tournament eligibility.
        </p>
      </div>

      {/* Dues Status Banner */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            2026 Season Standing
          </span>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-black font-serif text-slate-900">
              {isPaid ? 'Active Financial Member' : 'Dues Pending Renewal'}
            </h3>
            {isPaid && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Active 2026
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Current Tier: <span className="font-bold text-slate-800">{currentMember?.category || 'FULL'} Member</span> • Valid through December 31, 2026
          </p>
        </div>

        {!isPaid ? (
          <button
            onClick={handlePayDues}
            className="px-6 py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2 shrink-0"
          >
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>Pay {formatNaira(duesAmount)} via Paystack</span>
          </button>
        ) : (
          <button
            onClick={() => alert('Official Electronic Tax Receipt downloaded.')}
            className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2 shrink-0"
          >
            <Download className="w-4 h-4 text-emerald-800" />
            <span>Download PDF Receipt</span>
          </button>
        )}
      </div>

      {/* Payment History Ledger */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h3 className="text-base font-bold font-serif text-slate-900">
            Payment Records &amp; Receipts
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <th className="py-3.5 px-6">Date</th>
                <th className="py-3.5 px-4">Description</th>
                <th className="py-3.5 px-4">Reference</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50 transition">
                <td className="py-4 px-6 font-mono text-slate-600">15 Jan 2026</td>
                <td className="py-4 px-4 font-bold text-slate-900">Annual Membership Dues (2026)</td>
                <td className="py-4 px-4 font-mono text-[11px] text-slate-500">LGAN-PSTK-1710002931</td>
                <td className="py-4 px-4 text-right font-mono font-bold text-[#0B3B24]">{formatNaira(5000)}</td>
                <td className="py-4 px-4 text-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Success
                  </span>
                </td>
                <td className="py-4 px-6 text-right">
                  <button
                    onClick={() => alert('Downloading official PDF receipt for ref: LGAN-PSTK-1710002931')}
                    className="text-xs font-bold text-[#0B3B24] hover:underline flex items-center gap-1 ml-auto"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PDF</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
