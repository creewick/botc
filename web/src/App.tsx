import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
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

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css'

/* Theme variables */
import './theme/variables.css'
import './App.css'

import HomePage from './pages/HomePage'
import WikiPage from './pages/WikiPage'
import React, { Suspense, useEffect } from 'react'
import RolesPage from './pages/wiki/RolesPage'
import SettingsPage from './pages/SettingsPage'
import { Translation, TranslationProvider, useTranslationChange } from 'i18nano'
import { APP_SETTINGS } from './models/AppSettings'
import useStorageState from './hooks/useStorageState'
import { locales } from './locales/locales'
import ScriptsPage from './pages/wiki/ScriptsPage'

setupIonicReact({ mode: 'ios' })

const App: React.FC = () => {
  const { change, preload } = useTranslationChange()
  const [appSettings] = useStorageState('settings', APP_SETTINGS)

  useEffect(() => {
    preload(appSettings.lang)
    change(appSettings.lang)
  }, [appSettings.lang])

  return (
    <IonApp>
      <IonReactHashRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home">
              <TranslationProvider translations={locales.home}>
                <HomePage />
              </TranslationProvider>
            </Route>
            <Route exact path="/wiki">
              <TranslationProvider translations={locales.wiki}>
                <WikiPage />
              </TranslationProvider>
            </Route>
            <Route exact path="/wiki/roles/:id?">
              <TranslationProvider translations={locales.characters}>
                <Suspense>
                  <RolesPage />
                </Suspense>
              </TranslationProvider>
            </Route>
            <Route exact path="/wiki/scripts">
              <TranslationProvider translations={locales.scripts}>
                <Suspense>
                  <ScriptsPage />
                </Suspense>              
              </TranslationProvider>
            </Route>
            <Route exact path="/settings">
              <TranslationProvider translations={locales.settings}>
                <SettingsPage />
              </TranslationProvider>
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={home} />
                <IonLabel>
                  <Translation path="home" />
                </IonLabel>
              </IonTabButton>
              <IonTabButton tab="wiki" href="/wiki">
                <IonIcon icon={book} />
                <IonLabel>
                  <Translation path="wiki" />
                </IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab3" href="/tab3" disabled>
                <IonIcon icon={dice} />
                <IonLabel>
                  <Translation path="table" />
                </IonLabel>
              </IonTabButton>
              <IonTabButton tab="settings" href="/settings">
                <IonIcon icon={settings} />
                <IonLabel>
                  <Translation path="settings" />
                </IonLabel>
              </IonTabButton>
            </IonTabBar>
        </IonTabs>
      </IonReactHashRouter>
    </IonApp>
  )
}

export default App
