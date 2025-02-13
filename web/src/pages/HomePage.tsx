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

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blood on the ClockTower</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blood on the ClockTower</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonListHeader>Official Links</IonListHeader>
        <IonGrid>
          <IonRow>
            <IonCol size="12" sizeMd="6" className="ion-no-padding">
              <SectionCard
                href="https://bloodontheclocktower.com"
                icon={home}
                title="Website"
                subtitle="Official website of the game"
              />
            </IonCol>
            <IonCol size="12" sizeMd="6" className="ion-no-padding">
              <SectionCard
                href="https://wiki.bloodontheclocktower.com"
                icon={book}
                title="Wiki"
                subtitle="Game rules, character abilities, and more"
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" sizeMd="6" className="ion-no-padding">
              <SectionCard
                href="https://script.bloodontheclocktower.com"
                icon={build}
                title="Script Tool"
                subtitle="Script generator 
                  with JSON import, JSON and PDF export"
              />
            </IonCol>
            <IonCol size="12" sizeMd="6" className="ion-no-padding">
              <SectionCard
                href="https://botc.app"
                icon={play}
                title="Online Client"
                subtitle="Play online on a virtual table 
                  with an integrated voice chat"
              />
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  )
}

export default HomePage