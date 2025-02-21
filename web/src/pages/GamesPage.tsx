import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { Translation } from 'i18nano'
import { addCircleOutline } from 'ionicons/icons'
import React from 'react'
import useStorageState from '../hooks/useStorageState'

const GamesPage: React.FC = () => {
  const [games, setGames] = useStorageState('games', [])

  // function createGame() {
  //   setGames([{}, ...games])
  // }

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar>
          <IonTitle>
            <Translation path='games.title' />
          </IonTitle>
          <IonButtons slot='end'>
            <IonButton>
              <IonIcon icon={addCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size="large">
              <Translation path='games.title' />
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {games.map(game => <div key={game}>{JSON.stringify(game)}</div>)}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default GamesPage