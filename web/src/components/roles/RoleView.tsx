import React, { } from 'react'
import Role from '../../../../cli/src/models/Role'
import { IonContent, IonImg, IonItem, IonLabel, IonList, IonListHeader } from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'
import './RoleView.css'
import { getIcon } from '../../helpers/getIcon'

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

  const renderReminders = () => {
    const reminders = getTextList('reminders')
    if (reminders.length === 0) return null

    return (
      <>
        <IonListHeader className='ion-padding-bottom'>
          <Translation path="characters.reminders" />
        </IonListHeader>
        <IonList>
          {reminders.map(renderReminder)}
        </IonList>
      </>
    )
  }

  const renderReminder = (reminder: string, index: number) =>
    <IonItem key={index}>
      <IonImg slot='start' className='role-icon' src={getIcon(role.id)} />
      <IonLabel>
        {reminder}
      </IonLabel>
    </IonItem>

  const renderJinxes = () => {
    if (!role.jinxes) return null

    return (
      <>
        <IonListHeader className='ion-padding-bottom'>
          <Translation path="characters.jinxes" />
        </IonListHeader>
        <IonList>
          {role.jinxes.map(renderJinx)}
        </IonList>
      </>
    )
  }

  const renderJinx = (roleId: string) =>
    <IonItem key={roleId}>
      <IonImg slot='start' className='role-icon' src={getIcon(roleId)} />
      <IonLabel>
        <Translation path={`${role.id}.jinxes.${roleId}`} />
      </IonLabel>
    </IonItem>

  return (
    <IonContent>
      <p className="ion-text-center ion-padding-horizontal">
        <Translation path={`${role.id}.ability`} />
      </p>
      <p className="ion-text-center flavor ion-padding-horizontal">
        <Translation path={`${role.id}.flavor`} />
      </p>
      {renderReminders()}
      {renderJinxes()}
    </IonContent>
  )
}

export default RoleView