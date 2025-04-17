import React, { createContext, useCallback, useContext, useEffect, useState, useMemo } from 'react'
import Game from '../models/Game'
import { StorageContext } from './StorageContext'
import { useTranslation } from 'i18nano'
import PlayerStatus from '../enums/PlayerStatus'

interface GamesContextType {
  games: Record<string, Game>
  addGame(gameToCopy?: Game): Promise<string>
  deleteGame(id: string): Promise<void>
  updateGame(id: string, game: Partial<Game>): Promise<void>
}

interface Props {
  children: React.ReactNode
}

const GamesContext = createContext<GamesContextType|null>(null)
GamesContext.displayName = 'GamesContext'

const STORAGE_KEY_PREFIX = 'games.'

const GamesProvider: React.FC<Props> = ({ children }) => {
  const [games, setGames] = useState<Record<string, Game>>({})
  const storage = useContext(StorageContext)
  const t = useTranslation()

  useEffect(() => void loadGames(), [])

  async function loadGames() {
    if (Object.values(games).length) return

    const keys = await storage!.keys()
    const gameKeys = keys.filter(key => key.startsWith(STORAGE_KEY_PREFIX))
    const result: Record<string, Game> = {}

    await Promise.all(
      gameKeys.map(async key => {
        const id = key.replace(STORAGE_KEY_PREFIX, '')
        result[id] = await storage!.get(key)
      })
    )
    setGames(result)
  }

  const addGame = useCallback(async (gameToCopy?: Game) => {
    const id = crypto.randomUUID()
    const number = Object.keys(games).length + 1
    const game = getNewGame(number.toString(), gameToCopy)

    await storage!.set(STORAGE_KEY_PREFIX + id, game)
    setGames(prev => ({ ...prev, [id]: game }))

    return id
  }, [games])

  const deleteGame = useCallback(async (id: string) => {
    await storage!.remove(`${STORAGE_KEY_PREFIX}${id}`)
    setGames(prev => {
      const { [id]: _, ...rest } = prev
      return rest
    })
  }, [])

  const updateGame = useCallback(async (id: string, game: Partial<Game>) => {
    const updated = { ...games[id], ...game }
    await storage!.set(`${STORAGE_KEY_PREFIX}${id}`, updated)
    setGames(prev => ({ ...prev, [id]: updated }))
  }, [games])

  const getNewGame = (number: string, game?: Game): Game => ({
    name: t('games.name', { number }),
    players: game?.players.map(p => ({
      id: p.id,
      status: PlayerStatus.Alive,
      name: p.name,
      pings: [],
      roles: [],
    })) || [],
    scriptId: game?.scriptId,
    created: new Date(),
  })

  const value = useMemo(() => ({
    games,
    addGame,
    deleteGame,
    updateGame,
  }), [games, addGame, deleteGame, updateGame])

  return (
    <GamesContext.Provider value={value}>
      {children}
    </GamesContext.Provider>
  )
}

export { GamesContext, GamesProvider }