import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSearchbar
} from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'
import React from 'react'

const ScriptsPage: React.FC = () => {
  const t = useTranslation()

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text={t('wiki')} />
          </IonButtons>
          <IonTitle>
            <Translation path='title' />
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              <Translation path='title' />
            </IonTitle>
          </IonToolbar>
          <IonSearchbar placeholder={t('search')} />
        </IonHeader>
       
      </IonContent>
    </IonPage>
  )
}

export default ScriptsPage