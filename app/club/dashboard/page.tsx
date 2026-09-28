'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building2, Users, CreditCard, Trophy, 
  ShieldCheck, FileText, ArrowRight, Download 
} from 'lucide-react';
import { INITIAL_CLUBS, INITIAL_MEMBERS } from '@/lib/mockData';
import { formatNaira } from '@/lib/utils';

export default function ClubDashboardPage() {
  const club = INITIAL_CLUBS[0]; // IBB Golf Club
  const clubMembers = INITIAL_MEMBERS.filter((m) => m.clubName.includes('IBB'));

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-[#0B3B24] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">
            Accredited Club Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif">
            {club.name}
          </h1>
          <p className="text-xs text-slate-300">
            {club.city}, {club.state} • {club.zone} Zone • {club.holes} Holes (Par {club.par})
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/club/members"
            className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            <span>Manage Roster</span>
          </Link>
          <Link
            href="/club/subscription"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition border border-white/20 flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4 text-amber-400" />
            <span>Affiliation Dues</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Registered Ladies</span>
            <Users className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="text-2xl font-black text-slate-900">{club.memberCount || 140}</p>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
            Full Section Roster
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Affiliation Standing</span>
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700">Active (2026)</p>
          <span className="text-[10px] text-slate-400 font-medium">Valid through Dec 31, 2026</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Lady Captain</span>
            <Building2 className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="text-sm font-bold text-slate-900 truncate">{club.captainName}</p>
          <span className="text-[10px] text-slate-400">Head of Ladies Section</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Sanctioned Opens</span>
            <Trophy className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-slate-900">2 Tournaments</p>
          <span className="text-[10px] text-amber-700 font-bold">Includes AACT 2026</span>
        </div>
      </div>

      {/* Roster Preview */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-serif text-slate-900">
              Active Ladies Section Golfers
            </h3>
            <p className="text-xs text-slate-500">Verified members affiliated with this club</p>
          </div>
          <Link
            href="/club/members"
            className="text-xs font-bold text-[#0B3B24] hover:underline flex items-center gap-1"
          >
            <span>View Full Section Roster</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-3 px-6">Golfer Name</th>
                <th className="py-3 px-4">LGAN Number</th>
                <th className="py-3 px-4">Tier</th>
                <th className="py-3 px-4 text-center">Handicap Index</th>
                <th className="py-3 px-6 text-right">Dues Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clubMembers.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-6 font-bold text-slate-900">{m.fullName}</td>
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-900">{m.membershipNumber}</td>
                  <td className="py-3.5 px-4 text-slate-600">{m.category}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold">{m.handicapIndex?.toFixed(1) || '18.0'}</td>
                  <td className="py-3.5 px-6 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Dues Paid
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
