import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LayoutComponent } from './layout/layoutComponent'
// import { Register } from './features/auth/register.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LayoutComponent />
  </StrictMode>
)
