import {
  IonContent,
  IonHeader,
  IonImg,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import SectionListItem from '../components/SectionListItem'
import { book, build, home, play, trophy } from 'ionicons/icons'
import React from 'react'
import { Translation } from 'i18nano'

const HomePage: React.FC = () => (
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
      <IonText className="inset-list-title">
        <Translation path="home.world_cup.title" />
      </IonText>
      <IonList inset={true}>
        <SectionListItem
          href="https://botc.app/worldcup"
          icon={trophy}
          title="home.world_cup.title"
          subtitle="home.world_cup.subtitle" />
      </IonList>
      <IonText className="inset-list-title">
        <Translation path="home.links" />
      </IonText>
      
      <IonList inset={true}>
        <SectionListItem
          href="https://bloodontheclocktower.com"
          icon={home}
          title="home.website.title"
          subtitle="home.website.subtitle" />
        <SectionListItem
          href="https://wiki.bloodontheclocktower.com"
          icon={book}
          title="home.wiki.title"
          subtitle="home.wiki.subtitle" />
        <SectionListItem
          href="https://script.bloodontheclocktower.com"
          icon={build}
          title="home.scriptTool.title"
          subtitle="home.scriptTool.subtitle" />
        <SectionListItem
          href="https://botc.app"
          icon={play}
          title="home.onlineClient.title"
          subtitle="home.onlineClient.subtitle" />
      </IonList>
      <IonImg
        className="ion-text-center ion-margin-bottom"
        src="botc/assets/images/logo-180.png"
        style={{ height: 100, width: 100, margin: 'auto' }} />
    </IonContent>
  </IonPage>
)

export default HomePage