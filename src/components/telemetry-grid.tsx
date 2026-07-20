'use client';

import React, { useState, useEffect } from 'react';
import { Cpu, Database, Activity, ShieldCheck } from 'lucide-react';
import { useGlobalContext } from '@/context/global-context';

interface MetricCardProps {
  label: string;
  value: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
  indicatorColor?: string;
}

function MetricCard({ label, value, subtext, icon: Icon, indicatorColor = 'bg-primary' }: MetricCardProps) {
  return (
    <div className="border border-border rounded-xl bg-secondary/10 p-4 flex items-center justify-between hover:bg-secondary/20 transition-all duration-200">
      <div className="space-y-1">
        <span className="text-[10px] font-mono text-muted uppercase tracking-wider block">
          {label}
        </span>
        <span className="text-xl font-mono font-bold text-foreground block tracking-tight">
          {value}
        </span>
        <span className="text-[10px] text-muted-foreground block font-mono">
          {subtext}
        </span>
      </div>
      <div className="p-3 rounded-lg border border-border bg-secondary/40 flex-shrink-0 text-foreground relative">
        <Icon className="w-5 h-5" />
        <span className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full ${indicatorColor}`} />
      </div>
    </div>
  );
}

const BASE_LOGS = [
  'GET /api/v1/projects 200 OK - 12ms',
  'GET /api/v1/metrics 200 OK - 8ms',
  'DB_CONN: Active connections: 4/10',
  'CACHE_HIT: Loaded project matrix data in 0.4ms',
  'SEC_CHECK: Scanned IAM context - compliance OK',
  'EVENT_INGEST: CloudTrail telemetry segment queued',
  'HEARTBEAT: Received vehicle tracker check-in signal',
  'ATS_SCANNER: Run summary feedback parser',
  'ROUTER_SIM: Factorial matrix loaded successfully'
];

export function TelemetryGrid() {
  const { recruiterMode } = useGlobalContext();
  const [metrics, setMetrics] = useState({
    cpu: 24.2,
    memory: 4.12,
    queries: 840,
    nodes: 3
  });
  const [logs, setLogs] = useState<string[]>(BASE_LOGS);

  // Fluctuating metric updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => {
        const cpuChange = (Math.random() - 0.5) * 2;
        const memoryChange = (Math.random() - 0.5) * 0.05;
        const queriesChange = Math.floor((Math.random() - 0.5) * 30);
        return {
          cpu: Math.max(10, Math.min(90, Number((prev.cpu + cpuChange).toFixed(1)))),
          memory: Math.max(2, Math.min(16, Number((prev.memory + memoryChange).toFixed(2)))),
          queries: Math.max(200, Math.min(2000, prev.queries + queriesChange)),
          nodes: prev.nodes
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Scrolling system event logs
  useEffect(() => {
    const logInterval = setInterval(() => {
      const randomMsg = BASE_LOGS[Math.floor(Math.random() * BASE_LOGS.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev.slice(1), `[${timestamp}] ${randomMsg}`]);
    }, 4000);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Telemetry CPU Load"
          value={`${metrics.cpu}%`}
          subtext="Central parsing cluster"
          icon={Cpu}
          indicatorColor="bg-emerald-500"
        />
        <MetricCard
          label="RAM Allocated"
          value={`${metrics.memory} GB`}
          subtext="Allocated cache nodes"
          icon={Database}
          indicatorColor="bg-emerald-500"
        />
        <MetricCard
          label="Ingress Queries"
          value={`${metrics.queries} req/s`}
          subtext="Active telemetry sockets"
          icon={Activity}
          indicatorColor="bg-emerald-500"
        />
        <MetricCard
          label="Compliance Status"
          value={recruiterMode ? 'RECRUITER MODE' : 'SECURE'}
          subtext={recruiterMode ? 'Active hiring-manager audit' : 'All systems fully compliant'}
          icon={ShieldCheck}
          indicatorColor={recruiterMode ? 'bg-primary' : 'bg-emerald-500'}
        />
      </div>

      {/* Log Console */}
      <div className="border border-border rounded-xl bg-black/50 p-4 font-mono text-[10px] text-zinc-300 space-y-1 relative overflow-hidden shadow-inner">
        <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-2 text-muted uppercase text-[9px] tracking-wider select-none">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> System Logs Telemetry</span>
          <span>Buffer: ACTIVE</span>
        </div>
        <div className="h-28 overflow-y-auto space-y-0.5 select-text scrollbar-thin">
          {logs.map((log, index) => (
            <div key={index} className="opacity-80">
              <span className="text-primary mr-2">&gt;</span>
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
