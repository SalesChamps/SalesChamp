'use client';

import React, { useState } from 'react';

export default function SAPERPOperationsPage() {
  const [activeStage, setActiveStage] = useState(3);
  const [isCommitted, setIsCommitted] = useState(false);
  const [isCommitting, setIsCommitting] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (title, msg) => {
    setToastMessage({ title, msg });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCommitOrder = () => {
    setIsCommitting(true);
    setTimeout(() => {
      setIsCommitting(false);
      setIsCommitted(true);
      setActiveStage(4);
      showToast(
        'SAP Order Committed',
        'BAPI_SALESORDER_CREATEFROMDAT2 execution succeeded. S/4HANA Document #SO-44091 is officially locked.'
      );
    }, 1200);
  };

  const handleSimulateDelivery = () => {
    showToast(
      'VL01N Simulation Complete',
      'Outbound delivery slot reserved at Dallas DC (Carrier: DHL Freight). Plant 1010 confirms stock availability.'
    );
  };

  const handlePrintQuote = () => {
    showToast(
      'Form S_ORDER_FORM_US Generated',
      'Adobe Document Services rendered Quote #QTE-SAP-98124 ready for dispatch.'
    );
  };

  return (
    <div className="flex flex-col w-full space-y-space-xl">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="p-space-md rounded-xl bg-inverse-surface text-inverse-on-surface shadow-xl flex items-center justify-between transition-all">
          <div className="flex items-center gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-[24px]">task_alt</span>
            <div>
              <h5 className="font-headline-sm text-sm font-bold text-inverse-on-surface">{toastMessage.title}</h5>
              <p className="font-body-sm text-xs text-inverse-on-surface/80">{toastMessage.msg}</p>
            </div>
          </div>
          <button onClick={() => setToastMessage(null)} aria-label="Dismiss message">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Header & Connection Monitor */}
      <div className="flex flex-col gap-space-md lg:flex-row lg:items-center lg:justify-between bg-surface-container-lowest p-space-xl rounded-xl shadow-sm">
        <div className="space-y-space-xs">
          <div className="flex items-center gap-space-sm flex-wrap">
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              SAP ERP Operations &amp; Order Fulfillment Desk
            </h1>
            <span className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-xs text-label-xs font-semibold">
              <span className="material-symbols-outlined text-[14px]">cloud_sync</span>
              SAP S/4HANA Cloud (PRD-US01)
            </span>
          </div>
          <div className="flex items-center gap-space-sm font-label-md text-label-md text-on-surface-variant flex-wrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span>SAP BTP / OData v4 REST API: <strong className="text-on-surface font-semibold">Active</strong></span>
            <span className="text-outline-variant">•</span>
            <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">Latency: 64ms</span>
            <span className="text-outline-variant">•</span>
            <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">RFC Host: sap-prd-rfc01.acme.corp</span>
          </div>
        </div>

        {/* Dropdown Configuration Selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm bg-surface-container-low p-space-sm rounded-lg">
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Company Code</span>
            <div className="flex items-center justify-between text-on-surface font-data-mono-sm text-data-mono-sm font-semibold mt-space-2xs">
              <span>1000 (US NA)</span>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Sales Org</span>
            <div className="flex items-center justify-between text-on-surface font-data-mono-sm text-data-mono-sm font-semibold mt-space-2xs">
              <span>1010 (Direct)</span>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Dist. Channel</span>
            <div className="flex items-center justify-between text-on-surface font-data-mono-sm text-data-mono-sm font-semibold mt-space-2xs">
              <span>10 (SaaS &amp; Int)</span>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">Division</span>
            <div className="flex items-center justify-between text-on-surface font-data-mono-sm text-data-mono-sm font-semibold mt-space-2xs">
              <span>00 (Cross)</span>
              <span className="material-symbols-outlined text-[16px] text-on-surface-variant">expand_more</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Order Lifecycle Tracker (Interactive Stepper) */}
      <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm space-y-space-base">
        <div className="flex items-center justify-between border-b-0 pb-0">
          <div>
            <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant">Fulfillment Orchestration</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface mt-space-2xs font-bold">Order Lifecycle Milestones</h2>
          </div>
          <div className="flex items-center gap-space-xs font-data-mono-sm text-data-mono-sm bg-surface-container-high px-space-sm py-space-2xs rounded text-on-surface">
            <span className="material-symbols-outlined text-[16px] text-primary">hub</span>
            <span>Pipeline Mode: S/4HANA Live Sync</span>
          </div>
        </div>

        {/* Stepper Pipeline */}
        <div className="relative pt-space-md pb-space-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-space-md">
            {/* Step 1 */}
            <div className="relative bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs font-semibold text-secondary">STAGE 01</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary-fixed text-on-secondary-fixed">
                  <span className="material-symbols-outlined text-[14px]">done</span>
                </span>
              </div>
              <div className="mt-space-sm">
                <h3 className="font-headline-sm text-sm font-bold text-on-surface">Quotation Drafted</h3>
                <p className="font-data-mono-sm text-data-mono-sm text-on-surface-variant mt-space-2xs">Doc: #QTE-SAP-98124</p>
                <span className="inline-block mt-space-xs font-label-xs text-label-xs bg-surface-container-highest text-on-surface px-space-xs py-space-2xs rounded">
                  Generated v2.4
                </span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs font-semibold text-secondary">STAGE 02</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-secondary-fixed text-on-secondary-fixed">
                  <span className="material-symbols-outlined text-[14px]">done</span>
                </span>
              </div>
              <div className="mt-space-sm">
                <h3 className="font-headline-sm text-sm font-bold text-on-surface">Customer Acceptance</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">Signed: Marcus Vance</p>
                <span className="inline-block mt-space-xs font-label-xs text-label-xs bg-secondary-fixed text-on-secondary-fixed-variant px-space-xs py-space-2xs rounded">
                  DocuSign Certified
                </span>
              </div>
            </div>

            {/* Step 3 (Active) */}
            <div className={`relative p-space-md rounded-lg flex flex-col justify-between shadow-sm transition-all ${
              activeStage === 3 ? 'bg-primary-fixed' : 'bg-surface-container-low'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs font-bold text-on-primary-fixed">
                  STAGE 03 {activeStage === 3 && '• ACTIVE'}
                </span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary animate-pulse">
                  <span className="material-symbols-outlined text-[14px]">{isCommitted ? 'done' : 'sync'}</span>
                </span>
              </div>
              <div className="mt-space-sm">
                <h3 className="font-headline-sm text-sm font-bold text-on-primary-fixed">Sales Order Created</h3>
                <p className="font-data-mono-sm text-data-mono-sm text-on-primary-fixed-variant mt-space-2xs">
                  {isCommitted ? 'Doc: #SO-44091 Locked' : 'Doc: #SO-44091 Staging'}
                </p>
                <span className="inline-block mt-space-xs font-label-xs text-label-xs bg-primary text-on-primary px-space-xs py-space-2xs rounded font-semibold">
                  {isCommitted ? 'BAPI Committed' : 'BAPI Ready'}
                </span>
              </div>
            </div>

            {/* Step 4 */}
            <div className={`relative p-space-md rounded-lg flex flex-col justify-between transition-all ${
              activeStage >= 4 ? 'bg-primary-fixed' : 'bg-surface-container opacity-80'
            }`}>
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs font-semibold text-on-surface-variant">STAGE 04</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">{activeStage >= 4 ? 'done' : 'hourglass_empty'}</span>
                </span>
              </div>
              <div className="mt-space-sm">
                <h3 className="font-headline-sm text-sm font-bold text-on-surface">Credit &amp; Verification</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">D&amp;B Score: 92/100</p>
                <span className="inline-block mt-space-xs font-label-xs text-label-xs bg-surface-container-highest text-on-surface-variant px-space-xs py-space-2xs rounded">
                  Pre-Approved
                </span>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative bg-surface-container p-space-md rounded-lg flex flex-col justify-between opacity-80">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs font-semibold text-on-surface-variant">STAGE 05</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                </span>
              </div>
              <div className="mt-space-sm">
                <h3 className="font-headline-sm text-sm font-bold text-on-surface">Warehouse Delivery</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">Dallas DC (Rack Unit)</p>
                <span className="inline-block mt-space-xs font-label-xs text-label-xs bg-surface-container-highest text-on-surface-variant px-space-xs py-space-2xs rounded">
                  Scheduled Nov 2
                </span>
              </div>
            </div>

            {/* Step 6 */}
            <div className="relative bg-surface-container p-space-md rounded-lg flex flex-col justify-between opacity-80">
              <div className="flex items-center justify-between">
                <span className="font-label-xs text-label-xs font-semibold text-on-surface-variant">STAGE 06</span>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-surface-container-high text-on-surface-variant">
                  <span className="material-symbols-outlined text-[14px]">receipt_long</span>
                </span>
              </div>
              <div className="mt-space-sm">
                <h3 className="font-headline-sm text-sm font-bold text-on-surface">Billing Document</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">SAP VF01 Trigger</p>
                <span className="inline-block mt-space-xs font-label-xs text-label-xs bg-surface-container-highest text-on-surface-variant px-space-xs py-space-2xs rounded">
                  Automated Queue
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 1: Dynamic Quotation & Order Builder */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-xl space-y-space-lg">
        {/* Customer Master Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm bg-surface-container-low p-space-md rounded-lg">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold">
              <span className="material-symbols-outlined text-[20px]">corporate_fare</span>
            </div>
            <div>
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Acme Cloud Logistics</span>
                <span className="font-data-mono-sm text-data-mono-sm bg-surface-container-high px-space-xs py-space-2xs rounded text-on-surface">
                  BP #0001094821
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Synced from Salesforce Opp <span className="font-data-mono-sm text-data-mono-sm text-primary font-semibold">#0015e00000X9yAa</span> • Document Currency: <strong className="text-on-surface">USD ($)</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-space-sm">
            <button
              onClick={() => showToast('Audit History', 'Retrieved S/4HANA change document log for BP #0001094821.')}
              id="audit-history-btn"
              name="audit-history-btn"
              className="px-space-sm py-space-xs rounded bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors flex items-center gap-space-xs"
            >
              <span className="material-symbols-outlined text-[16px]">history</span>
              <span>Audit History</span>
            </button>
            <button
              onClick={() => showToast('Refreshed ERP Data', 'OData delta entities reloaded directly from PRD-US01.')}
              id="refresh-erp-btn"
              name="refresh-erp-btn"
              className="px-space-sm py-space-xs rounded bg-secondary text-on-secondary font-label-md text-label-md hover:bg-secondary/90 transition-colors flex items-center gap-space-xs"
            >
              <span className="material-symbols-outlined text-[16px]">sync_alt</span>
              <span>Refresh ERP Data</span>
            </button>
          </div>
        </div>

        {/* Itemized Order Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-xs text-label-xs uppercase tracking-wider">
                <th className="py-space-sm px-space-md">Item / Material ID</th>
                <th className="py-space-sm px-space-md">Description</th>
                <th className="py-space-sm px-space-md">Available Stock (ATP Check)</th>
                <th className="py-space-sm px-space-md text-right">Unit Price</th>
                <th className="py-space-sm px-space-md text-right">Qty</th>
                <th className="py-space-sm px-space-md text-right">Discount</th>
                <th className="py-space-sm px-space-md">Tax Code</th>
                <th className="py-space-sm px-space-md text-right">Net Total</th>
              </tr>
            </thead>
            <tbody className="divide-y-0 font-body-sm text-body-sm">
              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-space-md px-space-md align-top">
                  <span className="font-data-mono-sm text-data-mono-sm text-primary font-semibold">SKU-AGNT-1000</span>
                  <span className="block font-label-xs text-label-xs text-on-surface-variant">Pos 000010</span>
                </td>
                <td className="py-space-md px-space-md align-top max-w-xs">
                  <p className="font-body-md text-body-md font-medium text-on-surface">SalesChamp Autonomous Agent Core Pod</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">10 Active Autonomous AI Agents with custom CRM skills &amp; memory retention</p>
                </td>
                <td className="py-space-md px-space-md align-top">
                  <span className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Virtual SKU - Unlimited Enterprise Provisioning
                  </span>
                </td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md text-on-surface">$10,000.00/mo</td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md text-on-surface font-semibold">12 mos</td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md text-secondary font-semibold">18.0%</td>
                <td className="py-space-md px-space-md align-top">
                  <span className="font-data-mono-sm text-data-mono-sm bg-surface-container-high px-space-xs py-space-2xs rounded text-on-surface">U1 (Exempt)</span>
                </td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md font-bold text-on-surface">$98,400.00</td>
              </tr>

              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-space-md px-space-md align-top">
                  <span className="font-data-mono-sm text-data-mono-sm text-primary font-semibold">SKU-INT-S4HANA</span>
                  <span className="block font-label-xs text-label-xs text-on-surface-variant">Pos 000020</span>
                </td>
                <td className="py-space-md px-space-md align-top max-w-xs">
                  <p className="font-body-md text-body-md font-medium text-on-surface">SAP S/4HANA Bidirectional Event Connector</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">BAPI Bridge, Enterprise event meshes, delta queue integration engine</p>
                </td>
                <td className="py-space-md px-space-md align-top">
                  <span className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Licensed Connector - Active
                  </span>
                </td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md text-on-surface">$45,000.00</td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md text-on-surface font-semibold">1 unit</td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md text-on-surface-variant">0.0%</td>
                <td className="py-space-md px-space-md align-top">
                  <span className="font-data-mono-sm text-data-mono-sm bg-surface-container-high px-space-xs py-space-2xs rounded text-on-surface">U1</span>
                </td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md font-bold text-on-surface">$45,000.00</td>
              </tr>

              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-space-md px-space-md align-top">
                  <span className="font-data-mono-sm text-data-mono-sm text-primary font-semibold">SKU-VOX-50K</span>
                  <span className="block font-label-xs text-label-xs text-on-surface-variant">Pos 000030</span>
                </td>
                <td className="py-space-md px-space-md align-top max-w-xs">
                  <p className="font-body-md text-body-md font-medium text-on-surface">Omnichannel Voice Telephony Pack</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">50,000 ElevenLabs synth mins, low latency WebRTC gateway routing</p>
                </td>
                <td className="py-space-md px-space-md align-top">
                  <span className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Telephony Gateway - Ready
                  </span>
                </td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md text-on-surface">$0.70/min</td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md text-on-surface font-semibold">50,000 mins</td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md text-secondary font-semibold">20.0%</td>
                <td className="py-space-md px-space-md align-top">
                  <span className="font-data-mono-sm text-data-mono-sm bg-surface-container-high px-space-xs py-space-2xs rounded text-on-surface">U1</span>
                </td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md font-bold text-on-surface">$28,000.00</td>
              </tr>

              <tr className="hover:bg-surface-container-low transition-colors">
                <td className="py-space-md px-space-md align-top">
                  <span className="font-data-mono-sm text-data-mono-sm text-primary font-semibold">SKU-HW-EDGE-02</span>
                  <span className="block font-label-xs text-label-xs text-on-surface-variant">Pos 000040</span>
                </td>
                <td className="py-space-md px-space-md align-top max-w-xs">
                  <p className="font-body-md text-body-md font-medium text-on-surface">On-Premise Secure Edge AI Gateway Device</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Dallas DC Rack Unit, 1U Dual redundant PSU, local vector inference module</p>
                </td>
                <td className="py-space-md px-space-md align-top">
                  <span className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-xs text-label-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    In Stock - 450 units in Hamburg DC (Trans-shipment)
                  </span>
                </td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md text-on-surface">$2,600.00</td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md text-on-surface font-semibold">2 units</td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md text-secondary font-semibold">10.0%</td>
                <td className="py-space-md px-space-md align-top">
                  <span className="font-data-mono-sm text-data-mono-sm bg-tertiary-fixed text-on-tertiary-fixed font-semibold px-space-xs py-space-2xs rounded">TX-8.25%</span>
                </td>
                <td className="py-space-md px-space-md align-top text-right font-data-mono-md text-data-mono-md font-bold text-on-surface">$4,680.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Order Financial Calculations & Summary Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start pt-space-md">
          {/* Terms & Fulfillment Meta */}
          <div className="lg:col-span-7 space-y-space-md">
            <div className="p-space-md rounded-lg bg-surface-container-low space-y-space-sm">
              <h4 className="font-label-md text-label-md uppercase tracking-wider text-on-surface font-semibold flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                <span>SAP Document &amp; Pricing Condition Rules</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm font-body-sm text-body-sm">
                <div>
                  <span className="block text-on-surface-variant font-label-xs text-label-xs">Payment Terms:</span>
                  <span className="font-semibold text-on-surface font-data-mono-sm text-data-mono-sm">NT30 (30 Days Post Delivery)</span>
                </div>
                <div>
                  <span className="block text-on-surface-variant font-label-xs text-label-xs">Incoterms:</span>
                  <span className="font-semibold text-on-surface font-data-mono-sm text-data-mono-sm">DDP - Dallas Delivery</span>
                </div>
                <div>
                  <span className="block text-on-surface-variant font-label-xs text-label-xs">Billing Schedule:</span>
                  <span className="font-semibold text-on-surface font-data-mono-sm text-data-mono-sm">Monthly in Advance (MRR)</span>
                </div>
                <div>
                  <span className="block text-on-surface-variant font-label-xs text-label-xs">Credit Limit Check:</span>
                  <span className="text-secondary font-semibold font-data-mono-sm text-data-mono-sm">PASSED ($500,000.00 cap)</span>
                </div>
                <div>
                  <span className="block text-on-surface-variant font-label-xs text-label-xs">Tax Classification:</span>
                  <span className="font-semibold text-on-surface font-data-mono-sm text-data-mono-sm">Mixed Tax (SaaS + Hardware)</span>
                </div>
                <div>
                  <span className="block text-on-surface-variant font-label-xs text-label-xs">SAP Plant:</span>
                  <span className="font-semibold text-on-surface font-data-mono-sm text-data-mono-sm">PLNT-1010 (North Amer.)</span>
                </div>
              </div>
            </div>

            {/* Manifest Preview */}
            <div className="p-space-md rounded-lg bg-surface-container flex items-center gap-space-md">
              <div className="w-16 h-16 rounded-lg bg-surface-container-highest text-primary flex items-center justify-center font-bold shrink-0">
                <span className="material-symbols-outlined text-3xl">dns</span>
              </div>
              <div className="min-w-0">
                <span className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant">Hardware Manifest Preview</span>
                <p className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                  On-Premise Secure Edge AI Gateway Device (2x 1U)
                </p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Hamburg DC dispatch allocation confirmed. Carrier: DHL Supply Chain Express.</p>
              </div>
            </div>
          </div>

          {/* Financial Calculation Totals */}
          <div className="lg:col-span-5 bg-surface-container-high p-space-lg rounded-xl space-y-space-sm">
            <h4 className="font-label-xs text-label-xs uppercase tracking-wider text-on-surface-variant font-bold">SAP Net Value Determination</h4>
            <div className="space-y-space-xs font-body-md text-body-md">
              <div className="flex justify-between text-on-surface-variant">
                <span>Gross Order Total:</span>
                <span className="font-data-mono-md text-data-mono-md text-on-surface font-medium">$215,200.00</span>
              </div>
              <div className="flex justify-between text-secondary">
                <span className="flex items-center gap-space-xs">
                  <span>Applied Enterprise Discount:</span>
                  <span className="font-label-xs text-label-xs px-space-xs rounded bg-secondary-fixed text-on-secondary-fixed">RA00</span>
                </span>
                <span className="font-data-mono-md text-data-mono-md font-semibold">-$39,120.00</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Calculated Sales Tax (TX-8.25% on HW):</span>
                <span className="font-data-mono-md text-data-mono-md text-on-surface font-medium">$386.10</span>
              </div>
              <div className="h-2"></div>
              <div className="pt-space-sm flex items-baseline justify-between">
                <div>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Final SAP Net Order Value</span>
                  <span className="block font-label-xs text-label-xs text-on-surface-variant">Condition Type: PR00 Total Net Price</span>
                </div>
                <span className="font-display-lg text-display-lg font-bold text-primary">$176,466.10</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: BAPI Diagnostics & Quick Action Toolbar */}
      <div className="bg-surface-container-lowest p-space-xl rounded-xl shadow-sm space-y-space-lg">
        {/* Diagnostics Log */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md p-space-md rounded-lg bg-surface-container">
          <div className="flex items-start gap-space-sm">
            <span className="material-symbols-outlined text-secondary text-[22px] mt-0.5">terminal</span>
            <div className="space-y-space-2xs">
              <div className="flex items-center gap-space-sm">
                <span className="font-label-xs text-label-xs font-bold uppercase tracking-wider text-secondary">BAPI Execution Health</span>
                <span className="font-data-mono-sm text-data-mono-sm text-on-surface font-semibold bg-surface-container-lowest px-space-xs py-space-2xs rounded">
                  RETURN CODE: S (Success)
                </span>
              </div>
              <p className="font-data-mono-sm text-data-mono-sm text-on-surface">
                BAPI_SALESORDER_CREATEFROMDAT2: Validation passed without errors • RFC Target:{' '}
                <span className="text-primary font-semibold">sap-prd-rfc01.acme.corp</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-space-xs font-label-xs text-label-xs text-on-surface-variant bg-surface-container-lowest px-space-sm py-space-xs rounded shrink-0">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span>IDoc / RFC Bridge In-Sync</span>
          </div>
        </div>

        {/* Quick Action Toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>Concurrent Lock: <strong className="text-on-surface">Acme Cloud Logistics (BP #0001094821)</strong> protected from race updates.</span>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm w-full sm:w-auto justify-end">
            <button
              onClick={handlePrintQuote}
              id="btnPrintQuote"
              name="btnPrintQuote"
              className="px-space-md py-space-sm rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-headline-sm text-sm font-medium transition-colors flex items-center gap-space-xs shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
              <span>Issue SAP Quotation PDF</span>
            </button>

            <button
              onClick={handleSimulateDelivery}
              id="btnSimulateDelivery"
              name="btnSimulateDelivery"
              className="px-space-md py-space-sm rounded-lg bg-secondary text-on-secondary font-headline-sm text-sm font-medium hover:bg-secondary/90 transition-colors flex items-center gap-space-xs shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">local_shipping</span>
              <span>Trigger Delivery Schedule (VL01N)</span>
            </button>

            <button
              onClick={handleCommitOrder}
              disabled={isCommitting || isCommitted}
              id="btnCommitOrder"
              name="btnCommitOrder"
              className={`px-space-lg py-space-sm rounded-lg font-headline-sm text-sm font-semibold transition-all flex items-center gap-space-xs shadow-md ${
                isCommitted
                  ? 'bg-secondary text-on-secondary cursor-default'
                  : 'bg-primary text-on-primary hover:bg-primary-container'
              }`}
            >
              <span className={`material-symbols-outlined text-[20px] ${isCommitting ? 'animate-spin' : ''}`}>
                {isCommitted ? 'check' : isCommitting ? 'refresh' : 'verified_user'}
              </span>
              <span>{isCommitted ? 'Order Committed (SO-44091)' : isCommitting ? 'Executing RFC...' : 'Commit Sales Order (BAPI Execute & Lock)'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
