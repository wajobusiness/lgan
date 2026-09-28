'use client';

import React, { useState } from 'react';
import { DataService } from '@/lib/storage';
import { useApp } from '@/lib/store';
import { Users, Search, Download, ShieldCheck, CheckCircle2, Award, Filter, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function AdminMembersPage() {
  const { showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState(DataService.getMembers());

  const filtered = members.filter((m) =>
    m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.membershipNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.clubName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            National Registry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
            Member Management &amp; Approvals
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Control membership status, verify WHS handicap credentials, and export national player rosters.
          </p>
        </div>

        <button
          onClick={() => showToast('Exporting Complete National Membership Master List (CSV)...', 'info')}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Export Master CSV</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search member by name, LGAN number, or home club..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full text-xs outline-none bg-transparent"
        />
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <th className="py-3.5 px-6">Golfer Name</th>
                <th className="py-3.5 px-4">LGAN Number</th>
                <th className="py-3.5 px-4">Home Golf Club</th>
                <th className="py-3.5 px-4">Zone</th>
                <th className="py-3.5 px-4 text-center">Handicap Index</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-6 text-right">Verification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">{m.fullName}</td>
                  <td className="py-4 px-4 font-mono font-bold text-emerald-900 bg-emerald-50/60 rounded">
                    {m.membershipNumber}
                  </td>
                  <td className="py-4 px-4 text-slate-700">{m.clubName}</td>
                  <td className="py-4 px-4 text-slate-500">{m.zone}</td>
                  <td className="py-4 px-4 text-center font-mono font-bold text-amber-700">
                    {m.handicapIndex !== undefined ? m.handicapIndex.toFixed(1) : '18.4'}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {m.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Link
                      href={`/verify/${m.membershipNumber}`}
                      target="_blank"
                      className="text-xs font-bold text-[#0B3B24] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Inspect QR</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
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
