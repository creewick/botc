import Player from './games/Player'

export enum GameTab {
  List = 'list',
  Circle = 'circle',
}

export interface GamePageState {
  tab: GameTab
  editMode: boolean
  gameModal: boolean
  playerModal?: Player
}