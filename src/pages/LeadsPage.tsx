import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  UserPlus,
  ChevronDown,
  Mail,
} from 'lucide-react';
import { getStoredLeads, saveStoredLeads, type Lead } from '../data/crmData';
import Customer360Drawer from '../components/crm/Customer360Drawer';
import { getOrCreateProfile, type Customer360Profile } from '../data/customer360Data';

type LeadStatusFilter = 'all' | 'New' | 'Contacted' | 'Qualified' | 'Lost';

export default function LeadsPage() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>(() => getStoredLeads());
  const [statusFilter, setStatusFilter] = useState<LeadStatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize leads from storage on mount
  useEffect(() => {
    setLeads(getStoredLeads());
  }, []);

  // Customer 360 State
  const [selected360Profile, setSelected360Profile] = useState<Customer360Profile | null>(null);
  const [is360DrawerOpen, setIs360DrawerOpen] = useState(false);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead: Lead) => {
      if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = lead.name.toLowerCase().includes(q);
        const matchCompany = lead.company.toLowerCase().includes(q);
        const matchEmail = lead.email.toLowerCase().includes(q);
        const matchSource = lead.source.toLowerCase().includes(q);
        if (!matchName && !matchCompany && !matchEmail && !matchSource) return false;
      }
      return true;
    });
  }, [leads, statusFilter, searchQuery]);

  const handleOpen360 = (lead: Lead) => {
    const profile = getOrCreateProfile(lead.id, lead.name, lead.company, 'contact', {
      email: lead.email,
      phone: lead.phone,
      role: lead.title,
      status: `Lead (${lead.status})`,
      tier: lead.source,
      dealValue: lead.estValue,
      owner: lead.assignedTo,
    });
    setSelected360Profile(profile);
    setIs360DrawerOpen(true);
  };

  const handleStatusChange = (leadId: string, newStatus: Lead['status'], e: React.MouseEvent) => {
    e.stopPropagation();
    setLeads((prev) => {
      const updated = prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l));
      saveStoredLeads(updated);
      return updated;
    });
  };

  // Status stats
  const totalLeads = leads.length;
  const newCount = leads.filter((l) => l.status === 'New').length;
  const contactedCount = leads.filter((l) => l.status === 'Contacted').length;
  const qualifiedCount = leads.filter((l) => l.status === 'Qualified').length;
  const lostCount = leads.filter((l) => l.status === 'Lost').length;

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'Contacted':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'Qualified':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'Lost':
        return 'bg-neutral-100 text-neutral-500 border-neutral-200';
    }
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/60 shadow-sm flex items-center justify-center text-neutral-900">
            <UserPlus size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Leads & Prospects
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-white border border-neutral-200/60 text-neutral-700 shadow-sm">
                {totalLeads} Total
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Capture, qualify, and convert unqualified prospects across marketing and sales channels.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/leads/new')}
          className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus size={14} />
          <span>New Lead</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Total Pipeline Potential</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">$271,000</div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+18.4%</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Weighted average from 6 active prospects</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">New Inbound Leads</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">{newCount}</div>
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Requires triage</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Avg response time: 24 mins</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Sales Qualified Leads</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">{qualifiedCount}</div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">33.3% rate</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Ready for Opportunity creation</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Disqualified / Lost</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">{lostCount}</div>
            <span className="text-[11px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full">16.7% rate</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Archived with loss notes</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-sm overflow-x-auto shrink-0">
          {[
            { id: 'all', label: `All (${totalLeads})` },
            { id: 'New', label: `New (${newCount})` },
            { id: 'Contacted', label: `Contacted (${contactedCount})` },
            { id: 'Qualified', label: `Qualified (${qualifiedCount})` },
            { id: 'Lost', label: `Lost (${lostCount})` },
          ].map((tab) => {
            const isSelected = statusFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id as LeadStatusFilter)}
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
            placeholder="Search leads by name, company, or source..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 shadow-sm"
          />
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-[28px] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-100 bg-[#faf9f6]/70 text-neutral-400 font-medium">
                <th className="py-3.5 pl-6 pr-4">Prospect</th>
                <th className="py-3.5 px-4">Company & Title</th>
                <th className="py-3.5 px-4">Lead Source</th>
                <th className="py-3.5 px-4">Est. Value</th>
                <th className="py-3.5 px-4">Lead Status</th>
                <th className="py-3.5 px-4">Owner</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50 text-neutral-700">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400 text-xs">
                    No leads found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => handleOpen360(lead)}
                    className="hover:bg-[#faf9f6] transition-colors cursor-pointer group"
                  >
                    {/* Prospect */}
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                          {lead.name.split(' ').map((n) => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-neutral-900 group-hover:text-black">
                            {lead.name}
                          </div>
                          <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 mt-0.5">
                            <Mail size={11} />
                            <span>{lead.email}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Company & Title */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-neutral-900">{lead.company}</div>
                      <div className="text-[11px] text-neutral-400 mt-0.5">{lead.title}</div>
                    </td>

                    {/* Source */}
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#f5f3ef] text-neutral-700 border border-neutral-200/60">
                        {lead.source}
                      </span>
                    </td>

                    {/* Value */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-neutral-900">{lead.estValue}</div>
                      <div className="text-[10px] text-neutral-400">Score: {lead.score}/100</div>
                    </td>

                    {/* Status dropdown / pill */}
                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                      <div className="relative inline-block">
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            handleStatusChange(lead.id, e.target.value as Lead['status'], e as any)
                          }
                          className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border cursor-pointer appearance-none pr-6 focus:outline-none ${getStatusBadge(
                            lead.status
                          )}`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Lost">Lost</option>
                        </select>
                        <ChevronDown
                          size={11}
                          className="absolute right-2 top-2 pointer-events-none text-neutral-500"
                        />
                      </div>
                    </td>

                    {/* Owner */}
                    <td className="py-4 px-4">
                      <div className="text-xs font-medium text-neutral-800">{lead.assignedTo}</div>
                      <div className="text-[10px] text-neutral-400">{lead.createdAt}</div>
                    </td>

                    {/* Action */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpen360(lead);
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

      {/* Customer 360 Drawer */}
      <Customer360Drawer
        isOpen={is360DrawerOpen}
        onClose={() => setIs360DrawerOpen(false)}
        profile={selected360Profile}
      />
    </div>
  );
}
