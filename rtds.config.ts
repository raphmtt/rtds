/**
 * Monorepo playground / DX config.
 * Not consumed by published @rtds/* packages.
 */
export type RtdsConfig = {
  scroll: {
    /** Lenis smooth scroll in demo/Storybook only. Default false. */
    smooth: boolean;
    /** Lenis lerp when smooth=true. Default 0.1 */
    lerp?: number;
    /** Lenis wheelMultiplier when smooth=true. Default 0.7 */
    wheelMultiplier?: number;
  };
  // Reserved — do not implement in RT-14:
  // fonts?: Record<string, unknown>;
  // style?: Record<string, unknown>;
};

export function defineConfig(config: RtdsConfig): RtdsConfig {
  return config;
}

export default defineConfig({
  scroll: {
    smooth: false,
    // lerp: 0.1,
    // wheelMultiplier: 0.7,
  },
  // fonts: { /* reserved */ },
  // style: { /* reserved */ },
});
