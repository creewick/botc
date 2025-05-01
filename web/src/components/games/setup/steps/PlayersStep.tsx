import React from 'react'
import { useParams } from 'react-router'
import { GamesContext } from '../../../../contexts/GamesProvider'
import useSafeContext from '../../../../hooks/useSafeContext'
import {
  IonContent,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
} from '@ionic/react'
import Player from '../../../../models/player/Player'
import { addCircle, closeCircle } from 'ionicons/icons'
import Input from '../../../common/suspense/Input'
import PlayerStatus from '../../../../enums/PlayerStatus'

const PlayersStep: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { games, updateGame } = useSafeContext(GamesContext)
  const game = games[id] ?? undefined

  async function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    await updateGame(id, { players: event.detail.complete(game.players) })
  }

  async function setName(player: Player, name?: string | null) {
    if (!name) return
    player.name = name
    await updateGame(id, { players: game.players })
  }

  async function addPlayer(event: CustomEvent) {
    const name = event.detail.value.trim()
    if (!name) return

    (event.target as HTMLIonInputElement).value = ''

    const player: Player = {
      id: crypto.randomUUID(),
      name,
      status: PlayerStatus.Alive,
      roles: [],
      pings: [],
    }
    await updateGame(id, { players: [...game.players, player] })
  }

  async function removePlayer(player: Player) {
    await updateGame(id, { players: game.players.filter((p: Player) => p !== player) })
  }

  const renderPlayer = (player: Player) =>
    <IonItem key={player.id}>
      <IonIcon slot='start' icon={closeCircle} color='danger' onClick={() => removePlayer(player)} />
      <IonInput
        id={player.id}
        value={player.name}
        autocapitalize='on'
        onIonChange={(e) => setName(player, e.detail.value)}
      />
      <IonReorder className="ion-padding-start" slot="end" />
    </IonItem>

  return (
    <IonContent fullscreen>
      <IonList>
        <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
          {game.players.map(renderPlayer)}
        </IonReorderGroup>
        <IonItem>
          <IonIcon slot='start' icon={addCircle} color='success' />
          <Input autocapitalize='on' path="games.addPlayer" onIonChange={addPlayer} />
        </IonItem>
      </IonList>
    </IonContent>
  )
}

export default PlayersStep