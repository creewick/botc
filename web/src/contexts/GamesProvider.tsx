import React, { createContext, useContext, useState } from 'react'
import Game from '../models/games/Game'
import { StorageContext } from './StorageContext'
import { useTranslation } from 'i18nano'
import PlayerStatus from '../models/games/PlayerStatus'

interface GamesContextType {
  games: Record<string, Game>
  loadGames: () => Promise<void>
  addGame: (gameToCopy?: Game) => Promise<string>
  deleteGame: (id: string) => Promise<void>
}

const GamesContext = createContext<GamesContextType>({
  games: {},
  loadGames: () => Promise.resolve(),
  addGame: () => Promise.resolve(''),
  deleteGame: () => Promise.resolve(),
})

interface Props {
  children: React.ReactNode
}

const PREFIX = 'games.'

const GamesProvider: React.FC<Props> = ({ children }) => {
  const [games, setGames] = useState<Record<string, Game>>({})
  const storage = useContext(StorageContext)
  const t = useTranslation()

  async function loadGames() {
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
  }

  async function addGame(gameToCopy?: Game) {
    const id = getUniqueUUID()
    const game = getNewGame(gameToCopy)

    await storage!.set(PREFIX + id, game)
    setGames({ ...games, [id]: game })

    return id
  }

  async function deleteGame(id: string) {
    await storage!.remove(`${PREFIX}${id}`)
    setGames(prev => {
      const { [id]: _, ...rest } = prev
      return rest
    })
  }

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
    <GamesContext.Provider value={{ games, loadGames, addGame, deleteGame }}>
      {children}
    </GamesContext.Provider>
  )
}

export { GamesContext, GamesProvider }