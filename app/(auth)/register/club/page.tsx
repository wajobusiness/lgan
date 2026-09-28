'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { DataService } from '@/lib/storage';
import { formatNaira, ZONAL_DISTRICTS, NIGERIAN_STATES } from '@/lib/utils';
import { 
  Building2, MapPin, Mail, Phone, Lock, 
  ShieldCheck, CreditCard, ArrowRight, CheckCircle2, Trophy 
} from 'lucide-react';

export default function ClubRegistrationPage() {
  const router = useRouter();
  const { setCurrentUser, triggerPayment, showToast } = useApp();

  const [formData, setFormData] = useState({
    clubName: '',
    city: '',
    state: 'FCT Abuja',
    zone: 'North Central',
    holes: 18,
    par: 72,
    captainName: '',
    captainEmail: '',
    captainPhone: '',
    password: '',
    facilityDescription: '',
  });

  const affiliationFee = 25000;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    triggerPayment({
      amount: affiliationFee,
      paymentType: 'CLUB_SUBSCRIPTION',
      title: `LGAN Club Affiliation: ${formData.clubName}`,
      description: 'Annual institutional membership & ladies section accreditation for 2026',
      metadata: { ...formData },
      onSuccess: (trxRef) => {
        const newClubUser = {
          id: `club_usr_${Date.now()}`,
          email: formData.captainEmail,
          name: `${formData.captainName} (${formData.clubName})`,
          role: 'CLUB_ADMIN' as const,
          createdAt: new Date().toISOString(),
        };

        const newClub = {
          id: `club_${Date.now()}`,
          name: formData.clubName,
          slug: formData.clubName.toLowerCase().replace(/\s+/g, '-'),
          city: formData.city,
          state: formData.state,
          zone: formData.zone,
          holes: Number(formData.holes),
          par: Number(formData.par),
          captainName: formData.captainName,
          captainEmail: formData.captainEmail,
          captainPhone: formData.captainPhone,
          status: 'APPROVED' as const,
          subscriptionExpiresAt: '2026-12-31T23:59:59.000Z',
          memberCount: 25,
          createdAt: new Date().toISOString(),
        };

        DataService.addClub(newClub);
        setCurrentUser(newClubUser);
        showToast(`Club registered successfully! Welcome to LGAN`, 'success');
        router.push('/club/dashboard');
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#0B3B24] text-amber-400 font-serif font-black flex items-center justify-center text-lg shadow-md">
              L
            </div>
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Institutional Accreditation
          </span>
          <h1 className="text-3xl font-black font-serif text-slate-900">
            Golf Club Affiliation
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Register your golf facility&apos;s ladies section with the national association to sanction opens and certify WHS scores.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-serif text-slate-900">Club &amp; Course Details</h3>
              <p className="text-xs text-slate-500">Official course specifications</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Official Golf Club Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Smokin Hills Golf Resort"
                value={formData.clubName}
                onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  City / Town *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ilara-Mokin"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  State *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B3B24]"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Geopolitical Zone *
                </label>
                <select
                  value={formData.zone}
                  onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B3B24]"
                >
                  {ZONAL_DISTRICTS.map((z) => (
                    <option key={z.name} value={z.name}>
                      {z.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Course Holes
                </label>
                <select
                  value={formData.holes}
                  onChange={(e) => setFormData({ ...formData, holes: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B3B24]"
                >
                  <option value={18}>18 Holes (Championship)</option>
                  <option value={9}>9 Holes</option>
                  <option value={27}>27 Holes (3 Loops)</option>
                  <option value={36}>36 Holes (Dual Course)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Course Par
                </label>
                <input
                  type="number"
                  value={formData.par}
                  onChange={(e) => setFormData({ ...formData, par: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-sm font-bold font-serif text-slate-900 mb-2">
                Lady Section Administration Account
              </h3>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Lady Captain / Section Head Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Lady Captain Victoria Nnamani"
                value={formData.captainName}
                onChange={(e) => setFormData({ ...formData, captainName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Lady Captain Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="ladycaptain@clubdomain.ng"
                  value={formData.captainEmail}
                  onChange={(e) => setFormData({ ...formData, captainEmail: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Lady Captain Phone *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+234 803 000 0000"
                  value={formData.captainPhone}
                  onChange={(e) => setFormData({ ...formData, captainPhone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Portal Access Password *
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
              />
            </div>

            {/* Fee summary */}
            <div className="bg-amber-50/80 p-4 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500">Annual Affiliation Subscription (2026):</span>
                <p className="text-slate-700 text-[11px]">Includes ladies section accreditation &amp; tournament sanctions</p>
              </div>
              <span className="text-lg font-black text-[#0B3B24] font-mono">{formatNaira(affiliationFee)}</span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-amber-400" />
              <span>Affiliate &amp; Pay {formatNaira(affiliationFee)}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
