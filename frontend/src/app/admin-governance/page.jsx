'use client';

import React, { useState } from 'react';

export default function AdminGovernancePage() {
  const [activeTab, setActiveTab] = useState('integrations');
  const [proposalThreshold, setProposalThreshold] = useState(50000);
  const [discountThreshold, setDiscountThreshold] = useState(15.0);
  const [sapGateEnforced, setSapGateEnforced] = useState(true);
  const [gdprRedaction, setGdprRedaction] = useState(true);
  const [euResidency, setEuResidency] = useState(true);
  const [zeroRetention, setZeroRetention] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
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

      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-xl shadow-sm">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/5 blur-3xl pointer-events-none"></div>
        <div className="absolute -right-8 bottom-0 h-48 w-48 rounded-full bg-secondary/5 blur-2xl pointer-events-none"></div>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg relative z-10">
          <div className="space-y-space-xs max-w-3xl">
            <div className="flex flex-wrap items-center gap-space-sm">
              <h1 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
                Enterprise Administration, Integrations &amp; AI Governance
              </h1>
              <span className="font-label-xs text-label-xs bg-primary-fixed text-on-primary-fixed px-space-sm py-space-2xs rounded-full font-bold">
                v4.8.2-PROD
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Global workspace configuration, multi-agent policy controls, OAuth directory sync, and compliance telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm self-start lg:self-center">
            <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-sm rounded-lg shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Cluster Status</span>
                <span className="font-data-mono-sm text-data-mono-sm text-on-surface font-semibold">AWS us-east-1 + Azure East US</span>
              </div>
            </div>

            <div className="flex items-center gap-space-xs bg-surface-container px-space-md py-space-sm rounded-lg shadow-sm">
              <span className="material-symbols-outlined text-tertiary text-[18px]">verified_user</span>
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Compliance</span>
                <span className="font-label-xs text-label-xs text-tertiary font-bold">SOC-2 Type II Certified</span>
              </div>
            </div>

            <button
              onClick={() => showToast('Topology deployed across multi-cloud regions with 0 downtime.')}
              id="deploy-topology-btn"
              name="deploy-topology-btn"
              className="flex items-center gap-space-xs bg-primary text-on-primary px-space-base py-space-sm rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-[16px]">sync</span>
              <span>Deploy Topology</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Control Matrix Sidebar + Content Pane */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
        {/* Control Matrix Sidebar (3 cols) */}
        <div className="xl:col-span-3 space-y-space-xs bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
          <div className="px-space-sm py-space-xs mb-space-xs">
            <p className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider font-semibold">Control Matrix</p>
          </div>

          {[
            { id: 'integrations', label: 'Integrations & Connectors', icon: 'hub', badge: '8 Active' },
            { id: 'fleet', label: 'Agent Fleet Config', icon: 'smart_toy', badge: '14 Nodes' },
            { id: 'fallbacks', label: 'Model Routing & Fallbacks', icon: 'route', arrow: true },
            { id: 'approval', label: 'Human Approval Policies', icon: 'verified', badge: 'Strict' },
            { id: 'compliance', label: 'Compliance & Data Residency', icon: 'gavel', badge: 'GDPR' },
            { id: 'security', label: 'Security & OAuth 2.0 / SAML', icon: 'lock', arrow: true },
            { id: 'telemetry', label: 'Audit Logs & Telemetry', icon: 'monitoring', badge: 'Live' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              id={`tab-btn-${item.id}`}
              name={`tab-btn-${item.id}`}
              className={`w-full flex items-center justify-between px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-all ${
                activeTab === item.id
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="font-data-mono-sm text-data-mono-sm bg-surface-container-lowest/20 px-space-xs py-space-2xs rounded-full font-semibold">
                  {item.badge}
                </span>
              )}
              {item.arrow && <span className="material-symbols-outlined text-[14px]">arrow_forward</span>}
            </button>
          ))}

          <div className="pt-space-md mt-space-md bg-surface-container-low rounded-lg p-space-sm">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant">API Token Quota</span>
              <span className="font-data-mono-sm text-data-mono-sm text-primary font-bold">78.4%</span>
            </div>
            <div className="w-full bg-surface-container-highest rounded-full h-1.5 overflow-hidden">
              <div className="bg-primary h-1.5 rounded-full" style={{ width: '78.4%' }}></div>
            </div>
            <div className="flex justify-between items-center mt-space-xs">
              <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">3.92M / 5.00M req</span>
              <button
                onClick={() => showToast('Quota expansion requested for enterprise workspace.')}
                className="font-label-xs text-label-xs text-secondary underline cursor-pointer hover:text-primary"
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>

        {/* Content Pane (9 cols) */}
        <div className="xl:col-span-9 space-y-space-xl">
          {/* Section 1: Connected Enterprise Connectors */}
          <section className="space-y-space-base">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="font-headline-md text-headline-md text-on-surface font-semibold">Connected Enterprise Connectors</span>
                <span className="font-data-mono-sm text-data-mono-sm bg-secondary-fixed text-on-secondary-fixed px-space-sm py-space-2xs rounded-full font-bold">
                  8 Ecosystem Gateways
                </span>
              </div>
              <button
                onClick={() => showToast('Opening custom connector wizard...')}
                id="register-custom-connector-btn"
                name="register-custom-connector-btn"
                className="flex items-center gap-space-xs bg-surface-container-high text-on-surface px-space-md py-space-xs rounded-lg font-label-md text-label-md hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                <span>Register Custom Connector</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-base">
              {/* Connector 1: Salesforce */}
              <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[24px]">cloud_sync</span>
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Salesforce Enterprise</h4>
                        <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">REST v59.0 • Bulk API 2.0</span>
                      </div>
                    </div>
                    <span className="font-label-xs text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      Active
                    </span>
                  </div>
                  <div className="mt-space-md grid grid-cols-2 gap-space-xs text-left bg-surface-container-low p-space-xs rounded-lg">
                    <div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Auth Method</span>
                      <p className="font-label-md text-label-md text-on-surface font-medium">OAuth 2.0 PKCE</p>
                    </div>
                    <div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Sync Latency</span>
                      <p className="font-data-mono-sm text-data-mono-sm text-emerald-700 font-semibold">140ms</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <span className="flex items-center gap-space-xs font-label-xs text-label-xs text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Synced 12s ago
                  </span>
                  <button
                    onClick={() => showToast('Salesforce endpoint config: API version v59.0, polling interval 1000ms.')}
                    className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-space-2xs"
                  >
                    Configure
                    <span className="material-symbols-outlined text-[14px]">tune</span>
                  </button>
                </div>
              </div>

              {/* Connector 2: Dynamics 365 */}
              <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[24px]">dataset</span>
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Dynamics 365</h4>
                        <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Dataverse Web API v9.2</span>
                      </div>
                    </div>
                    <span className="font-label-xs text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      Active
                    </span>
                  </div>
                  <div className="mt-space-md grid grid-cols-2 gap-space-xs text-left bg-surface-container-low p-space-xs rounded-lg">
                    <div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Auth Matrix</span>
                      <p className="font-label-md text-label-md text-on-surface font-medium">Microsoft Entra ID</p>
                    </div>
                    <div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Roundtrip</span>
                      <p className="font-data-mono-sm text-data-mono-sm text-emerald-700 font-semibold">210ms</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <span className="flex items-center gap-space-xs font-label-xs text-label-xs text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Synced 41s ago
                  </span>
                  <button
                    onClick={() => showToast('Dynamics 365 endpoint config: Dataverse v9.2 active.')}
                    className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-space-2xs"
                  >
                    Configure
                    <span className="material-symbols-outlined text-[14px]">tune</span>
                  </button>
                </div>
              </div>

              {/* Connector 3: SAP S/4HANA */}
              <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-[24px]">account_tree</span>
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">SAP S/4HANA Cloud</h4>
                        <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">BTP OData v4 &amp; RFC</span>
                      </div>
                    </div>
                    <span className="font-label-xs text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      Active
                    </span>
                  </div>
                  <div className="mt-space-md grid grid-cols-2 gap-space-xs text-left bg-surface-container-low p-space-xs rounded-lg">
                    <div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">RFC Status</span>
                      <p className="font-label-md text-label-md text-on-surface font-medium">Mutual TLS 1.3</p>
                    </div>
                    <div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Latency</span>
                      <p className="font-data-mono-sm text-data-mono-sm text-emerald-700 font-semibold">64ms Direct</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <span className="flex items-center gap-space-xs font-label-xs text-label-xs text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Live ERP Tunnel
                  </span>
                  <button
                    onClick={() => showToast('SAP S/4HANA endpoint config: RFC host sap-prd-rfc01.acme.corp.')}
                    className="font-label-md text-label-md text-primary font-semibold hover:underline flex items-center gap-space-2xs"
                  >
                    Configure
                    <span className="material-symbols-outlined text-[14px]">tune</span>
                  </button>
                </div>
              </div>

              {/* Connector 4: Google Maps Places */}
              <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[24px]">map</span>
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Google Maps Places</h4>
                        <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Geo Enrichment Engine</span>
                      </div>
                    </div>
                    <span className="font-label-xs text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      Active
                    </span>
                  </div>
                  <div className="mt-space-md grid grid-cols-2 gap-space-xs text-left bg-surface-container-low p-space-xs rounded-lg">
                    <div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Rate Limit</span>
                      <p className="font-label-md text-label-md text-on-surface font-medium">10,000 QPS</p>
                    </div>
                    <div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Edge Latency</span>
                      <p className="font-data-mono-sm text-data-mono-sm text-emerald-700 font-semibold">45ms</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <span className="font-label-xs text-label-xs text-on-surface-variant">Dossier Auto-lookup</span>
                  <span className="font-data-mono-sm text-data-mono-sm text-primary font-medium">Enabled</span>
                </div>
              </div>

              {/* Connector 5: Qdrant Enterprise */}
              <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-[24px]">database</span>
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Qdrant Enterprise</h4>
                        <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Cosine Vector RAG Index</span>
                      </div>
                    </div>
                    <span className="font-label-xs text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      Active
                    </span>
                  </div>
                  <div className="mt-space-md grid grid-cols-2 gap-space-xs text-left bg-surface-container-low p-space-xs rounded-lg">
                    <div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">Vectors Cached</span>
                      <p className="font-data-mono-sm text-data-mono-sm text-on-surface font-semibold">1,248,390</p>
                    </div>
                    <div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">HNSW Query</span>
                      <p className="font-data-mono-sm text-data-mono-sm text-emerald-700 font-semibold">12ms</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <span className="font-label-xs text-label-xs text-on-surface-variant">Memory Density 99.4%</span>
                  <span className="font-data-mono-sm text-data-mono-sm text-tertiary font-semibold">Distributed</span>
                </div>
              </div>

              {/* Connector 6: Azure OpenAI GPT-5 */}
              <div className="bg-surface-container-lowest p-space-base rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-space-md">
                <div>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                        <span className="material-symbols-outlined text-[24px]">psychology</span>
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Azure OpenAI GPT-5</h4>
                        <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Primary Reasoning Engine</span>
                      </div>
                    </div>
                    <span className="font-label-xs text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                      Active
                    </span>
                  </div>
                  <div className="mt-space-md grid grid-cols-2 gap-space-xs text-left bg-surface-container-low p-space-xs rounded-lg">
                    <div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">SLA Availability</span>
                      <p className="font-data-mono-sm text-data-mono-sm text-emerald-700 font-semibold">99.99%</p>
                    </div>
                    <div>
                      <span className="font-label-xs text-label-xs text-on-surface-variant uppercase">TPM Provision</span>
                      <p className="font-data-mono-sm text-data-mono-sm text-on-surface font-semibold">450k TPM</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-space-xs">
                  <span className="font-label-xs text-label-xs text-on-surface-variant">Zero-Prompt Storage</span>
                  <span className="font-data-mono-sm text-data-mono-sm text-emerald-700 font-bold">Compliant</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Agent Autonomy & Guardrail Thresholds */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-space-base">
            <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm space-y-space-lg">
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-primary text-[22px]">policy</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Agent Autonomy &amp; Guardrail Thresholds
                  </h3>
                </div>
                <span className="font-label-xs text-label-xs bg-surface-container-high px-space-sm py-space-2xs rounded-full text-on-surface-variant font-bold">
                  HITL Engine
                </span>
              </div>

              <div className="space-y-space-lg">
                {/* Proposal Threshold Slider with Accessible Form Label & Input Attributes */}
                <div className="space-y-space-xs">
                  <div className="flex justify-between items-center">
                    <label htmlFor="proposal-threshold-slider" className="font-body-md text-body-md font-medium text-on-surface cursor-pointer">
                      Commercial Proposals Human Threshold
                    </label>
                    <span className="font-data-mono-md text-data-mono-md text-primary font-bold">
                      {formatCurrency(proposalThreshold)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="250000"
                    step="5000"
                    id="proposal-threshold-slider"
                    name="proposal-threshold-slider"
                    value={proposalThreshold}
                    onChange={(e) => setProposalThreshold(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary-container"
                  />
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    All self-assembling contracts exceeding this threshold pause execution and route to RevOps VP for optical approval.
                  </p>
                </div>

                {/* Mandatory Gate: SAP Sales Orders with Accessible Checkbox & Label */}
                <div className="space-y-space-xs pt-space-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="sap-gate-checkbox" className="font-body-md text-body-md font-medium text-on-surface cursor-pointer">
                        Mandatory Gate: SAP Sales Orders
                      </label>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Always enforce manual commit for ERP order creation above $25,000
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      id="sap-gate-checkbox"
                      name="sap-gate-checkbox"
                      checked={sapGateEnforced}
                      onChange={(e) => setSapGateEnforced(e.target.checked)}
                      className="w-5 h-5 rounded accent-primary-container cursor-pointer ml-space-md"
                    />
                  </div>
                </div>

                {/* Discount Authority Slider with Accessible Form Label & Input Attributes */}
                <div className="space-y-space-xs pt-space-xs">
                  <div className="flex justify-between items-center">
                    <label htmlFor="discount-threshold-slider" className="font-body-md text-body-md font-medium text-on-surface cursor-pointer">
                      AI Voice Max Discounting Authority
                    </label>
                    <span className="font-data-mono-md text-data-mono-md text-tertiary font-bold">
                      {discountThreshold.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="0.5"
                    id="discount-threshold-slider"
                    name="discount-threshold-slider"
                    value={discountThreshold}
                    onChange={(e) => setDiscountThreshold(parseFloat(e.target.value))}
                    className="w-full h-2 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-tertiary"
                  />
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Any agent negotiation exceeding this margin immediately switches conversation to whisper monitor mode.
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy & Security Toggles with Accessible Labels & Attributes */}
            <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm space-y-space-lg">
              <div className="flex items-center justify-between pb-space-sm">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[22px]">security</span>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Data Privacy, Residency &amp; Security
                  </h3>
                </div>
                <span className="font-label-xs text-label-xs bg-emerald-50 text-emerald-800 px-space-sm py-space-2xs rounded-full font-semibold">
                  Protected
                </span>
              </div>

              <div className="space-y-space-md">
                <div className="flex items-start justify-between bg-surface-container-low p-space-md rounded-lg">
                  <div className="space-y-space-2xs pr-space-md">
                    <label htmlFor="gdpr-redaction-checkbox" className="font-body-md text-body-md font-medium text-on-surface cursor-pointer">
                      Strict GDPR &amp; CCPA Redaction
                    </label>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      PII, telephone records, tax entities, and credit details are automatically sanitized before passing into external model embeddings.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="gdpr-redaction-checkbox"
                    name="gdpr-redaction-checkbox"
                    checked={gdprRedaction}
                    onChange={(e) => setGdprRedaction(e.target.checked)}
                    className="w-5 h-5 rounded accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-start justify-between bg-surface-container-low p-space-md rounded-lg">
                  <div className="space-y-space-2xs pr-space-md">
                    <label htmlFor="eu-residency-checkbox" className="font-body-md text-body-md font-medium text-on-surface cursor-pointer">
                      EU Data Residency Mode
                    </label>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      All vectors and audio buffers stay entirely within the Frankfurt (eu-central-1) VPC for European enterprise accounts.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="eu-residency-checkbox"
                    name="eu-residency-checkbox"
                    checked={euResidency}
                    onChange={(e) => setEuResidency(e.target.checked)}
                    className="w-5 h-5 rounded accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="flex items-start justify-between bg-surface-container-low p-space-md rounded-lg">
                  <div className="space-y-space-2xs pr-space-md">
                    <label htmlFor="zero-retention-checkbox" className="font-body-md text-body-md font-medium text-on-surface cursor-pointer">
                      Zero-Data Retention with LLM Providers
                    </label>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Enterprise BAA active: Third-party foundation model instances do not retain customer prompts for training.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    id="zero-retention-checkbox"
                    name="zero-retention-checkbox"
                    checked={zeroRetention}
                    onChange={(e) => setZeroRetention(e.target.checked)}
                    className="w-5 h-5 rounded accent-emerald-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Real-time Observability & Telemetry */}
          <section className="bg-inverse-surface text-inverse-on-surface p-space-xl rounded-xl shadow-md space-y-space-base">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-secondary-container"></span>
                </span>
                <span className="font-headline-md text-headline-md font-semibold text-white tracking-tight">
                  Real-time Observability &amp; Telemetry
                </span>
              </div>
              <div className="flex items-center gap-space-sm">
                <span className="font-data-mono-sm text-data-mono-sm bg-white/10 px-space-sm py-space-xs rounded text-white/80">
                  Prometheus Collector v2.45
                </span>
                <span className="font-data-mono-sm text-data-mono-sm text-emerald-400 font-semibold">Pulse: 1000ms</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-base pt-space-xs">
              <div className="bg-white/5 p-space-base rounded-lg backdrop-blur-sm space-y-space-xs">
                <div className="flex justify-between items-center text-white/60">
                  <span className="font-label-xs text-label-xs uppercase">System Uptime</span>
                  <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
                </div>
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-display-lg text-display-lg font-bold text-white tracking-tight">99.98%</span>
                  <span className="font-data-mono-sm text-data-mono-sm text-emerald-400">+0.02%</span>
                </div>
                <div className="h-6 w-full flex items-end gap-1 pt-space-xs">
                  <div className="w-full bg-emerald-500/40 h-4 rounded-sm"></div>
                  <div className="w-full bg-emerald-500/40 h-5 rounded-sm"></div>
                  <div className="w-full bg-emerald-500/60 h-4 rounded-sm"></div>
                  <div className="w-full bg-emerald-500/80 h-6 rounded-sm"></div>
                  <div className="w-full bg-emerald-500 h-6 rounded-sm"></div>
                </div>
              </div>

              <div className="bg-white/5 p-space-base rounded-lg backdrop-blur-sm space-y-space-xs">
                <div className="flex justify-between items-center text-white/60">
                  <span className="font-label-xs text-label-xs uppercase">Mean Token Latency</span>
                  <span className="material-symbols-outlined text-[16px] text-secondary-container">speed</span>
                </div>
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-display-lg text-display-lg font-bold text-white tracking-tight">32ms</span>
                  <span className="font-data-mono-sm text-data-mono-sm text-white/60">/ token</span>
                </div>
                <div className="h-6 w-full flex items-end gap-1 pt-space-xs">
                  <div className="w-full bg-secondary-container/30 h-5 rounded-sm"></div>
                  <div className="w-full bg-secondary-container/50 h-3 rounded-sm"></div>
                  <div className="w-full bg-secondary-container/70 h-4 rounded-sm"></div>
                  <div className="w-full bg-secondary-container/40 h-3 rounded-sm"></div>
                  <div className="w-full bg-secondary-container h-3 rounded-sm"></div>
                </div>
              </div>

              <div className="bg-white/5 p-space-base rounded-lg backdrop-blur-sm space-y-space-xs">
                <div className="flex justify-between items-center text-white/60">
                  <span className="font-label-xs text-label-xs uppercase">Daily LLM Spend</span>
                  <span className="material-symbols-outlined text-[16px] text-tertiary-fixed">payments</span>
                </div>
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-display-lg text-display-lg font-bold text-white tracking-tight">$142.80</span>
                  <span className="font-data-mono-sm text-data-mono-sm text-white/60">/ $500 cap</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-space-sm overflow-hidden">
                  <div className="bg-tertiary-fixed h-2 rounded-full" style={{ width: '28.5%' }}></div>
                </div>
              </div>

              <div className="bg-white/5 p-space-base rounded-lg backdrop-blur-sm space-y-space-xs">
                <div className="flex justify-between items-center text-white/60">
                  <span className="font-label-xs text-label-xs uppercase">API Error Rate</span>
                  <span className="material-symbols-outlined text-[16px] text-emerald-400">task_alt</span>
                </div>
                <div className="flex items-baseline gap-space-xs">
                  <span className="font-display-lg text-display-lg font-bold text-emerald-400 tracking-tight">0.01%</span>
                  <span className="font-data-mono-sm text-data-mono-sm text-white/60">HTTP 5xx</span>
                </div>
                <div className="h-6 w-full flex items-end gap-1 pt-space-xs">
                  <div className="w-full bg-white/20 h-1 rounded-sm"></div>
                  <div className="w-full bg-white/20 h-1 rounded-sm"></div>
                  <div className="w-full bg-white/20 h-2 rounded-sm"></div>
                  <div className="w-full bg-white/20 h-1 rounded-sm"></div>
                  <div className="w-full bg-emerald-400 h-1 rounded-sm"></div>
                </div>
              </div>
            </div>

            <div className="bg-black/20 p-space-md rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-space-sm font-data-mono-sm text-data-mono-sm">
              <div className="flex items-center gap-space-sm text-white/80">
                <span className="material-symbols-outlined text-[16px] text-emerald-400">terminal</span>
                <span>audit_daemon: [INFO] 41,209 inference events verified against hash ring • 0 policy breaches detected</span>
              </div>
              <button
                onClick={() => showToast('Exported full telemetry log payload in JSON format.')}
                className="text-secondary-container hover:underline flex items-center gap-space-2xs"
              >
                Export JSON Telemetry
                <span className="material-symbols-outlined text-[14px]">download</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
