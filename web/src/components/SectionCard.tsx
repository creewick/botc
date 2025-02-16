import { 
  IonCard, 
  IonCardSubtitle, 
  IonCol, 
  IonGrid, 
  IonIcon, 
  IonLabel, 
  IonRow 
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

const SectionCard: React.FC<Props> = ({ 
  href, routerLink, icon, title, subtitle, disabled
}: Props) => (
  <IonCard 
    button={true}
    href={href} 
    routerLink={routerLink}
    routerDirection='forward'
    color="light" 
    style={{ boxShadow: 'none', margin: '8px' }}
    disabled={disabled}
  >
    <IonGrid className="ion-padding">
      <IonRow className="ion-align-items-center">
        <IonCol size="auto">
          <IonIcon icon={icon} color="primary" size="large" />
        </IonCol>
        <IonCol>
          <IonCardSubtitle style={{ color: 'var(--ion-color-primary)' }}>
            <Translation path={title ?? ''} />
          </IonCardSubtitle>
          <IonLabel>
            <Translation path={subtitle ?? ''} />
          </IonLabel>
        </IonCol>
      </IonRow>
    </IonGrid>
  </IonCard>
)

export default SectionCard