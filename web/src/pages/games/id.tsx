import {
  IonPage,
} from '@ionic/react'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import GameSetupStep from '../../models/game/GameSetupStep'
import GameSetupList from '../../components/games/setup/GameSetupList'
import GameSetupModal from '../../components/games/setup/GameSetupModal'

const GamePage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [step, setStep] = useState<GameSetupStep>()

  return (
    <IonPage>
      <GameSetupList id={id} setStep={setStep} />
      <GameSetupModal isOpen={!!step} close={() => setStep(undefined)} step={step ?? GameSetupStep.Players} />
    </IonPage>
  )
}

export default GamePage