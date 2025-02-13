import React from 'react'
import Role from '../../../../cli/src/models/Role'
import { IonModal } from '@ionic/react'

interface Props {
  role: Role
}

const RoleView: React.FC = (props: Props) => {
  const { role } = props

  return (
    <IonModal>
      {role.name.en}
    </IonModal>
  )
}

export default RoleView