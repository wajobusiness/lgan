'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Trophy, Calendar, Plus, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { INITIAL_TOURNAMENTS } from '@/lib/mockData';

export default function ClubTournamentsPage() {
  const { showToast } = useApp();
  const [showBidModal, setShowBidModal] = useState(false);
  const [bidData, setBidData] = useState({
    name: '2027 Ladies Captain Inaugural Open',
    proposedDate: '2027-03-12',
    format: 'STROKE_PLAY',
    expectedField: 100,
  });

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBidModal(false);
    showToast('Tournament hosting bid submitted to the National Tournament Committee!', 'success');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Host Facility Fixtures
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
            Tournament Hosting &amp; Bids
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage sanctioned opens hosted at your facility and submit hosting bids for upcoming seasons.
          </p>
        </div>

        <button
          onClick={() => setShowBidModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white text-xs font-bold uppercase tracking-wider shadow-md transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Submit Hosting Bid</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
              Flagship Continental Open
            </span>
            <span className="text-xs text-emerald-700 font-bold">Host Venue Confirmed</span>
          </div>

          <h3 className="text-lg font-bold font-serif text-slate-900">
            All Africa Challenge Trophy (AACT 2026)
          </h3>
          <p className="text-xs text-slate-600">
            October 18 – 24, 2026 • 24 African National Teams
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1">
            <span className="font-bold text-slate-800 block">Course Preparation:</span>
            <p className="text-slate-500">
              Fairway aeration scheduled for Aug 2026. Greens rolling target: 11.5 on the stimpmeter.
            </p>
          </div>
        </div>
      </div>

      {/* BID MODAL */}
      {showBidModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <h3 className="text-base font-bold font-serif text-slate-900">Submit Tournament Hosting Bid</h3>
              <button onClick={() => setShowBidModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <form onSubmit={handleBidSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Proposed Tournament Title</label>
                <input
                  type="text"
                  required
                  value={bidData.name}
                  onChange={(e) => setBidData({ ...bidData, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Proposed Date</label>
                  <input
                    type="date"
                    required
                    value={bidData.proposedDate}
                    onChange={(e) => setBidData({ ...bidData, proposedDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase mb-1">Expected Players</label>
                  <input
                    type="number"
                    value={bidData.expectedField}
                    onChange={(e) => setBidData({ ...bidData, expectedField: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowBidModal(false)}
                  className="w-1/3 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-xl bg-[#0B3B24] text-white font-bold uppercase shadow-md"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
