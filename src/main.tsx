/**
 * This file is the entry point for the React application.
 * It sets up the root element and renders the App component inside a StrictMode wrapper.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
