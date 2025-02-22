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
import { Translation, useTranslation } from 'i18nano'
import { addCircleOutline } from 'ionicons/icons'
import React, { useContext, useEffect, useState } from 'react'
import Game from '../models/games/Game'
import PlayerStatus from '../models/games/PlayerStatus'
import { useHistory } from 'react-router-dom'
import StorageContext from '../contexts/StorageContext'

const PREFIX = 'games.'

const GamesPage: React.FC = () => {
  const [games, setGames] = useState<Record<string, Game>>({})
  const storage = useContext(StorageContext)
  const t = useTranslation()
  const history = useHistory()

  useEffect(() => void getAllGames(), [])

  async function getAllGames() {
    const allKeys = await storage!.keys()
    const gameKeys = allKeys.filter(key => key.startsWith(PREFIX))
    const games: Record<string, Game> = {}
  
    await Promise.all(
      gameKeys.map(async key => {
        const id = key.replace(PREFIX, '')
        games[id] = await storage!.get(key)
      })
    )

    setGames(games)
  }

  function getUniqueUUID(): string {
    const id = crypto.randomUUID()
    return id in games ? getUniqueUUID() : id
  }

  const getNewGame = () => ({
    name: `${t('games.game')} #${Object.keys(games).length + 1}`,
    created: new Date(),
    players: [1,2,3,4,5,6,7,8,9,10]
      .map(i => ({ 
        name: `${t('games.player')} ${i}`,
        roles: [],
        status: PlayerStatus.Alive,
    })),
  })

  async function addGame() {
    const id = getUniqueUUID()
    const game = getNewGame()
    await storage!.set(PREFIX + id, game)
    setGames({ ...games, [id]: game })
    history.push(`/games/${id}`)
  }

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar>
          <IonTitle>
            <Translation path='games.title' />
          </IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={addGame}>
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
          {Object.entries(games).map(([id, game]) => 
            <IonItem key={id} routerLink={`/games/${id}`}>
              <IonLabel>
                <h2>{game.name}</h2>
                <p>{game.created.toLocaleDateString()}</p>
              </IonLabel>
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default GamesPage