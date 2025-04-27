import React from 'react'
import Player from '../../models/player/Player'
import { IonButton, IonButtons, IonHeader, IonInput, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import { Translation } from 'i18nano'
import PlayerView from './PlayerView'
import PlayerDeleteAlert from './PlayerDeleteAlert'
import { GamesContext } from '../../contexts/GamesProvider'
import useSafeContext from '../../hooks/useSafeContext'

interface Props {
  gameId: string
  playerId?: string
  close: () => void
}

const PlayerModal: React.FC<Props> = ({ gameId, playerId, close }) => {
  const { games, updateGame } = useSafeContext(GamesContext)
  const player = playerId ? games[gameId].players.find(p => p.id === playerId) : undefined
  const alertTrigger = 'delete-player'

  const setPlayer = (changes: Partial<Player>) => {
    const newPlayer = { ...player, ...changes }
    updateGame(gameId, { players: games[gameId].players.map(p => p.id === player.id ? newPlayer : p) })
  }

  const setName = (e: CustomEvent) => setPlayer({ name: e.detail.value })

  return (
    <IonModal
      isOpen={!!player}
      onDidDismiss={close}
      initialBreakpoint={0.4}
      breakpoints={[0, 0.4, 0.6, 1]}
      backdropBreakpoint={0.4}
    >
      <div>
        {playerId && <>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot='start'>
                <IonButton color='danger' id={alertTrigger}>
                  <Translation path='actions.delete' />
                </IonButton>
              </IonButtons>
              <IonTitle>
                <IonInput
                  autocapitalize='on'
                  value={player.name}
                  onIonChange={setName}
                />
              </IonTitle>
              <IonButtons slot='end'>
                <IonButton onClick={close}>
                  <Translation path='actions.close' />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <PlayerView gameId={gameId} playerId={playerId} />
          <PlayerDeleteAlert gameId={gameId} playerId={playerId} trigger={alertTrigger} />
        </>}
      </div>
    </IonModal>
  )
}

export default PlayerModal