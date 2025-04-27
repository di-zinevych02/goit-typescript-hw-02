import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App/App.js'
//типізували кореневий елемент(as HTMLElement)
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
