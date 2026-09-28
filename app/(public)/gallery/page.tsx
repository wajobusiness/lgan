'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Trophy, Camera, Filter, Sparkles } from 'lucide-react';

export default function GalleryPage() {
  const [filter, setFilter] = useState('ALL');

  const photos = [
    {
      id: 1,
      title: 'Nigerian Ladies Open Championship Trophy Presentation',
      category: 'TOURNAMENTS',
      src: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=800',
      location: 'Smokin Hills Golf Resort',
    },
    {
      id: 2,
      title: 'AACT Continental Delegation Planning Session',
      category: 'LEADERSHIP',
      src: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800',
      location: 'Abuja Secretariat',
    },
    {
      id: 3,
      title: 'Zonal Junior Golf Clinic & Swing Masterclass',
      category: 'JUNIORS',
      src: 'https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&q=80&w=800',
      location: 'Ikoyi Club 1938',
    },
    {
      id: 4,
      title: 'Championship Flight Tee-Off',
      category: 'TOURNAMENTS',
      src: 'https://images.unsplash.com/photo-1593111774240-d529f12cf4bb?auto=format&fit=crop&q=80&w=800',
      location: 'IBB International Golf Club',
    },
    {
      id: 5,
      title: 'National Executive Committee Annual General Meeting',
      category: 'LEADERSHIP',
      src: 'https://images.unsplash.com/photo-1622398925373-3f91b1e275f5?auto=format&fit=crop&q=80&w=800',
      location: 'Kaduna Golf Club',
    },
    {
      id: 6,
      title: 'Ladies Section Captains Invitational',
      category: 'CLUBS',
      src: 'https://images.unsplash.com/photo-1591491640784-3232eb748d4b?auto=format&fit=crop&q=80&w=800',
      location: 'Rayfield Golf Club Jos',
    },
  ];

  const filtered = filter === 'ALL' ? photos : photos.filter((p) => p.category === filter);

  return (
    <div className="space-y-16 pb-24">
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#0B3B24] to-[#04190E] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" /> Media Archive
          </span>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
            Tournament &amp; Event Gallery
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Moments of triumphs, championship swings, junior clinics, and executive leadership in Nigerian ladies golf.
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-2">
          {['ALL', 'TOURNAMENTS', 'LEADERSHIP', 'JUNIORS', 'CLUBS'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition uppercase tracking-wider ${
                filter === cat
                  ? 'bg-[#0B3B24] text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat === 'ALL' ? 'All Photographs' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* PHOTO GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition"
            >
              <div className="relative h-64 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
              <div className="p-5 space-y-1">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-amber-600 font-mono">
                  <span>{photo.category}</span>
                  <span className="text-slate-400">{photo.location}</span>
                </div>
                <h4 className="text-sm font-bold font-serif text-slate-900 leading-snug">{photo.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
