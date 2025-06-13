import { IonCheckbox, IonCol, IonImg, IonItem, IonItemDivider, IonLabel, IonList, IonRow } from '@ionic/react'
import './Role.css'
import { Translation } from 'i18nano'
import Role from '../../types/Role'
import RoleType from '../../types/RoleType'
import { useRoles } from '../../hooks/useRoles'

interface Props {
  roles: Role[]
  onSelect: (role: Role) => void
  getText: (role: Role) => string
  group?: boolean
  checkboxes?: boolean
}

export const RoleList: React.FC<Props> = ({ roles, onSelect, getText, group, checkboxes }) => {
  const allRoles = useRoles()

  const renderGroup = (type: RoleType) => {
    const items = allRoles.filter(role => role.type === type)
    const hasItems = roles.some(role => role.type === type)

    return (
      <div key={type}>
        <IonItemDivider sticky color='light' className={hasItems ? 'role-list-divider' : 'role-list-divider role-list-item-hidden'}>
          <IonImg className='role-type-icon' src={`/botc/images/roleType/${type}.webp`} />
          <Translation path={`roles.type.${type}`} />
        </IonItemDivider>
        {items.map(renderRole)}
      </div>
    )
  }

  const renderRole = (role: Role) =>
    <IonItem
      key={role.id}
      button
      className={roles.includes(role) ? 'role-list-item' : 'role-list-item role-list-item-hidden'}
      onClick={() => onSelect(role)}
    >
      {checkboxes && <IonCheckbox slot='start' />}
      <IonImg slot='start' className='role-icon' src={getImage(role)} />
      <IonLabel>
          <h2 className='ion-text-nowrap'>
            <Translation path={`${role.id}.name`} />
          </h2>
          <p className='ion-hide-sm-down ion-text-nowrap'>{getText?.(role)}</p>
      </IonLabel>
    </IonItem>

  const getImage = (role: Role) => {
    const suffix = role.type === RoleType.Demon || role.type === RoleType.Minion ? '_e'
      : role.type === RoleType.Townsfolk || role.type === RoleType.Outsider ? '_g'
      : ''

    return `/botc/images/role/${role.id}${suffix}.webp`
  }
  
  return (
    <IonList>
      {!!group && Object.values(RoleType).map(renderGroup)}
      {!group && allRoles.map(renderRole)}
    </IonList>
  )
}