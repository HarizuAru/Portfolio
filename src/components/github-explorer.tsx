'use client';

import React, { useState, useEffect } from 'react';
import { File, FolderOpen, ExternalLink } from 'lucide-react';

interface GithubExplorerProps {
  repoOwner?: string;
  repoName: string;
  files: string[];
  defaultFile: string;
}

// Hardcoded fallback sources for offline rendering or missing repo connections
const LOCAL_FALLBACKS: Record<string, string> = {
  'opticore_sim.py': `import csv
import sys

# OptiCore routing engine factorial simulator
FACTORIAL_MATRIX = [
    {"protocol": "OSPF", "acl": 10, "pps": 10000, "cpu": 5.32},
    {"protocol": "OSPF", "acl": 100, "pps": 50000, "cpu": 35.13},
    {"protocol": "OSPF", "acl": 1000, "pps": 100000, "cpu": 100.00},
    {"protocol": "EIGRP", "acl": 10, "pps": 100000, "cpu": 82.32},
    {"protocol": "EIGRP", "acl": 1000, "pps": 50000, "cpu": 99.99}
]

def run_simulation(protocol, acl, traffic_pps):
    print(f"[INIT] Evaluating {protocol} under {acl} ACL rules...")
    print(f"[LOAD] Processing packet stream: {traffic_pps} PPS")
    # Linear interpolation simulation logic...
    return "Simulation Completed. Logs compiled."

if __name__ == "__main__":
    run_simulation("OSPF", 100, 50000)
`,
  'requirements.txt': `numpy>=1.22.0
pandas>=1.4.0
matplotlib>=3.5.0
scipy>=1.8.0
`,
  'router_performance_results.csv': `protocol,acl,pps,cpu_percent,memory_mb,delay_us,loss_rate
OSPF,10,10000,5.32,80.01,5.34,0.0
OSPF,100,50000,35.13,80.06,8.91,0.0
OSPF,1000,100000,100.0,82.93,47907.77,58.16
EIGRP,10,100000,82.32,40.16,26.94,0.0
EIGRP,1000,50000,99.99,42.93,50580.43,24.865
`
};

export function GithubExplorer({ repoOwner = 'HarizuAru', repoName, files, defaultFile }: GithubExplorerProps) {
  const [selectedFile, setSelectedFile] = useState(defaultFile);
  const [codeContent, setCodeContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCode() {
      setLoading(true);
      
      const rawUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/${selectedFile}`;
      
      try {
        const response = await fetch(rawUrl);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} - File not found on GitHub CDN`);
        }
        const text = await response.text();
        setCodeContent(text);
      } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.warn(`Failed to fetch from GitHub: ${errMsg}. Loading local mock fallback.`);
        // Fallback to local files if network fails or file not found
        if (LOCAL_FALLBACKS[selectedFile]) {
          setCodeContent(LOCAL_FALLBACKS[selectedFile]);
        } else {
          setCodeContent(`// Code sample preview for ${selectedFile}\n\n// Repository: ${repoOwner}/${repoName}\n// File path: /${selectedFile}\n\nfunction initializeWorkspace() {\n  console.log("Mock loader context: Active audit in progress");\n}`);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCode();
  }, [selectedFile, repoOwner, repoName]);

  const rawLines = codeContent.split('\n');

  return (
    <div className="border border-border rounded-xl bg-secondary/10 overflow-hidden shadow-lg">
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-border px-4 py-3 bg-secondary/30">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-primary" />
          <span className="text-xs font-mono font-bold tracking-tight text-foreground">
            {repoOwner}/{repoName}
          </span>
          <span className="text-[10px] font-mono bg-secondary border border-border px-1.5 py-0.5 rounded text-muted">
            main
          </span>
        </div>
        <a 
          href={`https://github.com/${repoOwner}/${repoName}/blob/main/${selectedFile}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[11px] text-muted hover:text-foreground transition-colors font-mono cursor-pointer"
        >
          <span>Open on GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Main body */}
      <div className="grid grid-cols-1 md:grid-cols-4 min-h-[380px]">
        {/* Sidebar File explorer */}
        <div className="border-r border-border md:col-span-1 p-2 space-y-1 bg-secondary/20">
          <div className="text-[9px] font-mono text-muted uppercase tracking-wider px-2.5 mb-2">
            Workspace Files
          </div>
          <div className="space-y-0.5">
            {files.map((file) => {
              const isActive = file === selectedFile;
              return (
                <button
                  key={file}
                  onClick={() => setSelectedFile(file)}
                  className={`w-full text-left flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-secondary text-primary border border-primary/20' 
                      : 'text-muted hover:text-foreground hover:bg-secondary/40 border border-transparent'
                  }`}
                >
                  <File className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{file}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Code viewport */}
        <div className="md:col-span-3 bg-black/40 flex flex-col relative">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/25 backdrop-blur-xs">
              <div className="flex flex-col items-center gap-2">
                <RefreshCw className="w-6 h-6 text-primary animate-spin" />
                <span className="text-[10px] font-mono text-muted">Fetching source code stream...</span>
              </div>
            </div>
          ) : null}

          {/* Code Window */}
          <div className="flex-1 overflow-x-auto p-4 font-mono text-[11px] leading-relaxed text-zinc-300 max-h-[500px] overflow-y-auto scrollbar-thin">
            <pre className="flex">
              {/* Line Numbers */}
              <div className="text-right text-muted-foreground select-none pr-4 border-r border-border/40 mr-4 flex-shrink-0">
                {rawLines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              
              {/* Code text */}
              <code className="text-left select-text whitespace-pre block flex-1">
                {codeContent}
              </code>
            </pre>
          </div>

          {/* Footer status */}
          <div className="flex items-center justify-between border-t border-border/40 px-4 py-2 bg-secondary/15 text-[10px] text-muted-foreground font-mono">
            <span>Encoding: UTF-8</span>
            <span>Lines: {rawLines.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Support SVG/Icon imports
import { RefreshCw } from 'lucide-react';
