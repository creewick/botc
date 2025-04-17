import { IonItem, IonIcon, IonLabel, IonAlert } from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'
import { trashOutline } from 'ionicons/icons'
import React from 'react'
import { SettingsContext } from '../../contexts/SettingsContext'
import useSafeContext from '../../hooks/useSafeContext'


const ClearStorageAction: React.FC = () => {
  const { clearStorage } = useSafeContext(SettingsContext)
  
  const t = useTranslation()

  const alertButtons = [
    {
      text: t('actions.cancel'),
      role: 'cancel'
    },
    {
      text: t('actions.delete'),
      role: 'destructive',
      handler: clearStorage
    }
  ]

  return (
    <>
      <IonItem color='light' id='clear-data'>
        <IonIcon color='danger' slot='start' icon={trashOutline} />
        <IonLabel color='danger'>
          <Translation path='settings.clear' />
        </IonLabel>
      </IonItem>
      <IonAlert
        trigger='clear-data'
        header={`${t('actions.deleteAllData')}?`}
        message={t('actions.youCantUndoThisAction')}
        buttons={alertButtons} />
    </>
  )
}

export default ClearStorageAction