'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Building2, MapPin, ShieldCheck, Search, PlusCircle, ExternalLink 
} from 'lucide-react';
import { INITIAL_CLUBS } from '@/lib/mockData';
import { ZONAL_DISTRICTS } from '@/lib/utils';

export default function ClubsDirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('ALL');

  const filteredClubs = INITIAL_CLUBS.filter((club) => {
    const matchesSearch =
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.state.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === 'ALL' || club.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  return (
    <div className="space-y-16 pb-24">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#0B3B24] to-[#04190E] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" /> 50+ Affiliated Facilities
          </span>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
            Affiliated Golf Clubs &amp; Resorts
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Discover accredited golf courses and active ladies&apos; sections across all six geopolitical zones of Nigeria recognized by LGAN.
          </p>

          <div className="pt-2">
            <Link
              href="/register/club"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Affiliate Your Club (₦25,000/yr)</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SEARCH & FILTER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search club name, city, or state..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B3B24]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-500 shrink-0">Zone:</span>
            <button
              onClick={() => setSelectedZone('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                selectedZone === 'ALL'
                  ? 'bg-[#0B3B24] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Zones
            </button>
            {ZONAL_DISTRICTS.map((z) => (
              <button
                key={z.name}
                onClick={() => setSelectedZone(z.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition shrink-0 ${
                  selectedZone === z.name
                    ? 'bg-[#0B3B24] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {z.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CLUBS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClubs.map((club) => (
            <div
              key={club.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400/80 transition overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                  <Image
                    src={club.coverImage || 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=800'}
                    alt={club.name}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/90 text-white text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-md">
                      <ShieldCheck className="w-3 h-3" /> Accredited
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest font-mono">
                      {club.zone}
                    </span>
                    <h3 className="text-base font-bold font-serif leading-snug line-clamp-1">
                      {club.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <MapPin className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>{club.city}, {club.state}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Course Layout</span>
                      <span className="font-bold text-slate-800">{club.holes} Holes • Par {club.par}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Lady Captain</span>
                      <span className="font-bold text-[#0B3B24] truncate block">{club.captainName || 'Lady Captain'}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {club.description || 'Premier championship golf facility with active ladies section participating in LGAN national opens.'}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400 font-mono">
                  {club.memberCount || 35}+ Lady Members
                </span>

                <Link
                  href={`/events?club=${club.id}`}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition"
                >
                  <span>Club Tournaments</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
