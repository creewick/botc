import React from 'react'
import Player from '../../../src/models/player/Player'
import Token from '../../../src/components/roles/Token'
import { IonContent } from '@ionic/react'

interface Props {
  players: Player[]
  openPlayer: (player: Player) => void
}

const PlayerTable: React.FC<Props> = ({ players, openPlayer }: Props) => {

  const getPlayerPosition = (index: number, width: number): [number, number] => {
    const angle = (index / players.length) * (2 * Math.PI) + Math.PI / 2
    const radius = 50 - width / 2
    const x = 50 + Math.cos(angle) * radius
    const y = 50 + radius * 0.1 + Math.sin(angle) * radius * 1.1
    return [x, y]
  }

  const renderPlayer = (player: Player, index: number) => {
    const width = Math.max(15, Math.min(28, (250 / players.length)))
    const [x, y] = getPlayerPosition(index, width)

    return (
      <div
        onClick={() => openPlayer(player)}
        key={index}
        style={{
          position: 'absolute',
          left: `${x}%`,
          top: `${y}%`,
          width: `${width}%`,
          height: `${width}%`,
          textAlign: 'center',
          transform: 'translate(-50%, -50%)',
        }}>
        <Token
          title
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
    <IonContent fullscreen>
    <div className='circle-container'>
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <marker
            id='arrowhead'
            markerWidth='10'
            markerHeight='7'
            refX='10'
            refY='3.5'
            orient='auto'
            markerUnits='strokeWidth'
          >
            <polygon points='0 0, 10 3.5, 0 7' fill='red' />
          </marker>
        </defs>
      </svg>
      {players.map(renderPlayer)}
    </div>
    </IonContent>
  )
}

export default PlayerTable