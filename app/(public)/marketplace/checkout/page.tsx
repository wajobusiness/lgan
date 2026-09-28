'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { DataService } from '@/lib/storage';
import { formatNaira, NIGERIAN_STATES } from '@/lib/utils';
import { 
  CreditCard, ShieldCheck, MapPin, Truck, 
  ArrowLeft, CheckCircle2, Lock 
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart, triggerPayment, showToast, currentUser } = useApp();

  const [formData, setFormData] = useState({
    fullName: currentUser?.name || 'Dr. Mrs. Lami Ahmed',
    email: currentUser?.email || 'member@lgan.org.ng',
    phone: '+234 803 311 9842',
    address: 'Plot 41 Udi Hill Street, Maitama',
    city: 'Abuja',
    state: 'FCT Abuja',
  });

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      showToast('Your shopping bag is empty', 'error');
      router.push('/marketplace');
      return;
    }

    triggerPayment({
      amount: cartTotal,
      paymentType: 'MARKETPLACE_ORDER',
      title: `LGAN Pro Shop Order (${cart.length} items)`,
      description: `Delivery to ${formData.address}, ${formData.city}`,
      metadata: { ...formData, items: cart },
      onSuccess: (trxRef) => {
        const newOrder = {
          id: `ord_${Date.now()}`,
          orderNumber: `LGAN-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
          userId: currentUser?.id || 'usr_guest',
          customerName: formData.fullName,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          shippingAddress: formData.address,
          city: formData.city,
          state: formData.state,
          totalAmount: cartTotal,
          commissionAmount: Math.round(cartTotal * 0.10), // 10% LGAN platform commission
          status: 'PAID' as const,
          paymentReference: trxRef,
          items: cart.map(item => ({
            productId: item.product.id,
            productTitle: item.product.title,
            vendorId: item.product.vendorId,
            vendorName: item.product.vendorName,
            price: item.product.price,
            quantity: item.quantity,
            image: item.product.images[0],
          })),
          trackingNumber: `DHL-NG-${Math.floor(10000000 + Math.random() * 90000000)}`,
          courierName: 'DHL Express Nigeria',
          createdAt: new Date().toISOString(),
        };

        DataService.addOrder(newOrder);
        clearCart();
        showToast(`Order confirmed! Order #${newOrder.orderNumber}`, 'success');
        router.push('/dashboard/orders');
      },
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24">
      <Link
        href="/marketplace/cart"
        className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-semibold transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Golf Bag</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Shipping Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold font-serif text-slate-900">
              Delivery Information
            </h2>
            <p className="text-xs text-slate-500">Enter courier destination details</p>
          </div>

          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Recipient Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Delivery Street Address *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  State *
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B3B24]"
                >
                  {NIGERIAN_STATES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Order Review & Pay button */}
        <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <h3 className="text-lg font-bold font-serif text-slate-900 border-b border-slate-100 pb-3">
            Review &amp; Payment
          </h3>

          <div className="divide-y divide-slate-100 max-h-60 overflow-y-auto pr-2 space-y-2">
            {cart.map((item) => (
              <div key={item.product.id} className="pt-2 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-slate-900">{item.product.title}</span>
                  <p className="text-slate-400">Qty: {item.quantity}</p>
                </div>
                <span className="font-mono font-bold text-slate-800">
                  {formatNaira(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal:</span>
              <span className="font-mono font-bold">{formatNaira(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Nationwide Shipping:</span>
              <span className="font-mono font-bold text-emerald-800">Free</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-base">
              <span className="font-bold text-slate-900">Total Payable:</span>
              <span className="font-mono font-black text-xl text-[#0B3B24]">
                {formatNaira(cartTotal)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            className="w-full py-4 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-xl transition flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4 text-amber-400" />
            <span>Pay {formatNaira(cartTotal)} with Paystack</span>
          </button>
        </div>
      </div>
    </div>
  );
}
