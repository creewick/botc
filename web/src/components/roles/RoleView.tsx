import React, {  } from 'react'
import Role from '../../../../cli/src/models/Role'
import RoleIcon from './RoleIcon'
import {
  IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonRow
} from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'

interface Props {
  role: Role
}

const RoleView: React.FC<Props> = ({ role }: Props) => {
  const t = useTranslation()

  const getTextList = (key: string): string[] => {
    const result: string[] = []
    let index = 0
    let text = t(`${role.id}.${key}.${index++}`)
    while (text) {
      result.push(text)
      text = t(`${role.id}.${key}.${index++}`)
    }
    return result
  }

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
            <IonChip outline>
              <Translation path={`roles.types.${role.type}`} />
            </IonChip>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>

  const renderReminders = () => {
    const reminders = getTextList('reminders')
    if (reminders.length === 0) return null

    return (
      <>
        <IonListHeader>
          <Translation path="roles.reminders" />
        </IonListHeader>
        <IonList>
          {reminders.map(renderReminder)}
        </IonList>
      </>
    )
  }

  const renderReminder = (reminder: string, index: number) =>
    <IonItem key={index}>
      <RoleIcon role={role} size={36} hideTitle />
      <IonLabel className="ion-margin-start">
        {reminder}
      </IonLabel>
    </IonItem>

  const renderJinxes = () => {
    const jinxes = getTextList('jinxes')
    if (jinxes.length === 0) return null

    return (
      <>
        <IonListHeader>
          <Translation path="roles.jinxes" />
        </IonListHeader>
        <IonList>
          {jinxes.map(renderJinx)}
        </IonList>
      </>
    )
  }

  const renderJinx = (jinx: string, index: number) =>
    <IonItem key={index}>
      {/* <RoleIcon role={{id: jinx.roleId} as Role} size={36} hideTitle /> */}
      {/* <IonLabel className="ion-margin-start"> */}
        {/* {getLocalizedText(jinx.reason, settings.lang)} */}
      {/* </IonLabel> */}
    </IonItem>

  return (
    <>
      {renderHeader()}
      <IonContent>
        <p className="ion-text-center ion-no-margin ion-padding-horizontal">
          <Translation path={`${role.id}.ability`} />
        </p>
        <p className="ion-text-center flavor ion-padding-horizontal">
          <Translation path={`${role.id}.flavor`} />
        </p>
        {renderReminders()}
        {renderJinxes()}
      </IonContent>
    </>
  )
}

export default RoleView