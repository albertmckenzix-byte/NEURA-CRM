import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutGrid,
  UserPlus,
  Building2,
  Users,
  TrendingUp,
  Clock,
  FileText,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Sliders,
  User,
  Bell,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  celoxisDrawerOpen?: boolean;
  onToggleCeloxisDrawer?: () => void;
}

// Planex Floral Logo Mark (from image 1)
export function PlanexLogo({ className = "w-6 h-6 text-neutral-900" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2C12.5 6.8 15.2 9.5 20 10C15.2 10.5 12.5 13.2 12 18C11.5 13.2 8.8 10.5 4 10C8.8 9.5 11.5 6.8 12 2Z" />
      <path d="M12 6C12.3 8.8 13.7 10.2 16.5 10.5C13.7 10.8 12.3 12.2 12 15C11.7 12.2 10.3 10.8 7.5 10.5C10.3 10.2 11.7 8.8 12 6Z" fillOpacity="0.4" />
      <circle cx="12" cy="10.5" r="1.5" />
    </svg>
  );
}

// Celoxis Logo Mark (from image 2)
export function CeloxisLogo({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <div className="w-4 h-4 rounded-full bg-amber-400 relative flex items-center justify-center shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
      </div>
      <span className="font-semibold text-sm tracking-tight text-neutral-900">celoxis</span>
    </div>
  );
}

