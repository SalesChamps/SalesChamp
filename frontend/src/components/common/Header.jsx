'use client';

import React, { useState } from 'react';
import { useAgent } from '@/context/AgentContext';

export default function Header({ onOpenNotifications }) {
  const { notifications } = useAgent();
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  return (
    <header className="sticky top-0 z-40 h-16 w-full bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] flex items-center justify-between px-space-xl shrink-0">
      <div className="flex items-center gap-space-md">
        <img
          alt="SalesChamp Logo"
          className="h-8 w-auto object-contain"
          src="/assets/Logo.png"
        />
        <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
          SalesChamp
        </span>

        {/* Real-time Enterprise System Status Badges */}
        <div className="hidden lg:flex items-center gap-space-xs font-label-xs text-label-xs bg-surface-container-low px-space-sm py-space-xs rounded-full text-on-surface-variant">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Salesforce Connected</span>
        </div>

        <div className="hidden xl:flex items-center gap-space-xs font-label-xs text-label-xs bg-surface-container-low px-space-sm py-space-xs rounded-full text-on-surface-variant">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Dynamics 365 Connected</span>
        </div>

        <div className="hidden 2xl:flex items-center gap-space-xs font-label-xs text-label-xs bg-surface-container-low px-space-sm py-space-xs rounded-full text-on-surface-variant">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>SAP S/4HANA Active</span>
        </div>
      </div>

      <div className="flex items-center gap-space-md">
        {/* Notifications Trigger */}
        <div className="relative">
          <button
            type="button"
            id="notifications-bell-btn"
            name="notifications-bell"
            aria-label="View notifications and alerts"
            onClick={() => setShowNotificationDrawer(!showNotificationDrawer)}
            className="relative p-space-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
            title="System alerts & HITL notices"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotificationDrawer && (
            <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-2xl shadow-xl p-space-md z-50">
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container mb-space-sm">
                <span className="font-headline-sm text-sm font-bold text-on-surface">Audit & HITL Alerts</span>
                <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">{notifications.length} unread</span>
              </div>
              <div className="space-y-space-sm max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="font-label-md font-semibold text-on-surface">{n.title}</span>
                      <span className="font-data-mono-sm text-[10px] text-on-surface-variant">{n.time}</span>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-1">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* System Help */}
        <button
          type="button"
          id="help-btn"
          name="help-button"
          aria-label="System architecture help"
          onClick={() => alert('SalesChamp Multi-Agent Architecture: All 8 specialized agents operate continuously with full Human-in-the-Loop review gates.')}
          className="p-space-xs text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-full transition-colors"
          title="Architecture Documentation"
        >
          <span className="material-symbols-outlined text-[22px]">help_outline</span>
        </button>

        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
        </div>
      </div>
    </header>
  );
}
