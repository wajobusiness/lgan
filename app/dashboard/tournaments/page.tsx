'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Trophy, Calendar, MapPin, CheckCircle2, 
  ArrowRight, Award, Clock 
} from 'lucide-react';
import { INITIAL_TOURNAMENTS } from '@/lib/mockData';
import { formatNaira } from '@/lib/utils';

export default function MemberTournamentsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Competitions
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
            My Tournament Entries &amp; Draws
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Track your confirmed championship entries, tee times, pairings, and scoring leaderboards.
          </p>
        </div>

        <Link
          href="/events"
          className="px-4 py-2.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white text-xs font-bold uppercase tracking-wider shadow-md transition flex items-center gap-2"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>Browse 2026 Calendar</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INITIAL_TOURNAMENTS.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 flex flex-col justify-between space-y-4 hover:shadow-lg transition"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {t.format}
                </span>
                <span className="text-[10px] font-bold uppercase text-amber-600 font-mono">
                  {t.status.replace(/_/g, ' ')}
                </span>
              </div>

              <h3 className="text-base font-bold font-serif text-slate-900 leading-snug">{t.title}</h3>

              <div className="space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{t.startDate.split('T')[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                  <span>{t.location}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#0B3B24]">
                {t.entryFee === 0 ? 'Free' : formatNaira(t.entryFee)}
              </span>
              <Link
                href={`/events/${t.slug}`}
                className="text-xs font-bold text-[#0B3B24] hover:underline inline-flex items-center gap-1"
              >
                <span>View Details &amp; Draw</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
