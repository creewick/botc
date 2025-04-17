import { 
  IonCardSubtitle, 
  IonIcon, 
  IonItem, 
  IonLabel
} from '@ionic/react'
import { Translation } from 'i18nano'
import React from 'react'

interface Props {
  path?: string
  title?: string
  subtitle?: string
  routerLink?: string
  href?: string
  icon?: string
  disabled?: boolean
}

const Section: React.FC<Props> = ({ href, routerLink, icon, path, title, subtitle, disabled }: Props) => (
  <IonItem button detail={false} color='light' {...{href, routerLink, disabled}}>
    <IonIcon icon={icon} slot="start" color='primary' />
    <IonLabel>
      <IonCardSubtitle color='primary'>
        <Translation path={title ?? path + '.title'} />
      </IonCardSubtitle>
      <IonLabel className='ion-text-nowrap'>
        <p>
          <Translation path={subtitle ?? path + '.subtitle'} />
        </p>
      </IonLabel>
    </IonLabel>
  </IonItem>
)

export default Section