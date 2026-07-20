'use client';

import React, { useState, useEffect } from 'react';
import { Play, RefreshCw } from 'lucide-react';

// ==========================================
// 1. OPTICORE SIMULATOR DEMO
// ==========================================
export function OpticoreDemo() {
  const [protocol, setProtocol] = useState<'OSPF' | 'EIGRP'>('OSPF');
  const [acl, setAcl] = useState<10 | 100 | 1000>(10);
  const [preset, setPreset] = useState<number>(10000);
  const [customPps, setCustomPps] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [metrics, setMetrics] = useState({ cpu: 0, mem: 0, delay: 0, loss: 0 });

  const FACTORIAL_DATA = [
    { protocol: 'OSPF', acl: 10, pps: 10000, cpu: 5.32, mem: 80.01, delay: 5.34, loss: 0.0000 },
    { protocol: 'OSPF', acl: 10, pps: 50000, cpu: 26.10, mem: 80.03, delay: 6.13, loss: 0.0000 },
    { protocol: 'OSPF', acl: 10, pps: 100000, cpu: 52.21, mem: 80.08, delay: 8.03, loss: 0.0000 },
    { protocol: 'OSPF', acl: 100, pps: 10000, cpu: 7.17, mem: 80.01, delay: 7.26, loss: 0.0000 },
    { protocol: 'OSPF', acl: 100, pps: 50000, cpu: 35.13, mem: 80.06, delay: 8.91, loss: 0.0000 },
    { protocol: 'OSPF', acl: 100, pps: 100000, cpu: 70.28, mem: 80.17, delay: 15.19, loss: 0.0000 },
    { protocol: 'OSPF', acl: 1000, pps: 10000, cpu: 25.59, mem: 80.05, delay: 29.20, loss: 0.0000 },
    { protocol: 'OSPF', acl: 1000, pps: 50000, cpu: 100.00, mem: 82.93, delay: 43988.38, loss: 16.3276 },
    { protocol: 'OSPF', acl: 1000, pps: 100000, cpu: 100.00, mem: 82.93, delay: 47907.77, loss: 58.1675 },
    { protocol: 'EIGRP', acl: 10, pps: 10000, cpu: 8.39, mem: 40.01, delay: 8.56, loss: 0.0000 },
    { protocol: 'EIGRP', acl: 10, pps: 50000, cpu: 41.16, mem: 40.05, delay: 11.08, loss: 0.0000 },
    { protocol: 'EIGRP', acl: 10, pps: 100000, cpu: 82.32, mem: 40.16, delay: 26.94, loss: 0.0000 }, // EIGRP 10 ACL 100000
    { protocol: 'EIGRP', acl: 100, pps: 10000, cpu: 10.24, mem: 40.01, delay: 10.56, loss: 0.0000 },
    { protocol: 'EIGRP', acl: 100, pps: 50000, cpu: 50.19, mem: 40.08, delay: 15.03, loss: 0.0000 },
    { protocol: 'EIGRP', acl: 100, pps: 100000, cpu: 99.87, mem: 40.75, delay: 2512.26, loss: 0.0000 },
    { protocol: 'EIGRP', acl: 1000, pps: 10000, cpu: 28.66, mem: 40.06, delay: 33.46, loss: 0.0000 },
    { protocol: 'EIGRP', acl: 1000, pps: 50000, cpu: 99.99, mem: 42.93, delay: 50580.43, loss: 24.8650 },
    { protocol: 'EIGRP', acl: 1000, pps: 100000, cpu: 100.00, mem: 42.93, delay: 53551.74, loss: 62.4365 }
  ];

  const runSimulation = () => {
    setIsRunning(true);
    const pps = customPps ? Math.max(1000, Math.min(300000, Number(customPps))) : preset;
    
    setTimeout(() => {
      const rows = FACTORIAL_DATA
        .filter(item => item.protocol === protocol && item.acl === acl)
        .sort((a, b) => a.pps - b.pps);

      if (rows.length === 0) return;
      const lower = rows.reduce((acc, row) => (row.pps <= pps ? row : acc), rows[0]);
      const higher = rows.find(row => row.pps >= pps) || rows[rows.length - 1];

      let resCpu = 0, resMem = 0, resDelay = 0, resLoss = 0;

      if (lower.pps === higher.pps) {
        resCpu = lower.cpu;
        resMem = lower.mem;
        resDelay = lower.delay;
        resLoss = lower.loss;
      } else {
        const ratio = (pps - lower.pps) / (higher.pps - lower.pps);
        const lerp = (a: number, b: number) => a + (b - a) * ratio;
        resCpu = lerp(lower.cpu, higher.cpu);
        resMem = lerp(lower.mem, higher.mem);
        resDelay = lerp(lower.delay, higher.delay);
        resLoss = lerp(lower.loss, higher.loss);
      }

      setMetrics({
        cpu: Math.min(100, resCpu),
        mem: resMem,
        delay: resDelay,
        loss: Math.max(0, resLoss)
      });
      setIsRunning(false);
    }, 600);
  };

  return (
    <div className="border border-border rounded-xl bg-secondary/20 p-5 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5">Routing Protocol</label>
          <select 
            value={protocol} 
            onChange={(e) => setProtocol(e.target.value as 'OSPF' | 'EIGRP')}
            className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
          >
            <option value="OSPF">OSPF (Open Shortest Path First)</option>
            <option value="EIGRP">EIGRP (Enhanced Interior Gateway Routing)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5">ACL Entries count</label>
          <select 
            value={acl} 
            onChange={(e) => setAcl(Number(e.target.value) as 10 | 100 | 1000)}
            className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
          >
            <option value={10}>10 rules (Light filters)</option>
            <option value={100}>100 rules (Medium firewall)</option>
            <option value={1000}>1000 rules (Heavy firewall)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5">Traffic Workload</label>
          <select 
            value={preset} 
            onChange={(e) => {
              setPreset(Number(e.target.value));
              setCustomPps('');
            }}
            disabled={customPps !== ''}
            className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none focus:border-primary disabled:opacity-50"
          >
            <option value={10000}>Low (10,000 PPS)</option>
            <option value={50000}>Medium (50,000 PPS)</option>
            <option value={100000}>High (100,000 PPS)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5">Custom PPS (1k - 300k)</label>
          <input 
            type="number" 
            placeholder="e.g. 75000"
            value={customPps} 
            onChange={(e) => setCustomPps(e.target.value)}
            className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      <button 
        onClick={runSimulation}
        disabled={isRunning}
        className="flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 rounded-lg text-xs font-mono font-semibold cursor-pointer disabled:opacity-50"
      >
        {isRunning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
        Run Experiment Simulation
      </button>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-3 border-t border-border">
        <div className="bg-secondary/40 border border-border/50 rounded-lg p-3">
          <div className="text-[10px] font-mono text-muted mb-1 uppercase">CPU Consumption</div>
          <div className="text-lg font-mono text-primary font-bold">{metrics.cpu > 0 ? metrics.cpu.toFixed(2) : '--'}%</div>
        </div>
        <div className="bg-secondary/40 border border-border/50 rounded-lg p-3">
          <div className="text-[10px] font-mono text-muted mb-1 uppercase">RAM Allocated</div>
          <div className="text-lg font-mono text-primary font-bold">{metrics.mem > 0 ? metrics.mem.toFixed(2) : '--'} MB</div>
        </div>
        <div className="bg-secondary/40 border border-border/50 rounded-lg p-3">
          <div className="text-[10px] font-mono text-muted mb-1 uppercase">Routing Latency</div>
          <div className="text-lg font-mono text-primary font-bold">{metrics.delay > 0 ? metrics.delay.toLocaleString(undefined, { maximumFractionDigits: 2 }) : '--'} µs</div>
        </div>
        <div className="bg-secondary/40 border border-border/50 rounded-lg p-3">
          <div className="text-[10px] font-mono text-muted mb-1 uppercase">Packet Loss Rate</div>
          <div className="text-lg font-mono text-primary font-bold">{metrics.loss > 0 ? metrics.loss.toFixed(4) : '--'}%</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. COLD-CHAIN THERMAL PLATFORM DEMO
// ==========================================
export function ColdChainDemo() {
  const [temp, setTemp] = useState<number>(4);
  const status = temp < 2 || temp > 8 ? 'alert' : 'stable';

  return (
    <div className="border border-border rounded-xl bg-secondary/20 p-5 space-y-4">
      <div>
        <p className="text-xs text-muted mb-4">
          Adjust the thermostat slider below to simulate container cooling state changes. 
          Audits expect temperature to persist strictly between <span className="text-primary font-mono">2°C</span> and <span className="text-primary font-mono">8°C</span>.
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-muted">Thermostat Controller</span>
          <span className={`text-sm font-mono font-bold ${status === 'stable' ? 'text-primary' : 'text-rose-500'}`}>
            {temp}°C
          </span>
        </div>
        <input 
          type="range" 
          min={-10} 
          max={20} 
          value={temp} 
          onChange={(e) => setTemp(Number(e.target.value))}
          className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" 
        />
      </div>

      <div className="flex items-center gap-3 p-3.5 rounded-lg border border-border bg-secondary/30">
        <div className={`w-3.5 h-3.5 rounded-full flex-shrink-0 ${
          status === 'stable' ? 'bg-primary shadow-[0_0_8px_rgba(0,255,136,0.6)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]'
        }`} />
        <div className="flex-1">
          <div className="text-xs font-bold font-mono uppercase tracking-wide">
            System State: {status === 'stable' ? 'Stable (Compliant)' : 'ALERT (Critical)'}
          </div>
          <div className="text-[10px] text-muted">
            {status === 'stable' 
              ? 'Container temperature conforms to active pharmaceutical standards.' 
              : 'SMS warnings triggered: alerting dispatcher fleet and supervisor.'
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. RESUMEAI ATS OPTIMIZER DEMO
// ==========================================
export function ResumeAIDemo() {
  const [summary, setSummary] = useState('');
  const [keywords, setKeywords] = useState('cloud security, aws, incident response');
  const [score, setScore] = useState<number | null>(null);
  const [verdict, setVerdict] = useState('');

  const analyzeSummary = () => {
    const text = summary.trim().toLowerCase();
    const keys = keywords.split(',').map(v => v.trim().toLowerCase()).filter(Boolean);

    if (!text) {
      setScore(0);
      setVerdict('Input Professional Summary to run analytics.');
      return;
    }

    let calculated = 45;
    const impactWords = ['improved', 'reduced', 'increased', 'optimized', 'secured', 'scaled', '%', 'x'];
    
    impactWords.forEach(word => {
      if (text.includes(word)) calculated += 4;
    });

    keys.forEach(key => {
      if (text.includes(key)) calculated += 5;
    });

    const finalScore = Math.min(100, calculated);
    setScore(finalScore);

    if (finalScore >= 80) {
      setVerdict('High Recruiter Fit: Contains rich metric-focused action verbs and target keywords.');
    } else if (finalScore >= 60) {
      setVerdict('Moderate Fit: Good structural start, but could benefit from stronger metric impact language.');
    } else {
      setVerdict('Weak Structure: Lacks key target keywords and metric verbs (e.g. secure, improve, scale, %).');
    }
  };

  return (
    <div className="border border-border rounded-xl bg-secondary/20 p-5 space-y-4">
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5">Candidate Professional Summary</label>
          <textarea 
            rows={3} 
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="e.g. Experienced systems engineer building secure applications and managing AWS configurations."
            className="w-full bg-secondary/50 border border-border rounded-lg p-2.5 text-xs text-foreground outline-none focus:border-primary resize-none placeholder:text-muted/60"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5">Target Role Keywords (comma-separated)</label>
          <input 
            type="text" 
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g. cloud security, aws, incident response"
            className="w-full bg-secondary/50 border border-border rounded-lg px-2.5 py-2 text-xs text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      <button 
        onClick={analyzeSummary}
        className="bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 rounded-lg text-xs font-mono font-semibold cursor-pointer"
      >
        Analyze Summary
      </button>

      {score !== null && (
        <div className="p-3.5 rounded-lg border border-border bg-secondary/30 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold font-mono">ATS Scoring Audit</span>
            <span className={`text-sm font-mono font-bold ${score >= 80 ? 'text-primary' : score >= 60 ? 'text-yellow-500' : 'text-rose-500'}`}>
              {score}/100
            </span>
          </div>
          <div className="text-[10px] text-muted leading-relaxed">{verdict}</div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. OFFENSIVE SECURITY TERM SIMULATOR
// ==========================================
export function OffensiveSecurityDemo() {
  const [logs, setLogs] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  const auditSequence = [
    '[INIT] Establishing secure credentials context...',
    '[INIT] Connecting to organizational IAM directories...',
    '[SCAN] Querying configuration patterns: active credentials keys...',
    '[SCAN] CHECK: identifying stale access credentials (>90 days)...',
    '[WARN] Detected exposed credential profile key on dev account (Role: DevSandbox).',
    '[SCAN] CHECK: mapping administrative policies attached directly to accounts...',
    '[WARN] Detected inline administrator permissions on service bucket user (User: opti-bucket).',
    '[ANALYZE] Mapping network path exploits between dev nodes and VPC assets...',
    '[ANALYZE] Simulation: analyzing social phishing campaigns configurations...',
    '[REPORT] Complete: High-risk vulnerabilities: 2 | Medium: 4 | Low: 7',
    '[STATUS] Compliance status: FAIL. Remediation recommendations pushed to dashboards.'
  ];

  const runAudit = () => {
    if (isScanning) return;
    setIsScanning(true);
    setLogs([]);

    auditSequence.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
        if (index === auditSequence.length - 1) {
          setIsScanning(false);
        }
      }, index * 600);
    });
  };

  return (
    <div className="border border-border rounded-xl bg-secondary/20 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono text-muted">Controlled IAM Audit Pipeline</span>
        <button 
          onClick={runAudit}
          disabled={isScanning}
          className="flex items-center gap-1.5 bg-primary text-primary-foreground hover:opacity-90 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold cursor-pointer disabled:opacity-50"
        >
          {isScanning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
          Run Audit Sequence
        </button>
      </div>

      <div className="bg-black/60 border border-border rounded-lg p-3 h-44 overflow-y-auto font-mono text-[10px] text-zinc-300 space-y-1 scrollbar-thin">
        {logs.length === 0 ? (
          <div className="text-muted text-center pt-14">Click Run Audit to start security scanning logs.</div>
        ) : (
          logs.map((log, index) => (
            <div 
              key={index} 
              className={log.startsWith('[WARN]') ? 'text-rose-400' : log.startsWith('[STATUS]') ? 'text-primary font-bold' : 'text-zinc-300'}
            >
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// ==========================================
// 5. SERVERLESS AUTO-SCALING SIMULATOR
// ==========================================
export function ServerlessDemo() {
  const [requests, setRequests] = useState(120);

  // Compute concurrent instances required (assuming ~60 concurrent requests per instance)
  const instances = Math.max(1, Math.ceil(requests / 60));
  const cpuLoad = Math.min(100, Math.round((requests / 2000) * 100));

  return (
    <div className="border border-border rounded-xl bg-secondary/20 p-5 space-y-4">
      <div>
        <p className="text-xs text-muted mb-4">
          Adjust concurrent HTTP request volumes below to monitor serverless scale behaviors.
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-muted">Concurrent HTTP Inbound</span>
          <span className="text-sm font-mono font-bold text-primary">
            {requests.toLocaleString()} Requests/sec
          </span>
        </div>
        <input 
          type="range" 
          min={20} 
          max={2000} 
          value={requests} 
          onChange={(e) => setRequests(Number(e.target.value))}
          className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/40 border border-border/50 rounded-lg p-3 text-center">
          <div className="text-[10px] font-mono text-muted mb-1">Compute instances</div>
          <div className="text-lg font-mono text-primary font-bold">{instances} Functions</div>
        </div>
        <div className="bg-secondary/40 border border-border/50 rounded-lg p-3 text-center">
          <div className="text-[10px] font-mono text-muted mb-1">Capacity Load</div>
          <div className="text-lg font-mono text-primary font-bold">{cpuLoad}%</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 6. HARIZEON CONGENT AGENTS DISPATCHER
// ==========================================
export function HarizeonCongentDemo() {
  const [agents, setAgents] = useState(3);
  const [queue, setQueue] = useState(7);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatchTask = () => {
    setIsProcessing(true);
    setQueue(prev => prev + 1);

    setTimeout(() => {
      // Simulate task processing update
      const active = 3 + Math.floor(Math.random() * 4);
      const pending = Math.max(0, Math.floor(Math.random() * 10));
      setAgents(active);
      setQueue(pending);
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="border border-border rounded-xl bg-secondary/20 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">
          Dispatch tasks dynamically across synchronized hardware node networks.
        </p>
        <button 
          onClick={dispatchTask}
          disabled={isProcessing}
          className="flex items-center gap-1 bg-primary text-primary-foreground hover:opacity-90 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold cursor-pointer disabled:opacity-50"
        >
          <Play className="w-3.5 h-3.5" />
          Dispatch Task
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-secondary/40 border border-border/50 rounded-lg p-3 text-center">
          <div className="text-[10px] font-mono text-muted mb-1">Active Device Nodes</div>
          <div className="text-lg font-mono text-primary font-bold">{agents} Nodes</div>
        </div>
        <div className="bg-secondary/40 border border-border/50 rounded-lg p-3 text-center">
          <div className="text-[10px] font-mono text-muted mb-1">Queue Pending Length</div>
          <div className="text-lg font-mono text-primary font-bold">{queue} Jobs</div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. GRIDOPTIMA TOPOLOGY CALCULATOR
// ==========================================
export function GridOptimaDemo() {
  const [nodes, setNodes] = useState(32);
  const [connections, setConnections] = useState(64);
  const [score, setScore] = useState<number | null>(null);

  const calculate = () => {
    const n = Math.max(1, nodes);
    const e = Math.max(1, connections);
    const ratio = e / n;
    const finalScore = Math.max(0, Math.min(100, Math.round((ratio / 4) * 100)));
    setScore(finalScore);
  };

  return (
    <div className="border border-border rounded-xl bg-secondary/20 p-5 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5">Nodes count</label>
          <input 
            type="number" 
            value={nodes} 
            onChange={(e) => setNodes(Number(e.target.value))}
            className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5">Connections count</label>
          <input 
            type="number" 
            value={connections} 
            onChange={(e) => setConnections(Number(e.target.value))}
            className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      <button 
        onClick={calculate}
        className="bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 rounded-lg text-xs font-mono font-semibold cursor-pointer"
      >
        Calculate Topology Efficiency
      </button>

      {score !== null && (
        <div className="p-3.5 rounded-lg border border-border bg-secondary/30">
          <div className="text-xs font-mono text-muted">
            Computed Structure rating: <span className="text-primary font-bold">{score}/100</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 8. OPTINET NETWORK TESTER
// ==========================================
export function OptinetDemo() {
  const [stats, setStats] = useState<{ latency: number; loss: string; jitter: string } | null>(null);

  const simulate = () => {
    setStats({
      latency: 10 + Math.floor(Math.random() * 120),
      loss: (Math.random() * 4).toFixed(2),
      jitter: (Math.random() * 12).toFixed(2)
    });
  };

  return (
    <div className="border border-border rounded-xl bg-secondary/20 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">Trigger network simulation pipeline to audit telemetry metrics.</p>
        <button 
          onClick={simulate}
          className="bg-primary text-primary-foreground hover:opacity-90 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold cursor-pointer"
        >
          Simulate Packet Flows
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-3 gap-3 pt-2">
          <div className="bg-secondary/40 border border-border/50 rounded-lg p-2.5 text-center">
            <div className="text-[10px] font-mono text-muted mb-0.5">Latency</div>
            <div className="text-xs font-mono text-primary font-bold">{stats.latency} ms</div>
          </div>
          <div className="bg-secondary/40 border border-border/50 rounded-lg p-2.5 text-center">
            <div className="text-[10px] font-mono text-muted mb-0.5">Packet Loss</div>
            <div className="text-xs font-mono text-primary font-bold">{stats.loss}%</div>
          </div>
          <div className="bg-secondary/40 border border-border/50 rounded-lg p-2.5 text-center">
            <div className="text-[10px] font-mono text-muted mb-0.5">Jitter</div>
            <div className="text-xs font-mono text-primary font-bold">{stats.jitter} ms</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 9. SENSORSYNC CALIBRATOR
// ==========================================
export function SensorSyncDemo() {
  const [valA, setValA] = useState(42);
  const [valB, setValB] = useState(47);
  const [results, setResults] = useState<{ merged: string; drift: string } | null>(null);

  const calibrate = () => {
    const merged = ((valA + valB) / 2).toFixed(2);
    const drift = Math.abs(valA - valB).toFixed(2);
    setResults({ merged, drift });
  };

  return (
    <div className="border border-border rounded-xl bg-secondary/20 p-5 space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5">Sensor Node A</label>
          <input 
            type="number" 
            value={valA} 
            onChange={(e) => setValA(Number(e.target.value))}
            className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5">Sensor Node B</label>
          <input 
            type="number" 
            value={valB} 
            onChange={(e) => setValB(Number(e.target.value))}
            className="w-full bg-secondary/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground outline-none focus:border-primary"
          />
        </div>
      </div>

      <button 
        onClick={calibrate}
        className="bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 rounded-lg text-xs font-mono font-semibold cursor-pointer"
      >
        Sync & Calibrate Sensors
      </button>

      {results && (
        <div className="p-3.5 rounded-lg border border-border bg-secondary/30 space-y-1">
          <div className="text-xs font-mono text-muted">
            Merged value: <span className="text-primary font-bold">{results.merged}</span>
          </div>
          <div className="text-xs font-mono text-muted">
            Drift correction factor: <span className="text-primary font-bold">{results.drift}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 10. TELEMETRIX CHART STREAMER
// ==========================================
export function TelemetrixDemo() {
  const [chartBars, setChartBars] = useState<number[]>(() => {
    const barsList: number[] = [];
    for (let i = 0; i < 20; i++) {
      barsList.push(20 + Math.floor(Math.random() * 120));
    }
    return barsList;
  });

  const refreshStream = () => {
    const barsList: number[] = [];
    for (let i = 0; i < 20; i++) {
      barsList.push(20 + Math.floor(Math.random() * 120));
    }
    setChartBars(barsList);
  };

  useEffect(() => {
    // Initialized in state constructor
  }, []);

  return (
    <div className="border border-border rounded-xl bg-secondary/20 p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">Click refresh to simulate active telemetry chart updates.</p>
        <button 
          onClick={refreshStream}
          className="bg-primary text-primary-foreground hover:opacity-90 px-3.5 py-1.5 rounded-lg text-xs font-mono font-semibold cursor-pointer"
        >
          Refresh Streams
        </button>
      </div>

      <div className="h-44 p-4 border border-border rounded-lg bg-black/40 flex items-end gap-2 overflow-x-auto">
        {chartBars.map((height, idx) => (
          <div 
            key={idx} 
            style={{ height: `${height}px` }} 
            className="flex-1 min-w-[12px] bg-primary rounded-t shadow-[0_0_8px_rgba(0,255,136,0.3)] transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
}
