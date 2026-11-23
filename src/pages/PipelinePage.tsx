import { useState } from 'react';
import {
  Layers,
  TrendingUp,
  Search,
  Plus,
  Clock,
} from 'lucide-react';
import Customer360Drawer from '../components/crm/Customer360Drawer';
import { getOrCreateProfile, type Customer360Profile } from '../data/customer360Data';

interface Deal {
  id: string;
  title: string;
  company: string;
  value: string;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  health: 'On Track' | 'Off Track' | 'Delayed';
}

interface PipelineColumn {
  id: string;
  name: string;
  count: number;
  value: string;
  deals: Deal[];
}

const teamMembers = [
  { name: 'Ines', role: 'Account Exec' },
  { name: 'Kwame', role: 'Lead Sales' },
  { name: 'Lena', role: 'Tech Architect' },
  { name: 'Arjun', role: 'Director' },
  { name: 'Tove', role: 'Sales Lead' },
];

const pipelineColumns: PipelineColumn[] = [
  {
    id: 'qual',
    name: 'Qualification',
    count: 22,
    value: '$244.8K',
    deals: [
      {
        id: 'd1',
        title: 'BTM battery storage',
        company: 'Apex Cold Storage',
        value: '$14,200',
        date: 'Closes Jan 12',
        priority: 'Medium',
        health: 'On Track',
      },
      {
        id: 'd2',
        title: 'Fleet depot chargers',
        company: 'Vance Logistics',
        value: '$22,400',
        date: 'Closes Jan 18',
        priority: 'High',
        health: 'Off Track',
      },
      {
        id: 'd3',
        title: 'Solar canopy retrofit',
        company: 'Tokyo Media Lab',
        value: '$18,900',
        date: 'Closes Jan 24',
        priority: 'Low',
        health: 'On Track',
      },
    ],
  },
  {
    id: 'prop',
    name: 'Proposal',
    count: 5,
    value: '$277.6K',
    deals: [
      {
        id: 'd4',
        title: 'Building 4 array, 380 kW',
        company: 'Solaris Cloud',
        value: '$68,540',
        date: 'Closes Dec 18',
        priority: 'High',
        health: 'Delayed',
      },
      {
        id: 'd5',
        title: 'Microgrid study',
        company: 'Ibuki Precision',
        value: '$42,100',
        date: 'Closes Jan 5',
        priority: 'Medium',
        health: 'On Track',
      },
      {
        id: 'd6',
        title: 'Multi-site rollout',
        company: 'Westbrook Schools Trust',
        value: '$34,800',
        date: 'Closes Dec 29',
        priority: 'Medium',
        health: 'On Track',
      },
    ],
  },
  {
    id: 'neg',
    name: 'Negotiation',
    count: 12,
    value: '$362.1K',
    deals: [
      {
        id: 'd7',
        title: 'Rooftop array, 240 kW',
        company: 'Kestrel Cold Storage',
        value: '$51,350',
        date: 'Closes Dec 19',
        priority: 'High',
        health: 'On Track',
      },
      {
        id: 'd8',
        title: 'EV fleet charging hub',
        company: 'Nexus Transit',
        value: '$48,000',
        date: 'Closes Jan 15',
        priority: 'Medium',
        health: 'Off Track',
      },
    ],
  },
  {
    id: 'close',
    name: 'Won / Closing',
    count: 8,
    value: '$510.4K',
    deals: [
      {
        id: 'd9',
        title: 'Maintenance plan, 5 yr',
        company: 'Westbrook Schools Trust',
        value: '$59,510',
        date: 'Closes Dec 10',
        priority: 'High',
        health: 'On Track',
      },
      {
        id: 'd10',
        title: 'Inverter replacement',
        company: 'Alphahn Depots',
        value: '$55,850',
        date: 'Closes Dec 8',
        priority: 'Medium',
        health: 'On Track',
      },
    ],
  },
];

