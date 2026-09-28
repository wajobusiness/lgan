'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApp } from '@/lib/store';
import { formatNaira } from '@/lib/utils';
import { 
  ShoppingBag, Trash2, ArrowRight, ArrowLeft, 
  ShieldCheck, CheckCircle2 
} from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, clearCart } = useApp();

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-[#0B3B24] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black font-serif text-slate-900">Your Golf Bag is Empty</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
            Explore authentic LGAN merchandise, tournament apparel, and premium golf equipment.
          </p>
        </div>
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-md transition"
        >
          <span>Explore Pro Shop</span>
          <ArrowRight className="w-4 h-4 text-amber-400" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 pb-24">
      <div className="flex justify-between items-center border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900">
            Shopping Cart ({cart.length} items)
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
        >
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
          {cart.map((item) => (
            <div key={item.product.id} className="p-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="relative h-24 w-24 rounded-2xl overflow-hidden bg-slate-100 shrink-0">
                <Image
                  src={item.product.images[0]}
                  alt={item.product.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-1 text-center sm:text-left">
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400">
                  {item.product.category}
                </span>
                <h3 className="text-sm font-bold text-slate-900 leading-snug">{item.product.title}</h3>
                <p className="text-xs font-mono font-bold text-[#0B3B24]">
                  {formatNaira(item.product.price)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="px-2.5 py-1.5 text-slate-600 font-bold hover:bg-slate-200"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-mono font-bold">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="px-2.5 py-1.5 text-slate-600 font-bold hover:bg-slate-200"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 transition"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          <h3 className="text-lg font-bold font-serif text-slate-900 border-b border-slate-100 pb-3">
            Order Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal:</span>
              <span className="font-mono font-bold text-slate-900">{formatNaira(cartTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Estimated Shipping:</span>
              <span className="font-mono font-bold text-emerald-800">Free (Special Promo)</span>
            </div>
            <div className="flex justify-between border-t border-slate-100 pt-3 text-sm">
              <span className="font-bold text-slate-900">Total:</span>
              <span className="font-mono font-black text-xl text-[#0B3B24]">{formatNaira(cartTotal)}</span>
            </div>
          </div>

          <Link
            href="/marketplace/checkout"
            className="w-full py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
