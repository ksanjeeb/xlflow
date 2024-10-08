import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from './routes.tsx'
import './index.css'
import { AuthProvider } from './lib/auth-provider.tsx'
import  { Toaster } from 'react-hot-toast';
import "@glideapps/glide-data-grid/dist/index.css";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider >
  </React.StrictMode>,
)
