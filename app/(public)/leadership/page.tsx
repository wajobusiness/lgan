'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Award, Mail, Phone, Sparkles } from 'lucide-react';
import { ZONAL_DISTRICTS } from '@/lib/utils';

export default function LeadershipPage() {
  const necOfficers = [
    {
      name: 'Dr. (Mrs.) Lami O. Ahmed',
      role: 'National President / Executive Lead',
      club: 'IBB International Golf & Country Club, Abuja',
      zone: 'North Central',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      bio: 'Visionary golf administrator championing grassroots ladies development, digital governance, and securing the 2026 AACT continental hosting rights.',
    },
    {
      name: 'Otunba (Mrs.) Olushola Adekanola',
      role: '1st Vice President',
      club: 'Ikoyi Club 1938, Lagos',
      zone: 'South West',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&q=80&w=400',
      bio: 'Leading strategic alliances, corporate sponsorships, and premier national championships.',
    },
    {
      name: 'Lady Victoria Nnamani',
      role: 'Honorary Secretary General',
      club: 'Enugu Golf Club 1935',
      zone: 'South East',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
      bio: 'Oversees constitutional compliance, national secretariat operations, and affiliated club accreditations.',
    },
    {
      name: 'Mrs. Evelyn Oyome',
      role: 'National Tournament Director',
      club: 'Ikoyi Club 1938, Lagos',
      zone: 'South West',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      bio: 'Multi-champion tournament veteran directing national stroke play draws, course setup, and WHS handicapping.',
    },
  ];

  return (
    <div className="space-y-20 pb-24">
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#0B3B24] to-[#04190E] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" /> Governance &amp; Administration
          </span>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
            National Executive Leadership
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Meet the distinguished trustees, executive committee members, and zonal vice presidents steering LGAN into a new digital era.
          </p>
        </div>
      </section>

      {/* NATIONAL EXECUTIVE COMMITTEE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            Executive Directorate
          </span>
          <h2 className="text-3xl font-black font-serif text-slate-900">
            National Executive Officers (NEC)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {necOfficers.map((officer) => (
            <div
              key={officer.name}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 w-full bg-slate-900">
                  <Image src={officer.image} alt={officer.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider font-mono">
                      {officer.zone} Zone
                    </span>
                    <h4 className="text-base font-bold font-serif leading-tight">{officer.name}</h4>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <span className="text-xs font-bold text-[#0B3B24] block">{officer.role}</span>
                  <p className="text-[11px] text-slate-500 font-medium">{officer.club}</p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{officer.bio}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6 ZONAL VICE PRESIDENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            Regional Representatives
          </span>
          <h2 className="text-3xl font-black font-serif text-slate-900">
            Zonal Vice Presidents (6 Zones)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ZONAL_DISTRICTS.map((zone, i) => (
            <div key={zone.name} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  {zone.name}
                </span>
                <Award className="w-4 h-4 text-emerald-800" />
              </div>

              <h4 className="text-base font-bold font-serif text-slate-900">
                Vice President ({zone.name})
              </h4>
              <p className="text-xs text-slate-500">
                Headquarters Hub: <span className="font-semibold text-slate-800">{zone.headquarters}</span>
              </p>

              <div className="pt-2 text-[11px] text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 uppercase block">Affiliated Jurisdictions:</span>
                <p className="line-clamp-2">{zone.states.join(', ')}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
