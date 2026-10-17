const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const res = await fetch(url, config);
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || errData.detail || `Request failed with status ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.warn(`API call failed for ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // Analytics
  getAnalyticsOverview: () => request('/analytics/metrics/overview/'),
  queryAnalytics: (prompt) => request('/analytics/metrics/query/', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
  }),

  // Leads
  getLeads: () => request('/leads/'),
  discoverLeads: (query, limit = 3) => request('/leads/discover/', {
    method: 'POST',
    body: JSON.stringify({ query, limit }),
  }),
  researchLead: (id) => request(`/leads/${id}/research/`, { method: 'POST' }),

  // Proposals
  getProposals: () => request('/proposals/'),
  generateProposal: (lead_id) => request('/proposals/generate/', {
    method: 'POST',
    body: JSON.stringify({ lead_id }),
  }),
  approveProposal: (id, reviewer_notes) => request(`/proposals/${id}/approve/`, {
    method: 'POST',
    body: JSON.stringify({ reviewer_notes }),
  }),
  rejectProposal: (id, reviewer_notes) => request(`/proposals/${id}/reject/`, {
    method: 'POST',
    body: JSON.stringify({ reviewer_notes }),
  }),

  // Dual CRM
  getCrmRecords: () => request('/crm/records/'),
  syncAllCrm: () => request('/crm/records/sync_all/', { method: 'POST' }),
  syncCrmRecord: (id) => request(`/crm/records/${id}/sync_record/`, { method: 'POST' }),
  getCrmConflicts: () => request('/crm/conflicts/'),
  resolveConflict: (id, winner, custom_value) => request(`/crm/conflicts/${id}/resolve/`, {
    method: 'POST',
    body: JSON.stringify({ winner, custom_value }),
  }),

  // SAP ERP
  getErpProducts: () => request('/erp/products/'),
  getErpOrders: () => request('/erp/orders/'),
  verifyInventory: (id) => request(`/erp/orders/${id}/verify_inventory/`, { method: 'POST' }),
  confirmErpOrder: (id) => request(`/erp/orders/${id}/confirm_order/`, { method: 'POST' }),
  createInvoice: (id) => request(`/erp/orders/${id}/create_invoice/`, { method: 'POST' }),
  getErpInvoices: () => request('/erp/invoices/'),
  payInvoice: (id) => request(`/erp/invoices/${id}/pay/`, { method: 'POST' }),

  // Communications & Voice
  getVoiceLogs: () => request('/communications/calls/'),
  initiateVoiceCall: (lead_id) => request('/communications/calls/initiate_call/', {
    method: 'POST',
    body: JSON.stringify({ lead_id }),
  }),
  getFollowUps: () => request('/communications/followups/'),
  sendFollowUp: (lead_id, channel) => request('/communications/followups/send_followup/', {
    method: 'POST',
    body: JSON.stringify({ lead_id, channel }),
  }),

  // Multi-Agent Fleet & Orchestration
  getAgentFleet: () => request('/agents/fleet/'),
  toggleFleet: (action) => request('/agents/fleet/toggle_fleet/', {
    method: 'POST',
    body: JSON.stringify({ action }),
  }),
  getWorkflowExecutions: () => request('/agents/workflows/'),
  triggerPipeline: (company_name, industry) => request('/agents/workflows/trigger_pipeline/', {
    method: 'POST',
    body: JSON.stringify({ company_name, industry }),
  }),

  // Governance & Connectors
  getConnectors: () => request('/governance/connectors/'),
  pingConnector: (id) => request(`/governance/connectors/${id}/ping/`, { method: 'POST' }),
  getAuditLogs: () => request('/governance/audit-logs/'),
};
