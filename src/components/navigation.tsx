'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useGlobalContext } from '@/context/global-context';
import { Sun, Moon, Search, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/projects', label: 'Projects' },
  { href: '/experience', label: 'Experience' },
  { href: '/skills', label: 'Skills' },
  { href: '/certifications', label: 'Certifications' },
  { href: '/about', label: 'About' },
];

export function Navigation() {
  const { theme, toggleTheme, setCommandPaletteOpen } = useGlobalContext();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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

  // Close the mobile menu on route change (handled via clicks below).
  const closeMenu = () => setMenuOpen(false);

  const linkClass = (href: string) =>
    `transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm ${
      pathname === href || (href !== '/' && pathname.startsWith(href))
        ? 'text-foreground font-medium'
        : 'text-muted hover:text-foreground'
    }`;

  return (
    <>
      <div
        className="fixed top-0 left-0 h-[2px] bg-primary z-[100] transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      <header className="sticky top-0 w-full z-50 glass-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 h-16">
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/"
                className="font-mono text-lg font-bold tracking-tight text-foreground hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                aria-label="Hariz Iskandar — home"
              >
                &lt;HI<span className="text-primary font-bold">/</span>&gt;
              </Link>
            </div>

            <nav aria-label="Primary" className="hidden lg:flex items-center gap-5 text-sm">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCommandPaletteOpen(true)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded border border-border bg-secondary/30 text-muted hover:text-foreground hover:border-muted-foreground transition-all cursor-pointer text-xs"
                title="Search and shortcuts"
                aria-label="Open command palette"
              >
                <Search className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden lg:inline font-mono text-[10px] bg-secondary px-1 py-0.5 rounded border border-border">
                  Ctrl+K
                </span>
              </button>

              <button
                onClick={toggleTheme}
                className="p-2 rounded border border-border hover:bg-secondary/50 text-muted hover:text-foreground cursor-pointer transition-colors"
                title="Toggle theme"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <Link
                href="/contact"
                className="hidden sm:inline-flex items-center rounded px-3 py-1.5 text-sm font-medium text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Contact
              </Link>
              <Link
                href="/resume"
                className="hidden sm:inline-flex items-center rounded bg-primary px-3.5 py-1.5 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Resume
              </Link>

              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="lg:hidden p-2 rounded border border-border hover:bg-secondary/50 text-muted hover:text-foreground cursor-pointer transition-colors"
                title="Toggle menu"
                aria-expanded={menuOpen}
                aria-label="Toggle navigation menu"
              >
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {menuOpen && (
            <nav aria-label="Mobile" onClick={closeMenu} className="lg:hidden border-t border-border py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${linkClass(link.href)} hover:bg-secondary/50`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 px-1 pt-2">
                <Link
                  href="/resume"
                  className="flex-1 inline-flex justify-center items-center rounded bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
                >
                  Resume
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 inline-flex justify-center items-center rounded border border-border px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary/50"
                >
                  Contact
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}
