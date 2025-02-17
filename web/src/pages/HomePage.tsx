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
            <Translation path="home.title" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              <Translation path="home.title" />
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonListHeader>
          <Translation path="home.links" />
        </IonListHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6" className="ion-no-padding">
              <SectionCard
                href="https://bloodontheclocktower.com"
                icon={home}
                title="home.website.title"
                subtitle="home.website.subtitle"
              />
            </IonCol>
            <IonCol size="12" sizeMd="6" className="ion-no-padding">
              <SectionCard
                href="https://wiki.bloodontheclocktower.com"
                icon={book}
                title="home.wiki.title"
                subtitle="home.wiki.subtitle"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" sizeMd="6" className="ion-no-padding">
              <SectionCard
                href="https://script.bloodontheclocktower.com"
                icon={build}
                title="home.scriptTool.title"
                subtitle="home.scriptTool.subtitle"
              />
            </IonCol>
            <IonCol size="12" sizeMd="6" className="ion-no-padding">
              <SectionCard
                href="https://botc.app"
                icon={play}
                title="home.onlineClient.title"
                subtitle="home.onlineClient.subtitle"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default HomePage