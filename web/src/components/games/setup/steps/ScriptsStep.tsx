import { TranslationProvider } from 'i18nano'
import React from 'react'
import ScriptsList from '../../../scripts/ScriptsList'
import { locales } from '../../../../locales/locales'
import { useParams } from 'react-router'
import { GamesContext } from '../../../../contexts/GamesProvider'
import useSafeContext from '../../../../hooks/useSafeContext'

const ScriptsStep: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { games, updateGame } = useSafeContext(GamesContext)
  const game = games[id] ?? undefined

  const onSelect = (scriptId: string) => {
    updateGame(id, { scriptId: scriptId === game?.scriptId ? undefined : scriptId })
  }

  return (
    <TranslationProvider translations={locales.scripts}>
      <ScriptsList header onSelect={onSelect} selectedId={game?.scriptId ?? ''} />
    </TranslationProvider>
  )
}

export default ScriptsStep