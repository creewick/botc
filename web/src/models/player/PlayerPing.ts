import PlayerAlignment from '../../enums/PlayerAlignment'

interface PlayerPing {
  to: string;
  alignment?: PlayerAlignment;
}

export default PlayerPing