import Player from '../player/Player'

interface Game {
  name: string;
  created: Date;
  players: Player[];
  scriptId?: string;
  fabled: string[];
  roles: string[];
  bluffs: string[];
  note?: string;
}

export default Game