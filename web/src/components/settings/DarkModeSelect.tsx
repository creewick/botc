import { IonItem, IonIcon, IonSelect, IonSelectOption } from '@ionic/react'
import { Translation } from 'i18nano'
import { contrastOutline } from 'ionicons/icons'
import React from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import useSafeContext from '../../hooks/useSafeContext'

const DarkModeSelect: React.FC = () => {
  const { settings, updateSettings } = useSafeContext(SettingsContext)

  return (
    <IonItem color='light'>
      <IonIcon slot='start' icon={contrastOutline} />
      <Translation path='settings.darkMode.title' />
      <IonSelect
        slot='end'
        interface='popover'
        value={settings.darkMode}
        onIonChange={(e) => updateSettings({ darkMode: e.detail.value })}
      >
        <IonSelectOption value={true}>
          <Translation path='settings.darkMode.true' />
        </IonSelectOption>
        <IonSelectOption value={false}>
          <Translation path='settings.darkMode.false' />
        </IonSelectOption>
        <IonSelectOption value={null}>
          <Translation path='settings.darkMode.null' />
        </IonSelectOption>
      </IonSelect>
    </IonItem>
  )
}

export default DarkModeSelect