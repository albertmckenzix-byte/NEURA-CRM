import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import {
  ArrowLeft,
  Building2,
  Phone,
  Smartphone,
  Globe,
  UserCheck,
  Calendar,
  MapPin,
  FileText,
  Save,
  ChevronDown,
  User,
  Mail,
  DollarSign,
  Tag,
} from 'lucide-react';
import { addStoredLead, type Lead } from '../data/crmData';

const popularCities = [
  'New York, NY',
  'San Francisco, CA',
  'Seattle, WA',
  'Austin, TX',
  'Boston, MA',
  'Chicago, IL',
  'Los Angeles, CA',
  'Toronto, ON',
  'Vancouver, BC',
  'London, UK',
  'Berlin, DE',
  'Paris, FR',
  'Tokyo, JP',
  'Singapore, SG',
  'Sydney, AU',
];

const industries = [
  'Fintech & Digital Banking',
  'Healthcare & Biotech',
  'AI & Cloud Infrastructure',
  'Enterprise SaaS',
  'Logistics & Supply Chain',
  'Manufacturing & Industrial',
  'Media & Entertainment',
  'CleanTech & Renewable Energy',
  'Retail & E-commerce',
  'Professional Services',
  'Other / Emerging Sector',
];

const teamMembers = [
  'Albert Mckenzie (Ops Manager)',
  'Ines Becker (Account Executive)',
  'Kwame Mensah (Lead Sales)',
  'Arjun Rao (Director)',
  'Lena Park (Technical Architect)',
  'Tove Lind (Sales Lead)',
];

