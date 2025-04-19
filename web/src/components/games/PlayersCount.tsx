import React from 'react'
import Player from '../../models/player/Player'
import { IonRow, IonImg } from '@ionic/react'
import RoleType from '../../../../cli/src/enums/RoleType'
import { getIcon } from '../../helpers/getIcon'
import useSafeContext from '../../hooks/useSafeContext'
import { RolesContext } from '../../contexts/RolesProvider'

interface Props {
  players: Player[]
}

const types = [RoleType.Townsfolk, RoleType.Outsider, RoleType.Minion, RoleType.Demon, RoleType.Traveler]

const PlayersCount: React.FC<Props> = ({ players }) => {
  const { roles } = useSafeContext(RolesContext)

  const renderType = (type: RoleType) =>
    <IonRow className='ion-align-items-center' key={type}>
      <IonImg className='role-type-icon' src={getIcon(type)} />
      {getCount(type)}
    </IonRow>

  const getCount = (type: RoleType): number | undefined => {
    const travelers = players
      ?.filter(p => p.roles.map(id => roles.find(r => r.id === id)?.type)
      .includes(RoleType.Traveler))
    const count = players?.length - travelers?.length
    if (type === RoleType.Townsfolk)
      return Math.max(0, Math.floor((count - 1) / 3) * 2 + 1)
    if (type === RoleType.Outsider)
      return Math.max(0, (count - 1) % 3 - (count < 7 ? 1 : 0))
    if (type === RoleType.Minion)
      return Math.max(1, Math.floor((count - 1) / 3) - 1)
    if (type === RoleType.Demon)
      return 1
    if (type === RoleType.Traveler)
      return travelers?.length
  }

  return (
    <IonRow className='ion-justify-content-around ion-margin-horizontal'>
      {types.map(renderType)}
    </IonRow> 
  )
}

export default PlayersCount