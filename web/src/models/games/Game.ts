import Player from './Player'

interface Game {
  name: string;
  scriptId?: string;
  players: Player[];
  created: Date;
}

export default Game