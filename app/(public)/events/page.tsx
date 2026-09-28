'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Trophy, Calendar, MapPin, Users, Filter, 
  Search, ArrowRight, CheckCircle2, Award 
} from 'lucide-react';
import { INITIAL_TOURNAMENTS } from '@/lib/mockData';
import { formatNaira } from '@/lib/utils';

export default function EventsSchedulePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('ALL');

  const filtered = INITIAL_TOURNAMENTS.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFormat = selectedFormat === 'ALL' || t.format === selectedFormat;
    return matchesSearch && matchesFormat;
  });

  return (
    <div className="space-y-16 pb-24">
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#0B3B24] to-[#04190E] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest">
            <Trophy className="w-3.5 h-3.5" /> 2026 Championship Fixtures
          </span>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
            National Tournament Calendar
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Official LGAN sanctioned opens, zonal trophies, and the flagship 2026 All Africa Challenge Trophy.
          </p>
        </div>
      </section>

      {/* SEARCH AND FORMAT FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search championships by title or venue..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B3B24]"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Format:</span>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="text-xs py-2 px-3 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:border-[#0B3B24]"
            >
              <option value="ALL">All Championship Formats</option>
              <option value="STROKE_PLAY">Stroke Play</option>
              <option value="MATCH_PLAY">Match Play</option>
              <option value="STABLEFORD">Stableford</option>
            </select>
          </div>
        </div>
      </section>

      {/* TOURNAMENTS LIST */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] uppercase font-mono">
                    {t.format}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-bold text-[10px] uppercase border border-emerald-200">
                    {t.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-serif text-slate-900 leading-snug">
                  {t.title}
                </h3>
                {t.subtitle && (
                  <p className="text-xs text-amber-700 font-serif italic">{t.subtitle}</p>
                )}

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {t.description}
                </p>

                <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-800" />
                    <span>{t.startDate.split('T')[0]} to {t.endDate.split('T')[0]}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-800" />
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>

              {/* Registration / Details action */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center space-y-3 lg:w-64 shrink-0">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Entry Fee</span>
                  <span className="text-2xl font-black font-mono text-[#0B3B24]">
                    {t.entryFee === 0 ? 'Free' : formatNaira(t.entryFee)}
                  </span>
                </div>

                <div className="text-[11px] text-slate-500">
                  <span>{t.registeredCount} / {t.maxParticipants} Registered</span>
                </div>

                <Link
                  href={`/events/${t.slug}`}
                  className="w-full py-3 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <span>Register &amp; Draw</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
