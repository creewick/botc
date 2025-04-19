import {
  IonContent,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail,
} from '@ionic/react'
import { addCircleOutline, heart, moon, sunny, trashBin } from 'ionicons/icons'
import React, { useRef } from 'react'
import Player from '../../../models/player/Player'
import Token from '../../roles/Token'
import PlayerStatus from '../../../enums/PlayerStatus'
import { GamesContext } from '../../../contexts/GamesProvider'
import useSafeContext from '../../../hooks/useSafeContext'
import Game from '../../../models/Game'
import Input from '../../common/suspense/Input'

interface Props {
  gameId: string
  editMode: boolean
  onSelect: (player: Player) => void
}

const PlayersList: React.FC<Props> = ({ gameId, editMode, onSelect }) => {
  const { games, updateGame } = useSafeContext(GamesContext)
  const game = games[gameId] ?? {} as Game
  const list = useRef<HTMLIonListElement>(null)

  async function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    await updateGame(gameId, { players: event.detail.complete(game.players) })
  }

  async function setStatus(player: Player, status: PlayerStatus) {
    player.status = status
    await updateGame(gameId, { players: game.players })
    list.current?.closeSlidingItems()
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
    await updateGame(gameId, { players: [...game.players, player] })
  }

  async function removePlayer(player: Player) {
    await updateGame(gameId, { players: game.players.filter(p => p !== player) })
    list.current?.closeSlidingItems()
  }

  const renderPlayer = (player: Player, index: number) =>
    <IonItemSliding key={index}>
      <IonItem button detail={false} onClick={() => onSelect(player)}>
        <span slot='start' style={{ marginBottom: 0 }}>
          <Token size={38} roleId={player.roles[player.roles.length - 1]} status={player.status} />
        </span>
        <IonLabel>
          <h2 className='ion-text-nowrap' style={{ fontWeight: 600 }}>
            {player.name}
          </h2>
          <p className='ion-text-nowrap ion-hide-sm-down'>{player.note}</p>
        </IonLabel>
        <IonReorder className="ion-padding-start" slot="end" />
      </IonItem>
      <IonItemOptions side='start'>
        {player.status === PlayerStatus.Alive &&
          <>
            <IonItemOption color='dark' onClick={() => setStatus(player, PlayerStatus.Killed)}>
              <IonIcon slot='icon-only' icon={moon} />
            </IonItemOption>
            <IonItemOption color='medium' onClick={() => setStatus(player, PlayerStatus.Executed)}>
              <IonIcon slot='icon-only' icon={sunny} />
            </IonItemOption>
          </>
        }
        {player.status !== PlayerStatus.Alive &&
          <IonItemOption color='primary' onClick={() => setStatus(player, PlayerStatus.Alive)}>
            <IonIcon slot='icon-only' icon={heart} />
          </IonItemOption>
        }
      </IonItemOptions>
      <IonItemOptions side='end'>
        <IonItemOption color='danger' onClick={() => removePlayer(player)}>
          <IonIcon slot='icon-only' icon={trashBin} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>

  return (
    <IonContent fullscreen>
      <IonList ref={list}>
        <IonReorderGroup disabled={!editMode} onIonItemReorder={handleReorder}>
          {game.players?.map(renderPlayer)}
        </IonReorderGroup>
        {editMode &&
          <IonItem>
            <IonIcon style={{ width: 48 }} size='large' slot='start' icon={addCircleOutline} color='primary' />
            <Input autocapitalize='on' path="games.addPlayer" onIonChange={addPlayer} />
          </IonItem>
        }
      </IonList>
    </IonContent>
  )
}

export default PlayersList