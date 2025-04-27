import { IonAlert } from '@ionic/react'
import { useTranslation } from 'i18nano'
import React from 'react'
import { GamesContext } from '../../contexts/GamesProvider'
import useSafeContext from '../../hooks/useSafeContext'

interface Props {
  gameId: string
  playerId: string
  trigger: string
}

const PlayerDeleteAlert: React.FC<Props> = ({ gameId, playerId, trigger }) => {
  const t = useTranslation()
  const { games, updateGame } = useSafeContext(GamesContext)
  const player = games[gameId].players.find(p => p.id === playerId)

  const deletePlayer = async () => {
    await updateGame(gameId, {
      players: games[gameId].players.filter(p => p !== player)
    })
  }

  const buttons = [
    {
      text: t('actions.cancel'),
      role: 'cancel'
    }, {
      text: t('actions.delete'),
      role: 'destructive',
      handler: deletePlayer
    }
  ]

  return (
    <IonAlert
      trigger={trigger}
      header={t('actions.deletePlayer', { name: player.name })}
      message={t('actions.youCantUndoThisAction')}
      buttons={buttons}
    />
  )
}

export default PlayerDeleteAlert