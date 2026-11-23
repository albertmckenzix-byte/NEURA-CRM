import { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Plus,
  TrendingUp,
  FolderKanban,
  UserPlus,
  Building2,
  CheckSquare,
  Calendar,
  PhoneCall,
  Megaphone,
  FileText,
  MapPin,
} from 'lucide-react';
import { modulesData } from '../data/mockModules';

interface ModulePageProps {
  moduleKey: string;
}

const iconMap: Record<string, any> = {
  FolderKanban,
  UserPlus,
  Building2,
  CheckSquare,
  Calendar,
  PhoneCall,
  Megaphone,
  FileText,
  MapPin,
};

export default function ModulePage({ moduleKey }: ModulePageProps) {
  const config = modulesData[moduleKey] || modulesData.leads;
  const [activeTab, setActiveTab] = useState(config.filterTabs[0] || 'All');
  const [searchQuery, setSearchQuery] = useState('');

  const IconComponent = iconMap[config.iconName] || FolderKanban;

  const filteredRows = useMemo(() => {
    return config.rows.filter((row) => {
      if (activeTab !== config.filterTabs[0]) {
        const matchesTab = Object.values(row).some(
          (val) => typeof val === 'string' && val.toLowerCase() === activeTab.toLowerCase()
        );
        if (!matchesTab) return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return Object.values(row).some(
          (val) => typeof val === 'string' && val.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [config.rows, activeTab, searchQuery, config.filterTabs]);

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* 1. Header with Planex style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/60 shadow-sm flex items-center justify-center text-neutral-800">
            <IconComponent size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
              {config.name}
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              {config.description}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus size={14} />
          <span>{config.addButtonLabel}</span>
        </button>
      </div>

      {/* 2. Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {config.stats.map((stat, i) => (
          <div
            key={i}
            className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm hover:shadow transition"
          >
            <div className="text-xs font-medium text-neutral-400 mb-1">
              {stat.label}
            </div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold text-neutral-900 tracking-tight">
                {stat.value}
              </div>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-100">
                <TrendingUp size={10} />
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-2">
        {/* Filter Pills */}
        <div className="bg-neutral-200/60 p-1 rounded-full flex items-center gap-0.5 border border-black/[0.03] overflow-x-auto">
          {config.filterTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs rounded-full whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-white text-neutral-900 font-semibold shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Right Search & Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${config.name.toLowerCase()}...`}
              className="w-full h-8 bg-white/80 border border-neutral-200/80 rounded-full pl-8 pr-3 text-xs placeholder-neutral-400 focus:outline-none focus:bg-white"
            />
          </div>

          <button
            type="button"
            className="h-8 px-3.5 bg-white/80 hover:bg-white border border-neutral-200/80 rounded-full text-xs font-medium flex items-center gap-1.5 text-neutral-600 transition shadow-sm"
          >
            <SlidersHorizontal size={13} />
            <span>Filter</span>
          </button>
        </div>
      </div>

      {/* 4. Table Panel */}
      <div className="bg-white rounded-[26px] overflow-hidden shadow-sm border border-neutral-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50 text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
                {config.columns.map((col, idx) => (
                  <th
                    key={col.key}
                    className={`py-3.5 px-4 ${idx === 0 ? 'pl-6' : ''} ${
                      idx === config.columns.length - 1 ? 'pr-6 text-right' : ''
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredRows.map((row, rowIdx) => (
                <tr
                  key={row.id || rowIdx}
                  className="hover:bg-neutral-50/70 transition-colors"
                >
                  {config.columns.map((col, colIdx) => {
                    const value = row[col.key];
                    const isFirst = colIdx === 0;
                    const isLast = colIdx === config.columns.length - 1;

                    return (
                      <td
                        key={col.key}
                        className={`py-3.5 px-4 ${isFirst ? 'pl-6 font-semibold text-neutral-900' : 'text-neutral-700'} ${
                          isLast ? 'pr-6 text-right' : ''
                        }`}
                      >
                        {col.key === 'status' ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-neutral-100 text-neutral-800 border border-neutral-200">
                            {value}
                          </span>
                        ) : col.key === 'priority' ? (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            {value}
                          </span>
                        ) : (
                          value
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}