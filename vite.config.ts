import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: isSsrBuild ? 'dist/server' : 'dist/client',
    rollupOptions: isSsrBuild ? undefined : {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-lottie': ['lottie-react'],
          'vendor-helmet': ['react-helmet-async'],
        },
      },
    },
  },
  ssr: {
    noExternal: ['lottie-react'],
  },
}))
