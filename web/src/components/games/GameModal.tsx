import {
  IonAlert,
  IonButton,
  IonButtons,
  IonContent,
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
import React, { useContext } from 'react'
import { GamesContext } from '../../contexts/GamesProvider'
import Game from '../../models/games/Game'
import { Translation, useTranslation } from 'i18nano'
import { useHistory } from 'react-router'
import { closeCircle, close as closeIcon } from 'ionicons/icons'

interface Props {
  isOpen: boolean
  close: () => void
  openScriptModal: () => void
  gameId: string
}

const GameModal: React.FC<Props> = ({ isOpen, close, gameId, openScriptModal }: Props) => {
  const { games, setGame, deleteGame, addGame } = useContext(GamesContext)
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
      <IonContent>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {game.name}
          </IonTitle>
          <IonButtons slot='end'>
                          <IonButton onClick={close}>
                            <IonIcon icon={closeIcon}/>
                          </IonButton>
                        </IonButtons>
        </IonToolbar>
      </IonHeader>
        <IonItem>
          <IonInput
            clearInput
            autocapitalize='on'
            label={t('games.name')}
            value={game.name}
            onIonChange={e => setGame(gameId, { ...game, name: e.detail.value! })}
          />
        </IonItem>
        <IonItem onClick={openScriptModal}>
          <IonInput
            label={t('games.script')}
            value={t(game.scriptId ?? '')}
            readonly
          />
          <button
            className='input-clear-icon sc-ion-input-ios'
            onClick={(e) => {
              setGame(gameId, { ...game, scriptId: undefined })
              e.stopPropagation()
            }}
          >
            <IonIcon className='sc-ion-input-ios ios' icon={closeCircle} color='medium' />
          </button>
        </IonItem>
        <IonItem>
          <IonTextarea
            autocapitalize='on'
            label={t('games.players.note')}
            value={game.note}
            autoGrow={true}
            onIonInput={e => setGame(gameId, { ...game, note: e.detail.value! })}
          />
          <button
            className='input-clear-icon sc-ion-input-ios'
            onClick={() => setGame(gameId, { ...game, note: undefined })}
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
      </IonContent>

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