export default function CreateLeadPage() {
  const navigate = useNavigate();

  // Core Lead Information
  const [company, setCompany] = useState('');
  const [contactName, setContactName] = useState('');
  const [industry, setIndustry] = useState('Fintech & Digital Banking');
  const [phone, setPhone] = useState('');
  const [phoneSecond, setPhoneSecond] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<Lead['status']>('New');
  const [lastCaller, setLastCaller] = useState('Albert Mckenzie (Ops Manager)');
  const [nextFollowUp, setNextFollowUp] = useState('');
  const [owner, setOwner] = useState('Albert Mckenzie (Ops Manager)');
  const [source, setSource] = useState<Lead['source']>('Website Inbound');
  const [estValue, setEstValue] = useState('$45,000');

  // Address Information
  const [country, setCountry] = useState('United States');
  const [city, setCity] = useState('San Francisco, CA');
  const [customCity, setCustomCity] = useState('');
  const [isCustomCity, setIsCustomCity] = useState(false);
  const [province, setProvince] = useState('California');
  const [street, setStreet] = useState('');
  const [postalCode, setPostalCode] = useState('');

  // Description Information
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!company.trim() || !contactName.trim()) return;

    const resolvedCity = isCustomCity ? customCity.trim() : city;

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: contactName.trim(),
      company: company.trim(),
      title: role.trim() || 'Key Decision Maker',
      role: role.trim() || 'Key Decision Maker',
      industry,
      phone: phone.trim() || '+1 (555) 019-2830',
      phoneSecond: phoneSecond.trim(),
      mobile: mobile.trim(),
      email:
        email.trim() ||
        `${contactName.toLowerCase().replace(/\s+/g, '.')}@${company.toLowerCase().replace(/[^a-z0-9]/g, '') || 'company'}.com`,
      website: website.trim().replace(/^https?:\/\//, ''),
      status,
      lastCaller,
      nextFollowUp: nextFollowUp.trim() || 'Next week',
      assignedTo: owner.split(' (')[0],
      source,
      score: 80,
      estValue: estValue.trim() || '$35,000',
      country,
      city: resolvedCity,
      province: province.trim(),
      street: street.trim(),
      postalCode: postalCode.trim(),
      description: description.trim(),
      notes: description.trim(),
      createdAt: 'Just now',
    };

    addStoredLead(newLead);
    navigate('/leads');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 select-none">
      {/* Breadcrumb & Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-3">
          <NavLink
            to="/leads"
            className="w-9 h-9 rounded-2xl bg-white border border-neutral-200/60 shadow-sm flex items-center justify-center text-neutral-600 hover:text-black hover:bg-neutral-50 transition"
            title="Back to Leads"
          >
            <ArrowLeft size={16} />
          </NavLink>
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
              <NavLink to="/leads" className="hover:text-neutral-900 transition">
                Leads & Prospects
              </NavLink>
              <span>/</span>
              <span className="text-neutral-800 font-semibold">Create New Lead</span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight mt-0.5">
              New Prospect Intake Form
            </h1>
          </div>
        </div>

        {/* Top Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => navigate('/leads')}
            className="px-4 py-2 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-200/60 transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-5 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
          >
            <Save size={13} />
            <span>Save Lead</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 1. CORE LEAD INFORMATION */}
        <div className="bg-white rounded-[28px] p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100 mb-5">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
              <Building2 size={15} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-900">Lead Information</h2>
              <p className="text-[11px] text-neutral-400">
                Core commercial details, contact role, communication lines, and pipeline status.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Company Name */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Company Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 size={13} className="absolute left-3.5 top-3 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Fintech Solutions"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>

            {/* Contact Person Name */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Contact Person Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User size={13} className="absolute left-3.5 top-3 text-neutral-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Sterling"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Industry Sector
              </label>
              <div className="relative">
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl px-3.5 py-2.5 text-xs text-neutral-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400 appearance-none pr-9 cursor-pointer"
                >
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-3 pointer-events-none text-neutral-400" />
              </div>
            </div>

            {/* Contact Role */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Contact Role / Title
              </label>
              <div className="relative">
                <UserCheck size={13} className="absolute left-3.5 top-3 text-neutral-400" />
                <input
                  type="text"
                  placeholder="e.g. VP of Growth & Strategy"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>

            {/* Phone Line (Primary) */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Phone Line (Primary)
              </label>
              <div className="relative">
                <Phone size={13} className="absolute left-3.5 top-3 text-neutral-400" />
                <input
                  type="tel"
                  placeholder="e.g. +1 (415) 892-3401"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>

            {/* Second Phone Line */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Second Phone Line (Office / Direct Line 2)
              </label>
              <div className="relative">
                <Phone size={13} className="absolute left-3.5 top-3 text-neutral-400" />
                <input
                  type="tel"
                  placeholder="e.g. +1 (415) 892-3402 ext. 104"
                  value={phoneSecond}
                  onChange={(e) => setPhoneSecond(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <Smartphone size={13} className="absolute left-3.5 top-3 text-neutral-400" />
                <input
                  type="tel"
                  placeholder="e.g. +1 (415) 782-9912"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={13} className="absolute left-3.5 top-3 text-neutral-400" />
                <input
                  type="email"
                  placeholder="e.g. marcus@apexfin.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>

            {/* Website */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Website
              </label>
              <div className="relative">
                <Globe size={13} className="absolute left-3.5 top-3 text-neutral-400" />
                <input
                  type="text"
                  placeholder="e.g. https://apexfin.com"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>

            {/* Lead Status */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Lead Status
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as Lead['status'])}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl px-3.5 py-2.5 text-xs text-neutral-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400 appearance-none pr-9 cursor-pointer font-semibold"
                >
                  <option value="New">New (Unqualified)</option>
                  <option value="Contacted">Contacted (In Discussion)</option>
                  <option value="Qualified">Qualified (Ready for Deal)</option>
                  <option value="Lost">Lost / Disqualified</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-3 pointer-events-none text-neutral-400" />
              </div>
            </div>

            {/* Last Caller */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Last Caller
              </label>
              <div className="relative">
                <select
                  value={lastCaller}
                  onChange={(e) => setLastCaller(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl px-3.5 py-2.5 text-xs text-neutral-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400 appearance-none pr-9 cursor-pointer"
                >
                  {teamMembers.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-3 pointer-events-none text-neutral-400" />
              </div>
            </div>

            {/* Next Follow-Up Date */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Next Follow-Up Date
              </label>
              <div className="relative">
                <Calendar size={13} className="absolute left-3.5 top-3 text-neutral-400" />
                <input
                  type="date"
                  value={nextFollowUp}
                  onChange={(e) => setNextFollowUp(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2 text-xs text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>

            {/* Lead Owner */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Lead Owner
              </label>
              <div className="relative">
                <select
                  value={owner}
                  onChange={(e) => setOwner(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl px-3.5 py-2.5 text-xs text-neutral-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400 appearance-none pr-9 cursor-pointer font-semibold"
                >
                  {teamMembers.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-3 pointer-events-none text-neutral-400" />
              </div>
            </div>

            {/* Lead Source */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Lead Acquisition Source
              </label>
              <div className="relative">
                <Tag size={13} className="absolute left-3.5 top-3 text-neutral-400" />
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value as Lead['source'])}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl pl-10 pr-9 py-2.5 text-xs text-neutral-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400 appearance-none cursor-pointer"
                >
                  <option value="Website Inbound">Website Inbound</option>
                  <option value="LinkedIn Referral">LinkedIn Referral</option>
                  <option value="Webinar Demo">Webinar Demo</option>
                  <option value="Outbound Campaign">Outbound Campaign</option>
                  <option value="Event / Conference">Event / Conference</option>
                  <option value="Partner Referral">Partner Referral</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-3 pointer-events-none text-neutral-400" />
              </div>
            </div>

            {/* Estimated Deal Potential */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Estimated Deal Potential ($ USD)
              </label>
              <div className="relative">
                <DollarSign size={13} className="absolute left-3.5 top-3 text-neutral-400" />
                <input
                  type="text"
                  placeholder="$45,000"
                  value={estValue}
                  onChange={(e) => setEstValue(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2. ADDRESS INFORMATION */}
        <div className="bg-white rounded-[28px] p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100 mb-5">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
              <MapPin size={15} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-900">Address Information</h2>
              <p className="text-[11px] text-neutral-400">
                Geographic location, headquarter jurisdiction, and postal routing details.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Country */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Country
              </label>
              <div className="relative">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl px-3.5 py-2.5 text-xs text-neutral-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400 appearance-none pr-9 cursor-pointer"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="France">France</option>
                  <option value="Japan">Japan</option>
                  <option value="Australia">Australia</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Sweden">Sweden</option>
                  <option value="South Korea">South Korea</option>
                  <option value="Other / Global">Other / Global</option>
                </select>
                <ChevronDown size={14} className="absolute right-3.5 top-3 pointer-events-none text-neutral-400" />
              </div>
            </div>

            {/* City Pick List */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-neutral-700">
                  City Pick List
                </label>
                <button
                  type="button"
                  onClick={() => setIsCustomCity(!isCustomCity)}
                  className="text-[11px] font-semibold text-neutral-600 hover:text-black underline"
                >
                  {isCustomCity ? 'Pick from list' : '+ Enter other city'}
                </button>
              </div>

              {isCustomCity ? (
                <input
                  type="text"
                  placeholder="Enter city name..."
                  value={customCity}
                  onChange={(e) => setCustomCity(e.target.value)}
                  className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl px-3.5 py-2.5 text-xs text-neutral-900 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
                />
              ) : (
                <div className="relative">
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl px-3.5 py-2.5 text-xs text-neutral-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400 appearance-none pr-9 cursor-pointer"
                  >
                    {popularCities.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-3.5 top-3 pointer-events-none text-neutral-400" />
                </div>
              )}
            </div>

            {/* Province / State */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Province / State
              </label>
              <input
                type="text"
                placeholder="e.g. California"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl px-3.5 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
              />
            </div>

            {/* Postal Code */}
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Postal Code / ZIP
              </label>
              <input
                type="text"
                placeholder="e.g. 94105"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl px-3.5 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
              />
            </div>

            {/* Street */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                Street Address
              </label>
              <input
                type="text"
                placeholder="e.g. 500 Howard Street, Suite 400"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl px-3.5 py-2.5 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400"
              />
            </div>
          </div>
        </div>

        {/* 3. DESCRIPTION INFORMATION */}
        <div className="bg-white rounded-[28px] p-6 border border-neutral-100 shadow-sm">
          <div className="flex items-center gap-2.5 pb-4 border-b border-neutral-100 mb-5">
            <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center">
              <FileText size={15} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-neutral-900">Description Information</h2>
              <p className="text-[11px] text-neutral-400">
                Prospect background notes, executive pain points, discussion summaries, and commercial requirements.
              </p>
            </div>
          </div>

          <div>
            <textarea
              rows={4}
              placeholder="Enter comprehensive lead background, key pain points discussed on the call, enterprise SLA requirements, or specific migration timelines..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#faf9f6] border border-neutral-200/80 rounded-2xl p-4 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-neutral-400 leading-relaxed resize-y"
            />
          </div>
        </div>

        {/* Bottom Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/leads')}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-200/60 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-7 py-2.5 text-xs font-semibold flex items-center gap-2 shadow-sm transition"
          >
            <Save size={14} />
            <span>Create & Save Lead</span>
          </button>
        </div>
      </form>
    </div>
  );
}
