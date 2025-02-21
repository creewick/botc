import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react'
import { IonReactHashRouter } from '@ionic/react-router'
import { book, dice, home, settings } from 'ionicons/icons'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css' */
import '@ionic/react/css/palettes/dark.class.css'
// import '@ionic/react/css/palettes/dark.system.css'

/* Theme variables */
import './theme/variables.css'
import './App.css'

import HomePage from './pages/HomePage'
import WikiPage from './pages/WikiPage'
import React, { Suspense, useEffect, useState } from 'react'
import RolesPage from './pages/wiki/RolesPage'
import SettingsPage from './pages/SettingsPage'
import { Translation, TranslationProvider, useTranslationChange } from 'i18nano'
import { APP_SETTINGS } from './models/AppSettings'
import useStorageState from './hooks/useStorageState'
import ScriptsPage from './pages/wiki/ScriptsPage'
import { locales } from './locales/locales'
import ScriptPage from './pages/wiki/scripts/ScriptPage'
import GamesPage from './pages/GamesPage'

setupIonicReact({ mode: 'ios' })

const App: React.FC = () => {
  const { change, preload } = useTranslationChange()
  const [appSettings] = useStorageState('settings', APP_SETTINGS)
  const [workerToUpdate, setWorkerToUpdate] = useState<ServiceWorker>()

  useEffect(() => {
    if ('serviceWorker' in navigator)
      navigator.serviceWorker.ready.then((registration) => {
        if (registration?.waiting)
          setWorkerToUpdate(registration.waiting)
      })
  }, [])

  useEffect(() => {
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 1) return
      if (event.touches[0].pageX > 20 &&
        event.touches[0].pageX < window.innerWidth - 20) return
      event.preventDefault()
    }

    document.addEventListener('touchstart', handleTouchMove, { passive: false })

    return () => {
      document.removeEventListener('touchstart', handleTouchMove)
    }
  }, [])

  useEffect(() => {
    preload(appSettings.lang)
    change(appSettings.lang)
  }, [appSettings.lang])

  const setDarkMode = (isDark: boolean) => {
    document.documentElement.classList.toggle('ion-palette-dark', isDark)
  }

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')
    setDarkMode(prefersDark.matches)

    const setDarkPaletteFromMediaQuery = (mediaQuery: MediaQueryListEvent) => {
      setDarkMode(mediaQuery.matches)
    }

    prefersDark.addEventListener('change', setDarkPaletteFromMediaQuery)

    return () => {
      prefersDark.removeEventListener('change', setDarkPaletteFromMediaQuery)
    }
  }, [])

  return (
    <IonApp>
      <IonReactHashRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Suspense>
              <Route exact path="/home">
                <HomePage />
              </Route>
              <Route exact path="/wiki">
                <WikiPage />
              </Route>
              <Route exact path="/wiki/roles/:id?">
                <TranslationProvider translations={locales.roles}>
                  <RolesPage />
                </TranslationProvider>
              </Route>
              <Route exact path="/wiki/scripts">
                <TranslationProvider translations={locales.scripts}>
                  <ScriptsPage />
                </TranslationProvider>
              </Route>
              <Route exact path="/wiki/scripts/:id">
                <TranslationProvider translations={locales.scripts}>
                  <ScriptPage />
                </TranslationProvider>
              </Route>
              <Route exact path="/games">
                <GamesPage />
              </Route>
              <Route exact path="/settings">
                <SettingsPage />
              </Route>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </Suspense>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonLabel>
                <Translation path="tabs.home" />
              </IonLabel>
            </IonTabButton>
            <IonTabButton tab="wiki" href="/wiki">
              <IonIcon icon={book} />
              <IonLabel>
                <Translation path="tabs.wiki" />
              </IonLabel>
            </IonTabButton>
            <IonTabButton tab="games" href="/games">
              <IonIcon icon={dice} />
              <IonLabel>
                <Translation path="tabs.games" />
              </IonLabel>
            </IonTabButton>
            <IonTabButton tab="settings" href="/settings">
              {workerToUpdate &&
                <IonBadge color="primary">&nbsp;&nbsp;</IonBadge>
              }
              <IonIcon icon={settings} />
              <IonLabel>
                <Translation path="tabs.settings" />
              </IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactHashRouter>
    </IonApp>
  )
}

export default App
