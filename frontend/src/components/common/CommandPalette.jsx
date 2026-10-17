'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/services/api';

export default function CommandPalette({ isOpen, onClose }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      title: 'Trigger Autonomous 8-Agent Pipeline',
      description: 'Run end-to-end sales lifecycle for an enterprise prospect',
      icon: 'auto_awesome',
      run: async () => {
        setIsExecuting(true);
        setFeedback('Manager Agent launching multi-agent workflow...');
        try {
          await api.triggerPipeline('Novartis Healthcare EMEA', 'Life Sciences');
          setFeedback('Pipeline initiated! Navigating to Workflow Studio...');
          setTimeout(() => {
            onClose(false);
            router.push('/workflow-studio');
          }, 600);
        } catch {
          router.push('/workflow-studio');
        } finally {
          setIsExecuting(false);
        }
      },
    },
    {
      title: 'Force Dual-CRM Delta Re-Sync',
      description: 'Synchronize Salesforce and Microsoft Dynamics 365 records',
      icon: 'sync',
      run: async () => {
        setIsExecuting(true);
        setFeedback('Synchronizing CRM deltas and running deduplication...');
        try {
          await api.syncAllCrm();
          setFeedback('Sync complete! Navigating to CRM Interoperability Hub...');
          setTimeout(() => {
            onClose(false);
            router.push('/crm-interoperability');
          }, 600);
        } catch {
          router.push('/crm-interoperability');
        } finally {
          setIsExecuting(false);
        }
      },
    },
    {
      title: 'Discover Fresh Enterprise Leads',
      description: 'Deploy Lead Discovery Agent across web crawler & maps',
      icon: 'manage_search',
      run: () => {
        onClose(false);
        router.push('/lead-dossier-hub');
      },
    },
    {
      title: 'Open Autonomous Proposal Studio',
      description: 'Review AI-generated proposals and execute HITL approvals',
      icon: 'edit_document',
      run: () => {
        onClose(false);
        router.push('/proposal-studio');
      },
    },
    {
      title: 'Launch AI Voice Outreach Simulator',
      description: 'Place synthetic conversational phone calls and view live audio waves',
      icon: 'record_voice_over',
      run: () => {
        onClose(false);
        router.push('/voice-outreach');
      },
    },
    {
      title: 'Verify SAP S/4HANA ERP Orders & Invoices',
      description: 'Audit inventory allocations and customer billing states',
      icon: 'inventory',
      run: () => {
        onClose(false);
        router.push('/sap-erp-operations');
      },
    },
  ];

  const filtered = actions.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-start justify-center pt-24 p-4">
      <div className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden">
        <form onSubmit={(e) => e.preventDefault()} className="p-space-md border-b border-surface-container flex items-center gap-space-sm">
          <label htmlFor="command-search-input" className="flex items-center text-primary cursor-pointer">
            <span className="material-symbols-outlined text-[22px]">search</span>
            <span className="sr-only">Search Quick Actions</span>
          </label>
          <input
            id="command-search-input"
            name="command-search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type a command or jump to module..."
            className="w-full bg-transparent text-on-surface placeholder:text-on-surface-variant focus:outline-none font-body-md text-body-md"
            autoFocus
          />
          <kbd className="font-data-mono-sm text-data-mono-sm px-space-xs py-space-2xs bg-surface-container rounded text-on-surface-variant">
            ESC
          </kbd>
        </form>

        {feedback && (
          <div className="px-space-md py-space-xs bg-primary-container/10 text-primary font-body-sm text-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            {feedback}
          </div>
        )}

        <div className="p-space-xs max-h-96 overflow-y-auto space-y-1">
          {filtered.map((action, idx) => (
            <button
              key={idx}
              type="button"
              id={`cmd-action-${idx}`}
              name={`cmd-action-${idx}`}
              disabled={isExecuting}
              onClick={action.run}
              className="w-full text-left p-space-sm rounded-xl hover:bg-surface-container-high transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-surface-container-low group-hover:bg-primary-container group-hover:text-on-primary-container flex items-center justify-center text-on-surface-variant transition-colors">
                  <span className="material-symbols-outlined text-[18px]">{action.icon}</span>
                </div>
                <div>
                  <p className="font-headline-sm text-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                    {action.title}
                  </p>
                  <p className="font-body-sm text-xs text-on-surface-variant">
                    {action.description}
                  </p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant group-hover:text-on-surface text-[18px] opacity-0 group-hover:opacity-100 transition-opacity">
                arrow_forward
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
