import React from 'react'
import Role from '../../../../cli/src/models/Role'
import {
  IonList,
  IonItem,
  IonImg,
  IonLabel,
  IonItemDivider
} from '@ionic/react'
import { Translation } from 'i18nano'
import RoleType from '../../../../cli/src/enums/RoleType'

interface Props {
  roles: Role[]
  onSelect: (role: Role) => void
  getText?: (role: Role) => string
  groupByType?: boolean
}

const RoleList: React.FC<Props> = ({
  roles, getText, onSelect, groupByType
}: Props) => {
  const filterBy = (type: RoleType) => roles.filter(role => role.type === type)

  const renderGroups = (groups: RoleType[]) =>
    groups.map(type => filterBy(type).length > 0 &&
      <div key={type}>
        <IonItemDivider sticky className='ion-no-padding' color='light'>
          <IonImg className='icon' src={`/botc/assets/icons/${type}.webp`} />
          <Translation path={`roles.types.${type}`} />
        </IonItemDivider>
        {filterBy(type).map(renderRole)}
      </div>
    )

  const renderRole = (role: Role) =>
    <IonItem button detail={false} key={role.id} onClick={() => onSelect(role)}>
      <IonImg
        className='ion-margin-end role-list-icon'
        src={`/botc/assets/icons/${role.id}.webp`}
      />
      <IonLabel className='ion-text-nowrap'>
        <h2>
          <Translation path={`${role.id}.name`} />
        </h2>
        <p className='ion-hide-sm-down'>
          <Translation path={getText ? getText(role) : ''} />
        </p>
      </IonLabel>
    </IonItem>

  return (
    <IonList>
      {!!groupByType && renderGroups(Object.values(RoleType))}
      {!groupByType && roles.map(renderRole)}
    </IonList>
  )
}

export default RoleList
