import { Redirect, Route } from 'react-router-dom'
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact} from '@ionic/react'
import { IonReactHashRouter } from '@ionic/react-router'
import { book, dice, home, settings, statsChart } from 'ionicons/icons'
import HomePage from './pages/home/index'
import WikiPage from './pages/wiki/index'
import React, { useEffect } from 'react'
import RolesPage from './pages/wiki/roles'
import SettingsPage from './pages/settings/index'
import { Translation, useTranslationChange } from 'i18nano'
import GamesPage from './pages/games/index'
import useDarkMode from './hooks/useDarkMode'

import '@ionic/react/css/core.css'
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'
import '@ionic/react/css/palettes/dark.class.css'

import './theme/variables.css'
import './App.css'
import { SettingsContext } from './contexts/SettingsContext'
import useSafeContext from './hooks/useSafeContext'
import GamePage from './pages/GamePage'

setupIonicReact({ mode: 'ios' })

const App: React.FC = () => {
  const { settings: appSettings } = useSafeContext(SettingsContext)
  const { change } = useTranslationChange()

  useEffect(() => change(appSettings.lang), [appSettings.lang])
  useDarkMode()

  const renderTab = (name: string, icon: string, disabled = false) =>
    <IonTabButton tab={name} href={`/${name}`} disabled={disabled}>
      <IonIcon icon={icon} />
      <IonLabel>
        <Translation path={`tabs.${name}`} />
      </IonLabel>
    </IonTabButton>

  return (
    <IonApp >
      <IonReactHashRouter>
        {/* <IonSplitPane when="md" contentId="main">
          <IonMenu contentId="main">
            <IonHeader>
              <IonToolbar>
                <IonTitle className='ion-no-padding'>
                  <Translation path="home.title" />
                </IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <Sidebar />
            </IonContent>
          </IonMenu>
        </IonSplitPane> */}
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home" render={() => <HomePage />} />
            <Route exact path="/wiki" render={() => <WikiPage />} />
            <Route exact path="/wiki/roles/:id?" render={() => <RolesPage />} />
            <Route exact path="/games" render={() => <GamesPage />} />
            <Route exact path="/settings" render={() => <SettingsPage />} />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/games/:id" render={() => <GamePage />} />
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
