import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import  { StorageProvider } from './contexts/StorageContext'
import { TranslationProvider } from 'i18nano'
import { locales } from './locales/locales'
import { SettingsProvider } from './contexts/SettingsContext'
import { RolesProvider } from './contexts/RolesProvider'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <TranslationProvider translations={locales.ui} fallback='en'>
      <StorageProvider>
        <SettingsProvider>
          <RolesProvider>
           <App />
          </RolesProvider>
        </SettingsProvider>
      </StorageProvider>
    </TranslationProvider>
  </React.StrictMode>
)