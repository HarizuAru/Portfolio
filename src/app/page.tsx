'use client';

import React from 'react';
import Link from 'next/link';
import { useGlobalContext } from '@/context/global-context';
import { TelemetryGrid } from '@/components/telemetry-grid';
import { ProjectTable } from '@/components/project-table';
import { projectsData } from '@/data/projects';
import { 
  ArrowRight, ShieldCheck, Mail, Briefcase 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { motion } from 'framer-motion';

export default function Home() {
  const { recruiterMode, setRecruiterMode } = useGlobalContext();

  // Filter 4 main flagship projects for the grid display
  const flagships = projectsData.filter(p => 
    ['cloudtrail-threat-detection', 'opticore', 'cold-chain-logistics', 'resumeai'].includes(p.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-6 md:pt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            Active Portfolio Dashboard
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-none text-foreground">
            Engineering secure, scalable platforms that <span className="term-green">perform.</span>
          </h1>
          <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
            I am <strong className="text-foreground font-semibold">Hariz Iskandar</strong>, a developer specializing in cloud security pipelines, machine learning systems, and full-stack software architecture. This platform is designed as an interactive audit vault rather than a static resume.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-xs font-mono font-semibold hover:opacity-90 transition-all cursor-pointer"
            >
              <span>Audit System Database</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setRecruiterMode(!recruiterMode)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono font-semibold border transition-all cursor-pointer ${
                recruiterMode 
                  ? 'bg-primary/10 border-primary text-primary' 
                  : 'bg-secondary/40 border-border text-muted hover:text-foreground hover:bg-secondary/60'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>{recruiterMode ? 'System Audit active' : 'Run Recruiter Audit'}</span>
            </button>
          </div>
        </div>

        {/* Aside Building Status */}
        <div className="lg:col-span-4 border border-border rounded-xl bg-secondary/10 p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-border/40 pb-2">
            <span className="text-[10px] font-mono text-muted uppercase tracking-wider">Now Deploying</span>
            <span className="text-[9px] font-mono text-primary border border-primary/20 px-1.5 py-0.5 rounded bg-primary/5">ACTIVE</span>
          </div>
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3 text-xs">
              <div>
                <span className="font-semibold block text-foreground">CloudTrail Ingress</span>
                <span className="text-[10px] text-muted font-mono">Event pipeline & triage</span>
              </div>
              <span className="font-mono text-muted">98%</span>
            </div>
            <div className="flex items-start justify-between gap-3 text-xs">
              <div>
                <span className="font-semibold block text-foreground">ResumeAI Sandbox</span>
                <span className="text-[10px] text-muted font-mono">Prompt design models</span>
              </div>
              <span className="font-mono text-muted">100%</span>
            </div>
            <div className="flex items-start justify-between gap-3 text-xs">
              <div>
                <span className="font-semibold block text-foreground">OptiCore Routing</span>
                <span className="text-[10px] text-muted font-mono">OSPF/EIGRP math simulator</span>
              </div>
              <span className="font-mono text-muted">100%</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. RECRUITER MODE SYSTEM CHECKLIST */}
      {recruiterMode && (
        <motion.section 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border-2 border-primary/40 rounded-xl bg-primary/5 p-6 space-y-5 relative"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-mono tracking-tight text-primary flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> RECRUITER SYSTEM AUDIT INDEX
            </h2>
            <button 
              onClick={() => setRecruiterMode(false)}
              className="text-xs font-mono text-muted hover:text-foreground cursor-pointer"
            >
              [Deactivate Audit]
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-foreground/90">
            <div className="space-y-4">
              <div className="bg-secondary/20 p-3 rounded-lg border border-border">
                <span className="font-mono text-primary font-bold block mb-1">✔ Why should this convince a hiring manager?</span>
                <p className="text-muted text-[11px]">Each system does not just show working code; it details architecture decisions, telemetry metrics, security mitigations, and performance targets designed under strict industry constraints.</p>
              </div>
              <div className="bg-secondary/20 p-3 rounded-lg border border-border">
                <span className="font-mono text-primary font-bold block mb-1">✔ What business problem is solved?</span>
                <p className="text-muted text-[11px]">I target core bottlenecks: slow incident containment (CloudTrail), perishable inventory losses (Cold-Chain), candidate filtering (ResumeAI), and infrastructure layout validation (OptiCore).</p>
              </div>
              <div className="bg-secondary/20 p-3 rounded-lg border border-border">
                <span className="font-mono text-primary font-bold block mb-1">✔ How is security implemented?</span>
                <p className="text-muted text-[11px]">Security is native. I apply least-privilege IAM policies, encrypted S3 storage buckets, input validators, local TLS certificates, and PII filters across pipelines.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-secondary/20 p-3 rounded-lg border border-border">
                <span className="font-mono text-primary font-bold block mb-1">✔ What trade-offs were accepted?</span>
                <p className="text-muted text-[11px]">I document real trade-offs: choosing serverless S3 triggers with cold start overhead to save 85% cluster idle costs, or adding latency-based client filtering to protect API keys.</p>
              </div>
              <div className="bg-secondary/20 p-3 rounded-lg border border-border">
                <span className="font-mono text-primary font-bold block mb-1">✔ How does it scale?</span>
                <p className="text-muted text-[11px]">Scaling is handled via event-driven queues, partitioned key stores, concurrency limits, and offline linear interpolation modules to keep server load flat.</p>
              </div>
              <div className="bg-secondary/20 p-3 rounded-lg border border-border">
                <span className="font-mono text-primary font-bold block mb-1">✔ Why Next.js 15, React 19 & TypeScript?</span>
                <p className="text-muted text-[11px]">TypeScript catches type errors at build, and Next.js server actions separate user views from protected database resources safely.</p>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* 3. SYSTEM TELEMETRY LOGGER */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-mono text-muted uppercase tracking-wider">Live System Telemetry</h2>
          <span className="text-[10px] text-muted font-mono">socket_ping: 4ms</span>
        </div>
        <TelemetryGrid />
      </section>

      {/* 4. PERSONAL BRAND */}
      <section id="about" className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-8 border-t border-border">
        <div className="md:col-span-4 space-y-3">
          <h2 className="text-xl font-bold font-mono tracking-tight text-foreground">
            Personal Brand
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            I approach software engineering with a product-driven design system: simplicity, absolute reliability, and performance tracking at every layer.
          </p>
        </div>
        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-secondary/10 border border-border rounded-xl p-4 space-y-2">
            <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">Mission</span>
            <p className="text-[11px] text-muted leading-relaxed">Build secure-by-default applications that scale without sacrificing dev experiences.</p>
          </div>
          <div className="bg-secondary/10 border border-border rounded-xl p-4 space-y-2">
            <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">Current Focus</span>
            <p className="text-[11px] text-muted leading-relaxed">Cloud threat engines, AI pipeline orchestrators, and responsive dashboard design.</p>
          </div>
          <div className="bg-secondary/10 border border-border rounded-xl p-4 space-y-2">
            <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">Values</span>
            <p className="text-[11px] text-muted leading-relaxed">Total code ownership, robust documentation, and practical optimization metrics.</p>
          </div>
        </div>
      </section>

      {/* 5. FLAGSHIP PROJECTS SHOWCASE (GRID VIEW) */}
      <section id="projects" className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
              Flagship Project Architectures
            </h2>
            <p className="text-xs text-muted">
              Select a system file to open its full-screen notion-like engineering workspace.
            </p>
          </div>
          <div className="text-[10px] font-mono text-muted uppercase">
            [Click to audit metrics]
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flagships.map((project) => (
            <Link 
              key={project.id}
              href={`/project/${project.id}`}
              className="block border border-border rounded-xl bg-secondary/10 overflow-hidden hover-lift group cursor-pointer"
            >
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">
                    {project.category} {" / "} {project.status}
                  </span>
                  <span className="text-[10px] font-mono text-muted">
                    {project.completionDate}
                  </span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-muted line-clamp-2">
                    {project.summary}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span 
                      key={tag}
                      className="text-[9px] font-mono border border-border bg-secondary/40 px-2 py-0.5 rounded-full text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. PROJECTS SEARCH DATABASE (TABLE VIEW) */}
      <section className="space-y-4 pt-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold font-mono tracking-tight text-foreground">
            Systems Database Directory
          </h2>
          <p className="text-xs text-muted">
            Audit our full engineering record sheet containing both flagships and utility micro-demos.
          </p>
        </div>
        <ProjectTable projects={projectsData} />
      </section>

      {/* 7. ENGINEERING PROCESS & TIMELINE */}
      <section id="expertise" className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-border">
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-xl font-bold font-mono tracking-tight text-foreground">
            Technical Expertise
          </h2>
          <p className="text-xs text-muted leading-relaxed">
            I maintain technical depth across cloud security boundaries, distributed network simulation frameworks, and full-stack software delivery.
          </p>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-1">
              <span className="text-muted">Cloud & Infra:</span>
              <span className="text-foreground">AWS, Azure, S3, IAM, Terraform</span>
            </div>
            <div className="flex items-center justify-between border-b border-border/40 pb-1">
              <span className="text-muted">Security:</span>
              <span className="text-foreground">KMS encryption, Threat logs, Kali</span>
            </div>
            <div className="flex items-center justify-between border-b border-border/40 pb-1">
              <span className="text-muted">Full-Stack:</span>
              <span className="text-foreground">Node.js, Express, React, TypeScript</span>
            </div>
            <div className="flex items-center justify-between border-b border-border/40 pb-1">
              <span className="text-muted">Systems:</span>
              <span className="text-foreground">Rust, Tauri, Python simulators</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div id="timeline" className="lg:col-span-8 space-y-4">
          <h2 className="text-xl font-bold font-mono tracking-tight text-foreground px-2">
            Ownership Timeline
          </h2>
          <div className="border-l border-border ml-4 pl-6 space-y-6">
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/10" />
              <div className="text-[10px] font-mono text-primary mb-1">EDUCATION & FOUNDATIONS</div>
              <strong className="text-xs block text-foreground">Diploma in Computer Science & UiTM Part-Time Bachelor&apos;s Degree</strong>
              <p className="text-xs text-muted mt-1">Established core foundations in networking protocols, discrete structures, and assembly scripting, driving practical development projects in parallel.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/10" />
              <div className="text-[10px] font-mono text-primary mb-1">CLOUD SECURITY SOLUTIONS</div>
              <strong className="text-xs block text-foreground">Threat Logging & Auto-Scaling Serverless Platforms</strong>
              <p className="text-xs text-muted mt-1">Engineered serverless pipelines normalizing CloudTrail events, deploying encrypted log storage vaults, and designing auto-scaling API models.</p>
            </div>
            <div className="relative">
              <span className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-primary/10" />
              <div className="text-[10px] font-mono text-primary mb-1">AI WORKFLOWS & COORDINATION</div>
              <strong className="text-xs block text-foreground">ResumeAI Optimizer & Harizeon Congent Distributed Agent Sync</strong>
              <p className="text-xs text-muted mt-1">Explored AI agent orchestration models in Rust/Tauri, secure PII scrubbing middleware, and candidate evaluation dashboards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CONSULTING MODE & CONTACT FORM */}
      <section id="contact" className="border border-border rounded-xl bg-secondary/15 p-6 sm:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider">Consulting Mode</span>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Interested in building something similar?
            </h2>
            <p className="text-xs text-muted leading-relaxed">
              I consult on cloud security audits, automated AI prompt systems, network simulators, and high-end frontend dashboard architectures. Let&apos;s align on your system goals.
            </p>
            
            <div className="flex flex-col gap-2 font-mono text-xs text-muted">
              <a href="mailto:contact@harizeon.com" className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer">
                <Mail className="w-4 h-4" /> contact@harizeon.com
              </a>
              <a href="https://github.com/HarizuAru" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer">
                <GithubIcon className="w-4 h-4" /> github.com/HarizuAru
              </a>
              <span className="flex items-center gap-2">
                <LinkedinIcon className="w-4 h-4" /> linkedin.com/in/hariz-iskandar
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-secondary/20 border border-border p-5 rounded-lg">
            <form onSubmit={(e) => { e.preventDefault(); alert('Telemetry notification: Contact form response mocked. Connecting parameters successfully.'); }} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-muted mb-1">Full Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Jane Doe"
                    className="w-full bg-secondary/60 border border-border rounded-lg px-3 py-2.5 text-foreground outline-none focus:border-primary placeholder:text-muted/50"
                  />
                </div>
                <div>
                  <label className="block font-mono text-muted mb-1">Professional Email</label>
                  <input 
                    type="email" 
                    required 
                    placeholder="jane@company.com"
                    className="w-full bg-secondary/60 border border-border rounded-lg px-3 py-2.5 text-foreground outline-none focus:border-primary placeholder:text-muted/50"
                  />
                </div>
              </div>
              <div>
                <label className="block font-mono text-muted mb-1">Project Details & Target SLA</label>
                <textarea 
                  rows={4} 
                  required 
                  placeholder="Summarize your architecture requirements, timeline constraints, and database scale..."
                  className="w-full bg-secondary/60 border border-border rounded-lg p-2.5 text-foreground outline-none focus:border-primary resize-none placeholder:text-muted/50"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:opacity-90 py-2.5 rounded-lg font-mono font-bold tracking-tight cursor-pointer"
              >
                Schedule Consultation
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}
