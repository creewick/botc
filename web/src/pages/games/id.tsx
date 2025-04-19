import {
  IonButton,
  IonButtons,
  IonCol,
  IonFooter,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  SegmentCustomEvent,
} from '@ionic/react'
import React, { Suspense, useState } from 'react'
import BackButton from '../../components/common/suspense/BackButton'
import { useParams } from 'react-router-dom'
import { GamesContext } from '../../contexts/GamesProvider'
import useSafeContext from '../../hooks/useSafeContext'
import Game from '../../models/Game'
import PlayersCount from '../../components/games/PlayersCount'
import { Translation, TranslationProvider } from 'i18nano'
import { GamePageState, GameTab } from '../../states/GamePageState'
import PlayersList from '../../components/games/views/PlayersList'
import GameModal from '../../../_src/components/games/GameModal'
import ScriptListModal from '../../../_src/components/scripts/ScriptListModal'
import { locales } from '../../locales/locales'
import PlayerModal from '../../../_src/components/players/PlayerModal'
import Player from '../../models/player/Player'
import PlayerTable from '../../../_src/components/players/PlayerTable'

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { games, updateGame } = useSafeContext(GamesContext)
  const game = games[id] ?? {} as Game
  const [state, setState] = useState<GamePageState>({
    tab: GameTab.List,
    editMode: false,
    gameModal: false,
    scriptModal: false,
  })

  const setTab = (e: SegmentCustomEvent) =>
    setState(prev => ({ ...prev, tab: e.target.value as GameTab }))

  const switchEditMode = () =>
    setState(prev => ({ ...prev, editMode: !prev.editMode }))

  const openSettings = () =>
    setState(prev => ({ ...prev, gameModal: true }))

  const renderTab = (tab: GameTab) =>
    <IonSegmentButton key={tab} value={tab}>
      <Translation path={`games.view.${tab}`} />
    </IonSegmentButton>

  const setPlayerFromModal = async (player?: Player) => {
    if (player !== undefined) 
      await updateGame(id, { players: game.players.map(p => p === state.playerModal ? player : p) })
    else
      await updateGame(id, { players: game.players.filter(p => p !== state.playerModal) })
    setState(prev => ({ ...prev, playerModal: player }))
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <BackButton path="tabs.games" />
          </IonButtons>
          <IonTitle>
            {game.name}
          </IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={switchEditMode}>
              <Translation path={state.editMode ? 'actions.done' : 'actions.edit'} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      {state.tab === GameTab.List && 
        <PlayersList 
          gameId={id} 
          editMode={state.editMode} 
          onSelect={(player) => setState(prev => ({ ...prev, playerModal: player }))} 
        />
      }
      {state.tab === GameTab.Circle && 
        <PlayerTable 
          players={game.players} 
          openPlayer={(player) => setState(prev => ({ ...prev, playerModal: player }))} 
        />
      }
      <IonFooter>
        <IonToolbar className='ion-no-padding white'>
          <IonGrid>
            <PlayersCount players={game.players} />
            <IonRow>
              <IonCol>
                <IonSegment value={state.tab} onIonChange={setTab}>
                  {Object.values(GameTab).map(renderTab)}
                </IonSegment>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonList inset className='ion-no-margin'>
                  <IonItem color='primary' button detail={false} onClick={openSettings}>
                    <IonLabel className='ion-text-center'>
                      <Translation path='games.gameSettings.title' />
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonFooter>
      <Suspense>
        <TranslationProvider translations={locales.scripts}>
        <PlayerModal
          player={state.playerModal}
          setPlayer={setPlayerFromModal}
          players={game.players}
          close={() => setState(prev => ({ ...prev, playerModal: undefined }))}
          scriptId={game.scriptId}
        />
      <ScriptListModal
          isOpen={state.scriptModal}
          close={() => setState(prev => ({ ...prev, scriptModal: false }))}
          setScript={async (scriptId) => await updateGame(id, { scriptId })}
        />
      <GameModal
        isOpen={state.gameModal}
        close={() => setState(prev => ({ ...prev, gameModal: false }))}
        openScriptModal={() => setState(prev => ({ ...prev, scriptModal: true }))}
        gameId={id}
      />
      </TranslationProvider>
      </Suspense>
    </IonPage>
  )
}

export default GamePage