import React, { Suspense } from 'react'
import Player from '../../models/player/Player'
import { IonButton, IonButtons, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import { Translation } from 'i18nano'
import PlayerView from './PlayerView'

interface Props {
  player?: Player
  close: () => void
}

const PlayerModal: React.FC<Props> = ({ player, close }) => (
  <IonModal
    isOpen={!!player}
    onDidDismiss={close}
    initialBreakpoint={0.4}
    breakpoints={[0, 0.4, 0.6, 1]}
    backdropBreakpoint={0.4}
  >
    {player && <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
          </IonButtons>
          <IonTitle>
            {player.name}
          </IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={close}>
              <Translation path='actions.close' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <Suspense>
        <PlayerView player={player} />
      </Suspense>
    </>}
  </IonModal>
)

export default PlayerModal