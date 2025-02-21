import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import useStorageState from '../hooks/useStorageState'
import AppSettings, { APP_SETTINGS } from '../models/AppSettings'
import { Translation, useTranslationChange } from 'i18nano'
import packageJson from '../../package.json'

const SettingsPage: React.FC = () => {
  const { change, preload } = useTranslationChange()
  const [settings, setSettings] =
    useStorageState<AppSettings>('settings', APP_SETTINGS)
  const [workerToUpdate, setWorkerToUpdate] = useState<ServiceWorker>()

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        if (registration?.waiting) {
          setWorkerToUpdate(registration.waiting)
        }
      })
    }
  }, [])

  const updateApp = () => {
    workerToUpdate?.postMessage({ type: 'SKIP_WAITING' })
    window.location.reload()
  }

  const renderUpdateButton = () =>
    <IonList inset={true}>
      <IonItem color="light" button={true} detail={false} onClick={updateApp}>
        <IonLabel color="primary">
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
        <IonList inset={true}>
          <IonItem color="light">
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
        </IonList>

        {workerToUpdate && renderUpdateButton()}

        <div className="ion-text-center">
          <IonNote>
            <Translation path="settings.version" /> {packageJson.version}
          </IonNote>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SettingsPage