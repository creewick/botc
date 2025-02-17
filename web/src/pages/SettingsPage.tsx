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
import AppSettings, { APP_SETTINGS } from '../models/AppSettings'
import { Translation, useTranslationChange } from 'i18nano'

const SettingsPage: React.FC = () => {
  const { change, preload } = useTranslationChange()
  const [settings, setSettings] = 
    useStorageState<AppSettings>('settings', APP_SETTINGS)

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
      </IonContent>
    </IonPage>
  )
}

export default SettingsPage