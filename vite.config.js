import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/MSKart-micro-E-Commerce-Website--React-Firebase/',
  plugins: [react()],
})
