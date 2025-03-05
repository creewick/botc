import React, { useRef } from 'react'
import Player from '../../models/games/Player'
import {
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonReorder,
  IonReorderGroup,
  ItemReorderEventDetail
} from '@ionic/react'
import Token from '../Token'

import { addCircleOutline, heart, moon, sunny, trashBin } from 'ionicons/icons'
import { useTranslation } from 'i18nano'
import PlayerStatus from '../../models/games/PlayerStatus'

interface Props {
  editMode: boolean
  players: Player[]
  setPlayers: (players: Player[]) => Promise<void>
  openPlayer: (player: Player) => void
}

const PlayerList: React.FC<Props> = ({ editMode, players, setPlayers, openPlayer }: Props) => {
  const list = useRef<HTMLIonListElement>(null)
  const t = useTranslation()

  function handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    setPlayers(event.detail.complete(players))
  }

  function addPlayer(event: CustomEvent) {
    const name = event.detail.value.trim()
    if (!name) return

    (event.target as HTMLIonInputElement).value = ''
    const player: Player = {
      name,
      status: PlayerStatus.Alive,
      roles: [],
    }
    setPlayers([...players, player])
  }

  function removePlayer(player: Player) {
    setPlayers(players.filter(p => p !== player))
    list.current?.closeSlidingItems()
  }

  function setPlayerStatus(player: Player, value: PlayerStatus) {
    player.status = value
    setPlayers([...players])
    list.current?.closeSlidingItems()
  }

  const renderPlayer = (player: Player, index: number) =>
    <IonItemSliding key={index}>
      <IonItem button detail={false} onClick={() => openPlayer(player)}>
        <span slot='start' style={{ marginBottom: 0 }}>
          <Token
            size={48}
            roleId={player.roles[player.roles.length - 1]}
            status={player.status}
            hideTitle
          />
        </span>
        <IonLabel style={{ minHeight: 38 }}>
          <h2 className='ion-text-nowrap' style={{ fontWeight: 600 }}>{player.name}</h2>
          <p className='ion-text-nowrap'>{player.note}</p>
        </IonLabel>
        <IonReorder className="ion-padding-start" slot="end" />
      </IonItem>
      <IonItemOptions side='start'>
        {player.status === PlayerStatus.Alive &&
          <>
            <IonItemOption color='dark' onClick={() => setPlayerStatus(player, PlayerStatus.Killed)}>
              <IonIcon slot='icon-only' icon={moon} />
            </IonItemOption>
            <IonItemOption color='medium' onClick={() => setPlayerStatus(player, PlayerStatus.Executed)}>
              <IonIcon slot='icon-only' icon={sunny} />
            </IonItemOption>
          </>
        }
        {player.status !== PlayerStatus.Alive &&
          <IonItemOption color='primary' onClick={() => setPlayerStatus(player, PlayerStatus.Alive)}>
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
    <IonList ref={list}>
      <IonReorderGroup disabled={!editMode} onIonItemReorder={handleReorder}>
        {players?.map(renderPlayer)}
      </IonReorderGroup>
      {editMode &&
        <IonItem>
          <IonIcon style={{ width: 48 }} size='large' slot='start' icon={addCircleOutline} color='primary' />
          <IonInput placeholder={t('games.addPlayer')} onIonChange={addPlayer} />
        </IonItem>
      }
    </IonList>
  )
}

export default PlayerList