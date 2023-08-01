import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { SnackbarProvider } from 'notistack'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SnackbarProvider
  autoHideDuration={5000}
  >
    <App />
</SnackbarProvider>
)
