'use client';

import React, { useState } from 'react';
import { DataService } from '@/lib/storage';
import { useApp } from '@/lib/store';
import { Building2, Search, Download, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { formatNaira } from '@/lib/utils';

export default function AdminClubsPage() {
  const { showToast } = useApp();
  const [clubs, setClubs] = useState(DataService.getClubs());
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = clubs.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Institutional Registry
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
            Affiliated Golf Clubs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Audit golf facility accreditations, annual ₦25k affiliation subscription standing, and lady captain credentials.
          </p>
        </div>

        <button
          onClick={() => showToast('Exporting Affiliated Clubs Directory (CSV)...', 'info')}
          className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Export Clubs CSV</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search club by name, city, or state..."
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
                <th className="py-3.5 px-6">Golf Club Name</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Layout</th>
                <th className="py-3.5 px-4">Lady Captain</th>
                <th className="py-3.5 px-4 text-center">Lady Members</th>
                <th className="py-3.5 px-6 text-right">Affiliation Standing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="py-4 px-6 font-bold text-slate-900">{c.name}</td>
                  <td className="py-4 px-4 text-slate-600">{c.city}, {c.state}</td>
                  <td className="py-4 px-4 font-mono font-medium">{c.holes} Holes • Par {c.par}</td>
                  <td className="py-4 px-4 font-medium text-slate-800">{c.captainName}</td>
                  <td className="py-4 px-4 text-center font-mono font-bold text-slate-700">{c.memberCount || 30}</td>
                  <td className="py-4 px-6 text-right">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Accredited (2026)
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
