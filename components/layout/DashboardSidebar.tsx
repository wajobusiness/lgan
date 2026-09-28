'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { 
  LayoutDashboard, Users, CreditCard, Award, QrCode, 
  Calendar, ShoppingBag, Settings, Building2, Store, 
  FileText, ShieldCheck, LogOut, ArrowLeft, TrendingUp, Bell 
} from 'lucide-react';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { currentUser, switchUserRole } = useApp();

  // Determine portal by current path
  const isAdmin = pathname.startsWith('/admin');
  const isClub = pathname.startsWith('/club');
  const isVendor = pathname.startsWith('/vendor');
  const isMember = !isAdmin && !isClub && !isVendor;

  const adminLinks = [
    { name: 'Executive Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Member Approvals', href: '/admin/members', icon: Users },
    { name: 'Affiliated Clubs', href: '/admin/clubs', icon: Building2 },
    { name: 'Vendors & Merchants', href: '/admin/vendors', icon: Store },
    { name: 'Marketplace Catalog', href: '/admin/marketplace', icon: ShoppingBag },
    { name: 'Tournaments & Draws', href: '/admin/events', icon: Calendar },
    { name: 'Paystack Ledger', href: '/admin/payments', icon: CreditCard },
    { name: 'Announcements', href: '/admin/content', icon: Bell },
    { name: 'System Settings', href: '/admin/settings', icon: Settings },
  ];

  const memberLinks = [
    { name: 'Member Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Digital Member Card', href: '/dashboard/digital-card', icon: QrCode },
    { name: 'Annual Dues (₦5,000)', href: '/dashboard/dues', icon: CreditCard },
    { name: 'Golfer Profile', href: '/dashboard/profile', icon: Users },
    { name: 'Tournament Entries', href: '/dashboard/tournaments', icon: Calendar },
    { name: 'WHS Handicap Index', href: '/dashboard/handicap', icon: Award },
    { name: 'Marketplace Orders', href: '/dashboard/orders', icon: ShoppingBag },
  ];

  const clubLinks = [
    { name: 'Club Dashboard', href: '/club/dashboard', icon: LayoutDashboard },
    { name: 'Ladies Section Roster', href: '/club/members', icon: Users },
    { name: 'Affiliation Dues (₦25k)', href: '/club/subscription', icon: CreditCard },
    { name: 'Tournament Hosting Bids', href: '/club/tournaments', icon: Calendar },
    { name: 'Compliance & Reports', href: '/club/reports', icon: FileText },
  ];

  const vendorLinks = [
    { name: 'Merchant Overview', href: '/vendor/dashboard', icon: LayoutDashboard },
    { name: 'Product Catalog', href: '/vendor/products', icon: ShoppingBag },
    { name: 'Order Fulfillment', href: '/vendor/orders', icon: FileText },
    { name: 'Payouts & Earnings', href: '/vendor/earnings', icon: TrendingUp },
  ];

  const currentLinks = isAdmin
    ? adminLinks
    : isClub
    ? clubLinks
    : isVendor
    ? vendorLinks
    : memberLinks;

  const portalTitle = isAdmin
    ? 'Super Admin Portal'
    : isClub
    ? 'Club Administration'
    : isVendor
    ? 'Merchant Portal'
    : 'Golfer Portal';

  const portalBadge = isAdmin
    ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    : isClub
    ? 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    : isVendor
    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';

  return (
    <aside className="w-64 bg-[#0B3B24] text-slate-200 min-h-screen flex flex-col justify-between border-r border-emerald-900/60 shrink-0">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-emerald-900/60">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 font-serif font-black flex items-center justify-center text-lg shadow-md shrink-0">
              L
            </div>
            <div>
              <h2 className="text-sm font-bold font-serif text-white tracking-wide leading-tight">
                LGAN Platform
              </h2>
              <span className={`inline-block mt-1 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${portalBadge}`}>
                {portalTitle}
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1.5">
          {currentLinks.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  isActive
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:bg-emerald-900/50 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-slate-950' : 'text-amber-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Switcher / Exit */}
      <div className="p-4 border-t border-emerald-900/60 space-y-3">
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-emerald-900/40 transition font-medium"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>Return to Public Portal</span>
        </Link>
      </div>
    </aside>
  );
}
