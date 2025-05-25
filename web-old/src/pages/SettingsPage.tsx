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
  IonProgressBar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import React, { useContext, useEffect, useState } from 'react'
import { Translation, useTranslation } from 'i18nano'
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
import { SettingsContext } from '../contexts/SettingsContext'

const SettingsPage: React.FC = () => {
  const [workerToUpdate, setWorkerToUpdate] = useState<ServiceWorker>()
  const [loading, setLoading] = useState(false)
  const t = useTranslation()
  const {
    settings,
    setLanguage,
    setDarkMode,
    checkForUpdates,
    updateApp,
    clearStorage,
  } = useContext(SettingsContext)

  useEffect(() => void checkForUpdate(), [])

  const checkForUpdate = async () => {
    setLoading(true)
    const serviceWorker = await checkForUpdates()
    setTimeout(() => setLoading(false), 1000)
    setWorkerToUpdate(serviceWorker)
  }

  const renderUpdateButton = () =>
    <IonList inset={true}>
      <IonItem
        color='primary'
        button={true}
        detail={false}
        onClick={() => updateApp(workerToUpdate!)}
      >
        <IonIcon slot='start' icon={refreshOutline} />
        <IonLabel>
          <Translation path='settings.update' />
        </IonLabel>
      </IonItem>
    </IonList>

  const alertButtons = [
    {
      text: t('actions.cancel'),
      role: 'cancel'
    },
    {
      text: t('actions.delete'),
      role: 'destructive',
      handler: clearStorage
    }
  ]

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <Translation path='settings.title' />
          </IonTitle>
        </IonToolbar>
        {loading && <IonProgressBar type='indeterminate' />}
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>
              <Translation path='settings.title' />
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        {workerToUpdate && renderUpdateButton()}

        <IonList inset>
          <IonItem color='light'>
            <IonIcon slot='start' icon={languageOutline} />
            <Translation path='settings.language' />
            <IonSelect
              slot='end'
              interface='popover'
              value={settings.lang}
              onIonChange={(e) => setLanguage(e.target.value)}
            >
              <IonSelectOption value='en'>
                English
              </IonSelectOption>
              <IonSelectOption value='ru'>
                Русский
              </IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem color='light'>
            <IonIcon slot='start' icon={contrastOutline} />
            <Translation path='settings.darkMode.title' />
            <IonSelect
              slot='end'
              interface='popover'
              value={settings.darkMode}
              onIonChange={(e) => setDarkMode(e.target.value)}
            >
              <IonSelectOption value={true}>
                <Translation path='settings.darkMode.true' />
              </IonSelectOption>
              <IonSelectOption value={false}>
                <Translation path='settings.darkMode.false' />
              </IonSelectOption>
              <IonSelectOption value={null}>
                <Translation path='settings.darkMode.null' />
              </IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        <IonList inset={true}>
          <IonItem color='light' disabled>
            <IonIcon slot='start' icon={logInOutline} />
            <Translation path='settings.import' />
          </IonItem>
          <IonItem color='light' disabled>
            <IonIcon slot='start' icon={logOutOutline} />
            <Translation path='settings.export' />
          </IonItem>
          <IonItem color='light' id='clear-data'>
            <IonIcon color='danger' slot='start' icon={trashOutline} />
            <IonLabel color='danger'>
              <Translation path='settings.clear' />
            </IonLabel>
          </IonItem>
        </IonList>

        <IonList inset={true}>
          <IonItem color='light' href='https://github.com/creewick/botc'>
            <IonIcon slot='start' icon={logoGithub} />
            <Translation path='settings.github' />
          </IonItem>
          <IonItem
            color='light'
            href='https://github.com/creewick/botc/issues/new'
          >
            <IonIcon slot='start' icon={bugOutline} />
            <Translation path='settings.bug' />
          </IonItem>
          <IonItem
            button
            detail={false}
            color='light'
            onClick={checkForUpdate}
            disabled={loading}
          >
            <IonIcon slot='start' icon={refreshOutline} />
            <Translation path='settings.checkForUpdates' />
          </IonItem>
        </IonList>

        <div className='ion-text-center'>
          <IonNote>
            <Translation path='settings.version' /> {packageJson.version}
          </IonNote>
        </div>

        <IonAlert
          trigger='clear-data'
          header={t('actions.deleteAllData') + '?'}
          message={t('actions.youCantUndoThisAction')}
          buttons={alertButtons}
        />
      </IonContent>
    </IonPage>
  )
}

export default SettingsPage