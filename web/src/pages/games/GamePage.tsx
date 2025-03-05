import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  SegmentCustomEvent
} from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Game from '../../models/games/Game'
import PlayerTable from '../../components/players/PlayerTable'
import Player from '../../models/games/Player'
import PlayerList from '../../components/players/PlayerList'
import { GamesContext } from '../../contexts/GamesProvider'
import { GamePageState, GameTab } from '../../models/GamePageState'
import PlayerModal from '../../components/players/PlayerModal'
import GameModal from '../../components/games/GameModal'
import ScriptListModal from '../../components/scripts/ScriptListModal'

const GamePage: React.FC = () => {
  const { games, loadGames, setGame } = useContext(GamesContext)
  const [state, setState] = useState<GamePageState>({
    tab: GameTab.List,
    editMode: false,
    gameModal: false,
    scriptModal: false,
  })
  const { id } = useParams<{ id: string }>()
  const t = useTranslation()
  const game = games[id] ?? {} as Game

  useEffect(() => void loadGames(), [])

  const openPlayer = useCallback((player?: Player) =>
     setState(prev => ({ ...prev, playerModal: player }))
  , [])
  const setTab = useCallback((e: SegmentCustomEvent) => 
    setState(prev => ({ ...prev, tab: e.target.value as GameTab }))
  , [])
  const setPlayers = useCallback(async (players: Player[]) =>
    await setGame(id, { ...game, players })
  , [id, game, setGame])
  const setPlayerFromModal = useCallback((player?: Player) => {
    if (player !== undefined) setPlayers(game.players.map(p => p === state.playerModal ? player : p))
    else setPlayers(game.players.filter(p => p !== state.playerModal))
    setState(prev => ({ ...prev, playerModal: player }))
  }, [game, setPlayers, state.playerModal])
  const switchEditMode = () =>
    setState(prev => ({ ...prev, editMode: !prev.editMode }))

  const props = { 
    editMode: state.editMode, 
    players: game.players, 
    setPlayers, 
    openPlayer
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text={t('games.title')} />
          </IonButtons>
          <IonTitle>
            {game.name}
          </IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={switchEditMode}>
              <Translation path={state.editMode ? 'games.done' : 'games.edit'} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent> 
        { state.tab === GameTab.List && <PlayerList {...props} /> }
        { state.tab === GameTab.Circle && <PlayerTable {...props} /> }
      </IonContent>

      <IonFooter>
        <IonList lines='full' inset>
          <IonItem color='light'>
            <IonSegment value={state.tab} onIonChange={setTab}>
              { Object.values(GameTab).map(tab => 
                <IonSegmentButton key={tab} value={tab}>
                  <Translation path={`games.tabs.${tab}`} />
                </IonSegmentButton>
              )}
            </IonSegment>
          </IonItem>
          <IonItem color='light' button detail={false} onClick={() => setState(prev => ({ ...prev, gameModal: true }))}>
            <IonLabel color='primary' className='ion-text-center'>
              <Translation path='games.gameSettings' />
            </IonLabel>
          </IonItem>
        </IonList>
      </IonFooter>

      <PlayerModal 
        player={state.playerModal} 
        setPlayer={setPlayerFromModal} 
        close={() => openPlayer(undefined)} 
        scriptId={game.scriptId} 
      />

      <ScriptListModal
        isOpen={state.scriptModal}
        close={() => setState(prev => ({ ...prev, scriptModal: false }))}
        setScript={scriptId => setGame(id, { ...game, scriptId })}
      />

      <GameModal
        isOpen={state.gameModal} 
        close={() => setState(prev => ({ ...prev, gameModal: false }))} 
        openScriptModal={() => setState(prev => ({ ...prev, scriptModal: true }))}
        gameId={id}
      />
    </IonPage>
  )
}

export default GamePage