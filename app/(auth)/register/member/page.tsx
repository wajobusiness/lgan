'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { DataService } from '@/lib/storage';
import { INITIAL_CLUBS } from '@/lib/mockData';
import { formatNaira, ZONAL_DISTRICTS, NIGERIAN_STATES } from '@/lib/utils';
import { 
  User, Mail, Lock, Phone, MapPin, Award, 
  ShieldCheck, CreditCard, ArrowRight, CheckCircle2, Building2, Sparkles 
} from 'lucide-react';

export default function MemberRegistrationPage() {
  const router = useRouter();
  const { setCurrentUser, triggerPayment, showToast } = useApp();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    clubName: INITIAL_CLUBS[0].name,
    zone: 'North Central',
    category: 'FULL' as 'FULL' | 'JUNIOR' | 'LIFE' | 'ASSOCIATE',
    handicapIndex: '18.4',
    stateOfOrigin: 'Abuja FCT',
    occupation: '',
    directoryVisible: true,
  });

  const duesAmount = formData.category === 'JUNIOR' ? 2500 : 5000;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const handleCompleteRegistration = () => {
    triggerPayment({
      amount: duesAmount,
      paymentType: 'MEMBERSHIP_DUES',
      title: 'LGAN Annual Membership Dues (2026)',
      description: `Registration dues for ${formData.fullName} (${formData.category} Member)`,
      metadata: { ...formData },
      onSuccess: (trxRef) => {
        const membershipNo = `LGAN-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        const newUser = {
          id: `usr_${Date.now()}`,
          email: formData.email,
          name: formData.fullName,
          role: 'MEMBER' as const,
          createdAt: new Date().toISOString(),
        };

        const newMember = {
          id: newUser.id,
          userId: newUser.id,
          membershipNumber: membershipNo,
          fullName: formData.fullName,
          clubName: formData.clubName,
          zone: formData.zone,
          category: formData.category,
          handicapIndex: parseFloat(formData.handicapIndex) || 18.0,
          status: 'ACTIVE' as const,
          expiryDate: '2026-12-31T23:59:59.000Z',
          duesPaid: true,
          directoryVisible: formData.directoryVisible,
          joinedDate: new Date().toISOString().split('T')[0],
        };

        DataService.addMember(newMember);
        setCurrentUser(newUser);
        showToast(`Registration complete! Membership ID: ${membershipNo}`, 'success');
        router.push('/dashboard/digital-card');
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
            Official Member Induction
          </span>
          <h1 className="text-3xl font-black font-serif text-slate-900">
            LGAN Member Registration
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Join the national association, secure your digital membership card, and obtain official WHS handicap indexing.
          </p>
        </div>

        {/* Steps Progress */}
        <div className="flex items-center justify-between relative px-4">
          <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 -z-0" />
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                step >= s
                  ? 'bg-[#0B3B24] text-amber-400 ring-4 ring-emerald-50'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Step Form Container */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          {/* STEP 1: Personal Data */}
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold font-serif text-slate-900">Personal Information</h3>
                <p className="text-xs text-slate-500">Enter your official identification details</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name (with Titles) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Mrs. Aisha Bello"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="golfer@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+234 803 000 0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    State of Origin / Residence
                  </label>
                  <select
                    value={formData.stateOfOrigin}
                    onChange={(e) => setFormData({ ...formData, stateOfOrigin: e.target.value })}
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
                    Create Password *
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
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
              >
                <span>Continue to Golf Profile</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </form>
          )}

          {/* STEP 2: Golf Affiliation & Handicap */}
          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold font-serif text-slate-900">Golf Affiliation &amp; Category</h3>
                <p className="text-xs text-slate-500">Specify your home club and handicap rating</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Primary Home Golf Club *
                </label>
                <select
                  value={formData.clubName}
                  onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B3B24]"
                >
                  {INITIAL_CLUBS.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.city}, {c.state})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Membership Tier *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B3B24]"
                  >
                    <option value="FULL">Full Adult Member (₦5,000/yr)</option>
                    <option value="JUNIOR">Junior Member (Under 18) (₦2,500/yr)</option>
                    <option value="LIFE">Life Member / Patron</option>
                    <option value="ASSOCIATE">Associate Member</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Current Handicap Index (or enter 0 if unrated)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="54"
                  value={formData.handicapIndex}
                  onChange={(e) => setFormData({ ...formData, handicapIndex: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>

              <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <input
                  type="checkbox"
                  id="dirCheck"
                  checked={formData.directoryVisible}
                  onChange={(e) => setFormData({ ...formData, directoryVisible: e.target.checked })}
                  className="rounded border-slate-300 text-[#0B3B24] focus:ring-[#0B3B24]"
                />
                <label htmlFor="dirCheck" className="text-slate-700 cursor-pointer">
                  Display my verified profile in the Public Golfer Directory
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs uppercase"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Review &amp; Pay Dues</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Paystack Dues Review */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold font-serif text-slate-900">Review &amp; Membership Activation</h3>
                <p className="text-xs text-slate-500">Official induction fee payment via Paystack</p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant Name:</span>
                  <span className="font-bold text-slate-900">{formData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Home Golf Club:</span>
                  <span className="font-bold text-slate-900">{formData.clubName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Geopolitical Zone:</span>
                  <span className="font-bold text-slate-900">{formData.zone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Membership Tier:</span>
                  <span className="font-bold text-emerald-800">{formData.category} Member</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-3">
                  <span className="font-bold text-slate-900">Annual Dues:</span>
                  <span className="font-black text-base text-[#0B3B24]">{formatNaira(duesAmount)}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-900">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>
                  Immediate activation: Your digital membership card with cryptographic QR verification will be generated automatically upon payment.
                </span>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-1/3 py-3.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs uppercase"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleCompleteRegistration}
                  className="w-2/3 py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>Pay {formatNaira(duesAmount)} via Paystack</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Existing User Link */}
        <p className="text-center text-xs text-slate-500">
          Already registered?{' '}
          <Link href="/login" className="text-[#0B3B24] font-bold hover:underline">
            Sign In to your Dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}
