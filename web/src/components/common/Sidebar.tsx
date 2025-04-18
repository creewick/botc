import { IonList } from '@ionic/react'
import { home, book, person, document, dice, statsChart, settings } from 'ionicons/icons'
import React from 'react'
import Section from './Section'

const Sidebar: React.FC = () => (
  <>
    <IonList inset={true}>
      <Section href='botc/#/home' icon={home} title='tabs.home' />
    </IonList>
    <IonList inset={true}>
      <Section href="botc/#/wiki/rules" icon={book} path="wiki.sections.rules" disabled />
      <Section href="botc/#/wiki/roles" icon={person} path="wiki.sections.characters" />
      <Section href="botc/#/wiki/scripts" icon={document} path="wiki.sections.scripts" />
    </IonList>
    <IonList inset={true}>
      <Section href='botc/#/games' icon={dice} title='tabs.games' />
    </IonList>
    <IonList inset={true}>
      <Section href='botc/#/trends' icon={statsChart} title='tabs.trends' disabled />
    </IonList>
    <IonList inset={true}>
      <Section href='botc/#/settings' icon={settings} title='tabs.settings' />
    </IonList>
  </>
)

export default Sidebar