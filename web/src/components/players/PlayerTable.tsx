import React from 'react'
import Player from '../../models/games/Player'
import Token from '../Token'
import RoleType from '../../../../cli/src/enums/RoleType'
import { Translation } from 'i18nano'

interface Props {
  players: Player[]
  openPlayer: (player: Player) => void
}

const PlayerTable: React.FC<Props> = ({ players, openPlayer }: Props) => {

  const getCount = (type: RoleType): number|undefined => {
    if (type === RoleType.Townsfolk) 
      return Math.floor((players.length - 1) / 3) * 2 + 1
    if (type === RoleType.Outsider)
      return (players.length - 1) % 3 - (players.length < 7 ? 1 : 0)
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

  return (
    <div className='circle-container'>
      <div>
        {Object.values(RoleType)
          .filter(type => ![RoleType.Fabled, RoleType.Traveler].includes(type))
          .map(type => 
            <div key={type}>
              { getCount(type) } {' '}
              <Translation path={`roles.types.${type.toLowerCase()}`} />
            </div>
        )}
      </div>
      {players.map(renderPlayer)}
    </div>
  )
}

export default PlayerTable