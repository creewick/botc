import { IonButtons, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import BackButton from '../../../components/common/suspense/BackButton'
import { Translation, TranslationProvider } from 'i18nano'
import { locales } from '../../../locales/locales'
import ScriptsList from '../../../components/scripts/ScriptsList'
import { useHistory } from 'react-router-dom'

const ScriptsPage: React.FC = () => {
  const history = useHistory()

  const onSelect = (id: string) => {
    history.push(`/wiki/scripts/${id}`)
  }

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar>
          <IonButtons slot='start'>
            <BackButton path='tabs.wiki' />
          </IonButtons>
          <IonTitle>
            <Translation path='wiki.sections.scripts.title' />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <TranslationProvider translations={locales.scripts}>
        <ScriptsList header title onSelect={onSelect} />
      </TranslationProvider>
    </IonPage>
  )
}

export default ScriptsPage