import { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  TrendingUp,
  Calendar,
  Building2,
  Table2,
  LayoutGrid,
  Clock,
} from 'lucide-react';
import { initialDeals, type DealOpportunity } from '../data/crmData';
import Customer360Drawer from '../components/crm/Customer360Drawer';
import { getOrCreateProfile, type Customer360Profile } from '../data/customer360Data';

type StageFilter = 'all' | DealOpportunity['stage'];
type ViewMode = 'kanban' | 'table';

const stages: DealOpportunity['stage'][] = [
  'Lead In',
  'Discovery',
  'Proposal',
  'Negotiation',
  'Won',
  'Lost',
];

export default function DealsPage() {
  const [deals, setDeals] = useState<DealOpportunity[]>(initialDeals);
  const [stageFilter, setStageFilter] = useState<StageFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Customer 360 State
  const [selected360Profile, setSelected360Profile] = useState<Customer360Profile | null>(null);
  const [is360DrawerOpen, setIs360DrawerOpen] = useState(false);

  // New Deal form inputs
  const [newTitle, setNewTitle] = useState('');
  const [newAccount, setNewAccount] = useState('Apex Media Corp');
  const [newContact, setNewContact] = useState('Rachel Ross');
  const [newValue, setNewValue] = useState(45000);
  const [newStage, setNewStage] = useState<DealOpportunity['stage']>('Discovery');
  const [newDate, setNewDate] = useState('Jun 30, 2026');
  const [newProbability, setNewProbability] = useState(50);

  const filteredDeals = useMemo(() => {
    return deals.filter((deal) => {
      if (stageFilter !== 'all' && deal.stage !== stageFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = deal.title.toLowerCase().includes(q);
        const matchAccount = deal.accountName.toLowerCase().includes(q);
        const matchContact = deal.primaryContactName.toLowerCase().includes(q);
        if (!matchTitle && !matchAccount && !matchContact) return false;
      }
      return true;
    });
  }, [deals, stageFilter, searchQuery]);

  const handleOpen360 = (deal: DealOpportunity) => {
    const profile = getOrCreateProfile(deal.id, deal.title, deal.accountName, 'deal', {
      dealValue: `$${deal.value.toLocaleString()}`,
      stage: deal.stage,
      status: `${deal.stage} (${deal.winProbability}% win prob)`,
      owner: deal.owner,
      health: deal.health === 'Delayed' ? 'Off Track' : 'On Track',
      renewalDate: deal.expectedCloseDate,
    });
    setSelected360Profile(profile);
    setIs360DrawerOpen(true);
  };

  const handleStageChange = (dealId: string, newStage: DealOpportunity['stage'], e: React.MouseEvent) => {
    e.stopPropagation();
    setDeals((prev) =>
      prev.map((d) => {
        if (d.id !== dealId) return d;
        let defaultProb = d.winProbability;
        if (newStage === 'Lead In') defaultProb = 20;
        if (newStage === 'Discovery') defaultProb = 40;
        if (newStage === 'Proposal') defaultProb = 65;
        if (newStage === 'Negotiation') defaultProb = 85;
        if (newStage === 'Won') defaultProb = 100;
        if (newStage === 'Lost') defaultProb = 0;
        return { ...d, stage: newStage, winProbability: defaultProb };
      })
    );
  };

  const handleCreateDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: DealOpportunity = {
      id: `deal-${Date.now()}`,
      title: newTitle.trim(),
      accountId: 'acc-4',
      accountName: newAccount,
      primaryContactId: 'contact-5',
      primaryContactName: newContact,
      value: Number(newValue) || 30000,
      stage: newStage,
      expectedCloseDate: newDate,
      winProbability: Number(newProbability) || 50,
      owner: 'Albert Mckenzie',
      priority: 'High',
      health: 'On Track',
      type: 'New Business',
    };

    setDeals([created, ...deals]);
    setNewTitle('');
    setIsAddModalOpen(false);
  };

  // Metrics calculations
  const totalPipelineValue = deals
    .filter((d) => d.stage !== 'Lost')
    .reduce((sum, d) => sum + d.value, 0);

  const weightedForecast = deals
    .filter((d) => d.stage !== 'Lost')
    .reduce((sum, d) => sum + d.value * (d.winProbability / 100), 0);

  const wonDealsValue = deals
    .filter((d) => d.stage === 'Won')
    .reduce((sum, d) => sum + d.value, 0);

  const activeDealsCount = deals.filter((d) => d.stage !== 'Lost' && d.stage !== 'Won').length;

  const getStageBadgeColor = (stage: DealOpportunity['stage']) => {
    switch (stage) {
      case 'Lead In':
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
      case 'Discovery':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'Proposal':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'Negotiation':
        return 'bg-purple-50 text-purple-700 border-purple-200/60';
      case 'Won':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80 font-bold';
      case 'Lost':
        return 'bg-rose-50 text-rose-600 border-rose-200/60';
    }
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/60 shadow-sm flex items-center justify-center text-neutral-900">
            <TrendingUp size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Deals & Opportunities
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-white border border-neutral-200/60 text-neutral-700 shadow-sm">
                ${(totalPipelineValue / 1000).toFixed(1)}k Pipeline
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Track deal values, pipeline stages, expected close dates, and win probabilities.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex items-center bg-white/70 p-1 rounded-2xl border border-neutral-200/60 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'kanban' ? 'bg-neutral-950 text-white shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid size={15} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'table' ? 'bg-neutral-950 text-white shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Table View"
            >
              <Table2 size={15} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus size={14} />
            <span>New Opportunity</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Total Pipeline Value</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">
              ${totalPipelineValue.toLocaleString()}
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {activeDealsCount} in flight
            </span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Sum of all open opportunities</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Weighted Sales Forecast</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">
              ${Math.round(weightedForecast).toLocaleString()}
            </div>
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Probability-adjusted
            </span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Expected revenue realization</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Closed-Won Revenue</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">
              ${wonDealsValue.toLocaleString()}
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              100% Locked
            </span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">2 signed contracts this quarter</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Average Win Probability</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">
              {Math.round(
                deals.reduce((acc, d) => acc + d.winProbability, 0) / deals.length
              )}%
            </div>
            <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
              High Confidence
            </span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Stage progression velocity: +12%</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
        {/* Stage Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-sm overflow-x-auto shrink-0">
          <button
            type="button"
            onClick={() => setStageFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
              stageFilter === 'all'
                ? 'bg-neutral-950 text-white shadow-sm font-semibold'
                : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
            }`}
          >
            All Stages ({deals.length})
          </button>
          {stages.map((stage) => {
            const count = deals.filter((d) => d.stage === stage).length;
            const isSelected = stageFilter === stage;
            return (
              <button
                key={stage}
                type="button"
                onClick={() => setStageFilter(stage)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-neutral-950 text-white shadow-sm font-semibold'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/60'
                }`}
              >
                {stage} ({count})
              </button>
            );
          })}
        </div>

        {/* Search - Full width flex-1 to fill remaining space */}
        <div className="relative flex-1 min-w-[280px]">
          <Search size={14} className="absolute left-3.5 top-3 text-neutral-400" />
          <input
            type="text"
            placeholder="Search deals by title, account, or contact..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 shadow-sm"
          />
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 items-start">
          {stages.map((stage) => {
            const stageDeals = filteredDeals.filter((d) => d.stage === stage);
            const stageValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

            return (
              <div
                key={stage}
                className="bg-[#f5f3ef]/80 rounded-[26px] p-3 border border-neutral-200/60 min-h-[420px] flex flex-col justify-between"
              >
                <div>
                  {/* Column Header */}
                  <div className="flex items-center justify-between px-1.5 py-1 mb-2.5">
                    <div>
                      <h3 className="font-bold text-xs text-neutral-900">{stage}</h3>
                      <div className="text-[10px] text-neutral-400 font-medium">
                        ${(stageValue / 1000).toFixed(1)}k · {stageDeals.length}
                      </div>
                    </div>
                    <span className="w-5 h-5 rounded-full bg-white text-neutral-700 text-[10px] font-bold flex items-center justify-center border border-neutral-200/60 shadow-2xs">
                      {stageDeals.length}
                    </span>
                  </div>

                  {/* Deals Cards in Column */}
                  <div className="space-y-2.5">
                    {stageDeals.length === 0 ? (
                      <div className="p-4 text-center text-neutral-400 text-[11px] rounded-2xl border border-dashed border-neutral-200/60">
                        No deals
                      </div>
                    ) : (
                      stageDeals.map((deal) => (
                        <div
                          key={deal.id}
                          onClick={() => handleOpen360(deal)}
                          className="bg-white rounded-2xl p-3.5 border border-neutral-100 shadow-sm hover:shadow-md transition cursor-pointer group"
                        >
                          <div className="flex items-start justify-between gap-1.5">
                            <span className="font-semibold text-xs text-neutral-900 group-hover:text-black leading-snug">
                              {deal.title}
                            </span>
                          </div>

                          <div className="text-[11px] text-neutral-500 font-medium mt-1 flex items-center gap-1">
                            <Building2 size={11} className="text-neutral-400 shrink-0" />
                            <span className="truncate">{deal.accountName}</span>
                          </div>

                          {/* Value & Probability Bar */}
                          <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-baseline justify-between">
                            <div className="font-bold text-xs text-neutral-900">
                              ${deal.value.toLocaleString()}
                            </div>
                            <span className="text-[10px] font-semibold text-neutral-600 bg-[#f5f3ef] px-2 py-0.5 rounded-full">
                              {deal.winProbability}% win
                            </span>
                          </div>

                          {/* Win Probability progress indicator */}
                          <div className="w-full bg-neutral-100 h-1.5 rounded-full mt-2 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                deal.winProbability >= 80
                                  ? 'bg-emerald-500'
                                  : deal.winProbability >= 50
                                  ? 'bg-amber-500'
                                  : 'bg-blue-500'
                              }`}
                              style={{ width: `${deal.winProbability}%` }}
                            />
                          </div>

                          {/* Close Date & Action */}
                          <div className="mt-2.5 flex items-center justify-between text-[10px] text-neutral-400">
                            <span className="flex items-center gap-1">
                              <Calendar size={10} />
                              <span>{deal.expectedCloseDate}</span>
                            </span>
                            <span className="font-semibold text-neutral-800 group-hover:text-black">
                              360 ›
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Column quick add */}
                <button
                  type="button"
                  onClick={() => {
                    setNewStage(stage);
                    setIsAddModalOpen(true);
                  }}
                  className="mt-3 w-full py-1.5 rounded-xl border border-dashed border-neutral-300 text-neutral-500 text-[11px] font-medium hover:bg-white hover:text-neutral-900 transition flex items-center justify-center gap-1"
                >
                  <Plus size={11} />
                  <span>Add Deal</span>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-[28px] border border-neutral-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-100 bg-[#faf9f6]/70 text-neutral-400 font-medium">
                  <th className="py-3.5 pl-6 pr-4">Opportunity</th>
                  <th className="py-3.5 px-4">Account & Contact</th>
                  <th className="py-3.5 px-4">Deal Value</th>
                  <th className="py-3.5 px-4">Pipeline Stage</th>
                  <th className="py-3.5 px-4">Win Prob / Forecast</th>
                  <th className="py-3.5 px-4">Close Date</th>
                  <th className="py-3.5 px-4">Owner</th>
                  <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 text-neutral-700">
                {filteredDeals.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-neutral-400 text-xs">
                      No deals found.
                    </td>
                  </tr>
                ) : (
                  filteredDeals.map((deal) => (
                    <tr
                      key={deal.id}
                      onClick={() => handleOpen360(deal)}
                      className="hover:bg-[#faf9f6] transition-colors cursor-pointer group"
                    >
                      {/* Title */}
                      <td className="py-4 pl-6 pr-4">
                        <div className="font-semibold text-neutral-900 group-hover:text-black">
                          {deal.title}
                        </div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">{deal.type}</div>
                      </td>

                      {/* Account */}
                      <td className="py-4 px-4">
                        <div className="font-medium text-neutral-900">{deal.accountName}</div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">{deal.primaryContactName}</div>
                      </td>

                      {/* Value */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-neutral-900">${deal.value.toLocaleString()}</div>
                      </td>

                      {/* Stage dropdown */}
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={deal.stage}
                          onChange={(e) =>
                            handleStageChange(deal.id, e.target.value as DealOpportunity['stage'], e as any)
                          }
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border cursor-pointer ${getStageBadgeColor(
                            deal.stage
                          )}`}
                        >
                          {stages.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Win Prob & Forecast */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-neutral-800">{deal.winProbability}%</span>
                          <span className="text-[11px] text-neutral-400">
                            (${Math.round(deal.value * (deal.winProbability / 100)).toLocaleString()})
                          </span>
                        </div>
                        <div className="w-20 bg-neutral-100 h-1 rounded-full mt-1.5 overflow-hidden">
                          <div
                            className="bg-neutral-800 h-full rounded-full"
                            style={{ width: `${deal.winProbability}%` }}
                          />
                        </div>
                      </td>

                      {/* Close Date */}
                      <td className="py-4 px-4">
                        <div className="text-neutral-800 flex items-center gap-1.5">
                          <Clock size={11} className="text-neutral-400" />
                          <span>{deal.expectedCloseDate}</span>
                        </div>
                      </td>

                      {/* Owner */}
                      <td className="py-4 px-4">
                        <div className="text-xs font-medium text-neutral-800">{deal.owner}</div>
                      </td>

                      {/* Action */}
                      <td className="py-4 pl-4 pr-6 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpen360(deal);
                          }}
                          className="px-3 py-1.5 rounded-full text-[11px] font-semibold bg-[#f5f3ef] text-neutral-800 hover:bg-neutral-900 hover:text-white transition shadow-2xs"
                        >
                          360 View ›
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Customer 360 Drawer */}
      <Customer360Drawer
        isOpen={is360DrawerOpen}
        onClose={() => setIs360DrawerOpen(false)}
        profile={selected360Profile}
      />

      {/* New Opportunity Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[32px] p-6 max-w-lg w-full border border-neutral-100 shadow-[0_25px_60px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                  <TrendingUp size={14} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Add Deal Opportunity</h3>
                  <p className="text-[11px] text-neutral-400">Create new pipeline revenue opportunity</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:bg-neutral-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="mt-4 space-y-3.5">
              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                  Opportunity Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Enterprise Cloud Deployment & Migration"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Client Account
                  </label>
                  <input
                    type="text"
                    value={newAccount}
                    onChange={(e) => setNewAccount(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Primary Contact
                  </label>
                  <input
                    type="text"
                    value={newContact}
                    onChange={(e) => setNewContact(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Deal Value ($ USD) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="45000"
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value))}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Pipeline Stage
                  </label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as DealOpportunity['stage'])}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:bg-white"
                  >
                    {stages.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Expected Close Date
                  </label>
                  <input
                    type="text"
                    placeholder="Jun 30, 2026"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Win Probability (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="50"
                    value={newProbability}
                    onChange={(e) => setNewProbability(Number(e.target.value))}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-5 py-2 text-xs font-semibold shadow-sm transition"
                >
                  Save Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
