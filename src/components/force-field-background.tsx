'use client';

import { useEffect, useRef } from 'react';

export interface ForceFieldBackgroundProps {
  /** Source image URL for particle mapping (CORS-friendly). Omit for the built-in "HI" map. */
  imageUrl?: string;
  hue?: number;
  saturation?: number;
  threshold?: number;
  minStroke?: number;
  maxStroke?: number;
  spacing?: number;
  magnifierEnabled?: boolean;
  magnifierRadius?: number;
  forceStrength?: number;
  friction?: number;
  restoreSpeed?: number;
  transparent?: boolean;
  className?: string;
}

interface Dot {
  x: number;
  y: number;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  light: number;
  size: number;
}

// Native canvas replacement for the p5 prototype: a brightness-mapped dot
// field ("HI" monogram by default) with cursor repulsion. No dependencies,
// ~130 lines, fully deterministic — and a fraction of the bundle weight.
export function ForceFieldBackground({
  imageUrl,
  hue = 210,
  saturation = 100,
  threshold = 127,
  minStroke = 2,
  maxStroke = 6,
  spacing = 10,
  magnifierEnabled = true,
  magnifierRadius = 150,
  forceStrength = 10,
  friction = 0.9,
  restoreSpeed = 0.05,
  className = '',
}: ForceFieldBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const live = useRef({
    hue, saturation, threshold, minStroke, maxStroke, spacing,
    magnifierEnabled, magnifierRadius, forceStrength, friction, restoreSpeed,
  });
  useEffect(() => {
    live.current = {
      hue, saturation, threshold, minStroke, maxStroke, spacing,
      magnifierEnabled, magnifierRadius, forceStrength, friction, restoreSpeed,
    };
  });

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const canvas = document.createElement('canvas');
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    node.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let dots: Dot[] = [];
    let raf = 0;
    let mx = -9999;
    let my = -9999;
    let stopped = false;

    const sampleMap = (
      drawMap: (o: CanvasRenderingContext2D, w: number, h: number) => void
    ) => {
      const off = document.createElement('canvas');
      off.width = W;
      off.height = H;
      const o = off.getContext('2d', { willReadFrequently: true });
      if (!o) return;
      drawMap(o, W, H);
      let data: Uint8ClampedArray;
      try {
        data = o.getImageData(0, 0, W, H).data;
      } catch {
        return;
      }
      const p = live.current;
      const step = Math.max(4, Math.round(p.spacing));
      dots = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const b = data[(y * W + x) * 4];
          if (b <= p.threshold) continue;
          const t = b / 255;
          dots.push({
            x, y, ox: x, oy: y, vx: 0, vy: 0,
            light: 5 + t * 90,
            size: p.minStroke + t * (p.maxStroke - p.minStroke),
          });
        }
      }
    };

    const drawMountainMap = (o: CanvasRenderingContext2D, w: number, h: number) => {
      // Full-bleed mountain-range brightness field: two ridgelines with
      // gaussian glow over faint grainy sky, so dots cover the whole area
      // with varied sizes — no image download, no CORS.
      const img = o.createImageData(w, h);
      const d = img.data;
      const r1 = new Float64Array(w);
      const r2 = new Float64Array(w);
      for (let x = 0; x < w; x++) {
        r1[x] =
          h * (0.34 + 0.11 * Math.sin(x * 0.0042 + 1.7) + 0.06 * Math.sin(x * 0.0107 + 0.4) + 0.045 * Math.abs(Math.sin(x * 0.021 + 2.3)));
        r2[x] =
          h * (0.58 + 0.09 * Math.sin(x * 0.0031 + 4.2) + 0.055 * Math.sin(x * 0.0083 + 2.1) + 0.04 * Math.abs(Math.sin(x * 0.017 + 0.9)));
      }
      const s1 = h * 0.09;
      const s2 = h * 0.12;
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const dy1 = y - r1[x];
          const dy2 = y - r2[x];
          const m1 = Math.exp(-(dy1 * dy1) / (2 * s1 * s1));
          const m2 = Math.exp(-(dy2 * dy2) / (2 * s2 * s2));
          const below = dy1 > 0 ? Math.exp(-dy1 / (h * 0.55)) : 0;
          // Deterministic integer hash for sparse sky grain.
          let hz = Math.imul(x, 374761393) + Math.imul(y, 668265263);
          hz = Math.imul(hz ^ (hz >>> 13), 1274126177);
          const grain = ((hz ^ (hz >>> 16)) >>> 0) / 4294967296;
          let v = 255 * (0.9 * m1 + 0.6 * m2) + 40 * below + 16 + 26 * grain;
          if (v > 255) v = 255;
          const i = (y * w + x) * 4;
          d[i] = v;
          d[i + 1] = v;
          d[i + 2] = v;
          d[i + 3] = 255;
        }
      }
      o.putImageData(img, 0, 0);
    };

    const build = () => {
      const rect = node.getBoundingClientRect();
      W = Math.max(1, Math.floor(rect.width));
      H = Math.max(1, Math.floor(rect.height));
      canvas.width = W;
      canvas.height = H;

      if (imageUrl) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          if (stopped) return;
          sampleMap((o, w, h) => {
            o.fillStyle = '#000';
            o.fillRect(0, 0, w, h);
            const scale = Math.max(w / img.width, h / img.height);
            o.drawImage(img, (w - img.width * scale) / 2, (h - img.height * scale) / 2, img.width * scale, img.height * scale);
          });
        };
        img.onerror = () => {
          if (!stopped) sampleMap(drawMountainMap);
        };
        img.src = imageUrl;
      }
      sampleMap(drawMountainMap);
    };

    const draw = () => {
      const p = live.current;
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) {
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (p.magnifierEnabled && dist < p.magnifierRadius) {
          const f = p.forceStrength / Math.max(8, dist);
          d.vx += (dx / (dist || 1)) * f;
          d.vy += (dy / (dist || 1)) * f;
        }
        d.vx *= p.friction;
        d.vy *= p.friction;
        d.vx += (d.ox - d.x) * p.restoreSpeed;
        d.vy += (d.oy - d.y) * p.restoreSpeed;
        d.x += d.vx;
        d.y += d.vy;

        let s = d.size;
        if (p.magnifierEnabled && dist < p.magnifierRadius) {
          s *= 2 - dist / p.magnifierRadius;
        }
        ctx.fillStyle = `hsl(${p.hue} ${p.saturation}% ${d.light}%)`;
        ctx.fillRect(d.x - s / 2, d.y - s / 2, s, s);
      }
    };

    const frame = () => {
      draw();
      raf = requestAnimationFrame(frame);
    };

    const toLocal = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = e.clientX - rect.left;
      my = e.clientY - rect.top;
    };
    const onMove = (e: MouseEvent) => toLocal(e);
    const onLeave = () => {
      mx = -9999;
      my = -9999;
    };
    const onResize = () => build();

    build();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw();
    } else {
      window.addEventListener('mousemove', onMove, { passive: true });
      document.documentElement.addEventListener('mouseleave', onLeave);
      window.addEventListener('resize', onResize);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
      canvas.remove();
    };
  }, [imageUrl]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  );
}

export default ForceFieldBackground;
