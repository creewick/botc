import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import Section from '../../components/common/Section'
import { book, document, person } from 'ionicons/icons'
import React from 'react'
import { Translation } from 'i18nano'

const WikiPage: React.FC = () => (
  <IonPage>
    <IonHeader collapse='fade'>
      <IonToolbar>
        <IonTitle>
          <Translation path="tabs.wiki" />
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">
            <Translation path="tabs.wiki" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList inset={true}>
        <Section routerLink="/wiki/rules" icon={book} path="wiki.sections.rules" disabled />
        <Section routerLink="/wiki/roles" icon={person} path="wiki.sections.characters" />
        <Section routerLink="/wiki/scripts" icon={document} path="wiki.sections.scripts" />
      </IonList>
    </IonContent>
  </IonPage>
)

export default WikiPage