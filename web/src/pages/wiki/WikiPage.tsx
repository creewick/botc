import {
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { Translation } from 'i18nano'
import { document, person } from 'ionicons/icons'

const renderItem = (name: string, icon: string) =>
  <IonItem routerLink={`/wiki/${name}`}>
    <IonIcon aria-hidden="true" icon={icon} slot="start" color="primary" />
    <IonLabel>
      <IonCardSubtitle color="primary">
        <Translation path={`wiki.${name}.title`} />
      </IonCardSubtitle>
      <IonLabel>
        <p>
          <Translation path={`wiki.${name}.description`} />
        </p>
      </IonLabel>
    </IonLabel>
  </IonItem>

export const WikiPage: React.FC = () => 
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>
          <Translation path="tab.wiki" />
        </IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen color='light'>
      <IonHeader collapse="condense">
        <IonToolbar color='light'>
          <IonTitle size="large">
            <Translation path="tab.wiki" />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonList inset={true}>
        {renderItem('roles', person)}
        {renderItem('scripts', document)}
      </IonList>
    </IonContent>
  </IonPage>
