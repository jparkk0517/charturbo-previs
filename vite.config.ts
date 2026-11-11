// Dev server of the browser viewer (viewer.html) and the offline renderer (render.html; scripts/render.mjs starts it
// programmatically), plus the vitest config. The root is the repo root, so examples/**/*.json and their models are
// served as static files.
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  root: import.meta.dirname,
  base: './',
  // draco3d's decoder is a CommonJS file: pre-bundle it so `import()` gets its module.exports (see app/decoders.ts)
  optimizeDeps: { include: ['draco3d/draco_decoder_nodejs.js'] },
  // charturbo may be linked from another checkout (npm link / file:): do not restrict file serving to the repo
  server: { fs: { strict: false } },
  test: {
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
});
