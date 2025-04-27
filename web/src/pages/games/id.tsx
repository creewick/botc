import {
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React, { useState } from 'react'
import BackButton from '../../components/common/suspense/BackButton'
import { useParams } from 'react-router-dom'
import { GamesContext } from '../../contexts/GamesProvider'
import useSafeContext from '../../hooks/useSafeContext'
import { Translation, TranslationProvider } from 'i18nano'
import { ellipse, play } from 'ionicons/icons'
import { locales } from '../../locales/locales'
import GameSetupStep from '../../models/game/GameSetupStep'
import GameSetupModal from '../../components/games/setup/GameSetupModal'

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { games, updateGame } = useSafeContext(GamesContext)
  const [step, setStep] = useState<GameSetupStep>()
  const game = games[id] ?? undefined

  const openModal = (step: GameSetupStep) => {
    (document.activeElement as HTMLElement)?.blur()
    setStep(step)
  }

  const setName = (e: Event) => {
    const name = (e.target as HTMLInputElement).value
    updateGame(id, { name })
  }

  const renderSection = (section: GameSetupStep) =>
    <IonItem key={section} color='light' button onClick={() => openModal(section)}>
      <IonIcon slot='start' icon={ellipse} size='small' color={getColor(section)} />
      <IonLabel>
        <Translation path={`games.sections.${section}`} />
      </IonLabel>
      <IonNote slot='end'>{getValue(section)}</IonNote>
    </IonItem>

  const getColor = (section: GameSetupStep) => {
    if (section === GameSetupStep.Players)
      return getPlayersColor(game.players.length)
    if (section === GameSetupStep.Script)
      return getScriptColor(game.scriptId)
    if (section === GameSetupStep.Fabled)
      return getFabledColor(game.fabled.length)
    if (section === GameSetupStep.Roles)
      return getRolesColor(game.roles.length, game.players.length)
    if (section === GameSetupStep.Bluffs)
      return getBluffsColor(game.bluffs.length)
  }

  const getPlayersColor = (players: number) =>
    players < 5 ? 'danger' :
      players < 7 ? 'warning' :
        'success'

  const getScriptColor = (scriptId?: string) => !scriptId ? 'warning' : 'success'
  const getFabledColor = (fabled: number) => !fabled ? 'warning' : 'success'

  const getRolesColor = (roles: number, players: number) =>
    roles < 1 || roles < players ? 'danger' : 'success'

  const getBluffsColor = (bluffs: number) => bluffs < 3 ? 'danger' : 'success'

  const getValue = (section: GameSetupStep) => {
    if (section === GameSetupStep.Players)
      return game.players.length
    if (section === GameSetupStep.Script)
      return (
        <TranslationProvider translations={locales.scripts}>
          <Translation path={game.scriptId ?? ''} />
        </TranslationProvider>
      )
    if (section === GameSetupStep.Fabled)
      return game.fabled.length
    if (section === GameSetupStep.Roles)
      return game.roles.length
    if (section === GameSetupStep.Bluffs)
      return game.bluffs.length
  }

  if (!game) return

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar>
          <IonButtons slot="start">
            <BackButton path="tabs.games" />
          </IonButtons>
          <IonTitle>
            <IonInput value={game.name} onIonChange={setName} />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse='condense'>
          <IonToolbar>
            <IonTitle size='large'>
              <IonInput value={game.name} onIonChange={setName} />
            </IonTitle>
            <IonNote className='ion-margin-horizontal'>
              {game.created.toLocaleString()}
            </IonNote>
          </IonToolbar>
        </IonHeader>
        <IonList inset>
          {Object.values(GameSetupStep).map(renderSection)}
        </IonList>
        <IonList inset>
          <IonItem color='primary'>
            <IonIcon slot='start' icon={play} size='small' />
          </IonItem>
        </IonList>
      </IonContent>
      <GameSetupModal isOpen={!!step} close={() => setStep(undefined)} step={step ?? GameSetupStep.Players} />
    </IonPage>
  )
}

export default GamePage