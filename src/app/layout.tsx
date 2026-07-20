import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { GlobalProvider } from '@/context/global-context';
import { Navigation } from '@/components/navigation';
import { CommandPalette } from '@/components/command-palette';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Hariz Iskandar | Enterprise Engineering Portfolio Platform',
  description: 'An interactive engineering knowledge base showcasing secure cloud-native pipelines, system performance modeling, and structured AI agent orchestration.',
  keywords: ['Cloud Security', 'AI Systems', 'Next.js 15', 'TypeScript', 'DevOps', 'Cybersecurity', 'Systems Architecture'],
  authors: [{ name: 'Hariz Iskandar' }],
  openGraph: {
    title: 'Hariz Iskandar | Engineering Portfolio Platform',
    description: 'An interactive engineering knowledge base showcasing systems design, cloud security, and production-quality software.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-full flex flex-col relative bg-background text-foreground selection:bg-primary/20 selection:text-primary">
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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col items-center md:items-start gap-1">
                <span className="font-mono text-sm font-bold text-foreground">
                  © 2026 Hariz Iskandar
                </span>
                <span className="text-[10px] text-muted font-mono">
                  sys.release: v1.0.4 // latency: optimal
                </span>
              </div>
              <p className="text-[11px] text-muted text-center md:text-right font-mono max-w-md">
                Engineered with Next.js 15, React 19, Tailwind v4, and Framer Motion. 
                Optimized for recruiter audits, accessibility, and high performance.
              </p>
            </div>
          </footer>
        </GlobalProvider>
      </body>
    </html>
  );
}
