import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider } from './providers/themeProvider'
import { Toaster } from "@/components/ui/toaster";
import { Provider } from 'react-redux'
import { store } from './lib/redux'
import Modal from './components/custom/modal'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
        <Toaster />
        <Modal />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
)


// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
