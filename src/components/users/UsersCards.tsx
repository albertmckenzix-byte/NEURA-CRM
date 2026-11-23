import type { User } from '../../data/mockUsers';

interface UsersCardsProps {
  users: User[];
  onSelectUser?: (user: User) => void;
}

export default function UsersCards({ users, onSelectUser }: UsersCardsProps) {
  const getPlanBadgeClass = (plan: User['plan']) => {
    switch (plan) {
      case 'Free':
        return 'bg-neutral-100 text-neutral-600 border border-neutral-200';
      case 'Pro':
        return 'bg-amber-50 text-amber-800 border border-amber-200 font-semibold';
      case 'Team':
        return 'bg-sky-50 text-sky-800 border border-sky-200 font-semibold';
      case 'Enterprise':
        return 'bg-neutral-900 text-white font-semibold';
      default:
        return 'bg-neutral-100 text-neutral-600 border border-neutral-200';
    }
  };

  const renderStatus = (user: User) => {
    switch (user.status) {
      case 'Active':
        return (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-[12px] text-neutral-800 font-medium">Active</span>
          </div>
        );
      case 'Inactive':
        return (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-neutral-300 shrink-0" />
            <span className="text-[12px] text-neutral-400 font-medium">Inactive</span>
          </div>
        );
      case 'Trial':
        return (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span className="text-[12px] text-amber-700 font-medium">
              Trial · {user.trialDaysLeft ?? 0}d left
            </span>
          </div>
        );
      case 'Invited':
        return (
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
            <span className="text-[12px] text-sky-700 font-medium">Invited</span>
          </div>
        );
    }
  };

  if (users.length === 0) {
    return (
      <div className="bg-white rounded-[26px] p-12 text-center text-neutral-400 text-xs border border-neutral-100">
        No users found matching your filters.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => onSelectUser?.(user)}
          className="bg-white rounded-[24px] p-5 shadow-sm border border-neutral-100 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group hover:-translate-y-0.5"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800 font-bold text-sm shrink-0">
                {user.name.charAt(0)}
              </div>
              <div>
                <h4 className="text-sm font-bold text-neutral-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {user.name}
                </h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">{user.email}</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-neutral-400 group-hover:text-neutral-900 transition">
              360 ›
            </span>
          </div>

          <div className="my-4 pt-3 border-t border-neutral-100 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Company</span>
              <span className="font-semibold text-neutral-800">{user.company}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Status</span>
              <span>{renderStatus(user)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Plan</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] ${getPlanBadgeClass(
                  user.plan
                )}`}
              >
                {user.plan}
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
            <span className="font-bold text-neutral-900">{user.usageSessions} sessions</span>
            <span className="text-neutral-400 text-[11px]">{user.lastSeen}</span>
          </div>
        </div>
      ))}
    </div>
  );
}