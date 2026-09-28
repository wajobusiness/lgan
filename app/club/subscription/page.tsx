'use client';

import React from 'react';
import { useApp } from '@/lib/store';
import { INITIAL_CLUBS } from '@/lib/mockData';
import { formatNaira } from '@/lib/utils';
import { 
  Building2, CreditCard, ShieldCheck, Download, 
  CheckCircle2, Award, Calendar, FileText 
} from 'lucide-react';

export default function ClubSubscriptionPage() {
  const { triggerPayment, showToast } = useApp();
  const club = INITIAL_CLUBS[0];
  const fee = 25000;

  const handleRenew = () => {
    triggerPayment({
      amount: fee,
      paymentType: 'CLUB_SUBSCRIPTION',
      title: `LGAN Annual Affiliation: ${club.name}`,
      description: 'Annual ladies section institutional accreditation for the 2026 season',
      onSuccess: () => {
        showToast(`Club affiliation renewed successfully through 2026!`, 'success');
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Institutional Affiliation
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
          Annual Club Affiliation Subscription
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Maintain your golf facility&apos;s accreditation with LGAN to host sanctioned tournaments and issue valid WHS scorecards.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase">Facility Name</span>
            <h3 className="text-xl font-bold font-serif text-slate-900">{club.name}</h3>
            <p className="text-xs text-slate-500">{club.city}, {club.state} • {club.zone} Zone</p>
          </div>

          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <ShieldCheck className="w-4 h-4" /> Accredited Facility (2026)
            </span>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">Expires: 31 Dec 2026</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Annual Fee</span>
            <p className="text-xl font-mono font-black text-[#0B3B24]">{formatNaira(fee)}</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Sanction Status</span>
            <p className="text-sm font-bold text-slate-800">Full Championship Rights</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-slate-400 font-bold uppercase text-[10px]">WHS Calibration</span>
            <p className="text-sm font-bold text-slate-800">Course Slope 132 Validated</p>
          </div>
        </div>

        <div className="flex gap-4 pt-2">
          <button
            onClick={handleRenew}
            className="px-6 py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>Pay Affiliation Dues ({formatNaira(fee)})</span>
          </button>

          <button
            onClick={() => alert('Downloading official LGAN 2026 Club Accreditation Certificate (PDF)...')}
            className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs uppercase tracking-wider transition flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-800" />
            <span>Download Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
