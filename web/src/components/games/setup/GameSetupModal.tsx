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
import React, { ReactNode, useRef } from 'react'
import GameSetupStep from '../../../models/game/GameSetupStep'
import { Translation } from 'i18nano'
import { chevronForward } from 'ionicons/icons'
import './GameSetupModal.css'
import PlayersStep from './steps/PlayersStep'
import ScriptsStep from './steps/ScriptsStep'
import BackButton from '../../common/suspense/BackButton'
import FabledStep from './steps/FabledStep'
import RolesStep from './steps/RolesStep'

interface Props extends PageProps {
  isOpen: boolean
  close: () => void
}

interface PageProps {
  step: GameSetupStep
}


const Steps: Record<GameSetupStep, ReactNode> = {
  [GameSetupStep.Players]: <PlayersStep />,
  [GameSetupStep.Script]: <ScriptsStep />,
  [GameSetupStep.Fabled]: <FabledStep />,
  [GameSetupStep.Roles]: <RolesStep />,
  [GameSetupStep.Bluffs]: undefined
}

const GameSetupModal: React.FC<Props> = ({ isOpen, close, step }) => {
  const navigation = useRef<HTMLIonNavElement>(null)

  const onDidPresent = () => {
    const index = Object.values(GameSetupStep).indexOf(step!)
    const pages = Object.values(GameSetupStep).slice(0, index + 1).map((step) => ({
      component: ModalPage,
      componentProps: { step }
    }))

    navigation.current?.setPages(pages)
  }

  return (
    <IonModal 
      keepContentsMounted
      isOpen={isOpen} 
      onWillPresent={onDidPresent} 
      onDidDismiss={close} 
      initialBreakpoint={1} 
      breakpoints={[0, 1]} 
      handle={false}
    >
      <IonNav ref={navigation} />
    </IonModal>
  )
}

const ModalPage: React.FC<PageProps> = ({ step }) => {
  const index = Object.values(GameSetupStep).indexOf(step!)
  const prev = Object.values(GameSetupStep)[index - 1]
  const next = Object.values(GameSetupStep)[index + 1]

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
            <IonNavLink routerDirection="forward" component={ModalPage} componentProps={{ step: next }}>
              <IonButton>
                <Translation path={`games.sections.${next}`} />
                <IonIcon icon={chevronForward} className='forward-button' />
              </IonButton>
            </IonNavLink>
          </IonButtons>
          }
        </IonToolbar>
      </IonHeader>
      {Steps[step]}
    </>
  )
}

export default GameSetupModal
