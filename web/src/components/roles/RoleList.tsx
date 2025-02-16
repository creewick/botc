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
import AppSettings, { DEFAULT_APP_SETTINGS } from '../../models/AppSettings'
import getLocalizedText from '../../helpers/getLocalizedText'

interface Props {
  roles: Role[]
  state: RoleListState
  setState: (state: RoleListState) => void
}

const RoleList: React.FC<Props> = ({ roles, state, setState }: Props) => {
  const [settings] = 
    useStorageState<AppSettings>('settings', DEFAULT_APP_SETTINGS)

  const renderRole = (role: Role) =>
    <IonItem 
      key={role.id} 
      onClick={() => setState({ ...state, role })}
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