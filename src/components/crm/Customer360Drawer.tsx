import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Phone,
  Mail,
  FileText,
  Calendar,
  Clock,
  Paperclip,
  Plus,
  Send,
  TrendingUp,
} from 'lucide-react';
import type { Customer360Profile, TimelineItem } from '../../data/customer360Data';

interface Customer360DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Customer360Profile | null;
}

type ActivityTab = 'note' | 'call' | 'email' | 'task';
type FilterType = 'all' | 'call' | 'note' | 'email' | 'meeting';

export default function Customer360Drawer({
  isOpen,
  onClose,
  profile,
}: Customer360DrawerProps) {
  if (!profile) return null;

  // Local state for interactive activity logging
  const [timeline, setTimeline] = useState<TimelineItem[]>(profile.timeline);
  const [activeTab, setActiveTab] = useState<ActivityTab>('note');
  const [filterType, setFilterType] = useState<FilterType>('all');

  // Input states
  const [noteContent, setNoteContent] = useState('');
  const [callDuration, setCallDuration] = useState('15 mins');
  const [callOutcome, setCallOutcome] = useState('Connected (Interested)');
  const [callNotes, setCallNotes] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Handle adding a note
  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    const newItem: TimelineItem = {
      id: `note-${Date.now()}`,
      type: 'note',
      title: 'Meeting / Call Note',
      description: noteContent,
      author: profile.owner || 'Albert Mckenzie',
      timestamp: 'Just now',
      tag: 'Note',
    };

    setTimeline([newItem, ...timeline]);
    setNoteContent('');
  };

  // Handle logging a call
  const handleLogCall = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: TimelineItem = {
      id: `call-${Date.now()}`,
      type: 'call',
      title: `Outbound Call · ${callOutcome}`,
      description: callNotes || 'Detailed conversation notes recorded during active sales cadence.',
      author: profile.owner || 'Albert Mckenzie',
      timestamp: 'Just now',
      outcome: callOutcome,
      duration: callDuration,
      tag: 'Sales Call',
    };

    setTimeline([newItem, ...timeline]);
    setCallNotes('');
  };

  // Handle logging an email
  const handleLogEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSubject.trim()) return;

    const newItem: TimelineItem = {
      id: `email-${Date.now()}`,
      type: 'email',
      title: `Sent: ${emailSubject}`,
      description: emailBody || 'Follow-up email dispatched to primary stakeholder.',
      author: profile.owner || 'Albert Mckenzie',
      timestamp: 'Just now',
      tag: 'Email Dispatched',
    };

    setTimeline([newItem, ...timeline]);
    setEmailSubject('');
    setEmailBody('');
  };

  // Filtered timeline
  const filteredTimeline = useMemo(() => {
    if (filterType === 'all') return timeline;
    return timeline.filter((item) => item.type === filterType);
  }, [timeline, filterType]);

  // Icon for timeline types
  const getTimelineIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'call':
        return <Phone size={14} className="text-blue-600" />;
      case 'email':
        return <Mail size={14} className="text-amber-600" />;
      case 'note':
        return <FileText size={14} className="text-neutral-700" />;
      case 'meeting':
        return <Calendar size={14} className="text-emerald-600" />;
      case 'stage_change':
        return <TrendingUp size={14} className="text-purple-600" />;
      default:
        return <Clock size={14} className="text-neutral-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end select-none">
          {/* Dark Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Slide-over Drawer Canvas */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            className="relative w-full max-w-[880px] bg-[#fbfaf8] h-full shadow-2xl border-l border-neutral-200 flex flex-col z-10 overflow-hidden"
          >
            {/* Top Identity Header */}
            <div className="p-6 bg-white border-b border-neutral-200/80 shrink-0">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Initials / Avatar Circle */}
                  <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                    {profile.name.charAt(0)}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-800 uppercase tracking-wider">
                        {profile.type === 'deal' ? 'Deal 360' : 'Customer 360'}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {profile.status}
                      </span>
                      {profile.tier && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          {profile.tier}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl font-bold text-neutral-900 mt-1">
                      {profile.name}
                    </h2>
                    <p className="text-xs text-neutral-500 font-medium">
                      {profile.role ? `${profile.role} · ` : ''}
                      <span className="font-semibold text-neutral-800">
                        {profile.company}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close drawer"
                  className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-800 transition"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Quick Action Pill Bar */}
              <div className="flex items-center gap-2 mt-5 pt-4 border-t border-neutral-100 flex-wrap">
                <button
                  type="button"
                  onClick={() => setActiveTab('call')}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center gap-1.5 transition"
                >
                  <Phone size={13} className="text-neutral-600" />
                  <span>Log Call</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('email')}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center gap-1.5 transition"
                >
                  <Mail size={13} className="text-neutral-600" />
                  <span>Send Email</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('note')}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center gap-1.5 transition"
                >
                  <FileText size={13} className="text-neutral-600" />
                  <span>Add Note</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('task')}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center gap-1.5 transition"
                >
                  <Calendar size={13} className="text-neutral-600" />
                  <span>Schedule</span>
                </button>
              </div>
            </div>

            {/* Split Body: Left Timeline (60%) & Right Metadata (40%) */}
            <div className="flex-1 overflow-y-auto flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-neutral-200/80">
              {/* ================= LEFT COLUMN: ACTIVITY & TIMELINE ================= */}
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {/* Interactive Quick Logger Box */}
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-200/80">
                  {/* Logger Tabs */}
                  <div className="flex items-center gap-1 pb-3 border-b border-neutral-100 text-xs font-medium text-neutral-500">
                    {(['note', 'call', 'email', 'task'] as const).map((tab) => (
                      <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-1 rounded-full capitalize transition ${
                          activeTab === tab
                            ? 'bg-neutral-900 text-white font-semibold shadow-sm'
                            : 'hover:text-neutral-900 hover:bg-neutral-100'
                        }`}
                      >
                        {tab === 'note'
                          ? 'Add Note'
                          : tab === 'call'
                          ? 'Log Call'
                          : tab === 'email'
                          ? 'Email'
                          : 'Task'}
                      </button>
                    ))}
                  </div>

                  {/* Form according to active tab */}
                  {activeTab === 'note' && (
                    <form onSubmit={handleAddNote} className="mt-3 space-y-3">
                      <textarea
                        rows={3}
                        required
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        placeholder={`Write an internal note or meeting summary regarding ${profile.name}...`}
                        className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-none bg-neutral-50/50"
                      />
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-neutral-400">
                          Visible to team · Auto-saved to audit log
                        </span>
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <Plus size={13} />
                          <span>Save Note</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {activeTab === 'call' && (
                    <form onSubmit={handleLogCall} className="mt-3 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                            Call Outcome
                          </label>
                          <select
                            value={callOutcome}
                            onChange={(e) => setCallOutcome(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl border border-neutral-200 bg-neutral-50/50"
                          >
                            <option value="Connected (Interested)">Connected (Interested)</option>
                            <option value="Left Voicemail">Left Voicemail</option>
                            <option value="Gatekeeper / Busy">Gatekeeper / Busy</option>
                            <option value="Follow-up Scheduled">Follow-up Scheduled</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={callDuration}
                            onChange={(e) => setCallDuration(e.target.value)}
                            className="w-full text-xs p-2 rounded-xl border border-neutral-200 bg-neutral-50/50"
                          />
                        </div>
                      </div>
                      <textarea
                        rows={2}
                        value={callNotes}
                        onChange={(e) => setCallNotes(e.target.value)}
                        placeholder="Key conversation takeaways and action items..."
                        className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-none bg-neutral-50/50"
                      />
                      <div className="flex justify-end pt-1">
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <Phone size={13} />
                          <span>Log Call Activity</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {activeTab === 'email' && (
                    <form onSubmit={handleLogEmail} className="mt-3 space-y-3">
                      <input
                        type="text"
                        required
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="Subject: e.g. Follow-up on contract terms"
                        className="w-full text-xs p-2 rounded-xl border border-neutral-200 bg-neutral-50/50"
                      />
                      <textarea
                        rows={3}
                        value={emailBody}
                        onChange={(e) => setEmailBody(e.target.value)}
                        placeholder="Message draft or summary of correspondence..."
                        className="w-full text-xs p-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-none bg-neutral-50/50"
                      />
                      <div className="flex justify-end pt-1">
                        <button
                          type="submit"
                          className="px-4 py-1.5 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <Send size={13} />
                          <span>Log Sent Email</span>
                        </button>
                      </div>
                    </form>
                  )}

                  {activeTab === 'task' && (
                    <div className="mt-3 space-y-3">
                      <input
                        type="text"
                        placeholder="Task title: e.g. Send updated pricing proposal"
                        className="w-full text-xs p-2 rounded-xl border border-neutral-200 bg-neutral-50/50"
                      />
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <input
                          type="date"
                          defaultValue="2026-11-28"
                          className="p-2 rounded-xl border border-neutral-200 bg-neutral-50/50"
                        />
                        <button
                          type="button"
                          onClick={() => setActiveTab('note')}
                          className="py-2 rounded-xl bg-neutral-950 text-white font-semibold"
                        >
                          Schedule Task
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Timeline Stream Header & Filter */}
                <div>
                  <div className="flex items-center justify-between pb-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Activity History ({timeline.length})
                    </h3>

                    <div className="flex items-center gap-1 text-[11px]">
                      {(['all', 'call', 'note', 'email'] as const).map((ft) => (
                        <button
                          key={ft}
                          type="button"
                          onClick={() => setFilterType(ft)}
                          className={`px-2.5 py-0.5 rounded-full capitalize transition ${
                            filterType === ft
                              ? 'bg-neutral-200 text-neutral-900 font-bold'
                              : 'text-neutral-500 hover:text-neutral-800'
                          }`}
                        >
                          {ft}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Chronological Stream */}
                  <div className="space-y-3 mt-2">
                    {filteredTimeline.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 flex items-start gap-3.5 hover:shadow-md transition"
                      >
                        <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 mt-0.5">
                          {getTimelineIcon(item.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <h4 className="text-xs font-bold text-neutral-900">
                              {item.title}
                            </h4>
                            <span className="text-[10px] text-neutral-400 font-medium">
                              {item.timestamp}
                            </span>
                          </div>

                          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                            {item.description}
                          </p>

                          <div className="mt-2.5 flex items-center gap-2 text-[10px] flex-wrap">
                            <span className="font-semibold text-neutral-500">
                              Logged by {item.author}
                            </span>
                            {item.outcome && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
                                {item.outcome}
                              </span>
                            )}
                            {item.duration && (
                              <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-medium">
                                {item.duration}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ================= RIGHT COLUMN: METADATA & ASSOCIATIONS ================= */}
              <div className="w-full md:w-[320px] p-6 space-y-6 bg-white/70 overflow-y-auto shrink-0">
                {/* About & Contact Info */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Contact Information
                  </h3>
                  <div className="space-y-2 text-xs">
                    {profile.email && (
                      <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                        <span className="text-neutral-400">Email</span>
                        <a
                          href={`mailto:${profile.email}`}
                          className="font-semibold text-neutral-900 hover:underline truncate max-w-[170px]"
                        >
                          {profile.email}
                        </a>
                      </div>
                    )}
                    {profile.phone && (
                      <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                        <span className="text-neutral-400">Phone</span>
                        <span className="font-semibold text-neutral-900">
                          {profile.phone}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                      <span className="text-neutral-400">Company</span>
                      <span className="font-semibold text-neutral-900">
                        {profile.company}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                      <span className="text-neutral-400">Account Owner</span>
                      <span className="font-semibold text-neutral-900">
                        {profile.owner}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Financial Summary */}
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Account Value
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-bold text-neutral-900">
                      {profile.dealValue || profile.mrr || '$3,200/mo'}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      LTV: {profile.lifetimeValue || '$48,000'}
                    </span>
                  </div>
                  {profile.renewalDate && (
                    <div className="text-[10px] text-neutral-400 mt-1">
                      Next renewal: <strong>{profile.renewalDate}</strong>
                    </div>
                  )}
                </div>

                {/* Associated Deals */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Associated Deals ({profile.deals.length})
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {profile.deals.map((deal) => (
                      <div
                        key={deal.id}
                        className="p-3 rounded-xl bg-white border border-neutral-200/80 shadow-sm"
                      >
                        <div className="flex items-start justify-between">
                          <h4 className="text-xs font-semibold text-neutral-900 leading-snug">
                            {deal.title}
                          </h4>
                          <span className="text-xs font-bold text-neutral-900 ml-2">
                            {deal.value}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[11px]">
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-semibold border border-amber-200">
                            {deal.stage}
                          </span>
                          <span className="text-neutral-400">
                            Closes {deal.closeDate}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Stakeholders / Contacts */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Key Stakeholders ({profile.contacts.length})
                  </h3>
                  <div className="space-y-2">
                    {profile.contacts.map((contact, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-xl bg-white border border-neutral-100 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-semibold text-neutral-900">
                            {contact.name}
                          </div>
                          <div className="text-[11px] text-neutral-400">
                            {contact.role}
                          </div>
                        </div>
                        <a
                          href={`mailto:${contact.email}`}
                          className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500"
                          title="Email contact"
                        >
                          <Mail size={13} />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attached Documents */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Documents & Files ({profile.files.length})
                  </h3>
                  <div className="space-y-2">
                    {profile.files.map((file, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white border border-neutral-100 flex items-center justify-between text-xs hover:bg-neutral-50 transition cursor-pointer"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <Paperclip size={13} className="text-neutral-400 shrink-0" />
                          <span className="truncate font-medium text-neutral-800">
                            {file.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-neutral-400 ml-2 shrink-0">
                          {file.size}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}