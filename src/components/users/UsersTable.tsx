import { useState } from 'react';
import type { User } from '../../data/mockUsers';

interface UsersTableProps {
  users: User[];
  searchQuery?: string;
  activeTab?: string;
  onSelectUser?: (user: User) => void;
}

export default function UsersTable({ users, onSelectUser }: UsersTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isAllSelected = users.length > 0 && selectedIds.length === users.length;
  const isPartiallySelected =
    selectedIds.length > 0 && selectedIds.length < users.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(users.map((u) => u.id));
    }
  };

  const handleToggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

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
            <span className="text-[12px] text-neutral-400">Inactive</span>
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
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white rounded-[26px] overflow-hidden shadow-sm border border-neutral-100 select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50/50 text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
              <th className="py-3.5 pl-6 pr-3 w-10">
                <input
                  type="checkbox"
                  aria-label="Select all users"
                  checked={isAllSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isPartiallySelected;
                  }}
                  onChange={handleSelectAll}
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-0 cursor-pointer w-4 h-4"
                />
              </th>
              <th className="py-3.5 px-3">User</th>
              <th className="py-3.5 px-3">Company</th>
              <th className="py-3.5 px-3">Plan</th>
              <th className="py-3.5 px-3">Status</th>
              <th className="py-3.5 px-3">Usage</th>
              <th className="py-3.5 pr-6 text-right">Last seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 text-xs">
            {users.map((user) => {
              const isSelected = selectedIds.includes(user.id);
              return (
                <tr
                  key={user.id}
                  onClick={() => onSelectUser?.(user)}
                  className={`hover:bg-neutral-50/70 transition-colors cursor-pointer group ${
                    isSelected ? 'bg-neutral-50' : ''
                  }`}
                >
                  <td className="py-3.5 pl-6 pr-3">
                    <input
                      type="checkbox"
                      aria-label={`Select ${user.name}`}
                      checked={isSelected}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => handleToggleRow(user.id)}
                      className="rounded border-neutral-300 text-neutral-900 focus:ring-0 cursor-pointer w-4 h-4"
                    />
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-700 font-bold text-xs shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-neutral-900 leading-tight group-hover:text-blue-600 transition-colors">
                          {user.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-neutral-700">
                    {user.company}
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] ${getPlanBadgeClass(
                        user.plan
                      )}`}
                    >
                      {user.plan}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">{renderStatus(user)}</td>
                  <td className="py-3.5 px-3 font-bold text-neutral-900">
                    {user.usageSessions} / {user.usageMax}
                  </td>
                  <td className="py-3.5 pr-6 text-right text-neutral-400 font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <span>{user.lastSeen}</span>
                      <span className="text-neutral-400 group-hover:text-neutral-900 font-semibold px-2 py-0.5 rounded-full hover:bg-neutral-100 transition">
                        360 View ›
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}