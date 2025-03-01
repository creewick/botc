import Player from './Player'

interface Game {
  name: string;
  players: Player[];
  created: Date;
  scriptId?: string;
  note?: string;
}

export default Game