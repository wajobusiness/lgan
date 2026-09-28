'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Settings, Save, ShieldCheck, Key, Lock, Globe } from 'lucide-react';

export default function AdminSettingsPage() {
  const { showToast } = useApp();

  const [settings, setSettings] = useState({
    membershipDuesAdult: 5000,
    membershipDuesJunior: 2500,
    clubAffiliationFee: 25000,
    marketplaceCommissionRate: 10,
    paystackPublicKey: 'pk_test_aact2026_lgan_digital_gateway',
    secretariatEmail: 'secretariat@lgan.org.ng',
    secretariatPhone: '+234 803 311 9842',
    enablePublicDirectory: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Association system settings saved successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Platform Configuration
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
          System Settings &amp; Gateway Parameters
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Configure national membership fee structures, Paystack payment keys, and association operational rules.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6 text-xs">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold font-serif text-slate-900">National Dues &amp; Pricing</h3>
            <p className="text-xs text-slate-500">Annual financial parameters</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Full Member Dues (₦)</label>
              <input
                type="number"
                value={settings.membershipDuesAdult}
                onChange={(e) => setSettings({ ...settings, membershipDuesAdult: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Junior Member Dues (₦)</label>
              <input
                type="number"
                value={settings.membershipDuesJunior}
                onChange={(e) => setSettings({ ...settings, membershipDuesJunior: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Club Affiliation (₦)</label>
              <input
                type="number"
                value={settings.clubAffiliationFee}
                onChange={(e) => setSettings({ ...settings, clubAffiliationFee: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
              />
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-base font-bold font-serif text-slate-900 mb-1">Paystack Gateway Integration</h3>
            <p className="text-xs text-slate-500 mb-3">API keys for automated checkout and webhooks</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Paystack Public Key</label>
                <input
                  type="text"
                  value={settings.paystackPublicKey}
                  onChange={(e) => setSettings({ ...settings, paystackPublicKey: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Marketplace Commission (%)</label>
                <input
                  type="number"
                  value={settings.marketplaceCommissionRate}
                  onChange={(e) => setSettings({ ...settings, marketplaceCommissionRate: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold uppercase tracking-wider shadow-lg transition flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>Save System Parameters</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
