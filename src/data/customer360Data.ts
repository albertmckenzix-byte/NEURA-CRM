export interface TimelineItem {
  id: string;
  type: 'call' | 'note' | 'email' | 'meeting' | 'stage_change';
  title: string;
  description: string;
  author: string;
  timestamp: string;
  outcome?: string;
  duration?: string;
  tag?: string;
}

export interface AssociatedDeal {
  id: string;
  title: string;
  value: string;
  stage: string;
  closeDate: string;
  probability: number;
}

export interface AssociatedContact {
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary?: boolean;
}

export interface CustomerFile {
  name: string;
  size: string;
  date: string;
  type: string;
}

export interface Customer360Profile {
  id: string;
  type: 'contact' | 'deal';
  name: string;
  role?: string;
  company: string;
  email?: string;
  phone?: string;
  owner: string;
  status: string;
  tier?: string;
  dealValue?: string;
  stage?: string;
  health?: 'On Track' | 'Off Track' | 'Delayed';
  lifetimeValue?: string;
  mrr?: string;
  renewalDate?: string;
  contacts: AssociatedContact[];
  deals: AssociatedDeal[];
  files: CustomerFile[];
  timeline: TimelineItem[];
}

export const sampleProfiles: Record<string, Customer360Profile> = {
  'user-1': {
    id: 'user-1',
    type: 'contact',
    name: 'Sofia Marin',
    role: 'VP of Finance & Operations',
    company: 'Ledgerly',
    email: 'sofia@ledgerly.com',
    phone: '+1 (415) 892-4102',
    owner: 'Albert Mckenzie',
    status: 'Active Customer',
    tier: 'Enterprise Team',
    mrr: '$2,450/mo',
    lifetimeValue: '$38,200',
    renewalDate: 'Dec 15, 2026',
    contacts: [
      { name: 'Sofia Marin', role: 'VP Operations', email: 'sofia@ledgerly.com', phone: '+1 415-892-4102', isPrimary: true },
      { name: 'Marcus Vance', role: 'CTO', email: 'marcus@ledgerly.com', phone: '+1 415-892-4115' },
    ],
    deals: [
      { id: 'd-101', title: 'Ledgerly Global Multi-seat Expansion', value: '$29,400', stage: 'Negotiation', closeDate: 'Dec 22, 2026', probability: 85 },
      { id: 'd-102', title: 'Q1 API Security Add-on', value: '$8,500', stage: 'Won', closeDate: 'Oct 14, 2026', probability: 100 },
    ],
    files: [
      { name: 'Master_Services_Agreement_Ledgerly.pdf', size: '2.4 MB', date: 'Oct 12, 2026', type: 'PDF' },
      { name: 'Q4_Security_Compliance_Audit.pdf', size: '1.1 MB', date: 'Nov 02, 2026', type: 'PDF' },
      { name: 'Pricing_Proposal_Tier3.xlsx', size: '480 KB', date: 'Nov 18, 2026', type: 'Spreadsheet' },
    ],
    timeline: [
      {
        id: 't-1',
        type: 'call',
        title: 'Quarterly Executive Review Call',
        description: 'Discussed seat adoption across North America. Sofia confirmed satisfaction with the reporting module and requested procurement paperwork for 25 additional seats.',
        author: 'Albert Mckenzie',
        timestamp: 'Today at 10:30 AM',
        outcome: 'Connected (Positive)',
        duration: '26 mins',
        tag: 'Executive',
      },
      {
        id: 't-2',
        type: 'email',
        title: 'Sent: Enterprise Agreement Draft & Pricing Sheet',
        description: 'Attached updated redlines including custom SLA clauses for Europe region deployment. Awaiting legal sign-off from Marcus.',
        author: 'Albert Mckenzie',
        timestamp: 'Yesterday at 3:15 PM',
        tag: 'Procurement',
      },
      {
        id: 't-3',
        type: 'stage_change',
        title: 'Deal Moved to Negotiation',
        description: 'Global Multi-seat Expansion deal moved from Proposal to Negotiation. Expected close probability raised to 85%.',
        author: 'System Automation',
        timestamp: 'Nov 20, 2026',
        tag: 'Pipeline',
      },
      {
        id: 't-4',
        type: 'note',
        title: 'Internal Account Note',
        description: 'Budget cycle resets in January. Mentioned potential interest in our automated billing connector module.',
        author: 'Sarah Lee',
        timestamp: 'Nov 16, 2026',
        tag: 'Note',
      },
      {
        id: 't-5',
        type: 'meeting',
        title: 'Product Walkthrough with Tech Lead',
        description: 'Demoed webhook subscriptions and data export formats to engineering team. No security objections raised.',
        author: 'Albert Mckenzie',
        timestamp: 'Nov 10, 2026',
        outcome: 'Completed',
        duration: '45 mins',
        tag: 'Technical Demo',
      },
    ],
  },
  'p1': {
    id: 'p1',
    type: 'deal',
    name: 'Website Redesign',
    role: 'Enterprise Project & Contract',
    company: 'Apex Media Corp',
    owner: 'Albert Mckenzie',
    status: 'In Progress',
    dealValue: '$48,000',
    stage: 'In Progress (68%)',
    health: 'On Track',
    mrr: '$4,000/mo',
    lifetimeValue: '$96,000',
    renewalDate: 'Apr 22, 2027',
    contacts: [
      { name: 'Rachel Ross', role: 'Head of Brand', email: 'rachel@apexmedia.io', phone: '+1 (555) 321-9944', isPrimary: true },
      { name: 'Koji Tanaka', role: 'VP Product', email: 'koji@apexmedia.io', phone: '+1 (555) 321-9922' },
    ],
    deals: [
      { id: 'dp-1', title: 'Phase 1: Design System & UX Refresh', value: '$32,000', stage: 'In Progress', closeDate: 'Apr 22, 2026', probability: 70 },
      { id: 'dp-2', title: 'Phase 2: Customer Portal Engine', value: '$16,000', stage: 'Proposal', closeDate: 'Jun 15, 2026', probability: 50 },
    ],
    files: [
      { name: 'Apex_Brand_Guidelines_v4.pdf', size: '14.2 MB', date: 'Oct 20, 2026', type: 'PDF' },
      { name: 'Scope_of_Work_Redesign_Signed.pdf', size: '3.6 MB', date: 'Nov 01, 2026', type: 'PDF' },
      { name: 'Milestone_Deliverables_Schedule.xlsx', size: '210 KB', date: 'Nov 12, 2026', type: 'Spreadsheet' },
    ],
    timeline: [
      {
        id: 'tp-1',
        type: 'meeting',
        title: 'Weekly Sprint & Milestone Review',
        description: 'Reviewed homepage and dashboard layout components with Rachel. Received approval on navigation bar and mobile layouts.',
        author: 'Albert Mckenzie',
        timestamp: 'Today at 11:00 AM',
        duration: '35 mins',
        tag: 'Sprint Review',
      },
      {
        id: 'tp-2',
        type: 'call',
        title: 'Asset Delivery Sync with Design Team',
        description: 'Clarified export specifications for SVG glyphs and typography token mappings. All assets delivered via shared drive.',
        author: 'Albert Mckenzie',
        timestamp: 'Nov 21, 2026',
        outcome: 'Connected',
        duration: '18 mins',
      },
      {
        id: 'tp-3',
        type: 'note',
        title: 'Design Approval Milestone Cleared',
        description: 'Stage 2 milestone invoice approved by finance department. Next delivery target scheduled for Dec 05.',
        author: 'John Carter',
        timestamp: 'Nov 18, 2026',
      },
    ],
  },
};

