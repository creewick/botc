import { IonItem, IonIcon, IonSelect, IonSelectOption } from '@ionic/react'
import { Translation } from 'i18nano'
import { languageOutline } from 'ionicons/icons'
import React from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import useSafeContext from '../../hooks/useSafeContext'

const LanguageSelect: React.FC = () => {
  const { settings, updateSettings } = useSafeContext(SettingsContext)

  return (
    <IonItem color='light'>
      <IonIcon slot='start' icon={languageOutline} />
      <Translation path='settings.language.title' />
      <IonSelect
        slot='end'
        interface='popover'
        value={settings.lang}
        onIonChange={(e) => updateSettings({ lang: e.detail.value })}
      >
        <IonSelectOption value='en'>English</IonSelectOption>
        <IonSelectOption value='ru'>Русский</IonSelectOption>
      </IonSelect>
    </IonItem>
  )
}

export default LanguageSelect