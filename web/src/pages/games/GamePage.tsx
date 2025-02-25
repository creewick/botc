import {
  IonAlert,
  IonBackButton,
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
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'
import { closeCircle } from 'ionicons/icons'
import React, { MouseEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useStorageState from '../../hooks/useStorageState'
import Game from '../../models/games/Game'
import PlayerTable from '../../components/players/PlayerTable'
import Script from '../../../../cli/src/schema/Script'
import Player from '../../models/games/Player'
import PlayerView from '../../components/players/PlayerView'
import ScriptMeta from '../../../../cli/src/schema/ScriptMeta'
import PlayerList from '../../components/players/PlayerList'

enum GameTab {
  List = 'list',
  Table = 'table',
}

const scriptFiles = import.meta.glob('/public/assets/scripts/*.json')

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [game, setGame, storage] = 
    useStorageState<Game>(`games.${id}`, {} as Game)
  const [allScripts, setAllScripts] = useState<Record<string, Script>>()
  const [tab, setTab] = useState<GameTab>(GameTab.List)
  const [scriptModal, setScriptModal] = useState(false)
  const [player, setPlayer] = useState<Player>()
  const t = useTranslation()

  useEffect(() => void loadScripts(), [])

  const loadScripts = async () => {
    const result: Record<string, Script> = {}
    for (const path in scriptFiles) {
      const module = await scriptFiles[path]() as { default: Script }
      const id = path.split('/').pop()!.replace('.json', '')
      result[id] = module.default
    }
    setAllScripts(result)
  }

  const updatePlayer = (value?: Player) => {
    setGame({
      ...game,
      players: game.players
        .map(p => p === player ? value : p)
        .filter(p => p !== undefined)
    })
    setPlayer(value)
  }

  const renderScript = (id: string, script: Script, index: number) => {
    const meta = script
      .find(item => (item as ScriptMeta).id === '_meta') as ScriptMeta

    const setScript = () => {
      setGame({...game, scriptId: id})
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
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        { tab === GameTab.List &&
          <PlayerList
            game={game}
            setGame={setGame}
            openPlayer={setPlayer}
          />
        }
        { tab === GameTab.Table &&
          <PlayerTable 
            players={game.players ?? []} 
            openPlayer={setPlayer}
          />
        }
        <IonList inset={true}>
          <IonItem color='light'>
            <IonSegment 
              value={tab} 
              onIonChange={e => setTab(e.detail.value as GameTab)}
            >
              {Object.values(GameTab).map((tab) => 
                <IonSegmentButton key={tab} value={tab}>
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
              () => setGame({...game, scriptId: undefined })
            )}
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
              {Object.entries(allScripts ?? {})
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
              handler: async () => {
                await storage!.remove(`games.${id}`)
                history.back()
                setTimeout(() => location.reload(), 100)
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  )
}

export default GamePage