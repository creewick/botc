import React from 'react'
import App from './App'
import { createRoot } from 'react-dom/client'
import ContextComposition from './contexts/ContextComposition'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <ContextComposition>
      <App />
    </ContextComposition>
  </React.StrictMode>
)