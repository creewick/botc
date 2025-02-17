import { 
  IonCol, 
  IonContent, 
  IonGrid, 
  IonHeader, 
  IonListHeader, 
  IonPage, 
  IonRow, 
  IonTitle, 
  IonToolbar 
} from '@ionic/react'
import SectionCard from '../components/SectionCard'
import { book, document, person } from 'ionicons/icons'
import React from 'react'
import { Translation } from 'i18nano'

const WikiPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <Translation path="title" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              <Translation path="title" />
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonListHeader>
          <Translation path="sections" />
        </IonListHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="4" className="ion-no-padding">
              <SectionCard
                routerLink="/wiki/rules"
                icon={book}
                title="rules.title"
                subtitle="rules.subtitle"
                disabled
              />
            </IonCol>
            <IonCol size="12" sizeMd="4" className="ion-no-padding">
              <SectionCard
                routerLink="/wiki/roles"
                icon={person}
                title="characters.title"
                subtitle="characters.subtitle"
              />
            </IonCol>
            <IonCol size="12" sizeMd="4" className="ion-no-padding">
              <SectionCard
                routerLink="/wiki/scripts"
                icon={document}
                title="scripts.title"
                subtitle="scripts.subtitle"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default WikiPage