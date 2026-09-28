'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2, Send } from 'lucide-react';
import { useApp } from '@/lib/store';

export default function ForgotPasswordPage() {
  const { showToast } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    showToast('Password reset link sent to your registered email', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center space-y-2">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-xs text-[#0B3B24] font-semibold mb-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>
          <h1 className="text-3xl font-black font-serif text-slate-900">
            Reset Password
          </h1>
          <p className="text-xs text-slate-500">
            Enter your registered LGAN email address to receive password recovery instructions.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl">
          {sent ? (
            <div className="text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">Reset Email Dispatched</h3>
              <p className="text-xs text-slate-500">
                We have transmitted instructions to <span className="font-semibold text-slate-800">{email}</span>. Please check your inbox and spam folders.
              </p>
              <Link
                href="/login"
                className="inline-block pt-2 text-xs font-bold text-[#0B3B24] hover:underline"
              >
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="golfer@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-amber-400" />
                <span>Send Recovery Instructions</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
