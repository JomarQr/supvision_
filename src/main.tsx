import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import App from './App'
import './index.css'

const container = document.getElementById('root')!

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
)

// If pre-rendered HTML is present, hydrate it - otherwise create from scratch (dev)
if (container.innerHTML.trim()) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
