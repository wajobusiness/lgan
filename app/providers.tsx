'use client';

import React from 'react';
import { AppProvider, useApp } from '@/lib/store';
import PaystackModal from '@/components/ui/PaystackModal';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

function GlobalToast() {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[120] max-w-sm rounded-xl p-4 shadow-2xl bg-slate-950 text-white border border-slate-800 animate-in slide-in-from-bottom-5 duration-200 flex items-center gap-3">
      {toast.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />}
      {toast.type === 'error' && <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />}
      {toast.type === 'info' && <Info className="h-5 w-5 text-amber-400 shrink-0" />}
      
      <p className="text-xs font-medium text-slate-200">{toast.message}</p>
    </div>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      {children}
      <PaystackModal />
      <GlobalToast />
    </AppProvider>
  );
}
