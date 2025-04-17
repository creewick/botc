import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react'
import { Translation } from 'i18nano'
import { refreshOutline } from 'ionicons/icons'
import React from 'react'

interface Props {
  updateApp: (worker: ServiceWorker) => void
  workerToUpdate?: ServiceWorker
}

const UpdateAppButton: React.FC<Props> = ({updateApp, workerToUpdate}) => workerToUpdate && (
  <IonList inset={true}>
    <IonItem color='primary' button detail={false} onClick={() => updateApp(workerToUpdate)}>
      <IonIcon slot='start' icon={refreshOutline} />
      <IonLabel>
        <Translation path='settings.update' />
      </IonLabel>
    </IonItem>
  </IonList>
)

export default UpdateAppButton