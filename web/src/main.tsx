import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { Storage } from '@ionic/storage'
import StorageContext from './contexts/StorageContext'

const container = document.getElementById('root')
const root = createRoot(container!)
const storage = new Storage()
storage.create()

root.render(
  <React.StrictMode>
    <StorageContext.Provider value={storage}>
      <App />
    </StorageContext.Provider>
  </React.StrictMode>
)