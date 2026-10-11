'use client';

import { useEffect, useRef, useState } from 'react';
import p5 from 'p5';

export interface ForceFieldBackgroundProps {
  /** Source image URL for particle mapping. Omit to use a procedural radial field (no network). */
  imageUrl?: string;
  hue?: number;
  saturation?: number;
  threshold?: number;
  minStroke?: number;
  maxStroke?: number;
  spacing?: number;
  noiseScale?: number;
  density?: number;
  invertImage?: boolean;
  invertWireframe?: boolean;
  magnifierEnabled?: boolean;
  magnifierRadius?: number;
  forceStrength?: number;
  friction?: number;
  restoreSpeed?: number;
  /** Render without the opaque black clear color so the page background shows through. */
  transparent?: boolean;
  className?: string;
}

/** Radial brightness field synthesized locally — no image download, no CORS. */
function synthesizeField(p: p5, w: number, h: number): p5.Image {
  const img = p.createImage(Math.max(1, w), Math.max(1, h));
  img.loadPixels();
  const cx = w / 2;
  const cy = h / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy) || 1;
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const d = Math.sqrt((x - cx) * (x - cx) + (y - cy) * (y - cy)) / maxDist;
      const v = Math.round(255 * Math.max(0, 1 - d * 1.15));
      const i = (x + y * img.width) * 4;
      img.pixels[i] = v;
      img.pixels[i + 1] = v;
      img.pixels[i + 2] = v;
      img.pixels[i + 3] = 255;
    }
  }
  img.updatePixels();
  return img;
}

