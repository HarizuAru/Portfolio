'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobalContext } from '@/context/global-context';
import { Sun, Moon, Search, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '#projects', id: 'projects', label: 'Projects' },
  { href: '#experience', id: 'experience', label: 'Experience' },
  { href: '#about', id: 'about', label: 'About' },
  { href: '#skills', id: 'skills', label: 'Skills' },
  { href: '#contact', id: 'contact', label: 'Contact' },
];

export function Navigation() {
  const { theme, toggleTheme, setCommandPaletteOpen } = useGlobalContext();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
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
    if (!isHome) {
      return;
    }

    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[2px] bg-primary z-[100] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="sticky top-0 w-full z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="font-mono text-lg font-bold tracking-tight text-foreground hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
              >
                &lt;HI<span className="text-primary font-bold">/</span>&gt;
              </Link>
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-border bg-secondary/50">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-mono text-muted">portfolio.online</span>
              </div>
            </div>

            {isHome && (
              <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}

            <div className="flex items-center gap-3">
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

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg border border-border hover:bg-secondary/50 text-muted hover:text-foreground cursor-pointer transition-colors"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {isHome && (
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="md:hidden p-2 rounded-lg border border-border hover:bg-secondary/50 text-muted hover:text-foreground cursor-pointer transition-colors"
                  title="Toggle menu"
                  aria-expanded={menuOpen}
                  aria-label="Toggle navigation menu"
                >
                  {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>

          {isHome && menuOpen && (
            <nav aria-label="Mobile" className="md:hidden border-t border-border py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className="rounded-lg px-3 py-2 text-sm text-muted hover:text-foreground hover:bg-secondary/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
