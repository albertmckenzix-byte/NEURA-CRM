export interface Lead {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  phoneSecond?: string;
  mobile?: string;
  role?: string;
  website?: string;
  industry?: string;
  source: 'Website Inbound' | 'LinkedIn Referral' | 'Webinar Demo' | 'Outbound Campaign' | 'Event / Conference' | 'Partner Referral';
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  lastCaller?: string;
  nextFollowUp?: string;
  score: number; // 0-100
  estValue: string;
  assignedTo: string;
  // Address Information
  country?: string;
  city?: string;
  province?: string;
  street?: string;
  postalCode?: string;
  // Description Information
  description?: string;
  createdAt: string;
  notes?: string;
}

export interface Account {
  id: string;
  name: string;
  domain: string;
  industry: 'Fintech' | 'Healthcare & Biotech' | 'AI & Cloud Infrastructure' | 'Logistics & Supply' | 'Enterprise SaaS' | 'Media & Entertainment';
  size: '10-50' | '50-200' | '250-500' | '500-1,000' | '1,000+ employees';
  annualRevenue: string; // e.g. $14.2M ARR
  tier: 'Enterprise' | 'Mid-Market' | 'Growth SMB';
  owner: string;
  health: 'Healthy' | 'At Risk' | 'Expanding';
  contactsCount: number;
  openDealsValue: string;
  country: string;
  city: string;
}

export interface Contact {
  id: string;
  name: string;
  title: string;
  companyId: string;
  company: string;
  email: string;
  directPhone: string;
  decisionMakerStatus: 'Primary Decision Maker' | 'Executive Sponsor' | 'Technical Buyer' | 'Economic Buyer' | 'Champion' | 'End User';
  lifecycleStage: 'Lead' | 'Sales Qualified' | 'Active Customer' | 'Advocate';
  owner: string;
  avatarInitials: string;
  avatarColor: string;
  lastContacted: string;
  dealsCount: number;
}

export interface DealOpportunity {
  id: string;
  title: string;
  accountId: string;
  accountName: string;
  primaryContactId: string;
  primaryContactName: string;
  value: number; // numeric in USD
  stage: 'Lead In' | 'Discovery' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';
  expectedCloseDate: string;
  winProbability: number; // 0 - 100%
  owner: string;
  priority: 'High' | 'Medium' | 'Low';
  health: 'On Track' | 'Off Track' | 'Delayed';
  type: 'New Business' | 'Expansion' | 'Renewal' | 'Add-on';
}

export interface CRMActivity {
  id: string;
  type: 'call' | 'email' | 'task' | 'meeting' | 'note';
  subject: string;
  description: string;
  timestamp: string;
  author: string;
  linkedContactName?: string;
  linkedContactEmail?: string;
  linkedAccountName?: string;
  linkedDealTitle?: string;
  outcome?: string;
  duration?: string;
  status: 'Completed' | 'Pending' | 'Scheduled' | 'Overdue';
  priority?: 'High' | 'Medium' | 'Low';
  dueDate?: string;
}

