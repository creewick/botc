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
  IonListHeader,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'
import { addCircleOutline, closeCircle } from 'ionicons/icons'
import React, { MouseEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useStorageState from '../../hooks/useStorageState'
import Game from '../../models/games/Game'
import Table from '../../components/Table'
import Script from '../../../../cli/src/schema/Script'
import Player from '../../models/games/Player'
import PlayerStatus from '../../models/games/PlayerStatus'
import PlayerView from '../../components/players/PlayerView'
import ScriptMeta from '../../../../cli/src/schema/ScriptMeta'

const scriptFiles = import.meta.glob('/public/assets/scripts/*.json')

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [game, setGame, storage] = 
    useStorageState<Game>(`games.${id}`, {} as Game)
  const [allScripts, setAllScripts] = useState<Record<string, Script>>()
  const [scriptModal, setScriptModal] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState<Player>()
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
        .map(player => player === selectedPlayer ? value : player)
        .filter(player => player !== undefined)
    })
    setSelectedPlayer(value)
  }

  const addPlayer = () => {
    setGame({
      ...game,
      players: [
        ...game.players,
        { 
          name: `${t('games.player')} ${game.players.length + 1}`, 
          status: PlayerStatus.Alive,
          roles: [], 
        }
      ]
    })
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
          <IonButtons slot='end'>
            <IonButton onClick={addPlayer}>
              <IonIcon icon={addCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>      
        <Table players={game.players ?? []} openPlayer={setSelectedPlayer} />
        <IonListHeader />
        <IonList inset={true}>
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
          isOpen={!!selectedPlayer}
          onDidDismiss={() => setSelectedPlayer(undefined)}
          initialBreakpoint={0.4}
          breakpoints={[0, 0.4, 1]}
          backdropBreakpoint={0.4}
        >
          {selectedPlayer &&
            <PlayerView 
              player={selectedPlayer} 
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