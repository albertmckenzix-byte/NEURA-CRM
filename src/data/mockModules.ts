export interface ModuleConfig {
  id: string;
  name: string;
  singular: string;
  iconName: string;
  description: string;
  stats: { label: string; value: string; change: string; isPositive: boolean }[];
  filterTabs: string[];
  columns: { key: string; label: string }[];
  rows: Record<string, any>[];
  addButtonLabel: string;
}

export const modulesData: Record<string, ModuleConfig> = {
  projects: {
    id: 'projects',
    name: 'Projects',
    singular: 'Project',
    iconName: 'FolderKanban',
    description: 'Track ongoing client implementations, timelines, and deliverables.',
    stats: [
      { label: 'Active Projects', value: '18', change: '+3 this month', isPositive: true },
      { label: 'On Schedule', value: '88.9%', change: '+4.2%', isPositive: true },
      { label: 'Budget Utilization', value: '74.2%', change: '-2.1%', isPositive: true },
      { label: 'Overdue Milestones', value: '2', change: '-1 from last week', isPositive: false },
    ],
    filterTabs: ['All Projects', 'In Progress', 'Completed', 'On Hold'],
    addButtonLabel: 'New Project',
    columns: [
      { key: 'name', label: 'Project Name' },
      { key: 'client', label: 'Client / Account' },
      { key: 'status', label: 'Status' },
      { key: 'progress', label: 'Progress' },
      { key: 'budget', label: 'Budget' },
      { key: 'deadline', label: 'Deadline' },
    ],
    rows: [
      { id: '1', name: 'ERP Cloud Migration', client: 'Northwind Labs', status: 'In Progress', progress: 78, budget: '$120,000', deadline: 'Dec 15, 2026' },
      { id: '2', name: 'Mobile Banking SDK', client: 'Ledgerly Inc', status: 'In Progress', progress: 92, budget: '$85,000', deadline: 'Nov 30, 2026' },
      { id: '3', name: 'Security Audit & Compliance', client: 'Kite Health', status: 'In Progress', progress: 45, budget: '$40,000', deadline: 'Jan 10, 2027' },
      { id: '4', name: 'Checkout Redesign', client: 'Orbitpay', status: 'Completed', progress: 100, budget: '$65,000', deadline: 'Nov 12, 2026' },
      { id: '5', name: 'API Gateway Modernization', client: 'Brightloop', status: 'On Hold', progress: 30, budget: '$50,000', deadline: 'Feb 20, 2027' },
    ],
  },

  leads: {
    id: 'leads',
    name: 'Leads',
    singular: 'Lead',
    iconName: 'UserPlus',
    description: 'Capture, qualify, and convert prospect leads into active business deals.',
    stats: [
      { label: 'Total Leads', value: '1,429', change: '+18.4% vs last mo', isPositive: true },
      { label: 'Qualified Leads', value: '412', change: '+24%', isPositive: true },
      { label: 'Conversion Rate', value: '28.8%', change: '+3.1%', isPositive: true },
      { label: 'Unassigned Leads', value: '14', change: '5 urgent', isPositive: false },
    ],
    filterTabs: ['All Leads', 'New', 'Contacted', 'Qualified', 'Nurturing'],
    addButtonLabel: 'New Lead',
    columns: [
      { key: 'name', label: 'Lead Name' },
      { key: 'company', label: 'Company' },
      { key: 'status', label: 'Lead Status' },
      { key: 'rating', label: 'Rating' },
      { key: 'source', label: 'Source' },
      { key: 'email', label: 'Email' },
    ],
    rows: [
      { id: '1', name: 'Marcus Sterling', company: 'Apex Fintech', status: 'Qualified', rating: 'Hot', source: 'Web Referral', email: 'marcus@apexfin.com' },
      { id: '2', name: 'Elena Rostova', company: 'Nordic AI Solutions', status: 'New', rating: 'Hot', source: 'Direct Inbound', email: 'elena@nordicai.io' },
      { id: '3', name: 'Chloe Vance', company: 'Vance Logistics', status: 'Contacted', rating: 'Warm', source: 'LinkedIn Ads', email: 'chloe@vance.logistics' },
      { id: '4', name: 'Liam Takahashi', company: 'Tokyo Media Lab', status: 'Nurturing', rating: 'Warm', source: 'Webinar', email: 'liam@tokyomedia.jp' },
      { id: '5', name: 'David Kim', company: 'Seoul BioTech', status: 'New', rating: 'Cold', source: 'Cold Outreach', email: 'david@seoulbio.kr' },
    ],
  },

  accounts: {
    id: 'accounts',
    name: 'Accounts',
    singular: 'Account',
    iconName: 'Building2',
    description: 'Manage corporate organizations, billing relationships, and client accounts.',
    stats: [
      { label: 'Total Accounts', value: '418', change: '+12 new', isPositive: true },
      { label: 'Enterprise Tier', value: '84', change: '20.1% of total', isPositive: true },
      { label: 'Average ARR', value: '$68.4K', change: '+9.8%', isPositive: true },
      { label: 'Renewal Rate', value: '96.2%', change: '+1.4%', isPositive: true },
    ],
    filterTabs: ['All Accounts', 'Enterprise', 'Mid-Market', 'Growth'],
    addButtonLabel: 'New Account',
    columns: [
      { key: 'name', label: 'Account Name' },
      { key: 'tier', label: 'Tier' },
      { key: 'industry', label: 'Industry' },
      { key: 'arr', label: 'Annual Revenue' },
      { key: 'owner', label: 'Account Manager' },
      { key: 'status', label: 'Health' },
    ],
    rows: [
      { id: '1', name: 'Northwind Labs Inc.', tier: 'Enterprise', industry: 'Cloud AI', arr: '$240,000', owner: 'Kwame Mensah', status: 'Excellent' },
      { id: '2', name: 'Ledgerly Technologies', tier: 'Enterprise', industry: 'Fintech', arr: '$180,000', owner: 'Ines Becker', status: 'Good' },
      { id: '3', name: 'Kite Health Systems', tier: 'Mid-Market', industry: 'Healthtech', arr: '$95,000', owner: 'Arjun Rao', status: 'Excellent' },
      { id: '4', name: 'Orbitpay Global', tier: 'Mid-Market', industry: 'Payments', arr: '$88,000', owner: 'Lena Park', status: 'At Risk' },
      { id: '5', name: 'Brightloop Studios', tier: 'Growth', industry: 'Design & Media', arr: '$45,000', owner: 'Tove Lind', status: 'Good' },
    ],
  },

  tasks: {
    id: 'tasks',
    name: 'Tasks',
    singular: 'Task',
    iconName: 'CheckSquare',
    description: 'Track daily follow-ups, client deliverables, and sales activities.',
    stats: [
      { label: 'Pending Tasks', value: '47', change: '8 due today', isPositive: true },
      { label: 'Completed Today', value: '23', change: '+35% pace', isPositive: true },
      { label: 'High Priority', value: '6', change: 'Action required', isPositive: false },
      { label: 'Overdue', value: '3', change: '-2 resolved', isPositive: false },
    ],
    filterTabs: ['All Tasks', 'Due Today', 'Upcoming', 'High Priority', 'Completed'],
    addButtonLabel: 'New Task',
    columns: [
      { key: 'subject', label: 'Task Subject' },
      { key: 'related', label: 'Related To' },
      { key: 'priority', label: 'Priority' },
      { key: 'dueDate', label: 'Due Date' },
      { key: 'status', label: 'Status' },
      { key: 'assignee', label: 'Assignee' },
    ],
    rows: [
      { id: '1', subject: 'Send revised Enterprise proposal', related: 'Northwind Labs', priority: 'High', dueDate: 'Today, 4:00 PM', status: 'In Progress', assignee: 'Kwame M.' },
      { id: '2', subject: 'Follow up on MSA contract review', related: 'Ledgerly Inc', priority: 'High', dueDate: 'Today, 6:00 PM', status: 'Not Started', assignee: 'Ines B.' },
      { id: '3', subject: 'Prepare Q4 Business Review deck', related: 'Kite Health', priority: 'Normal', dueDate: 'Tomorrow', status: 'In Progress', assignee: 'Arjun R.' },
      { id: '4', subject: 'Resolve SSO SAML configuration ticket', related: 'Orbitpay', priority: 'High', dueDate: 'Nov 25, 2026', status: 'Pending', assignee: 'Lena P.' },
      { id: '5', subject: 'Check in on onboarding progress', related: 'Brightloop', priority: 'Low', dueDate: 'Nov 27, 2026', status: 'Not Started', assignee: 'Tove L.' },
    ],
  },

  meetings: {
    id: 'meetings',
    name: 'Meetings',
    singular: 'Meeting',
    iconName: 'Calendar',
    description: 'Schedule, sync, and log client presentations, demos, and reviews.',
    stats: [
      { label: 'Upcoming Today', value: '5', change: 'Next at 11:30 AM', isPositive: true },
      { label: 'Meetings This Week', value: '28', change: '+6 vs last wk', isPositive: true },
      { label: 'Demo Completed', value: '14', change: '65% demo-to-deal', isPositive: true },
      { label: 'Rescheduled', value: '2', change: 'Normal rate', isPositive: true },
    ],
    filterTabs: ['Today', 'Upcoming', 'Past Meetings', 'Recordings'],
    addButtonLabel: 'Schedule Meeting',
    columns: [
      { key: 'title', label: 'Meeting Title' },
      { key: 'attendees', label: 'Client / Attendees' },
      { key: 'time', label: 'Date & Time' },
      { key: 'duration', label: 'Duration' },
      { key: 'location', label: 'Platform / Room' },
      { key: 'host', label: 'Host' },
    ],
    rows: [
      { id: '1', title: 'Enterprise Architecture Sync', attendees: 'Daniel Brooks (Northwind)', time: 'Today, 11:30 AM', duration: '45 min', location: 'Google Meet', host: 'Kwame Mensah' },
      { id: '2', title: 'Product Demo & Security Q&A', attendees: 'Aisha Rahman (Kite Health)', time: 'Today, 2:00 PM', duration: '30 min', location: 'Zoom Room #4', host: 'Arjun Rao' },
      { id: '3', title: 'Contract Terms & Pricing Review', attendees: 'Sofia Marin (Ledgerly)', time: 'Tomorrow, 10:00 AM', duration: '60 min', location: 'Google Meet', host: 'Ines Becker' },
      { id: '4', title: 'Quarterly Executive Review', attendees: 'Hannah Cole (Orbitpay)', time: 'Nov 26, 3:30 PM', duration: '50 min', location: 'Executive Boardroom', host: 'Lena Park' },
    ],
  },

  calls: {
    id: 'calls',
    name: 'Calls',
    singular: 'Call',
    iconName: 'PhoneCall',
    description: 'Log and monitor phone communications, recordings, and call notes.',
    stats: [
      { label: 'Total Calls Today', value: '34', change: '+8 vs avg', isPositive: true },
      { label: 'Connected Rate', value: '72.4%', change: '+5.2%', isPositive: true },
      { label: 'Avg Call Duration', value: '6m 42s', change: '+1m 10s', isPositive: true },
      { label: 'Follow-ups Needed', value: '9', change: 'Requires action', isPositive: false },
    ],
    filterTabs: ['All Calls', 'Inbound', 'Outbound', 'Missed', 'Scheduled'],
    addButtonLabel: 'Log Call',
    columns: [
      { key: 'contact', label: 'Contact Person' },
      { key: 'company', label: 'Company' },
      { key: 'type', label: 'Type' },
      { key: 'result', label: 'Call Outcome' },
      { key: 'duration', label: 'Duration' },
      { key: 'time', label: 'Timestamp' },
    ],
    rows: [
      { id: '1', contact: 'Marcus Sterling', company: 'Apex Fintech', type: 'Outbound', result: 'Interested - Proposal requested', duration: '12m 18s', time: '10 min ago' },
      { id: '2', contact: 'Elena Rostova', company: 'Nordic AI Solutions', type: 'Inbound', result: 'Demo scheduled for Friday', duration: '8m 45s', time: '42 min ago' },
      { id: '3', contact: 'Chloe Vance', company: 'Vance Logistics', type: 'Outbound', result: 'Left voicemail', duration: '1m 20s', time: '1 hr ago' },
      { id: '4', contact: 'David Kim', company: 'Seoul BioTech', type: 'Outbound', result: 'Follow-up requested next month', duration: '4m 30s', time: '3 hrs ago' },
      { id: '5', contact: 'Omar Haddad', company: 'Personal Account', type: 'Inbound', result: 'Support inquiry transferred', duration: '3m 10s', time: 'Yesterday' },
    ],
  },

  campaigns: {
    id: 'campaigns',
    name: 'Campaigns',
    singular: 'Campaign',
    iconName: 'Megaphone',
    description: 'Orchestrate multi-channel outreach, email nurture sequences, and marketing campaigns.',
    stats: [
      { label: 'Active Campaigns', value: '8', change: '3 ongoing email blasts', isPositive: true },
      { label: 'Total Audience Reach', value: '54.2K', change: '+12.6%', isPositive: true },
      { label: 'Open Rate', value: '38.4%', change: '+4.1% industry top', isPositive: true },
      { label: 'Pipeline Generated', value: '$340K', change: 'ROI: 580%', isPositive: true },
    ],
    filterTabs: ['All Campaigns', 'Active', 'Scheduled', 'Drafts', 'Completed'],
    addButtonLabel: 'Create Campaign',
    columns: [
      { key: 'name', label: 'Campaign Title' },
      { key: 'type', label: 'Channel Type' },
      { key: 'status', label: 'Status' },
      { key: 'reach', label: 'Audience Reach' },
      { key: 'openRate', label: 'Engagement Rate' },
      { key: 'leads', label: 'Generated Leads' },
    ],
    rows: [
      { id: '1', name: 'Q4 Fintech Executive Briefing', type: 'Email Sequence', status: 'Active', reach: '12,400', openRate: '42.8%', leads: '186' },
      { id: '2', name: 'AI Cloud Security Summit 2026', type: 'Webinar & Event', status: 'Active', reach: '8,200', openRate: '34.2%', leads: '142' },
      { id: '3', name: 'Black Friday SaaS Enterprise Deal', type: 'Multi-Channel', status: 'Scheduled', reach: '24,000', openRate: '—', leads: '—' },
      { id: '4', name: 'Developer API v3 Beta Invite', type: 'Product In-App', status: 'Active', reach: '5,600', openRate: '56.1%', leads: '94' },
      { id: '5', name: 'Customer Retargeting Push', type: 'Paid Social', status: 'Completed', reach: '18,500', openRate: '21.5%', leads: '78' },
    ],
  },

  documents: {
    id: 'documents',
    name: 'Documents',
    singular: 'Document',
    iconName: 'FileText',
    description: 'Centralized repository for sales collateral, NDAs, MSA proposals, and contracts.',
    stats: [
      { label: 'Total Documents', value: '312', change: '+24 this month', isPositive: true },
      { label: 'Pending Signatures', value: '5', change: 'e-Sign sent', isPositive: false },
      { label: 'Templates Active', value: '42', change: 'Standardized', isPositive: true },
      { label: 'Storage Used', value: '14.8 GB', change: 'Cloud secured', isPositive: true },
    ],
    filterTabs: ['All Files', 'Contracts & MSAs', 'Proposals', 'Presentations', 'Templates'],
    addButtonLabel: 'Upload Document',
    columns: [
      { key: 'title', label: 'Document Name' },
      { key: 'category', label: 'Category' },
      { key: 'size', label: 'File Size' },
      { key: 'status', label: 'Status' },
      { key: 'updated', label: 'Last Modified' },
      { key: 'author', label: 'Author' },
    ],
    rows: [
      { id: '1', title: 'Northwind_Enterprise_SLA_2026.pdf', category: 'Contracts & MSAs', size: '2.4 MB', status: 'Signed', updated: '2 hrs ago', author: 'Kwame Mensah' },
      { id: '2', title: 'Ledgerly_MSA_v3_Final.docx', category: 'Contracts & MSAs', size: '1.8 MB', status: 'Awaiting Signature', updated: 'Yesterday', author: 'Ines Becker' },
      { id: '3', title: 'Zoho_CRM_Architecture_Whitepaper.pdf', category: 'Presentations', size: '8.6 MB', status: 'Active', updated: '3 days ago', author: 'Product Team' },
      { id: '4', title: 'Orbitpay_Custom_Pricing_Proposal.xlsx', category: 'Proposals', size: '840 KB', status: 'Under Review', updated: 'Nov 19, 2026', author: 'Lena Park' },
      { id: '5', title: 'Standard_Mutual_NDA_Template_2026.pdf', category: 'Templates', size: '420 KB', status: 'Verified', updated: 'Nov 10, 2026', author: 'Legal Team' },
    ],
  },

  visits: {
    id: 'visits',
    name: 'Visits',
    singular: 'Visit',
    iconName: 'MapPin',
    description: 'Field sales visits, in-person client on-site syncs, and geo-tagged check-ins.',
    stats: [
      { label: 'Scheduled Visits', value: '9', change: '3 today', isPositive: true },
      { label: 'Completed This Month', value: '26', change: '+14% vs target', isPositive: true },
      { label: 'Mileage Logged', value: '412 mi', change: 'Field tracked', isPositive: true },
      { label: 'Visit-to-Deal Rate', value: '82%', change: 'Highest conversion', isPositive: true },
    ],
    filterTabs: ['All Visits', 'Scheduled', 'In Progress', 'Completed', 'Cancelled'],
    addButtonLabel: 'Schedule Visit',
    columns: [
      { key: 'client', label: 'Client / Account' },
      { key: 'location', label: 'Site Location' },
      { key: 'date', label: 'Date & Time' },
      { key: 'rep', label: 'Sales Executive' },
      { key: 'status', label: 'Visit Status' },
      { key: 'purpose', label: 'Purpose' },
    ],
    rows: [
      { id: '1', client: 'Northwind Labs HQ', location: '742 Evergreen Terrace, Seattle, WA', date: 'Today, 2:00 PM', rep: 'Kwame Mensah', status: 'Scheduled', purpose: 'Executive Onsite Demo' },
      { id: '2', client: 'Ledgerly Financial Tech', location: '100 Montgomery St, San Francisco, CA', date: 'Today, 4:30 PM', rep: 'Ines Becker', status: 'Scheduled', purpose: 'Contract Closing Signing' },
      { id: '3', client: 'Kite Health Innovation Center', location: '250 Binney St, Cambridge, MA', date: 'Nov 25, 11:00 AM', rep: 'Arjun Rao', status: 'Confirmed', purpose: 'Technical Architecture Review' },
      { id: '4', client: 'Orbitpay Payments Campus', location: '350 5th Ave, New York, NY', date: 'Nov 20, 2026', rep: 'Lena Park', status: 'Completed', purpose: 'QBR & Account Expansion' },
    ],
  },
};
