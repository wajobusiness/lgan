'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useApp } from '@/lib/store';
import { formatNaira } from '@/lib/utils';
import { 
  Trophy, Calendar, MapPin, Users, 
  CreditCard, ArrowLeft, ShieldCheck 
} from 'lucide-react';
import { INITIAL_TOURNAMENTS } from '@/lib/mockData';
import TournamentLeaderboard from '@/components/ui/TournamentLeaderboard';

export default function TournamentDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { triggerPayment, showToast } = useApp();

  const tournament = INITIAL_TOURNAMENTS.find((t) => t.slug === slug) || INITIAL_TOURNAMENTS[0];

  const handleRegister = () => {
    triggerPayment({
      amount: tournament.entryFee,
      paymentType: 'TOURNAMENT_ENTRY',
      title: `Tournament Entry: ${tournament.title}`,
      description: `Player entry fee for ${tournament.format} championship`,
      metadata: { tournamentId: tournament.id },
      onSuccess: () => {
        showToast('Successfully registered for tournament!', 'success');
      },
    });
  };

  return (
    <div className="space-y-16 pb-24">
      {/* HEADER HERO */}
      <section className="bg-gradient-to-b from-[#0B3B24] to-[#04190E] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto space-y-6">
          <Link
            href="/events"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-white transition font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Tournament Schedule</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider font-mono">
                  {tournament.format}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  {tournament.status}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight text-white">
                {tournament.title}
              </h1>

              {tournament.subtitle && (
                <p className="text-base text-amber-200 font-serif italic">
                  {tournament.subtitle}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-2 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-amber-400" />
                  <span>{tournament.startDate.split('T')[0]} to {tournament.endDate.split('T')[0]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-amber-400" />
                  <span>{tournament.location}</span>
                </div>
              </div>
            </div>

            {/* Registration Card */}
            <div className="bg-white text-slate-900 p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4 lg:w-80 shrink-0">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Entry Registration</span>
                <div className="text-2xl font-black text-slate-900 font-mono mt-0.5">
                  {tournament.entryFee === 0 ? 'Free Entry' : formatNaira(tournament.entryFee)}
                </div>
              </div>

              <div className="text-xs text-slate-500 space-y-1.5 border-y border-slate-100 py-3">
                <div className="flex justify-between">
                  <span>Field Capacity:</span>
                  <span className="font-bold text-slate-900">{tournament.maxParticipants} Players</span>
                </div>
                <div className="flex justify-between">
                  <span>Slots Taken:</span>
                  <span className="font-bold text-emerald-700">{tournament.registeredCount} Registered</span>
                </div>
                <div className="flex justify-between">
                  <span>Registration Closes:</span>
                  <span className="font-bold text-rose-600">{tournament.registrationDeadline.split('T')[0]}</span>
                </div>
              </div>

              <button
                onClick={handleRegister}
                className="w-full py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
              >
                <CreditCard className="h-4 w-4 text-amber-400" />
                <span>Register &amp; Pay Entry Fee</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TOURNAMENT OVERVIEW & RULES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
              <h3 className="text-xl font-bold font-serif text-slate-900">Tournament Overview &amp; Format</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {tournament.description}
              </p>
              {tournament.rules && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 uppercase tracking-wider text-[10px] block">
                    Tournament Rules &amp; Regulations
                  </span>
                  <p>{tournament.rules}</p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-slate-900 font-serif">Host Facility Details</h4>
              <p className="text-xs text-slate-600">
                {tournament.venueClubName || 'IBB International Golf Club Abuja'}
              </p>
              <div className="pt-2 text-xs text-emerald-800 font-semibold">
                18-Hole Championship Layout • Slope 132
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE LEADERBOARD SCORING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            Championship Scores
          </span>
          <h2 className="text-3xl font-black font-serif text-slate-900">
            Official Live Leaderboard
          </h2>
        </div>

        <TournamentLeaderboard 
          participants={tournament.leaderboard || []}
          tournamentTitle={tournament.title}
        />
      </section>
    </div>
  );
}
