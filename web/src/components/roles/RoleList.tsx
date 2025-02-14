import React from 'react'
import Role from '../../../../cli/src/models/Role'
import { RoleListState } from '../../models/RoleListState'
import { 
  IonList, 
  IonItem, 
  IonImg, 
  IonLabel, 
  IonAccordionGroup, 
  IonAccordion 
} from '@ionic/react'

interface Props {
  groups: { [key: string]: Role[] }
  state: RoleListState
  setState: (state: RoleListState) => void
}

const RoleList: React.FC<Props> = (props: Props) => {
  const { groups, state, setState } = props
  const groupList = Object.entries(groups)

  function renderGroup(group: [string, Role[]]) {
    const [name, roles] = group 
    return (
      <IonAccordion key={name} value={name}>
        <IonItem slot="header" color="light">
          <IonLabel>{name}</IonLabel>
        </IonItem>
        <IonList slot="content">
          {roles.map(renderRole)}
        </IonList>
      </IonAccordion>
    )
  }

  const renderRole = (role: Role) =>
    <IonItem key={role.id} onClick={() => setState({ ...state, role })}>
      <IonImg
        className='ion-margin-end'
        src={`/botc/assets/icons/${role.id}.webp`}
        style={{ height: 36, width: 36 }}
      />
      <IonLabel>
        {role.name.en}
      </IonLabel>
    </IonItem>

  if (groupList.length < 2) {
    return (
      <IonList>
        {groups[groupList[0][0]].map(renderRole)}
      </IonList>
    )
  }

  return (
    <IonAccordionGroup value={groupList[0][0]}>
      {groupList.map(renderGroup)}
    </IonAccordionGroup>
  )
}

export default RoleList