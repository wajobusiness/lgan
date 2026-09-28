'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Member } from '@/lib/types';
import { ShieldCheck, Award, Sparkles, RefreshCw, QrCode } from 'lucide-react';

interface DigitalMemberCardProps {
  member: Member;
}

export default function DigitalMemberCard({ member }: DigitalMemberCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://lgan.org.ng';
  const verifyUrl = `${origin}/verify/${member.membershipNumber}`;

  useEffect(() => {
    QRCode.toDataURL(verifyUrl, {
      width: 180,
      margin: 1,
      color: {
        dark: '#04190E',
        light: '#FFFFFF',
      },
    })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error('QR Gen error:', err));
  }, [verifyUrl]);

  const isDuesPaid = member.duesPaid && new Date(member.expiryDate) > new Date();

  return (
    <div
      onClick={() => setIsFlipped(!isFlipped)}
      className="cursor-pointer group perspective-1000 w-full max-w-sm h-56 select-none"
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-3d transition-transform rounded-3xl shadow-2xl ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* CARD FRONT */}
        <div className="absolute inset-0 w-full h-full rounded-3xl p-5 bg-gradient-to-br from-[#0B3B24] via-[#0D4D2E] to-[#04190E] border-2 border-amber-400/60 text-white flex flex-col justify-between backface-hidden shadow-2xl overflow-hidden">
          {/* Hologram metallic shimmer pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_60%)] pointer-events-none" />

          {/* Card Top Row */}
          <div className="flex justify-between items-start relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 to-amber-500 text-slate-950 font-serif font-black flex items-center justify-center text-lg shadow-md border border-amber-200">
                L
              </div>
              <div>
                <h4 className="text-xs font-bold font-serif tracking-wider text-white">
                  LADIES GOLF ASSOCIATION OF NIGERIA
                </h4>
                <p className="text-[9px] font-mono text-amber-300 uppercase tracking-widest font-semibold">
                  National Golfer Pass
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                <Sparkles className="w-2.5 h-2.5" />
                {member.category} MEMBER
              </span>
            </div>
          </div>

          {/* Member Name & Identification */}
          <div className="relative z-10 space-y-1 py-1">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
              Golfer Full Name
            </span>
            <h3 className="text-base font-black font-serif text-white tracking-wide truncate">
              {member.fullName}
            </h3>
            <p className="text-[10px] text-amber-200 font-medium truncate">
              {member.clubName}
            </p>
          </div>

          {/* Card Bottom Row */}
          <div className="relative z-10 pt-2 border-t border-emerald-800/80 flex items-center justify-between text-xs">
            <div>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-mono">
                Membership No.
              </span>
              <span className="font-mono font-black text-amber-300 text-xs tracking-wider">
                {member.membershipNumber}
              </span>
            </div>

            <div>
              <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-mono">
                WHS Index
              </span>
              <span className="font-mono font-black text-white text-xs bg-white/10 px-2 py-0.5 rounded">
                {member.handicapIndex !== undefined ? member.handicapIndex.toFixed(1) : '18.4'}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-mono">
                Validity
              </span>
              <span className={`text-[9px] font-bold font-mono ${isDuesPaid ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isDuesPaid ? '● ACTIVE 2026' : '● EXPIRED'}
              </span>
            </div>
          </div>
        </div>

        {/* CARD BACK */}
        <div className="absolute inset-0 w-full h-full rounded-3xl p-5 bg-gradient-to-br from-[#04190E] via-[#0B3B24] to-[#04190E] border-2 border-amber-400/60 text-white flex flex-col justify-between rotate-y-180 backface-hidden shadow-2xl">
          {/* Magnetic Stripe representation */}
          <div className="w-full h-7 bg-slate-950 rounded-lg -mt-1 opacity-80" />

          {/* Center QR code and instructions */}
          <div className="flex items-center gap-4 py-1">
            {qrDataUrl ? (
              <div className="w-20 h-20 bg-white p-1 rounded-xl shadow-md shrink-0 flex items-center justify-center">
                <img src={qrDataUrl} alt="LGAN Member QR Code" className="w-full h-full" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-white/10 rounded-xl flex items-center justify-center">
                <QrCode className="w-8 h-8 text-amber-400" />
              </div>
            )}

            <div className="space-y-1 text-left">
              <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wide block">
                Official Verification QR
              </span>
              <p className="text-[9px] text-slate-300 leading-tight">
                Scan with any smartphone or tournament marshal scanner for instant validation against LGAN Central Registry.
              </p>
              <p className="text-[8px] font-mono text-emerald-400">
                {member.membershipNumber}
              </p>
            </div>
          </div>

          {/* Bottom Security Footer */}
          <div className="pt-2 border-t border-emerald-900/80 flex items-center justify-between text-[9px] text-slate-400 font-mono">
            <span>National Secretariat Abuja</span>
            <span className="text-amber-400 font-bold">R&amp;A / NGF Approved</span>
          </div>
        </div>
      </div>
    </div>
  );
}
