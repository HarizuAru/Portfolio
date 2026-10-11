'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Palette, Maximize, Zap } from 'lucide-react';
import { useGlobalContext } from '@/context/global-context';
import { ErrorBoundary } from '@/components/error-boundary';

// Split into its own chunk and skip SSR entirely so it never blocks
// first paint or the static prerender.
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
  const [hue, setHue] = useState(210);
  const [radius, setRadius] = useState(150);
  const [force, setForce] = useState(10);

  useEffect(() => {
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(() => setReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  if (theme !== 'dark' || !ready) return null;

  const slider = 'w-20 sm:w-24 accent-primary h-1 cursor-pointer';

  return (
    <ErrorBoundary>
      <ForceFieldBackground
        hue={hue}
        saturation={100}
        threshold={35}
        spacing={10}
        minStroke={2}
        maxStroke={6}
        forceStrength={force}
        magnifierRadius={radius}
        friction={0.9}
        restoreSpeed={0.05}
        className="hero-field-mask opacity-90"
      />
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 hidden sm:block">
        <div
          role="group"
          aria-label="Particle field controls"
          className="flex items-center gap-4 rounded-2xl border border-border bg-background/60 backdrop-blur-md px-4 py-2.5 shadow-xl"
        >
          <label className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-wider text-muted">
            <span className="flex items-center gap-1">
              <Palette className="w-3 h-3" aria-hidden="true" /> Hue
            </span>
            <input
              type="range"
              min={0}
              max={360}
              value={hue}
              onChange={(e) => setHue(Number(e.target.value))}
              className={slider}
              aria-label="Particle hue"
            />
          </label>
          <div className="w-px h-8 bg-border" aria-hidden="true" />
          <label className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-wider text-muted">
            <span className="flex items-center gap-1">
              <Maximize className="w-3 h-3" aria-hidden="true" /> Radius
            </span>
            <input
              type="range"
              min={50}
              max={300}
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className={slider}
              aria-label="Force field radius"
            />
          </label>
          <div className="w-px h-8 bg-border" aria-hidden="true" />
          <label className="flex flex-col gap-1 text-[10px] font-mono uppercase tracking-wider text-muted">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" aria-hidden="true" /> Force
            </span>
            <input
              type="range"
              min={0}
              max={30}
              value={force}
              onChange={(e) => setForce(Number(e.target.value))}
              className={slider}
              aria-label="Force strength"
            />
          </label>
        </div>
      </div>
    </ErrorBoundary>
  );
}
