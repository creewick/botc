import React from 'react'
import { useTranslation } from 'i18nano'
import PlayerStatus from '../../enums/PlayerStatus'
import DayIcon from '../../../public/assets/images/day.svg'
import NightIcon from '../../../public/assets/images/night.svg'

interface Props {
  className?: string
  roleId?: string
  status?: PlayerStatus
  shadow?: boolean
  title?: boolean
  size?: number | string
}

const Token: React.FC<Props> = ({ className, roleId, shadow, title, size, status }) => {
  const style = { width: size, height: size }
  const isDead = status && status !== PlayerStatus.Alive
  const shadowFilter = shadow ? 'url(#shadow)' : undefined
  const grayscaleFilter = isDead ? 'url(#grayscale)' : undefined
  const t = useTranslation()

  const background = <image href='botc/assets/images/token.webp' width='110' height='110' x='-5' y='-5' />
  const shroud = isDead && <image href='botc/assets/images/shroud.webp' width='36' height='50' x='32' y='0' />
  const shroudIcon = isDead && <image href={status === PlayerStatus.Executed ? DayIcon : NightIcon} x='40' y='8' />
 
  const roleIcon = roleId && 
    <image href={`botc/assets/icons/${roleId}.webp`} width='60' height='60' x='20' y={title ? 15 : 20} />


  const text = title && 
    <text fontSize='12' fontWeight={900} fontFamily='Dumbledore' fill='black'
      strokeWidth='2' paintOrder='stroke' strokeOpacity={0.5} stroke='white'
    >
      <textPath href='#circle-path' startOffset='50%' textAnchor='middle'>
        {t(`${roleId}.name`).toUpperCase()}
      </textPath>
    </text>


  return (
    <svg className={className} viewBox='0 0 100 100' style={style}>
      <g filter={shadowFilter}>
        <g filter={grayscaleFilter} clipPath='url(#circle-clip)'>
          {background} {roleIcon} {text} {shroud} {shroudIcon}
        </g>
      </g>
    </svg>
  )
}

export default Token