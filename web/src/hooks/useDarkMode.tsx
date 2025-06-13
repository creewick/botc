import { useEffect } from 'react'
import { useSettings } from './useSettings'

const DARK_MODE_CLASS = 'ion-palette-dark'
const DARK_MODE_MEDIA = '(prefers-color-scheme: dark)'

export const useDarkMode = () => {
  const { settings } = useSettings()

  useEffect(() => {
    const applyDarkMode = (value: boolean) => {
      document.documentElement.classList.toggle(DARK_MODE_CLASS, value)
    }

    const handler = (e: MediaQueryListEvent) => {
      applyDarkMode(e.matches)
    }

    if (typeof window === 'undefined') 
      return

    if (settings.darkMode !== null)
      return applyDarkMode(settings.darkMode)

    const mediaQuery = window.matchMedia(DARK_MODE_MEDIA)
    applyDarkMode(mediaQuery.matches)

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [settings.darkMode])
}