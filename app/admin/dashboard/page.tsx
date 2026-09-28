'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Users, Building2, Store, CreditCard, 
  ShoppingBag, Trophy, ArrowRight, ShieldCheck, Download, Sparkles 
} from 'lucide-react';
import { INITIAL_MEMBERS, INITIAL_CLUBS, INITIAL_PRODUCTS, INITIAL_TOURNAMENTS } from '@/lib/mockData';
import { formatNaira } from '@/lib/utils';
import { DataService } from '@/lib/storage';

export default function AdminDashboardOverview() {
  const members = DataService.getMembers();
  const clubs = DataService.getClubs();
  const products = DataService.getProducts();
  const tourneys = DataService.getTournaments();
  const payments = DataService.getPayments();

  const totalDuesRevenue = members.filter(m => m.duesPaid).length * 5000;
  const totalClubRevenue = clubs.length * 25000;
  const totalRevenue = totalDuesRevenue + totalClubRevenue + 485000; // includes 10% commission

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-[#0B3B24] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">
            Executive Directorate
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif">
            LGAN National Control Center
          </h1>
          <p className="text-xs text-slate-300">
            Governing Body Ecosystem: 1,500+ Members • 50+ Affiliated Clubs • 6 Geopolitical Zones
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/payments"
            className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2"
          >
            <CreditCard className="w-4 h-4" />
            <span>Paystack Ledger</span>
          </Link>
          <Link
            href="/admin/events"
            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition border border-white/20 flex items-center gap-2"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Tournaments &amp; Draws</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Total Revenue (2026)</span>
            <CreditCard className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="text-2xl font-black font-mono text-[#0B3B24]">{formatNaira(totalRevenue)}</p>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
            Dues + Subscriptions + 10% Comm.
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Registered Members</span>
            <Users className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="text-2xl font-black text-slate-900">{members.length + 1520}</p>
          <span className="text-[10px] text-slate-500">Across 6 Geopolitical Zones</span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">Affiliated Clubs</span>
            <Building2 className="w-4 h-4 text-emerald-800" />
          </div>
          <p className="text-2xl font-black text-slate-900">{clubs.length + 45}</p>
          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
            100% Accredited
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase">AACT 2026 Preparations</span>
            <Trophy className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-700">24 Nations</p>
          <span className="text-[10px] text-slate-500">Abuja Host Secretariat</span>
        </div>
      </div>

      {/* Quick Approvals & Management Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Member Registrations */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold font-serif text-slate-900">
                Recent Member Accreditations
              </h3>
              <p className="text-xs text-slate-500">Latest golfers inducted into national registry</p>
            </div>
            <Link
              href="/admin/members"
              className="text-xs font-bold text-[#0B3B24] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                  <th className="py-3 px-6">Name</th>
                  <th className="py-3 px-4">LGAN Number</th>
                  <th className="py-3 px-4">Club</th>
                  <th className="py-3 px-6 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.slice(0, 5).map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="py-3.5 px-6 font-bold text-slate-900">{m.fullName}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-900">{m.membershipNumber}</td>
                    <td className="py-3.5 px-4 text-slate-600 truncate max-w-[160px]">{m.clubName}</td>
                    <td className="py-3.5 px-6 text-right">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Approved
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Operations */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold font-serif text-slate-900 border-b border-slate-100 pb-3">
              Administrative Quick Actions
            </h3>

            <div className="space-y-2 text-xs font-semibold">
              <Link
                href="/admin/content"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:text-[#0B3B24] transition border border-slate-100"
              >
                <span>Broadcast National Announcement</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/admin/events"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:text-[#0B3B24] transition border border-slate-100"
              >
                <span>Publish New Championship Draw</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/admin/clubs"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:text-[#0B3B24] transition border border-slate-100"
              >
                <span>Certify Affiliated Club</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link
                href="/admin/payments"
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:text-[#0B3B24] transition border border-slate-100"
              >
                <span>Export Paystack Settlement Audit</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
