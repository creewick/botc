import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonModal,
  IonNav,
  IonNavLink,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import React, { ReactNode, useMemo } from 'react'
import GameSetupStep from '../../../models/game/GameSetupStep'
import BackButton from '../../common/suspense/BackButton'
import { Translation } from 'i18nano'
import { chevronForward } from 'ionicons/icons'
import './GameSetupModal.css'
import PlayersStep from './steps/players'

interface Props {
  isOpen: boolean
  close: () => void
  step: GameSetupStep
}

interface PageProps {
  step: GameSetupStep
}

const Steps: Record<GameSetupStep, ReactNode> = {
  [GameSetupStep.Players]: <PlayersStep />,
  [GameSetupStep.Script]: undefined,
  [GameSetupStep.Fabled]: undefined,
  [GameSetupStep.Roles]: undefined,
  [GameSetupStep.Bluffs]: undefined
}

const GameSetupModal: React.FC<Props> = ({ isOpen, close, step }) => (
  <IonModal isOpen={isOpen} onDidDismiss={close} initialBreakpoint={1} breakpoints={[0, 1]} handle={false}>
    <IonNav root={() => <ModalPage step={step} />} />
  </IonModal>
)

const ModalPage: React.FC<PageProps> = ({ step }) => {
  const index = useMemo(() => Object.values(GameSetupStep).indexOf(step), [step])
  const prev = useMemo(() => Object.values(GameSetupStep)[index - 1], [index])
  const next = useMemo(() => Object.values(GameSetupStep)[index + 1], [index])

  return (
    <>
      <IonHeader>
        <IonToolbar>
          {prev &&
          <IonButtons slot='start'>
            <BackButton path={`games.sections.${prev}`} />
          </IonButtons>}
          <IonTitle>
            <Translation path={`games.sections.${step}`} />
          </IonTitle>
          {next &&
          <IonButtons slot='end'>
            <IonNavLink routerDirection="forward" component={() => <ModalPage step={next} />}>
              <IonButton>
                <Translation path={`games.sections.${next}`} />
                <IonIcon icon={chevronForward} className='forward-button' />
              </IonButton>
            </IonNavLink>
          </IonButtons>
          }
        </IonToolbar>
      </IonHeader>
      <div className='modal-content'>
        {Steps[step]}
      </div>
    </>
  )
}

export default GameSetupModal
