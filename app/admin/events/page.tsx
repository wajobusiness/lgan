'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, Trophy, Plus, MapPin, Users, 
  CreditCard, Edit3, Trash2, CheckCircle2, Download, Search, Filter 
} from 'lucide-react';
import { INITIAL_TOURNAMENTS } from '@/lib/mockData';
import { formatNaira } from '@/lib/utils';
import { useApp } from '@/lib/store';

export default function AdminEventsPage() {
  const { showToast } = useApp();
  const [tournaments, setTournaments] = useState(INITIAL_TOURNAMENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newTourney, setNewTourney] = useState({
    title: '',
    format: 'STROKE_PLAY',
    location: 'IBB International Golf Club, Abuja',
    startDate: '2026-11-10',
    endDate: '2026-11-14',
    entryFee: 15000,
    maxParticipants: 120,
    registrationDeadline: '2026-11-01',
    description: '',
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const created = {
      id: `tourn_${Date.now()}`,
      slug: newTourney.title.toLowerCase().replace(/\s+/g, '-'),
      title: newTourney.title,
      format: newTourney.format as any,
      location: newTourney.location,
      startDate: `${newTourney.startDate}T08:00:00Z`,
      endDate: `${newTourney.endDate}T18:00:00Z`,
      entryFee: Number(newTourney.entryFee),
      maxParticipants: Number(newTourney.maxParticipants),
      registeredCount: 0,
      registrationDeadline: `${newTourney.registrationDeadline}T23:59:59Z`,
      status: 'UPCOMING' as const,
      description: newTourney.description || 'Official LGAN sanctioned championship.',
    };

    setTournaments([created, ...tournaments]);
    setShowModal(false);
    showToast(`Tournament "${newTourney.title}" created successfully!`, 'success');
  };

  const filtered = tournaments.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Competition Management
          </span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
            Championships &amp; Tournaments
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Schedule national opens, configure player entries, draw pairings, and publish official leaderboards.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white text-xs font-bold uppercase tracking-wider shadow-md transition flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Create New Tournament</span>
        </button>
      </div>

      {/* Search & Export Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search tournament title or venue..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B3B24]"
          />
        </div>

        <button
          onClick={() => alert('Exporting all player entry manifests across 2026 tournaments to CSV...')}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
        >
          <Download className="w-4 h-4 text-slate-600" />
          <span>Export All Draws (CSV)</span>
        </button>
      </div>

      {/* Tournaments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tournament) => (
          <div
            key={tournament.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  {tournament.format}
                </span>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {tournament.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold font-serif text-slate-900 leading-snug">
                  {tournament.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                  <span>{tournament.location}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Dates</span>
                  <span className="font-semibold text-slate-800">
                    {tournament.startDate.split('T')[0]}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Entry Fee</span>
                  <span className="font-mono font-bold text-[#0B3B24]">
                    {tournament.entryFee === 0 ? 'Free' : formatNaira(tournament.entryFee)}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Player Entries:</span>
                  <span className="font-bold text-slate-900">
                    {tournament.registeredCount} / {tournament.maxParticipants}
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#0B3B24] h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(100, (tournament.registeredCount / tournament.maxParticipants) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link
                href={`/events/${tournament.slug}`}
                target="_blank"
                className="text-xs font-bold text-[#0B3B24] hover:underline"
              >
                View Public Draw &amp; Scores →
              </Link>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast(`Opening draw editor for ${tournament.title}`, 'info')}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  title="Edit Draw"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold font-serif text-slate-900">Create New Championship</h3>
                <p className="text-xs text-slate-500">Sanction a new national or zonal open</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tournament Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026 South-South Ladies Championship"
                  value={newTourney.title}
                  onChange={(e) => setNewTourney({ ...newTourney, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Format *
                  </label>
                  <select
                    value={newTourney.format}
                    onChange={(e) => setNewTourney({ ...newTourney, format: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-[#0B3B24]"
                  >
                    <option value="STROKE_PLAY">Stroke Play (Gross &amp; Net)</option>
                    <option value="MATCH_PLAY">Match Play</option>
                    <option value="STABLEFORD">Stableford Points</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Entry Fee (₦) *
                  </label>
                  <input
                    type="number"
                    required
                    value={newTourney.entryFee}
                    onChange={(e) => setNewTourney({ ...newTourney, entryFee: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-[#0B3B24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Host Facility / Golf Club *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Python Golf Club, Port Harcourt"
                  value={newTourney.location}
                  onChange={(e) => setNewTourney({ ...newTourney, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newTourney.startDate}
                    onChange={(e) => setNewTourney({ ...newTourney, startDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newTourney.endDate}
                    onChange={(e) => setNewTourney({ ...newTourney, endDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Max Field Capacity *
                  </label>
                  <input
                    type="number"
                    value={newTourney.maxParticipants}
                    onChange={(e) => setNewTourney({ ...newTourney, maxParticipants: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Registration Deadline *
                  </label>
                  <input
                    type="date"
                    required
                    value={newTourney.registrationDeadline}
                    onChange={(e) => setNewTourney({ ...newTourney, registrationDeadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Tournament Overview
                </label>
                <textarea
                  rows={3}
                  placeholder="Details regarding flights, handicap limits, practice rounds..."
                  value={newTourney.description}
                  onChange={(e) => setNewTourney({ ...newTourney, description: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/3 py-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold uppercase"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white text-xs font-bold uppercase tracking-wider shadow-md transition"
                >
                  Publish Championship
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
