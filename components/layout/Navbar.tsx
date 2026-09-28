'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { 
  ShoppingBag, Shield, User, Menu, X, ChevronDown, 
  Trophy, Phone, MapPin, Sparkles, ExternalLink 
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, switchUserRole, cartCount } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const getDashboardLink = (role?: UserRole) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return '/admin/dashboard';
      case 'CLUB_ADMIN':
        return '/club/dashboard';
      case 'VENDOR':
        return '/vendor/dashboard';
      default:
        return '/dashboard';
    }
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About LGAN', href: '/about' },
    { name: 'Leadership', href: '/leadership' },
    { name: 'Membership & Dues', href: '/membership' },
    { name: 'Affiliated Clubs', href: '/clubs' },
    { name: 'Tournaments (AACT 2026)', href: '/events' },
    { name: 'Golfer Directory', href: '/directory' },
    { name: 'Pro Shop', href: '/marketplace' },
    { name: 'News', href: '/news' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-lg bg-[#0B3B24]">
      {/* TOP ANNOUNCEMENT TICKER */}
      <div className="bg-[#04190E] text-slate-300 py-1.5 px-4 sm:px-8 text-[11px] font-mono border-b border-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-amber-400 font-bold uppercase tracking-wider">
            <Trophy className="w-3 h-3 text-amber-400" /> AACT 2026:
          </span>
          <span className="text-slate-200">
            Nigeria Hosts 24+ African Nations in Abuja • October 2026
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6 text-[11px] text-slate-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3 h-3 text-amber-400" /> Secretariat: IBB Golf Club, Maitama, Abuja
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-amber-400" /> +234 (0) 803 311 9842
          </span>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Crest */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center font-serif font-black text-slate-950 text-2xl shadow-md border border-amber-300">
              L
            </div>
            <div>
              <div className="font-serif font-bold text-lg text-white tracking-wider leading-tight">
                LGAN
              </div>
              <div className="text-[9px] font-mono tracking-widest text-amber-400 uppercase font-semibold">
                Ladies Golf Association of Nigeria
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden xl:flex items-center gap-6 text-xs font-semibold text-slate-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition hover:text-amber-400 py-1 ${
                    isActive
                      ? 'text-amber-400 border-b-2 border-amber-400 font-bold'
                      : 'text-slate-200'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Actions & Role Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Cart Button */}
            <Link
              href="/marketplace/cart"
              className="relative p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-md">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Dashboard / Login Button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <Link
                  href={getDashboardLink(currentUser.role)}
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Dashboard ({currentUser.role.replace('_', ' ')})</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register/member"
                  className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition"
                >
                  Join LGAN
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-3">
            <Link
              href="/marketplace/cart"
              className="relative p-2 rounded-xl bg-white/10 text-white"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* MOBILE DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-emerald-900/80 py-4 px-2 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-amber-400 transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-3 border-t border-emerald-900/80 flex flex-col gap-2">
              {currentUser ? (
                <Link
                  href={getDashboardLink(currentUser.role)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-xl bg-amber-400 text-slate-950 text-center font-bold text-xs uppercase tracking-wider shadow-md"
                >
                  Enter Portal ({currentUser.role.replace('_', ' ')})
                </Link>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-xl bg-white/10 text-white text-center font-bold text-xs uppercase tracking-wider"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register/member"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2.5 rounded-xl bg-amber-400 text-slate-950 text-center font-bold text-xs uppercase tracking-wider"
                  >
                    Join LGAN
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
