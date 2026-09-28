'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { DataService } from '@/lib/storage';
import { INITIAL_CLUBS } from '@/lib/mockData';
import { ZONAL_DISTRICTS } from '@/lib/utils';
import { User, Mail, Phone, MapPin, Award, Save, ShieldCheck } from 'lucide-react';

export default function MemberProfilePage() {
  const { currentMember, currentUser, showToast } = useApp();

  const [formData, setFormData] = useState({
    fullName: currentMember?.fullName || currentUser?.name || 'Dr. (Mrs.) Lami O. Ahmed',
    email: currentUser?.email || 'admin@lgan.org.ng',
    phone: currentMember?.phone || '+234 803 311 9842',
    clubName: currentMember?.clubName || INITIAL_CLUBS[0].name,
    zone: currentMember?.zone || 'North Central',
    stateOfOrigin: currentMember?.stateOfOrigin || 'Niger State',
    directoryVisible: currentMember?.directoryVisible !== false,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMember) {
      DataService.updateMember(currentMember.id, formData);
    }
    showToast('Profile information updated successfully!', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Personal Records
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
          Golfer Profile &amp; Affiliations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage your association bio, home golf club affiliation, and directory visibility.
        </p>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name (with Titles)
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                State of Origin
              </label>
              <input
                type="text"
                value={formData.stateOfOrigin}
                onChange={(e) => setFormData({ ...formData, stateOfOrigin: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Home Golf Club
              </label>
              <select
                value={formData.clubName}
                onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B3B24]"
              >
                {INITIAL_CLUBS.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Geopolitical Zone
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

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs">
            <input
              type="checkbox"
              id="dirToggle"
              checked={formData.directoryVisible}
              onChange={(e) => setFormData({ ...formData, directoryVisible: e.target.checked })}
              className="rounded border-slate-300 text-[#0B3B24] focus:ring-[#0B3B24]"
            />
            <label htmlFor="dirToggle" className="text-slate-700 cursor-pointer font-medium">
              List my verified golfer credentials in the searchable Public Golfer Directory
            </label>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center gap-2"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>Save Profile Updates</span>
          </button>
        </form>
      </div>
    </div>
  );
}
