import { 
  IonCardSubtitle, 
  IonIcon, 
  IonItem, 
  IonLabel
} from '@ionic/react'
import { Translation } from 'i18nano'
import React from 'react'

interface Props {
  routerLink?: string
  href?: string
  icon?: string
  title?: string
  subtitle?: string
  disabled?: boolean
}

const SectionListItem: React.FC<Props> = ({ 
  href, routerLink, icon, title, subtitle, disabled
}: Props) => {
  return (
  <IonItem 
    button
    color='light' 
    href={href} 
    routerLink={routerLink} 
    disabled={disabled}
  >
    <IonIcon icon={icon} slot="start" color='primary' />
    <IonLabel>
      <IonCardSubtitle color='primary'>
        <Translation path={title ?? ''} />
      </IonCardSubtitle>
      <IonLabel className='ion-text-nowrap'>
        <p><Translation path={subtitle ?? ''} /></p>
      </IonLabel>
    </IonLabel>
  </IonItem>
)
}

export default SectionListItem