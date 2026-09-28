'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { formatNaira } from '@/lib/utils';
import { 
  QrCode, CreditCard, Award, Calendar, 
  ShoppingBag, ShieldCheck, ArrowRight, CheckCircle2, AlertCircle 
} from 'lucide-react';
import DigitalMemberCard from '@/components/ui/DigitalMemberCard';

export default function MemberDashboardOverview() {
  const { currentMember, currentUser, triggerPayment } = useApp();

  const member = currentMember || {
    id: 'mem_1',
    membershipNumber: 'LGAN-2026-0042',
    fullName: currentUser?.name || 'Dr. (Mrs.) Lami O. Ahmed',
    clubName: 'IBB International Golf & Country Club, Abuja',
    zone: 'North Central',
    category: 'LIFE',
    handicapIndex: 11.2,
    status: 'ACTIVE',
    expiryDate: '2026-12-31T23:59:59.000Z',
    duesPaid: true,
  };

  const isDuesPaid = member.duesPaid && new Date(member.expiryDate) > new Date();

  return (
    <div className="space-y-8 pb-16">
      {/* Welcome Banner */}
      <div className="bg-[#0B3B24] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">
            Welcome, Golfer
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif">
            {member.fullName}
          </h1>
          <p className="text-xs text-slate-300">
            {member.clubName} • <span className="text-amber-300 font-semibold">{member.category} Member</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/digital-card"
            className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Digital Card</span>
          </Link>
          <Link
            href="/dashboard/handicap"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition border border-white/20 flex items-center gap-2"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Post Score</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">LGAN Number</span>
            <QrCode className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="text-xl font-mono font-black text-slate-900">{member.membershipNumber}</p>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
            Verified Pass
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Handicap Index</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-xl font-mono font-black text-amber-700">
            {member.handicapIndex !== undefined ? member.handicapIndex.toFixed(1) : '18.4'}
          </p>
          <span className="text-[10px] text-slate-400 font-medium">World Handicap System (WHS)</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">2026 Annual Dues</span>
            <CreditCard className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="text-xl font-black text-slate-900">
            {isDuesPaid ? 'Paid' : 'Pending (₦5,000)'}
          </p>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
              isDuesPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}
          >
            {isDuesPaid ? 'Good Standing' : 'Action Required'}
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">AACT 2026</span>
            <Calendar className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="text-xl font-black text-slate-900">Abuja Host</p>
          <span className="text-[10px] text-amber-700 font-bold">Oct 18 – 24, 2026</span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Digital Card Preview */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <h3 className="text-sm font-bold font-serif text-slate-900">
              Active Member Pass
            </h3>
            <Link href="/dashboard/digital-card" className="text-xs text-[#0B3B24] font-bold hover:underline">
              Full View &amp; QR →
            </Link>
          </div>

          <div className="flex justify-center py-2">
            <div className="w-full max-w-sm">
              <DigitalMemberCard member={member as any} />
            </div>
          </div>
        </div>

        {/* Quick Links & Upcoming Entries */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-100 pb-3">
              Association Announcements
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900 block">
                  ★ AACT 2026 Continental Entries Open
                </span>
                <p className="text-slate-600 leading-relaxed">
                  National trials for the Nigerian representative squad will take place in Abuja this August.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">
                  WHS Slope Calculation Update
                </span>
                <p className="text-slate-600 leading-relaxed">
                  Ensure at least 3 attested 18-hole scorecards are logged quarterly to maintain active tournament seeding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
