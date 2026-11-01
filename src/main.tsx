import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/nunito/600.css'
import '@fontsource/nunito/800.css'
import '@fontsource/nunito/900.css'
import '@fontsource/sarabun/400.css'
import '@fontsource/sarabun/600.css'
import './styles.css'
import App from './App'
import './lib/sync' // Cloud-Sync im Hintergrund starten

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
