import React from 'react'
import { useTranslation } from 'i18nano'
import PlayerStatus from '../../models/games/PlayerStatus'

interface Props {
  roleId?: string
  status?: PlayerStatus
  hideShadow?: boolean
  hideTitle?: boolean
  size?: number
}

const RoleIcon: React.FC<Props> = ({
  roleId, hideTitle, hideShadow, size, status
}: Props) => {
  const t = useTranslation()
  const isDead = status && status !== PlayerStatus.Alive
  const grayscaleFilter = isDead ? 'url(#grayscale)' : undefined
  const shadowFilter = !hideShadow ? 'url(#shadow)' : undefined

  const token =
    <image
      href="botc/assets/images/token.webp"
      width="110" height="110" x="-5" y="-5"
    />

  const title =
    <text fontSize="12" fontWeight={900} fill="black" stroke="white"
      strokeWidth="2" paintOrder="stroke" strokeOpacity={0.5}
    >
      <textPath href="#circle-path" startOffset="50%" textAnchor="middle">
        {t(`${roleId}.name`).toUpperCase()}
      </textPath>
    </text>

  const roleIcon =
    <image
      href={`botc/assets/icons/${roleId}.webp`}
      width="60" height="60" x="20" y={hideTitle ? 20 : 15}
    />

  const shroud =
    <image
      href="botc/assets/images/shroud.webp"
      width="36" height="50" x="32" y="0"
    />

  const dayIcon =
    <path
      // eslint-disable-next-line max-len
      d='M256 118a22 22 0 01-22-22V48a22 22 0 0144 0v48a22 22 0 01-22 22zM256 486a22 22 0 01-22-22v-48a22 22 0 0144 0v48a22 22 0 01-22 22zM369.14 164.86a22 22 0 01-15.56-37.55l33.94-33.94a22 22 0 0131.11 31.11l-33.94 33.94a21.93 21.93 0 01-15.55 6.44zM108.92 425.08a22 22 0 01-15.55-37.56l33.94-33.94a22 22 0 1131.11 31.11l-33.94 33.94a21.94 21.94 0 01-15.56 6.45zM464 278h-48a22 22 0 010-44h48a22 22 0 010 44zM96 278H48a22 22 0 010-44h48a22 22 0 010 44zM403.08 425.08a21.94 21.94 0 01-15.56-6.45l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.55 37.56zM142.86 164.86a21.89 21.89 0 01-15.55-6.44l-33.94-33.94a22 22 0 0131.11-31.11l33.94 33.94a22 22 0 01-15.56 37.55zM256 358a102 102 0 11102-102 102.12 102.12 0 01-102 102z'
    />

  const nightIcon =
    <path
      // eslint-disable-next-line max-len
      d='M264 480A232 232 0 0132 248c0-94 54-178.28 137.61-214.67a16 16 0 0121.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200 31.34 0 59.57-5.07 81.61-14.67a16 16 0 0121.06 21.06C442.28 426 358 480 264 480z'
    />

  return (
    <svg viewBox="0 0 100 100" 
      style={{ fontFamily: 'Dumbledore', width: size, height: size }}
    >
      <g filter={shadowFilter}>
        <g filter={grayscaleFilter} clipPath='url(#circle-clip)'>
          {token}
          {roleId && roleIcon}
          {!hideTitle && title}
          {isDead && shroud}
          <svg width='20' height='20' x='40' y='8' opacity={0.5}
            viewBox='0 0 512 512' stroke='white' fill='white'>
            {status === PlayerStatus.Executed && dayIcon}
            {status === PlayerStatus.Killed && nightIcon}
          </svg>
        </g>
      </g>
    </svg>
  )
}

export default RoleIcon