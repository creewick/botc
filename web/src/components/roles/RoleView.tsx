import React from 'react'
import Role from '../../../../cli/src/models/Role'
import RoleIcon from './RoleIcon'
import { IonChip, IonCol, IonContent, IonGrid, IonRow } from '@ionic/react'

interface Props {
  role: Role
}

const RoleView: React.FC<Props> = (props: Props) => {
  const { role } = props

  return (
    <>
      <div>
        <IonGrid>
          <IonRow>
            <IonCol/>
            <IonCol>
              <div style={{
                width: '40vmin',
                margin: '-20vmin auto 0'
              }}>
                <RoleIcon role={role} />
              </div>
            </IonCol>
            <IonCol className="ion-text-right">
              <IonChip outline>{role.type}</IonChip>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
      <IonContent className='ion-padding-horizontal'>
        <p className="ion-text-center ion-padding-bottom">
          {role.ability.en}
        </p>
        <p
          className="ion-text-center"
          style={{
            fontFamily: 'Dumbledore',
            fontStyle: 'italic',
            color: 'var(--ion-color-medium)'
          }}>
          {role.flavor.en}
        </p>
      </IonContent>
    </>
  )
}

export default RoleView