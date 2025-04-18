import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonProgressBar,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import React, { Suspense, useEffect, useState } from 'react'
import { Translation } from 'i18nano'
import packageJson from '../../../package.json'
import { bugOutline, logInOutline, logoGithub, logOutOutline, refreshOutline } from 'ionicons/icons'
import { SettingsContext } from '../../contexts/SettingsContext'
import useSafeContext from '../../hooks/useSafeContext'
import LanguageSelect from '../../components/settings/LanguageSelect'
import DarkModeSelect from '../../components/settings/DarkModeSelect'
import ClearStorageButton from '../../components/settings/ClearStorageButton'

const SettingsPage: React.FC = () => {
  const { checkForUpdates, updateApp } = useSafeContext(SettingsContext)
  const [worker, setWorker] = useState<ServiceWorker>()
  const [loading, setLoading] = useState(false)

  useEffect(() => void checkForUpdate(), [])

  const checkForUpdate = async () => {
    setLoading(true)
    const worker = await checkForUpdates()
    setTimeout(() => setLoading(false), 1000)
    setWorker(worker)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <Translation path='tabs.settings' />
          </IonTitle>
        </IonToolbar>

      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>
              <Translation path='tabs.settings' />
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList inset>
          {loading && <IonProgressBar type='indeterminate' />}
          {worker ?
            <IonItem color='primary' button detail={false} onClick={() => updateApp(worker)}>
              <IonIcon slot='start' icon={refreshOutline} />
              <IonLabel>
                <Translation path='settings.update' />
              </IonLabel>
            </IonItem>
            : 
            <IonItem button detail={false} color='light' onClick={checkForUpdate} disabled={loading}>
              <IonIcon slot='start' icon={refreshOutline} />
              <Translation path='settings.checkForUpdates' />
            </IonItem>
          }
        </IonList>
        <IonList inset>
          <LanguageSelect />
          <DarkModeSelect />
        </IonList>
        <IonList inset>
          <IonItem color='light' disabled>
            <IonIcon slot='start' icon={logInOutline} />
            <Translation path='settings.import' />
          </IonItem>
          <IonItem color='light' disabled>
            <IonIcon slot='start' icon={logOutOutline} />
            <Translation path='settings.export' />
          </IonItem>
          <Suspense>
            <ClearStorageButton />
          </Suspense>
        </IonList>
        <IonList inset>
          <IonItem color='light' href='https://github.com/creewick/botc'>
            <IonIcon slot='start' icon={logoGithub} />
            <Translation path='settings.github' />
          </IonItem>
          <IonItem color='light' href='https://github.com/creewick/botc/issues/new'>
            <IonIcon slot='start' icon={bugOutline} />
            <Translation path='settings.bug' />
          </IonItem>
        </IonList>
        <div className='ion-text-center'>
          <IonNote>
            <Translation path='settings.version' /> {packageJson.version}
          </IonNote>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default SettingsPage