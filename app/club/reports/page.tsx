'use client';

import React from 'react';
import { Download, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ClubReportsPage() {
  const reports = [
    {
      title: '2026 Ladies Section Roster & Compliance Certificate',
      date: 'Generated 28 Feb 2026',
      size: '2.4 MB PDF',
      status: 'Compliant',
    },
    {
      title: 'Course Slope & Course Rating Calibration Report (WHS)',
      date: 'Generated 10 Jan 2026',
      size: '1.1 MB PDF',
      status: 'Valid through 2028',
    },
    {
      title: 'Annual Dues Remittance Ledger (2025/2026)',
      date: 'Generated 15 Jan 2026',
      size: '850 KB CSV',
      status: 'Reconciled',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Governance &amp; Auditing
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
          Compliance &amp; Association Reports
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Download certified accreditation documents, course slope calibration audits, and financial statements.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        {reports.map((r, i) => (
          <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B3B24] flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-900">{r.title}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{r.date}</span>
                  <span>•</span>
                  <span>{r.size}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-semibold">{r.status}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Downloading ${r.title}...`)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition flex items-center gap-1.5 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
