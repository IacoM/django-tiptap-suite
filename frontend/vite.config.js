import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  define: {
    'process.env': {},
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: path.resolve(__dirname, '../src/django_tiptap_suite/static/django_tiptap_suite'),
    emptyOutDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'DjangoTiptapSuite',
      fileName: () => 'tiptap-suite.min.js',
      formats: ['iife'],
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css' || assetInfo.name === 'index.css') {
            return 'tiptap-suite.min.css';
          }
          return assetInfo.name;
        },
      },
    },
  },
});