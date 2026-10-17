'use client';

import React, { useState } from 'react';

export default function CRMInteroperabilityPage() {
  const [conflictResolved, setConflictResolved] = useState(false);
  const [copilotConsolidated, setCopilotConsolidated] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleResolveConflict = () => {
    setConflictResolved(true);
    showToast('Resolved delta: Salesforce phone +1 (312) 849-2910 synced to Dynamics 365 telephone1.');
  };

  const handleAcceptCopilot = () => {
    setCopilotConsolidated(true);
    showToast('Dynamics Copilot: Hamburg distribution center DE-HAM-901 consolidated with billing record.');
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      showToast('Bi-directional force re-scan completed: 0 schema drifts, 2.1M records validated.');
    }, 1400);
  };

  return (
    <div className="flex flex-col w-full space-y-space-xl">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-space-sm rounded-xl bg-primary-container text-on-primary-container text-xs font-medium shadow-md flex items-center justify-between transition-all">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} aria-label="Dismiss toast">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Header & Connection Ribbon */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-space-base pb-space-xs">
        <div className="space-y-space-2xs">
          <div className="flex items-center gap-space-sm">
            <span className="font-data-mono-sm text-data-mono-sm uppercase tracking-wider text-primary font-semibold">
              Integrations • Bi-Directional CDC
            </span>
            <span className="font-label-xs text-label-xs bg-surface-container-high text-on-surface-variant px-space-xs py-space-2xs rounded font-medium">
              Cluster v4.8
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
            Dual CRM Interoperability &amp; Deduplication Engine
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
            Autonomous schema transformation, delta-event streaming, and deterministic deduplication reconciling Salesforce Enterprise &amp; Microsoft Dynamics 365 in real time.
          </p>
        </div>

        {/* Active Connection Nodes */}
        <div className="flex flex-wrap items-center gap-space-sm">
          <div className="flex items-center gap-space-sm px-space-md py-space-sm bg-surface-container-lowest rounded-xl shadow-sm border border-[#E2E8F0]">
            <div className="w-7 h-7 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant font-bold text-xs">
              SF
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-label-xs text-label-xs text-on-surface font-semibold">Salesforce REST v59.0</span>
              </div>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Connected • 140ms latency</span>
            </div>
          </div>

          <div className="flex items-center gap-space-sm px-space-md py-space-sm bg-surface-container-lowest rounded-xl shadow-sm border border-[#E2E8F0]">
            <div className="w-7 h-7 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-bold text-xs">
              D365
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-label-xs text-label-xs text-on-surface font-semibold">MS Dynamics 365 v9.2</span>
              </div>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Connected • 210ms latency</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Metric Ribbon (4 stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-base">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-[#E2E8F0] relative overflow-hidden flex flex-col justify-between space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant font-semibold">Sync Latency</span>
            <span className="p-1 rounded bg-surface-container-low text-primary">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold">1.2s</span>
              <span className="font-data-mono-sm text-data-mono-sm text-emerald-600 font-semibold">-0.4s vs avg</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-1">Real-time CDC webhook streaming</p>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: '86%' }}></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-[#E2E8F0] relative overflow-hidden flex flex-col justify-between space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant font-semibold">Deduplicated Contacts</span>
            <span className="p-1 rounded bg-surface-container-low text-secondary">
              <span className="material-symbols-outlined text-[18px]">call_merge</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold">1,842</span>
              <span className="font-data-mono-sm text-data-mono-sm text-secondary font-semibold">+14 today</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-1">Merged records without data loss</p>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{ width: '94%' }}></div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-[#E2E8F0] relative overflow-hidden flex flex-col justify-between space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant font-semibold">Bi-directional Conflict Rate</span>
            <span className="p-1 rounded bg-emerald-50 text-emerald-700">
              <span className="material-symbols-outlined text-[18px]">verified</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold">0.18%</span>
              <span className="font-data-mono-sm text-data-mono-sm text-emerald-600 font-semibold">Below 0.20% SLA</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-1">Strict ACID reconciliation state</p>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '28%' }}></div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-[#E2E8F0] relative overflow-hidden flex flex-col justify-between space-y-space-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant font-semibold">Auto-Resolved Conflicts</span>
            <span className="p-1 rounded bg-tertiary-fixed text-on-tertiary-fixed-variant">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
            </span>
          </div>
          <div>
            <div className="flex items-baseline gap-space-xs">
              <span className="font-headline-lg text-headline-lg text-on-surface font-bold">328</span>
              <span className="font-data-mono-sm text-data-mono-sm text-tertiary font-semibold">100% autonomous</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-1">Handled by RevOps Agent today</p>
          </div>
          <div className="w-full bg-surface-container-low h-1 rounded-full overflow-hidden">
            <div className="bg-tertiary h-full rounded-full" style={{ width: '98%' }}></div>
          </div>
        </div>
      </div>

      {/* Main Tri-Pane Live Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-base items-stretch">
        {/* LEFT PANE: Salesforce Enterprise Instance (5 cols) */}
        <div className="lg:col-span-5 flex flex-col bg-surface-container-lowest rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
          {/* Instance Header */}
          <div className="p-space-base bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#00A1E0] text-white flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">cloud</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-label-xs text-label-xs text-[#00A1E0] font-bold uppercase tracking-wider">Salesforce CRM</span>
                  <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant truncate">ID: 0015e00000X9yAa</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">Acme Cloud Logistics</h3>
              </div>
            </div>
            <span className="font-label-xs text-label-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold border border-emerald-200 shrink-0">
              Master Record
            </span>
          </div>

          {/* Opportunity Fields */}
          <div className="p-space-base space-y-space-md border-b border-[#F1F5F9]">
            <div className="flex items-center justify-between">
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider font-semibold">Opportunity Details</span>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">sObject: Opportunity</span>
            </div>
            <div className="space-y-space-sm bg-surface-container-low/50 p-space-sm rounded-lg">
              <div className="flex justify-between items-start text-sm">
                <span className="text-on-surface-variant font-medium">Deal Name</span>
                <span className="text-on-surface font-semibold text-right">Autonomous ERP Orchestration Pod</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Sales Stage</span>
                <span className="font-label-xs text-label-xs bg-primary-fixed text-on-primary-fixed-variant px-space-sm py-0.5 rounded-full font-semibold">
                  Negotiation / Review
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Annual Value (ARR)</span>
                <span className="font-data-mono-md text-data-mono-md text-on-surface font-bold text-primary-container">$164,000 ARR</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Target Close Date</span>
                <span className="font-data-mono-sm text-data-mono-sm text-on-surface font-medium">2025-10-28 (ISO 8601)</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Assigned Rep &amp; Agent</span>
                <span className="text-on-surface font-medium text-xs flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                  Marcus Vance / AI David
                </span>
              </div>
            </div>

            {/* Contact Roles in Salesforce */}
            <div className="space-y-space-xs pt-1">
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider font-semibold">Associated Contact Roles</span>
              <div className="space-y-1.5">
                <div className="p-space-sm rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-bold text-xs">
                      MV
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-on-surface truncate">Marcus Vance</p>
                      <p className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">+1 (312) 849-2910</p>
                    </div>
                  </div>
                  <span className="font-label-xs text-label-xs bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant">VP Supply Chain</span>
                </div>

                <div className="p-space-sm rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-bold text-xs">
                      ER
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-on-surface truncate">Elena Rostova</p>
                      <p className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">+1 (312) 849-3304</p>
                    </div>
                  </div>
                  <span className="font-label-xs text-label-xs bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant">CTO</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Timeline (SF CDC Stream) */}
          <div className="p-space-base flex-1 flex flex-col justify-between bg-surface-container-lowest">
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider font-semibold">Recent SF CDC Events</span>
                <span className="font-data-mono-sm text-data-mono-sm text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live Stream
                </span>
              </div>
              <div className="space-y-2 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-[#E2E8F0] ml-1">
                <div className="relative flex items-start gap-3 pl-6 text-xs">
                  <span className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-white"></span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-on-surface truncate">Autonomous Voice Outreach call completed</p>
                    <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">14m ago • Logged to Task/CallDisposition</span>
                  </div>
                </div>
                <div className="relative flex items-start gap-3 pl-6 text-xs">
                  <span className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-secondary ring-4 ring-white"></span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-on-surface truncate">S/4HANA Order Quote generated &amp; attached</p>
                    <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">22m ago • SAP Sync Ref: 9004218</span>
                  </div>
                </div>
                <div className="relative flex items-start gap-3 pl-6 text-xs">
                  <span className="absolute left-1.5 top-1 w-3 h-3 rounded-full bg-on-surface-variant ring-4 ring-white"></span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-on-surface truncate">SendGrid follow-up dispatched to Elena Rostova</p>
                    <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">48m ago • Opened (tracking click)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-on-surface-variant">
              <span>CDC Subscriber: <span className="font-data-mono-sm text-data-mono-sm font-semibold text-on-surface">Apex CometD-2.8</span></span>
              <span className="font-data-mono-sm text-data-mono-sm">Queue: 0 pending</span>
            </div>
          </div>
        </div>

        {/* CENTER PANE: Conflict Resolver & Schema Bridge (2 cols) */}
        <div className="lg:col-span-2 flex flex-col space-y-space-base justify-between">
          {/* Bridge Rules Card */}
          <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm border border-[#E2E8F0] space-y-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-xs text-label-xs uppercase tracking-wider text-primary font-bold">Schema Bridge</span>
              <span className="material-symbols-outlined text-primary text-[18px]">sync_alt</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Deterministic field transformations applied on ingress.</p>

            <div className="space-y-2 pt-1">
              {/* Field 1: Name */}
              <div className="p-2 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant truncate">Account.Name</span>
                  <span className="material-symbols-outlined text-emerald-600 text-[14px]">swap_horiz</span>
                  <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant truncate">account.name</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-1 text-emerald-700">
                  <span className="material-symbols-outlined text-[12px]">check_circle</span>
                  <span className="font-label-xs text-label-xs font-semibold">100% Match</span>
                </div>
              </div>

              {/* Field 2: Amount */}
              <div className="p-2 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-center">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant truncate">Amount</span>
                  <span className="material-symbols-outlined text-emerald-600 text-[14px]">swap_horiz</span>
                  <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant truncate">estimatedval</span>
                </div>
                <div className="flex items-center justify-center gap-1 mt-1 text-emerald-700">
                  <span className="material-symbols-outlined text-[12px]">check_circle</span>
                  <span className="font-label-xs text-label-xs font-semibold">$164k Reconciled</span>
                </div>
              </div>

              {/* Field 3: Phone (Conflict) */}
              <div className={`p-2.5 rounded-lg border text-center shadow-sm ${
                conflictResolved ? 'bg-emerald-50 border-emerald-300' : 'bg-amber-50/80 border-amber-300'
              }`}>
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-data-mono-sm text-data-mono-sm font-bold truncate ${conflictResolved ? 'text-emerald-900' : 'text-amber-900'}`}>
                    Phone
                  </span>
                  <span className={`material-symbols-outlined text-[14px] ${conflictResolved ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {conflictResolved ? 'check_circle' : 'error'}
                  </span>
                  <span className={`font-data-mono-sm text-data-mono-sm font-bold truncate ${conflictResolved ? 'text-emerald-900' : 'text-amber-900'}`}>
                    telephone1
                  </span>
                </div>
                <div className="mt-1.5">
                  <span className={`font-label-xs text-label-xs px-1.5 py-0.5 rounded font-bold ${
                    conflictResolved ? 'bg-emerald-200 text-emerald-900' : 'bg-amber-200/60 text-amber-900'
                  }`}>
                    {conflictResolved ? 'Reconciled' : 'Delta Detected'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Conflict Resolution Action Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/40 rounded-xl p-space-base border border-amber-200 shadow-sm flex flex-col justify-between space-y-space-sm">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-amber-800 text-[18px]">warning</span>
                <span className="font-label-xs text-label-xs uppercase font-bold text-amber-900 tracking-wider">
                  Conflict Resolver
                </span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">
                {conflictResolved ? 'Phone Synced' : 'Phone & Title Mismatch'}
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                {conflictResolved
                  ? 'Applied SF direct line +1 (312) 849-2910 to Dynamics 365 telephone1.'
                  : 'D365 holds older desk line 0199; SF holds direct mobile 2910 verified by AI David.'}
              </p>
            </div>

            <div className="p-2 rounded bg-white/80 border border-amber-200">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-on-surface">Agent Confidence:</span>
                <span className="font-data-mono-sm text-data-mono-sm font-bold text-tertiary">99.4%</span>
              </div>
              <p className="font-label-xs text-label-xs text-on-surface-variant mt-0.5">Verified during live inbound call by Voice Agent David.</p>
            </div>

            <button
              onClick={handleResolveConflict}
              disabled={conflictResolved}
              id="apply-crm-sync-btn"
              name="apply-crm-sync-btn"
              className={`w-full py-2 px-space-sm rounded-lg font-body-sm text-body-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
                conflictResolved
                  ? 'bg-emerald-600 text-white cursor-default'
                  : 'bg-primary-container hover:bg-primary text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">{conflictResolved ? 'check' : 'bolt'}</span>
              <span>{conflictResolved ? 'Sync Reconciled' : 'Apply SF → D365 Sync'}</span>
            </button>
          </div>

          {/* Transformation Rules Legend */}
          <div className="bg-surface-container-lowest rounded-xl p-space-base border border-[#E2E8F0] space-y-2">
            <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant font-semibold">Transform Normalizer</span>
            <div className="flex flex-col gap-1.5 text-xs text-on-surface-variant">
              <div className="flex items-center justify-between">
                <span>Date Standard:</span>
                <span className="font-data-mono-sm text-data-mono-sm text-on-surface font-medium">ISO-8601 UTC</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Currency Code:</span>
                <span className="font-data-mono-sm text-data-mono-sm text-on-surface font-medium">USD ($)</span>
              </div>
              <div className="flex items-center justify-between">
                <span>State Province:</span>
                <span className="font-data-mono-sm text-data-mono-sm text-on-surface font-medium">US-IL Formatter</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT PANE: Microsoft Dynamics 365 Sales Instance (5 cols) */}
        <div className="lg:col-span-5 flex flex-col bg-surface-container-lowest rounded-xl shadow-sm border border-[#E2E8F0] overflow-hidden">
          {/* Instance Header */}
          <div className="p-space-base bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#002050] text-white flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">dataset</span>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-label-xs text-label-xs text-[#002050] font-bold uppercase tracking-wider">Dynamics 365 Sales</span>
                  <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant truncate">GUID: {'{8f23c912-d365}'}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold truncate">Acme Cloud Logistics Inc</h3>
              </div>
            </div>
            <span className="font-label-xs text-label-xs bg-secondary-fixed text-on-secondary-fixed-variant px-2 py-0.5 rounded-full font-semibold shrink-0">
              Secondary Ingest
            </span>
          </div>

          {/* Dynamics Core Account Fields */}
          <div className="p-space-base space-y-space-md border-b border-[#F1F5F9]">
            <div className="flex items-center justify-between">
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider font-semibold">Entity Attributes</span>
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Schema: Microsoft.CRM.Account</span>
            </div>
            <div className="space-y-space-sm bg-surface-container-low/50 p-space-sm rounded-lg">
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Annual Revenue</span>
                <span className="font-data-mono-md text-data-mono-md text-on-surface font-bold">$450,000,000 USD</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Industry Classification</span>
                <span className="text-on-surface font-semibold">Supply Chain Logistics &amp; Air Freight</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Relationship Health</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-surface-container-high h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  <span className="font-data-mono-sm text-data-mono-sm text-emerald-700 font-bold">92 / 100</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Telephone (Main)</span>
                <span className={`font-data-mono-sm text-data-mono-sm px-1.5 py-0.5 rounded font-bold ${
                  conflictResolved ? 'text-emerald-800 bg-emerald-100' : 'text-amber-700 bg-amber-100/70'
                }`}>
                  {conflictResolved ? '+1 (312) 849-2910' : '+1 (312) 555-0199'}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-on-surface-variant font-medium">Sales Insights AI Score</span>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">trending_up</span>
                  <span className="font-data-mono-md text-data-mono-md text-tertiary font-bold">88% Win Probability</span>
                </div>
              </div>
            </div>

            {/* Microsoft Dynamics Copilot Widget */}
            <div className="p-space-base rounded-xl bg-gradient-to-r from-tertiary-fixed/40 via-surface-container-low to-secondary-fixed/30 border border-tertiary-fixed-dim space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">auto_awesome</span>
                  <span className="font-label-xs text-label-xs uppercase font-bold text-tertiary tracking-wider">Dynamics Copilot Suggestion</span>
                </div>
                <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Model: GPT-4o Enterprise</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                {copilotConsolidated
                  ? 'Consolidation accepted: Hamburg distribution center DE-HAM-901 integrated into verified billing ledger.'
                  : '“Copilot suggests consolidating duplicate billing address with Hamburg distribution center detected in SAP ERP BAPI DE-HAM-901 to prevent billing dispatch failures.”'}
              </p>
              {!copilotConsolidated && (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleAcceptCopilot}
                    id="accept-copilot-btn"
                    name="accept-copilot-btn"
                    className="px-2.5 py-1 bg-surface-container-lowest hover:bg-surface-container text-tertiary font-body-sm text-body-sm font-semibold rounded-lg shadow-sm border border-tertiary-fixed-dim transition-colors"
                  >
                    Accept Consolidation
                  </button>
                  <button
                    onClick={() => showToast('Copilot suggestion dismissed.')}
                    id="dismiss-copilot-btn"
                    name="dismiss-copilot-btn"
                    className="px-2.5 py-1 text-on-surface-variant hover:text-on-surface font-body-sm text-body-sm"
                  >
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* D365 Sync Engine Diagnostic Table */}
          <div className="p-space-base flex-1 flex flex-col justify-between bg-surface-container-lowest">
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  OData / Dataverse Entity Status
                </span>
                <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Batch Payload: 12.4 KB</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-2 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
                  <span className="font-data-mono-sm text-data-mono-sm font-semibold text-on-surface">contacts(elena.rostova)</span>
                  <span className="font-label-xs text-label-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">Reconciled</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
                  <span className="font-data-mono-sm text-data-mono-sm font-semibold text-on-surface">opportunities(erp-pod-2025)</span>
                  <span className="font-label-xs text-label-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">Reconciled</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-xs">
                  <span className="font-data-mono-sm text-data-mono-sm font-semibold text-on-surface">contacts(marcus.vance)</span>
                  <span className={`font-label-xs text-label-xs px-2 py-0.5 rounded font-bold ${
                    conflictResolved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {conflictResolved ? 'Reconciled' : 'Needs Merge'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-xs text-on-surface-variant">
              <span>Target Web API: <span className="font-data-mono-sm text-data-mono-sm font-semibold text-on-surface">api/data/v9.2</span></span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 200 OK Handshake
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Padded Execution Bar */}
      <div className="bg-surface-container-lowest rounded-xl p-space-base shadow-sm border border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-space-base">
        <div className="flex items-center gap-space-sm">
          <div className="w-3 h-3 rounded-full bg-emerald-500 relative flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-body-sm text-body-sm text-on-surface font-semibold">Last full bi-directional sync: 42 seconds ago</span>
            <span className="text-on-surface-variant">•</span>
            <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">CDC Event Stream Active (0 backpressure)</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-space-sm w-full md:w-auto justify-end">
          <button
            onClick={() => showToast('Exporting audit trail with SHA-256 integrity hash (CSV/JSON)...')}
            id="export-audit-trail-btn"
            name="export-audit-trail-btn"
            className="px-space-md py-2 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface rounded-lg font-body-sm text-body-sm font-medium border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">download</span>
            <span>Export Audit Trail (CSV/JSON)</span>
          </button>
          <button
            onClick={() => showToast('Re-indexing 1.8M contact nodes with vector deduplication...')}
            id="reindex-dedupe-btn"
            name="reindex-dedupe-btn"
            className="px-space-md py-2 bg-surface-container-lowest hover:bg-surface-container-low text-on-surface rounded-lg font-body-sm text-body-sm font-medium border border-[#CBD5E1] transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">refresh</span>
            <span>Re-index Deduplication Engine</span>
          </button>
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            id="run-manual-sync-btn"
            name="run-manual-sync-btn"
            className="px-space-lg py-2 bg-primary-container hover:bg-primary text-white rounded-lg font-body-sm text-body-sm font-semibold transition-all shadow-md flex items-center gap-2"
          >
            <span className={`material-symbols-outlined text-[18px] ${isSyncing ? 'animate-spin' : ''}`}>sync</span>
            <span>{isSyncing ? 'Scanning CRMs...' : 'Run Manual Bi-directional Sync (Force Re-scan)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
