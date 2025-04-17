import PlayerAlignment from '../../enums/PlayerAlignment'
import PlayerPing from './PlayerPing'
import PlayerStatus from '../../enums/PlayerStatus'

interface Player {
  id: string;
  name: string;
  status: PlayerStatus;
  roles: string[];
  pings: PlayerPing[];
  alignment?: PlayerAlignment;
  note?: string;
}

export default Player