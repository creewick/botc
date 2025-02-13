import { 
  IonCard, 
  IonCardSubtitle, 
  IonCol, 
  IonGrid, 
  IonIcon, 
  IonLabel, 
  IonRow 
} from '@ionic/react'
import React from 'react'

interface Props {
  routerLink?: string
  href?: string
  icon?: string
  title?: string
  subtitle?: string
}

const SectionCard: React.FC<Props> = (props: Props) => {
  const { href, routerLink, icon, title, subtitle } = props

  return (
    <IonCard 
      button={true}
      href={href} 
      routerLink={routerLink}
      routerDirection='forward'
      color="light" 
      style={{ boxShadow: 'none', margin: '8px' }}
    >
      <IonGrid className="ion-padding">
        <IonRow className="ion-align-items-center">
          <IonCol size="auto">
            <IonIcon icon={icon} color="primary" size="large" />
          </IonCol>
          <IonCol>
            <IonCardSubtitle style={{ color: 'var(--ion-color-primary)' }}>
              {title}
            </IonCardSubtitle>
            <IonLabel>{subtitle}</IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  )
}

export default SectionCard