import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SiteSettingsProvider } from './context/SiteSettingsContext'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SiteSettingsProvider>
        <App />
      </SiteSettingsProvider>
    </BrowserRouter>
  </StrictMode>
)