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

const WikiPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wiki</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Wiki</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonListHeader>Sections</IonListHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="4" className="ion-no-padding">
              <SectionCard
                routerLink="/wiki/rules"
                icon={book}
                title="Rules"
                subtitle="Game rules and mechanics"
              />
            </IonCol>
            <IonCol size="12" sizeMd="4" className="ion-no-padding">
              <SectionCard
                routerLink="/wiki/roles"
                icon={person}
                title="Characters"
                subtitle="Character abilities and roles"
              />
            </IonCol>
            <IonCol size="12" sizeMd="4" className="ion-no-padding">
              <SectionCard
                routerLink="/wiki/scripts"
                icon={document}
                title="Scripts"
                subtitle="Game scripts and scenarios"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default WikiPage