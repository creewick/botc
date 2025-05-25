import PlayerStatus from './PlayerStatus'

interface Player {
  name: string;
  roles: string[];
  note?: string;
  status: PlayerStatus;
}

export default Player