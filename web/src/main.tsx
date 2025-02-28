import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StorageProvider } from './contexts/StorageContext'
import { TranslationProvider } from 'i18nano'
import { locales } from './locales/locales'
import { AppSettingsProvider } from './contexts/AppSettingsContext'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <TranslationProvider translations={locales.ui} fallback='en'>
      <StorageProvider>
        <AppSettingsProvider>
          <App />
        </AppSettingsProvider>
      </StorageProvider>
    </TranslationProvider>
  </React.StrictMode>
)