export default function PipelinePage() {
  const [activeView, setActiveView] = useState<'board' | 'celoxis'>('board');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Customer 360 State
  const [selected360Profile, setSelected360Profile] = useState<Customer360Profile | null>(null);
  const [is360DrawerOpen, setIs360DrawerOpen] = useState(false);

  const handleOpen360 = (
    id: string,
    name: string,
    company: string,
    extra?: Partial<Customer360Profile>
  ) => {
    const profile = getOrCreateProfile(id, name, company, 'deal', extra);
    setSelected360Profile(profile);
    setIs360DrawerOpen(true);
  };

  const getHealthBadge = (health: Deal['health']) => {
    switch (health) {
      case 'On Track':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'Off Track':
        return 'bg-rose-50 text-rose-700 border border-rose-200';
      case 'Delayed':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* 1. Header with Planex styling */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl md:text-[26px] font-bold text-neutral-900 tracking-tight">
            Pipeline & Analytics
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            Active opportunities & revenue forecasting for Q4
          </p>
        </div>

        {/* Action pills */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="bg-white/80 border border-neutral-200/60 shadow-sm rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs">
            <Layers size={13} className="text-neutral-500" />
            <span className="font-bold text-neutral-900">$1,394,985</span>
            <span className="text-neutral-400">Open pipeline</span>
          </div>

          <div className="bg-white/80 border border-neutral-200/60 shadow-sm rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs">
            <TrendingUp size={13} className="text-neutral-500" />
            <span className="font-bold text-neutral-900">$865,201</span>
            <span className="text-neutral-400">Forecast</span>
          </div>

          <button
            type="button"
            className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus size={14} />
            <span>Add Deal</span>
          </button>
        </div>
      </div>

      {/* 2. CELOXIS METRICS ROW (Image 2 Cost, Revenue & Project Alerts) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Project Alerts Card (From Image 2) */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-neutral-100">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 pb-2">
            <span>Project Alerts</span>
            <span className="text-[11px] text-neutral-400">›</span>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 pt-1 text-center">
            <div>
              <div className="flex items-center justify-center gap-1.5 text-base font-bold text-neutral-900">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                49
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5">High</div>
              <div className="text-[9px] text-rose-600 font-medium">Critical</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5 text-base font-bold text-neutral-900">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                146
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5">Medium</div>
              <div className="text-[9px] text-amber-600 font-medium">Attention</div>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1.5 text-base font-bold text-neutral-900">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                27
              </div>
              <div className="text-[11px] text-neutral-500 mt-0.5">Low</div>
              <div className="text-[9px] text-emerald-600 font-medium">Acceptable</div>
            </div>
          </div>
        </div>

        {/* Cost & Revenue Card (From Image 2) */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-neutral-100">
          <div className="flex items-center justify-between text-xs font-semibold text-neutral-900 pb-2">
            <span>Cost & Revenue</span>
            <span className="text-[11px] text-neutral-400">›</span>
          </div>
          <div className="space-y-3 mt-2">
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-neutral-900">$1.1M</span>
                <span className="text-[11px] text-neutral-400">(Cost / 62%)</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '62%' }} />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-bold text-neutral-900">$1.4M</span>
                <span className="text-[11px] text-neutral-400">(Revenue / 89%)</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full" style={{ width: '89%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Radial Gauge / Total Processed (From Image 2) */}
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-neutral-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-neutral-900 block">Total Processed</span>
            <div className="text-3xl font-bold text-neutral-900 mt-2 tracking-tight">
              57<span className="text-sm font-normal text-neutral-400">/100%</span>
            </div>
            <div className="flex items-center gap-2 mt-2 text-[10px]">
              <span className="text-neutral-500">· 21-2025 Top</span>
              <span className="text-neutral-400">· 34-2024 Med</span>
            </div>
          </div>
          <div className="relative w-20 h-20 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-neutral-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-amber-400"
                strokeDasharray="57, 100"
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-bold text-neutral-900">57%</span>
          </div>
        </div>
      </div>

      {/* 3. Filter Bar & View Switcher */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Search */}
          <div className="relative w-60">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 bg-white/80 border border-neutral-200/80 rounded-full pl-8 pr-3 text-xs placeholder-neutral-400 focus:outline-none focus:bg-white"
            />
          </div>

          {/* Team filter pills */}
          <div className="flex items-center gap-1">
            {teamMembers.map((member) => (
              <button
                key={member.name}
                type="button"
                onClick={() =>
                  setSelectedMember(selectedMember === member.name ? null : member.name)
                }
                className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                  selectedMember === member.name
                    ? 'bg-neutral-900 text-white font-semibold'
                    : 'bg-white/80 text-neutral-600 hover:text-neutral-900 border border-neutral-200/60'
                }`}
              >
                {member.name}
              </button>
            ))}
          </div>
        </div>

        {/* View Switcher: Board vs Celoxis Pipeline Table */}
        <div className="bg-neutral-200/60 p-1 rounded-full flex items-center gap-1 border border-black/[0.03]">
          <button
            type="button"
            onClick={() => setActiveView('board')}
            className={`px-3 py-1 text-xs rounded-full transition ${
              activeView === 'board'
                ? 'bg-white text-neutral-900 font-semibold shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Kanban Board
          </button>
          <button
            type="button"
            onClick={() => setActiveView('celoxis')}
            className={`px-3 py-1 text-xs rounded-full transition ${
              activeView === 'celoxis'
                ? 'bg-white text-neutral-900 font-semibold shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            Celoxis Table
          </button>
        </div>
      </div>

      {/* 4. MAIN CONTENT */}
      {activeView === 'board' ? (
        /* KANBAN BOARD */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pipelineColumns.map((col) => (
            <div
              key={col.id}
              className="bg-white/70 rounded-[24px] p-4 border border-white/80 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <div>
                    <h3 className="text-xs font-bold text-neutral-900">{col.name}</h3>
                    <span className="text-[11px] text-neutral-400 font-medium">
                      {col.value} · {col.count} deals
                    </span>
                  </div>
                  <button
                    type="button"
                    className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-neutral-500 shadow-sm hover:text-neutral-900"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <div className="space-y-3 mt-3">
                  {col.deals.map((deal) => (
                    <div
                      key={deal.id}
                      onClick={() =>
                        handleOpen360(deal.id, deal.title, deal.company, {
                          dealValue: deal.value,
                          stage: col.name,
                          health: deal.health,
                        })
                      }
                      className="bg-white rounded-2xl p-3.5 shadow-sm border border-neutral-100 hover:shadow-md transition cursor-pointer group"
                    >
                      <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                        {deal.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {deal.company}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="font-bold text-neutral-900">{deal.value}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${getHealthBadge(
                            deal.health
                          )}`}
                        >
                          {deal.health}
                        </span>
                      </div>
                      <div className="mt-2 text-[10px] text-neutral-400 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Clock size={10} />
                          <span>{deal.date}</span>
                        </div>
                        <span className="text-[10px] font-medium text-neutral-400 group-hover:text-neutral-900 transition">
                          360 View ›
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* CELOXIS PROJECTS PIPELINE TABLE (Matches Image 2 table layout) */
        <div className="bg-white rounded-[26px] p-6 shadow-sm border border-neutral-100">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h3 className="text-base font-bold text-neutral-900">Projects Pipeline</h3>
            <span className="text-xs text-neutral-400">12 Active Client Contracts</span>
          </div>
          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-neutral-100 text-[11px] text-neutral-400 font-medium">
                  <th className="py-3">Project</th>
                  <th className="py-3">Schedule Health</th>
                  <th className="py-3">Budget Health</th>
                  <th className="py-3">Deadline</th>
                  <th className="py-3">Client</th>
                  <th className="py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {[
                  {
                    name: 'Cloud deployment rollout',
                    sched: 'Off Track',
                    budget: 'On Track',
                    deadline: '17-Jul-2026',
                    client: 'Rolex',
                  },
                  {
                    name: 'Salesforce integration',
                    sched: 'On Track',
                    budget: 'On Track',
                    deadline: '21-Aug-2026',
                    client: 'Apple',
                  },
                  {
                    name: 'Global redesign platform',
                    sched: 'Delayed',
                    budget: 'Off Track',
                    deadline: '10-Sep-2026',
                    client: 'Google',
                  },
                  {
                    name: 'Mobile security update',
                    sched: 'Delayed',
                    budget: 'Delayed',
                    deadline: '15-Oct-2026',
                    client: 'Microsoft',
                  },
                ].map((row, idx) => (
                  <tr
                    key={idx}
                    onClick={() =>
                      handleOpen360(`celoxis-${idx}`, row.name, row.client, {
                        dealValue: '$75,000',
                        stage: row.sched,
                        health: row.sched as any,
                      })
                    }
                    className="hover:bg-neutral-50/70 transition cursor-pointer group"
                  >
                    <td className="py-3.5 font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors">
                      {row.name}
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${getHealthBadge(row.sched as any)}`}>
                        {row.sched}
                      </span>
                    </td>
                    <td className="py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${getHealthBadge(row.budget as any)}`}>
                        {row.budget}
                      </span>
                    </td>
                    <td className="py-3.5 text-neutral-600 font-medium">{row.deadline}</td>
                    <td className="py-3.5 font-bold text-neutral-800">{row.client}</td>
                    <td className="py-3.5 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpen360(`celoxis-${idx}`, row.name, row.client, {
                            dealValue: '$75,000',
                            stage: row.sched,
                            health: row.sched as any,
                          });
                        }}
                        className="text-neutral-400 hover:text-neutral-900 text-xs font-semibold px-2.5 py-1 rounded-full hover:bg-neutral-100"
                      >
                        360 View ›
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CUSTOMER 360 DRAWER */}
      <Customer360Drawer
        isOpen={is360DrawerOpen}
        onClose={() => setIs360DrawerOpen(false)}
        profile={selected360Profile}
      />
    </div>
  );
}