// 1. Initial Leads
export const initialLeads: Lead[] = [
  {
    id: 'lead-1',
    name: 'Marcus Sterling',
    title: 'VP of Growth & Strategy',
    company: 'Apex Fintech Solutions',
    email: 'marcus.sterling@apexfin.com',
    phone: '+1 (415) 892-3401',
    source: 'Website Inbound',
    status: 'Qualified',
    score: 94,
    estValue: '$48,000',
    assignedTo: 'Albert Mckenzie',
    createdAt: '2 days ago',
    notes: 'Requested security compliance sheet and enterprise SLA terms.',
  },
  {
    id: 'lead-2',
    name: 'Elena Rostova',
    title: 'Chief Information Officer',
    company: 'Nordic AI Solutions',
    email: 'elena.rostova@nordicai.io',
    phone: '+46 8 123 4567',
    source: 'LinkedIn Referral',
    status: 'New',
    score: 88,
    estValue: '$65,000',
    assignedTo: 'Albert Mckenzie',
    createdAt: 'Just now',
    notes: 'Referred by CTO after keynote presentation.',
  },
  {
    id: 'lead-3',
    name: 'Chloe Vance',
    title: 'Director of Logistics Operations',
    company: 'Vance Freight Logistics',
    email: 'chloe@vance.logistics',
    phone: '+1 (312) 555-0199',
    source: 'Webinar Demo',
    status: 'Contacted',
    score: 76,
    estValue: '$32,000',
    assignedTo: 'Ines Becker',
    createdAt: 'Yesterday',
    notes: 'Attended the high-volume fleet tracking workshop.',
  },
  {
    id: 'lead-4',
    name: 'Liam Takahashi',
    title: 'Head of Digital Transformation',
    company: 'Tokyo Media Lab',
    email: 'liam.t@tokyomedia.jp',
    phone: '+81 3 5555 0143',
    source: 'Event / Conference',
    status: 'Contacted',
    score: 69,
    estValue: '$24,000',
    assignedTo: 'Kwame Mensah',
    createdAt: '3 days ago',
    notes: 'Met at SaaStr Asia; interested in multi-tenant API federation.',
  },
  {
    id: 'lead-5',
    name: 'David Kim',
    title: 'Procurement Specialist',
    company: 'Seoul BioTech Research',
    email: 'david.kim@seoulbio.kr',
    phone: '+82 2 700 8901',
    source: 'Outbound Campaign',
    status: 'Lost',
    score: 32,
    estValue: '$18,000',
    assignedTo: 'Arjun Rao',
    createdAt: '1 week ago',
    notes: 'Selected legacy incumbent vendor due to local server constraint.',
  },
  {
    id: 'lead-6',
    name: 'Siddharth Patel',
    title: 'Engineering Director',
    company: 'Prism Payments',
    email: 'siddharth@prismpay.io',
    phone: '+91 80 4455 6677',
    source: 'Partner Referral',
    status: 'Qualified',
    score: 91,
    estValue: '$84,000',
    assignedTo: 'Albert Mckenzie',
    createdAt: '4 hours ago',
    notes: 'Stripe integration partner referred directly for enterprise vaulting.',
  },
];

// 2. Initial Accounts (Companies)
export const initialAccounts: Account[] = [
  {
    id: 'acc-1',
    name: 'Ledgerly Technologies',
    domain: 'ledgerly.com',
    industry: 'Fintech',
    size: '250-500',
    annualRevenue: '$28.4M ARR',
    tier: 'Enterprise',
    owner: 'Albert Mckenzie',
    health: 'Expanding',
    contactsCount: 5,
    openDealsValue: '$37,900',
    country: 'United States',
    city: 'San Francisco, CA',
  },
  {
    id: 'acc-2',
    name: 'Northwind Labs Inc.',
    domain: 'northwindlabs.io',
    industry: 'AI & Cloud Infrastructure',
    size: '500-1,000',
    annualRevenue: '$42.0M ARR',
    tier: 'Enterprise',
    owner: 'Albert Mckenzie',
    health: 'Healthy',
    contactsCount: 6,
    openDealsValue: '$120,000',
    country: 'United States',
    city: 'Seattle, WA',
  },
  {
    id: 'acc-3',
    name: 'Kite Health Systems',
    domain: 'kitehealth.com',
    industry: 'Healthcare & Biotech',
    size: '1,000+ employees',
    annualRevenue: '$85.5M ARR',
    tier: 'Enterprise',
    owner: 'Ines Becker',
    health: 'Healthy',
    contactsCount: 4,
    openDealsValue: '$95,000',
    country: 'United Kingdom',
    city: 'London',
  },
  {
    id: 'acc-4',
    name: 'Apex Media Corp',
    domain: 'apexmedia.io',
    industry: 'Media & Entertainment',
    size: '50-200',
    annualRevenue: '$14.2M ARR',
    tier: 'Mid-Market',
    owner: 'Albert Mckenzie',
    health: 'Expanding',
    contactsCount: 3,
    openDealsValue: '$48,000',
    country: 'United States',
    city: 'New York, NY',
  },
  {
    id: 'acc-5',
    name: 'Orbitpay Global',
    domain: 'orbitpay.network',
    industry: 'Fintech',
    size: '50-200',
    annualRevenue: '$9.8M ARR',
    tier: 'Mid-Market',
    owner: 'Kwame Mensah',
    health: 'At Risk',
    contactsCount: 2,
    openDealsValue: '$65,000',
    country: 'Germany',
    city: 'Berlin',
  },
  {
    id: 'acc-6',
    name: 'Brightloop Studios',
    domain: 'brightloop.design',
    industry: 'Enterprise SaaS',
    size: '10-50',
    annualRevenue: '$3.5M ARR',
    tier: 'Growth SMB',
    owner: 'Arjun Rao',
    health: 'Healthy',
    contactsCount: 2,
    openDealsValue: '$24,000',
    country: 'Canada',
    city: 'Toronto',
  },
];

