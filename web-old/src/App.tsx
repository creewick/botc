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
import { book, dice, home, settings, statsChart } from 'ionicons/icons'
import HomePage from './pages/HomePage'
import WikiPage from './pages/WikiPage'
import React, { Suspense, useContext, useEffect } from 'react'
import RolesPage from './pages/wiki/RolesPage'
import SettingsPage from './pages/SettingsPage'
import { Translation, TranslationProvider, useTranslationChange } from 'i18nano'
import ScriptsPage from './pages/wiki/ScriptsPage'
import { locales } from './locales/locales'
import ScriptPage from './pages/wiki/scripts/ScriptPage'
import GamesPage from './pages/GamesPage'
import GamePage from './pages/games/GamePage'
import useDarkMode from './hooks/useDarkMode'

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
// import { SettingsContext } from './contexts/SettingsContext'

const mode = /Chrome/.test(navigator.userAgent) ? 'md' : 'ios'
// const mode = 'md'

setupIonicReact({ mode })


const App: React.FC = () => {
  // const { settings: appSettings } = useContext(SettingsContext)
  // const { change } = useTranslationChange()

  // useEffect(() => change(appSettings.lang), [appSettings.lang])
  useDarkMode()

  const renderTab = (name: string, icon: string, disabled = false) =>
    <IonTabButton tab={name} href={`/${name}`} disabled={disabled}>
      <IonIcon icon={icon} />
      <IonLabel>
        <Translation path={`tabs.${name}`} />
      </IonLabel>
    </IonTabButton>

  return (
    <IonApp>
      <IonReactHashRouter>
        <IonTabs>
          <IonRouterOutlet>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            {renderTab('home', home)}
            {renderTab('wiki', book)}
            {renderTab('games', dice)}
            {renderTab('trends', statsChart, true)}
            {renderTab('settings', settings)}
          </IonTabBar>
        </IonTabs>
      </IonReactHashRouter>
    </IonApp>
  )
}

export default App
