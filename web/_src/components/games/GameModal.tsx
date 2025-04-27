import {
  IonAlert,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTextarea,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import React from 'react'
import { GamesContext } from '../../../src/contexts/GamesProvider'
import Game from '../../../src/models/game/Game'
import { Translation, useTranslation } from 'i18nano'
import { useHistory } from 'react-router'
import { closeCircle, close as closeIcon } from 'ionicons/icons'
import useSafeContext from '../../../src/hooks/useSafeContext'

interface Props {
  isOpen: boolean
  close: () => void
  openScriptModal: () => void
  gameId: string
}

const GameModal: React.FC<Props> = ({ isOpen, close, gameId, openScriptModal }: Props) => {
  const { games, updateGame, addGame, deleteGame } = useSafeContext(GamesContext)
  const game = games[gameId] ?? {} as Game
  const history = useHistory()
  const t = useTranslation()

  async function copyGame() {
    const id = await addGame(game)
    close()
    history.goBack()
    setTimeout(() => history.push(`/games/${id}`), 300)
  }

  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={close}
      initialBreakpoint={0.40}
      breakpoints={[0, 0.40, 0.6, 1]}
      backdropBreakpoint={0.40}
    >
      <div>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              {game.name}
            </IonTitle>
            <IonButtons slot='end'>
              <IonButton onClick={close}>
                <IonIcon icon={closeIcon} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <IonInput
            clearInput
            autocapitalize='on'
            label={t('games.gameSettings.name')}
            value={game.name}
            onIonChange={e => updateGame(gameId, { name: e.detail.value! })}
          />
        </IonItem>
        <IonItem onClick={openScriptModal}>
          <IonInput
            label={t('games.gameSettings.script')}
            value={t(game.scriptId ?? '')}
            readonly
          />
          <button
            className='input-clear-icon sc-ion-input-ios'
            onClick={(e) => {
              updateGame(gameId, { scriptId: undefined })
              e.stopPropagation()
            }}
          >
            <IonIcon className='sc-ion-input-ios ios' icon={closeCircle} color='medium' />
          </button>
        </IonItem>
        <IonItem>
          <IonTextarea
            autocapitalize='on'
            label={t('games.player.note')}
            value={game.note}
            autoGrow={true}
            onIonInput={e => updateGame(gameId, { note: e.detail.value! })}
          />
          <button
            className='input-clear-icon sc-ion-input-ios'
            onClick={() => updateGame(gameId, { note: undefined })}
          >
            <IonIcon className='sc-ion-input-ios ios' icon={closeCircle} color='medium' />
          </button>
        </IonItem>
        <IonItem button detail={false} onClick={copyGame}>
          <IonLabel color='primary'>
            <Translation path="actions.copyGame" />
          </IonLabel>
        </IonItem>
        <IonItem button detail={false}>
          <IonLabel color='danger' id='delete-game'>
            <Translation path="actions.deleteGame" />
          </IonLabel>
        </IonItem>
      </div>

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
            handler: () => {
              close()
              deleteGame(gameId)
              history.goBack()
            }
          }
        ]}
      />
    </IonModal>
  )
}

export default GameModal