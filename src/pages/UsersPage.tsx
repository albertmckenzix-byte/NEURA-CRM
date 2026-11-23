import { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  UserPlus,
  Table2,
  LayoutGrid,
  Trophy,
  Layers,
} from 'lucide-react';
import UserHeroCard from '../components/users/UserHeroCard';
import UsersByPlanCard from '../components/users/UsersByPlanCard';
import UserStatsCard from '../components/users/UserStatsCard';
import UsersTable from '../components/users/UsersTable';
import UsersCards from '../components/users/UsersCards';
import { mockUsers, type User } from '../data/mockUsers';
import Customer360Drawer from '../components/crm/Customer360Drawer';
import { getOrCreateProfile, type Customer360Profile } from '../data/customer360Data';

type FilterTab = 'all' | 'active' | 'invited';
type ViewMode = 'table' | 'cards';

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  // Customer 360 State
  const [selected360Profile, setSelected360Profile] = useState<Customer360Profile | null>(null);
  const [is360DrawerOpen, setIs360DrawerOpen] = useState(false);

  const handleSelectUser = (user: User) => {
    const profile = getOrCreateProfile(user.id, user.name, user.company, 'contact', {
      email: user.email,
      status: user.status === 'Active' ? 'Active Customer' : `${user.status} Contact`,
      tier: user.plan,
      mrr: user.plan === 'Enterprise' ? '$3,800/mo' : user.plan === 'Team' ? '$1,950/mo' : '$450/mo',
    });
    setSelected360Profile(profile);
    setIs360DrawerOpen(true);
  };

  const tabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All users' },
    { id: 'active', label: 'Active' },
    { id: 'invited', label: 'Invited' },
  ];

  // Filtering by activeTab and searchQuery simultaneously
  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      if (activeTab === 'active' && user.status !== 'Active') return false;
      if (activeTab === 'invited' && user.status !== 'Invited') return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = user.name.toLowerCase().includes(query);
        const matchesEmail = user.email.toLowerCase().includes(query);
        const matchesCompany = user.company.toLowerCase().includes(query);
        if (!matchesName && !matchesEmail && !matchesCompany) return false;
      }

      return true;
    });
  }, [activeTab, searchQuery]);

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* 1. Header with Planex Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl md:text-[26px] font-bold text-neutral-900 tracking-tight">
            Users & Team
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5">
            2,847 customers · across 418 companies · 4 plans
          </p>
        </div>

        {/* Action Pills */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="bg-white/80 border border-neutral-200/60 shadow-sm rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs">
            <Trophy size={13} className="text-neutral-500" />
            <span className="font-bold text-neutral-900">2,847</span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
              +8.2%
            </span>
            <span className="text-neutral-400">Active</span>
          </div>

          <div className="bg-white/80 border border-neutral-200/60 shadow-sm rounded-full px-3.5 py-1.5 flex items-center gap-2 text-xs">
            <Layers size={13} className="text-neutral-500" />
            <span className="font-bold text-neutral-900">418</span>
            <span className="text-neutral-400">Companies</span>
          </div>

          <button
            type="button"
            className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <UserPlus size={14} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <UserHeroCard />
        <UsersByPlanCard />
        <UserStatsCard />
      </div>

      {/* 3. Filter Bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Tabs */}
          <div className="bg-neutral-200/60 p-1 rounded-full flex items-center gap-0.5 border border-black/[0.03]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 text-xs rounded-full transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-neutral-900 font-semibold shadow-sm'
                      : 'text-neutral-500 hover:text-neutral-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-64">
            <Search
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user, email or company..."
              className="w-full h-8 bg-white/80 border border-neutral-200/80 rounded-full pl-9 pr-3 text-xs placeholder-neutral-400 focus:outline-none focus:bg-white"
            />
          </div>

          {/* Filter */}
          <button
            type="button"
            className="h-8 px-3.5 bg-white/80 hover:bg-white border border-neutral-200/80 rounded-full flex items-center gap-1.5 text-xs text-neutral-600 transition shadow-sm font-medium"
          >
            <SlidersHorizontal size={13} />
            <span>Filter</span>
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="bg-neutral-200/60 p-1 rounded-full flex items-center gap-1 border border-black/[0.03]">
          <button
            type="button"
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-full transition-all ${
              viewMode === 'table'
                ? 'bg-white text-neutral-950 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
            title="Table View"
          >
            <Table2 size={14} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode('cards')}
            className={`p-1.5 rounded-full transition-all ${
              viewMode === 'cards'
                ? 'bg-white text-neutral-950 shadow-sm'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
            title="Cards View"
          >
            <LayoutGrid size={14} />
          </button>
        </div>
      </div>

      {/* 4. Main Content: Table or Cards with 360 View trigger */}
      {viewMode === 'table' ? (
        <UsersTable users={filteredUsers} onSelectUser={handleSelectUser} />
      ) : (
        <UsersCards users={filteredUsers} onSelectUser={handleSelectUser} />
      )}

      {/* Customer 360 Detail Drawer */}
      <Customer360Drawer
        isOpen={is360DrawerOpen}
        onClose={() => setIs360DrawerOpen(false)}
        profile={selected360Profile}
      />
    </div>
  );
}