'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Trophy, Award, ShieldCheck, Users, Calendar, 
  ShoppingBag, ArrowRight, CheckCircle2, QrCode, Sparkles, MapPin 
} from 'lucide-react';
import { INITIAL_TOURNAMENTS, INITIAL_PRODUCTS, INITIAL_NEWS } from '@/lib/mockData';
import { formatNaira } from '@/lib/utils';
import { useApp } from '@/lib/store';

export default function HomePage() {
  const { addToCart } = useApp();

  return (
    <div className="space-y-24 pb-24">
      {/* HERO SECTION */}
      <section className="relative bg-[#04190E] text-white min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with luxury dark gradient overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=80&w=1920"
            alt="Golf Course Fairway"
            fill
            className="object-cover opacity-30 mix-blend-luminosity scale-105 animate-pulse"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#04190E] via-[#0B3B24]/80 to-[#04190E]/90" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8">
          {/* Flagship AACT Ticker */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-mono uppercase tracking-widest shadow-lg">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Host of the 2026 All Africa Challenge Trophy (AACT) • Abuja</span>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-serif tracking-tight leading-tight">
              Championing Excellence in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                Nigerian Women&apos;s Golf
              </span>
            </h1>
            <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
              The premier national governing body elevating female golfers, sanctioning championships, and uniting 50+ affiliated golf clubs across 6 geopolitical zones.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/register/member"
              className="px-8 py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-2xl transition hover:scale-105 flex items-center gap-2"
            >
              <span>Join LGAN • ₦5,000/yr</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/events"
              className="px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs uppercase tracking-wider backdrop-blur-md transition flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>2026 Tournaments</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-10 border-t border-white/10 text-left">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-400">1,500+</span>
              <p className="text-xs text-slate-300 font-medium">Accredited Lady Golfers</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-400">50+</span>
              <p className="text-xs text-slate-300 font-medium">Affiliated Golf Clubs</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-400">6 Zones</span>
              <p className="text-xs text-slate-300 font-medium">Nationwide Administration</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-2xl sm:text-3xl font-black font-mono text-amber-400">AACT 2026</span>
              <p className="text-xs text-slate-300 font-medium">African Championship Host</p>
            </div>
          </div>
        </div>
      </section>

      {/* FLAGSHIP AACT 2026 SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B3B24] to-[#072718] text-white rounded-3xl p-8 sm:p-12 border border-emerald-800 shadow-2xl overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 font-mono">
                Continental Championship Focus
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-serif leading-tight">
                All Africa Challenge Trophy (AACT 2026)
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In October 2026, Nigeria welcomes elite female national teams from over 24 African nations to the IBB International Golf &amp; Country Club in Abuja.
              </p>

              <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold">
                <div className="flex items-center gap-2 text-amber-300">
                  <Calendar className="w-4 h-4" />
                  <span>October 18 – 24, 2026</span>
                </div>
                <div className="flex items-center gap-2 text-amber-300">
                  <MapPin className="w-4 h-4" />
                  <span>IBB Golf Club, Maitama, Abuja</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/events/all-africa-challenge-trophy-2026"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg"
                >
                  <span>Championship Details &amp; Draw</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=800"
                alt="AACT Golf Tournament"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DIGITAL MEMBER PASS & VERIFICATION HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Next-Generation Governance
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-serif text-slate-900 leading-tight">
              Instant Cryptographic Digital Member Cards
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every registered LGAN golfer receives an official dynamic digital membership card equipped with a secure QR verification code, live WHS handicap index, and financial standing for seamless tournament check-ins and club reciprocity.
            </p>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Real-time verification scanner at <code>/verify/[LGAN-ID]</code></span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Instant annual dues renewal (₦5,000) powered by Paystack</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Apple Wallet &amp; Google Wallet mobile pass support</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/register/member"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition"
              >
                <span>Get Your Digital Member Card</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-3xl bg-gradient-to-br from-[#0B3B24] to-[#04190E] p-6 text-white shadow-2xl border border-amber-400/40 relative">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-950 font-serif font-black flex items-center justify-center text-xs">
                    L
                  </div>
                  <div>
                    <h5 className="text-[11px] font-bold tracking-wide">LGAN NATIONAL PASS</h5>
                    <span className="text-[9px] font-mono text-amber-300 uppercase">Life Member</span>
                  </div>
                </div>
                <QrCode className="w-6 h-6 text-amber-400" />
              </div>

              <div className="space-y-3 py-2">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase">Golfer Name</span>
                  <p className="text-sm font-bold">Dr. (Mrs.) Lami O. Ahmed</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Membership No.</span>
                    <p className="font-mono font-bold text-amber-300">LGAN-2026-0042</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase">Handicap Index</span>
                    <p className="font-mono font-bold text-amber-300">11.2 (WHS)</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-900/80 flex justify-between items-center text-[10px] text-slate-400">
                <span>IBB International Golf Club</span>
                <span className="text-emerald-400 font-bold">● Active 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPCOMING TOURNAMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              National Calendar
            </span>
            <h2 className="text-3xl font-black font-serif text-slate-900 mt-1">
              Upcoming Tournaments &amp; Opens
            </h2>
          </div>
          <Link
            href="/events"
            className="text-xs font-bold text-[#0B3B24] hover:underline flex items-center gap-1"
          >
            <span>View Complete 2026 Schedule</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {INITIAL_TOURNAMENTS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {t.format}
                </span>

                <h3 className="text-lg font-bold font-serif text-slate-900 leading-snug">
                  {t.title}
                </h3>

                <div className="space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t.startDate.split('T')[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{t.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Entry Fee</span>
                  <span className="text-sm font-mono font-bold text-[#0B3B24]">
                    {t.entryFee === 0 ? 'Free' : formatNaira(t.entryFee)}
                  </span>
                </div>
                <Link
                  href={`/events/${t.slug}`}
                  className="px-4 py-2 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase transition"
                >
                  Register
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRO SHOP MARKETPLACE HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Official Golf Marketplace
            </span>
            <h2 className="text-3xl font-black font-serif text-slate-900 mt-1">
              LGAN Pro Shop &amp; Memorabilia
            </h2>
          </div>
          <Link
            href="/marketplace"
            className="text-xs font-bold text-[#0B3B24] hover:underline flex items-center gap-1"
          >
            <span>Visit Pro Shop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INITIAL_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col justify-between"
            >
              <div className="relative h-48 w-full bg-slate-100">
                <Image
                  src={prod.images[0]}
                  alt={prod.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5 space-y-3">
                <span className="text-[10px] font-bold uppercase text-slate-400 font-mono">
                  {prod.category}
                </span>
                <h4 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
                  {prod.title}
                </h4>
                <div className="text-base font-black text-[#0B3B24] font-mono">
                  {formatNaira(prod.price)}
                </div>

                <button
                  onClick={() => addToCart(prod, 1)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#0B3B24] hover:text-white text-slate-800 font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Media Center
            </span>
            <h2 className="text-3xl font-black font-serif text-slate-900 mt-1">
              Press &amp; Association News
            </h2>
          </div>
          <Link
            href="/news"
            className="text-xs font-bold text-[#0B3B24] hover:underline flex items-center gap-1"
          >
            <span>View Media Archive</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_NEWS.map((n) => (
            <div
              key={n.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition overflow-hidden flex flex-col md:flex-row"
            >
              <div className="relative h-48 md:h-auto md:w-48 bg-slate-900 shrink-0">
                <Image src={n.image} alt={n.title} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase text-amber-600 font-mono">
                    {n.category}
                  </span>
                  <h3 className="text-base font-bold font-serif text-slate-900 leading-snug">
                    {n.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">{n.summary}</p>
                </div>
                <Link
                  href={`/news/${n.slug}`}
                  className="text-xs font-bold text-[#0B3B24] hover:underline inline-flex items-center gap-1"
                >
                  <span>Read Full Release</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
