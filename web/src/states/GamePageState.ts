import Player from '../../src/models/player/Player'

export enum GameTab {
  List = 'list',
  Circle = 'circle',
}

export interface GamePageState {
  tab: GameTab
  editMode: boolean
  gameModal: boolean
  scriptModal: boolean
  playerModal?: Player
}