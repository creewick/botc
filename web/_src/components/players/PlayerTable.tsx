import React from 'react'
import Player from '../../../src/models/player/Player'
import Token from '../Token'

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
    const width = Math.max(15, Math.min(30, (250 / players.length)))
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

  const renderArrow = (
    fromIndex: number,
    toIndex: number,
    sideOffsetPercent = 2
  ) => {
    const width = Math.max(15, Math.min(30, (200 / players.length)))
    const [x1, y1] = getPlayerPosition(fromIndex, width)
    const [x2, y2] = getPlayerPosition(toIndex, width)
  
    const dx = x2 - x1
    const dy = y2 - y1
    const len = Math.sqrt(dx * dx + dy * dy)
  
    const offsetFromCenter = width / 1.6
    const ux = dx / len
    const uy = dy / len
  
    // Перпендикулярный нормализованный вектор (вбок)
    const px = -uy
    const py = ux
  
    // Смещение вбок — параметр
    const sideOffset = sideOffsetPercent // например, 2..5%
    const sx = px * sideOffset
    const sy = py * sideOffset
  
    // Смещённые точки (вдоль направления и вбок)
    const startX = x1 + ux * offsetFromCenter + sx
    const startY = y1 + uy * offsetFromCenter + sy
    const endX = x2 - ux * offsetFromCenter + sx
    const endY = y2 - uy * offsetFromCenter + sy
  
    return (
      <line
        key={`arrow-${fromIndex}-${toIndex}`}
        x1={`${startX}%`} y1={`${startY}%`}
        x2={`${endX}%`} y2={`${endY}%`}
        stroke='red'
        strokeWidth={2}
        markerEnd='url(#arrowhead)'
      />
    )
  }

  return (
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
        {/* {renderArrow(1, 6)} */}
        {/* {renderArrow(2, 1)} */}
      </svg>
      {players.map(renderPlayer)}
    </div>
  )
}

export default PlayerTable