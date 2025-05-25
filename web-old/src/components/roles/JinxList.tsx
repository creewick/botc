import React from 'react'
import Role from '../../../../cli/src/models/Role'
import { IonImg, IonItem, IonLabel, IonList } from '@ionic/react'
import { Translation } from 'i18nano'

interface Props {
  roles: Role[]
}

const JinxList: React.FC<Props> = ({ roles }: Props) => {
  const ids = roles.map(role => role.id)
  const jinxes = roles
    .flatMap(role => role.jinxes
      ?.filter(roleId => ids.includes(roleId))
      ?.map(roleId => [role.id, roleId]) || []
    ) as [string, string][]

  const renderJinx = ([role1, role2]: [string, string]) =>
    <IonItem key={role1 + role2}>
      <IonImg
            className='icon'
            src={`/botc/assets/icons/${role1}.webp`}
          />
          <IonImg
            className='icon ion-margin-end'
            src={`/botc/assets/icons/${role2}.webp`}
          />
      <IonLabel>
        <p>
          <Translation path={`${role1}.jinxes.${role2}`} />
        </p>
      </IonLabel>
    </IonItem>

  return (
    <IonList>
      {jinxes.map(renderJinx)}
    </IonList>
  )
}

export default JinxList