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
import { addCircleOutline } from 'ionicons/icons'
import React, { useContext, useEffect } from 'react'
import { GamesContext } from '../contexts/GamesProvider'
import Game from '../models/games/Game'
import { useHistory } from 'react-router-dom'

const GamesPage: React.FC = () => {
  const { games, loadGames, addGame } = useContext(GamesContext)
  const history = useHistory()

  useEffect(() => void loadGames(), [])

  async function createGame() {
    const id = await addGame()
    history.push(`/games/${id}`)
  }

  const sortGames = ([_, a]: [string, Game], [__, b]: [string, Game]) =>
    a.created < b.created ? 1 : -1

  const renderGame = ([id, game]: [string, Game]) =>
    <IonItem key={id} routerLink={`/games/${id}`}>
      <IonLabel>
        <h2>{game.name}</h2>
        <p>
          {game.created.toLocaleDateString()}
          {' '}
          {game.created.toLocaleTimeString()}
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
            <Translation path='games.title' />
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
              <Translation path='games.title' />
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {renderGames()}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default GamesPage