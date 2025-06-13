import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { locales } from './locales/locales'
import { StorageProvider } from './hooks/useStorage'
import { SettingsProvider } from './hooks/useSettings'
import { Locale } from './components/Locale'

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <React.StrictMode>
    <StorageProvider>
      <SettingsProvider>
        <Locale locales={locales.ui}>
          <App />
        </Locale>
      </SettingsProvider>
    </StorageProvider>
  </React.StrictMode>
)