/// <reference path="./lenis-css.d.ts" />
import type { RtdsConfig } from '../../rtds.config';

export type SmoothScrollHandle = { destroy: () => void };

/**
 * Playground-only. No-op unless config.scroll.smooth === true
 * and user does not prefer reduced motion.
 */
export async function initSmoothScroll(
  config: RtdsConfig,
): Promise<SmoothScrollHandle | null> {
  if (!config.scroll.smooth) return null;
  if (typeof window === 'undefined') return null;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  const [{ default: Lenis }] = await Promise.all([
    import('lenis'),
    import('lenis/dist/lenis.css'),
  ]);

  const lenis = new Lenis({
    lerp: config.scroll.lerp ?? 0.1,
    wheelMultiplier: config.scroll.wheelMultiplier ?? 0.7,
    touchMultiplier: 1,
    syncTouch: false,
  });

  let rafId = 0;
  function raf(time: number) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  (window as unknown as { __rtdsLenis?: typeof lenis }).__rtdsLenis = lenis;

  return {
    destroy: () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as unknown as { __rtdsLenis?: unknown }).__rtdsLenis;
    },
  };
}
