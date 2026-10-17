'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/services/api';

const AgentContext = createContext(null);

export function AgentProvider({ children }) {
  const [fleet, setFleet] = useState([]);
  const [fleetStatus, setFleetStatus] = useState('ACTIVE');
  const [activePipeline, setActivePipeline] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'HITL Review Pending', message: 'AeroTech Systems proposal ready for approval.', time: '2m ago', type: 'warning' },
    { id: 2, title: 'Deduplication Conflict', message: 'Annual revenue mismatch detected in SFDC/DYN.', time: '14m ago', type: 'critical' },
  ]);
  const [systemHealth, setSystemHealth] = useState({
    salesforce: 'CONNECTED',
    dynamics: 'CONNECTED',
    sap: 'ACTIVE',
    latency: '134ms',
  });

  const refreshFleet = async () => {
    try {
      const data = await api.getAgentFleet();
      if (Array.isArray(data)) {
        setFleet(data);
      } else if (data.results) {
        setFleet(data.results);
      }
    } catch (err) {
      console.warn('Using default agent fleet:', err.message);
      // Fallback default fleet of 8 agents
      setFleet([
        { agent_id: 'agent-manager', name: 'Manager Orchestrator', role: 'Supervisor & HITL Dispatcher', status: 'ACTIVE', latency_ms: 118, tokens_processed: 142000, success_rate: 99.8 },
        { agent_id: 'agent-discovery', name: 'Lead Discovery Agent', role: 'B2B Prospecting & ICP Scoring', status: 'ACTIVE', latency_ms: 340, tokens_processed: 98500, success_rate: 98.4 },
        { agent_id: 'agent-research', name: 'Business Research Agent', role: 'Tech Stack & Pain-Point Extractor', status: 'ACTIVE', latency_ms: 620, tokens_processed: 214000, success_rate: 99.1 },
        { agent_id: 'agent-proposal', name: 'Autonomous Proposal Agent', role: 'RAG Knowledge Synthesis & SOW', status: 'ACTIVE', latency_ms: 780, tokens_processed: 389000, success_rate: 97.9 },
        { agent_id: 'agent-comm', name: 'Communication Agent', role: 'Autonomous Voice SDR & Follow-up', status: 'ACTIVE', latency_ms: 450, tokens_processed: 167000, success_rate: 98.6 },
        { agent_id: 'agent-crm', name: 'Multi-CRM Interoperability Agent', role: 'SFDC & Dyn 365 Bi-Directional Sync', status: 'ACTIVE', latency_ms: 134, tokens_processed: 312000, success_rate: 99.9 },
        { agent_id: 'agent-sap', name: 'SAP ERP Fulfillment Agent', role: 'S/4HANA Order, Inventory & Invoice', status: 'ACTIVE', latency_ms: 195, tokens_processed: 184000, success_rate: 99.5 },
        { agent_id: 'agent-analytics', name: 'Executive Analytics Agent', role: 'Revenue Forecasting & NL Query Copilot', status: 'ACTIVE', latency_ms: 110, tokens_processed: 122000, success_rate: 100.0 },
      ]);
    }
  };

  useEffect(() => {
    refreshFleet();
  }, []);

  const toggleFleetStatus = async () => {
    const nextStatus = fleetStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    try {
      await api.toggleFleet(nextStatus === 'PAUSED' ? 'PAUSE' : 'RESUME');
      setFleetStatus(nextStatus);
      refreshFleet();
    } catch {
      setFleetStatus(nextStatus);
    }
  };

  return (
    <AgentContext.Provider value={{
      fleet,
      fleetStatus,
      activePipeline,
      setActivePipeline,
      notifications,
      systemHealth,
      refreshFleet,
      toggleFleetStatus,
    }}>
      {children}
    </AgentContext.Provider>
  );
}

export function useAgent() {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgent must be used within an AgentProvider');
  }
  return context;
}
