import { createContext, useContext, useEffect, useState } from 'react'
import { AppSettings, defaultSettings } from '../types/AppSettings'
import { useStorage } from './useStorage'

interface SettingsContextType {
  settings: AppSettings
  setSettings: (changes: Partial<AppSettings>) => void
}

const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  setSettings: () => {}
})

interface Props {
  children: React.ReactNode
}

export const SettingsProvider: React.FC<Props> = ({ children }) => {
  const storage = useStorage()
  const [settings, setSettingsInternal] = useState<AppSettings>(defaultSettings)

  useEffect(() => { storage?.get('settings').then(setSettingsInternal) }, [storage])

  const setSettings = (changes: Partial<AppSettings>) => {
    setSettingsInternal(prev => ({ ...prev, ...changes }))
    storage?.set('settings', { ...settings, ...changes })
  }

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => useContext(SettingsContext)
