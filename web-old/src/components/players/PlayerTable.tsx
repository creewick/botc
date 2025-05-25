import React from 'react'
import Player from '../../models/games/Player'
import Token from '../Token'
import RoleType from '../../../../cli/src/enums/RoleType'
import { IonGrid, IonImg, IonRow } from '@ionic/react'

interface Props {
  players: Player[]
  openPlayer: (player: Player) => void
}

const PlayerTable: React.FC<Props> = ({ players, openPlayer }: Props) => {

  const getCount = (type: RoleType): number | undefined => {
    if (type === RoleType.Townsfolk)
      return Math.max(0, Math.floor((players.length - 1) / 3) * 2 + 1)
    if (type === RoleType.Outsider)
      return Math.max(0, (players.length - 1) % 3 - (players.length < 7 ? 1 : 0))
    if (type === RoleType.Minion)
      return Math.max(1, Math.floor((players.length - 1) / 3) - 1)
    if (type === RoleType.Demon)
      return 1
  }

  const renderPlayer = (player: Player, index: number) => {
    const angle = (index / players.length) * (2 * Math.PI) + Math.PI / 2
    const width = Math.max(15, Math.min(30, (200 / players.length)))

    return (
      <div
        onClick={() => openPlayer(player)}
        key={index}
        style={{
          position: 'absolute',
          left: `${50 + Math.cos(angle) * (50 - width / 2)}%`,
          top: `${50 + Math.sin(angle) * (50 - width / 2)}%`,
          width: `${width}%`,
          height: `${width}%`,
          textAlign: 'center',
          transform: 'translate(-50%, -50%)',
        }}>
        <Token
          roleId={player.roles[player.roles.length - 1]}
          status={player.status}
        />
        <div style={{
          fontSize: `${width / 2}px`,
          fontWeight: 600,
          opacity: '0.8',
          position: 'relative',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          top: '-0.4rem'
        }}>
          {player.name}
        </div>
      </div>
    )
  }

  const renderType = (type: RoleType) =>
    <>
      <IonImg className='icon' src={`/botc/assets/icons/${type}.webp`} />
      {getCount(type)}
    </>

  return (
    <div className='circle-container'>
      {players.map(renderPlayer)}
      <IonGrid style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <IonRow className='ion-align-items-center'>
          {[RoleType.Townsfolk, RoleType.Outsider].map(renderType)}
        </IonRow>
        <IonRow className='ion-align-items-center'>
          {[RoleType.Minion, RoleType.Demon].map(renderType)}
        </IonRow>
      </IonGrid>
    </div>
  )
}

export default PlayerTable