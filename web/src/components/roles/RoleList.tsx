import React from 'react'
import Role from '../../../../cli/src/models/Role'
import { RoleListState } from '../../models/RoleListState'
import { 
  IonList, 
  IonItem, 
  IonImg, 
  IonLabel
} from '@ionic/react'
import useStorageState from '../../hooks/useStorageState'
import AppSettings, { APP_SETTINGS } from '../../models/AppSettings'
import getLocalizedText from '../../helpers/getLocalizedText'
import { useHistory } from 'react-router-dom'

interface Props {
  roles: Role[]
  state: RoleListState
  setState: (state: RoleListState) => void
}

const RoleList: React.FC<Props> = ({ roles, state, setState }: Props) => {
  const [settings] = useStorageState<AppSettings>('settings', APP_SETTINGS)

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
        {getLocalizedText(role.name, settings.lang)}
      </IonLabel>
    </IonItem>

  return (
    <IonList>
      {roles.map(renderRole)}
    </IonList>
  )
}

export default RoleList