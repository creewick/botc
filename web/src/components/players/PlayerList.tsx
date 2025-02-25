import React from 'react'
import Player from '../../models/games/Player'
import {
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList
} from '@ionic/react'
import RoleIcon from '../roles/RoleIcon'
import Game from '../../models/games/Game'
import { addCircleOutline } from 'ionicons/icons'
import { Translation } from 'i18nano'
import PlayerStatus from '../../models/games/PlayerStatus'

interface Props {
  game: Game
  setGame: (game: Game) => void
  openPlayer: (player: Player) => void
}

const PlayerList: React.FC<Props> = ({
  game, openPlayer, setGame
}: Props) => {
  function renderPlayer(player: Player, index: number) {
    const rename = (event: Event) => {
      const name = (event.target as HTMLInputElement).value
      const newPlayers = [...game.players]
      newPlayers[index].name = name
      setGame({ ...game, players: newPlayers })
    }

    const remove = () => {
      const newPlayers = [...game.players]
      newPlayers.splice(index, 1)
      setGame({ ...game, players: newPlayers })
    }

    return (
      <IonItemSliding key={player.name + index}>
        <IonItem color='light'>
          <span slot='start' onClick={() => openPlayer(player)}>
            <RoleIcon
              size={36}
              roleId={player.roles[player.roles.length - 1]}
              status={player.status}
              hideTitle
            />
          </span>
          <IonInput value={player.name} onIonChange={rename} />
        </IonItem>
        <IonItemOptions onIonSwipe={remove}>
          <IonItemOption color="danger" onClick={remove} expandable>
            <Translation path="actions.delete" />
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>
    )
  }

  const addPlayer = () => {
    setGame({
      ...game,
      players: [
        ...game.players,
        {
          name: '',
          status: PlayerStatus.Alive,
          roles: [],
        }
      ]
    })
  }

  return (
    <IonList inset>
      {game.players?.map(renderPlayer)}
      <IonItem color='light' onClick={addPlayer}>
        <IonIcon slot='start' icon={addCircleOutline} color='primary' />
        <IonLabel color='primary'>
          <Translation path='games.addPlayer' />
        </IonLabel>
      </IonItem>
    </IonList>
  )
}

export default PlayerList