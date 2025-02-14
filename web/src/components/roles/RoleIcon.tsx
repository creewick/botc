import React from 'react'
import Role from '../../../../cli/src/models/Role'

interface Props {
  role: Role
  hideTitle?: boolean
  size?: number
}

const RoleIcon: React.FC<Props> = (props: Props) => {
  const { role } = props

  const title = props.hideTitle ? '' : (
    <text fontSize="12" fontWeight="bold" fill="black" stroke="#fff8" 
      strokeWidth="2" paintOrder="stroke"
    >
      <textPath href="#circle-path" startOffset="50%" textAnchor="middle">
        {role.name.en.toUpperCase()}
      </textPath>
    </text>
  )

  const y = props.hideTitle ? 20 : 15

  return (
    <svg viewBox="0 0 100 100"
     style={{ fontFamily: 'Dumbledore', width: props.size, height: props.size }}
    >
      <defs>
        <clipPath id="circle-clip"><circle cx="50" cy="50" r="44" /></clipPath>
        <path id="circle-path" 
          d='M 90 50 A 1 1 0 0 0 10 50 A 40 40 0 0 0 90 50 A 1 1 0 0 0 10 50' />
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodOpacity="0.5" />
        </filter>
      </defs>
      <g filter="url(#shadow)">
        <image href="botc/assets/images/token.webp"
          width="110" height="110" x="-5" y="-5" clipPath="url(#circle-clip)" />
      </g>
      <image href={`botc/assets/icons/${role.id}.webp`} 
        width="60" height="60" x="20" y={y} />
      { title }
    </svg>
  )
}

export default RoleIcon