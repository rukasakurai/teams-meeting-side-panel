/**
 * This file contains the Vite configuration for the project.
 * It sets up the necessary plugins and configurations for building and serving the React application.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
