'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Trophy, ShieldCheck, Target, Award, Users, 
  MapPin, Globe, Sparkles, CheckCircle2, ArrowRight 
} from 'lucide-react';
import { ZONAL_DISTRICTS } from '@/lib/utils';

export default function AboutPage() {
  return (
    <div className="space-y-20 pb-24">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#0B3B24] to-[#04190E] text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Heritage &amp; Governance
          </span>

          <h1 className="text-4xl sm:text-6xl font-black font-serif tracking-tight text-white">
            Pioneering Women&apos;s Golf <br />
            <span className="text-amber-400">Across the Nation</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            The Ladies Golf Association of Nigeria (LGAN) is the premier national governing body dedicated to the development, administration, and promotion of ladies&apos; amateur and competitive golf throughout Nigeria.
          </p>
        </div>
      </section>

      {/* MISSION, VISION & PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:shadow-xl transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900">Our Mission</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To foster an inclusive, high-performance ecosystem that nurtures female golfing talent from grassroot juniors to international championships while upholding the highest traditions of sportsmanship and integrity.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:shadow-xl transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900">Our Vision</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To establish Nigeria as Africa&apos;s foremost powerhouse in women&apos;s golf, producing world-class champions and empowering women through leadership, fellowship, and healthy recreation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md space-y-4 hover:shadow-xl transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-900">Our Governance</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Operating under a robust constitutional framework affiliated with the Nigeria Golf Federation (NGF), the R&amp;A St Andrews, and the Golf Union of Africa (GUA), enforcing the World Handicap System (WHS).
            </p>
          </div>
        </div>
      </section>

      {/* HISTORICAL TIMELINE & HERITAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B3B24] text-white rounded-3xl p-8 sm:p-12 border border-emerald-800/60 shadow-2xl space-y-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 font-mono">
              Over 4 Decades of Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif">
              The Evolution of LGAN
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              From an informal fellowship of trailblazing lady golfers in Lagos, Kaduna, and Jos in the late 1970s and 1980s to an incorporated national body spanning all 36 states and the FCT, LGAN has continually elevated Nigerian women on the continental stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4 border-t border-emerald-800/80">
            <div className="space-y-2">
              <span className="text-2xl font-black font-mono text-amber-400">1980s</span>
              <h4 className="text-sm font-bold text-white">Foundation</h4>
              <p className="text-xs text-slate-300">
                Pioneering lady golfers unite to establish the national constitution and regional opens across Nigeria.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-2xl font-black font-mono text-amber-400">1996</span>
              <h4 className="text-sm font-bold text-white">Continental Debut</h4>
              <p className="text-xs text-slate-300">
                Nigeria participates in the inaugural All Africa Challenge Trophy (AACT), establishing international standing.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-2xl font-black font-mono text-amber-400">2018</span>
              <h4 className="text-sm font-bold text-white">Zonal Expansion</h4>
              <p className="text-xs text-slate-300">
                Formal decentralization into 6 Geopolitical Zones with elected Zonal Vice Presidents and Junior Academies.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-2xl font-black font-mono text-amber-400">2026</span>
              <h4 className="text-sm font-bold text-white">AACT Host Nation</h4>
              <p className="text-xs text-slate-300">
                Nigeria hosts 24+ African nations for the historic 2026 All Africa Challenge Trophy in Abuja.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6 GEOPOLITICAL ZONES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            Decentralized Administration
          </span>
          <h2 className="text-3xl sm:text-4xl font-black font-serif text-slate-900">
            The Six Geopolitical Zonal Councils
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            LGAN guarantees equitable national representation and localized development through six regional zonal hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ZONAL_DISTRICTS.map((zone) => (
            <div
              key={zone.name}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-[#0B3B24] transition space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {zone.headquarters} Hub
                </span>
                <MapPin className="w-4 h-4 text-emerald-800" />
              </div>

              <h4 className="text-lg font-bold font-serif text-slate-900">{zone.name}</h4>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Covered States:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {zone.states.map((st) => (
                    <span
                      key={st}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium"
                    >
                      {st}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA JOIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-black font-serif">
              Become a Part of Nigeria&apos;s Golfing Legacy
            </h3>
            <p className="text-xs sm:text-sm text-slate-900 font-medium">
              Join over 1,500 registered lady golfers and access official WHS handicap tracking, national tournaments, and exclusive association privileges.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/register/member"
              className="px-6 py-3 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition"
            >
              Register as Member
            </Link>
            <Link
              href="/clubs"
              className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition"
            >
              View Affiliated Clubs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
