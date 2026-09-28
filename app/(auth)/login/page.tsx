'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { INITIAL_USERS } from '@/lib/mockData';
import { UserRole } from '@/lib/types';
import { 
  Lock, Mail, ArrowRight, ShieldCheck, 
  Sparkles, CheckCircle2, User, Building2, Store 
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser, showToast } = useApp();
  const [email, setEmail] = useState('admin@lgan.org.ng');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = INITIAL_USERS.find((u) => u.email === email) || INITIAL_USERS[0];
    setCurrentUser(user);
    showToast(`Welcome back, ${user.name}!`, 'success');

    if (user.role === 'SUPER_ADMIN') router.push('/admin/dashboard');
    else if (user.role === 'CLUB_ADMIN') router.push('/club/dashboard');
    else if (user.role === 'VENDOR') router.push('/vendor/dashboard');
    else router.push('/dashboard');
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    const user = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];
    setCurrentUser(user);
    showToast(`Logged in as ${role.replace('_', ' ')} (${user.name})`, 'info');

    if (role === 'SUPER_ADMIN') router.push('/admin/dashboard');
    else if (role === 'CLUB_ADMIN') router.push('/club/dashboard');
    else if (role === 'VENDOR') router.push('/vendor/dashboard');
    else router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#0B3B24] text-amber-400 font-serif font-black flex items-center justify-center text-xl shadow-md">
              L
            </div>
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Secure Portal Authentication
          </span>
          <h1 className="text-3xl font-black font-serif text-slate-900">
            Sign In to LGAN
          </h1>
          <p className="text-xs text-slate-500">
            Access your verified member card, club management, vendor store, or executive admin portal.
          </p>
        </div>

        {/* 1-Click Role Switcher Demo Cards */}
        <div className="bg-amber-50/80 p-4 rounded-3xl border border-amber-200 space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Instant Role Simulation (1-Click Test):</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemoLogin('SUPER_ADMIN')}
              className="p-2.5 rounded-xl bg-white hover:bg-emerald-950 hover:text-white border border-amber-200 text-left transition shadow-sm text-xs font-semibold"
            >
              <div className="flex items-center gap-1 text-[#0B3B24]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Super Admin</span>
              </div>
              <p className="text-[10px] text-slate-400 font-normal">Dr. Lami Ahmed</p>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('MEMBER')}
              className="p-2.5 rounded-xl bg-white hover:bg-emerald-950 hover:text-white border border-amber-200 text-left transition shadow-sm text-xs font-semibold"
            >
              <div className="flex items-center gap-1 text-[#0B3B24]">
                <User className="w-3.5 h-3.5" />
                <span>Member Golfer</span>
              </div>
              <p className="text-[10px] text-slate-400 font-normal">Evelyn Oyome</p>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('CLUB_ADMIN')}
              className="p-2.5 rounded-xl bg-white hover:bg-emerald-950 hover:text-white border border-amber-200 text-left transition shadow-sm text-xs font-semibold"
            >
              <div className="flex items-center gap-1 text-[#0B3B24]">
                <Building2 className="w-3.5 h-3.5" />
                <span>Club Admin</span>
              </div>
              <p className="text-[10px] text-slate-400 font-normal">IBB Golf Club</p>
            </button>

            <button
              onClick={() => handleQuickDemoLogin('VENDOR')}
              className="p-2.5 rounded-xl bg-white hover:bg-emerald-950 hover:text-white border border-amber-200 text-left transition shadow-sm text-xs font-semibold"
            >
              <div className="flex items-center gap-1 text-[#0B3B24]">
                <Store className="w-3.5 h-3.5" />
                <span>Merchant</span>
              </div>
              <p className="text-[10px] text-slate-400 font-normal">Fairway Pro Shop</p>
            </button>
          </div>
        </div>

        {/* Standard Form */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-[11px] text-[#0B3B24] hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
            >
              <span>Authenticate &amp; Enter Portal</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>
        </div>

        {/* Register Links */}
        <div className="text-center text-xs text-slate-500 space-y-2">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/register/member" className="text-[#0B3B24] font-bold hover:underline">
              Register as Golfer
            </Link>
          </p>
          <div className="flex justify-center gap-4 text-[11px]">
            <Link href="/register/club" className="text-slate-600 hover:underline">
              Affiliate Club
            </Link>
            <span>•</span>
            <Link href="/register/vendor" className="text-slate-600 hover:underline">
              Vendor Application
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