export function ForceFieldBackground({
  imageUrl,
  hue = 210,
  saturation = 100,
  threshold = 255,
  minStroke = 2,
  maxStroke = 6,
  spacing = 10,
  noiseScale = 0,
  density = 2.0,
  invertImage = false,
  invertWireframe = true,
  magnifierEnabled = true,
  magnifierRadius = 150,
  forceStrength = 10,
  friction = 0.9,
  restoreSpeed = 0.05,
  transparent = true,
  className = '',
}: ForceFieldBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  const propsRef = useRef({
    hue, saturation, threshold, minStroke, maxStroke, spacing, noiseScale,
    density, invertImage, invertWireframe, magnifierEnabled, magnifierRadius,
    forceStrength, friction, restoreSpeed, transparent,
  });

  useEffect(() => {
    propsRef.current = {
      hue, saturation, threshold, minStroke, maxStroke, spacing, noiseScale,
      density, invertImage, invertWireframe, magnifierEnabled, magnifierRadius,
      forceStrength, friction, restoreSpeed, transparent,
    };
  }, [hue, saturation, threshold, minStroke, maxStroke, spacing, noiseScale, density, invertImage, invertWireframe, magnifierEnabled, magnifierRadius, forceStrength, friction, restoreSpeed, transparent]);

  useEffect(() => {
    if (!containerRef.current) return;
    let instance: p5 | null = null;
    let cancelled = false;

    const sketch = (p: p5 & { preload?: () => void }) => {
      let originalImg: p5.Image | null = null;
      let img: p5.Image | null = null;
      let palette: p5.Color[] = [];
      let points: { pos: p5.Vector; originalPos: p5.Vector; vel: p5.Vector }[] = [];
      let lastHue = -1;
      let lastSaturation = -1;
      let lastSpacing = -1;
      let lastNoiseScale = -1;
      let lastDensity = -1;
      let lastInvertImage: boolean | null = null;
      let magnifierX = 0;
      let magnifierY = 0;
      const magnifierInertia = 0.1;

      p.preload = () => {
        if (!imageUrl) return;
        p.loadImage(
          imageUrl,
          (loadedImg) => {
            if (!cancelled) originalImg = loadedImg;
          },
          () => {
            if (!cancelled) setFailed(true);
          }
        );
      };

      p.setup = () => {
        const node = containerRef.current;
        if (!node) return;
        const { clientWidth, clientHeight } = node;
        if (clientWidth === 0 || clientHeight === 0) return;
        p.createCanvas(clientWidth, clientHeight);
        magnifierX = p.width / 2;
        magnifierY = p.height / 2;

        // No remote image: synthesize a local brightness field.
        if (!originalImg && !imageUrl) {
          originalImg = synthesizeField(p, p.width, p.height);
        }
        if (!originalImg) return;

        processImage();
        generatePalette(propsRef.current.hue, propsRef.current.saturation);
        generatePoints();

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          p.redraw();
          p.noLoop();
        }
      };

      p.windowResized = () => {
        const node = containerRef.current;
        if (!node || !originalImg) return;
        const { clientWidth, clientHeight } = node;
        p.resizeCanvas(clientWidth, clientHeight);
        if (!imageUrl) originalImg = synthesizeField(p, p.width, p.height);
        processImage();
        generatePoints();
      };

      function processImage() {
        if (!originalImg) return;
        img = originalImg.get();
        if (p.width > 0 && p.height > 0) img.resize(p.width, p.height);
        img.filter(p.GRAY);
        if (propsRef.current.invertImage) {
          img.loadPixels();
          for (let i = 0; i < img.pixels.length; i += 4) {
            img.pixels[i] = 255 - img.pixels[i];
            img.pixels[i + 1] = 255 - img.pixels[i + 1];
            img.pixels[i + 2] = 255 - img.pixels[i + 2];
          }
          img.updatePixels();
        }
        lastInvertImage = propsRef.current.invertImage;
      }

      function generatePalette(h: number, s: number) {
        palette = [];
        p.push();
        p.colorMode(p.HSL);
        // Bright field areas -> light strokes (visible on dark backgrounds).
        for (let i = 0; i < 12; i++) {
          palette.push(p.color(h, s, p.map(i, 0, 11, 5, 95)));
        }
        p.pop();
      }

      function generatePoints() {
        if (!img) return;
        points = [];
        const { spacing, density, noiseScale } = propsRef.current;
        const safeSpacing = Math.max(4, spacing);
        for (let y = 0; y < img.height; y += safeSpacing) {
          for (let x = 0; x < img.width; x += safeSpacing) {
            if (p.random() > density) continue;
            const nx = p.noise(x * noiseScale, y * noiseScale) - 0.5;
            const ny = p.noise((x + 500) * noiseScale, (y + 500) * noiseScale) - 0.5;
            const px = x + nx * safeSpacing;
            const py = y + ny * safeSpacing;
            points.push({
              pos: p.createVector(px, py),
              originalPos: p.createVector(px, py),
              vel: p.createVector(0, 0),
            });
          }
        }
        lastSpacing = spacing;
        lastNoiseScale = noiseScale;
        lastDensity = density;
      }

      function applyForceField(mx: number, my: number) {
        const props = propsRef.current;
        if (!props.magnifierEnabled) return;
        const center = p.createVector(mx, my);
        for (const pt of points) {
          const dir = p5.Vector.sub(pt.pos, center);
          const d = dir.mag();
          if (d < props.magnifierRadius) {
            dir.normalize();
            pt.vel.add(dir.mult(props.forceStrength / Math.max(1, d)));
          }
          pt.vel.mult(props.friction);
          pt.vel.add(p5.Vector.sub(pt.pos, pt.originalPos).mult(-props.restoreSpeed));
          pt.pos.add(pt.vel);
        }
      }

      p.draw = () => {
        if (!img || palette.length === 0) return;
        const props = propsRef.current;
        if (props.transparent) p.clear();
        else p.background(0);

        if (props.hue !== lastHue || props.saturation !== lastSaturation) {
          generatePalette(props.hue, props.saturation);
          lastHue = props.hue;
          lastSaturation = props.saturation;
        }
        if (props.invertImage !== lastInvertImage) processImage();
        if (props.spacing !== lastSpacing || props.noiseScale !== lastNoiseScale || props.density !== lastDensity) {
          generatePoints();
        }

        magnifierX = p.lerp(magnifierX, p.mouseX, magnifierInertia);
        magnifierY = p.lerp(magnifierY, p.mouseY, magnifierInertia);
        applyForceField(magnifierX, magnifierY);

        img.loadPixels();
        p.noFill();
        for (const pt of points) {
          const d = p.dist(pt.pos.x, pt.pos.y, magnifierX, magnifierY);
          const px = p.constrain(p.floor(pt.pos.x), 0, img.width - 1);
          const py = p.constrain(p.floor(pt.pos.y), 0, img.height - 1);
          const brightness = img.pixels[(px + py * img.width) * 4];
          if (brightness === undefined) continue;
          const condition = props.invertWireframe
            ? brightness < props.threshold
            : brightness > props.threshold;
          if (!condition || !palette.length) continue;
          const shadeIndex = p.constrain(
            Math.floor(p.map(brightness, 0, 255, 0, palette.length - 1)),
            0,
            palette.length - 1
          );
          let strokeSize = p.map(brightness, 0, 255, props.minStroke, props.maxStroke);
          if (props.magnifierEnabled && d < props.magnifierRadius) {
            strokeSize *= p.map(d, 0, props.magnifierRadius, 2, 1);
          }
          const col = palette[shadeIndex];
          if (col) {
            p.stroke(col);
            p.strokeWeight(strokeSize);
            p.point(pt.pos.x, pt.pos.y);
          }
        }
      };
    };

    instance = new p5(sketch, containerRef.current);
    return () => {
      cancelled = true;
      instance?.remove();
      instance = null;
    };
  }, [imageUrl]);

  if (failed) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  );
}

export default ForceFieldBackground;
