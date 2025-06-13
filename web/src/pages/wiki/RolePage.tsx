import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { Translation } from 'i18nano'
import { useParams } from 'react-router-dom'

export const RolePage: React.FC = () => {
  const { id } = useParams<{ id?: string }>()

  return (
    <IonPage>
      <IonHeader collapse='fade' translucent>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton />
          </IonButtons>
          <IonTitle>
            <Translation path={`${id}.name`} />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>
              <Translation path={`${id}.name`} />
            </IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  )
}