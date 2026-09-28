'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { formatNaira } from '@/lib/utils';
import { ShieldCheck, CreditCard, Building2, Smartphone, CheckCircle, Lock, Loader2, X } from 'lucide-react';

export default function PaystackModal() {
  const { paystackModal, closePaymentModal, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [cardNumber, setCardNumber] = useState('4084 0841 0841 0841');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('888');
  const [email, setEmail] = useState('member@lgan.org.ng');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trxRef, setTrxRef] = useState('');

  if (!paystackModal.isOpen) return null;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    const generatedRef = `LGAN-PSTK-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrxRef(generatedRef);

    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);

      setTimeout(() => {
        paystackModal.onSuccess(generatedRef);
        showToast('Payment confirmed successfully via Paystack!', 'success');
        handleClose();
      }, 1500);
    }, 2000);
  };

  const handleClose = () => {
    setProcessing(false);
    setSuccess(false);
    closePaymentModal();
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/75 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl border border-slate-200 text-slate-900">
        {/* Header with Paystack Brand & LGAN Crest */}
        <div className="bg-[#0B3B24] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 font-serif font-black flex items-center justify-center text-sm shadow-md">
              L
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                Secured by Paystack
              </p>
              <h3 className="text-base font-semibold leading-tight">{paystackModal.title || 'LGAN Payment Gateway'}</h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            disabled={processing}
            className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Payment Summary */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 font-medium">Transaction Amount</p>
            <p className="text-2xl font-black text-[#0B3B24]">{formatNaira(paystackModal.amount)}</p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL
            </span>
            <p className="text-[11px] text-slate-400 mt-1">{paystackModal.paymentType.replace(/_/g, ' ')}</p>
          </div>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-slate-900">Payment Approved!</h4>
              <p className="text-xs text-slate-500 mt-1">Transaction Ref: <span className="font-mono font-bold text-slate-700">{trxRef}</span></p>
            </div>
            <p className="text-xs text-emerald-700 bg-emerald-50 py-2 rounded-lg font-medium">
              Updating your membership and generating official receipt...
            </p>
          </div>
        ) : (
          <div className="p-6">
            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-xs font-semibold transition ${
                  activeTab === 'card'
                    ? 'border-[#0B3B24] bg-[#0B3B24]/5 text-[#0B3B24]'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('transfer')}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-xs font-semibold transition ${
                  activeTab === 'transfer'
                    ? 'border-[#0B3B24] bg-[#0B3B24]/5 text-[#0B3B24]'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Bank Transfer</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('ussd')}
                className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-xs font-semibold transition ${
                  activeTab === 'ussd'
                    ? 'border-[#0B3B24] bg-[#0B3B24]/5 text-[#0B3B24]'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span>USSD Code</span>
              </button>
            </div>

            {/* Card Form */}
            {activeTab === 'card' && (
              <form onSubmit={handlePay} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="0000 0000 0000 0000"
                      required
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm font-mono focus:border-[#0B3B24] focus:outline-none focus:ring-1 focus:ring-[#0B3B24]"
                    />
                    <div className="absolute right-3 top-2.5 flex items-center gap-1">
                      <span className="text-[10px] font-extrabold bg-blue-600 text-white px-1.5 py-0.5 rounded">VISA</span>
                      <span className="text-[10px] font-extrabold bg-red-600 text-white px-1.5 py-0.5 rounded">MC</span>
                      <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-1.5 py-0.5 rounded">VERVE</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Valid Thru
                    </label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM/YY"
                      required
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm font-mono focus:border-[#0B3B24] focus:outline-none focus:ring-1 focus:ring-[#0B3B24]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="123"
                      required
                      className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm font-mono focus:border-[#0B3B24] focus:outline-none focus:ring-1 focus:ring-[#0B3B24]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Receipt Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@domain.com"
                    required
                    className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#0B3B24] focus:outline-none focus:ring-1 focus:ring-[#0B3B24]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white py-3 px-4 font-bold text-sm shadow-md transition disabled:opacity-50"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                      Authorizing with Bank...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-amber-400" />
                      Pay {formatNaira(paystackModal.amount)}
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Transfer View */}
            {activeTab === 'transfer' && (
              <div className="space-y-4 text-center">
                <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300 space-y-2">
                  <p className="text-xs text-slate-500">Pay to designated Wema / Paystack virtual account:</p>
                  <p className="text-xs font-bold text-slate-700">Bank: <span className="text-[#0B3B24]">Wema Bank / Paystack-LGAN</span></p>
                  <p className="text-xl font-mono font-extrabold text-[#0B3B24] tracking-widest">9948271038</p>
                  <p className="text-xs text-slate-500">Account Name: <span className="font-semibold">LGAN / {paystackModal.title}</span></p>
                </div>
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={processing}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white py-3 px-4 font-bold text-sm shadow-md transition"
                >
                  {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'I Have Sent The Transfer'}
                </button>
              </div>
            )}

            {/* USSD View */}
            {activeTab === 'ussd' && (
              <div className="space-y-4 text-center">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-xs text-slate-500 mb-2">Dial the shortcode from your registered phone number:</p>
                  <div className="bg-white p-3 rounded-lg border font-mono font-bold text-base text-[#0B3B24]">
                    *737*50*5000*8492#
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2">Works with GTBank, Zenith, Access, First Bank & UBA</p>
                </div>
                <button
                  type="button"
                  onClick={handlePay}
                  disabled={processing}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white py-3 px-4 font-bold text-sm shadow-md transition"
                >
                  {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify USSD Payment'}
                </button>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
              <Lock className="w-3 h-3 text-emerald-600" />
              <span>PCI-DSS Level 1 Compliant. Official payment gateway of LGAN.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
