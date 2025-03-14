import React from 'react'
import Role from '../../../../cli/src/models/Role'
import {
  IonList,
  IonItem,
  IonImg,
  IonLabel,
  IonItemDivider,
  IonCheckbox
} from '@ionic/react'
import { Translation } from 'i18nano'
import RoleType from '../../../../cli/src/enums/RoleType'

interface Props {
  roles: Role[]
  onSelect: (role: Role) => void
  getText?: (role: Role) => string
  groupByType?: boolean
  showCheckboxes?: boolean
}

const RoleList: React.FC<Props> = ({
  roles, getText, onSelect, groupByType, showCheckboxes
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

  const renderBootlegger = (role: Role) => 
    <IonItem key={role.id}>
      <IonLabel>
        <p>
          {getText ? getText(role) : ''}
        </p>
      </IonLabel>
    </IonItem>

  const renderJinxes = (role: Role) =>
    role.jinxes && role.jinxes
    .filter(roleId => roles.some(role => role.id === roleId))
    .map(roleId => 
      <IonImg
        key={roleId}
        className='ion-margin-end jinx-icon'
        src={`/botc/assets/icons/${roleId}.webp`}
      />
    )

  const stopPropogation = (event: React.MouseEvent) => event.stopPropagation()

  const renderRole = (role: Role) =>
    role.type === RoleType.Bootlegger ? renderBootlegger(role) :
    <IonItem button detail={false} key={role.id} onClick={() => onSelect(role)}>
      { showCheckboxes && <IonCheckbox slot='start' onClick={stopPropogation} /> }
      <IonImg
        className='ion-margin-end icon'
        src={`/botc/assets/icons/${role.id}.webp`}
      />
      <IonLabel className='ion-text-nowrap'>
        <h2>
          <span><Translation path={`${role.id}.name`} /></span>
          {renderJinxes(role)}
        </h2>
        <p className='ion-hide-sm-down'>
          {getText ? getText(role) : ''}
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
