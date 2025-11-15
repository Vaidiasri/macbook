import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { compression } from 'vite-plugin-compression2';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => ({
  base: './', // For better path resolution
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Enable Babel optimizations
      babel: {
        plugins: [
          ['@babel/plugin-transform-runtime', { regenerator: true }],
        ],
      },
    }),
    tailwindcss(),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/.(js|mjs|json|css|html)$/],
      threshold: 1024,
    }),
    mode === 'analyze' && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: mode !== 'production',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          gsap: ['gsap', '@gsap/react'],
          vendor: ['zustand', 'clsx', 'react-responsive'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3000,
    open: true,
  },
}));
