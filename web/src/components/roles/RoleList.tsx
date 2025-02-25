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
  onSelectRole: (role: Role) => void
  getText?: (role: Role) => string
  groupByType?: boolean
}

const RoleList: React.FC<Props> = ({ 
  roles, getText, onSelectRole, groupByType
}: Props) => {

  const renderGroups = () =>
    <>
      {Object.values(RoleType).map(type => 
        roles.filter(role => role.type === type).length > 0 &&
        <div key={type}>
          <IonItemDivider className='ion-no-padding' color='light'>
            <IonImg
              className='icon'
              src={`/botc/assets/icons/${type}.webp`}
            />
            <Translation path={`roles.types.${type}`} />
          </IonItemDivider>
          {roles.filter(role => role.type === type).map(renderRole)}
        </div>
      )}
    </>

  const renderRole = (role: Role) =>
    <IonItem 
      button
      detail={false}
      key={role.id} 
      onClick={() => onSelectRole(role)}
    >
      <IonImg
        className='ion-margin-end'
        src={`/botc/assets/icons/${role.id}.webp`}
        style={{ height: 36, width: 36 }}
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
      {!!groupByType && renderGroups()}
      {!groupByType && roles.map(renderRole)}
    </IonList>
  )
}

export default RoleList
