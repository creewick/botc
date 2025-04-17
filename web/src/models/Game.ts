import Player from './Player'

interface Game {
  name: string;
  created: Date;
  players: Player[];
  scriptId?: string;
  note?: string;
}

export default Game