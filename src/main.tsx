import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// main.tsx
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './i18n/LanguageContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
