import {
  IonButton,
  IonButtons,
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
import { add, addCircleOutline } from 'ionicons/icons'
import React from 'react'
import { GamesContext } from '../../contexts/GamesProvider'
import Game from '../../models/Game'
import { useHistory } from 'react-router-dom'
import useSafeContext from '../../hooks/useSafeContext'
import { SettingsContext } from '../../contexts/SettingsContext'

const GamesPage: React.FC = () => {
  const { games, addGame } = useSafeContext(GamesContext)
  const { settings } = useSafeContext(SettingsContext)
  const history = useHistory()

  async function createGame() {
    const id = await addGame()
    history.push(`/games/${id}`)
  }

  const sortGames = ([_, a]: [string, Game], [__, b]: [string, Game]) =>
    a.created < b.created ? 1 : -1

  const renderGame = ([id, game]: [string, Game]) =>
    <IonItem key={id} routerLink={`/games/${id}`} color='light'>
      <IonLabel>
        <h2>{game.name}</h2>
        <p className="ion-hide-sm-down">
          {game.created?.toLocaleString(settings.lang)}
        </p>
      </IonLabel>
    </IonItem>

  const renderGames = () => Object
    .entries(games)
    .sort(sortGames)
    .map(renderGame)

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar>
          <IonTitle>
            <Translation path='tabs.games' />
          </IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={createGame}>
              <IonIcon icon={addCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size="large">
              <Translation path='tabs.games' />
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList inset>
          <IonItem onClick={createGame} button detail={false} color='primary'>
            <IonLabel>
              <h2>
                <Translation path='games.create' />
              </h2>
            </IonLabel>
            <IonIcon icon={add} slot='start' />
          </IonItem>
        </IonList>
        <IonList inset>
          {renderGames()}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default GamesPage