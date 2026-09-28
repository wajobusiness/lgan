'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Award, Plus, Calendar, Flag, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function MemberHandicapPage() {
  const { currentMember, showToast } = useApp();

  const [scores, setScores] = useState([
    {
      id: 1,
      date: '2026-02-28',
      course: 'IBB International Golf Club (Championship 18)',
      gross: 82,
      rating: 72.4,
      slope: 132,
      differential: 8.2,
      attester: 'Lady Captain Victoria Nnamani',
    },
    {
      id: 2,
      date: '2026-02-14',
      course: 'Ikoyi Club 1938 (Main 18)',
      gross: 85,
      rating: 71.8,
      slope: 128,
      differential: 11.6,
      attester: 'Evelyn Oyome',
    },
    {
      id: 3,
      date: '2026-01-20',
      course: 'Smokin Hills Golf Resort',
      gross: 84,
      rating: 73.0,
      slope: 135,
      differential: 9.2,
      attester: 'Aminat Lawal',
    },
  ]);

  const [newScore, setNewScore] = useState({
    date: new Date().toISOString().split('T')[0],
    course: 'IBB International Golf Club',
    gross: 83,
    rating: 72.4,
    slope: 132,
    attester: '',
  });

  const handlePostScore = (e: React.FormEvent) => {
    e.preventDefault();
    const diff = ((newScore.gross - newScore.rating) * 113) / newScore.slope;
    const item = {
      id: Date.now(),
      date: newScore.date,
      course: newScore.course,
      gross: Number(newScore.gross),
      rating: Number(newScore.rating),
      slope: Number(newScore.slope),
      differential: parseFloat(diff.toFixed(1)),
      attester: newScore.attester || 'Verified Marker',
    };

    setScores([item, ...scores]);
    showToast('Scorecard submitted and attested for WHS Handicap revision!', 'success');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          WHS Scoring Index
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
          World Handicap System (WHS) Tracker
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Submit attested 18-hole scorecards to compute your official R&amp;A / USGA Handicap Index.
        </p>
      </div>

      {/* Index Metric Card */}
      <div className="bg-gradient-to-br from-[#0B3B24] to-[#04190E] p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-amber-400/40">
        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
            Official WHS Playing Index
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-black font-mono text-white">
              {currentMember?.handicapIndex !== undefined ? currentMember.handicapIndex.toFixed(1) : '11.2'}
            </span>
            <span className="text-xs text-emerald-300 font-semibold">Low Index (365 Days): 9.8</span>
          </div>
          <p className="text-xs text-slate-300">
            Calculated from the best 8 score differentials of the last 20 submitted rounds.
          </p>
        </div>

        <div className="bg-white/10 p-4 rounded-2xl border border-white/20 text-xs text-slate-200 space-y-1">
          <span className="font-bold text-amber-300 block">Handicap Certificate:</span>
          <p>Verified for AACT 2026 &amp; All National Opens</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Score Submission Form */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold font-serif text-slate-900">Post New Scorecard</h3>
            <p className="text-xs text-slate-500">Enter your 18-hole gross score &amp; marker attestation</p>
          </div>

          <form onSubmit={handlePostScore} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Played Date</label>
              <input
                type="date"
                required
                value={newScore.date}
                onChange={(e) => setNewScore({ ...newScore, date: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Golf Course &amp; Tees</label>
              <input
                type="text"
                required
                value={newScore.course}
                onChange={(e) => setNewScore({ ...newScore, course: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Gross</label>
                <input
                  type="number"
                  required
                  value={newScore.gross}
                  onChange={(e) => setNewScore({ ...newScore, gross: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Rating</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={newScore.rating}
                  onChange={(e) => setNewScore({ ...newScore, rating: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase mb-1">Slope</label>
                <input
                  type="number"
                  required
                  value={newScore.slope}
                  onChange={(e) => setNewScore({ ...newScore, slope: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Playing Partner / Attester</label>
              <input
                type="text"
                required
                placeholder="e.g. Lady Captain Victoria Nnamani"
                value={newScore.attester}
                onChange={(e) => setNewScore({ ...newScore, attester: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold uppercase tracking-wider shadow-md transition"
            >
              Submit Score for Revision
            </button>
          </form>
        </div>

        {/* Score History Table */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <h3 className="text-base font-bold font-serif text-slate-900">
              Submitted Scorecard Log
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-2 text-center">Gross</th>
                  <th className="py-3 px-2 text-center">Diff</th>
                  <th className="py-3 px-4">Attester</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {scores.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono text-slate-600">{s.date}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{s.course}</td>
                    <td className="py-3 px-2 text-center font-mono font-bold text-slate-900">{s.gross}</td>
                    <td className="py-3 px-2 text-center font-mono font-bold text-emerald-800 bg-emerald-50 rounded">
                      +{s.differential}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">{s.attester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
