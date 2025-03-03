import React, { createContext, useCallback, useContext, useState } from 'react'
import Game from '../models/games/Game'
import { StorageContext } from './StorageContext'
import { useTranslation } from 'i18nano'
import PlayerStatus from '../models/games/PlayerStatus'

interface GamesContextType {
  games: Record<string, Game>
  loadGames: () => Promise<void>
  addGame: (gameToCopy?: Game) => Promise<string>
  deleteGame: (id: string) => Promise<void>
  setGame: (id: string, game: Game) => Promise<void>
}

const GamesContext = createContext<GamesContextType>({
  games: {},
  loadGames: () => Promise.resolve(),
  addGame: () => Promise.resolve(''),
  deleteGame: () => Promise.resolve(),
  setGame: () => Promise.resolve(),
})

interface Props {
  children: React.ReactNode
}

const PREFIX = 'games.'

const GamesProvider: React.FC<Props> = ({ children }) => {
  const [games, setGames] = useState<Record<string, Game>>({})
  const storage = useContext(StorageContext)
  const t = useTranslation()

  const loadGames = useCallback(async () => {
    if (Object.values(games).length) return

    const allKeys = await storage!.keys()
    const gameKeys = allKeys.filter(key => key.startsWith(PREFIX))
    const result: Record<string, Game> = {}

    await Promise.all(
        gameKeys.map(async key => {
          const id = key.replace(PREFIX, '')
          result[id] = await storage!.get(key)
        })
    )
    setGames(result)
  }, [])

  const addGame = useCallback(async (gameToCopy?: Game) => {
    const game = getNewGame(gameToCopy)
    const id = getUniqueUUID()

    await storage!.set(PREFIX + id, game)
    setGames(prev => ({ ...prev, [id]: game }))

    return id
  }, [games])

  const deleteGame = useCallback(async (id: string) => {
    await storage!.remove(`${PREFIX}${id}`)
    setGames(prev => {
      const { [id]: _, ...rest } = prev
      return rest
    })
  }, [])

  const setGame = useCallback(async (id: string, game: Game) => {
    // foreach games and update the one with the same id
    await storage!.set(`${PREFIX}${id}`, game)
    setGames(prev => ({ ...prev, [id]: game }))
  }, [])

  function getUniqueUUID(): string {
    const id = crypto.randomUUID()
    return id in games ? getUniqueUUID() : id
  }

  const getNewGame = (game?: Game) => ({
    name: `${t('games.game')} #${Object.keys(games).length + 1}`,
    players: game?.players.map(p => ({
      status: PlayerStatus.Alive,
      name: p.name,
      roles: [],
    })) || [],
    scriptId: game?.scriptId,
    created: new Date(),
  })

  return (
      <GamesContext.Provider value={{
        games,
        loadGames,
        addGame,
        deleteGame,
        setGame,
      }}>
        {children}
      </GamesContext.Provider>
  )
}

export { GamesContext, GamesProvider }