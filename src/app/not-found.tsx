import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center space-y-6">
      <p className="font-mono text-sm text-primary">404 · Page not found</p>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
        This page doesn&apos;t exist
      </h1>
      <p className="text-muted max-w-xl mx-auto">
        The link you followed may be broken, or the page may have been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to home
      </Link>
    </div>
  );
}
