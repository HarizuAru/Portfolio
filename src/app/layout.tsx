import type { Metadata } from 'next';
import { GlobalProvider } from '@/context/global-context';
import { Navigation } from '@/components/navigation';
import { CommandPalette } from '@/components/command-palette';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hariz Iskandar | Portfolio',
  description: 'Personal portfolio showcasing software projects, technical skills, and ways to get in touch.',
  keywords: ['Portfolio', 'Software Engineer', 'Next.js', 'TypeScript', 'Web Development', 'Cloud', 'Projects'],
  authors: [{ name: 'Hariz Iskandar' }],
  openGraph: {
    title: 'Hariz Iskandar | Portfolio',
    description: 'Explore featured projects, technical capabilities, and contact details.',
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
      className="h-full antialiased dark"
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
                  Built for project showcase and easy customization
                </span>
              </div>
              <p className="text-[11px] text-muted text-center md:text-right font-mono max-w-md">
                Built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript.
              </p>
            </div>
          </footer>
        </GlobalProvider>
      </body>
    </html>
  );
}
