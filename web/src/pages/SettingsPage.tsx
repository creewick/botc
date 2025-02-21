import {
  IonAlert,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import useStorageState from '../hooks/useStorageState'
import { APP_SETTINGS } from '../models/AppSettings'
import { Translation, useTranslation, useTranslationChange } from 'i18nano'
import packageJson from '../../package.json'
import {
  bugOutline,
  contrastOutline,
  languageOutline,
  logInOutline,
  logoGithub,
  logOutOutline,
  refreshOutline,
  trashOutline
} from 'ionicons/icons'

const SettingsPage: React.FC = () => {
  const { change, preload } = useTranslationChange()
  const t = useTranslation()
  const [settings, setSettings, storage] = 
    useStorageState('settings', APP_SETTINGS)
  const [workerToUpdate, setWorkerToUpdate] = useState<ServiceWorker>()

  useEffect(() => {
    if ('serviceWorker' in navigator)
      navigator.serviceWorker.ready.then((registration) => {
        if (registration?.waiting)
          setWorkerToUpdate(registration.waiting)
      })
  }, [])

  const updateApp = () => {
    workerToUpdate?.postMessage({ type: 'SKIP_WAITING' })
    window.location.reload()
  }

  const renderUpdateButton = () =>
    <IonList inset={true}>
      <IonItem color="primary" button={true} detail={false} onClick={updateApp}>
        <IonIcon slot="start" icon={refreshOutline} />
        <IonLabel>
          <Translation path="settings.update" />
        </IonLabel>
      </IonItem>
    </IonList>

  const setLanguage = async (event: Event) => {
    const target = event.target as HTMLIonSelectElement
    const value = target.value
    await setSettings({ ...settings, lang: value })
    preload(value)
    change(value)
  }

  const setDarkMode = async (event: Event) => {
    const target = event.target as HTMLIonSelectElement
    const value = target.value
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')

    await setSettings({ ...settings, darkMode: value })
    document.documentElement.classList
      .toggle('ion-palette-dark', value ?? prefersDark.matches)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <Translation path="settings.title" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              <Translation path="settings.title" />
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        {workerToUpdate && renderUpdateButton()}

        <IonText className="inset-list-title">
          <Translation path="settings.title" />
        </IonText>
        <IonList inset={true}>
          <IonItem color="light">
            <IonIcon slot="start" icon={languageOutline} />
            <Translation path="settings.language" />
            <IonSelect slot="end" interface="popover"
              value={settings.lang} onIonChange={setLanguage}>
              <IonSelectOption value="en">
                English
              </IonSelectOption>
              <IonSelectOption value="ru">
                Русский
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem color="light">
            <IonIcon slot="start" icon={contrastOutline} />
            <Translation path="settings.darkMode.title" />
            <IonSelect slot="end" interface="popover"
              value={settings.darkMode} onIonChange={setDarkMode}>
              <IonSelectOption value={true}>
                <Translation path="settings.darkMode.true" />
              </IonSelectOption>
              <IonSelectOption value={false}>
                <Translation path="settings.darkMode.false" />
              </IonSelectOption>
              <IonSelectOption value={null}>
                <Translation path="settings.darkMode.null" />
              </IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        <IonText className="inset-list-title">
          <Translation path="settings.data" />
        </IonText>
        <IonList inset={true}>
          <IonItem color="light" disabled>
            <IonIcon slot="start" icon={logInOutline} />
            <Translation path="settings.import" />
          </IonItem>
          <IonItem color="light" disabled>
            <IonIcon slot="start" icon={logOutOutline} />
            <Translation path="settings.export" />
          </IonItem>
          <IonItem color="light" id="clear-data">
            <IonIcon color="danger" slot="start" icon={trashOutline} />
            <IonLabel color="danger">
              <Translation path="settings.clear" />
            </IonLabel>
          </IonItem>
        </IonList>

        <IonText className="inset-list-title">
          <Translation path="settings.about" />
        </IonText>
        <IonList inset={true}>
          <IonItem color="light" href="https://github.com/creewick/botc">
            <IonIcon slot="start" icon={logoGithub} />
            <Translation path="settings.github" />
          </IonItem>
          <IonItem
            color="light"
            href="https://github.com/creewick/botc/issues/new"
          >
            <IonIcon slot="start" icon={bugOutline} />
            <Translation path="settings.bug" />
          </IonItem>
        </IonList>

        <div className="ion-text-center">
          <IonNote>
            <Translation path="settings.version" /> {packageJson.version}
          </IonNote>
        </div>

        <IonAlert 
          trigger="clear-data" 
          header={t('actions.deleteAllData') + '?'}
          message={t('actions.youCantUndoThisAction')}
          buttons={[
            {
              text: t('actions.cancel'),
              role: 'cancel'
            }, {
              text: t('actions.delete'),
              role: 'destructive',
              handler: async () => {
                await storage?.clear()
                window.location.reload()
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  )
}

export default SettingsPage