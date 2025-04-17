import { IonContent, IonHeader, IonImg, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { book, build, home, play, trophy } from 'ionicons/icons'
import React from 'react'
import { Translation } from 'i18nano'
import './index.css'
import Section from '../../components/common/Section'

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
      <IonList inset={true}>
        <Section href="https://botc.app/worldcup" icon={trophy} path="home.sections.worldCup" />
      </IonList>
      <IonList inset={true}>
        <Section href="https://bloodontheclocktower.com" icon={home} path="home.sections.website" />
        <Section href="https://wiki.bloodontheclocktower.com" icon={book} path="home.sections.wiki" />
        <Section href="https://script.bloodontheclocktower.com" icon={build} path="home.sections.scriptTool" />
        <Section href="https://botc.app" icon={play} path="home.sections.client" />
      </IonList>
      <IonImg className="logo" src="botc/assets/images/logo-180.png" />
    </IonContent>
  </IonPage>
)

export default HomePage