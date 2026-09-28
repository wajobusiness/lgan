'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { DataService } from '@/lib/storage';
import { 
  Store, ShoppingBag, ShieldCheck, ArrowRight, 
  CheckCircle2, Building2, User, Mail, Lock, Phone 
} from 'lucide-react';

export default function VendorRegistrationPage() {
  const router = useRouter();
  const { setCurrentUser, showToast } = useApp();

  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    password: '',
    cacNumber: '',
    bankName: 'GTBank',
    accountNumber: '',
    accountName: '',
    category: 'APPAREL',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newVendorUser = {
      id: `vnd_usr_${Date.now()}`,
      email: formData.email,
      name: formData.contactName,
      role: 'VENDOR' as const,
      createdAt: new Date().toISOString(),
    };

    const newVendor = {
      id: `vnd_${Date.now()}`,
      userId: newVendorUser.id,
      businessName: formData.businessName,
      slug: formData.businessName.toLowerCase().replace(/\s+/g, '-'),
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      accountName: formData.accountName,
      status: 'APPROVED' as const,
      commissionRate: 10,
      totalSales: 0,
      balance: 0,
      createdAt: new Date().toISOString(),
    };

    DataService.addVendor(newVendor);
    setCurrentUser(newVendorUser);
    showToast('Merchant account registered successfully!', 'success');
    router.push('/vendor/dashboard');
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
            Golf Pro Shop Merchant
          </span>
          <h1 className="text-3xl font-black font-serif text-slate-900">
            Vendor Marketplace Onboarding
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Sell authentic golf equipment, official apparel, footwear, and tournament memorabilia to thousands of golfers across Nigeria.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold font-serif text-slate-900">Business &amp; Merchant Identity</h3>
              <p className="text-xs text-slate-500">Registered entity details</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Store / Company Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Fairway Luxury Pro Shop Lagos"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mrs. Ngozi Okonkwo"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  CAC RC Number (Optional)
                </label>
                <input
                  type="text"
                  placeholder="RC-1294821"
                  value={formData.cacNumber}
                  onChange={(e) => setFormData({ ...formData, cacNumber: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Merchant Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sales@fairwaypro.ng"
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

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Portal Password *
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

            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-sm font-bold font-serif text-slate-900 mb-2">
                Settlement &amp; Bank Payout Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Bank Name *
                </label>
                <select
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B3B24]"
                >
                  <option value="GTBank">Guaranty Trust Bank (GTBank)</option>
                  <option value="Zenith">Zenith Bank</option>
                  <option value="Access">Access Bank</option>
                  <option value="FirstBank">First Bank of Nigeria</option>
                  <option value="UBA">United Bank for Africa (UBA)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Account Number *
                </label>
                <input
                  type="text"
                  required
                  maxLength={10}
                  placeholder="0123456789"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#0B3B24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Account Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Fairway Enterprises Ltd"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>
            </div>

            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <span className="font-bold block">10% Platform Marketplace Commission</span>
              <p className="text-[11px] text-amber-800">
                LGAN retains a standard 10% platform facilitation fee on successful marketplace sales. Payouts are reconciled and disbursed automatically to your bank account upon order fulfillment.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Submit Merchant Application</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
