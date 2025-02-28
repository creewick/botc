import { useContext, useEffect } from 'react'
import { AppSettingsContext } from '../contexts/AppSettingsContext'

const DARK_MODE_CLASS = 'ion-palette-dark'
const DARK_MODE_MEDIA = '(prefers-color-scheme: dark)'

function useDarkMode() {
  const { settings } = useContext(AppSettingsContext)
  function setDarkMode(value: boolean) {
    document.documentElement.classList.toggle(DARK_MODE_CLASS, value)
  }

  function darkModeChangesEventHandler(mediaQuery: MediaQueryListEvent) {
    setDarkMode(mediaQuery.matches)
  }

  useEffect(() => {
    if (settings.darkMode !== null)
      return setDarkMode(settings.darkMode)

    const mediaQuery = window.matchMedia(DARK_MODE_MEDIA)
    setDarkMode(mediaQuery.matches)

    mediaQuery.addEventListener('change', darkModeChangesEventHandler)

    return () =>
      mediaQuery.removeEventListener('change', darkModeChangesEventHandler)

  }, [settings.darkMode])
}

export default useDarkMode