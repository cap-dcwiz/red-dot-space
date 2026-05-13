import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const baseUrl = import.meta.env.BASE_URL
const rootStyle = document.documentElement.style
rootStyle.setProperty('--asset-hero-satellite', `url('${baseUrl}hero-purpose-satellite.png')`)
rootStyle.setProperty('--asset-earth', `url('${baseUrl}earth.jpg')`)
rootStyle.setProperty('--asset-perspective-cover', `url('${baseUrl}perspective-paper-cover-v2.png')`)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
