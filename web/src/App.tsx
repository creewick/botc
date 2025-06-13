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
import { book, dice, settings } from 'ionicons/icons'

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
import { Translation, useTranslationChange } from 'i18nano'
import { useDarkMode } from './hooks/useDarkMode'
import { useSettings } from './hooks/useSettings'
import { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { WikiPage } from './pages/wiki/WikiPage'
import { RolesPage } from './pages/wiki/RolesPage'
import { locales } from './locales/locales'
import { Locale } from './components/Locale'
import { RolePage } from './pages/wiki/RolePage'
import { GamePage } from './pages/games/GamePage'

const mode = /Chrome/.test(navigator.userAgent) ? 'md' : 'ios'
setupIonicReact({ mode })

const App: React.FC = () => {
  const { settings: s } = useSettings()
  const { change } = useTranslationChange()

  useEffect(() => change(s.lang), [s.lang, change])
  useDarkMode()

  const renderTab = (name: string, icon: string) =>
    <IonTabButton tab={name} href={`/${name}`}>
      <IonIcon aria-hidden="true" icon={icon} />
      <IonLabel>
        <Translation path={`tab.${name}`} />
      </IonLabel>
    </IonTabButton>

  return (
    <IonApp>
      <IonReactHashRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/wiki" exact component={WikiPage} />
            <Route path="/wiki/roles" exact render={() =>
              <Locale locales={locales.roles}>
                <RolesPage />
              </Locale>
            } />
            <Route path="/wiki/role/:id" exact render={() =>
              <Locale locales={locales.roles}>
                <RolePage />
              </Locale>
            } />
            <Route path="/test" exact component={GamePage} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom" translucent>
            {renderTab('wiki', book)}
            {renderTab('games', dice)}
            {renderTab('settings', settings)}
          </IonTabBar>
        </IonTabs>
      </IonReactHashRouter>
    </IonApp>
  )
}

export default App
