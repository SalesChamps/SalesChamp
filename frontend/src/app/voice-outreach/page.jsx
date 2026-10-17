'use client';

import React, { useState, useEffect } from 'react';

export default function VoiceOutreachPage() {
  const [seconds, setSeconds] = useState(1234); // 20:34
  const [activeLang, setActiveLang] = useState('EN-US');
  const [isMuted, setIsMuted] = useState(false);
  const [isWhispering, setIsWhispering] = useState(false);
  const [selectedDay, setSelectedDay] = useState(24);
  const [systemAlert, setSystemAlert] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Email form state
  const [emailSubject, setEmailSubject] = useState('Acme Cloud Logistics - SalesChamp Architecture Blueprint & ERP Specs');
  const [emailBody, setEmailBody] = useState(
    'Hi Marcus,\n\nFollowing our call regarding the Dallas fulfillment center expansion, SalesChamp eliminates the manual quote-to-SAP friction by automating ERP line-item ingestion with sub-200ms latency.\n\nAttached is our technical architecture dossier and 18% enterprise tier pricing structure for Thursday\'s procurement review.\n\nBest regards,\nDavid Vance | SalesChamp Autonomous SDR'
  );
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const secs = (totalSeconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    setSystemAlert(isMuted ? 'Agent unmuted.' : 'Agent microphone muted.');
    setTimeout(() => setSystemAlert(null), 3000);
  };

  const handleWhisperToggle = () => {
    setIsWhispering(!isWhispering);
    setSystemAlert(!isWhispering ? 'Whisper coach channel opened to human rep.' : 'Whisper coach channel closed.');
    setTimeout(() => setSystemAlert(null), 3000);
  };

  const handlePriorityTakeover = () => {
    setSystemAlert('Priority Human Rep Takeover initiated. Transferring SIP trunk in 500ms...');
    setTimeout(() => setSystemAlert(null), 4000);
  };

  const handleDispatchInvite = () => {
    setSystemAlert('Executive calendar invite dispatched to Marcus Vance (Thursday 2:00 PM CST).');
    setTimeout(() => setSystemAlert(null), 3500);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    setIsSendingEmail(true);
    setTimeout(() => {
      setIsSendingEmail(false);
      setShowEmailModal(false);
      setSystemAlert('Follow-up sequence dispatched & logged to Salesforce Opp & Dynamics 365.');
      setTimeout(() => setSystemAlert(null), 4000);
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full">
      {/* System alert notification */}
      {systemAlert && (
        <div className="mb-space-md p-space-sm rounded-xl bg-primary-container text-on-primary-container text-xs font-medium shadow-md flex items-center justify-between transition-all">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-ping"></span>
            <span>{systemAlert}</span>
          </div>
          <button
            onClick={() => setSystemAlert(null)}
            className="text-on-primary-container hover:opacity-80"
            aria-label="Dismiss notification"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Top Floating Telephony Status Banner */}
      <div className="relative overflow-hidden rounded-xl bg-inverse-surface text-inverse-on-surface shadow-xl p-space-lg mb-space-xl">
        <div className="absolute -right-20 -top-24 w-80 h-80 rounded-full bg-primary-container/20 blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-space-md">
          {/* Lead Identity & Call Active Badge */}
          <div className="flex items-center gap-space-lg">
            <div className="relative flex items-center justify-center">
              <span className="absolute inline-flex h-4 w-4 animate-ping rounded-full bg-secondary-container opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-secondary-container"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-space-sm">
                <span className="font-label-xs text-label-xs px-space-sm py-space-2xs rounded-full bg-secondary text-on-secondary uppercase tracking-wider font-semibold">
                  Live Call in Progress
                </span>
                <span className="font-data-mono-lg text-data-mono-lg text-secondary-container font-semibold tracking-tight" id="call-timer">
                  {formatTimer(seconds)}
                </span>
              </div>
              <div className="flex items-center gap-space-sm mt-space-2xs">
                <h2 className="font-headline-md text-headline-md text-surface-container-lowest font-semibold">
                  Marcus Vance
                </h2>
                <span className="font-body-md text-body-md text-surface-container-highest">
                  — VP Supply Chain @ Acme Cloud Logistics
                </span>
              </div>
            </div>
          </div>

          {/* Live Telemetry & Engine Metadata */}
          <div className="flex flex-wrap items-center gap-space-md xl:gap-space-xl">
            <div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-inverse-surface/60 shadow-sm">
              <span className="material-symbols-outlined text-secondary-container text-[18px]">call</span>
              <span className="font-data-mono-md text-data-mono-md text-surface-container-lowest">+1 (312) 849-2910</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-xs text-label-xs text-surface-container-high uppercase">Synthesis Engine</span>
              <span className="font-data-mono-sm text-data-mono-sm text-surface-bright flex items-center gap-space-xs">
                <span>ElevenLabs UL-Latency</span>
                <span className="text-secondary-fixed">· 280ms / 4ms jit</span>
              </span>
            </div>
            <div className="flex items-center gap-space-sm px-space-md py-space-xs rounded-lg bg-surface-container-low/10 shadow-sm">
              <span className="material-symbols-outlined text-secondary-container text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                trending_up
              </span>
              <div className="flex flex-col">
                <span className="font-label-xs text-label-xs text-surface-container-highest">Live Intent Score</span>
                <span className="font-headline-sm text-headline-sm text-surface-container-lowest font-semibold">
                  86<span className="font-body-sm text-body-sm text-surface-container-high">/100 · Positive</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Column Real-time Interaction Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
        {/* COLUMN 1: Persona Engine & Dynamic Objection Tree (lg:col-span-3) */}
        <div className="lg:col-span-3 flex flex-col gap-space-lg">
          {/* Voice Persona Configuration */}
          <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider font-semibold">Active Agent Persona</span>
              <span className="font-label-xs text-label-xs text-primary bg-primary-fixed px-space-sm py-space-2xs rounded-full font-semibold">v4.2 Neural</span>
            </div>

            <div className="flex items-center gap-space-md">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">record_voice_over</span>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-secondary-container shadow-sm border-2 border-white"></div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-headline-sm text-headline-sm text-on-surface truncate">David Vance SDR</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">Warm, Authoritative · Mid-Atlantic</p>
              </div>
            </div>

            {/* Multilingual Toggle Chips */}
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <span className="font-label-xs text-label-xs text-on-surface-variant">Real-time Localization</span>
              <div className="flex items-center gap-space-xs">
                {['EN-US', 'ES', 'DE', 'FR'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveLang(lang)}
                    id={`lang-btn-${lang.toLowerCase()}`}
                    name={`lang-btn-${lang.toLowerCase()}`}
                    className={`px-space-sm py-space-xs rounded-md font-label-xs text-label-xs transition-colors ${
                      activeLang === lang
                        ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                        : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {activeLang === lang ? `Active: ${lang}` : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Pacing & Pause Cadence Controllers */}
            <div className="flex flex-col gap-space-sm pt-space-sm">
              <div className="flex justify-between items-center">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Speech Velocity</span>
                <span className="font-data-mono-sm text-data-mono-sm font-semibold text-primary">1.05x</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full relative">
                <div className="bg-primary h-1.5 rounded-full w-3/5"></div>
              </div>
              <div className="flex justify-between items-center pt-space-2xs">
                <span className="font-body-sm text-body-sm text-on-surface-variant">Response Turn Latency</span>
                <span className="font-data-mono-sm text-data-mono-sm font-semibold text-primary">350ms</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full relative">
                <div className="bg-primary-container h-1.5 rounded-full w-2/5"></div>
              </div>
            </div>
          </div>

          {/* Real-Time Dynamic Objection-Handling Tree */}
          <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col gap-space-md flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-tertiary text-[20px]">account_tree</span>
                <span className="font-label-xs text-label-xs text-on-surface uppercase tracking-wider font-semibold">Live Objection Matrix</span>
              </div>
              <span className="font-data-mono-sm text-data-mono-sm text-tertiary bg-tertiary-fixed px-space-xs py-space-2xs rounded">Node 02/04</span>
            </div>

            {/* Active Trigger Node */}
            <div className="p-space-md rounded-xl bg-primary/5 shadow-sm flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-label-xs text-label-xs text-primary font-semibold uppercase">Active Node</span>
                </div>
                <span className="font-data-mono-sm text-data-mono-sm text-primary">High Confidence 94%</span>
              </div>
              <p className="font-headline-sm text-headline-sm text-on-surface">Budget & Existing CRM Licenses</p>
              <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm text-on-surface-variant font-body-sm text-body-sm mt-space-2xs">
                <span className="text-primary font-semibold">David's Prompted Anchor:</span> "Highlight that SalesChamp does not replace Salesforce, it multiplies CRM ROI via bi-directional agentic execution."
              </div>
            </div>

            {/* Predicted Next Branch */}
            <div className="p-space-md rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[16px]">psychology</span>
                  <span className="font-label-xs text-label-xs text-secondary font-semibold uppercase">Next Predicted Node</span>
                </div>
                <span className="font-data-mono-sm text-data-mono-sm text-secondary">78% Probability</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface font-semibold">Implementation & SAP Downtime</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Prepared response: "Zero downtime zero-code BAPI/OData sync certified directly by SAP Partner Engineering."
              </p>
            </div>

            {/* Fallback Node */}
            <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-on-surface-variant text-[18px]">alt_route</span>
                <div>
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">Competitor Mention</p>
                  <p className="font-label-xs text-label-xs text-on-surface-variant">Outreach.io / Salesloft ERP disparity</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">chevron_right</span>
            </div>
          </div>
        </div>

        {/* COLUMN 2: Live Stream, Dual Waveform & Transcript (lg:col-span-5) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* Audio Waveform Visualizer Module */}
          <div className="rounded-xl bg-inverse-surface text-inverse-on-surface shadow-md p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-md">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
                  <span className="font-label-xs text-label-xs text-surface-container-lowest font-medium uppercase tracking-wider">AI SDR Voice</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed"></span>
                  <span className="font-label-xs text-label-xs text-surface-container-highest font-medium uppercase tracking-wider">M. Vance</span>
                </div>
              </div>
              <div className="flex items-center gap-space-md">
                <span className="font-data-mono-sm text-data-mono-sm text-secondary-container">-12 dB</span>
                <span className="font-data-mono-sm text-data-mono-sm text-tertiary-fixed">-8 dB</span>
              </div>
            </div>

            {/* Oscillating Dual Waveform - Using pure CSS Keyframe animation (NO SMIL <animate> tags) */}
            <div className="h-20 w-full flex items-center justify-center bg-inverse-surface/80 rounded-lg overflow-hidden relative px-space-sm">
              <svg className="w-full h-16 overflow-visible" fill="none" preserveAspectRatio="none" viewBox="0 0 400 64">
                {/* AI Channel Wave (Cyan) with CSS keyframe animation */}
                <path
                  className="css-audio-wave-1"
                  d="M0,32 Q20,12 40,32 T80,32 T120,8 T160,32 T200,48 T240,32 T280,18 T320,32 T360,26 T400,32"
                  stroke="#39b8fd"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                {/* Prospect Channel Wave (Violet/Tertiary) with CSS keyframe animation */}
                <path
                  className="css-audio-wave-2"
                  d="M0,32 Q25,48 50,32 T100,20 T150,44 T200,12 T250,32 T300,50 T350,22 T400,32"
                  stroke="#d0bcff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </svg>
              <div className="absolute bottom-1 right-2 flex items-center gap-space-2xs text-[10px] text-surface-container-high font-data-mono-sm">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary-container"></span> Full Duplex Audio Stream
              </div>
            </div>
          </div>

          {/* Real-Time Dual-Speaker Transcription Feed */}
          <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col flex-1 gap-space-lg">
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">subtitles</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Live Transcription</h3>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant bg-surface-container-high px-space-xs py-space-2xs rounded">Tokens: 642</span>
                <span className="font-label-xs text-label-xs text-secondary-container bg-on-secondary-container px-space-xs py-space-2xs rounded">Audio-Sync'd</span>
              </div>
            </div>

            <div className="flex flex-col gap-space-md overflow-y-auto max-h-[620px] pr-space-xs">
              {/* Turn 1: AI Agent */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-xs text-label-xs font-semibold text-primary uppercase">David (AI SDR)</span>
                    <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">00:15</span>
                  </div>
                  <span className="font-label-xs text-label-xs bg-primary-fixed text-on-primary-fixed px-space-xs py-space-2xs rounded-full">Opening Hook</span>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md">
                  "Hi Marcus, saw your announcement regarding the Dallas fulfillment center expansion. How is your team currently handling the handoff from lead quote to SAP order creation?"
                </div>
              </div>

              {/* Turn 2: Prospect Vance */}
              <div className="flex flex-col gap-space-xs pl-space-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-xs text-label-xs font-semibold text-tertiary uppercase">Marcus Vance</span>
                    <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">00:48</span>
                  </div>
                  <span className="font-label-xs text-label-xs bg-error-container text-on-error-container px-space-xs py-space-2xs rounded-full font-semibold">Frustration / High Pain Point</span>
                </div>
                <div className="p-space-md rounded-xl bg-tertiary-container/10 text-on-surface font-body-md text-body-md">
                  "Honestly, it's a huge friction point. Our reps spend 30% of their day manually re-entering CRM quotes into our SAP GUI."
                </div>
              </div>

              {/* Turn 3: AI Agent */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-xs text-label-xs font-semibold text-primary uppercase">David (AI SDR)</span>
                    <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">01:22</span>
                  </div>
                  <span className="font-label-xs text-label-xs bg-secondary-fixed text-on-secondary-fixed-variant px-space-xs py-space-2xs rounded-full font-semibold">Solution Presentation</span>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md">
                  "That's exactly what SalesChamp eliminates. Our SAP fulfillment agent validates SKU inventory and books the sales order automatically within <span className="font-data-mono-md text-data-mono-md font-semibold text-primary">3.4 seconds</span> of contract sign."
                </div>
              </div>

              {/* Turn 4: Prospect Vance */}
              <div className="flex flex-col gap-space-xs pl-space-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-xs text-label-xs font-semibold text-tertiary uppercase">Marcus Vance</span>
                    <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">02:10</span>
                  </div>
                  <span className="font-label-xs text-label-xs bg-emerald-100 text-emerald-900 px-space-xs py-space-2xs rounded-full font-semibold">Positive / Buying Signal</span>
                </div>
                <div className="p-space-md rounded-xl bg-primary-fixed/20 shadow-sm text-on-surface font-body-md text-body-md">
                  "That sounds compelling. If you can accommodate an <span className="font-semibold text-primary">18% enterprise tier discount</span> for an annual upfront commitment, I can get procurement to review the dossier this Thursday."
                </div>
              </div>

              {/* Live Typing / Processing Bubble */}
              <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low text-on-surface-variant">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <span className="font-data-mono-sm text-data-mono-sm italic">David is parsing deal criteria & formulating procurement terms...</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUMN 3: Live System Actions & Telephony Controls (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* Real-time Extracted System Actions */}
          <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  bolt
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Call Actions Extracted</h3>
              </div>
              <span className="font-label-xs text-label-xs bg-primary-fixed text-primary font-semibold px-space-xs py-space-2xs rounded-full">Auto-Staged</span>
            </div>

            {/* Action Card 1: SAP Quote */}
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary text-[18px]">receipt_long</span>
                  <span className="font-label-xs text-label-xs font-semibold text-secondary uppercase">SAP S/4HANA Order Draft</span>
                </div>
                <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant font-medium">97% Conf.</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface font-medium">
                18% Annual Upfront Enterprise Tier Discount
              </p>
              <p className="font-data-mono-sm text-data-mono-sm text-on-surface-variant">
                Quote ID: <span className="text-on-surface font-semibold">QTE-SAP-98124</span> · Staged in ERP draft queue
              </p>
            </div>

            {/* Action Card 2: Procurement Invite */}
            <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[18px]">event_available</span>
                  <span className="font-label-xs text-label-xs font-semibold text-primary uppercase">Procurement Review</span>
                </div>
                <span className="font-data-mono-sm text-data-mono-sm text-on-surface-variant font-medium">Auto-Drafted</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface font-medium">
                Thursday @ 2:00 PM CST (45 mins)
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Attendees: Marcus Vance, EMEA RevOps Lead, Enterprise Solutions Lead.
              </p>
            </div>
          </div>

          {/* Integrated Meeting Scheduler Widget */}
          <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider font-semibold">Executive Slot Confirmation</span>
              <span className="font-label-xs text-label-xs text-on-surface-variant">Central Standard Time (CST)</span>
            </div>

            {/* Mini Day Matrix */}
            <div className="grid grid-cols-4 gap-space-xs text-center">
              {[
                { day: 'TUE', num: 22 },
                { day: 'WED', num: 23 },
                { day: 'THU', num: 24 },
                { day: 'FRI', num: 25 },
              ].map((item) => (
                <button
                  key={item.num}
                  id={`slot-day-${item.num}`}
                  name={`slot-day-${item.num}`}
                  onClick={() => setSelectedDay(item.num)}
                  className={`p-space-xs rounded-lg flex flex-col cursor-pointer transition-all ${
                    selectedDay === item.num
                      ? 'bg-primary-container text-on-primary-container shadow-md font-bold'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className="font-label-xs text-label-xs">{item.day}</span>
                  <span className="font-headline-sm text-headline-sm">{item.num}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-surface">2:00 PM – 2:45 PM CST</p>
                  <p className="font-label-xs text-label-xs text-on-surface-variant">Procurement Dossier Presentation</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
            </div>

            <button
              onClick={handleDispatchInvite}
              id="dispatch-invite-btn"
              name="dispatch-invite-btn"
              className="w-full py-space-sm px-space-md rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-sm text-body-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-space-xs"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Confirm &amp; Dispatch G-Suite / Outlook Invite</span>
            </button>
          </div>

          {/* Live Telephony & Rep Override Center */}
          <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg flex flex-col gap-space-md">
            <span className="font-label-xs text-label-xs text-on-surface-variant uppercase tracking-wider font-semibold">Telephony Supervision</span>

            {/* Audio Scrub & Whisper Controls */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex justify-between items-center text-on-surface-variant font-data-mono-sm text-data-mono-sm">
                <span>Buffer: 100% (Lossless)</span>
                <span>Live Sync</span>
              </div>
              <div className="w-full bg-surface-container-high h-2 rounded-full relative cursor-pointer overflow-hidden">
                <div className="bg-primary h-2 rounded-full w-4/5"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-space-sm">
              <button
                onClick={handleMuteToggle}
                id="mute-agent-btn"
                name="mute-agent-btn"
                className={`flex items-center justify-center gap-space-xs py-space-sm rounded-lg font-body-sm text-body-sm font-medium transition-colors ${
                  isMuted ? 'bg-error-container text-on-error-container' : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">{isMuted ? 'mic' : 'mic_off'}</span>
                <span>{isMuted ? 'Unmute Agent' : 'Mute Agent'}</span>
              </button>

              <button
                onClick={handleWhisperToggle}
                id="whisper-coach-btn"
                name="whisper-coach-btn"
                className={`flex items-center justify-center gap-space-xs py-space-sm rounded-lg font-body-sm text-body-sm font-medium transition-colors ${
                  isWhispering ? 'bg-primary text-on-primary' : 'bg-surface-container-low hover:bg-surface-container-high text-primary'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
                <span>{isWhispering ? 'Whispering...' : 'Whisper Coach'}</span>
              </button>
            </div>

            {/* High Visibility Intervention & Escalation Buttons */}
            <div className="flex flex-col gap-space-sm pt-space-xs">
              <button
                onClick={handlePriorityTakeover}
                id="human-takeover-btn"
                name="human-takeover-btn"
                className="w-full py-space-md px-space-md rounded-xl bg-error-container hover:bg-error text-on-error-container hover:text-on-error font-headline-sm text-headline-sm transition-colors shadow-md flex items-center justify-center gap-space-sm"
              >
                <span className="material-symbols-outlined text-[22px]">ring_volume</span>
                <span>Transfer to Human Rep (Priority Takeover)</span>
              </button>

              <button
                onClick={() => setShowEmailModal(true)}
                id="trigger-email-followup-btn"
                name="trigger-email-followup-btn"
                className="w-full py-space-sm px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-body-sm text-body-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-space-xs"
              >
                <span className="material-symbols-outlined text-[18px]">call_end</span>
                <span>End Call &amp; Trigger Follow-up Email Sequence</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Omnichannel Follow-Up Sequence Modal with Fully Accessible Form Fields */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl shadow-2xl w-full max-w-xl p-space-xl flex flex-col gap-space-md">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">outgoing_mail</span>
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                  Dispatch Omnichannel Follow-Up Sequence
                </h3>
              </div>
              <button
                onClick={() => setShowEmailModal(false)}
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-full"
                id="close-email-modal-btn"
                name="close-email-modal-btn"
                aria-label="Close modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleSendEmail} className="flex flex-col gap-space-md">
              <div className="flex flex-col gap-1">
                <label htmlFor="followup-recipient-input" className="font-label-xs text-on-surface-variant uppercase font-semibold">
                  Recipient
                </label>
                <input
                  type="email"
                  id="followup-recipient-input"
                  name="followup-recipient-input"
                  readOnly
                  value="marcus.vance@acmecloud.com"
                  className="w-full px-3 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs cursor-not-allowed"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="followup-subject-input" className="font-label-xs text-on-surface-variant uppercase font-semibold">
                  Subject Line
                </label>
                <input
                  type="text"
                  id="followup-subject-input"
                  name="followup-subject-input"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-sm text-xs focus:outline-primary"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="followup-body-textarea" className="font-label-xs text-on-surface-variant uppercase font-semibold">
                  Email Body with Embedded ERP Specs &amp; Calendar Link
                </label>
                <textarea
                  id="followup-body-textarea"
                  name="followup-body-textarea"
                  rows={6}
                  value={emailBody}
                  onChange={(e) => setEmailBody(e.target.value)}
                  className="w-full p-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-surface font-body-sm text-xs leading-relaxed focus:outline-primary"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-space-sm pt-space-xs">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  id="cancel-followup-btn"
                  name="cancel-followup-btn"
                  className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="dispatch-followup-btn"
                  name="dispatch-followup-btn"
                  disabled={isSendingEmail}
                  className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-xs font-bold shadow-sm flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>{isSendingEmail ? 'Dispatching Sequence...' : 'Dispatch Follow-Up Sequence'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
