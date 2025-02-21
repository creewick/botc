import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import SectionListItem from '../components/SectionListItem'
import { book, document, person } from 'ionicons/icons'
import React from 'react'
import { Translation } from 'i18nano'

const WikiPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <Translation path="wiki.title" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              <Translation path="wiki.title" />
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonText className="inset-list-title">
          <Translation path="wiki.sections" />
        </IonText>
        <IonList inset={true}>
          <SectionListItem
            routerLink="/wiki/rules"
            icon={book}
            title="wiki.rules.title"
            subtitle="wiki.rules.subtitle"
            disabled
          />
          <SectionListItem
            routerLink="/wiki/roles"
            icon={person}
            title="wiki.characters.title"
            subtitle="wiki.characters.subtitle"
          />
          <SectionListItem
            routerLink="/wiki/scripts"
            icon={document}
            title="wiki.scripts.title"
            subtitle="wiki.scripts.subtitle"
          />
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default WikiPage