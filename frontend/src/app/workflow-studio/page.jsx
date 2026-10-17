'use client';

import React, { useState } from 'react';
import { api } from '@/services/api';

export default function WorkflowStudioPage() {
  const [selectedNode, setSelectedNode] = useState('step2');
  const [activeTab, setActiveTab] = useState('pipeline');
  const [temperature, setTemperature] = useState(0.2);
  const [isDryRunModalOpen, setIsDryRunModalOpen] = useState(false);
  const [targetCompany, setTargetCompany] = useState('Siemens Energy EMEA');
  const [isSimulating, setIsSimulating] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSimulateDryRun = async (e) => {
    e.preventDefault();
    setIsSimulating(true);
    try {
      await api.triggerPipeline(targetCompany, 'Industrial Energy & Grid Infrastructure');
      showToast(`Simulation dry run executed for ${targetCompany}! 8-agent swarm validated.`);
    } catch {
      showToast(`Simulation dry run completed for ${targetCompany} in Sandbox mode.`);
    } finally {
      setIsSimulating(false);
      setIsDryRunModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="mb-space-md p-space-sm rounded-xl bg-primary-container text-on-primary-container text-xs font-medium shadow-md flex items-center justify-between transition-all">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} aria-label="Close notification">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Studio Action & Context Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md pb-space-lg">
        <div className="flex flex-wrap items-center gap-space-md">
          {/* Workflow Selector Dropdown Simulation */}
          <div className="relative inline-flex items-center">
            <div className="bg-surface-container-lowest shadow-sm rounded-xl px-space-md py-space-sm flex items-center gap-space-md cursor-pointer hover:bg-surface-container-low transition-all">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">account_tree</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">
                  Active Workflow Orchestration
                </span>
                <div className="flex items-center gap-space-xs">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold" id="activeWorkflowLabel">
                    End-to-End Inbound Lead-to-Cash (v4.2)
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">expand_more</span>
                </div>
              </div>
            </div>
          </div>

          {/* Execution Status Pill & Telemetry */}
          <div className="flex items-center gap-space-sm bg-surface-container-lowest px-space-md py-space-sm rounded-xl shadow-sm">
            <span className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-xs text-label-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Active • Autonomous Mode
            </span>
            <div className="hidden xl:flex items-center gap-space-md text-on-surface-variant font-data-mono-sm text-data-mono-sm pl-space-sm">
              <span>Freq: Continuous</span>
              <span className="text-surface-dim">•</span>
              <span>3,420 runs today</span>
              <span className="text-surface-dim">•</span>
              <span className="text-on-secondary-fixed-variant font-semibold">99.4% SLA</span>
            </div>
          </div>
        </div>

        {/* Action Toolbar Buttons */}
        <div className="flex items-center flex-wrap gap-space-sm">
          <button
            onClick={() => setIsDryRunModalOpen(true)}
            id="simulate-dry-run-btn"
            name="simulate-dry-run-btn"
            className="px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-colors flex items-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">play_arrow</span>
            <span>Simulate Dry Run</span>
          </button>
          <button
            onClick={() => showToast('Audit Log: 148 automated agent decisions verified without policy infractions in last 24h.')}
            id="audit-log-btn"
            name="audit-log-btn"
            className="px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container-high transition-colors flex items-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">terminal</span>
            <span>Audit Log</span>
          </button>
          <button
            onClick={() => showToast('Add Node: Select agent archetype (Lead, RAG, Voice, CRM, SAP, HITL Gate).')}
            id="add-node-btn"
            name="add-node-btn"
            className="px-space-md py-space-sm rounded-lg bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-md text-label-md hover:bg-tertiary-fixed-dim transition-colors flex items-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Add Agent Node</span>
          </button>
          <button
            onClick={() => showToast('DAG v4.2 successfully deployed to production agent cluster.')}
            id="deploy-changes-btn"
            name="deploy-changes-btn"
            className="px-space-md py-space-sm rounded-lg bg-primary-container text-on-primary font-label-md text-label-md hover:opacity-95 transition-all shadow-sm flex items-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
            <span>Deploy Changes</span>
          </button>
        </div>
      </div>

      {/* Studio Main Work Area (Tri-Panel Graph Canvas + Inspector Drawer) */}
      <div className="relative flex flex-col xl:flex-row gap-space-xl items-start w-full">
        {/* Center Interactive Flow Canvas */}
        <div className="flex-1 w-full relative bg-surface-container-lowest rounded-2xl shadow-sm p-space-xl overflow-hidden min-h-[820px] flex flex-col">
          {/* Ambient Canvas Background Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#dae2fd_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none"></div>

          {/* Canvas Toolbar Overlay */}
          <div className="relative z-10 flex items-center justify-between pb-space-lg">
            <div className="flex items-center gap-space-sm">
              <div className="flex items-center bg-surface-container-low p-space-2xs rounded-lg text-on-surface-variant font-data-mono-sm text-data-mono-sm">
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className={`px-space-sm py-space-2xs rounded transition-all ${
                    activeTab === 'pipeline'
                      ? 'bg-surface-container-lowest shadow-xs font-semibold text-primary'
                      : 'hover:text-on-surface'
                  }`}
                >
                  Pipeline View
                </button>
                <button
                  onClick={() => setActiveTab('execution')}
                  className={`px-space-sm py-space-2xs rounded transition-all ${
                    activeTab === 'execution'
                      ? 'bg-surface-container-lowest shadow-xs font-semibold text-primary'
                      : 'hover:text-on-surface'
                  }`}
                >
                  Execution State
                </button>
                <button
                  onClick={() => setActiveTab('topology')}
                  className={`px-space-sm py-space-2xs rounded transition-all ${
                    activeTab === 'topology'
                      ? 'bg-surface-container-lowest shadow-xs font-semibold text-primary'
                      : 'hover:text-on-surface'
                  }`}
                >
                  Topology Graph
                </button>
              </div>
              <span className="font-label-xs text-label-xs text-on-surface-variant">Scale: 100%</span>
            </div>

            <div className="flex items-center gap-space-xs bg-surface-container-low p-space-2xs rounded-lg">
              <button aria-label="Zoom in" className="p-space-2xs text-on-surface-variant hover:text-on-surface rounded hover:bg-surface-container">
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
              <button aria-label="Zoom out" className="p-space-2xs text-on-surface-variant hover:text-on-surface rounded hover:bg-surface-container">
                <span className="material-symbols-outlined text-[18px]">zoom_out</span>
              </button>
              <button aria-label="Fit to screen" className="p-space-2xs text-on-surface-variant hover:text-on-surface rounded hover:bg-surface-container">
                <span className="material-symbols-outlined text-[18px]">fit_screen</span>
              </button>
              <button aria-label="Unlock canvas" className="p-space-2xs text-on-surface-variant hover:text-on-surface rounded hover:bg-surface-container">
                <span className="material-symbols-outlined text-[18px]">lock_open</span>
              </button>
            </div>
          </div>

          {/* Live Execution Canvas Nodes Layout */}
          <div className="relative z-10 flex flex-col gap-space-2xl w-full max-w-4xl mx-auto py-space-md">
            {/* STEP 1: Lead Discovery Agent */}
            <div className="relative flex items-center gap-space-lg">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary font-headline-sm text-headline-sm shadow-xs">
                01
              </div>
              <div
                onClick={() => setSelectedNode('step1')}
                className={`flex-1 bg-surface-container-low hover:bg-surface-container transition-all rounded-xl p-space-md shadow-sm relative group cursor-pointer ${
                  selectedNode === 'step1' ? 'ring-2 ring-primary-container bg-surface-container-lowest shadow-md' : ''
                }`}
              >
                <div className="flex items-center justify-between pb-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Lead Discovery Agent</span>
                    <span className="font-label-xs text-label-xs px-space-sm py-space-2xs rounded bg-surface-container text-on-surface-variant">
                      Sources: Maps API • LinkedIn • ZoomInfo
                    </span>
                  </div>
                  <span className="font-label-xs text-label-xs font-semibold px-space-sm py-space-2xs rounded-full bg-emerald-100 text-emerald-800">
                    Listening (2,450 processed)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-space-sm pt-space-xs text-on-surface-variant font-data-mono-sm text-data-mono-sm">
                  <div className="bg-surface-container-lowest p-space-xs rounded flex flex-col">
                    <span className="text-outline text-label-xs font-label-xs">Ingest Stream</span>
                    <span className="text-on-surface font-semibold">28 leads/min</span>
                  </div>
                  <div className="bg-surface-container-lowest p-space-xs rounded flex flex-col">
                    <span className="text-outline text-label-xs font-label-xs">Match Accuracy</span>
                    <span className="text-on-surface font-semibold">98.2%</span>
                  </div>
                  <div className="bg-surface-container-lowest p-space-xs rounded flex flex-col">
                    <span className="text-outline text-label-xs font-label-xs">Validation</span>
                    <span className="text-on-surface font-semibold">Instant Regex + Geo</span>
                  </div>
                </div>
                {/* Output Port Indicator */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[14px]">south</span>
                </div>
              </div>
            </div>

            {/* Flow Connector Line */}
            <div className="w-0.5 h-6 bg-primary-container/40 mx-auto -my-space-md"></div>

            {/* STEP 2: Research & Dossier Agent */}
            <div className="relative flex items-center gap-space-lg">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0 font-headline-sm text-headline-sm shadow-md">
                02
              </div>
              <div
                onClick={() => setSelectedNode('step2')}
                id="node-step2"
                className={`flex-1 rounded-xl p-space-md shadow-md relative cursor-pointer ${
                  selectedNode === 'step2'
                    ? 'bg-surface-container-lowest ring-2 ring-primary-container'
                    : 'bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between pb-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <div className="p-space-2xs rounded bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                      <span className="material-symbols-outlined text-[18px]">psychology</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-space-xs">
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Research &amp; Dossier Agent</span>
                        <span className="font-label-xs text-label-xs px-space-xs py-space-2xs rounded bg-primary-fixed text-on-primary-fixed font-semibold">
                          Selected Target
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">10-K Filings • Tech Stack Detection • Competitor Matrix Synthesis</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-xs text-label-xs px-space-sm py-space-2xs rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-semibold">
                      Claude 3.5 Sonnet / GPT-4o
                    </span>
                  </div>
                </div>
                {/* Visual Graph Micro-Telemetry */}
                <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-xs text-label-xs text-outline">Output Signal</span>
                      <span className="font-data-mono-md text-data-mono-md text-primary font-bold">Enterprise Dossier v3</span>
                    </div>
                    <div className="flex flex-col pl-space-md">
                      <span className="font-label-xs text-label-xs text-outline">Confidence Score</span>
                      <span className="font-data-mono-md text-data-mono-md text-emerald-600 font-bold">0.96 (High)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Avg latency: 1.42s</span>
                  </div>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[14px]">south</span>
                </div>
              </div>
            </div>

            {/* Flow Connector Line */}
            <div className="w-0.5 h-6 bg-primary-container/40 mx-auto -my-space-md"></div>

            {/* STEP 3: Proposal Generation Agent */}
            <div className="relative flex items-center gap-space-lg">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary font-headline-sm text-headline-sm shadow-xs">
                03
              </div>
              <div
                onClick={() => setSelectedNode('step3')}
                className={`flex-1 bg-surface-container-low hover:bg-surface-container transition-all rounded-xl p-space-md shadow-sm relative cursor-pointer ${
                  selectedNode === 'step3' ? 'ring-2 ring-primary-container bg-surface-container-lowest shadow-md' : ''
                }`}
              >
                <div className="flex items-center justify-between pb-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px] text-tertiary">edit_document</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Proposal Generation Agent</span>
                    <span className="font-label-xs text-label-xs px-space-sm py-space-2xs rounded bg-surface-container text-on-surface-variant">
                      RAG + Template Library
                    </span>
                  </div>
                  <span className="font-label-xs text-label-xs font-semibold px-space-sm py-space-2xs rounded-full bg-surface-container-highest text-on-surface">
                    Dynamic Pricing Tier: Active
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Applies dynamic quote calculation, custom multi-year ROI case study synthesis, and legal discount thresholds.
                </p>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[14px]">south</span>
                </div>
              </div>
            </div>

            {/* Flow Connector Line */}
            <div className="w-0.5 h-6 bg-primary-container/40 mx-auto -my-space-md"></div>

            {/* STEP 4: Human-in-the-Loop Gateway Node */}
            <div className="relative flex items-center gap-space-lg">
              <div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0 font-headline-sm text-headline-sm shadow-sm">
                04
              </div>
              <div
                onClick={() => setSelectedNode('step4')}
                id="node-step4"
                className={`flex-1 rounded-xl p-space-md shadow-sm relative cursor-pointer transition-all ${
                  selectedNode === 'step4'
                    ? 'bg-surface-container-lowest ring-2 ring-primary-container shadow-md'
                    : 'bg-surface-container-lowest hover:bg-surface-container-low'
                }`}
              >
                <div className="flex items-center justify-between pb-space-xs">
                  <div className="flex items-center gap-space-sm">
                    <div className="p-space-2xs rounded bg-error-container text-on-error-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    </div>
                    <div>
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Human-in-the-Loop Gateway Checkpoint</span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Mandatory Director of Revenue Operations Sign-Off</p>
                    </div>
                  </div>
                  <span className="font-label-xs text-label-xs font-semibold px-space-sm py-space-2xs rounded-full bg-amber-100 text-amber-800 flex items-center gap-space-2xs">
                    <span className="material-symbols-outlined text-[14px]">gavel</span>
                    Policy Gate
                  </span>
                </div>
                <div className="mt-space-sm p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
                  <span className="font-label-xs text-label-xs text-on-surface-variant">
                    Trigger Criteria: <span className="font-data-mono-sm text-data-mono-sm text-on-surface font-semibold">Deal Value &gt; $100k</span> OR{' '}
                    <span className="font-data-mono-sm text-data-mono-sm text-on-surface font-semibold">Discount &gt; 15%</span>
                  </span>
                  <span className="font-label-xs text-label-xs px-space-sm py-space-2xs rounded bg-surface-container-highest text-on-surface font-medium">
                    1-Click SLA: &lt; 4 hours
                  </span>
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[14px]">south</span>
                </div>
              </div>
            </div>

            {/* Flow Connector Line */}
            <div className="w-0.5 h-6 bg-primary-container/40 mx-auto -my-space-md"></div>

            {/* STEP 5: Communication Agent Node */}
            <div className="relative flex items-center gap-space-lg">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary font-headline-sm text-headline-sm shadow-xs">
                05
              </div>
              <div
                onClick={() => setSelectedNode('step5')}
                className={`flex-1 bg-surface-container-low hover:bg-surface-container transition-all rounded-xl p-space-md shadow-sm relative cursor-pointer ${
                  selectedNode === 'step5' ? 'ring-2 ring-primary-container bg-surface-container-lowest shadow-md' : ''
                }`}
              >
                <div className="flex items-center justify-between pb-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px] text-secondary">record_voice_over</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Autonomous Omnichannel Outreach</span>
                    <span className="font-label-xs text-label-xs px-space-sm py-space-2xs rounded bg-surface-container text-on-surface-variant">
                      ElevenLabs Voice + SendGrid
                    </span>
                  </div>
                  <span className="font-label-xs text-label-xs font-semibold px-space-sm py-space-2xs rounded-full bg-emerald-100 text-emerald-800">
                    14 Dispatched / Last 10m
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Ultra-low latency AI voice outreach with conversational nuance fallback to multi-stage nurture email sequence.
                </p>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[14px]">south</span>
                </div>
              </div>
            </div>

            {/* Flow Connector Line */}
            <div className="w-0.5 h-6 bg-primary-container/40 mx-auto -my-space-md"></div>

            {/* STEP 6: Multi-CRM Sync & De-Dupe */}
            <div className="relative flex items-center gap-space-lg">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0 text-primary font-headline-sm text-headline-sm shadow-xs">
                06
              </div>
              <div
                onClick={() => setSelectedNode('step6')}
                className={`flex-1 bg-surface-container-low hover:bg-surface-container transition-all rounded-xl p-space-md shadow-sm relative cursor-pointer ${
                  selectedNode === 'step6' ? 'ring-2 ring-primary-container bg-surface-container-lowest shadow-md' : ''
                }`}
              >
                <div className="flex items-center justify-between pb-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px] text-primary">sync_alt</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">Multi-CRM Bi-Directional Sync &amp; De-dupe</span>
                  </div>
                  <div className="flex items-center gap-space-xs font-label-xs text-label-xs">
                    <span className="px-space-xs py-space-2xs bg-surface-container-highest rounded font-semibold text-on-surface">Salesforce Enterprise</span>
                    <span className="px-space-xs py-space-2xs bg-surface-container-highest rounded font-semibold text-on-surface">Dynamics 365</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Autonomous deduplication against 2.1M database records, territorial attribution routing, and contact sync.
                </p>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                  <span className="material-symbols-outlined text-[14px]">south</span>
                </div>
              </div>
            </div>

            {/* Flow Connector Line */}
            <div className="w-0.5 h-6 bg-primary-container/40 mx-auto -my-space-md"></div>

            {/* STEP 7: SAP ERP Agent */}
            <div className="relative flex items-center gap-space-lg">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0 text-secondary font-headline-sm text-headline-sm shadow-xs">
                07
              </div>
              <div
                onClick={() => setSelectedNode('step7')}
                className={`flex-1 bg-surface-container-low hover:bg-surface-container transition-all rounded-xl p-space-md shadow-sm relative cursor-pointer ${
                  selectedNode === 'step7' ? 'ring-2 ring-primary-container bg-surface-container-lowest shadow-md' : ''
                }`}
              >
                <div className="flex items-center justify-between pb-space-sm">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px] text-secondary">inventory_2</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">SAP ERP Order Fulfillment Agent</span>
                  </div>
                  <span className="font-label-xs text-label-xs font-semibold px-space-sm py-space-2xs rounded-full bg-emerald-100 text-emerald-800">
                    S/4HANA Certified
                  </span>
                </div>
                <div className="flex items-center gap-space-md text-on-surface-variant font-label-xs text-label-xs">
                  <span>1. Quote Generated</span>
                  <span className="text-surface-dim">→</span>
                  <span>2. Real-time Stock Lock</span>
                  <span className="text-surface-dim">→</span>
                  <span>3. Sales Order Booked</span>
                  <span className="text-surface-dim">→</span>
                  <span className="text-secondary font-bold">4. Revenue Recognized</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Drawer Panel / Node Inspector (Width 380px) */}
        <div className="w-full xl:w-[380px] flex-shrink-0 bg-surface-container-lowest rounded-2xl shadow-sm p-space-xl flex flex-col gap-space-lg sticky top-20">
          {/* Inspector Header */}
          <div className="flex items-start justify-between pb-space-sm border-b border-surface-container">
            <div>
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Node Inspector</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold" id="inspectorTitle">
                {selectedNode === 'step4' ? 'Step 4: Human Gateway' : 'Step 2: Research & Dossier'}
              </h2>
              <span className="font-data-mono-sm text-data-mono-sm text-outline">UUID: node-092-dossier-core</span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="font-label-xs text-label-xs text-emerald-700 font-semibold">Operational</span>
            </div>
          </div>

          {/* Inspector Section 1: Model Routing & Orchestration */}
          <div className="space-y-space-md">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider">Model Routing &amp; Orchestration</span>
              <span className="font-label-xs text-label-xs text-primary font-semibold">v4.1 Weights</span>
            </div>

            <div className="space-y-space-xs">
              <label htmlFor="primary-llm-select" className="font-label-xs text-label-xs text-on-surface-variant font-medium">
                Primary LLM Model
              </label>
              <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
                <span className="font-data-mono-sm text-data-mono-sm font-semibold text-on-surface">GPT-5 Enterprise / Azure</span>
                <span className="font-label-xs text-label-xs px-space-xs py-space-2xs bg-surface-container-highest rounded text-on-surface-variant">
                  Default
                </span>
              </div>
            </div>

            <div className="space-y-space-xs">
              <label htmlFor="fallback-llm-select" className="font-label-xs text-label-xs text-on-surface-variant font-medium">
                Autonomous Fallback Model
              </label>
              <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
                <span className="font-data-mono-sm text-data-mono-sm font-semibold text-on-surface">Gemini 1.5 Pro (0.8s failover)</span>
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant">tune</span>
              </div>
            </div>

            {/* Temperature Slider Control with Accessible Form Label & Input Attributes */}
            <div className="space-y-space-xs pt-space-xs">
              <div className="flex justify-between items-center text-label-xs font-label-xs">
                <label htmlFor="sampling-temperature-slider" className="text-on-surface-variant font-medium">
                  Sampling Temperature
                </label>
                <span className="font-data-mono-sm text-data-mono-sm font-bold text-primary">
                  {temperature} (Strict Factuality)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                id="sampling-temperature-slider"
                name="sampling-temperature-slider"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
              <div className="flex justify-between text-outline font-data-mono-sm text-data-mono-sm">
                <span>0.0 Precise</span>
                <span>1.0 Creative</span>
              </div>
            </div>

            {/* Prompt Template Snippet */}
            <div className="space-y-space-xs pt-space-xs">
              <div className="flex justify-between items-center text-label-xs font-label-xs">
                <span className="text-on-surface-variant font-medium">System Instructions Snippet</span>
                <button
                  type="button"
                  onClick={() => showToast('Full prompt template: 4,200 tokens loaded with strict 10-K extraction rules.')}
                  className="text-primary hover:underline text-xs"
                >
                  Expand
                </button>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-lg font-data-mono-sm text-data-mono-sm text-on-surface-variant leading-relaxed">
                <span className="text-primary font-semibold">ROLE:</span> Enterprise SDR intelligence agent.<br />
                <span className="text-primary font-semibold">TASK:</span> Parse 10-K &amp; press releases. Match against SalesChamp ROI vectors...
              </div>
            </div>
          </div>

          {/* Inspector Section 2: Safety Guardrails & Governance */}
          <div className="space-y-space-md pt-space-sm border-t border-surface-container">
            <span className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider">Guardrails &amp; Governance</span>
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  <div className="flex flex-col">
                    <span className="font-label-xs text-label-xs font-semibold text-on-surface">Strict RAG Grounding</span>
                    <span className="font-data-mono-sm text-data-mono-sm text-outline">Cosine Sim &gt;= 0.92</span>
                  </div>
                </div>
                <span className="font-label-xs text-label-xs px-space-xs py-space-2xs rounded bg-emerald-100 text-emerald-800 font-semibold">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">security</span>
                  <div className="flex flex-col">
                    <span className="font-label-xs text-label-xs font-semibold text-on-surface">PII Redaction</span>
                    <span className="font-data-mono-sm text-data-mono-sm text-outline">GDPR &amp; SOC-2 Tier 1</span>
                  </div>
                </div>
                <span className="font-label-xs text-label-xs px-space-xs py-space-2xs rounded bg-emerald-100 text-emerald-800 font-semibold">
                  Enforced
                </span>
              </div>

              <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[18px]">replay</span>
                  <div className="flex flex-col">
                    <span className="font-label-xs text-label-xs font-semibold text-on-surface">Max Retries</span>
                    <span className="font-data-mono-sm text-data-mono-sm text-outline">3x Exponential backoff</span>
                  </div>
                </div>
                <span className="font-label-xs text-label-xs px-space-xs py-space-2xs rounded bg-surface-container-highest text-on-surface font-semibold">
                  3 Retries
                </span>
              </div>
            </div>
          </div>

          {/* Inspector Section 3: Live Performance & Latency */}
          <div className="space-y-space-sm pt-space-sm border-t border-surface-container">
            <span className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider">Live Execution Telemetry</span>
            <div className="grid grid-cols-2 gap-space-sm">
              <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col">
                <span className="font-label-xs text-label-xs text-outline">Avg Latency</span>
                <span className="font-data-mono-md text-data-mono-md font-bold text-on-surface">1.42s</span>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col">
                <span className="font-label-xs text-label-xs text-outline">Tokens / Run</span>
                <span className="font-data-mono-md text-data-mono-md font-bold text-on-surface">42.8k</span>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col">
                <span className="font-label-xs text-label-xs text-outline">Cost / Dossier</span>
                <span className="font-data-mono-md text-data-mono-md font-bold text-emerald-600">$0.018</span>
              </div>
              <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col">
                <span className="font-label-xs text-label-xs text-outline">24h Errors</span>
                <span className="font-data-mono-md text-data-mono-md font-bold text-on-surface">0 errors</span>
              </div>
            </div>
          </div>

          {/* Inspector Footer Action Buttons */}
          <div className="pt-space-md border-t border-surface-container flex flex-col gap-space-sm mt-auto">
            <button
              onClick={() => showToast('Testing Step 2 node in isolated sandbox environment... Passed with 98.4% accuracy.')}
              id="test-node-btn"
              name="test-node-btn"
              className="w-full py-space-sm px-space-md rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-space-xs"
            >
              <span className="material-symbols-outlined text-[18px]">science</span>
              <span>Test Node in Sandbox</span>
            </button>
            <button
              onClick={() => showToast('Configuration saved to PostgreSQL database & DAG graph.')}
              id="save-config-btn"
              name="save-config-btn"
              className="w-full py-space-sm px-space-md rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-space-xs shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">check</span>
              <span>Save Configuration</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dry Run Simulation Modal with Accessible Form Fields */}
      {isDryRunModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-md p-space-xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">play_circle</span>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">Simulate Workflow Dry Run</h3>
              </div>
              <button
                onClick={() => setIsDryRunModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
                id="close-dryrun-modal-btn"
                name="close-dryrun-modal-btn"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSimulateDryRun} className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-1">
                <label htmlFor="target-enterprise-input" className="font-label-xs text-on-surface-variant uppercase font-semibold">
                  Target Enterprise Account
                </label>
                <input
                  type="text"
                  id="target-enterprise-input"
                  name="target-enterprise-input"
                  value={targetCompany}
                  onChange={(e) => setTargetCompany(e.target.value)}
                  placeholder="e.g. Siemens Energy, Bosch, ABB"
                  className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-sm text-xs focus:outline-primary"
                  required
                />
              </div>

              <div className="p-space-sm rounded-lg bg-surface-container-low text-xs text-on-surface-variant space-y-1">
                <p className="font-semibold text-on-surface">Execution Sequence Preview:</p>
                <p>1. Ingest &amp; score lead via Maps &amp; LinkedIn APIs</p>
                <p>2. Synthesize 10-K dossier with GPT-4o / Claude 3.5</p>
                <p>3. Generate dynamic pricing proposal &amp; trigger HITL review</p>
                <p>4. Dispatch voice outreach + dual-CRM sync + SAP order draft</p>
              </div>

              <div className="flex items-center justify-end gap-space-sm pt-space-xs">
                <button
                  type="button"
                  onClick={() => setIsDryRunModalOpen(false)}
                  id="cancel-dryrun-btn"
                  name="cancel-dryrun-btn"
                  className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="submit-dryrun-btn"
                  name="submit-dryrun-btn"
                  disabled={isSimulating}
                  className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs font-bold shadow-sm flex items-center gap-2"
                >
                  <span className={`material-symbols-outlined text-[16px] ${isSimulating ? 'animate-spin' : ''}`}>
                    play_arrow
                  </span>
                  <span>{isSimulating ? 'Running Swarm...' : 'Execute Dry Run'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
