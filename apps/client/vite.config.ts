import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite';

  export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {  
        '@': path.resolve(__dirname, './src'),
        '@saas-app/ui': path.resolve(__dirname, '../../packages/ui/src')
      }
    },
    server: {
      port: 3001
    },
    build: {
      outDir: 'build',
    },
    preview: {
      port: 5173,
    },
    css: {
      transformer: 'postcss',
    }
  })
