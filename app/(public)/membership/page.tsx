'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, CheckCircle2, Award, QrCode, 
  CreditCard, ArrowRight, HelpCircle, Sparkles 
} from 'lucide-react';
import { formatNaira } from '@/lib/utils';

export default function MembershipPage() {
  const tiers = [
    {
      name: 'Full Member',
      fee: 5000,
      period: 'per year',
      badge: 'Most Popular',
      highlight: true,
      description: 'Standard membership for active female golfers affiliated with an accredited Nigerian golf club.',
      features: [
        'Official Digital Membership Card with live QR verification',
        'World Handicap System (WHS) index registration & slope calculations',
        'Entry eligibility for all National Opens & Zonal Championships',
        'Voting privileges at the LGAN Annual General Meeting (AGM)',
        '10% exclusive discount at the official LGAN Golf Pro Shop',
        'Nationwide reciprocity privileges across 50+ affiliated clubs',
      ],
      href: '/register/member?tier=FULL',
    },
    {
      name: 'Junior Golfer',
      fee: 2500,
      period: 'per year',
      badge: 'Under 18 Years',
      highlight: false,
      description: 'Dedicated grassroots tier nurturing emerging young girls and junior champions across Nigeria.',
      features: [
        'Official Junior Digital Membership Card',
        'Junior WHS handicap tracking & junior tournament entry',
        'Access to LGAN National Zonal Golf Clinics & Coaching',
        'Junior merit ranking & continental pathway selection',
        'Subsidized tournament entry fees',
      ],
      href: '/register/member?tier=JUNIOR',
    },
    {
      name: 'Life Member / Patron',
      fee: 0,
      period: 'Honorary / Lifetime',
      badge: 'Distinguished',
      highlight: false,
      description: 'Conferred upon Board of Trustees, Past Presidents, and eminent patrons for outstanding contributions.',
      features: [
        'Permanent Gold Hologram Digital Lifetime Card',
        'Lifetime WHS Handicap Index maintenance',
        'VIP Executive seating at AACT 2026 & National Opens',
        'Permanent listing in LGAN Hall of Fame',
        'Direct advisory input into Association governance',
      ],
      href: '/contact?subject=Life+Membership+Inquiry',
    },
  ];

  return (
    <div className="space-y-20 pb-24">
      {/* HERO */}
      <section className="bg-gradient-to-b from-[#0B3B24] to-[#04190E] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5" /> Official Association Tiers
          </span>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
            LGAN Membership &amp; Dues
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Become a recognized member of Nigeria&apos;s governing ladies golf association. Enjoy certified WHS handicapping, nationwide tournament access, and cryptographic digital identity.
          </p>
        </div>
      </section>

      {/* TIERS PRICING GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 flex flex-col justify-between transition ${
                tier.highlight
                  ? 'bg-gradient-to-b from-[#0B3B24] to-[#04190E] text-white ring-4 ring-amber-400/50 shadow-2xl scale-105'
                  : 'bg-white border border-slate-200 text-slate-900 shadow-md hover:shadow-xl'
              }`}
            >
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      tier.highlight
                        ? 'bg-amber-400 text-slate-950 font-mono font-black'
                        : 'bg-slate-100 text-slate-700 font-mono'
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl font-black font-serif">{tier.name}</h3>
                  <p className={`text-xs mt-1 ${tier.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                    {tier.description}
                  </p>
                </div>

                <div className="border-y border-slate-100/20 py-4">
                  <span className="text-3xl sm:text-4xl font-black font-mono">
                    {tier.fee === 0 ? 'Conferred' : formatNaira(tier.fee)}
                  </span>
                  <span className={`text-xs ml-2 ${tier.highlight ? 'text-slate-300' : 'text-slate-500'}`}>
                    / {tier.period}
                  </span>
                </div>

                <ul className="space-y-3 text-xs">
                  {tier.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          tier.highlight ? 'text-amber-400' : 'text-emerald-700'
                        }`}
                      />
                      <span className={tier.highlight ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={tier.href}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-lg ${
                    tier.highlight
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                      : 'bg-[#0B3B24] hover:bg-[#072718] text-white'
                  }`}
                >
                  <span>Register for {tier.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800">
            Got Questions?
          </span>
          <h2 className="text-3xl font-black font-serif text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-800" />
              How do I verify my digital membership card?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Every card features a dynamic cryptographic QR code. When scanned at any tournament registration desk or pro shop, it opens the official real-time verification portal at <code>/verify/[LGAN-ID]</code> confirming your active financial standing and current WHS handicap index.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-800" />
              Can I pay my membership dues online?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              Yes, LGAN is fully integrated with Paystack. You can pay annual dues via debit card, bank transfer, or USSD code directly inside your dashboard with instantaneous card renewal and electronic PDF receipts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-emerald-800" />
              What is the World Handicap System (WHS) requirement?
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed pl-6">
              LGAN enforces the unified R&amp;A / USGA World Handicap System. Members submit attested scorecards to maintain an active Handicap Index between 0.0 and 54.0.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