// Generates a complete Customer 360 profile dynamically for any clicked record
export function getOrCreateProfile(
  id: string,
  fallbackName: string,
  fallbackCompany: string,
  fallbackType: 'contact' | 'deal' = 'contact',
  extra?: Partial<Customer360Profile>
): Customer360Profile {
  if (sampleProfiles[id]) {
    return sampleProfiles[id];
  }

  const cleanEmail = `${fallbackName.toLowerCase().replace(/\s+/g, '.')}@${fallbackCompany.toLowerCase().replace(/[^a-z0-9]/g, '') || 'company'}.com`;

  return {
    id,
    type: fallbackType,
    name: fallbackName,
    role: fallbackType === 'contact' ? 'Executive Director' : 'Strategic Engagement',
    company: fallbackCompany || 'Enterprise Account',
    email: cleanEmail,
    phone: '+1 (555) 438-9200',
    owner: 'Albert Mckenzie',
    status: extra?.status || (fallbackType === 'deal' ? 'Active Deal' : 'Active Account'),
    tier: 'Enterprise Growth',
    dealValue: extra?.dealValue || '$54,000',
    stage: extra?.stage || 'Negotiation',
    health: 'On Track',
    lifetimeValue: '$72,500',
    mrr: '$3,200/mo',
    renewalDate: 'Nov 15, 2027',
    contacts: [
      {
        name: fallbackName,
        role: fallbackType === 'contact' ? 'Decision Maker' : 'Project Sponsor',
        email: cleanEmail,
        phone: '+1 (555) 438-9200',
        isPrimary: true,
      },
      {
        name: 'Elena Rostova',
        role: 'Commercial Lead',
        email: `elena@${fallbackCompany.toLowerCase().replace(/[^a-z0-9]/g, '') || 'company'}.com`,
        phone: '+1 (555) 438-9214',
      },
    ],
    deals: [
      {
        id: `deal-${id}-1`,
        title: `${fallbackCompany} Strategic Rollout`,
        value: extra?.dealValue || '$54,000',
        stage: 'Negotiation',
        closeDate: 'Jan 15, 2027',
        probability: 75,
      },
    ],
    files: [
      { name: `${fallbackCompany.replace(/\s+/g, '_')}_Proposal_v2.pdf`, size: '3.8 MB', date: 'Nov 14, 2026', type: 'PDF' },
      { name: 'Standard_NDA_Executed.pdf', size: '1.2 MB', date: 'Oct 08, 2026', type: 'PDF' },
    ],
    timeline: [
      {
        id: `tl-${Date.now()}-1`,
        type: 'call',
        title: 'Initial Discovery & Value Assessment',
        description: `Connected with ${fallbackName} to align on Q4 business targets, team seat requirements, and SLA expectations.`,
        author: 'Albert Mckenzie',
        timestamp: '2 hours ago',
        outcome: 'Connected (High Interest)',
        duration: '22 mins',
      },
      {
        id: `tl-${Date.now()}-2`,
        type: 'email',
        title: `Sent: Custom Solution Overview & ROI Projection`,
        description: `Delivered tailored presentation deck highlighting automation efficiency metrics and implementation timeline.`,
        author: 'Albert Mckenzie',
        timestamp: 'Yesterday at 4:20 PM',
      },
      {
        id: `tl-${Date.now()}-3`,
        type: 'note',
        title: 'Account Strategy Note',
        description: 'Key priority is single sign-on (SSO) integration and automated monthly invoice export.',
        author: 'Albert Mckenzie',
        timestamp: 'Nov 19, 2026',
      },
    ],
    ...extra,
  };
}