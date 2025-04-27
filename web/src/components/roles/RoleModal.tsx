import { IonHeader, IonToolbar, IonButtons, IonImg, IonButton, IonModal } from '@ionic/react'
import { Translation } from 'i18nano'
import React, { Suspense } from 'react'
import RoleView from './RoleView'
import Token from './Token'
import Role from '../../../../cli/src/models/Role'
import { getIcon } from '../../helpers/getIcon'

interface Props {
  role?: Role
  close: () => void
}

const RoleModal: React.FC<Props> = ({ role, close }) => (
  <IonModal
    className="modal-overflow"
    initialBreakpoint={0.25}
    breakpoints={[0, 0.25, 0.66, 1]}
    isOpen={!!role}
    onDidDismiss={close}
    backdropBreakpoint={0.25}
    handle={false}
  >
    {role && <>
      <Token className='token' roleId={role.id} size={100} shadow title />
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonImg className='role-type-icon' src={getIcon(role.type)} />
            <Translation path={`characters.type.${role.type}`} />
          </IonButtons>
          <IonButtons slot='end'>
            <IonButton onClick={close}>
              <Translation path='actions.close' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <Suspense>
        <RoleView role={role} />
      </Suspense>
    </>}
  </IonModal>
)

export default RoleModal