export default function Sidebar({
  celoxisDrawerOpen = false,
  onToggleCeloxisDrawer,
}: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerSearch, setDrawerSearch] = useState('');

  const dockNavItems = [
    { label: 'Overview', to: '/', icon: LayoutGrid, exact: true },
    { label: 'Leads', to: '/leads', icon: UserPlus },
    { label: 'Accounts', to: '/accounts', icon: Building2 },
    { label: 'Contacts', to: '/contacts', icon: Users },
    { label: 'Deals', to: '/deals', icon: TrendingUp },
    { label: 'Activities', to: '/activities', icon: Clock },
    { label: 'Documents', to: '/documents', icon: FileText },
  ];

  interface DrawerMenuItem {
    id: string;
    label: string;
    to: string;
    hasPlus?: boolean;
    activeBadge?: boolean;
  }

  const celoxisMenuItems: DrawerMenuItem[] = [
    { id: 'dashboard', label: 'Main Dashboard', to: '/' },
    { id: 'leads', label: 'Leads & Prospects', to: '/leads', hasPlus: true },
    { id: 'accounts', label: 'Accounts (Companies)', to: '/accounts', hasPlus: true },
    { id: 'contacts', label: 'Contacts & Stakeholders', to: '/contacts', hasPlus: true },
    { id: 'deals', label: 'Deals & Opportunities', to: '/deals', hasPlus: true },
    { id: 'activities', label: 'Activities & Timeline', to: '/activities', hasPlus: true },
    { id: 'files', label: 'Files & Documents', to: '/documents', activeBadge: true },
    { id: 'portfolio', label: 'Company Portfolio', to: '/projects' },
  ];

  const fileDrawerCards = [
    {
      id: 'ai-insights',
      title: 'AI Insights',
      badge: 'Increased by 27.1% - 31.2%',
      desc: "The Company's profitability for the third quarter",
      isAi: true,
    },
    {
      id: 'invoices',
      title: 'Invoices',
      count: '193 files',
      preview: 'Inv-Q3.pdf',
    },
    {
      id: 'reporting',
      title: 'Reporting',
      count: '271 files',
      preview: 'Quarterly.xlsx',
    },
    {
      id: 'analysis',
      title: 'Analysis',
      count: '295 files',
      preview: 'MarketShare.pdf',
    },
    {
      id: 'overview',
      title: 'Overview',
      count: '421 files',
      preview: 'Summary.doc',
    },
  ];

  return (
    <>
      {/* 1. PLANEX COMPACT PILL DOCK (from Image 1) */}
      <aside className="w-[80px] h-screen sticky top-0 py-4 flex flex-col items-center justify-between select-none z-30 shrink-0">
        {/* Top Logo */}
        <div className="flex flex-col items-center gap-3">
          <NavLink
            to="/"
            className="flex items-center justify-center p-1.5 transition-transform hover:scale-105"
            title="NEURA Home"
          >
            <PlanexLogo className="w-8 h-8 text-neutral-900" />
          </NavLink>
        </div>

        {/* Floating Pill Dock */}
        <div className="w-[52px] bg-white/40 backdrop-blur-md rounded-[26px] p-1.5 flex flex-col items-center gap-1.5 border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          {dockNavItems.map((item) => {
            const isActive = item.exact
              ? location.pathname === '/' || location.pathname === '/home'
              : location.pathname.startsWith(item.to);

            return (
              <NavLink
                key={item.to}
                to={item.to}
                title={item.label}
                className={`w-10 h-10 rounded-[18px] flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-neutral-950 shadow-[0_4px_12px_rgba(0,0,0,0.08)] font-semibold'
                    : 'text-neutral-500 hover:text-neutral-900 hover:bg-white/60'
                }`}
              >
                <item.icon size={19} strokeWidth={isActive ? 2.2 : 1.8} />
              </NavLink>
            );
          })}
        </div>

        {/* Bottom Actions: Settings & Help */}
        <div className="flex flex-col items-center gap-2">
          {/* Toggle Celoxis Drawer Button */}
          {onToggleCeloxisDrawer && (
            <button
              type="button"
              onClick={onToggleCeloxisDrawer}
              title={celoxisDrawerOpen ? "Close Celoxis Drawer" : "Open Celoxis Drawer (Image 2)"}
              className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                celoxisDrawerOpen
                  ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                  : 'bg-white/60 text-neutral-600 hover:text-neutral-900 border-neutral-200/60 hover:bg-white'
              }`}
            >
              <Sliders size={17} />
            </button>
          )}

          <NavLink
            to="/users"
            title="Settings"
            className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-500 hover:text-neutral-900 hover:bg-white/60 transition"
          >
            <Settings size={18} strokeWidth={1.8} />
          </NavLink>
          <button
            type="button"
            title="Help & Documentation"
            className="w-10 h-10 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-800 transition"
          >
            <HelpCircle size={18} strokeWidth={1.8} />
          </button>
        </div>
      </aside>

      {/* 2. CELOXIS MANAGEMENT DRAWER (from Image 2) */}
      <AnimatePresence>
        {celoxisDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -30, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-[90px] top-6 bottom-6 z-40 flex shadow-[0_25px_60px_rgba(0,0,0,0.12)] rounded-[32px] overflow-hidden border border-white/80"
          >
            {/* Left Menu Section of Drawer */}
            <div className="w-[260px] bg-[#f4f2ee] p-5 flex flex-col justify-between border-r border-neutral-200/60">
              <div>
                {/* Header Back Button & Brand */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-200/60 gap-2">
                  <button
                    type="button"
                    onClick={onToggleCeloxisDrawer}
                    className="flex items-center gap-1.5 text-xs font-semibold text-neutral-800 hover:text-neutral-950 transition shrink-0"
                  >
                    <ChevronLeft size={16} />
                    <span>Management</span>
                  </button>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <PlanexLogo className="w-4 h-4 text-neutral-900" />
                    <span className="font-bold text-xs tracking-tight text-neutral-900">NEURA</span>
                  </div>
                </div>

                <div className="mt-3">
                  <h3 className="text-sm font-bold text-neutral-900">Overview</h3>
                </div>

                {/* Search input */}
                <div className="mt-3 relative">
                  <Search size={13} className="absolute left-3 top-2.5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by system"
                    value={drawerSearch}
                    onChange={(e) => setDrawerSearch(e.target.value)}
                    className="w-full bg-white/70 border border-neutral-200/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
                  />
                </div>

                {/* Navigation list */}
                <nav className="mt-4 space-y-1">
                  {celoxisMenuItems.map((item) => {
                    const isSelected =
                      location.pathname === item.to ||
                      (item.to !== '/' && location.pathname.startsWith(item.to));
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          navigate(item.to);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-white text-neutral-950 shadow-sm font-semibold'
                            : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/40'
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        {item.activeBadge && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleCeloxisDrawer?.();
                            }}
                            className="p-0.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-700"
                          >
                            <X size={12} />
                          </span>
                        )}
                        {item.hasPlus && !item.activeBadge && (
                          <span className="text-neutral-400 text-xs">+</span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom utilities */}
              <div className="pt-3 border-t border-neutral-200/60 space-y-1 text-xs text-neutral-600">
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/40 hover:text-neutral-900 text-left"
                >
                  <Bell size={13} />
                  <span>Notifications</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/40 hover:text-neutral-900 text-left"
                >
                  <Settings size={13} />
                  <span>Settings</span>
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-white/40 hover:text-neutral-900 text-left"
                >
                  <User size={13} />
                  <span>Account</span>
                </button>
              </div>
            </div>

            {/* Right Sub-Panel with Celoxis White Cards (from Image 2) */}
            <div className="w-[260px] bg-[#eeece8] p-4 flex flex-col gap-3 overflow-y-auto">
              {fileDrawerCards.map((card) => {
                if (card.isAi) {
                  return (
                    <div
                      key={card.id}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 cursor-pointer hover:shadow-md transition"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-neutral-900">
                        <span className="flex items-center gap-1.5">
                          <Sparkles size={13} className="text-amber-500" />
                          {card.title}
                        </span>
                        <ChevronRight size={14} className="text-neutral-400" />
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-2 leading-relaxed">
                        {card.desc}{' '}
                        <strong className="text-neutral-900 block mt-0.5">
                          {card.badge}
                        </strong>
                      </p>
                      {/* Mini visual grid */}
                      <div className="mt-3 grid grid-cols-4 gap-1 p-2 bg-neutral-50 rounded-lg">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 rounded-sm ${
                              i % 2 === 0 ? 'bg-amber-400' : 'bg-neutral-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={card.id}
                    className="bg-white rounded-2xl p-3.5 shadow-sm border border-neutral-100 flex items-center justify-between cursor-pointer hover:shadow-md transition group"
                  >
                    <div>
                      <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-black">
                        {card.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {card.count}
                      </p>
                    </div>
                    <ChevronRight
                      size={15}
                      className="text-neutral-400 group-hover:text-neutral-800 transition-transform group-hover:translate-x-0.5"
                    />
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}