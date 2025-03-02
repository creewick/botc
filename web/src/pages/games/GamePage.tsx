import {
  IonAlert,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'
import { closeCircle, copyOutline } from 'ionicons/icons'
import React, { MouseEvent, useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Game from '../../models/games/Game'
import PlayerTable from '../../components/players/PlayerTable'
import Script from '../../../../cli/src/schema/Script'
import Player from '../../models/games/Player'
import PlayerView from '../../components/players/PlayerView'
import ScriptMeta from '../../../../cli/src/schema/ScriptMeta'
import PlayerList from '../../components/players/PlayerList'
import { ScriptsContext } from '../../contexts/ScriptsContext'
import { GamesContext } from '../../contexts/GamesProvider'

enum GameTab {
  Table = 'table',
  List = 'list',
}

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()
  const t = useTranslation()

  const { games, loadGames, addGame, deleteGame, setGame } = useContext(GamesContext)
  const { scripts, loadScripts } = useContext(ScriptsContext)
  const [scriptModal, setScriptModal] = useState(false)
  const [player, setPlayer] = useState<Player>()
  const game = games[id] ?? {} as Game

  useEffect(() => {
    void loadScripts()
    void loadGames()
  }, [])

  const updatePlayer = (value?: Player) => {
    setGame(
        id,
        {
          ...game,
          players: game.players
              .map(p => p === player ? value : p)
              .filter(p => p !== undefined)
        }
    )
    setPlayer(value)
  }

  const renderScript = (id: string, script: Script, index: number) => {
    const meta = script
      .find(item => (item as ScriptMeta).id === '_meta') as ScriptMeta

    const setScript = () => {
      setGame(id, { ...game, scriptId: id })
      setScriptModal(false)
    }

    return (
      <IonItem onClick={setScript} detail={false} key={index} button>
        <IonLabel>
          <h2><Translation path={id} /></h2>
          <p>{meta?.author}</p>
        </IonLabel>
      </IonItem>
    )
  }

  const renderClearButton = (condition: boolean, action: () => void) => {
    if (!condition) return

    function onClick(event: MouseEvent) {
      action()
      event.stopPropagation()
    }

    return <IonIcon size='small' icon={closeCircle} onClick={onClick} />
  }

  async function copyGame() {
    const id = await addGame(game)
    history.goBack()
    setTimeout(() => history.push(`/games/${id}`), 300)
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
            <IonButton onClick={copyGame}>
              <IonIcon icon={copyOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonSegmentView style={{ height: 'calc(100vmin + 0.8rem)' }}>
          <IonSegmentContent id='table' style={{ maxHeight: 'calc(100vmin + 0.8rem)', overflowY: 'scroll' }}>
            <PlayerTable
              players={game.players ?? []}
              openPlayer={setPlayer}
            />
          </IonSegmentContent>
          <IonSegmentContent id='list' style={{ maxHeight: 'calc(100vmin + 0.8rem)', overflowY: 'scroll' }}>
            <PlayerList
              game={game}
              setGame={(game) => setGame(id, game)}
              openPlayer={setPlayer}
            />
          </IonSegmentContent>

        </IonSegmentView>
        <IonList inset={true}>
          <IonItem color='light'>
            <IonSegment>
              {Object
                .values(GameTab)
                .filter(tab => !(tab === GameTab.Table && (game.players?.length ?? 0) === 0))
                .map((tab) =>
                  <IonSegmentButton key={tab} value={tab} contentId={tab}>
                    <Translation path={`games.tabs.${tab}`} />
                  </IonSegmentButton>
                )}
            </IonSegment>
          </IonItem>
          <IonItem color='light' onClick={() => setScriptModal(true)}>
            <IonInput
              labelPlacement='stacked'
              label={t('games.script')}
              value={t(game.scriptId ?? '')}
              readonly
            />
            {renderClearButton(
              !!game.scriptId,
              () => setGame(id, { ...game, scriptId: undefined })
            )}
          </IonItem>
          <IonItem color='light'>
            <IonInput
              labelPlacement='stacked'
              label={t('games.name')}
              value={game.name}
              onIonChange={e => setGame(id, { ...game, name: e.detail.value! })}
            />
          </IonItem>
          <IonItem color='light'>
            <IonTextarea
              autocapitalize='on'
              labelPlacement='stacked'
              label={t('games.players.note')}
              value={game.note}
              autoGrow={true}
              onIonInput={e => setGame(id, { ...game, note: e.detail.value! })}
            />
            <button
              className='input-clear-icon sc-ion-input-ios'
              onClick={() => setGame(id, { ...game, note: undefined })}
            >
              <IonIcon className='sc-ion-input-ios ios' icon={closeCircle} />
            </button>
          </IonItem>
          <IonItem color='light' button detail={false}>
            <IonLabel color='danger' id='delete-game'>
              <Translation path="actions.deleteGame" />
            </IonLabel>
          </IonItem>
        </IonList>

        <IonModal
          isOpen={!!player}
          onDidDismiss={() => setPlayer(undefined)}
          initialBreakpoint={0.4}
          breakpoints={[0, 0.4, 0.6, 1]}
          backdropBreakpoint={0.4}
        >
          {player &&
            <PlayerView
              player={player}
              setPlayer={updatePlayer}
              scriptId={game.scriptId}
            />
          }
        </IonModal>

        <IonModal
          isOpen={scriptModal}
          onDidDismiss={() => setScriptModal(false)}
          initialBreakpoint={1}
          breakpoints={[0, 1]}
        >
          <IonContent>
            <IonList>
              {Object.entries(scripts ?? {})
                .map(([id, script], index) =>
                  renderScript(id, script, index))
              }
            </IonList>
          </IonContent>
        </IonModal>

        <IonAlert
          trigger="delete-game"
          header={t('actions.deleteGame') + '?'}
          message={t('actions.youCantUndoThisAction')}
          buttons={[
            {
              text: t('actions.cancel'),
              role: 'cancel'
            }, {
              text: t('actions.delete'),
              role: 'destructive',
              handler: () => deleteGame(id)
            }
          ]}
        />
      </IonContent>
    </IonPage>
  )
}

export default GamePage