'use client';

import React, { useState } from 'react';
import { DataService } from '@/lib/storage';
import { useApp } from '@/lib/store';
import { Bell, Plus, Send, CheckCircle2, Megaphone } from 'lucide-react';

export default function AdminContentAnnouncementsPage() {
  const { showToast } = useApp();
  const [announcements, setAnnouncements] = useState(DataService.getAnnouncements());
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [priority, setPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('HIGH');

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const item = {
      id: `ann_${Date.now()}`,
      title: newTitle,
      content: newContent,
      priority,
      publishedAt: new Date().toISOString(),
    };

    DataService.addAnnouncement(item);
    setAnnouncements([item, ...announcements]);
    setNewTitle('');
    setNewContent('');
    showToast('National announcement broadcasted to all user portals!', 'success');
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Communications Dispatch
        </span>
        <h1 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 mt-1">
          National Announcements &amp; Notices
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Broadcast official executive communications directly to Member, Club, and Vendor dashboards.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Create Broadcast */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold font-serif text-slate-900">Broadcast New Notice</h3>
            <p className="text-xs text-slate-500">Instant notification to all registered portals</p>
          </div>

          <form onSubmit={handleBroadcast} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Notice Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. AACT 2026 Continental Squad Trials Announcement"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700"
              >
                <option value="HIGH">High (Urgent Executive Bulletin)</option>
                <option value="MEDIUM">Medium (General Association News)</option>
                <option value="LOW">Low (Informational)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Notice Content *</label>
              <textarea
                rows={4}
                required
                placeholder="Detailed communiqué text..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0B3B24]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#0B3B24] hover:bg-[#072718] text-white font-bold uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2"
            >
              <Megaphone className="w-4 h-4 text-amber-400" />
              <span>Broadcast Notice Nationwide</span>
            </button>
          </form>
        </div>

        {/* Existing Announcements */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h3 className="text-base font-bold font-serif text-slate-900 border-b border-slate-100 pb-3">
            Active Broadcasts Log
          </h3>

          <div className="space-y-3">
            {announcements.map((a) => (
              <div key={a.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">{a.title}</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold font-mono">
                    {a.priority}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{a.content}</p>
                <span className="text-[10px] text-slate-400 block pt-1 font-mono">
                  Dispatched: {new Date(a.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
