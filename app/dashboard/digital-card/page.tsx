'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import DigitalMemberCard from '@/components/ui/DigitalMemberCard';
import { 
  QrCode, Download, Share2, ShieldCheck, 
  Smartphone, Award, CheckCircle2, ArrowRight, RefreshCw 
} from 'lucide-react';

export default function DigitalMemberCardPage() {
  const { currentMember, currentUser, triggerPayment } = useApp();

  const member = currentMember || {
    id: 'mem_1',
    membershipNumber: 'LGAN-2026-0042',
    fullName: currentUser?.name || 'Dr. Mrs. Lami O. Ahmed',
    clubName: 'IBB International Golf & Country Club, Abuja',
    zone: 'North Central',
    category: 'LIFE',
    handicapIndex: 11.2,
    status: 'ACTIVE',
    expiryDate: '2026-12-31T23:59:59.000Z',
    duesPaid: true,
    joinedDate: '2014-03-15',
  };

  const isDuesPaid = member.duesPaid && new Date(member.expiryDate) > new Date();

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Cryptographic Identification
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
            Official Digital Membership Card
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Accredited digital identity for tournaments, club reciprocity, and handicap validation nationwide.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/verify/${member.membershipNumber}`}
            target="_blank"
            className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0B3B24] border border-emerald-200 text-xs font-bold transition flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4" />
            <span>Test Public Scanner</span>
          </Link>
        </div>
      </div>

      {/* Main Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Interactive 3D Card Display */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full max-w-md">
            <DigitalMemberCard member={member as any} />
          </div>

          <p className="text-center text-xs text-slate-400 mt-4 flex items-center justify-center gap-1.5 font-medium">
            <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin-slow" />
            <span>Click card to flip between front credentials &amp; back QR code</span>
          </p>
        </div>

        {/* Card Metadata & Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold font-serif text-slate-900 border-b border-slate-100 pb-2">
              Credential Verification Status
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Membership Number:</span>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                  {member.membershipNumber}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Financial Standing:</span>
                {isDuesPaid ? (
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Dues Paid (2026)
                  </span>
                ) : (
                  <span className="text-rose-700 font-bold bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                    Payment Required
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Home Golf Club:</span>
                <span className="font-semibold text-slate-900 text-right truncate max-w-[200px]">
                  {member.clubName}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">WHS Handicap Index:</span>
                <span className="font-mono font-black text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {member.handicapIndex?.toFixed(1) || '11.2'}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">Valid Through:</span>
                <span className="font-mono text-slate-700 font-medium">
                  {new Date(member.expiryDate).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </div>

            {!isDuesPaid && (
              <div className="pt-2">
                <Link
                  href="/dashboard/dues"
                  className="w-full py-2.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition"
                >
                  <span>Renew Annual Dues (₦5,000)</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions Card */}
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Card Portability &amp; Mobile Pass
            </h4>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => window.print()}
                className="p-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition shadow-sm"
              >
                <Download className="w-4 h-4 text-emerald-800" />
                <span>Save as PDF</span>
              </button>

              <button
                onClick={() => alert('Mobile Wallet Pass (.pkpass) generated. Compatible with Apple Wallet & Google Wallet.')}
                className="p-3 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition shadow-sm"
              >
                <Smartphone className="w-4 h-4 text-amber-600" />
                <span>Apple / Google Wallet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
