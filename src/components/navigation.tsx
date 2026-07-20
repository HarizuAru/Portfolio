'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobalContext } from '@/context/global-context';
import { Sun, Moon, Search, Briefcase } from 'lucide-react';

export function Navigation() {
  const { theme, toggleTheme, recruiterMode, setRecruiterMode, setCommandPaletteOpen } = useGlobalContext();
  const [scrollProgress, setScrollProgress] = useState(0);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-primary z-[100] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="sticky top-0 w-full z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/" className="font-mono text-lg font-bold tracking-tight text-foreground hover:opacity-85">
                &lt;HI<span className="text-primary font-bold">/</span>&gt;
              </Link>
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-border bg-secondary/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-muted">system.online</span>
              </div>
            </div>

            {/* Nav Links */}
            {isHome && (
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a
                  href="#about"
                  onClick={(e) => handleNavClick(e, 'about')}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  About
                </a>
                <a
                  href="#projects"
                  onClick={(e) => handleNavClick(e, 'projects')}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  Database
                </a>
                <a
                  href="#expertise"
                  onClick={(e) => handleNavClick(e, 'expertise')}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  Expertise
                </a>
                <a
                  href="#timeline"
                  onClick={(e) => handleNavClick(e, 'timeline')}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  Timeline
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, 'contact')}
                  className="text-muted hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </nav>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Recruiter Mode Toggle */}
              <button
                onClick={() => setRecruiterMode(!recruiterMode)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all duration-200 ${
                  recruiterMode
                    ? 'bg-primary/10 border-primary/40 text-primary'
                    : 'bg-secondary/40 border-border text-muted hover:text-foreground hover:border-muted-foreground'
                }`}
                title="Toggle Recruiter Mode to answer core hiring questions"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Recruiter Mode</span>
                <span className={`w-1.5 h-1.5 rounded-full ${recruiterMode ? 'bg-primary' : 'bg-muted-foreground'}`} />
              </button>

              {/* Command Palette trigger */}
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-border bg-secondary/30 text-muted hover:text-foreground hover:border-muted-foreground transition-all cursor-pointer text-xs"
                title="Search and shortcuts"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden lg:inline font-mono text-[10px] bg-secondary px-1 py-0.5 rounded border border-border">
                  Ctrl+K
                </span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-border hover:bg-secondary/50 text-muted hover:text-foreground cursor-pointer transition-colors"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
