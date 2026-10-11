import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { GlobalProvider } from '@/context/global-context';
import { Navigation } from '@/components/navigation';
import { CommandPalette } from '@/components/command-palette';
import { GithubIcon, LinkedinIcon } from '@/components/icons';
import { portfolioConfig } from '@/data/portfolio';
import './globals.css';

const siteUrl = portfolioConfig.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Hariz Iskandar | Portfolio',
  description: 'Personal portfolio showcasing software projects, technical skills, and ways to get in touch.',
  keywords: ['Portfolio', 'Software Engineer', 'Next.js', 'TypeScript', 'Web Development', 'Cloud', 'Projects'],
  authors: [{ name: 'Hariz Iskandar' }],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Hariz Iskandar | Portfolio',
    description: 'Explore featured projects, technical capabilities, and contact details.',
    url: '/',
    siteName: 'Hariz Iskandar | Portfolio',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Hariz Iskandar | Portfolio',
    description: 'Explore featured projects, technical capabilities, and contact details.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark"
      style={{ colorScheme: 'dark' }}
    >
      <body id="top" className="min-h-full flex flex-col relative bg-background text-foreground selection:bg-primary/20 selection:text-primary">
        {/* Background Mesh Overlay */}
        <div className="bg-grid-overlay" aria-hidden="true" />
        
        <GlobalProvider>
          {/* Sticky Header */}
          <Navigation />
          
          {/* Global Keyboard Shortcut Command Palette */}
          <CommandPalette />
          
          {/* Page Body content */}
          <main className="flex-1 relative z-10">
            {children}
          </main>

          {/* Footer block */}
          <footer className="border-t border-border bg-secondary/15 py-10 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-col items-center md:items-start gap-1">
                  <span className="font-mono text-sm font-bold text-foreground">
                    © 2026 Hariz Iskandar
                  </span>
                  <span className="text-[10px] text-muted font-mono">
                    {portfolioConfig.location} · {portfolioConfig.email}
                  </span>
                </div>
                <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted">
                  <Link href="/#projects" className="hover:text-foreground transition-colors">Projects</Link>
                  <Link href="/#experience" className="hover:text-foreground transition-colors">Experience</Link>
                  <Link href="/#about" className="hover:text-foreground transition-colors">About</Link>
                  <Link href="/#skills" className="hover:text-foreground transition-colors">Skills</Link>
                  <Link href="/#contact" className="hover:text-foreground transition-colors">Contact</Link>
                </nav>
                <div className="flex items-center gap-2">
                  <a
                    href={portfolioConfig.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="p-2 rounded-lg border border-border text-muted hover:text-foreground hover:bg-secondary/50 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href={portfolioConfig.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="p-2 rounded-lg border border-border text-muted hover:text-foreground hover:bg-secondary/50 transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#top"
                    aria-label="Back to top"
                    className="p-2 rounded-lg border border-border text-muted hover:text-foreground hover:bg-secondary/50 transition-colors"
                  >
                    <ArrowUp className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
              <p className="text-[11px] text-muted text-center font-mono">
                Built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript.
              </p>
            </div>
          </footer>
        </GlobalProvider>
      </body>
    </html>
  );
}