// 3. Initial Contacts (People at companies)
export const initialContacts: Contact[] = [
  {
    id: 'contact-1',
    name: 'Sofia Marin',
    title: 'VP of Finance & Operations',
    companyId: 'acc-1',
    company: 'Ledgerly Technologies',
    email: 'sofia@ledgerly.com',
    directPhone: '+1 (415) 349-2041',
    decisionMakerStatus: 'Primary Decision Maker',
    lifecycleStage: 'Active Customer',
    owner: 'Albert Mckenzie',
    avatarInitials: 'SM',
    avatarColor: '#2b2926',
    lastContacted: '2 hours ago',
    dealsCount: 2,
  },
  {
    id: 'contact-2',
    name: 'Marcus Vance',
    title: 'Chief Technology Officer',
    companyId: 'acc-1',
    company: 'Ledgerly Technologies',
    email: 'marcus@ledgerly.com',
    directPhone: '+1 (415) 349-2042',
    decisionMakerStatus: 'Technical Buyer',
    lifecycleStage: 'Active Customer',
    owner: 'Albert Mckenzie',
    avatarInitials: 'MV',
    avatarColor: '#475569',
    lastContacted: 'Yesterday',
    dealsCount: 2,
  },
  {
    id: 'contact-3',
    name: 'Daniel Brooks',
    title: 'Chief Enterprise Architect',
    companyId: 'acc-2',
    company: 'Northwind Labs Inc.',
    email: 'daniel@northwindlabs.io',
    directPhone: '+1 (206) 555-0184',
    decisionMakerStatus: 'Executive Sponsor',
    lifecycleStage: 'Sales Qualified',
    owner: 'Albert Mckenzie',
    avatarInitials: 'DB',
    avatarColor: '#334155',
    lastContacted: 'Today, 11:30 AM',
    dealsCount: 1,
  },
  {
    id: 'contact-4',
    name: 'Aisha Rahman',
    title: 'VP of Information Security',
    companyId: 'acc-3',
    company: 'Kite Health Systems',
    email: 'aisha@kitehealth.com',
    directPhone: '+44 20 7946 0912',
    decisionMakerStatus: 'Primary Decision Maker',
    lifecycleStage: 'Sales Qualified',
    owner: 'Ines Becker',
    avatarInitials: 'AR',
    avatarColor: '#1e293b',
    lastContacted: '3 days ago',
    dealsCount: 1,
  },
  {
    id: 'contact-5',
    name: 'Rachel Ross',
    title: 'Head of Brand & Growth',
    companyId: 'acc-4',
    company: 'Apex Media Corp',
    email: 'rachel.ross@apexmedia.io',
    directPhone: '+1 (212) 555-0145',
    decisionMakerStatus: 'Economic Buyer',
    lifecycleStage: 'Active Customer',
    owner: 'Albert Mckenzie',
    avatarInitials: 'RR',
    avatarColor: '#0f172a',
    lastContacted: '4 hours ago',
    dealsCount: 2,
  },
  {
    id: 'contact-6',
    name: 'Koji Tanaka',
    title: 'VP of Product Engineering',
    companyId: 'acc-4',
    company: 'Apex Media Corp',
    email: 'koji.tanaka@apexmedia.io',
    directPhone: '+1 (212) 555-0148',
    decisionMakerStatus: 'Champion',
    lifecycleStage: 'Active Customer',
    owner: 'Albert Mckenzie',
    avatarInitials: 'KT',
    avatarColor: '#3f3f46',
    lastContacted: 'Nov 18, 2026',
    dealsCount: 2,
  },
  {
    id: 'contact-7',
    name: 'Hannah Cole',
    title: 'Head of Global Payments Compliance',
    companyId: 'acc-5',
    company: 'Orbitpay Global',
    email: 'hannah.c@orbitpay.network',
    directPhone: '+49 30 901820',
    decisionMakerStatus: 'Primary Decision Maker',
    lifecycleStage: 'Sales Qualified',
    owner: 'Kwame Mensah',
    avatarInitials: 'HC',
    avatarColor: '#52525b',
    lastContacted: 'Nov 20, 2026',
    dealsCount: 1,
  },
];

