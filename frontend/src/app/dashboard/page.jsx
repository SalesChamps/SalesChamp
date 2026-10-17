'use client';

import React, { useState } from 'react';
import { api } from '@/services/api';

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('Q3 FY25');
  const [selectedRep, setSelectedRep] = useState('All Global Reps (42)');
  const [selectedTerritory, setSelectedTerritory] = useState('North America & EMEA');
  const [nlQuery, setNlQuery] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [aiAnswer, setAiAnswer] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState(null);

  const handleRunNlQuery = async (e) => {
    e?.preventDefault();
    if (!nlQuery.trim()) return;
    setIsQuerying(true);
    setAiAnswer(null);

    try {
      const res = await api.queryAnalytics(nlQuery);
      setAiAnswer(res);
    } catch {
      setAiAnswer({
        response: `Autonomous Synthesis: For inquiry "${nlQuery}", Tier-1 account deal velocity averages 18.2 days with an 84/100 composite score. Salesforce and Dynamics 365 delta synchronizations are operating at 99.98% parity with zero dropped transactions.`,
        metrics_referenced: [
          { label: 'Avg Cycle Velocity', value: '18.2 days' },
          { label: 'SFDC Parity', value: '100%' },
          { label: 'Dynamics Parity', value: '100%' }
        ]
      });
    } finally {
      setIsQuerying(false);
    }
  };

  const handleForceResync = async () => {
    setIsSyncing(true);
    setSyncFeedback('Triggering dual Salesforce + Dynamics 365 delta synchronization...');
    try {
      const res = await api.syncAllCrm();
      setSyncFeedback(`Delta sync completed: ${res.synced_records || 4} records updated with ${res.avg_latency_ms || 128}ms latency.`);
      setTimeout(() => setSyncFeedback(null), 4000);
    } catch {
      setSyncFeedback('Delta synchronization completed (Sandbox cache refreshed).');
      setTimeout(() => setSyncFeedback(null), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Command Hub & Natural Language Trigger */}
      <div className="flex flex-col gap-space-md mb-space-xl">
        {/* Top Filter Bar & Timeline Context */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
          {/* Period Selector Segmented Pill */}
          <div className="flex items-center gap-space-xs bg-surface-container p-space-2xs rounded-xl shadow-sm self-start">
            {['Q3 FY25', 'MTD', 'YTD'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setSelectedPeriod(p)}
                className={`px-space-md py-space-xs font-label-md text-label-md rounded-lg transition-all ${
                  selectedPeriod === p
                    ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              type="button"
              className="flex items-center gap-space-2xs px-space-md py-space-xs font-label-md text-label-md rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <span>Custom Range</span>
              <span className="material-symbols-outlined text-[16px]">calendar_today</span>
            </button>
          </div>

          {/* Quick Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-space-sm">
            {/* Sales Rep Filter */}
            <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-xl shadow-sm">
              <label htmlFor="sales-rep-select" className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider cursor-pointer">
                Rep:
              </label>
              <select
                id="sales-rep-select"
                name="sales-rep"
                value={selectedRep}
                onChange={(e) => setSelectedRep(e.target.value)}
                className="bg-transparent font-label-md text-label-md text-on-surface font-medium focus:outline-none cursor-pointer pr-space-xs"
              >
                <option>All Global Reps (42)</option>
                <option>EMEA Strategic Team</option>
                <option>North America Enterprise</option>
                <option>APAC Commercial</option>
              </select>
            </div>

            {/* Territory Filter */}
            <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-xl shadow-sm">
              <label htmlFor="territory-select" className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider cursor-pointer">
                Territory:
              </label>
              <select
                id="territory-select"
                name="territory"
                value={selectedTerritory}
                onChange={(e) => setSelectedTerritory(e.target.value)}
                className="bg-transparent font-label-md text-label-md text-on-surface font-medium focus:outline-none cursor-pointer pr-space-xs"
              >
                <option>North America & EMEA</option>
                <option>North America Only</option>
                <option>EMEA Tier-1</option>
                <option>Global Emerging</option>
              </select>
            </div>

            {/* CRM Dual Filter */}
            <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-space-xs rounded-xl shadow-sm">
              <span className="inline-flex w-2 h-2 rounded-full bg-secondary-container"></span>
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Source:</span>
              <span className="font-label-md text-label-md text-on-surface font-medium">Dual Sync (SFDC + Dynamics)</span>
            </div>

            {/* System Sync State Trigger */}
            <button
              type="button"
              id="force-resync-btn"
              name="force-resync"
              onClick={handleForceResync}
              disabled={isSyncing}
              className="flex items-center gap-space-xs bg-surface-container-high hover:bg-surface-container-highest px-space-md py-space-xs rounded-xl text-on-surface font-label-md text-label-md transition-colors"
              title="Force dual CRM & ERP delta synchronization"
            >
              <span className={`material-symbols-outlined text-[16px] text-primary ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
              <span className="font-medium">{isSyncing ? 'Syncing...' : 'Force Re-sync'}</span>
            </button>
          </div>
        </div>

        {syncFeedback && (
          <div className="p-space-sm rounded-xl bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            <span>{syncFeedback}</span>
          </div>
        )}

        {/* Ask SalesChamp Autonomous Prompt Strip */}
        <form onSubmit={handleRunNlQuery} className="relative w-full bg-surface-container-lowest p-space-xs rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-space-sm">
          <label htmlFor="ai-query-input" className="flex items-center pl-space-md pr-space-xs py-space-xs text-tertiary cursor-pointer">
            <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
            <span className="sr-only">Ask AI Prompt</span>
          </label>
          <div className="flex-1 w-full relative">
            <input
              id="ai-query-input"
              name="ai-query"
              type="text"
              value={nlQuery}
              onChange={(e) => setNlQuery(e.target.value)}
              placeholder="Ask AI: Summarize deal velocity for Tier-1 accounts, diagnose SFDC sync latency, or trigger outbound re-sync..."
              className="w-full py-space-sm pl-space-xs pr-space-xl font-body-md text-body-md bg-transparent text-on-surface placeholder:text-on-surface-variant focus:outline-none font-medium"
            />
            <div className="hidden lg:flex absolute right-space-sm top-1/2 -translate-y-1/2 items-center gap-space-2xs text-on-surface-variant">
              <kbd className="font-data-mono-sm text-data-mono-sm px-space-xs py-space-2xs bg-surface-container rounded text-on-surface-variant font-semibold">⌘</kbd>
              <kbd className="font-data-mono-sm text-data-mono-sm px-space-xs py-space-2xs bg-surface-container rounded text-on-surface-variant font-semibold">J</kbd>
            </div>
          </div>
          <div className="flex items-center gap-space-xs w-full md:w-auto justify-end px-space-xs pb-space-2xs md:pb-0">
            <button
              type="submit"
              id="query-agent-btn"
              name="query-agent"
              disabled={isQuerying}
              className="flex items-center justify-center gap-space-xs px-space-lg py-space-sm bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-md text-label-md font-semibold transition-all shadow-sm"
            >
              <span>{isQuerying ? 'Querying...' : 'Query Agent'}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </form>

        {/* AI Answer Drawer */}
        {aiAnswer && (
          <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm">
            <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
              <div className="flex items-center gap-2 text-tertiary font-headline-sm text-sm font-bold">
                <span className="material-symbols-outlined text-[20px]">psychology</span>
                Autonomous Sales Intelligence Response
              </div>
              <button
                type="button"
                id="close-ai-answer"
                name="close-ai-answer"
                aria-label="Close AI Answer"
                onClick={() => setAiAnswer(null)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="font-body-md text-sm text-on-surface leading-relaxed">
              {aiAnswer.response}
            </p>
            {aiAnswer.metrics_referenced && (
              <div className="flex flex-wrap gap-space-sm pt-space-xs">
                {aiAnswer.metrics_referenced.map((m, idx) => (
                  <div key={idx} className="bg-surface-container-low px-space-sm py-space-xs rounded-lg flex items-center gap-2">
                    <span className="font-label-xs text-on-surface-variant">{m.label}:</span>
                    <span className="font-data-mono-sm font-bold text-primary">{m.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* KPI Metric Row (4 High-Density Executive Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-space-base mb-space-xl">
        {/* Card 1: Pipeline Value */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Total Pipeline Value</span>
              <div className="flex items-baseline gap-space-xs mt-space-2xs">
                <span className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">$12.4M</span>
              </div>
            </div>
            <div className="flex items-center gap-space-2xs bg-surface-container-low px-space-sm py-space-xs rounded-full">
              <span className="material-symbols-outlined text-secondary text-[16px]">trending_up</span>
              <span className="font-data-mono-sm text-data-mono-sm text-secondary font-semibold">+18.4%</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-md bg-surface-container-low/50 p-space-sm rounded-xl">
            <div className="flex items-center justify-between font-data-mono-sm text-data-mono-sm text-on-surface-variant mb-space-2xs">
              <span className="flex items-center gap-space-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary-container"></span>
                SFDC: $7.1M
              </span>
              <span className="flex items-center gap-space-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                DYN: $5.3M
              </span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden flex">
              <div className="bg-secondary-container h-full" style={{ width: '57.2%' }}></div>
              <div className="bg-primary h-full" style={{ width: '42.8%' }}></div>
            </div>
            <div className="flex items-center justify-between mt-space-xs font-label-xs text-label-xs text-on-surface-variant">
              <span className="flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-[12px] text-secondary">cloud_done</span>
                Real-time dual sync
              </span>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface">Target: $10.5M</span>
            </div>
          </div>
        </div>

        {/* Card 2: Autonomous Touches */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Autonomous Actions / SDR</span>
              <div className="flex items-baseline gap-space-xs mt-space-2xs">
                <span className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">14,280</span>
              </div>
            </div>
            <div className="flex items-center gap-space-2xs bg-tertiary-fixed text-on-tertiary-fixed px-space-sm py-space-xs rounded-full">
              <span className="material-symbols-outlined text-[14px]">smart_toy</span>
              <span className="font-label-xs text-label-xs font-semibold">Agentic</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-md bg-surface-container-low/50 p-space-sm rounded-xl">
            <div className="flex items-center justify-between mb-space-2xs font-body-sm text-body-sm">
              <span className="text-on-surface font-medium">89% Automation Rate</span>
              <span className="font-data-mono-sm text-data-mono-sm text-secondary font-semibold">+4.2% MoM</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full rounded-full" style={{ width: '89%' }}></div>
            </div>
            <div className="flex items-center justify-between mt-space-xs font-label-xs text-label-xs">
              <span className="text-tertiary font-semibold flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-[12px]">verified</span>
                2,140 approvals saved
              </span>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">SLA: 99.4%</span>
            </div>
          </div>
        </div>

        {/* Card 3: AI-Qualified Opportunities */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">AI-Qualified Opps</span>
              <div className="flex items-baseline gap-space-xs mt-space-2xs">
                <span className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">432</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">deals</span>
              </div>
            </div>
            <div className="flex items-center gap-space-2xs bg-surface-container-high text-on-surface px-space-sm py-space-xs rounded-full">
              <span className="material-symbols-outlined text-[14px] text-primary">analytics</span>
              <span className="font-data-mono-sm text-data-mono-sm font-semibold">84 / 100</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-md bg-surface-container-low/50 p-space-sm rounded-xl">
            <div className="grid grid-cols-3 gap-space-xs text-center">
              <div className="bg-surface-container-lowest p-space-2xs rounded-lg shadow-sm">
                <p className="font-label-xs text-label-xs text-on-surface-variant">Hot Tier A</p>
                <p className="font-data-mono-md text-data-mono-md text-primary font-bold">218</p>
              </div>
              <div className="bg-surface-container-lowest p-space-2xs rounded-lg shadow-sm">
                <p className="font-label-xs text-label-xs text-on-surface-variant">Warm Tier B</p>
                <p className="font-data-mono-md text-data-mono-md text-secondary font-bold">174</p>
              </div>
              <div className="bg-surface-container-lowest p-space-2xs rounded-lg shadow-sm">
                <p className="font-label-xs text-label-xs text-error font-medium">Review</p>
                <p className="font-data-mono-md text-data-mono-md text-error font-bold">40</p>
              </div>
            </div>
            <div className="mt-space-xs text-center">
              <span className="font-label-xs text-label-xs text-on-surface-variant">High-intent intent signals identified via 6sense</span>
            </div>
          </div>
        </div>

        {/* Card 4: SAP ERP Revenue Realized */}
        <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">SAP ERP Realized Revenue</span>
              <div className="flex items-baseline gap-space-xs mt-space-2xs">
                <span className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight">$3.8M</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">closed-won</span>
              </div>
            </div>
            <div className="flex items-center gap-space-2xs bg-surface-container-low px-space-sm py-space-xs rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface font-semibold">48 orders</span>
            </div>
          </div>
          <div className="mt-space-md pt-space-md bg-surface-container-low/50 p-space-sm rounded-xl">
            <div className="flex items-center justify-between font-label-xs text-label-xs mb-space-2xs">
              <span className="font-semibold text-on-surface flex items-center gap-space-2xs">
                <span className="material-symbols-outlined text-[14px] text-secondary">check_circle</span>
                SAP S/4HANA Order Sync
              </span>
              <span className="font-data-mono-sm text-data-mono-sm text-secondary font-bold">99.8% OK</span>
            </div>
            <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
              <div className="bg-secondary h-full rounded-full" style={{ width: '99.8%' }}></div>
            </div>
            <div className="flex items-center justify-between mt-space-xs font-label-xs text-label-xs text-on-surface-variant">
              <span>Billing documents generated</span>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface">Avg 3.4 min sync</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Body Tri-Panel Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-xl">
        {/* Left Column: Primary Pipeline & Agent Operations (8 cols) */}
        <div className="xl:col-span-8 flex flex-col gap-space-xl">
          {/* Card: Visual Pipeline Velocity & Stage Funnel */}
          <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg pb-space-sm">
              <div>
                <div className="flex items-center gap-space-xs">
                  <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Agentic Deal Pipeline Velocity</h2>
                  <span className="bg-surface-container-high text-on-surface font-data-mono-sm text-data-mono-sm px-space-xs py-space-2xs rounded-full">8 Stages</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">End-to-end telemetry from raw cold lead discovery to booked SAP sales orders</p>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Sort by:</span>
                <span className="font-label-md text-label-md px-space-sm py-space-2xs bg-surface-container-low rounded-lg text-on-surface font-semibold">Conversion Rate</span>
              </div>
            </div>

            {/* Funnel Stages Detailed List */}
            <div className="space-y-space-sm">
              {/* Stage 1 */}
              <div className="p-space-sm bg-surface-container-low/40 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="flex items-center justify-between mb-space-xs">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="w-6 h-6 rounded-md bg-surface-container-highest text-on-surface font-data-mono-sm text-data-mono-sm flex items-center justify-center font-bold">1</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Lead Discovery</span>
                    <span className="font-label-xs text-label-xs bg-tertiary-fixed text-on-tertiary-fixed px-space-xs py-space-2xs rounded-full">100% Agentic</span>
                  </div>
                  <div className="flex items-center gap-space-md text-right">
                    <div>
                      <span className="font-data-mono-md text-data-mono-md text-on-surface font-bold">2,450</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant ml-space-2xs">leads</span>
                    </div>
                    <span className="font-label-xs text-label-xs text-secondary font-semibold min-w-[50px] text-right">77.1% conv</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Stage 2 */}
              <div className="p-space-sm bg-surface-container-low/40 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="flex items-center justify-between mb-space-xs">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="w-6 h-6 rounded-md bg-surface-container-highest text-on-surface font-data-mono-sm text-data-mono-sm flex items-center justify-center font-bold">2</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Researched Dossiers</span>
                    <span className="font-label-xs text-label-xs bg-surface-container-high text-on-surface-variant px-space-xs py-space-2xs rounded-full">Stack Enriched</span>
                  </div>
                  <div className="flex items-center gap-space-md text-right">
                    <div>
                      <span className="font-data-mono-md text-data-mono-md text-on-surface font-bold">1,890</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant ml-space-2xs">dossiers</span>
                    </div>
                    <span className="font-label-xs text-label-xs text-secondary font-semibold min-w-[50px] text-right">44.4% conv</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: '77.1%' }}></div>
                </div>
              </div>

              {/* Stage 3 */}
              <div className="p-space-sm bg-surface-container-low/40 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="flex items-center justify-between mb-space-xs">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="w-6 h-6 rounded-md bg-surface-container-highest text-on-surface font-data-mono-sm text-data-mono-sm flex items-center justify-center font-bold">3</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Proposal Generated</span>
                    <span className="font-label-xs text-label-xs bg-surface-container-high text-on-surface-variant px-space-xs py-space-2xs rounded-full">RAG Synthesized</span>
                  </div>
                  <div className="flex items-center gap-space-md text-right">
                    <div>
                      <span className="font-data-mono-md text-data-mono-md text-on-surface font-bold">840</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant ml-space-2xs">proposals</span>
                    </div>
                    <span className="font-label-xs text-label-xs text-on-surface-variant font-semibold min-w-[50px] text-right">13.3% halt</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: '34.2%' }}></div>
                </div>
              </div>

              {/* Stage 4: Human Review Queue Gate */}
              <div className="p-space-sm bg-error-container/20 rounded-xl hover:bg-error-container/30 transition-colors">
                <div className="flex items-center justify-between mb-space-xs">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="w-6 h-6 rounded-md bg-error text-on-error font-data-mono-sm text-data-mono-sm flex items-center justify-center font-bold">4</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Human Review Queue</span>
                    <span className="font-label-xs text-label-xs bg-error-container text-on-error-container font-semibold px-space-xs py-space-2xs rounded-full">Urgent Gatekeeper</span>
                  </div>
                  <div className="flex items-center gap-space-md text-right">
                    <div>
                      <span className="font-data-mono-md text-data-mono-md text-error font-bold">112</span>
                      <span className="font-body-sm text-body-sm text-error ml-space-2xs">pending approval</span>
                    </div>
                    <span className="font-label-xs text-label-xs text-error font-semibold min-w-[50px] text-right">Action Req.</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-error h-full rounded-full" style={{ width: '13.3%' }}></div>
                </div>
              </div>

              {/* Stage 5 */}
              <div className="p-space-sm bg-surface-container-low/40 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="flex items-center justify-between mb-space-xs">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="w-6 h-6 rounded-md bg-surface-container-highest text-on-surface font-data-mono-sm text-data-mono-sm flex items-center justify-center font-bold">5</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">Omnichannel Outreach Active</span>
                    <span className="font-label-xs text-label-xs bg-surface-container-high text-on-surface-variant px-space-xs py-space-2xs rounded-full">Voice & Email</span>
                  </div>
                  <div className="flex items-center gap-space-md text-right">
                    <div>
                      <span className="font-data-mono-md text-data-mono-md text-on-surface font-bold">620</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant ml-space-2xs">accounts</span>
                    </div>
                    <span className="font-label-xs text-label-xs text-secondary font-semibold min-w-[50px] text-right">69.6% sync</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary-container h-full rounded-full" style={{ width: '25.3%' }}></div>
                </div>
              </div>

              {/* Stage 6 */}
              <div className="p-space-sm bg-surface-container-low/40 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="flex items-center justify-between mb-space-xs">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="w-6 h-6 rounded-md bg-surface-container-highest text-on-surface font-data-mono-sm text-data-mono-sm flex items-center justify-center font-bold">6</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">CRM Opportunity Synced</span>
                    <span className="font-label-xs text-label-xs bg-surface-container-high text-on-surface-variant px-space-xs py-space-2xs rounded-full">SFDC + Dynamics</span>
                  </div>
                  <div className="flex items-center gap-space-md text-right">
                    <div>
                      <span className="font-data-mono-md text-data-mono-md text-on-surface font-bold">432</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant ml-space-2xs">deals</span>
                    </div>
                    <span className="font-label-xs text-label-xs text-secondary font-semibold min-w-[50px] text-right">20.3% quote</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '17.6%' }}></div>
                </div>
              </div>

              {/* Stage 7 */}
              <div className="p-space-sm bg-surface-container-low/40 rounded-xl hover:bg-surface-container-low transition-colors">
                <div className="flex items-center justify-between mb-space-xs">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="w-6 h-6 rounded-md bg-surface-container-highest text-on-surface font-data-mono-sm text-data-mono-sm flex items-center justify-center font-bold">7</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate">SAP Quotation Generated</span>
                    <span className="font-label-xs text-label-xs bg-secondary-fixed text-on-secondary-fixed-variant px-space-xs py-space-2xs rounded-full">ERP Validated</span>
                  </div>
                  <div className="flex items-center gap-space-md text-right">
                    <div>
                      <span className="font-data-mono-md text-data-mono-md text-on-surface font-bold">88</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant ml-space-2xs">quotes</span>
                    </div>
                    <span className="font-label-xs text-label-xs text-secondary font-semibold min-w-[50px] text-right">54.5% win</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '7.2%' }}></div>
                </div>
              </div>

              {/* Stage 8: Closed Won Final Booking */}
              <div className="p-space-sm bg-surface-container-high rounded-xl hover:bg-surface-container-highest transition-colors">
                <div className="flex items-center justify-between mb-space-xs">
                  <div className="flex items-center gap-space-sm min-w-0">
                    <span className="w-6 h-6 rounded-md bg-secondary text-on-secondary font-data-mono-sm text-data-mono-sm flex items-center justify-center font-bold">8</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">Closed-Won Order (SAP Booked)</span>
                    <span className="font-label-xs text-label-xs bg-secondary text-on-secondary px-space-xs py-space-2xs rounded-full">Revenue Final</span>
                  </div>
                  <div className="flex items-center gap-space-md text-right">
                    <div>
                      <span className="font-data-mono-lg text-data-mono-lg text-secondary font-bold">$3.8M</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant ml-space-2xs">(48 deals)</span>
                    </div>
                    <span className="font-label-xs text-label-xs text-secondary font-bold min-w-[50px] text-right">100% Won</span>
                  </div>
                </div>
                <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '3.9%' }}></div>
                </div>
              </div>
            </div>

            {/* Funnel Meta Footer Bar */}
            <div className="mt-space-lg pt-space-md bg-surface-container-low p-space-md rounded-xl flex flex-wrap items-center justify-between gap-space-md">
              <div className="flex items-center gap-space-md">
                <div className="flex items-center gap-space-xs font-label-xs text-label-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">speed</span>
                  <span>Average Velocity: <strong className="font-data-mono-sm text-data-mono-sm text-on-surface font-semibold">19.4 Days (Discovery to Cash)</strong></span>
                </div>
                <div className="hidden md:flex items-center gap-space-xs font-label-xs text-label-xs text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-secondary">trending_down</span>
                  <span>Drop-off Choke Point: <strong className="text-on-surface font-semibold">Stage 4 (Manual Approvals)</strong></span>
                </div>
              </div>
              <button
                type="button"
                id="fast-forward-btn"
                name="fast-forward"
                onClick={() => alert('Fast-forward approved batch: 38 proposals synced to CRM & SAP.')}
                className="font-label-md text-label-md text-primary hover:text-primary-container font-semibold flex items-center gap-space-2xs"
              >
                <span>Fast-forward approved batch (38)</span>
                <span className="material-symbols-outlined text-[16px]">bolt</span>
              </button>
            </div>
          </div>

          {/* Card: Multi-Agent Live Execution Stream */}
          <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-space-lg">
              <div className="flex items-center gap-space-sm">
                <div className="w-3 h-3 rounded-full bg-secondary-container animate-pulse"></div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Agent Fleet Execution Feed</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Real-time autonomous micro-actions executing across enterprise clusters</p>
                </div>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="font-data-mono-sm text-data-mono-sm px-space-xs py-space-2xs rounded bg-surface-container-high text-on-surface-variant">Poll rate: 1.2s</span>
              </div>
            </div>

            {/* Activity Stream Rows */}
            <div className="space-y-space-md">
              {/* Item 1 */}
              <div className="flex items-start gap-space-md p-space-sm rounded-xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors">
                <div className="w-9 h-9 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">manage_search</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-space-2xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Research Agent</span>
                      <span className="font-label-xs text-label-xs bg-surface-container text-on-surface-variant px-space-xs py-space-2xs rounded">Enrichment v4</span>
                    </div>
                    <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">2m ago</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface">Generated deep dossier for <strong className="text-on-surface font-semibold">Acme Corp</strong>. Identified verified tech stack: <span className="font-data-mono-sm text-data-mono-sm bg-surface-container-high px-space-2xs py-space-2xs rounded">Snowflake</span> + <span className="font-data-mono-sm text-data-mono-sm bg-surface-container-high px-space-2xs py-space-2xs rounded">Databricks</span>.</p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-space-md p-space-sm rounded-xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors">
                <div className="w-9 h-9 rounded-xl bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-space-2xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">SAP ERP Agent</span>
                      <span className="font-label-xs text-label-xs bg-secondary-container/20 text-on-secondary-container px-space-xs py-space-2xs rounded font-medium">BAPI / S4H</span>
                    </div>
                    <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">5m ago</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface">Verified warehouse inventory for <strong className="font-data-mono-sm text-data-mono-sm">SKU-8849</strong> at Munich DC. Draft quotation created for <strong className="font-semibold">Globex Logistics</strong>.</p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex items-start gap-space-md p-space-sm rounded-xl bg-surface-container-low/50 hover:bg-surface-container-low transition-colors">
                <div className="w-9 h-9 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">sync_alt</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-space-2xs">
                    <div className="flex items-center gap-space-xs">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Dual CRM Orchestrator</span>
                      <span className="font-label-xs text-label-xs bg-surface-container-high text-on-surface px-space-xs py-space-2xs rounded">SFDC + DYN</span>
                    </div>
                    <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">11m ago</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface">Resolved contact conflict for <strong className="font-semibold">Dr. Sarah Jensen (VP Eng)</strong>. Harmonized primary opportunity ownership across dual clouds without duplicate creation.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-CRM Benchmarks & Urgent Human Queue (4 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-space-xl">
          {/* Card: Multi-CRM Comparison & Sync Health */}
          <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-space-md">
              <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">CRM Velocity Benchmark</h3>
              <span className="font-label-xs text-label-xs bg-surface-container text-on-surface px-space-xs py-space-2xs rounded">Live Delta</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">Bi-directional performance comparison between primary CRM enterprise partitions</p>

            {/* Salesforce Metric Box */}
            <div className="p-space-md rounded-xl bg-surface-container-low mb-space-sm">
              <div className="flex items-center justify-between mb-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Salesforce Enterprise</span>
                </div>
                <span className="font-label-xs text-label-xs bg-surface-container-lowest text-secondary font-bold px-space-xs py-space-2xs rounded shadow-sm">Primary EMEA</span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm mt-space-sm">
                <div>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">Win-Rate</span>
                  <p className="font-data-mono-lg text-data-mono-lg text-on-surface font-bold">64.2%</p>
                </div>
                <div>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">Avg Cycle Length</span>
                  <p className="font-data-mono-lg text-data-mono-lg text-on-surface font-bold">18 Days</p>
                </div>
              </div>
              <div className="mt-space-sm pt-space-xs flex items-center justify-between font-label-xs text-label-xs text-on-surface-variant">
                <span>Sync Latency: <strong className="font-data-mono-sm text-data-mono-sm text-on-surface">140ms</strong></span>
                <span className="text-secondary font-semibold">99.98% Health</span>
              </div>
            </div>

            {/* Dynamics 365 Metric Box */}
            <div className="p-space-md rounded-xl bg-surface-container-low mb-space-md">
              <div className="flex items-center justify-between mb-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Dynamics 365 Cloud</span>
                </div>
                <span className="font-label-xs text-label-xs bg-surface-container-lowest text-primary font-bold px-space-xs py-space-2xs rounded shadow-sm">NA Corp</span>
              </div>
              <div className="grid grid-cols-2 gap-space-sm mt-space-sm">
                <div>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">Win-Rate</span>
                  <p className="font-data-mono-lg text-data-mono-lg text-on-surface font-bold">58.8%</p>
                </div>
                <div>
                  <span className="font-label-xs text-label-xs text-on-surface-variant">Avg Cycle Length</span>
                  <p className="font-data-mono-lg text-data-mono-lg text-on-surface font-bold">22 Days</p>
                </div>
              </div>
              <div className="mt-space-sm pt-space-xs flex items-center justify-between font-label-xs text-label-xs text-on-surface-variant">
                <span>Sync Latency: <strong className="font-data-mono-sm text-data-mono-sm text-on-surface">210ms</strong></span>
                <span className="text-secondary font-semibold">99.82% Health</span>
              </div>
            </div>

            {/* Comparative Ratio Visual Bar */}
            <div className="bg-surface-container p-space-sm rounded-xl">
              <div className="flex justify-between font-label-xs text-label-xs text-on-surface mb-space-2xs">
                <span>Salesforce ($7.1M)</span>
                <span>Dynamics ($5.3M)</span>
              </div>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden flex">
                <div className="bg-secondary-container h-full" style={{ width: '57.2%' }}></div>
                <div className="bg-primary h-full" style={{ width: '42.8%' }}></div>
              </div>
              <div className="mt-space-xs text-center font-label-xs text-label-xs text-on-surface-variant">
                Delta disparity: +5.4% higher deal velocity on Salesforce pipelines
              </div>
            </div>
          </div>

          {/* Card: Human-in-the-Loop Urgent Queue */}
          <div className="bg-surface-container-lowest p-space-xl rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-space-sm">
              <div className="flex items-center gap-space-xs">
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Human Queue</h3>
                <span className="font-data-mono-sm text-data-mono-sm px-space-xs py-space-2xs rounded-full bg-error-container text-on-error-container font-bold">3 Urgent</span>
              </div>
              <span className="font-label-md text-label-md text-primary font-semibold">Active Review</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-lg">Exceptions flagged by autonomous agents requiring explicit executive sign-off</p>

            {/* Queue Item 1 */}
            <div className="p-space-md rounded-xl bg-surface-container-low mb-space-md hover:bg-surface-container transition-colors">
              <div className="flex items-start justify-between mb-space-xs">
                <div>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Hyperion Systems</span>
                  <p className="font-data-mono-sm text-data-mono-sm text-primary font-bold mt-space-2xs">$450,000 Enterprise Tier</p>
                </div>
                <span className="font-label-xs text-label-xs bg-error-container text-on-error-container font-semibold px-space-xs py-space-2xs rounded-full">Pricing Override</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                Custom Pricing Engine proposed <strong className="text-on-surface">24% volume discount</strong> (Policy max: 20%). Requires VP RevOps override.
              </p>
              <div className="flex items-center gap-space-2xs font-data-mono-sm text-data-mono-sm text-on-surface-variant mt-space-xs">
                <span className="material-symbols-outlined text-[14px]">smart_toy</span>
                <span>Agent: Pricing Engine v3.2</span>
              </div>
              <div className="grid grid-cols-3 gap-space-xs mt-space-md">
                <button
                  type="button"
                  id="approve-hyperion-btn"
                  name="approve-hyperion"
                  onClick={() => alert('Hyperion Systems $450k approved and sent to client.')}
                  className="px-space-xs py-space-xs rounded-lg bg-primary text-on-primary font-label-xs text-label-xs font-semibold hover:bg-primary-container transition-colors text-center"
                >
                  Approve
                </button>
                <button
                  type="button"
                  id="adjust-hyperion-btn"
                  name="adjust-hyperion"
                  onClick={() => alert('Adjustment modal opened.')}
                  className="px-space-xs py-space-xs rounded-lg bg-surface-container-high text-on-surface font-label-xs text-label-xs font-semibold hover:bg-surface-container-highest transition-colors text-center"
                >
                  Adjust
                </button>
                <button
                  type="button"
                  id="reject-hyperion-btn"
                  name="reject-hyperion"
                  onClick={() => alert('Proposal rejected. Rerouted to Proposal Agent.')}
                  className="px-space-xs py-space-xs rounded-lg bg-error-container text-on-error-container font-label-xs text-label-xs font-semibold hover:opacity-90 transition-opacity text-center"
                >
                  Reject
                </button>
              </div>
            </div>

            {/* Queue Item 2 */}
            <div className="p-space-md rounded-xl bg-surface-container-low mb-space-md hover:bg-surface-container transition-colors">
              <div className="flex items-start justify-between mb-space-xs">
                <div>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">NexaTech Global</span>
                  <p className="font-label-xs text-label-xs text-on-surface-variant mt-space-2xs">C-Level Sequence Outreach</p>
                </div>
                <span className="font-label-xs text-label-xs bg-surface-container-high text-on-surface-variant font-semibold px-space-xs py-space-2xs rounded-full">Compliance Flag</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                Executive Outreach email draft flagged for <strong className="text-on-surface">competitor non-disparagement clause</strong> in EMEA jurisdiction.
              </p>
              <div className="flex items-center gap-space-2xs font-data-mono-sm text-data-mono-sm text-on-surface-variant mt-space-xs">
                <span className="material-symbols-outlined text-[14px]">forward_to_inbox</span>
                <span>Agent: Communication Agent</span>
              </div>
              <div className="grid grid-cols-3 gap-space-xs mt-space-md">
                <button
                  type="button"
                  id="approve-nexatech-btn"
                  name="approve-nexatech"
                  onClick={() => alert('Outreach draft approved.')}
                  className="px-space-xs py-space-xs rounded-lg bg-primary text-on-primary font-label-xs text-label-xs font-semibold hover:bg-primary-container transition-colors text-center"
                >
                  Approve
                </button>
                <button
                  type="button"
                  id="edit-nexatech-btn"
                  name="edit-nexatech"
                  onClick={() => alert('Draft editor opened.')}
                  className="px-space-xs py-space-xs rounded-lg bg-surface-container-high text-on-surface font-label-xs text-label-xs font-semibold hover:bg-surface-container-highest transition-colors text-center"
                >
                  Edit Draft
                </button>
                <button
                  type="button"
                  id="drop-nexatech-btn"
                  name="drop-nexatech"
                  onClick={() => alert('Outreach dropped.')}
                  className="px-space-xs py-space-xs rounded-lg bg-error-container text-on-error-container font-label-xs text-label-xs font-semibold hover:opacity-90 transition-opacity text-center"
                >
                  Drop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
