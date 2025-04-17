import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import  { Settings, DEFAULT_SETTINGS } from '../models/Settings'
import { StorageContext } from './StorageContext'

interface SettingsContextType {
  settings: Settings
  updateSettings(value: Partial<Settings>): Promise<void>
  checkForUpdates(): Promise<ServiceWorker | undefined>
  updateApp(serviceWorker: ServiceWorker): void
  clearStorage(): Promise<void>
}

interface Props {
  children: React.ReactNode
}

const SettingsContext = createContext<SettingsContextType|null>(null)
SettingsContext.displayName = 'SettingsContext'

const MESSAGE_SKIP_WAITING = { type: 'SKIP_WAITING' }
const SERVICE_WORKER = 'serviceWorker'
const STATE_INSTALLED = 'installed'
const STORAGE_KEY = 'settings'

const SettingsProvider: React.FC<Props> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS)
  const storage = useContext(StorageContext)

  useEffect(() => void loadSettings(), [])
  useEffect(() => void storage?.set(STORAGE_KEY, settings), [settings])

  const loadSettings = async () => {
    const value = await storage?.get(STORAGE_KEY)
    if (value) setSettings(value)
  }

  const updateSettings = useCallback(async (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }))
  }, [])

  const checkForUpdates = useCallback(async () => {
    if (!(SERVICE_WORKER in navigator)) return undefined

    const registration = await navigator.serviceWorker.ready
    await registration.update()

    const installingWorker = registration.installing

    if (installingWorker) {
      return new Promise<ServiceWorker>((resolve) => {
        installingWorker.onstatechange = () => {
          if (installingWorker.state === STATE_INSTALLED) {
            resolve(installingWorker)
          }
        }
      })
    }

    return registration.waiting ?? undefined
  }, [])

  const updateApp = useCallback((serviceWorker: ServiceWorker) => {
    serviceWorker.postMessage(MESSAGE_SKIP_WAITING)
    window.location.reload()
  }, [])

  const clearStorage = useCallback(async () => {
    await storage?.clear()
    setSettings(DEFAULT_SETTINGS)
    window.location.reload()
  }, [storage])

  const value = useMemo(() => ({
    settings,
    updateSettings,
    checkForUpdates,
    updateApp,
    clearStorage
  }), [settings, updateSettings, checkForUpdates, updateApp, clearStorage])

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export { SettingsContext, SettingsProvider }