import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    // tsc가 생성한 .d.ts를 지우지 않도록 (build에서 vite 먼저, tsc 나중 순서와 함께)
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SMTC',
      fileName: (format) =>
        format === 'es' ? 'show-me-the-coffee.esm.js' : 'show-me-the-coffee.js',
      formats: ['es', 'umd'],
    },
    // qrcode를 번들에 포함해 스크립트 한 줄로 동작하게 함
    rollupOptions: {
      output: { exports: 'named' },
    },
  },
});
