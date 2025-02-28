import React from 'react'
import Player from '../../models/games/Player'
import {
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail
} from '@ionic/react'
import Token from '../Token'
import Game from '../../models/games/Game'
import { addCircleOutline } from 'ionicons/icons'
import { Translation, useTranslation } from 'i18nano'
import PlayerStatus from '../../models/games/PlayerStatus'

interface Props {
  game: Game
  setGame: (game: Game) => void
  openPlayer: (player: Player) => void
}

const PlayerList: React.FC<Props> = ({
  game, openPlayer, setGame
}: Props) => {
  const t = useTranslation()

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    setGame({ ...game, players: event.detail.complete(game.players) })
  }

  function renderPlayer(player: Player, index: number) {
    const rename = (event: Event) => {
      const name = (event.target as HTMLInputElement).value
      const newPlayers = [...game.players]
      newPlayers[index].name = name
      setGame({ ...game, players: newPlayers })
    }

    return (
      <IonItem color='light' key={index}>
        <span slot='start' onClick={() => openPlayer(player)}>
          <Token
            size={36}
            roleId={player.roles[player.roles.length - 1]}
            status={player.status}
            hideTitle
          />
        </span>
        <IonInput
          placeholder={t('games.players.name')}
          value={player.name}
          onIonChange={rename}
          autocapitalize='on'
        />
        <IonReorder className="ion-padding-start" slot="end" />
      </IonItem>
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
      <IonReorderGroup disabled={false} onIonItemReorder={handleReorder}>
        {game.players?.map(renderPlayer)}
      </IonReorderGroup>
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