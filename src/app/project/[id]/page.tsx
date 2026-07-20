'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useGlobalContext } from '@/context/global-context';
import { projectsData } from '@/data/projects';
import { 
  OpticoreDemo, ColdChainDemo, ResumeAIDemo, OffensiveSecurityDemo, 
  ServerlessDemo, HarizeonCongentDemo, GridOptimaDemo, OptinetDemo, 
  SensorSyncDemo, TelemetrixDemo 
} from '@/components/interactive-demos';
import { GithubExplorer } from '@/components/github-explorer';
import { 
  ChevronLeft, FileText, ArrowUpRight, 
  Terminal, ShieldCheck, Cpu, Sliders, AlertTriangle, BookOpen 
} from 'lucide-react';
import { GithubIcon } from '@/components/icons';

const SECTIONS_LIST = [
  { id: 'overview', name: 'Overview' },
  { id: 'features', name: 'System Features' },
  { id: 'architecture', name: 'System Architecture' },
  { id: 'demo', name: 'Interactive Simulator' },
  { id: 'decisions', name: 'Architecture Decisions' },
  { id: 'techstack', name: 'Technology Stack' },
  { id: 'security', name: 'Security Review' },
  { id: 'performance', name: 'Performance Telemetry' },
  { id: 'challenges', name: 'Challenges & Solutions' },
  { id: 'lessons', name: 'Lessons Learned' },
  { id: 'roadmap', name: 'System Roadmap' },
  { id: 'github', name: 'Source Explorer' }
];

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectPage({ params }: PageProps) {
  const { recruiterMode } = useGlobalContext();
  const { id } = use(params);
  
  // Find project in database
  const project = projectsData.find((p) => p.id === id);
  if (!project) {
    notFound();
  }

  // Active section tracking state
  const [activeSection, setActiveSection] = useState('overview');

  // Scroll spy mechanism
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 160;
      
      for (const section of SECTIONS_LIST) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSidebarClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.offsetTop - 90;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  // Render matching interactive simulation widget
  const renderDemoWidget = () => {
    switch (project.id) {
      case 'cloudtrail-threat-detection':
        return <OffensiveSecurityDemo />;
      case 'opticore':
        return <OpticoreDemo />;
      case 'cold-chain-logistics':
        return <ColdChainDemo />;
      case 'resumeai':
        return <ResumeAIDemo />;
      case 'serverless-architectures':
        return <ServerlessDemo />;
      case 'offensive-security-tooling':
        return <OffensiveSecurityDemo />;
      case 'harizeon-congent':
        return <HarizeonCongentDemo />;
      case 'gridoptima':
        return <GridOptimaDemo />;
      case 'optinet':
        return <OptinetDemo />;
      case 'sensorsync':
        return <SensorSyncDemo />;
      case 'telemetrix':
        return <TelemetrixDemo />;
      default:
        return (
          <div className="p-5 text-center text-xs text-muted font-mono border border-border rounded-xl bg-secondary/10">
            No interactive widget available for this system configuration.
          </div>
        );
    }
  };

  // Mock workspace file listings for the source code explorer
  const getExplorerFiles = () => {
    switch (project.id) {
      case 'opticore':
        return ['opticore_sim.py', 'requirements.txt', 'router_performance_results.csv'];
      case 'cloudtrail-threat-detection':
        return ['handlers/parser.ts', 'handlers/scorer.ts', 'rules/privilege-escalation.ts'];
      case 'cold-chain-logistics':
        return ['components/TempControl.tsx', 'server/index.js', 'server/routes.js'];
      case 'resumeai':
        return ['app/api/rewrite/route.ts', 'components/Sandbox.tsx', 'utils/parser.ts'];
      default:
        return ['index.ts', 'package.json', 'README.md'];
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative">
      
      {/* Back button */}
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-mono text-muted hover:text-foreground transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>

      {/* Hero Workspace Header */}
      <div className="border border-border rounded-xl bg-secondary/10 p-6 md:p-8 space-y-6 relative overflow-hidden shadow-xl mb-8">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Terminal className="w-48 h-48" />
        </div>
        
        <div className="space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono text-primary border border-primary/20 bg-primary/5 px-2.5 py-0.5 rounded-full uppercase">
              {project.category}
            </span>
            <span className="text-[10px] font-mono border border-border bg-secondary/40 px-2.5 py-0.5 rounded-full text-muted">
              DIFFICULTY: {project.difficulty}
            </span>
            <span className="text-[10px] font-mono border border-border bg-secondary/40 px-2.5 py-0.5 rounded-full text-muted">
              STATUS: {project.status}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {project.title}
          </h1>
          <p className="text-sm md:text-base text-muted max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Action triggers */}
        <div className="flex flex-wrap gap-3 pt-2 relative z-10">
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-border bg-secondary/40 hover:bg-secondary/65 px-4 py-2 rounded-lg text-xs font-mono font-semibold text-foreground transition-colors cursor-pointer"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub Repository</span>
            <ArrowUpRight className="w-3 h-3 text-muted" />
          </a>
          <button 
            onClick={() => {
              const el = document.getElementById('demo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-opacity cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Run Local Simulator</span>
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 border border-border bg-secondary/20 hover:bg-secondary/40 px-4 py-2 rounded-lg text-xs font-mono font-semibold text-muted hover:text-foreground transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download workspace PDF</span>
          </button>
        </div>

        {/* Project Meta grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-border/40 text-xs relative z-10">
          <div>
            <span className="text-[10px] font-mono text-muted block uppercase">Client / Scope</span>
            <span className="font-semibold text-foreground">{project.client}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-muted block uppercase">My Role</span>
            <span className="font-semibold text-foreground">{project.role}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-muted block uppercase">Duration</span>
            <span className="font-semibold text-foreground">{project.duration}</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-muted block uppercase">Completion Date</span>
            <span className="font-semibold text-foreground">{project.completionDate}</span>
          </div>
        </div>
      </div>

      {/* Recruiter Mode project audit banner */}
      {recruiterMode && (
        <div className="border-2 border-primary/40 bg-primary/5 p-5 rounded-xl space-y-4 mb-8">
          <h2 className="text-sm font-bold font-mono tracking-tight text-primary flex items-center gap-2 uppercase">
            <ShieldCheck className="w-5 h-5" /> RECRUITER SYSTEM INTERACTIVE AUDIT
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-secondary/35 p-3 rounded border border-border">
              <span className="font-mono text-primary font-bold block mb-1">Q: Why does this system matter?</span>
              <p className="text-muted text-[11px] leading-relaxed">{project.recruiterQuestions.whyItMatters}</p>
            </div>
            <div className="bg-secondary/35 p-3 rounded border border-border">
              <span className="font-mono text-primary font-bold block mb-1">Q: What business problem is solved?</span>
              <p className="text-muted text-[11px] leading-relaxed">{project.recruiterQuestions.businessProblemSolved}</p>
            </div>
            <div className="bg-secondary/35 p-3 rounded border border-border">
              <span className="font-mono text-primary font-bold block mb-1">Q: Why was this architecture selected?</span>
              <p className="text-muted text-[11px] leading-relaxed">{project.recruiterQuestions.architectureReason}</p>
            </div>
            <div className="bg-secondary/35 p-3 rounded border border-border">
              <span className="font-mono text-primary font-bold block mb-1">Q: What trade-offs were accepted?</span>
              <p className="text-muted text-[11px] leading-relaxed">{project.recruiterQuestions.tradeoffsAccepted}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace split panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sticky Sidebar navigation */}
        <aside className="lg:col-span-3 sticky top-24 hidden lg:block border border-border rounded-xl bg-secondary/15 p-4 space-y-2 select-none">
          <div className="text-[9px] font-mono text-muted uppercase tracking-wider px-2 mb-2">
            System Workspace Sections
          </div>
          <div className="space-y-0.5 font-mono text-xs">
            {SECTIONS_LIST.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={(e) => handleSidebarClick(e, section.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-secondary text-primary font-semibold' 
                      : 'text-muted hover:text-foreground hover:bg-secondary/30'
                  }`}
                >
                  <span className="mr-2 opacity-50">&gt;</span>
                  {section.name}
                </a>
              );
            })}
          </div>
        </aside>

        {/* Right Main documentation pane */}
        <div className="lg:col-span-9 space-y-12 pb-16">
          
          {/* Section: Overview */}
          <section id="overview" className="border border-border rounded-xl bg-secondary/5 p-6 space-y-4">
            <h2 className="text-lg font-bold font-mono text-foreground border-b border-border/40 pb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> 1. SYSTEM OVERVIEW
            </h2>
            <div className="space-y-4 text-xs leading-relaxed text-muted">
              <div>
                <strong className="text-foreground text-xs block mb-1">Executive Summary</strong>
                <p>{project.summary}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <strong className="text-foreground text-xs block mb-1">Business Problem</strong>
                  <p>{project.businessProblem}</p>
                </div>
                <div>
                  <strong className="text-foreground text-xs block mb-1">Business Impact Value</strong>
                  <p>{project.businessValue}</p>
                </div>
              </div>
              <div className="pt-2">
                <strong className="text-foreground text-xs block mb-1">Key Engineering Goals</strong>
                <ul className="list-disc pl-5 space-y-1 mt-1 text-muted">
                  {project.engineeringGoals.map((goal, i) => (
                    <li key={i}>{goal}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2">
                <strong className="text-foreground text-xs block mb-1">My System Responsibilities</strong>
                <ul className="list-disc pl-5 space-y-1 mt-1 text-muted">
                  {project.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Features */}
          <section id="features" className="border border-border rounded-xl bg-secondary/5 p-6 space-y-4">
            <h2 className="text-lg font-bold font-mono text-foreground border-b border-border/40 pb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" /> 2. SYSTEM FEATURES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.features.map((feature, i) => (
                <div key={i} className="border border-border/60 bg-secondary/20 p-4 rounded-lg space-y-2">
                  <div className="flex items-center justify-between border-b border-border/30 pb-1.5">
                    <span className="font-semibold text-xs text-foreground">{feature.title}</span>
                    <span className={`text-[9px] font-mono border px-1.5 py-0.5 rounded-sm uppercase ${
                      feature.complexity === 'High' ? 'text-rose-400 border-rose-500/25 bg-rose-500/5' : 
                      feature.complexity === 'Medium' ? 'text-yellow-400 border-yellow-500/25 bg-yellow-500/5' : 
                      'text-muted border-border bg-secondary/60'
                    }`}>
                      Complexity: {feature.complexity}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted leading-relaxed">{feature.description}</p>
                  <div className="text-[10px] font-mono text-muted-foreground pt-1.5">
                    <span className="text-primary mr-1">Impl:</span>{feature.implementation}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Architecture */}
          <section id="architecture" className="border border-border rounded-xl bg-secondary/5 p-6 space-y-4">
            <h2 className="text-lg font-bold font-mono text-foreground border-b border-border/40 pb-2 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" /> 3. SYSTEM ARCHITECTURE
            </h2>
            <div className="space-y-4 text-xs">
              <p className="text-muted">{project.architecture.description}</p>
              
              {/* Architecture text chart */}
              <div>
                <span className="text-[10px] font-mono text-muted block mb-1.5 uppercase">Topology Vector Diagram</span>
                <pre className="bg-black/60 border border-border p-4 rounded-lg font-mono text-[10px] text-zinc-300 overflow-x-auto whitespace-pre leading-relaxed scrollbar-thin">
                  {project.architecture.textDiagram.trim()}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <span className="text-[10px] font-mono text-muted block mb-1.5 uppercase">Pipeline flow sequences</span>
                  <div className="border-l border-border pl-4 space-y-3 font-mono text-[10px] text-muted">
                    {project.architecture.flowSteps.map((step, idx) => (
                      <div key={idx} className="relative">
                        <span className="absolute -left-[21px] top-0.5 w-1.5 h-1.5 rounded-full bg-primary" />
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-muted block mb-1.5 uppercase">Repo directory structure</span>
                  <pre className="bg-black/40 border border-border p-3.5 rounded-lg font-mono text-[10px] text-zinc-400 overflow-x-auto scrollbar-thin">
                    {project.architecture.folderStructure.trim()}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Interactive Demo */}
          <section id="demo" className="border border-border rounded-xl bg-secondary/5 p-6 space-y-4">
            <h2 className="text-lg font-bold font-mono text-foreground border-b border-border/40 pb-2 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" /> 4. INTERACTIVE SIMULATOR WIDGET
            </h2>
            <p className="text-xs text-muted">
              Run active operations audits utilizing the custom sandbox telemetry receiver widget below.
            </p>
            {renderDemoWidget()}
          </section>

          {/* Section: Architecture Decisions */}
          <section id="decisions" className="border border-border rounded-xl bg-secondary/5 p-6 space-y-4">
            <h2 className="text-lg font-bold font-mono text-foreground border-b border-border/40 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" /> 5. ENGINEERING ARCHITECTURE DECISIONS (ADRs)
            </h2>
            <div className="space-y-6">
              {project.decisions.map((decision, i) => (
                <div key={i} className="border border-border/60 bg-secondary/15 p-4 rounded-lg space-y-3 text-xs">
                  <div>
                    <span className="text-[9px] font-mono text-primary uppercase font-bold block">Decision Profile</span>
                    <strong className="text-foreground text-xs">{decision.problem}</strong>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 text-muted">
                    <div>
                      <span className="text-[9px] font-mono text-muted block uppercase">Context</span>
                      <p className="text-[11px]">{decision.context}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-muted block uppercase">Alternatives Checked</span>
                      <ul className="list-disc pl-4 text-[11px]">
                        {decision.alternatives.map((alt, idx) => (
                          <li key={idx}>{alt}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-muted block uppercase">Selected Decision</span>
                      <p className="text-[11px] font-semibold text-foreground">{decision.decision}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1.5 text-[11px]">
                    <div className="bg-emerald-500/5 border border-emerald-500/10 p-2.5 rounded text-muted">
                      <span className="text-[9px] font-mono text-primary uppercase font-bold block mb-1">Advantages</span>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {decision.advantages.map((adv, idx) => (
                          <li key={idx}>{adv}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-rose-500/5 border border-rose-500/10 p-2.5 rounded text-muted">
                      <span className="text-[9px] font-mono text-rose-400 uppercase font-bold block mb-1">Disadvantages</span>
                      <ul className="list-disc pl-4 space-y-0.5">
                        {decision.disadvantages.map((dis, idx) => (
                          <li key={idx}>{dis}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1.5 text-muted">
                    <div>
                      <span className="text-[9px] font-mono text-muted block uppercase">Trade-off details</span>
                      <p className="text-[11px]">{decision.tradeoffs}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-muted block uppercase">Future Scaling direction</span>
                      <p className="text-[11px]">{decision.futureImprovements}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Tech Stack */}
          <section id="techstack" className="border border-border rounded-xl bg-secondary/5 p-6 space-y-4">
            <h2 className="text-lg font-bold font-mono text-foreground border-b border-border/40 pb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" /> 6. DETAILED TECHNOLOGY STACK
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              {Object.entries(project.techStack).map(([layer, list]) => {
                if (!list || list.length === 0) return null;
                return (
                  <div key={layer} className="bg-secondary/15 border border-border/60 p-3 rounded-lg space-y-1">
                    <span className="text-[9px] font-mono text-primary uppercase tracking-wider block font-bold">
                      {layer}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {list.map((item) => (
                        <span key={item} className="text-[10px] font-mono text-foreground block">
                          • {item}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section: Security Review */}
          <section id="security" className="border border-border rounded-xl bg-secondary/5 p-6 space-y-4">
            <h2 className="text-lg font-bold font-mono text-foreground border-b border-border/40 pb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" /> 7. SECURITY REVIEW & POSTURE
            </h2>
            <div className="space-y-4">
              {project.securityReview.map((item, i) => (
                <div key={i} className="border border-border/50 bg-secondary/15 p-4 rounded-lg space-y-2 text-xs">
                  <div className="font-semibold text-foreground">{item.name}</div>
                  <p className="text-muted leading-relaxed">{item.description}</p>
                  <div className="bg-primary/5 border border-primary/10 p-2.5 rounded text-[11px] text-muted">
                    <span className="font-mono text-primary font-bold uppercase tracking-wider text-[9px] block mb-1">
                      Mitigation Strategy
                    </span>
                    {item.mitigation}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Performance */}
          <section id="performance" className="border border-border rounded-xl bg-secondary/5 p-6 space-y-4">
            <h2 className="text-lg font-bold font-mono text-foreground border-b border-border/40 pb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" /> 8. PERFORMANCE METRICS TELEMETRY
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.performanceMetrics.map((item, i) => (
                <div key={i} className="border border-border/60 bg-secondary/15 p-4 rounded-lg space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-muted uppercase">{item.metric}</span>
                    <span className="font-mono text-primary font-bold">{item.value}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">
                    <span className="font-mono text-muted mr-1">Optim:</span>{item.technique}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Challenges */}
          <section id="challenges" className="border border-border rounded-xl bg-secondary/5 p-6 space-y-4">
            <h2 className="text-lg font-bold font-mono text-foreground border-b border-border/40 pb-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-primary" /> 9. ENGINEERING CHALLENGES & RESOLUTIONS
            </h2>
            <div className="space-y-4 text-xs text-muted leading-relaxed">
              <div className="bg-rose-500/5 border border-rose-500/10 p-4 rounded-lg">
                <span className="text-[9px] font-mono text-rose-400 uppercase font-bold block mb-1">Vulnerability Bottleneck</span>
                <p className="text-foreground font-semibold mb-1">{project.challenges.problem}</p>
                <p className="text-[11px]"><span className="text-rose-400 font-mono mr-1">Root Cause:</span>{project.challenges.cause}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="text-[9px] font-mono text-muted block uppercase mb-1">System Investigation</span>
                  <p>{project.challenges.investigation}</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-muted block uppercase mb-1">Engineering Solution</span>
                  <p className="text-foreground font-medium">{project.challenges.solution}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border/40 pt-3">
                <div>
                  <span className="text-[9px] font-mono text-muted block uppercase mb-1">Trade-offs accepted</span>
                  <p>{project.challenges.tradeoffs}</p>
                </div>
                <div>
                  <span className="text-[9px] font-mono text-muted block uppercase mb-1">Lessons Derived</span>
                  <p>{project.challenges.lessons}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Lessons Learned */}
          <section id="lessons" className="border border-border rounded-xl bg-secondary/5 p-6 space-y-4">
            <h2 className="text-lg font-bold font-mono text-foreground border-b border-border/40 pb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" /> 10. SYSTEM LESSONS LEARNED
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted leading-relaxed">
              <div className="bg-secondary/15 border border-border/60 p-4 rounded-lg space-y-1">
                <span className="text-[9px] font-mono text-primary uppercase font-bold block">Engineering Lessons</span>
                <p>{project.lessonsLearned.engineering}</p>
              </div>
              <div className="bg-secondary/15 border border-border/60 p-4 rounded-lg space-y-1">
                <span className="text-[9px] font-mono text-primary uppercase font-bold block">Architecture Lessons</span>
                <p>{project.lessonsLearned.architecture}</p>
              </div>
              <div className="bg-secondary/15 border border-border/60 p-4 rounded-lg space-y-1">
                <span className="text-[9px] font-mono text-primary uppercase font-bold block">Business Lessons</span>
                <p>{project.lessonsLearned.business}</p>
              </div>
              <div className="bg-secondary/15 border border-border/60 p-4 rounded-lg space-y-1">
                <span className="text-[9px] font-mono text-rose-400 uppercase font-bold block">System Redesign Plans</span>
                <p>{project.lessonsLearned.redesign}</p>
              </div>
            </div>
          </section>

          {/* Section: Roadmap */}
          <section id="roadmap" className="border border-border rounded-xl bg-secondary/5 p-6 space-y-4">
            <h2 className="text-lg font-bold font-mono text-foreground border-b border-border/40 pb-2 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" /> 11. ROADMAP & TECHNICAL DEBT
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-muted">
              {project.roadmap.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Section: GitHub Code Explorer */}
          <section id="github" className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold font-mono text-foreground flex items-center gap-2">
                <Terminal className="w-4.5 h-4.5 text-primary" /> 12. GITHUB SOURCE EXPLORER
              </h2>
              <p className="text-xs text-muted">
                Audit raw repository script configurations directly inside the active terminal workspace.
              </p>
            </div>
            <GithubExplorer 
              repoName={project.id === 'opticore' ? 'OptiCore' : 'Portfolio'}
              files={getExplorerFiles()}
              defaultFile={getExplorerFiles()[0]}
            />
          </section>

          {/* Consulting Section link */}
          <section className="border border-border rounded-xl bg-secondary/15 p-6 text-center space-y-4">
            <span className="text-[10px] font-mono text-primary uppercase font-bold tracking-wider block">Let&apos;s discuss your project</span>
            <h3 className="text-lg font-bold text-foreground max-w-md mx-auto leading-tight">
              Interested in building a secure auto-scaling platform similar to this?
            </h3>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link 
                href="/#contact"
                className="bg-primary text-primary-foreground hover:opacity-90 px-4 py-2 rounded-lg text-xs font-mono font-semibold transition-opacity cursor-pointer animate-pulse"
              >
                Schedule Consultation
              </Link>
              <Link 
                href="/"
                className="border border-border bg-secondary/20 hover:bg-secondary/40 px-4 py-2 rounded-lg text-xs font-mono font-semibold text-muted hover:text-foreground transition-colors cursor-pointer"
              >
                Back to Dashboard
              </Link>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
