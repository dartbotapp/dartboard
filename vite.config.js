import { defineConfig } from "vite";
import { resolve } from "path";
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    target: 'esnext',
    minify: false,
    outDir: './dist',
    sourcemap: true,
    lib: {
      entry: {
        main: resolve(__dirname, 'src/index.ts'),
        dartboard: resolve(__dirname, 'src/components/Dartboard'),
      },
      formats: ["es"],
    },
  },
});
