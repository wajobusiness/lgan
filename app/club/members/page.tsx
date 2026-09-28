'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { INITIAL_MEMBERS } from '@/lib/mockData';
import { Users, Search, Download, Plus, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ClubMembersRosterPage() {
  const { showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState(INITIAL_MEMBERS.filter((m) => m.clubName.includes('IBB')));

  const filtered = members.filter((m) =>
    m.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.membershipNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Roster Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
            Ladies Section Member Roster
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            View registered lady golfers affiliated with this club, verify payment status, and export official lists.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Exporting Ladies Section CSV Roster...', 'info')}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export CSV Roster</span>
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search club member by name or LGAN ID..."
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
                <th className="py-3.5 px-6">Golfer Full Name</th>
                <th className="py-3.5 px-4">LGAN Number</th>
                <th className="py-3.5 px-4">Tier</th>
                <th className="py-3.5 px-4 text-center">Handicap Index</th>
                <th className="py-3.5 px-4">Phone / Contact</th>
                <th className="py-3.5 px-6 text-right">Dues Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">{m.fullName}</td>
                  <td className="py-4 px-4 font-mono font-bold text-emerald-900 bg-emerald-50/50 rounded">
                    {m.membershipNumber}
                  </td>
                  <td className="py-4 px-4 text-slate-600">{m.category}</td>
                  <td className="py-4 px-4 text-center font-mono font-bold text-amber-700">
                    {m.handicapIndex?.toFixed(1) || '18.4'}
                  </td>
                  <td className="py-4 px-4 text-slate-500">{m.phone || '+234 803 000 0000'}</td>
                  <td className="py-4 px-6 text-right">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Dues Active (2026)
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
