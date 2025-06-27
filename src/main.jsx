import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/AppRouter'
import { AuthProvider } from './context/authContext'
import { ChatProvider } from './layout/chat/context/ChatContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ChatProvider>
      <AppRouter />
      </ChatProvider>
    </AuthProvider>
  </StrictMode>,
)
