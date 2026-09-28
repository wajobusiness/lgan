'use client';

import React, { useState } from 'react';
import { Trophy, Medal, Search, Filter, RefreshCw, Flag, Award, Sparkles } from 'lucide-react';

interface LeaderboardEntry {
  id?: string;
  position: number;
  name: string;
  club: string;
  handicap: number;
  r1: number;
  r2?: number;
  r3?: number;
  totalGross: number;
  totalNet?: number;
  toPar: string;
  thru: string;
  flight?: string;
}

interface TournamentLeaderboardProps {
  participants?: LeaderboardEntry[];
  tournamentTitle?: string;
}

const DEFAULT_PARTICIPANTS: LeaderboardEntry[] = [
  {
    position: 1,
    name: 'Evelyn Oyome',
    club: 'Ikoyi Club 1938, Lagos',
    handicap: 2,
    r1: 71,
    r2: 70,
    r3: 72,
    totalGross: 213,
    totalNet: 207,
    toPar: '-3',
    thru: 'F',
    flight: 'Championship',
  },
  {
    position: 2,
    name: 'Rachael Danjuma',
    club: 'IBB Golf & Country Club, Abuja',
    handicap: 4,
    r1: 73,
    r2: 71,
    r3: 71,
    totalGross: 215,
    totalNet: 203,
    toPar: '-1',
    thru: 'F',
    flight: 'Championship',
  },
  {
    position: 3,
    name: 'Aminat Lawal',
    club: 'Smokin Hills Golf Resort, Ilara-Mokin',
    handicap: 3,
    r1: 72,
    r2: 73,
    r3: 72,
    totalGross: 217,
    totalNet: 208,
    toPar: '+1',
    thru: 'F',
    flight: 'Championship',
  },
  {
    position: 4,
    name: 'Faith Bamidele',
    club: 'Kaduna Golf Club',
    handicap: 5,
    r1: 74,
    r2: 73,
    r3: 73,
    totalGross: 220,
    totalNet: 205,
    toPar: '+4',
    thru: 'F',
    flight: 'Flight A',
  },
  {
    position: 5,
    name: 'Hauwa Mohammed',
    club: 'Rayfield Golf Club 1913, Jos',
    handicap: 7,
    r1: 76,
    r2: 75,
    r3: 72,
    totalGross: 223,
    totalNet: 202,
    toPar: '+7',
    thru: 'F',
    flight: 'Flight A',
  },
  {
    position: 6,
    name: 'Blessing Obaje',
    club: 'Python Golf Club, Port Harcourt',
    handicap: 6,
    r1: 77,
    r2: 74,
    r3: 74,
    totalGross: 225,
    totalNet: 207,
    toPar: '+9',
    thru: 'F',
    flight: 'Flight A',
  },
  {
    position: 7,
    name: 'Dr. Lami Ahmed',
    club: 'IBB Golf & Country Club, Abuja',
    handicap: 11,
    r1: 82,
    r2: 79,
    r3: 80,
    totalGross: 241,
    totalNet: 208,
    toPar: '+25',
    thru: 'F',
    flight: 'Senior Ladies',
  },
];

