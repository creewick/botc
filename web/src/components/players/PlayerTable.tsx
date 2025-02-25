import React from 'react'
import Player from '../../models/games/Player'
import RoleIcon from '../roles/RoleIcon'

interface Props {
  players: Player[]
  openPlayer: (player: Player) => void
}

const PlayerTable: React.FC<Props> = ({ players, openPlayer }: Props) => {

  const renderPlayer = (player: Player, index: number) => {
    const angle = (index / players.length) * (2 * Math.PI)
    const width = Math.max(15, Math.min(30, (220 / players.length)))

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
        <RoleIcon 
          roleId={player.roles[player.roles.length - 1]} 
          status={player.status} 
        />
        <span className='ion-text-nowrap' style={{
          fontSize: '0.6rem',
          fontWeight: 600,
          opacity: '0.8',
          position: 'relative',
          top: '-12px'
        }}>
          {player.name}
        </span>
      </div>
    )
  }

  return (
    <div className='circle-container'>
      {players.map(renderPlayer)}
    </div>
  )
}

export default PlayerTable