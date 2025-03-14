import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import  { Settings, SETTINGS } from '../models/AppSettings'
import { StorageContext } from './StorageContext'

interface SettingsContextType {
  settings: Settings
  setLanguage(lang: string): Promise<void>
  setDarkMode(darkMode: boolean | null): Promise<void>
  checkForUpdates(): Promise<ServiceWorker | undefined>
  updateApp(serviceWorker: ServiceWorker): void
  clearStorage(): Promise<void>
}

const SettingsContext = createContext<SettingsContextType>(
  {
    settings: SETTINGS,
    setLanguage: () => Promise.resolve(),
    setDarkMode: () => Promise.resolve(),
    checkForUpdates: () => Promise.resolve(undefined),
    updateApp: () => { },
    clearStorage: () => Promise.resolve()
  }
)

interface Props {
  children: React.ReactNode
}

const KEY = 'settings'

const SettingsProvider: React.FC<Props> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(SETTINGS)
  const storage = useContext(StorageContext)

  useEffect(() => void loadSettings(), [])
  useEffect(() => void storage?.set(KEY, settings), [settings])

  const loadSettings = useCallback(async () => {
    const value = await storage?.get(KEY)
    if (value) setSettings(value)
  }, [])

  const setLanguage = useCallback(async (lang: string) => {
    setSettings((prev) => ({ ...prev, lang }))
  }, [])

  const setDarkMode = useCallback(async (darkMode: boolean) => {
    setSettings((prev) => ({ ...prev, darkMode }))
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
    setSettings(SETTINGS)
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
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsProvider }