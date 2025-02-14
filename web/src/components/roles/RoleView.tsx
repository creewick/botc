import React from 'react'
import Role from '../../../../cli/src/models/Role'
import RoleIcon from './RoleIcon'
import {
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow
} from '@ionic/react'
import LocalizedText from '../../../../cli/src/models/LocalizedText'
import Limitation from '../../../../cli/src/models/Limitation'

interface Props {
  role: Role
}

const RoleView: React.FC<Props> = (props: Props) => {
  const { role } = props

  const renderHeader = () =>
    <div style={{ 
      boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.23)', 
      borderRadius: 'var(--border-radius) var(--border-radius) 0 0'
    }}>
      <IonGrid>
        <IonRow>
          <IonCol>
            {role.edition && <IonChip outline>{role.edition}</IonChip>}
          </IonCol>
          <IonCol>
            <div style={{ margin: '-55% auto 0' }}> 
              <RoleIcon role={role} />
            </div>
          </IonCol>
          <IonCol className="ion-text-right">
            <IonChip outline>{role.type}</IonChip>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>

  const renderReminders = () => role.reminders && role.reminders.length > 0 && (
    <>
      <IonListHeader>
        Reminders
      </IonListHeader>
      <IonList>
        {role.reminders?.map(renderReminder)}
      </IonList>
    </>
  )

  const renderReminder = (reminder: LocalizedText, index: number) =>
    <IonItem key={index}>
      <RoleIcon role={role} size={36} hideTitle />
      <IonLabel className="ion-margin-start">
        {reminder.en}
      </IonLabel>
    </IonItem>

  const renderJinxes = () => role.jinxes && role.jinxes.length > 0 && (
    <>
      <IonListHeader>
        Jinxes
      </IonListHeader>
      <IonList>
        {role.jinxes?.map(renderJinx)}
      </IonList>
    </>
  )

  const renderJinx = (jinx: Limitation, index: number) =>
    <IonItem key={index}>
      <RoleIcon role={{id: jinx.roleId} as Role} size={36} hideTitle />
      <IonLabel className="ion-margin-start">
        {jinx.reason.en}
      </IonLabel>
    </IonItem>

  return (
    <>
      {renderHeader()}
      <IonContent>
        <p className="ion-text-center ion-no-margin ion-padding-horizontal">
          {role.ability.en}
        </p>
        <p className="ion-text-center flavor ion-padding-horizontal">
          {role.flavor.en}
        </p>
        {renderReminders()}
        {renderJinxes()}
      </IonContent>
    </>
  )
}

export default RoleView