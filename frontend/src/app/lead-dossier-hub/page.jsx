'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LeadDossierHubPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('logistics');
  const [selectedFeed, setSelectedFeed] = useState('all');
  const [minFit, setMinFit] = useState(75);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [selectedLeadId, setSelectedLeadId] = useState('acme');
  const [systemAlert, setSystemAlert] = useState(null);

  const leads = [
    {
      id: 'acme',
      initials: 'AC',
      name: 'Acme Cloud Logistics',
      source: 'Maps API',
      sourceIcon: 'location_on',
      industry: 'Supply Chain & Warehousing • Chicago, IL',
      fit: 94,
      contact: 'Marcus Vance • VP Supply Chain',
      status: 'Dossier Ready',
      statusColor: 'text-primary bg-surface-container-highest',
      verifiedId: '#US-88319',
      fte: '4,200 FTE',
      arr: '$450M - $600M ARR',
      location: 'Chicago, IL • 8 Regional Hubs',
      painPoint: 'Legacy SAP-to-Salesforce sync latency causing 48-hour order processing lag across Midwest logistics hubs.',
    },
    {
      id: 'synthetix',
      initials: 'SB',
      name: 'Synthetix Biotech',
      source: 'LinkedIn Nav',
      sourceIcon: 'share',
      industry: 'Pharma Tech & Clinical Trials • Boston, MA',
      fit: 88,
      contact: 'Dr. Elena Rostova • CTO',
      status: 'Outreach Queued',
      statusColor: 'text-on-secondary-fixed bg-secondary-fixed',
      verifiedId: '#US-77192',
      fte: '1,850 FTE',
      arr: '$210M - $280M ARR',
      location: 'Boston, MA • Innovation Hub',
      painPoint: 'Manual regulatory documentation handoff from Salesforce quote to SAP compliance audit.',
    },
    {
      id: 'vertex',
      initials: 'VF',
      name: 'Vertex Financial Systems',
      source: 'ZoomInfo Feed',
      sourceIcon: 'rss_feed',
      industry: 'Fintech / Core Banking • New York, NY',
      fit: 91,
      contact: 'Arthur Pendelton • Procurement Dir.',
      status: 'Proposal Drafting',
      statusColor: 'text-on-tertiary-fixed bg-tertiary-fixed',
      verifiedId: '#US-90341',
      fte: '3,100 FTE',
      arr: '$380M - $510M ARR',
      location: 'New York, NY • Wall Street Tech Campus',
      painPoint: 'Discrepancy in customer master between Dynamics 365 and SAP treasury records.',
    },
    {
      id: 'novacore',
      initials: 'NM',
      name: 'NovaCore Manufacturing',
      source: 'Maps API',
      sourceIcon: 'location_on',
      industry: 'Heavy Precision Castings • Detroit, MI',
      fit: 82,
      contact: 'Sarah Lin • Operations Director',
      status: 'Review Required',
      statusColor: 'text-on-error-container bg-error-container',
      verifiedId: '#US-66120',
      fte: '5,400 FTE',
      arr: '$620M ARR',
      location: 'Detroit, MI • Advanced Plant 4',
      painPoint: 'Lead leakage during CRM to ERP line-item quote conversion.',
    },
    {
      id: 'cloudmatrix',
      initials: 'CM',
      name: 'CloudMatrix Data',
      source: 'LinkedIn Nav',
      sourceIcon: 'share',
      industry: 'Database Infra • Austin, TX',
      fit: 79,
      contact: 'David K. • VP IT Infra',
      status: 'Cold Ingestion',
      statusColor: 'text-on-surface-variant bg-surface-container',
      verifiedId: '#US-55418',
      fte: '920 FTE',
      arr: '$95M ARR',
      location: 'Austin, TX • Silicon Hills',
      painPoint: 'No automated handoff between sales reps and supply chain provisioning.',
    },
  ];

  const currentLead = leads.find((l) => l.id === selectedLeadId) || leads[0];

  const triggerToast = (msg) => {
    setSystemAlert(msg);
    setTimeout(() => setSystemAlert(null), 3500);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg">
      {/* Toast Alert */}
      {systemAlert && (
        <div className="p-space-sm rounded-xl bg-primary-container text-on-primary-container text-xs font-medium shadow-md flex items-center justify-between transition-all">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
            <span>{systemAlert}</span>
          </div>
          <button onClick={() => setSystemAlert(null)} aria-label="Dismiss alert">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Header Sub-bar & Filter Strip */}
      <header className="flex flex-col gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
          <div className="space-y-space-2xs min-w-0">
            <div className="flex items-center gap-space-sm">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-fixed text-primary">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  hub
                </span>
              </span>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
                Lead Discovery &amp; AI Intelligence Hub
              </h1>
              <span className="font-label-xs text-label-xs px-space-sm py-space-2xs rounded-full bg-surface-container-high text-primary font-semibold uppercase tracking-wider">
                ICP Engine v4.2
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-space-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary-container"></span>
              <span>
                Autonomous ICP Ingestion: <strong className="text-on-surface font-medium">248 accounts parsed today</strong> from Google Maps &amp; LinkedIn enterprise data feeds
              </span>
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-space-sm">
            <button
              onClick={() => triggerToast('Signals configured: 10-K, Maps Places API, LinkedIn Executive Changes active.')}
              id="config-signals-btn"
              name="config-signals-btn"
              className="flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Config Signals</span>
            </button>
            <button
              onClick={() => triggerToast('Ingestion log downloaded: 248 records exported with 99.4% confidence score.')}
              id="bulk-ingest-log-btn"
              name="bulk-ingest-log-btn"
              className="flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm transition-colors"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>Bulk Ingestion Log</span>
            </button>
            <button
              onClick={() => triggerToast('Auto-enriching 24 pending accounts via Claude 3.5 Sonnet & BuiltWith API...')}
              id="auto-enrich-batch-btn"
              name="auto-enrich-batch-btn"
              className="flex items-center gap-space-xs px-space-md py-space-xs rounded bg-primary-container text-on-primary-container hover:bg-primary transition-colors font-body-md text-body-md font-medium shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>Auto-Enrich Batch</span>
              <span className="font-data-mono-sm text-data-mono-sm px-space-xs bg-surface-container-lowest/20 rounded ml-space-2xs">
                24 Pending
              </span>
            </button>
          </div>
        </div>

        {/* Micro Filter Toolbar with Accessible Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-sm items-center pt-space-sm border-t border-surface-container-low">
          {/* Search Input */}
          <div className="lg:col-span-4 relative">
            <label htmlFor="lead-search-input" className="sr-only">
              Search enterprise accounts, executives or SIC codes
            </label>
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[18px]">search</span>
            <input
              id="lead-search-input"
              name="lead-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-8 bg-surface-container-low rounded font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary-container transition-all"
              placeholder="Search company, executive, domain, or SIC code..."
              type="text"
            />
            <span className="absolute right-2.5 top-2 font-data-mono-sm text-data-mono-sm text-on-surface-variant bg-surface-container-high px-space-2xs rounded">
              /
            </span>
          </div>

          {/* Industry Dropdown */}
          <div className="lg:col-span-2 relative">
            <label htmlFor="industry-filter-select" className="sr-only">
              Filter by Industry
            </label>
            <select
              id="industry-filter-select"
              name="industry-filter-select"
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full h-9 px-space-sm bg-surface-container-low rounded font-body-sm text-body-sm text-on-surface appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-lowest"
            >
              <option value="all">All Verticals (9)</option>
              <option value="logistics">Supply Chain &amp; Freight</option>
              <option value="fintech">Fintech &amp; Banking</option>
              <option value="pharma">Biotech &amp; Life Sciences</option>
              <option value="manufacturing">Heavy Industrial Mfg</option>
              <option value="saas">Enterprise Cloud SaaS</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-on-surface-variant text-[18px]">
              expand_more
            </span>
          </div>

          {/* Feed Source Filter */}
          <div className="lg:col-span-3 relative">
            <label htmlFor="feed-source-select" className="sr-only">
              Filter by Feed Source
            </label>
            <select
              id="feed-source-select"
              name="feed-source-select"
              value={selectedFeed}
              onChange={(e) => setSelectedFeed(e.target.value)}
              className="w-full h-9 px-space-sm bg-surface-container-low rounded font-body-sm text-body-sm text-on-surface appearance-none cursor-pointer focus:outline-none focus:bg-surface-container-lowest"
            >
              <option value="all">All Feeds (Maps, SalesNav, ZoomInfo)</option>
              <option value="maps">Google Maps API (Geo-Verified)</option>
              <option value="linkedin">LinkedIn Sales Navigator</option>
              <option value="zoominfo">ZoomInfo Enterprise Webhook</option>
            </select>
            <span className="material-symbols-outlined absolute right-2.5 top-2.5 pointer-events-none text-on-surface-variant text-[18px]">
              filter_alt
            </span>
          </div>

          {/* Fit Score Slider Indicator */}
          <div className="lg:col-span-3 flex items-center justify-between gap-space-sm px-space-sm h-9 bg-surface-container-low rounded">
            <label htmlFor="min-fit-slider" className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider whitespace-nowrap cursor-pointer">
              Min Fit:
            </label>
            <input
              id="min-fit-slider"
              name="min-fit-slider"
              className="w-full accent-primary h-1 bg-surface-container-highest rounded cursor-pointer"
              max="95"
              min="50"
              type="range"
              value={minFit}
              onChange={(e) => setMinFit(parseInt(e.target.value, 10))}
            />
            <span className="font-data-mono-sm text-data-mono-sm font-semibold text-primary px-space-xs bg-surface-container-high rounded whitespace-nowrap">
              &gt;{minFit}
            </span>
          </div>
        </div>
      </header>

      {/* Split View Core Workspace: 40% Leads Table & 60% Dossier Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT PANE: 40% Width (5 cols on 12-col grid) */}
        <section className="lg:col-span-5 flex flex-col gap-space-sm bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
          {/* Lead Segment Toggle & Fast Counts */}
          <div className="flex items-center justify-between pb-space-xs">
            <div className="flex items-center gap-space-2xs bg-surface-container-low p-space-2xs rounded-lg">
              <button className="px-space-sm py-1 rounded font-label-md text-label-md bg-surface-container-lowest text-on-surface shadow-sm font-medium" type="button">
                All (248)
              </button>
              <button className="px-space-sm py-1 rounded font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" type="button">
                Fit &gt;90 (38)
              </button>
              <button className="px-space-sm py-1 rounded font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" type="button">
                Needs Review (14)
              </button>
              <button className="px-space-sm py-1 rounded font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" type="button">
                Synced (196)
              </button>
            </div>
            <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Sort: Fit Desc</span>
          </div>

          {/* Lead Cards Stack */}
          <div className="flex flex-col gap-space-xs overflow-y-auto max-h-[820px] pr-space-2xs" id="leadListContainer">
            {leads.map((lead) => {
              const isSelected = selectedLeadId === lead.id;
              return (
                <article
                  key={lead.id}
                  onClick={() => setSelectedLeadId(lead.id)}
                  className={`p-space-md rounded-lg transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-surface-container-low border-l-4 border-primary shadow-sm'
                      : 'bg-surface-container-lowest hover:bg-surface-container-low'
                  }`}
                >
                  <div className="flex items-start justify-between gap-space-sm">
                    <div className="flex items-start gap-space-sm min-w-0">
                      <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0 font-headline-sm text-headline-sm font-semibold shadow-inner">
                        {lead.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-space-xs flex-wrap">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">
                            {lead.name}
                          </h3>
                          <span className="inline-flex items-center gap-1 font-label-xs text-label-xs bg-surface-container text-on-secondary-fixed-variant px-space-xs py-space-2xs rounded">
                            <span className="material-symbols-outlined text-[13px]">{lead.sourceIcon}</span>
                            <span>{lead.source}</span>
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant truncate">{lead.industry}</p>
                      </div>
                    </div>

                    {/* Fit Score Circular Indicator */}
                    <div className="flex flex-col items-end flex-shrink-0">
                      <div className="relative w-10 h-10 flex items-center justify-center">
                        <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                          <path
                            className="text-surface-container-highest"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3.5"
                          ></path>
                          <path
                            className={lead.fit >= 90 ? 'text-primary-container' : 'text-secondary'}
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="currentColor"
                            strokeDasharray={`${lead.fit}, 100`}
                            strokeLinecap="round"
                            strokeWidth="3.5"
                          ></path>
                        </svg>
                        <span className="absolute font-data-mono-sm text-data-mono-sm font-bold text-on-surface">
                          {lead.fit}
                        </span>
                      </div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant">ICP Match</span>
                    </div>
                  </div>

                  <div className="mt-space-sm pt-space-xs border-t border-surface-container flex items-center justify-between">
                    <div className="flex items-center gap-space-xs min-w-0">
                      <span className="material-symbols-outlined text-[15px] text-on-surface-variant">badge</span>
                      <span className="font-body-sm text-body-sm text-on-surface font-medium truncate">{lead.contact}</span>
                    </div>
                    <span className={`inline-flex items-center gap-1 font-label-xs text-label-xs px-space-xs py-space-2xs rounded-full font-semibold ${lead.statusColor}`}>
                      {lead.status === 'Dossier Ready' && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>}
                      <span>{lead.status}</span>
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Quick Lead Feed Metrics Footer */}
          <div className="mt-auto pt-space-sm flex items-center justify-between text-on-surface-variant font-label-xs text-label-xs">
            <span>Showing {leads.length} of 248 accounts</span>
            <div className="flex items-center gap-space-xs">
              <button className="p-1 rounded hover:bg-surface-container" type="button" aria-label="Previous page">
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface font-semibold">1 / 50</span>
              <button className="p-1 rounded hover:bg-surface-container" type="button" aria-label="Next page">
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        {/* RIGHT PANE: 60% Width (7 cols on 12-col grid) Inspector Canvas */}
        <section className="lg:col-span-7 flex flex-col gap-space-md bg-surface-container-lowest p-space-xl rounded-xl shadow-sm relative">
          {/* Account Header Banner & Corporate Signals */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-space-md pb-space-md border-b border-surface-container-low">
            <div className="flex items-start gap-space-md min-w-0">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-container to-tertiary-container text-on-primary flex items-center justify-center shadow-md flex-shrink-0">
                <span className="material-symbols-outlined text-[32px]">local_shipping</span>
              </div>
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-space-sm flex-wrap">
                  <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold truncate">
                    {currentLead.name}
                  </h2>
                  <span className="inline-flex items-center gap-1 font-label-xs text-label-xs px-space-sm py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                    <span className="material-symbols-outlined text-[12px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                    <span>Verified Entity {currentLead.verifiedId}</span>
                  </span>
                </div>
                <div className="flex items-center gap-space-md flex-wrap text-on-surface-variant font-body-sm text-body-sm">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">pin_drop</span>
                    <span>{currentLead.location}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">groups</span>
                    <span className="font-data-mono-sm text-data-mono-sm font-semibold text-on-surface">{currentLead.fte}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">payments</span>
                    <span className="font-data-mono-sm text-data-mono-sm font-semibold text-on-surface">{currentLead.arr}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Sync Health Micro Card */}
            <div className="flex flex-col items-start md:items-end bg-surface-container-low p-space-sm rounded-lg flex-shrink-0 gap-1">
              <div className="flex items-center gap-space-xs font-label-xs text-label-xs text-primary font-semibold uppercase tracking-wider">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Live Sync Engine</span>
              </div>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Last Enrichment: 14m ago</span>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface font-semibold">Confidence: 99.4%</span>
            </div>
          </div>

          {/* Verified Contact Anchor Spotlight */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md min-w-0">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm text-headline-sm font-bold flex-shrink-0 shadow-sm">
                MV
              </div>
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Marcus Vance</h4>
                  <span className="font-label-xs text-label-xs px-space-xs py-space-2xs bg-surface-container-highest text-primary rounded font-semibold">
                    Decision Maker (Economic Buyer)
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  VP Supply Chain &amp; Logistics Infrastructure • Direct Dial &amp; Work Email Verified
                </p>
              </div>
            </div>

            <div className="flex items-center gap-space-sm flex-shrink-0">
              <button
                onClick={() => router.push('/voice-outreach')}
                className="p-2 rounded-lg bg-surface-container-lowest text-on-surface hover:text-primary transition-colors shadow-sm"
                title="Call Direct Line"
                aria-label="Call Direct Line"
              >
                <span className="material-symbols-outlined text-[18px]">phone</span>
              </button>
              <button
                onClick={() => triggerToast('Verified email drafted in composer.')}
                className="p-2 rounded-lg bg-surface-container-lowest text-on-surface hover:text-primary transition-colors shadow-sm"
                title="Send Verified Email"
                aria-label="Send Verified Email"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </button>
              <button
                onClick={() => triggerToast('Opening LinkedIn Sales Navigator profile...')}
                className="p-2 rounded-lg bg-surface-container-lowest text-on-surface hover:text-primary transition-colors shadow-sm"
                title="View LinkedIn Profile"
                aria-label="View LinkedIn Profile"
              >
                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
              </button>
            </div>
          </div>

          {/* Research Highlights Navigation Tabs */}
          <div className="flex items-center gap-space-md border-b border-surface-container-low overflow-x-auto">
            {[
              { id: 'overview', label: 'Intelligence Overview' },
              { id: 'tech', label: 'Tech Stack & Signals (7)' },
              { id: 'pains', label: 'Operational Pain Points (3)' },
              { id: 'competitors', label: 'Competitor Benchmark & PR Triggers' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`pb-space-sm font-label-md text-label-md whitespace-nowrap transition-colors ${
                  selectedTab === tab.id
                    ? 'font-semibold text-primary border-b-2 border-primary'
                    : 'font-medium text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dossier Content Blocks */}
          <div className="space-y-space-lg">
            {/* SECTION 1: Detected Tech Stack */}
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-primary">dns</span>
                  <span>Detected Technology Stack &amp; Cloud Topology</span>
                </h4>
                <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">
                  Validated via Job Postings, DNS &amp; BuiltWith
                </span>
              </div>

              <div className="flex flex-wrap gap-space-xs">
                {[
                  { name: 'AWS us-east-1', role: 'Core', icon: 'cloud', iconColor: 'text-secondary' },
                  { name: 'Oracle NetSuite ERP', role: 'ERP', icon: 'database', iconColor: 'text-primary' },
                  { name: 'Salesforce Service Cloud', role: 'CRM', icon: 'sync_alt', iconColor: 'text-secondary-container' },
                  { name: 'Snowflake Warehouse', role: 'Analytics', icon: 'ac_unit', iconColor: 'text-tertiary' },
                  { name: 'Kafka Data Streaming', role: 'Telemetry', icon: 'speed', iconColor: 'text-primary-container' },
                  { name: 'Datadog APM', role: '', icon: 'terminal', iconColor: 'text-on-surface-variant' },
                  { name: 'React 18 & Next.js', role: '', icon: 'code', iconColor: 'text-on-surface-variant' },
                ].map((tech, i) => (
                  <div key={i} className="flex items-center gap-space-xs px-space-sm py-1.5 rounded-lg bg-surface-container-low text-on-surface">
                    <span className={`material-symbols-outlined text-[15px] ${tech.iconColor}`}>{tech.icon}</span>
                    <span className="font-data-mono-sm text-data-mono-sm font-semibold">{tech.name}</span>
                    {tech.role && (
                      <span className="font-label-xs text-label-xs text-on-surface-variant bg-surface-container-high px-1 rounded">
                        {tech.role}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 2: AI Identified Operational Pain Points */}
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between">
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-error">warning</span>
                  <span>Identified Operational Friction &amp; Value Triggers</span>
                </h4>
                <span className="font-label-xs text-label-xs px-space-xs py-space-2xs bg-surface-container-high rounded text-primary font-medium">
                  3 Signals Extracted
                </span>
              </div>

              <div className="grid grid-cols-1 gap-space-sm">
                <div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-error text-[20px] flex-shrink-0 mt-0.5">schedule</span>
                  <div className="space-y-1 min-w-0">
                    <p className="font-body-md text-body-md text-on-surface font-medium leading-snug">
                      Legacy SAP-to-Salesforce sync latency causing 48-hour order processing lag across Midwest logistics hubs.
                    </p>
                    <div className="flex items-center gap-space-sm flex-wrap text-on-surface-variant font-label-xs text-label-xs">
                      <span className="bg-surface-container-highest px-space-xs py-0.5 rounded font-mono">
                        SEC Form 10-Q • Q2 Earnings Transcript
                      </span>
                      <span>Impact: Enterprise Quote Bottleneck</span>
                    </div>
                  </div>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-tertiary-container text-[20px] flex-shrink-0 mt-0.5">trending_down</span>
                  <div className="space-y-1 min-w-0">
                    <p className="font-body-md text-body-md text-on-surface font-medium leading-snug">
                      Customer churn risk identified due to delayed quote generation on complex, multi-carrier intermodal freight tenders.
                    </p>
                    <div className="flex items-center gap-space-sm flex-wrap text-on-surface-variant font-label-xs text-label-xs">
                      <span className="bg-surface-container-highest px-space-xs py-0.5 rounded font-mono">
                        FreightWaves Industry Forum • Verified Reviews
                      </span>
                      <span>Impact: Estimated $3.4M quarterly leakage</span>
                    </div>
                  </div>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0 mt-0.5">group_remove</span>
                  <div className="space-y-1 min-w-0">
                    <p className="font-body-md text-body-md text-on-surface font-medium leading-snug">
                      Manual SDR outreach bottleneck with only 12% lead coverage rate following rapid 25% regional fleet expansion.
                    </p>
                    <div className="flex items-center gap-space-sm flex-wrap text-on-surface-variant font-label-xs text-label-xs">
                      <span className="bg-surface-container-highest px-space-xs py-0.5 rounded font-mono">
                        LinkedIn Talent Insights • Org Chart Churn Analysis
                      </span>
                      <span>Impact: High Sales Capacity Deficit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: Competitor Benchmark & Real-time Press Triggers */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
              <div className="p-space-md rounded-xl bg-surface-container-low space-y-space-sm">
                <h5 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-secondary">compare_arrows</span>
                  <span>Competitor Benchmarking</span>
                </h5>
                <div className="space-y-space-xs">
                  <div className="flex items-center justify-between p-space-xs rounded bg-surface-container-lowest">
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">Apex Freight System</span>
                    <span className="font-label-xs text-label-xs px-space-xs py-0.5 rounded bg-surface-container-high text-primary font-semibold">
                      Autonomous Dispatch Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-space-xs rounded bg-surface-container-lowest">
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">FlexLogix Worldwide</span>
                    <span className="font-label-xs text-label-xs px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface-variant">
                      Adding 1.2M sqft Midwest
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-space-md rounded-xl bg-surface-container-low space-y-space-sm">
                <h5 className="font-headline-sm text-headline-sm text-on-surface font-semibold flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-primary">newspaper</span>
                  <span>Real-Time Buying Trigger</span>
                </h5>
                <div className="p-space-sm rounded bg-surface-container-lowest space-y-1">
                  <div className="flex items-center justify-between text-on-surface-variant font-label-xs text-label-xs">
                    <span>PR Newswire Feed</span>
                    <span className="font-data-mono-sm text-data-mono-sm text-primary font-bold">3 days ago</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">
                    “Acme Cloud Logistics announces $50M regional distribution hub expansion in Dallas-Fort Worth metro.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Persistent Action Execution Dock */}
          <div className="mt-space-md pt-space-md border-t border-surface-container-low flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-space-sm">
            <div className="flex items-center flex-wrap gap-space-sm">
              <button
                onClick={() => router.push('/proposal-studio')}
                id="generate-proposal-action-btn"
                name="generate-proposal-action-btn"
                className="flex items-center gap-space-xs px-space-md py-2.5 rounded bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary transition-all font-body-md text-body-md font-medium shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
                <span>Generate Custom Proposal</span>
              </button>
              <button
                onClick={() => router.push('/voice-outreach')}
                id="launch-voice-action-btn"
                name="launch-voice-action-btn"
                className="flex items-center gap-space-xs px-space-md py-2.5 rounded bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary transition-all font-body-md text-body-md font-medium shadow-sm"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">mic</span>
                <span>Launch AI Voice Pre-call</span>
              </button>
            </div>

            <div className="flex items-center gap-space-xs flex-wrap">
              <button
                onClick={() => triggerToast('Entity synchronized to Salesforce as Qualified Enterprise Lead.')}
                id="sync-sfdc-btn"
                name="sync-sfdc-btn"
                className="flex items-center gap-1.5 px-space-sm py-2 rounded bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-body-sm text-body-sm font-medium"
                title="Push enriched dossier record directly into Salesforce CRM"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-secondary">cloud_upload</span>
                <span>Salesforce</span>
              </button>
              <button
                onClick={() => triggerToast('Entity synchronized to Microsoft Dynamics 365 Account.')}
                id="sync-dynamics-btn"
                name="sync-dynamics-btn"
                className="flex items-center gap-1.5 px-space-sm py-2 rounded bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-body-sm text-body-sm font-medium"
                title="Sync entity to Microsoft Dynamics 365 Enterprise"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">sync</span>
                <span>Dynamics 365</span>
              </button>
              <button
                onClick={() => triggerToast('Exported Executive PDF Dossier with cryptographic verification tag.')}
                id="export-dossier-btn"
                name="export-dossier-btn"
                className="p-2 rounded bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                title="Export JSON Dossier / Executive PDF Dossier"
                type="button"
                aria-label="Export Dossier"
              >
                <span className="material-symbols-outlined text-[20px]">download</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
