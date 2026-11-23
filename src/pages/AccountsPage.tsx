import { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Building2,
  ExternalLink,
  TrendingUp,
  MapPin,
  Globe,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { initialAccounts, type Account } from '../data/crmData';
import Customer360Drawer from '../components/crm/Customer360Drawer';
import { getOrCreateProfile, type Customer360Profile } from '../data/customer360Data';

type AccountTierFilter = 'all' | 'Enterprise' | 'Mid-Market' | 'Growth SMB';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [tierFilter, setTierFilter] = useState<AccountTierFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Customer 360 State
  const [selected360Profile, setSelected360Profile] = useState<Customer360Profile | null>(null);
  const [is360DrawerOpen, setIs360DrawerOpen] = useState(false);

  // New Account form state
  const [newName, setNewName] = useState('');
  const [newDomain, setNewDomain] = useState('');
  const [newIndustry, setNewIndustry] = useState<Account['industry']>('Enterprise SaaS');
  const [newSize, setNewSize] = useState<Account['size']>('50-200');
  const [newRevenue, setNewRevenue] = useState('$10.5M ARR');
  const [newTier, setNewTier] = useState<Account['tier']>('Mid-Market');
  const [newCity, setNewCity] = useState('San Francisco, CA');

  const filteredAccounts = useMemo(() => {
    return accounts.filter((acc) => {
      if (tierFilter !== 'all' && acc.tier !== tierFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = acc.name.toLowerCase().includes(q);
        const matchDomain = acc.domain.toLowerCase().includes(q);
        const matchIndustry = acc.industry.toLowerCase().includes(q);
        const matchCity = acc.city.toLowerCase().includes(q);
        if (!matchName && !matchDomain && !matchIndustry && !matchCity) return false;
      }
      return true;
    });
  }, [accounts, tierFilter, searchQuery]);

  const handleOpen360 = (acc: Account) => {
    const profile = getOrCreateProfile(acc.id, acc.name, acc.name, 'deal', {
      tier: acc.tier,
      dealValue: acc.openDealsValue,
      lifetimeValue: acc.annualRevenue,
      renewalDate: 'Nov 20, 2027',
      status: `${acc.tier} · ${acc.health}`,
      owner: acc.owner,
      health: acc.health === 'At Risk' ? 'Off Track' : 'On Track',
    });
    setSelected360Profile(profile);
    setIs360DrawerOpen(true);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newDomain.trim()) return;

    const created: Account = {
      id: `acc-${Date.now()}`,
      name: newName.trim(),
      domain: newDomain.trim().toLowerCase().replace(/^https?:\/\//, ''),
      industry: newIndustry,
      size: newSize,
      annualRevenue: newRevenue.trim() || '$5.0M ARR',
      tier: newTier,
      owner: 'Albert Mckenzie',
      health: 'Healthy',
      contactsCount: 1,
      openDealsValue: '$50,000',
      country: 'United States',
      city: newCity.trim() || 'New York, NY',
    };

    setAccounts([created, ...accounts]);
    setNewName('');
    setNewDomain('');
    setIsAddModalOpen(false);
  };

  const totalCount = accounts.length;
  const enterpriseCount = accounts.filter((a) => a.tier === 'Enterprise').length;
  const midMarketCount = accounts.filter((a) => a.tier === 'Mid-Market').length;
  const growthCount = accounts.filter((a) => a.tier === 'Growth SMB').length;

  const getHealthBadge = (health: Account['health']) => {
    switch (health) {
      case 'Healthy':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'Expanding':
        return 'bg-blue-50 text-blue-700 border-blue-200/60';
      case 'At Risk':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
    }
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/60 shadow-sm flex items-center justify-center text-neutral-900">
            <Building2 size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Accounts & Organizations
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-white border border-neutral-200/60 text-neutral-700 shadow-sm">
                {totalCount} Active
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Manage client companies, company size, annual revenue, and business relationships.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus size={14} />
          <span>New Account</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Total Tracked ARR</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">$183.4M</div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+14.2% YoY</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Combined client annual revenue</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Enterprise Tier</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">{enterpriseCount}</div>
            <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">50% of portfolio</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Accounts over 500+ headcount</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Account Health Score</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">96.4%</div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Top quartile</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">1 account flagged for review</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Active Deal Pipeline</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">$365.9K</div>
            <span className="text-[11px] font-semibold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded-full">6 expansions</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Cross-sell and upsell opportunities</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
        {/* Tier Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-sm overflow-x-auto shrink-0">
          {[
            { id: 'all', label: `All Accounts (${totalCount})` },
            { id: 'Enterprise', label: `Enterprise (${enterpriseCount})` },
            { id: 'Mid-Market', label: `Mid-Market (${midMarketCount})` },
            { id: 'Growth SMB', label: `Growth (${growthCount})` },
          ].map((tab) => {
            const isSelected = tierFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTierFilter(tab.id as AccountTierFilter)}
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
            placeholder="Search accounts by name, domain, industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 shadow-sm"
          />
        </div>
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-[28px] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-neutral-100 bg-[#faf9f6]/70 text-neutral-400 font-medium">
                <th className="py-3.5 pl-6 pr-4">Organization</th>
                <th className="py-3.5 px-4">Domain / Web</th>
                <th className="py-3.5 px-4">Industry & Tier</th>
                <th className="py-3.5 px-4">Size & Scale</th>
                <th className="py-3.5 px-4">Annual Revenue</th>
                <th className="py-3.5 px-4">Account Health</th>
                <th className="py-3.5 px-4">Owner</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-50 text-neutral-700">
              {filteredAccounts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-neutral-400 text-xs">
                    No accounts found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredAccounts.map((acc) => (
                  <tr
                    key={acc.id}
                    onClick={() => handleOpen360(acc)}
                    className="hover:bg-[#faf9f6] transition-colors cursor-pointer group"
                  >
                    {/* Organization */}
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-2xl bg-[#f4f2ee] border border-neutral-200/60 text-neutral-900 font-bold text-xs flex items-center justify-center shrink-0">
                          {acc.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <div className="font-semibold text-neutral-900 group-hover:text-black">
                            {acc.name}
                          </div>
                          <div className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                            <MapPin size={10} />
                            <span>{acc.city}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Domain */}
                    <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`https://${acc.domain}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-black font-mono transition"
                      >
                        <Globe size={11} className="text-neutral-400" />
                        <span>{acc.domain}</span>
                        <ExternalLink size={10} className="text-neutral-300" />
                      </a>
                    </td>

                    {/* Industry & Tier */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-neutral-900">{acc.industry}</div>
                      <span className="inline-block mt-0.5 text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">
                        {acc.tier}
                      </span>
                    </td>

                    {/* Size */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-neutral-800">{acc.size}</div>
                      <div className="text-[10px] text-neutral-400 mt-0.5 flex items-center gap-2">
                        <span>{acc.contactsCount} contacts</span>
                        <span>•</span>
                        <span>{acc.openDealsValue} pipeline</span>
                      </div>
                    </td>

                    {/* Annual Revenue */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-neutral-900">{acc.annualRevenue}</div>
                      <div className="text-[10px] text-neutral-400">Audited ARR</div>
                    </td>

                    {/* Health */}
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getHealthBadge(
                          acc.health
                        )}`}
                      >
                        {acc.health === 'Healthy' && <ShieldCheck size={11} />}
                        {acc.health === 'Expanding' && <TrendingUp size={11} />}
                        {acc.health === 'At Risk' && <AlertTriangle size={11} />}
                        <span>{acc.health}</span>
                      </span>
                    </td>

                    {/* Owner */}
                    <td className="py-4 px-4">
                      <div className="text-xs font-medium text-neutral-800">{acc.owner}</div>
                      <div className="text-[10px] text-neutral-400">Account Lead</div>
                    </td>

                    {/* Action */}
                    <td className="py-4 pl-4 pr-6 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpen360(acc);
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

      {/* New Account Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[32px] p-6 max-w-lg w-full border border-neutral-100 shadow-[0_25px_60px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                  <Building2 size={14} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Create New Account</h3>
                  <p className="text-[11px] text-neutral-400">Add an enterprise organization to CRM</p>
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

            <form onSubmit={handleCreateAccount} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corporation"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Website / Domain *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. acmecorp.com"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Industry
                  </label>
                  <select
                    value={newIndustry}
                    onChange={(e) => setNewIndustry(e.target.value as Account['industry'])}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:bg-white"
                  >
                    <option value="Fintech">Fintech</option>
                    <option value="Healthcare & Biotech">Healthcare & Biotech</option>
                    <option value="AI & Cloud Infrastructure">AI & Cloud Infrastructure</option>
                    <option value="Enterprise SaaS">Enterprise SaaS</option>
                    <option value="Logistics & Supply">Logistics & Supply</option>
                    <option value="Media & Entertainment">Media & Entertainment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Company Headcount
                  </label>
                  <select
                    value={newSize}
                    onChange={(e) => setNewSize(e.target.value as Account['size'])}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:bg-white"
                  >
                    <option value="10-50">10-50 employees</option>
                    <option value="50-200">50-200 employees</option>
                    <option value="250-500">250-500 employees</option>
                    <option value="500-1,000">500-1,000 employees</option>
                    <option value="1,000+ employees">1,000+ employees</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Annual Revenue (ARR)
                  </label>
                  <input
                    type="text"
                    placeholder="$12.0M ARR"
                    value={newRevenue}
                    onChange={(e) => setNewRevenue(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Tier & Segment
                  </label>
                  <select
                    value={newTier}
                    onChange={(e) => setNewTier(e.target.value as Account['tier'])}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:bg-white"
                  >
                    <option value="Enterprise">Enterprise</option>
                    <option value="Mid-Market">Mid-Market</option>
                    <option value="Growth SMB">Growth SMB</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                  Location / Headquarters
                </label>
                <input
                  type="text"
                  placeholder="San Francisco, CA"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
                />
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
                  Save Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
