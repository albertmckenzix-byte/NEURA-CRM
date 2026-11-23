import { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Users,
  Phone,
  Mail,
  Building2,
  Table2,
  LayoutGrid,
  Crown,
} from 'lucide-react';
import { initialContacts, type Contact } from '../data/crmData';
import Customer360Drawer from '../components/crm/Customer360Drawer';
import { getOrCreateProfile, type Customer360Profile } from '../data/customer360Data';

type DecisionFilter = 'all' | 'Primary Decision Maker' | 'Executive Sponsor' | 'Technical Buyer' | 'Champion';
type ViewMode = 'table' | 'cards';

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [filterTab, setFilterTab] = useState<DecisionFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Customer 360 State
  const [selected360Profile, setSelected360Profile] = useState<Customer360Profile | null>(null);
  const [is360DrawerOpen, setIs360DrawerOpen] = useState(false);

  // New Contact form
  const [newName, setNewName] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('Ledgerly Technologies');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newStatus, setNewStatus] = useState<Contact['decisionMakerStatus']>('Primary Decision Maker');

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) => {
      if (filterTab !== 'all' && c.decisionMakerStatus !== filterTab) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = c.name.toLowerCase().includes(q);
        const matchTitle = c.title.toLowerCase().includes(q);
        const matchCompany = c.company.toLowerCase().includes(q);
        const matchEmail = c.email.toLowerCase().includes(q);
        if (!matchName && !matchTitle && !matchCompany && !matchEmail) return false;
      }
      return true;
    });
  }, [contacts, filterTab, searchQuery]);

  const handleOpen360 = (contact: Contact) => {
    const profile = getOrCreateProfile(contact.id, contact.name, contact.company, 'contact', {
      email: contact.email,
      phone: contact.directPhone,
      role: `${contact.title} (${contact.decisionMakerStatus})`,
      status: contact.lifecycleStage,
      tier: contact.decisionMakerStatus,
      owner: contact.owner,
    });
    setSelected360Profile(profile);
    setIs360DrawerOpen(true);
  };

  const handleCreateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const initials = newName
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();

    const created: Contact = {
      id: `contact-${Date.now()}`,
      name: newName.trim(),
      title: newTitle.trim() || 'Key Stakeholder',
      companyId: 'acc-1',
      company: newCompany.trim() || 'Enterprise Account',
      email: newEmail.trim(),
      directPhone: newPhone.trim() || '+1 (555) 234-5678',
      decisionMakerStatus: newStatus,
      lifecycleStage: 'Sales Qualified',
      owner: 'Albert Mckenzie',
      avatarInitials: initials,
      avatarColor: '#2b2926',
      lastContacted: 'Just now',
      dealsCount: 1,
    };

    setContacts([created, ...contacts]);
    setNewName('');
    setNewTitle('');
    setNewEmail('');
    setNewPhone('');
    setIsAddModalOpen(false);
  };

  const totalContacts = contacts.length;
  const decisionMakersCount = contacts.filter((c) => c.decisionMakerStatus === 'Primary Decision Maker').length;
  const sponsorsCount = contacts.filter((c) => c.decisionMakerStatus === 'Executive Sponsor').length;
  const championsCount = contacts.filter((c) => c.decisionMakerStatus === 'Champion').length;

  const getDecisionBadge = (status: Contact['decisionMakerStatus']) => {
    switch (status) {
      case 'Primary Decision Maker':
        return 'bg-amber-50 text-amber-900 border-amber-200/80 font-bold';
      case 'Executive Sponsor':
        return 'bg-purple-50 text-purple-800 border-purple-200/80';
      case 'Technical Buyer':
        return 'bg-blue-50 text-blue-800 border-blue-200/80';
      case 'Champion':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      case 'Economic Buyer':
        return 'bg-rose-50 text-rose-800 border-rose-200/80';
      default:
        return 'bg-neutral-100 text-neutral-700 border-neutral-200';
    }
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white border border-neutral-200/60 shadow-sm flex items-center justify-center text-neutral-900">
            <Users size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Contacts & Stakeholders
              </h1>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-white border border-neutral-200/60 text-neutral-700 shadow-sm">
                {totalContacts} Contacts
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              People at client organizations with direct phone, email, and decision-maker status.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* View mode switcher */}
          <div className="flex items-center bg-white/70 p-1 rounded-2xl border border-neutral-200/60 shadow-xs">
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
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-xl transition ${
                viewMode === 'cards' ? 'bg-neutral-950 text-white shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
              title="Card View"
            >
              <LayoutGrid size={15} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus size={14} />
            <span>New Contact</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Total Contacts</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">{totalContacts}</div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+4 this mo</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Across 6 enterprise accounts</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Primary Decision Makers</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">{decisionMakersCount}</div>
            <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Budget Authority</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Direct signing authorization</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Executive Sponsors</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">{sponsorsCount}</div>
            <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">C-Suite & VP</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Strategic roadmap champions</div>
        </div>

        <div className="p-5 rounded-[24px] bg-white border border-neutral-100 shadow-sm">
          <div className="text-xs font-medium text-neutral-400 mb-1">Champions & Technicals</div>
          <div className="flex items-baseline justify-between">
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">{championsCount + 1}</div>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Engaged</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-2">Daily product advocates</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-sm overflow-x-auto shrink-0">
          {[
            { id: 'all', label: `All (${totalContacts})` },
            { id: 'Primary Decision Maker', label: `Decision Makers (${decisionMakersCount})` },
            { id: 'Executive Sponsor', label: `Exec Sponsors (${sponsorsCount})` },
            { id: 'Technical Buyer', label: `Technical Buyers (1)` },
            { id: 'Champion', label: `Champions (${championsCount})` },
          ].map((tab) => {
            const isSelected = filterTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterTab(tab.id as DecisionFilter)}
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
            placeholder="Search contacts by name, company, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-400 shadow-sm"
          />
        </div>
      </div>

      {/* Contacts List / Table */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-[28px] border border-neutral-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-100 bg-[#faf9f6]/70 text-neutral-400 font-medium">
                  <th className="py-3.5 pl-6 pr-4">Contact Person</th>
                  <th className="py-3.5 px-4">Organization & Title</th>
                  <th className="py-3.5 px-4">Decision-Maker Status</th>
                  <th className="py-3.5 px-4">Direct Phone</th>
                  <th className="py-3.5 px-4">Email</th>
                  <th className="py-3.5 px-4">Owner</th>
                  <th className="py-3.5 pl-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 text-neutral-700">
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-neutral-400 text-xs">
                      No contacts found matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      onClick={() => handleOpen360(contact)}
                      className="hover:bg-[#faf9f6] transition-colors cursor-pointer group"
                    >
                      {/* Person */}
                      <td className="py-4 pl-6 pr-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs"
                            style={{ backgroundColor: contact.avatarColor }}
                          >
                            {contact.avatarInitials}
                          </div>
                          <div>
                            <div className="font-semibold text-neutral-900 group-hover:text-black">
                              {contact.name}
                            </div>
                            <div className="text-[10px] text-neutral-400">
                              Active in {contact.dealsCount} deal(s)
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Company & Title */}
                      <td className="py-4 px-4">
                        <div className="font-medium text-neutral-900">{contact.title}</div>
                        <div className="text-[11px] text-neutral-500 mt-0.5 flex items-center gap-1">
                          <Building2 size={11} className="text-neutral-400" />
                          <span>{contact.company}</span>
                        </div>
                      </td>

                      {/* Decision-Maker Status */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] border ${getDecisionBadge(
                            contact.decisionMakerStatus
                          )}`}
                        >
                          {contact.decisionMakerStatus === 'Primary Decision Maker' && (
                            <Crown size={11} className="text-amber-600" />
                          )}
                          <span>{contact.decisionMakerStatus}</span>
                        </span>
                      </td>

                      {/* Phone */}
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={`tel:${contact.directPhone}`}
                          className="inline-flex items-center gap-1.5 text-xs text-neutral-700 hover:text-black transition"
                        >
                          <Phone size={12} className="text-neutral-400" />
                          <span>{contact.directPhone}</span>
                        </a>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-4" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={`mailto:${contact.email}`}
                          className="inline-flex items-center gap-1.5 text-xs text-neutral-700 hover:text-black transition"
                        >
                          <Mail size={12} className="text-neutral-400" />
                          <span>{contact.email}</span>
                        </a>
                      </td>

                      {/* Owner */}
                      <td className="py-4 px-4">
                        <div className="text-xs font-medium text-neutral-800">{contact.owner}</div>
                        <div className="text-[10px] text-neutral-400">Touchpoint: {contact.lastContacted}</div>
                      </td>

                      {/* Action */}
                      <td className="py-4 pl-4 pr-6 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpen360(contact);
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
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleOpen360(contact)}
              className="bg-white rounded-[26px] p-5 border border-neutral-100 shadow-sm hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs"
                      style={{ backgroundColor: contact.avatarColor }}
                    >
                      {contact.avatarInitials}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 group-hover:text-black text-sm">
                        {contact.name}
                      </h3>
                      <p className="text-xs text-neutral-500">{contact.title}</p>
                    </div>
                  </div>
                  <span
                    className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded-full border ${getDecisionBadge(
                      contact.decisionMakerStatus
                    )}`}
                  >
                    {contact.decisionMakerStatus}
                  </span>
                </div>

                <div className="pt-3 border-t border-neutral-100 space-y-1.5 text-xs text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Building2 size={12} className="text-neutral-400" />
                    <span className="font-medium text-neutral-800">{contact.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-neutral-400" />
                    <a
                      href={`mailto:${contact.email}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-black"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-neutral-400" />
                    <a
                      href={`tel:${contact.directPhone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="hover:text-black"
                    >
                      {contact.directPhone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px]">
                <span className="text-neutral-400">Owner: {contact.owner}</span>
                <span className="font-semibold text-neutral-800 group-hover:text-black flex items-center gap-1">
                  View Profile ›
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Customer 360 Drawer */}
      <Customer360Drawer
        isOpen={is360DrawerOpen}
        onClose={() => setIs360DrawerOpen(false)}
        profile={selected360Profile}
      />

      {/* New Contact Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-xs p-4">
          <div className="bg-white rounded-[32px] p-6 max-w-lg w-full border border-neutral-100 shadow-[0_25px_60px_rgba(0,0,0,0.15)] animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
                  <Users size={14} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Add New Contact</h3>
                  <p className="text-[11px] text-neutral-400">Add key stakeholder at a company</p>
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

            <form onSubmit={handleCreateContact} className="mt-4 space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rachel Ross"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. VP of Product"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Media Corp"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Decision-Maker Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) =>
                      setNewStatus(e.target.value as Contact['decisionMakerStatus'])
                    }
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 focus:outline-none focus:bg-white"
                  >
                    <option value="Primary Decision Maker">Primary Decision Maker</option>
                    <option value="Executive Sponsor">Executive Sponsor</option>
                    <option value="Technical Buyer">Technical Buyer</option>
                    <option value="Economic Buyer">Economic Buyer</option>
                    <option value="Champion">Champion</option>
                    <option value="End User">End User</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rachel@apexmedia.io"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-neutral-600 mb-1">
                    Direct Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (212) 555-0145"
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-xl px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:bg-white"
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
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