// 4. Initial Deals / Opportunities
export const initialDeals: DealOpportunity[] = [
  {
    id: 'deal-1',
    title: 'Website Redesign & Portal Overhaul',
    accountId: 'acc-4',
    accountName: 'Apex Media Corp',
    primaryContactId: 'contact-5',
    primaryContactName: 'Rachel Ross',
    value: 48000,
    stage: 'Negotiation',
    expectedCloseDate: 'Apr 22, 2026',
    winProbability: 85,
    owner: 'Albert Mckenzie',
    priority: 'High',
    health: 'On Track',
    type: 'New Business',
  },
  {
    id: 'deal-2',
    title: 'Global Multi-Seat Enterprise Rollout',
    accountId: 'acc-1',
    accountName: 'Ledgerly Technologies',
    primaryContactId: 'contact-1',
    primaryContactName: 'Sofia Marin',
    value: 29400,
    stage: 'Proposal',
    expectedCloseDate: 'May 15, 2026',
    winProbability: 70,
    owner: 'Albert Mckenzie',
    priority: 'High',
    health: 'On Track',
    type: 'Expansion',
  },
  {
    id: 'deal-3',
    title: 'ERP Cloud Infrastructure Migration',
    accountId: 'acc-2',
    accountName: 'Northwind Labs Inc.',
    primaryContactId: 'contact-3',
    primaryContactName: 'Daniel Brooks',
    value: 120000,
    stage: 'Discovery',
    expectedCloseDate: 'Jun 30, 2026',
    winProbability: 50,
    owner: 'Albert Mckenzie',
    priority: 'High',
    health: 'On Track',
    type: 'New Business',
  },
  {
    id: 'deal-4',
    title: 'HIPAA Cloud Security Suite & Vault',
    accountId: 'acc-3',
    accountName: 'Kite Health Systems',
    primaryContactId: 'contact-4',
    primaryContactName: 'Aisha Rahman',
    value: 95000,
    stage: 'Lead In',
    expectedCloseDate: 'Jul 15, 2026',
    winProbability: 25,
    owner: 'Ines Becker',
    priority: 'Medium',
    health: 'Delayed',
    type: 'New Business',
  },
  {
    id: 'deal-5',
    title: 'High-Volume Checkout SDK Modernization',
    accountId: 'acc-5',
    accountName: 'Orbitpay Global',
    primaryContactId: 'contact-7',
    primaryContactName: 'Hannah Cole',
    value: 65000,
    stage: 'Won',
    expectedCloseDate: 'Nov 12, 2026',
    winProbability: 100,
    owner: 'Kwame Mensah',
    priority: 'Medium',
    health: 'On Track',
    type: 'Expansion',
  },
  {
    id: 'deal-6',
    title: 'Q1 API Security & Token Add-on',
    accountId: 'acc-1',
    accountName: 'Ledgerly Technologies',
    primaryContactId: 'contact-2',
    primaryContactName: 'Marcus Vance',
    value: 8500,
    stage: 'Won',
    expectedCloseDate: 'Oct 15, 2026',
    winProbability: 100,
    owner: 'Albert Mckenzie',
    priority: 'Low',
    health: 'On Track',
    type: 'Add-on',
  },
];

