import { useState, useMemo } from 'react';
import {
  Clock,
  Phone,
  Mail,
  CheckSquare,
  Calendar,
  FileText,
  Search,
  Send,
  Building2,
  User,
  TrendingUp,
  ExternalLink,
} from 'lucide-react';
import { initialActivities, type CRMActivity } from '../data/crmData';
import Customer360Drawer from '../components/crm/Customer360Drawer';
import { getOrCreateProfile, type Customer360Profile } from '../data/customer360Data';

type ActivityFilter = 'all' | 'call' | 'email' | 'task' | 'meeting' | 'note';

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<CRMActivity[]>(initialActivities);
  const [filterType, setFilterType] = useState<ActivityFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Quick Activity Logger Tab & Inputs
  const [loggerTab, setLoggerTab] = useState<'call' | 'email' | 'task' | 'meeting' | 'note'>('call');
  const [loggerSubject, setLoggerSubject] = useState('');
  const [loggerDesc, setLoggerDesc] = useState('');
  const [loggerContact, setLoggerContact] = useState('Sofia Marin');
  const [loggerAccount, setLoggerAccount] = useState('Ledgerly Technologies');
  const [loggerDeal, setLoggerDeal] = useState('Global Multi-Seat Enterprise Rollout');
  const [loggerOutcome, setLoggerOutcome] = useState('Connected (Positive)');
  const [loggerDuration, setLoggerDuration] = useState('20 mins');

  // Customer 360 State
  const [selected360Profile, setSelected360Profile] = useState<Customer360Profile | null>(null);
  const [is360DrawerOpen, setIs360DrawerOpen] = useState(false);

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      if (filterType !== 'all' && act.type !== filterType) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchSubj = act.subject.toLowerCase().includes(q);
        const matchDesc = act.description.toLowerCase().includes(q);
        const matchContact = (act.linkedContactName || '').toLowerCase().includes(q);
        const matchDeal = (act.linkedDealTitle || '').toLowerCase().includes(q);
        const matchAcc = (act.linkedAccountName || '').toLowerCase().includes(q);
        if (!matchSubj && !matchDesc && !matchContact && !matchDeal && !matchAcc) return false;
      }
      return true;
    });
  }, [activities, filterType, searchQuery]);

  const handleOpen360FromEntity = (name: string, company: string, type: 'contact' | 'deal') => {
    const profile = getOrCreateProfile(name.toLowerCase().replace(/\s+/g, '-'), name, company, type);
    setSelected360Profile(profile);
    setIs360DrawerOpen(true);
  };

  const handleLogActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loggerSubject.trim()) return;

    const newAct: CRMActivity = {
      id: `act-${Date.now()}`,
      type: loggerTab,
      subject: loggerSubject.trim(),
      description: loggerDesc.trim() || 'Logged via Activities & Timeline module.',
      timestamp: 'Just now',
      author: 'Albert Mckenzie',
      linkedContactName: loggerContact,
      linkedAccountName: loggerAccount,
      linkedDealTitle: loggerDeal,
      outcome: loggerTab === 'call' ? loggerOutcome : undefined,
      duration: loggerTab === 'call' || loggerTab === 'meeting' ? loggerDuration : undefined,
      status: loggerTab === 'task' ? 'Pending' : 'Completed',
    };

    setActivities([newAct, ...activities]);
    setLoggerSubject('');
    setLoggerDesc('');
  };

  const totalCount = activities.length;
  const callsCount = activities.filter((a) => a.type === 'call').length;
  const emailsCount = activities.filter((a) => a.type === 'email').length;
  const tasksCount = activities.filter((a) => a.type === 'task').length;
  const meetingsCount = activities.filter((a) => a.type === 'meeting').length;

  const getActivityIcon = (type: CRMActivity['type']) => {
    switch (type) {
      case 'call':
        return <Phone size={14} className="text-blue-600" />;
      case 'email':
        return <Mail size={14} className="text-purple-600" />;
      case 'task':
        return <CheckSquare size={14} className="text-amber-600" />;
      case 'meeting':
        return <Calendar size={14} className="text-emerald-600" />;
      case 'note':
        return <FileText size={14} className="text-neutral-600" />;
    }
  };

  const getActivityBadgeBg = (type: CRMActivity['type']) => {
    switch (type) {
      case 'call':
        return 'bg-blue-50 border-blue-100 text-blue-700';
      case 'email':
        return 'bg-purple-50 border-purple-100 text-purple-700';
      case 'task':
        return 'bg-amber-50 border-amber-100 text-amber-700';
      case 'meeting':
        return 'bg-emerald-50 border-emerald-100 text-emerald-700';
      case 'note':
        return 'bg-neutral-100 border-neutral-200 text-neutral-700';
    }
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/60 shadow-sm flex items-center justify-center text-neutral-900">
            <Clock size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Activities & Timeline
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-white border border-neutral-200/60 text-neutral-700 shadow-sm">
                {totalCount} Total
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Chronological log of tasks, calls, emails, and meeting notes linked to contacts and deals.
            </p>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Total Activities Logged</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">{totalCount}</div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+14 today</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Continuous touchpoint tracking</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Client Calls Conducted</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">{callsCount}</div>
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">85% connected</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Avg duration: 22 mins</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Pending Deliverable Tasks</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">{tasksCount}</div>
            <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">1 due today</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Follow-up quotes & proposals</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Meetings & Presentations</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">{meetingsCount}</div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">SOC2 signoff</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Enterprise demos completed</div>
        </div>
      </div>

      {/* Quick Activity Logger Box */}
      <div className="bg-white rounded-[28px] p-5 border border-neutral-100 shadow-sm">
        <div className="flex items-center justify-between pb-3.5 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-900">Fast Activity Logger</span>
            <span className="text-[11px] text-neutral-400">· Log interactions directly to CRM</span>
          </div>

          {/* Activity Type Picker */}
          <div className="flex items-center gap-1 bg-[#f5f3ef] p-1 rounded-2xl border border-neutral-200/60">
            {[
              { id: 'call', label: 'Call', icon: Phone },
              { id: 'email', label: 'Email', icon: Mail },
              { id: 'task', label: 'Task', icon: CheckSquare },
              { id: 'meeting', label: 'Meeting', icon: Calendar },
              { id: 'note', label: 'Note', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = loggerTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setLoggerTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-medium transition ${
                    isSelected
                      ? 'bg-neutral-950 text-white shadow-xs font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  <Icon size={12} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleLogActivity} className="mt-4 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <input
                type="text"
                required
                placeholder={
                  loggerTab === 'call'
                    ? 'Call subject (e.g. Discovery call on security compliance)'
                    : loggerTab === 'email'
                    ? 'Email subject (e.g. Sent MSA revised redline)'
                    : loggerTab === 'task'
                    ? 'Task title (e.g. Prepare executive slide deck)'
                    : 'Meeting title or internal note...'
                }
                value={loggerSubject}
                onChange={(e) => setLoggerSubject(e.target.value)}
                className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Linked Contact (e.g. Sofia Marin)"
                value={loggerContact}
                onChange={(e) => setLoggerContact(e.target.value)}
                className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <input
                type="text"
                placeholder="Linked Account (e.g. Ledgerly)"
                value={loggerAccount}
                onChange={(e) => setLoggerAccount(e.target.value)}
                className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Linked Deal (e.g. Multi-Seat Expansion)"
                value={loggerDeal}
                onChange={(e) => setLoggerDeal(e.target.value)}
                className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
              />
            </div>
            {loggerTab === 'call' ? (
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={loggerOutcome}
                  onChange={(e) => setLoggerOutcome(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-2.5 py-2 text-xs text-neutral-800 focus:outline-none focus:bg-white"
                >
                  <option value="Connected (Positive)">Connected</option>
                  <option value="Left Voicemail">Voicemail</option>
                  <option value="Demo Scheduled">Demo</option>
                  <option value="Follow-up Requested">Follow-up</option>
                </select>
                <input
                  type="text"
                  placeholder="20 mins"
                  value={loggerDuration}
                  onChange={(e) => setLoggerDuration(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-2.5 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
                />
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  placeholder="Notes or outcome snippet..."
                  value={loggerDesc}
                  onChange={(e) => setLoggerDesc(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] text-neutral-400">
              Logged as <strong>Albert Mckenzie</strong> (Ops Manager)
            </span>
            <button
              type="submit"
              className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
            >
              <Send size={12} />
              <span>Log Activity</span>
            </button>
          </div>
        </form>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
        {/* Type Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-sm overflow-x-auto shrink-0">
          {[
            { id: 'all', label: `All (${totalCount})` },
            { id: 'call', label: `Calls (${callsCount})` },
            { id: 'email', label: `Emails (${emailsCount})` },
            { id: 'task', label: `Tasks (${tasksCount})` },
            { id: 'meeting', label: `Meetings (${meetingsCount})` },
            { id: 'note', label: `Notes (1)` },
          ].map((tab) => {
            const isSelected = filterType === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterType(tab.id as ActivityFilter)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-neutral-950 text-white shadow-sm font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search - Full width flex-1 to fill remaining space */}
        <div className="relative flex-1 min-w-[280px]">
          <Search size={14} className="absolute left-3.5 top-3 text-neutral-400" />
          <input
            type="text"
            placeholder="Search activities, contacts, or deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 shadow-sm"
          />
        </div>
      </div>

      {/* Activity Timeline Stream */}
      <div className="space-y-3">
        {filteredActivities.length === 0 ? (
          <div className="bg-white rounded-[26px] p-12 text-center text-neutral-400 text-xs border border-neutral-100">
            No activities found matching criteria.
          </div>
        ) : (
          filteredActivities.map((act) => (
            <div
              key={act.id}
              className="bg-white rounded-[26px] p-5 border border-neutral-100 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-start justify-between gap-4 group"
            >
              <div className="flex items-start gap-3.5">
                {/* Type Icon Badge */}
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border ${getActivityBadgeBg(
                    act.type
                  )}`}
                >
                  {getActivityIcon(act.type)}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-bold text-sm text-neutral-900">{act.subject}</h3>
                    {act.outcome && (
                      <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                        {act.outcome}
                      </span>
                    )}
                    {act.duration && (
                      <span className="text-[10px] text-neutral-400 flex items-center gap-1">
                        <Clock size={10} />
                        <span>{act.duration}</span>
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-neutral-600 mt-1.5 leading-relaxed max-w-2xl">
                    {act.description}
                  </p>

                  {/* Linked Context Tags */}
                  <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-neutral-100 text-[11px]">
                    {act.linkedContactName && (
                      <button
                        type="button"
                        onClick={() =>
                          handleOpen360FromEntity(
                            act.linkedContactName!,
                            act.linkedAccountName || 'Enterprise Account',
                            'contact'
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f5f3ef] hover:bg-neutral-200 text-neutral-700 transition"
                      >
                        <User size={11} className="text-neutral-500" />
                        <span className="font-medium">{act.linkedContactName}</span>
                      </button>
                    )}

                    {act.linkedAccountName && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f5f3ef] text-neutral-600">
                        <Building2 size={11} className="text-neutral-500" />
                        <span>{act.linkedAccountName}</span>
                      </span>
                    )}

                    {act.linkedDealTitle && (
                      <button
                        type="button"
                        onClick={() =>
                          handleOpen360FromEntity(
                            act.linkedDealTitle!,
                            act.linkedAccountName || 'Enterprise Account',
                            'deal'
                          )
                        }
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                      >
                        <TrendingUp size={11} className="text-blue-500" />
                        <span className="font-semibold">{act.linkedDealTitle}</span>
                        <ExternalLink size={9} />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Timestamp & Author Meta */}
              <div className="flex md:flex-col items-center md:items-end justify-between shrink-0 text-right text-[11px] text-neutral-400">
                <span className="font-medium text-neutral-700">{act.timestamp}</span>
                <span className="mt-1">Logged by {act.author}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Customer 360 Drawer */}
      <Customer360Drawer
        isOpen={is360DrawerOpen}
        onClose={() => setIs360DrawerOpen(false)}
        profile={selected360Profile}
      />
    </div>
  );
}
