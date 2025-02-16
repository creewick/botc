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
import { book, build, home, play } from 'ionicons/icons'
import React from 'react'
import { Translation } from 'i18nano'

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-no-padding">
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
          <Translation path="links" />
        </IonListHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6" className="ion-no-padding">
              <SectionCard
                href="https://bloodontheclocktower.com"
                icon={home}
                title="website.title"
                subtitle="website.subtitle"
              />
            </IonCol>
            <IonCol size="12" sizeMd="6" className="ion-no-padding">
              <SectionCard
                href="https://wiki.bloodontheclocktower.com"
                icon={book}
                title="wiki.title"
                subtitle="wiki.subtitle"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" sizeMd="6" className="ion-no-padding">
              <SectionCard
                href="https://script.bloodontheclocktower.com"
                icon={build}
                title="scriptTool.title"
                subtitle="scriptTool.subtitle"
              />
            </IonCol>
            <IonCol size="12" sizeMd="6" className="ion-no-padding">
              <SectionCard
                href="https://botc.app"
                icon={play}
                title="onlineClient.title"
                subtitle="onlineClient.subtitle"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default HomePage