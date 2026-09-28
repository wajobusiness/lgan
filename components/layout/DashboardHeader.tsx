'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { 
  Bell, Search, ShieldCheck, ChevronDown, 
  User as UserIcon, Check, Sparkles 
} from 'lucide-react';

export default function DashboardHeader() {
  const pathname = usePathname();
  const { currentUser, switchUserRole, currentMember } = useApp();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const roles: { role: UserRole; label: string; desc: string }[] = [
    { role: 'MEMBER', label: 'Golfer (Member)', desc: 'View digital card & dues' },
    { role: 'SUPER_ADMIN', label: 'Super Admin', desc: 'Full association management' },
    { role: 'CLUB_ADMIN', label: 'Club Admin', desc: 'Manage club roster & dues' },
    { role: 'VENDOR', label: 'Vendor / Merchant', desc: 'Manage shop products & orders' },
  ];

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Search / Breadcrumb */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="text-[#0B3B24] font-bold">LGAN Portal</span>
          <span>/</span>
          <span className="text-slate-900 capitalize">
            {pathname.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') || 'Dashboard'}
          </span>
        </div>
      </div>

      {/* Role Switcher & User Profile */}
      <div className="flex items-center gap-3">
        {/* Instant Role Switcher for Pair Programming / Demonstration */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-300 text-slate-900 text-xs font-bold hover:bg-amber-100 transition shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden md:inline text-slate-600">Simulate Role:</span>
            <span className="text-[#0B3B24]">
              {currentUser?.role ? currentUser.role.replace('_', ' ') : 'MEMBER'}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-slate-200 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3.5 py-2 border-b border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Switch Active Role Simulation
                </p>
              </div>

              {roles.map((r) => {
                const isSelected = currentUser?.role === r.role;
                return (
                  <button
                    key={r.role}
                    onClick={() => {
                      switchUserRole(r.role);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2.5 flex items-center justify-between text-xs hover:bg-slate-50 transition ${
                      isSelected ? 'bg-emerald-50/60 font-bold text-[#0B3B24]' : 'text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span>{r.label}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <p className="text-[10px] text-slate-400 font-normal">{r.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white" />
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#0B3B24] text-amber-300 font-serif font-bold text-xs flex items-center justify-center shadow-sm">
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-tight">
              {currentUser?.name || 'Dr. Lami Ahmed'}
            </p>
            <p className="text-[10px] text-slate-500 font-medium">
              {currentMember?.membershipNumber || currentUser?.email || 'LGAN Member'}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
