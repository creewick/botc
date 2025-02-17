import React from 'react'
import Role from '../../../../cli/src/models/Role'
import { RoleListState } from '../../models/RoleListState'
import { 
  IonList, 
  IonItem, 
  IonImg, 
  IonLabel
} from '@ionic/react'
import { Translation } from 'i18nano'

interface Props {
  roles: Role[]
  state: RoleListState
  setState: (state: RoleListState) => void
}

const RoleList: React.FC<Props> = ({ roles, state, setState }: Props) => {
  function openRole(role: Role) {
    setState(({ ...state, role }))
    window.history.replaceState(null, '', `/botc/#/wiki/roles/${role.id}`)
  }

  const renderRole = (role: Role) =>
    <IonItem 
      key={role.id} 
      onClick={() => openRole(role)}
      color={state.role?.id === role.id ? 'light' : undefined}
    >
      <IonImg
        className='ion-margin-end'
        src={`/botc/assets/icons/${role.id}.webp`}
        style={{ height: 36, width: 36 }}
      />
      <IonLabel>
        <Translation path={`${role.id}.name`} />
      </IonLabel>
    </IonItem>

  return (
    <IonList>
      {roles.map(renderRole)}
    </IonList>
  )
}

export default RoleList