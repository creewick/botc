import React from 'react'
import Role from '../../../../cli/src/models/Role'
import { 
  IonList, 
  IonItem, 
  IonImg, 
  IonLabel, 
  IonAccordionGroup, 
  IonAccordion 
} from '@ionic/react'
import { RoleListState } from '../../models/RoleListState'

interface Props {
  groups: { [key: string]: Role[] }
  setState: (state: RoleListState) => void
}

const RoleList: React.FC<Props> = (props: Props) => {
  const { groups, setState } = props
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

  function renderRole(role: Role) {
    return (
      <IonItem key={role.id} onClick={() => setState({ role })}>
        <IonImg
          className='ion-padding-end'
          src={`public/icons/${role.id}.webp`}
          style={{ height: 36 }}
        />
        <IonLabel>
          {role.name.en}
        </IonLabel>
      </IonItem>
    )
  }

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