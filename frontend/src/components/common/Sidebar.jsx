'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAgent } from '@/context/AgentContext';

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: 'grid_view' },
  { label: 'Workflow Studio', path: '/workflow-studio', icon: 'account_tree' },
  { label: 'Lead & Dossier Hub', path: '/lead-dossier-hub', icon: 'manage_search' },
  { label: 'Proposal Studio', path: '/proposal-studio', icon: 'edit_document' },
  { label: 'Voice & Outreach', path: '/voice-outreach', icon: 'record_voice_over' },
  { label: 'CRM Interoperability', path: '/crm-interoperability', icon: 'sync_alt' },
  { label: 'SAP ERP Operations', path: '/sap-erp-operations', icon: 'inventory' },
  { label: 'Admin & Governance', path: '/admin-governance', icon: 'security' },
];

export default function Sidebar({ onOpenQuickActions }) {
  const pathname = usePathname();
  const { fleet, fleetStatus, toggleFleetStatus } = useAgent();

  const activeCount = fleet.filter((a) => a.status === 'ACTIVE').length || 8;

  return (
    <aside className="fixed left-0 top-0 h-full w-sidebar-width bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-50 flex flex-col justify-between">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 px-space-md flex items-center justify-between bg-surface-container-lowest">
          <Link href="/dashboard" className="flex items-center gap-space-sm hover:opacity-90 transition-opacity">
            <img
              alt="SalesChamp Logo"
              className="h-8 w-auto object-contain"
              src="/assets/Logo.png"
            />
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
              SalesChamp
            </span>
          </Link>
          <span className="font-label-xs text-label-xs bg-surface-container-high text-on-surface-variant px-space-xs py-space-2xs rounded">
            ENT
          </span>
        </div>

        {/* Workspace Switcher */}
        <div className="px-space-md py-space-sm">
          <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors">
            <div className="flex items-center gap-space-sm min-w-0">
              <div className="w-6 h-6 rounded bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm text-headline-sm flex-shrink-0">
                A
              </div>
              <div className="truncate">
                <p className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider">
                  Workspace
                </p>
                <p className="font-body-sm text-body-sm text-on-surface font-medium truncate">
                  Acme Corp Enterprise EMEA
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
              unfold_more
            </span>
          </div>
        </div>

        {/* Live Agent Fleet Badge */}
        <div className="px-space-md pb-space-sm">
          <button
            type="button"
            id="fleet-toggle-btn"
            name="fleet-toggle"
            aria-label="Toggle live agent fleet status"
            onClick={toggleFleetStatus}
            className="w-full flex items-center justify-between px-space-sm py-space-xs rounded-full bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center gap-space-xs">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${fleetStatus === 'ACTIVE' ? 'bg-emerald-400' : 'bg-amber-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${fleetStatus === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
              </span>
              <span className="font-label-xs text-label-xs">Live Agent Fleet</span>
            </div>
            <span className="font-data-mono-sm text-data-mono-sm text-on-surface font-semibold">
              {fleetStatus === 'ACTIVE' ? `${activeCount} active` : 'PAUSED'}
            </span>
          </button>
        </div>

        {/* Quick Actions Search Bar */}
        <div className="px-space-md pb-space-sm">
          <button
            type="button"
            id="quick-actions-trigger"
            name="quick-actions"
            aria-label="Open quick actions palette"
            onClick={onOpenQuickActions}
            className="w-full flex items-center justify-between px-space-sm py-space-xs rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-[16px]">search</span>
              <span className="font-body-sm text-body-sm">Quick actions</span>
            </div>
            <kbd className="font-data-mono-sm text-data-mono-sm px-space-xs py-space-2xs bg-surface-container-highest rounded text-on-surface-variant">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Navigation List */}
        <nav className="px-space-sm space-y-space-2xs">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path || (item.path === '/dashboard' && pathname === '/');
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-space-sm px-space-sm py-space-sm transition-colors rounded-lg ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {item.icon}
                </span>
                <span className="font-body-md text-body-md">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile Card */}
      <div className="p-space-md bg-surface-container-lowest">
        <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
            <div className="min-w-0">
              <p className="font-body-sm text-body-sm text-on-surface font-medium truncate">E. Vance</p>
              <p className="font-data-mono-sm text-data-mono-sm text-on-surface-variant truncate">RevOps Dir.</p>
            </div>
          </div>
          <button
            type="button"
            id="user-logout-btn"
            name="user-logout"
            aria-label="User session details"
            onClick={() => alert('SalesChamp Enterprise Session active and authenticated.')}
            className="text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
