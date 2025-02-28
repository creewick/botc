import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import AppSettings, { APP_SETTINGS } from '../models/AppSettings'
import { StorageContext } from './StorageContext'

interface AppSettingsContextType {
  settings: AppSettings
  setLanguage(lang: string): void
  setDarkMode(darkMode: boolean | null): void
  checkForUpdates(): Promise<ServiceWorker | undefined>
  updateApp(serviceWorker: ServiceWorker): void
  clearStorage(): Promise<void>
}

interface Props {
  children: React.ReactNode
}

const KEY = 'settings'

const AppSettingsContext = createContext<AppSettingsContextType>(
  {
    settings: APP_SETTINGS,
    setLanguage: () => { },
    setDarkMode: () => { },
    checkForUpdates: () => Promise.resolve(undefined),
    updateApp: () => { },
    clearStorage: () => Promise.resolve()
  }
)

const AppSettingsProvider: React.FC<Props> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(APP_SETTINGS)
  const storage = useContext(StorageContext)

  useEffect(() => void loadSettings(), [])
  useEffect(() => void storage?.set(KEY, settings), [settings])

  const loadSettings = useCallback(async () => {
    const value = await storage?.get(KEY)
    if (value) setSettings(value)
  }, [])

  const setLanguage = useCallback((lang: string) => {
    setSettings((prev) => ({ ...prev, lang: lang }))
  }, [])

  const setDarkMode = useCallback((enabled: boolean) => {
    setSettings((prev) => ({ ...prev, darkMode: enabled }))
  }, [])

  const checkForUpdates = useCallback(async () => {
    if (!('serviceWorker' in navigator))
      return undefined

    const registration = await navigator.serviceWorker.ready
    await registration.update()

    const newWorker = registration.installing
    if (newWorker)
      return new Promise<ServiceWorker>((resolve) =>
        newWorker.onstatechange = () => {
          if (newWorker.state === 'installed')
            resolve(newWorker)
        }
      )

    return registration.waiting ?? undefined
  }, [])

  const updateApp = useCallback((serviceWorker: ServiceWorker) => {
    serviceWorker.postMessage({ type: 'SKIP_WAITING' })
    window.location.reload()
  }, [])

  const clearStorage = useCallback(async () => {
    await storage?.clear()
    setSettings(APP_SETTINGS)
    window.location.reload()
  }, [])

  const value = useMemo(
    () => ({
      settings,
      setLanguage,
      setDarkMode,
      checkForUpdates,
      updateApp,
      clearStorage
    }),
    [
      settings,
      setLanguage,
      setDarkMode,
      checkForUpdates,
      updateApp,
      clearStorage
    ]
  )

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  )
}

export { AppSettingsContext, AppSettingsProvider, type AppSettingsContextType }