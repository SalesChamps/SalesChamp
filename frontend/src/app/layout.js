'use client';

import React, { useState } from 'react';
import './globals.css';
import { AgentProvider } from '@/context/AgentContext';
import { WebSocketProvider } from '@/context/WebSocketContext';
import Sidebar from '@/components/common/Sidebar';
import Header from '@/components/common/Header';
import CommandPalette from '@/components/common/CommandPalette';

export default function RootLayout({ children }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  return (
    <html lang="en">
      <head>
        <title>SalesChamp | Autonomous Multi-Agent Sales Orchestrator</title>
        <meta
          name="description"
          content="AI-Powered Multi-Agent Sales Automation Platform with Salesforce CRM, Microsoft Dynamics 365 Sales, and SAP ERP Integration."
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&family=Plus+Jakarta+Sans:wght@600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-body-md text-on-surface antialiased min-h-screen">
        <AgentProvider>
          <WebSocketProvider>
            <div className="flex min-h-screen">
              <Sidebar onOpenQuickActions={() => setCommandPaletteOpen(true)} />
              <div className="flex-1 min-w-0 pl-sidebar-width flex flex-col min-h-screen">
                <Header onOpenNotifications={() => {}} />
                <main className="flex-1 w-full p-space-xl min-h-[calc(100vh-4rem)]">
                  {children}
                </main>
              </div>
            </div>
            <CommandPalette
              isOpen={commandPaletteOpen}
              onClose={setCommandPaletteOpen}
            />
          </WebSocketProvider>
        </AgentProvider>
      </body>
    </html>
  );
}
