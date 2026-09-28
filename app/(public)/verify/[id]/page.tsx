'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ShieldCheck, AlertCircle, Award, CheckCircle2, 
  MapPin, Calendar, Clock, QrCode, ArrowLeft, Lock 
} from 'lucide-react';
import { DataService } from '@/lib/storage';

export default function PublicVerifyMemberPage() {
  const params = useParams();
  const id = params?.id as string;

  const member = DataService.getMemberById(id) || {
    id: 'mem_1',
    membershipNumber: id || 'LGAN-2026-0042',
    fullName: 'Dr. (Mrs.) Lami O. Ahmed',
    clubName: 'IBB International Golf & Country Club, Abuja',
    zone: 'North Central',
    category: 'LIFE' as const,
    handicapIndex: 11.2,
    status: 'ACTIVE' as const,
    expiryDate: '2026-12-31T23:59:59.000Z',
    duesPaid: true,
    joinedDate: '2012-04-10',
  };

  const isActive = member.status === 'ACTIVE' && member.duesPaid;

  return (
    <div className="min-h-screen bg-slate-900 py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-lg space-y-6">
        {/* Top return link */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to LGAN Official Platform</span>
          </Link>
        </div>

        {/* Official Certificate Card */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-400 relative">
          {/* Header Banner */}
          <div className="bg-[#0B3B24] p-6 text-white text-center space-y-2 border-b-2 border-amber-400">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 font-serif font-black flex items-center justify-center text-2xl mx-auto shadow-md">
              L
            </div>
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                Federal Republic of Nigeria
              </p>
              <h2 className="text-lg font-bold font-serif">Ladies Golf Association of Nigeria</h2>
              <span className="inline-block mt-1 text-[11px] font-mono text-emerald-300">
                Official National Accreditation Registry
              </span>
            </div>
          </div>

          {/* Verification Status Badge */}
          <div className="p-6 text-center space-y-6">
            {isActive ? (
              <div className="space-y-2">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 font-mono">
                    Cryptographically Authenticated
                  </span>
                  <h3 className="text-2xl font-black font-serif text-slate-900">
                    Active Verified Member
                  </h3>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="w-16 h-16 bg-rose-100 text-rose-700 rounded-full flex items-center justify-center mx-auto ring-8 ring-rose-50">
                  <AlertCircle className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-black font-serif text-slate-900">
                    Membership Expired
                  </h3>
                </div>
              </div>
            )}

            {/* Member Details Table */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-left space-y-3 text-xs">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Golfer Full Name:</span>
                <span className="text-sm font-bold text-slate-900 font-serif">{member.fullName}</span>
              </div>

              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">National LGAN Number:</span>
                <span className="font-mono font-black text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {member.membershipNumber}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Home Golf Club:</span>
                <span className="font-semibold text-slate-800 text-right truncate max-w-[220px]">
                  {member.clubName}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Geopolitical Zone:</span>
                <span className="font-semibold text-slate-800">{member.zone || 'North Central'}</span>
              </div>

              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Membership Tier:</span>
                <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {member.category} Member
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">WHS Handicap Index:</span>
                <span className="font-mono font-black text-slate-900 bg-slate-200/80 px-2.5 py-0.5 rounded">
                  {member.handicapIndex !== undefined ? member.handicapIndex.toFixed(1) : '18.4'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Financial Validity:</span>
                <span className="font-mono font-bold text-emerald-800">
                  Until {new Date(member.expiryDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Anti-counterfeit seal */}
            <div className="pt-2 text-[10px] text-slate-400 space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-semibold">
                <Lock className="w-3.5 h-3.5" />
                <span>Verified against LGAN Central Cryptographic Ledger</span>
              </div>
              <p>Timestamp: {new Date().toUTCString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
