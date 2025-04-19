import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRow,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToolbar,
  SegmentCustomEvent
} from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'
import React, { useCallback, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import Game from '../../src/models/Game'
import PlayerTable from '../components/players/PlayerTable'
import Player from '../../src/models/player/Player'
import PlayerList from '../components/players/PlayerList'
import { GamesContext } from '../../src/contexts/GamesProvider'
import { GamePageState, GameTab } from '../../src/states/GamePageState'
import PlayerModal from '../components/players/PlayerModal'
import GameModal from '../components/games/GameModal'
import ScriptListModal from '../components/scripts/ScriptListModal'
import RoleType from '../../../cli/src/enums/RoleType'
import useSafeContext from '../../src/hooks/useSafeContext'

const GamePage: React.FC = () => {
  const { games } = useSafeContext(GamesContext)
  const [state, setState] = useState<GamePageState>({
    tab: GameTab.List,
    editMode: false,
    gameModal: false,
    scriptModal: false,
  })
  const { id } = useParams<{ id: string }>()
  // const t = useTranslation()
  const game = games[id] ?? {} as Game

  const openPlayer = useCallback((player?: Player) =>
    setState(prev => ({ ...prev, playerModal: player, gameModal: false }))
    , [])
  const setTab = useCallback((e: SegmentCustomEvent) =>
    setState(prev => ({ ...prev, tab: e.target.value as GameTab }))
    , [])
  const setPlayers = useCallback(async (players: Player[]) => {}, [])
    await setGame(id, { ...game, players })
    , [id, game, setGame])
  const setPlayerFromModal = useCallback(async (player?: Player) => {
    if (player !== undefined) await setPlayers(game.players.map(p => p === state.playerModal ? player : p))
    else await setPlayers(game.players.filter(p => p !== state.playerModal))
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

  const getCount = (type: RoleType): number | undefined => {
    const travelers = game.players?.filter(p => p.roles.includes(RoleType.Traveler))
    const count = game.players?.length - travelers?.length
    if (type === RoleType.Townsfolk)
      return Math.max(0, Math.floor((count - 1) / 3) * 2 + 1)
    if (type === RoleType.Outsider)
      return Math.max(0, (count - 1) % 3 - (count < 7 ? 1 : 0))
    if (type === RoleType.Minion)
      return Math.max(1, Math.floor((count - 1) / 3) - 1)
    if (type === RoleType.Demon)
      return 1
    if (type === RoleType.Traveler)
      return travelers?.length
  }

  const renderType = (type: RoleType) =>
  <IonRow className='ion-align-items-center' key={type}>
    <IonImg style={{display: 'inline-block'}} className='icon' src={`/botc/assets/icons/${type}.webp`} />
    {getCount(type)}
  </IonRow>
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton />
            {/* <IonBackButton text={t('games.title')} /> */}
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
        {state.tab === GameTab.List && <PlayerList {...props} />}
        {state.tab === GameTab.Circle && <PlayerTable {...props} />}
      </IonContent>

      <IonFooter>
        <IonRow className='ion-justify-content-around ion-margin-horizontal'>
          {[RoleType.Townsfolk, RoleType.Outsider, RoleType.Minion, RoleType.Demon, RoleType.Traveler].map(renderType)}
        </IonRow> 
          <IonList lines='full' inset style={{marginTop: 0}}>
            <IonItem color='light'>
              <IonSegment value={state.tab} onIonChange={setTab}>
                {Object.values(GameTab).map(tab =>
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

      {/* <PlayerModal
        player={state.playerModal}
        setPlayer={setPlayerFromModal}
        players={game.players}
        close={() => openPlayer(undefined)}
        scriptId={game.scriptId}
      />

        <ScriptListModal
          isOpen={state.scriptModal}
          close={() => setState(prev => ({ ...prev, scriptModal: false }))}
          setScript={scriptId => {}}
        />

        <GameModal
          isOpen={state.gameModal}
          close={() => setState(prev => ({ ...prev, gameModal: false }))}
          openScriptModal={() => setState(prev => ({ ...prev, scriptModal: true }))}
          gameId={id}
        /> */}
    </IonPage>
  )
}

export default GamePage