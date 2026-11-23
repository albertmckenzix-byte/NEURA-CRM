import { useState } from 'react';
import { Search, Bell, Settings, SlidersHorizontal } from 'lucide-react';
import { PlanexLogo } from './Sidebar';

export interface TopBarProps {
  onToggleCeloxisDrawer?: () => void;
  celoxisDrawerOpen?: boolean;
}

export default function TopBar({
  onToggleCeloxisDrawer,
  celoxisDrawerOpen,
}: TopBarProps) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="w-full flex items-center justify-between gap-4 py-2 select-none">
      {/* Left: Planex Logo & Pill Search Bar */}
      <div className="flex items-center gap-6 flex-1 max-w-xl">
        {/* Brand */}
        <div className="flex items-center gap-2 shrink-0">
          <PlanexLogo className="w-7 h-7 text-neutral-900" />
          <span className="font-bold text-lg tracking-tight text-neutral-900">
            NEURA
          </span>
        </div>

        {/* Pill Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search projects, tasks, members..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full bg-white/80 hover:bg-white focus:bg-white border border-neutral-200/60 rounded-full pl-11 pr-4 py-2 text-xs text-neutral-800 placeholder-neutral-400 shadow-[0_2px_8px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-1 focus:ring-neutral-400 transition-all"
          />
        </div>
      </div>

      {/* Right: Celoxis Switcher, User Profile, Notification & Settings */}
      <div className="flex items-center gap-3">
        {/* Celoxis Management Drawer Quick Switcher (From Image 2) */}
        {onToggleCeloxisDrawer && (
          <button
            type="button"
            onClick={onToggleCeloxisDrawer}
            className={`hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
              celoxisDrawerOpen
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                : 'bg-white/80 text-neutral-700 hover:text-neutral-950 border-neutral-200/60 hover:bg-white shadow-[0_1px_3px_rgba(0,0,0,0.03)]'
            }`}
          >
            <SlidersHorizontal size={13} />
            <span>Management Drawer</span>
          </button>
        )}

        {/* User Profile Block (Albert Mckenzie, Ops Manager) */}
        <div className="flex items-center gap-2.5 px-2 py-1 rounded-full hover:bg-white/50 transition cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[11px] font-bold shadow-sm">
            AM
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-neutral-900 leading-tight">
              Albert Mckenzie
            </span>
            <span className="text-[10px] text-neutral-400 leading-tight">
              Ops Manager
            </span>
          </div>
        </div>

        {/* Notification Bell Button */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-neutral-200/60 flex items-center justify-center text-neutral-600 hover:text-neutral-900 shadow-sm transition"
        >
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
        </button>

        {/* Settings Hexagon / Gear Button */}
        <button
          type="button"
          aria-label="Settings"
          className="w-8 h-8 rounded-full bg-white/80 hover:bg-white border border-neutral-200/60 flex items-center justify-center text-neutral-600 hover:text-neutral-900 shadow-sm transition"
        >
          <Settings size={15} />
        </button>
      </div>
    </header>
  );
}