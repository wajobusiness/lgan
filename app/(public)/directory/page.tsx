'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Users, Search, ShieldCheck, Award, ExternalLink, CheckCircle2 
} from 'lucide-react';
import { INITIAL_MEMBERS } from '@/lib/mockData';

export default function GolferDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClub, setSelectedClub] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const publicMembers = INITIAL_MEMBERS.filter((m) => m.directoryVisible !== false);

  const filteredMembers = publicMembers.filter((member) => {
    const matchesSearch =
      member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.membershipNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.clubName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesClub = selectedClub === 'ALL' || member.clubName === selectedClub;
    const matchesCat = selectedCategory === 'ALL' || member.category === selectedCategory;

    return matchesSearch && matchesClub && matchesCat;
  });

  const uniqueClubs = Array.from(new Set(publicMembers.map((m) => m.clubName)));

  return (
    <div className="space-y-16 pb-24">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#0B3B24] to-[#04190E] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" /> Official Roster
          </span>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
            Verified Golfer Directory
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Search active, financial, and accredited lady golfers across Nigeria with verified WHS handicap indexes.
          </p>
        </div>
      </section>

      {/* SEARCH AND FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, LGAN ID, or club..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B3B24]"
              />
            </div>

            <div>
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B3B24]"
              >
                <option value="ALL">All Golf Clubs</option>
                {uniqueClubs.map((club) => (
                  <option key={club} value={club}>
                    {club}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B3B24]"
              >
                <option value="ALL">All Membership Categories</option>
                <option value="FULL">Full Member</option>
                <option value="LIFE">Life Member / BOT</option>
                <option value="JUNIOR">Junior Member</option>
                <option value="ASSOCIATE">Associate Member</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* MEMBERS TABLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
              Found {filteredMembers.length} Registered Golfers
            </span>
            <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> All listings verified by National Secretariat
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                  <th className="py-4 px-6">Golfer Name</th>
                  <th className="py-4 px-4">LGAN Number</th>
                  <th className="py-4 px-4">Home Golf Club</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4 text-center">Handicap</th>
                  <th className="py-4 px-4 text-center">Status</th>
                  <th className="py-4 px-6 text-right">Digital Card</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-amber-50/30 transition">
                    <td className="py-4 px-6">
                      <div className="font-bold text-slate-900 text-sm">{member.fullName}</div>
                      <div className="text-[11px] text-slate-400 font-medium">{member.zone || 'North Central Zone'}</div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-mono font-bold text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        {member.membershipNumber}
                      </span>
                    </td>

                    <td className="py-4 px-4 font-medium text-slate-700">
                      {member.clubName}
                    </td>

                    <td className="py-4 px-4">
                      <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                        {member.category}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-mono font-black text-amber-700 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                        <Award className="w-3 h-3 text-amber-600" />
                        {member.handicapIndex !== undefined ? member.handicapIndex.toFixed(1) : '18.4'}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" /> Active
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/verify/${member.membershipNumber}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0B3B24] hover:text-emerald-950 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition"
                      >
                        <span>Verify QR</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