// 5. Initial Activities & Timeline items
export const initialActivities: CRMActivity[] = [
  {
    id: 'act-1',
    type: 'call',
    subject: 'Quarterly Executive Review Call',
    description: 'Reviewed active seat usage (142/200), upcoming expansion timeline, and SLA satisfaction. Sofia confirmed budget approval for Phase 2.',
    timestamp: 'Today, 2:15 PM',
    author: 'Albert Mckenzie',
    linkedContactName: 'Sofia Marin',
    linkedContactEmail: 'sofia@ledgerly.com',
    linkedAccountName: 'Ledgerly Technologies',
    linkedDealTitle: 'Global Multi-Seat Enterprise Rollout',
    outcome: 'Connected (Positive)',
    duration: '26 mins',
    status: 'Completed',
  },
  {
    id: 'act-2',
    type: 'email',
    subject: 'Drafted MSA Redline & Compliance Addendum',
    description: 'Sent revised terms incorporating GDPR clause 4.2 and customized 99.99% uptime guarantee with security appendix.',
    timestamp: 'Today, 11:30 AM',
    author: 'Albert Mckenzie',
    linkedContactName: 'Daniel Brooks',
    linkedContactEmail: 'daniel@northwindlabs.io',
    linkedAccountName: 'Northwind Labs Inc.',
    linkedDealTitle: 'ERP Cloud Infrastructure Migration',
    outcome: 'Delivered',
    status: 'Completed',
  },
  {
    id: 'act-3',
    type: 'task',
    subject: 'Send final quote Q-2026-0014 for signoff',
    description: 'Review final scope with legal team and deliver locked quote document with weekly breakdown.',
    timestamp: 'Due Today, 5:00 PM',
    author: 'Albert Mckenzie',
    linkedContactName: 'Rachel Ross',
    linkedAccountName: 'Apex Media Corp',
    linkedDealTitle: 'Website Redesign & Portal Overhaul',
    priority: 'High',
    dueDate: 'Today',
    status: 'Pending',
  },
  {
    id: 'act-4',
    type: 'meeting',
    subject: 'Enterprise Architecture & SOC2 Deep Dive',
    description: 'Presented SSO SAML 2.0 federation and zero-trust authentication architecture to engineering leads.',
    timestamp: 'Yesterday, 3:30 PM',
    author: 'Ines Becker',
    linkedContactName: 'Aisha Rahman',
    linkedContactEmail: 'aisha@kitehealth.com',
    linkedAccountName: 'Kite Health Systems',
    linkedDealTitle: 'HIPAA Cloud Security Suite & Vault',
    outcome: 'Technical Sign-off Achieved',
    duration: '45 mins',
    status: 'Completed',
  },
  {
    id: 'act-5',
    type: 'note',
    subject: 'Board meeting update on Q2 Procurement',
    description: 'Marcus noted that the board meeting is scheduled for Thursday; approval for expansion will follow immediately after.',
    timestamp: '2 days ago',
    author: 'Albert Mckenzie',
    linkedContactName: 'Marcus Vance',
    linkedAccountName: 'Ledgerly Technologies',
    linkedDealTitle: 'Global Multi-Seat Enterprise Rollout',
    status: 'Completed',
  },
  {
    id: 'act-6',
    type: 'call',
    subject: 'Discovery Call on Fleet Tracker Modernization',
    description: 'Discussed fleet depot charger integration. Chloe requested preliminary architecture diagram and pricing tier.',
    timestamp: '3 days ago',
    author: 'Ines Becker',
    linkedContactName: 'Chloe Vance',
    linkedContactEmail: 'chloe@vance.logistics',
    linkedAccountName: 'Vance Freight Logistics',
    outcome: 'Demo Scheduled',
    duration: '18 mins',
    status: 'Completed',
  },
];

export function getStoredLeads(): Lead[] {
  try {
    const raw = localStorage.getItem('neura_crm_leads');
    if (raw) return JSON.parse(raw);
  } catch {
    // fallback
  }
  return initialLeads;
}

export function saveStoredLeads(leads: Lead[]) {
  try {
    localStorage.setItem('neura_crm_leads', JSON.stringify(leads));
  } catch {
    // fallback
  }
}

export function addStoredLead(lead: Lead): Lead[] {
  const existing = getStoredLeads();
  const updated = [lead, ...existing];
  saveStoredLeads(updated);
  return updated;
}
