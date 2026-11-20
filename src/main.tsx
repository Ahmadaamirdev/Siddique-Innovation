import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { applyPageSEO } from './utils/seoManager'

// Apply route-specific SEO metadata immediately upon initial script evaluation
applyPageSEO(window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
