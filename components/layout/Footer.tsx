'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Trophy, MapPin, Mail, Phone, ShieldCheck, Heart, 
  ArrowRight, CheckCircle2, Instagram, Facebook, Twitter, Linkedin 
} from 'lucide-react';
import { ZONAL_DISTRICTS } from '@/lib/utils';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#04190E] text-slate-300 pt-16 pb-12 border-t border-emerald-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Newsletter & Banner */}
        <div className="bg-gradient-to-r from-[#0B3B24] to-[#0D4D2E] rounded-3xl p-8 sm:p-10 border border-emerald-800/40 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
              Official LGAN Communications
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-white">
              Stay Connected With Nigerian Ladies Golf
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Receive tournament entry announcements, AACT 2026 bulletins, handicap updates, and executive notices directly to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition shadow-lg shrink-0 flex items-center justify-center gap-2"
              >
                <span>{subscribed ? 'Subscribed!' : 'Subscribe'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            {subscribed && (
              <p className="text-emerald-300 text-xs mt-2 flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Thank you for subscribing to the LGAN Bulletin!
              </p>
            )}
          </form>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-serif font-black text-slate-950 text-2xl shadow-lg border border-amber-300">
                L
              </div>
              <div>
                <h4 className="text-lg font-bold font-serif text-white tracking-wide">
                  Ladies Golf Association of Nigeria
                </h4>
                <p className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-semibold">
                  Governing Body for Women&apos;s Golf in Nigeria • Est. 1980s
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dedicated to promoting, developing, and governing women&apos;s golf throughout the Federal Republic of Nigeria. Proud host of the 2026 All Africa Challenge Trophy (AACT).
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2 font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>National Secretariat: IBB International Golf & Country Club, Maitama, Abuja FCT, Nigeria</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+234 (0) 803 311 9842 / +234 (0) 802 304 8812</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>secretariat@lgan.org.ng / info@lgan.org.ng</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-amber-400">
              Platform & Association
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-amber-400 transition">About LGAN Heritage</Link>
              </li>
              <li>
                <Link href="/leadership" className="hover:text-amber-400 transition">National Executive Committee</Link>
              </li>
              <li>
                <Link href="/membership" className="hover:text-amber-400 transition">Membership Tiers & Dues</Link>
              </li>
              <li>
                <Link href="/clubs" className="hover:text-amber-400 transition">Affiliated Golf Clubs</Link>
              </li>
              <li>
                <Link href="/directory" className="hover:text-amber-400 transition">Golfer Directory</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 transition">National Secretariat</Link>
              </li>
            </ul>
          </div>

          {/* Competitions & Pro Shop */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-amber-400">
              Championships & Shop
            </h5>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/events" className="hover:text-amber-400 transition">Tournament Calendar 2026</Link>
              </li>
              <li>
                <Link href="/events/all-africa-challenge-trophy-2026" className="hover:text-amber-400 transition font-bold text-emerald-300">
                  ★ AACT 2026 Abuja
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-amber-400 transition">Official Golf Pro Shop</Link>
              </li>
              <li>
                <Link href="/marketplace?category=apparel" className="hover:text-amber-400 transition">LGAN Official Apparel</Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-amber-400 transition">Press & Media Center</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-400 transition">Tournament Photo Gallery</Link>
              </li>
            </ul>
          </div>

          {/* Portals & Geopolitical Zones */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold font-mono uppercase tracking-wider text-amber-400">
              6 Geopolitical Zones
            </h5>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              {ZONAL_DISTRICTS.map((zone) => (
                <li key={zone.name} className="hover:text-slate-200">
                  <span className="font-semibold text-slate-300">{zone.name}:</span> {zone.headquarters}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sanctioning Bodies & Affiliations */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 font-mono text-[11px] uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-amber-400">
              <ShieldCheck className="w-4 h-4" /> Nigeria Golf Federation (NGF)
            </span>
            <span className="text-slate-500">•</span>
            <span>Golf Union of Africa (GUA)</span>
            <span className="text-slate-500">•</span>
            <span>R&amp;A St Andrews Approved</span>
            <span className="text-slate-500">•</span>
            <span>Nigeria Olympic Committee</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-900 text-center text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Ladies Golf Association of Nigeria (LGAN). All Rights Reserved. Built with Next.js &amp; Paystack.</p>
        </div>
      </div>
    </footer>
  );
}
