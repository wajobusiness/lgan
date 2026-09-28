'use client';

import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useApp } from '@/lib/store';
import { ZONAL_DISTRICTS } from '@/lib/utils';

export default function ContactPage() {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Membership Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your message has been delivered to the LGAN National Secretariat', 'success');
  };

  return (
    <div className="space-y-16 pb-24">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#0B3B24] to-[#04190E] text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold uppercase tracking-widest">
            <Mail className="w-3.5 h-3.5" /> National Secretariat
          </span>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white">
            Contact the Association
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            Get in touch with the LGAN National Executive Committee, Zonal Vice Presidents, or tournament coordinators.
          </p>
        </div>
      </section>

      {/* MAIN CONTACT CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-serif text-slate-900">
                Send an Official Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Please provide your details below and our administrative secretariat will respond within 24 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">Inquiry Dispatched</h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <span className="font-semibold">{formData.name}</span>. Your correspondence has been logged and assigned to the relevant zonal directorate.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-emerald-800 font-bold underline hover:text-emerald-950 pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lady Fatima Bello"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ladygolfer@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Telephone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 803 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B3B24]"
                    >
                      <option value="Membership Inquiry">Membership &amp; Annual Dues</option>
                      <option value="Club Affiliation">Club Affiliation &amp; Verification</option>
                      <option value="AACT 2026 Tournament">AACT 2026 African Championship</option>
                      <option value="Handicap Dispute">WHS Handicap Index Support</option>
                      <option value="Sponsorship & Partnership">Sponsorship &amp; Brand Partnerships</option>
                      <option value="General Secretariat">General Secretariat Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Message Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Provide full details of your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>Transmit Official Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Secretariat Details & Zonal Hubs */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B3B24] text-white p-8 rounded-3xl border border-emerald-800 shadow-xl space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">
                  National Headquarters
                </span>
                <h4 className="text-xl font-bold font-serif">
                  LGAN National Secretariat
                </h4>
              </div>

              <div className="space-y-4 text-xs text-slate-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-white">Address:</span>
                    <span>IBB International Golf &amp; Country Club, 41 Udi Hill Street, Maitama District, Abuja FCT, Nigeria</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-white">Telephone Lines:</span>
                    <span>+234 (0) 803 311 9842 • +234 (0) 802 304 8812</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-white">Official Correspondence:</span>
                    <span>secretariat@lgan.org.ng • info@lgan.org.ng</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block text-white">Secretariat Hours:</span>
                    <span>Monday – Friday: 08:30 – 17:00 WAT</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-sm font-bold font-serif text-slate-900">
                Zonal Administrative Hubs
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {ZONAL_DISTRICTS.map((zone) => (
                  <div key={zone.name} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="font-bold text-[#0B3B24] block text-[11px]">{zone.name}</span>
                    <span className="text-slate-500 text-[10px]">{zone.headquarters} Hub</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