export default function TournamentLeaderboard({
  participants = DEFAULT_PARTICIPANTS,
  tournamentTitle = 'AACT 2026 Championship',
}: TournamentLeaderboardProps) {
  const [scoreType, setScoreType] = useState<'gross' | 'net'>('gross');
  const [selectedFlight, setSelectedFlight] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const data = participants.length > 0 ? participants : DEFAULT_PARTICIPANTS;

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const filteredData = data.filter((entry) => {
    const matchesSearch =
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.club.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFlight =
      selectedFlight === 'all' || entry.flight?.toLowerCase() === selectedFlight.toLowerCase();
    return matchesSearch && matchesFlight;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (scoreType === 'net') {
      return (a.totalNet || a.totalGross) - (b.totalNet || b.totalGross);
    }
    return a.totalGross - b.totalGross;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Leaderboard Header Toolbar */}
      <div className="bg-[#0B3B24] p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
              Live Scoring Service
            </span>
            <h3 className="text-lg font-bold font-serif">{tournamentTitle}</h3>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Gross vs Net Switch */}
          <div className="bg-[#072718] p-1 rounded-xl border border-emerald-900/60 flex items-center">
            <button
              onClick={() => setScoreType('gross')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                scoreType === 'gross'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Gross Score
            </button>
            <button
              onClick={() => setScoreType('net')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                scoreType === 'net'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Net Score (WHS)
            </button>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition flex items-center gap-1.5 text-xs font-medium"
            title="Refresh Leaderboard"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin text-amber-400' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search golfer or club..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-[#0B3B24]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-bold text-slate-600">Flight:</span>
          <select
            value={selectedFlight}
            onChange={(e) => setSelectedFlight(e.target.value)}
            className="text-xs py-1.5 px-3 rounded-lg border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:border-[#0B3B24]"
          >
            <option value="all">All Flights</option>
            <option value="Championship">Championship Flight</option>
            <option value="Flight A">Flight A (0-14)</option>
            <option value="Senior Ladies">Senior Ladies (50+)</option>
          </select>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-100/80 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <th className="py-3.5 px-4 text-center w-16">Pos</th>
              <th className="py-3.5 px-4">Player & Affiliation</th>
              <th className="py-3.5 px-3 text-center">HCP</th>
              <th className="py-3.5 px-3 text-center">R1</th>
              <th className="py-3.5 px-3 text-center">R2</th>
              <th className="py-3.5 px-3 text-center">R3</th>
              <th className="py-3.5 px-3 text-center">Thru</th>
              <th className="py-3.5 px-3 text-center">To Par</th>
              <th className="py-3.5 px-4 text-right font-black text-slate-900">
                {scoreType === 'gross' ? 'Total Gross' : 'Total Net'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedData.map((player, idx) => {
              const pos = idx + 1;
              const isUnderPar = player.toPar.startsWith('-');
              const isEven = player.toPar === 'E';

              return (
                <tr
                  key={player.id || idx}
                  className={`hover:bg-amber-50/40 transition ${
                    pos === 1 ? 'bg-amber-50/20 font-semibold' : ''
                  }`}
                >
                  <td className="py-4 px-4 text-center">
                    {pos === 1 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-sm">
                        1
                      </span>
                    )}
                    {pos === 2 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300 text-slate-800 font-black text-xs shadow-sm">
                        2
                      </span>
                    )}
                    {pos === 3 && (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700/30 text-amber-900 font-black text-xs">
                        3
                      </span>
                    )}
                    {pos > 3 && <span className="font-mono text-slate-500 font-bold">{pos}</span>}
                  </td>

                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      {player.name}
                      {pos === 1 && <Sparkles className="w-3.5 h-3.5 text-amber-500" />}
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <Flag className="w-3 h-3 text-emerald-700" />
                      <span>{player.club}</span>
                    </div>
                  </td>

                  <td className="py-4 px-3 text-center font-mono text-slate-600 font-semibold">
                    {player.handicap}
                  </td>

                  <td className="py-4 px-3 text-center font-mono text-slate-700">{player.r1}</td>
                  <td className="py-4 px-3 text-center font-mono text-slate-700">{player.r2 || '-'}</td>
                  <td className="py-4 px-3 text-center font-mono text-slate-700">{player.r3 || '-'}</td>

                  <td className="py-4 px-3 text-center font-mono font-medium text-slate-500">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold">
                      {player.thru}
                    </span>
                  </td>

                  <td className="py-4 px-3 text-center font-mono font-bold">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] ${
                        isUnderPar
                          ? 'bg-rose-100 text-rose-700'
                          : isEven
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-emerald-50 text-emerald-800'
                      }`}
                    >
                      {player.toPar}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-right font-mono font-black text-sm text-[#0B3B24]">
                    {scoreType === 'gross' ? player.totalGross : player.totalNet || player.totalGross}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-200">
        <span>Official World Handicap System (WHS) slope & rating applied</span>
        <span className="text-emerald-800 font-semibold flex items-center gap-1">
          <Award className="w-3.5 h-3.5" />
          Certified by LGAN Tournament Committee
        </span>
      </div>
    </div>
  );
}
