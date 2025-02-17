import React from 'react'
import { createRoot } from 'react-dom/client'
import { Storage } from '@ionic/storage'
import App from './App'

import StorageContext from './contexts/StorageContext'
import { TranslationProvider } from 'i18nano'
import { locales } from './locales/locales'
const container = document.getElementById('root')
const root = createRoot(container!)
const storage = new Storage()
storage.create()

root.render(
  <React.StrictMode>
    <StorageContext.Provider value={storage}>
      <TranslationProvider translations={locales.common} fallback='en'>
        <App />
      </TranslationProvider>
    </StorageContext.Provider>
  </React.StrictMode>
)