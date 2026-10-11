'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useGlobalContext } from '@/context/global-context';
import { ErrorBoundary } from '@/components/error-boundary';

// p5 is ~1MB: split it into its own chunk and skip SSR entirely so it
// never blocks first paint or the static prerender.
const ForceFieldBackground = dynamic(
  () => import('@/components/force-field-background').then((m) => m.ForceFieldBackground),
  { ssr: false }
);

// Hero backdrop only: dark theme + motion-safe. Light theme and
// reduced-motion users get the clean static hero instead.
// Mounts after browser idle so it can never compete with hydration,
// and sits inside an error boundary so a canvas failure can never
// take down the page.
export function HeroBackground() {
  const { theme } = useGlobalContext();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (theme !== 'dark' || !ready) return null;

  return (
    <ErrorBoundary>
      <ForceFieldBackground
        hue={210}
        saturation={100}
        threshold={127}
        spacing={10}
        minStroke={2}
        maxStroke={6}
        forceStrength={10}
        magnifierRadius={150}
        friction={0.9}
        restoreSpeed={0.05}
        className="hero-field-mask opacity-90"
      />
    </ErrorBoundary>
  );
}
