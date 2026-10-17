'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [telemetryEvents, setTelemetryEvents] = useState([]);
  const [latestStep, setLatestStep] = useState(null);
  const wsRef = useRef(null);

  useEffect(() => {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || 'ws://127.0.0.1:8000/ws/agents/telemetry/';
    
    let socket;
    try {
      socket = new WebSocket(wsUrl);
      wsRef.current = socket;

      socket.onopen = () => {
        setIsConnected(true);
        console.log('Django Channels WebSocket connected to SalesChamp Telemetry Stream.');
      };

      socket.onmessage = (event) => {
        try {
          const parsed = JSON.parse(event.data);
          if (parsed.type === 'STEP_PROGRESS') {
            setLatestStep(parsed.data);
            setTelemetryEvents((prev) => [parsed.data, ...prev].slice(0, 50));
          } else if (parsed.type === 'CONNECTION_ESTABLISHED') {
            setIsConnected(true);
          }
        } catch (err) {
          console.warn('WS message parse error:', err);
        }
      };

      socket.onclose = () => {
        setIsConnected(false);
      };

      socket.onerror = () => {
        setIsConnected(false);
      };
    } catch (e) {
      setIsConnected(false);
    }

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const sendEvent = (eventData) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(eventData));
    } else {
      console.log('WS not connected; simulating event locally:', eventData);
    }
  };

  return (
    <WebSocketContext.Provider value={{
      isConnected,
      telemetryEvents,
      latestStep,
      sendEvent,
    }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  return useContext(WebSocketContext) || {
    isConnected: false,
    telemetryEvents: [],
    latestStep: null,
    sendEvent: () => {},
  };
}
