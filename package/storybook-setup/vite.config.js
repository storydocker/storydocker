import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      all: true,
      include: ['src/**/*.jsx'],
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    setupFiles: ['./tests/setup.js'],
    // testMatch: ['./tests/**/*.test.tsx'],
    globals: true
  },
})
