import {
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import React from 'react'
import useStorageState from '../hooks/useStorageState'
import AppSettings, { DEFAULT_APP_SETTINGS } from '../models/AppSettings'

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = 
    useStorageState<AppSettings>('settings', DEFAULT_APP_SETTINGS)

  const setLanguage = async (event: Event) => {
    const target = event.target as HTMLIonSelectElement
    const value = target.value
    await setSettings({ ...settings, lang: value })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList inset={true}>
          <IonItem color="light">
            Language
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
      </IonContent>
    </IonPage>
  )
}

export default SettingsPage