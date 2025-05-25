import RoleType from '../../../cli/src/enums/RoleType'
import Role from '../../../cli/src/models/Role'

export interface RoleListState {
  query?: string;
  type?: RoleType;
  group?: KeyOption;
  sort?: KeyOption;
  view?: RoleListView;
  role?: Role;
}

export interface KeyOption {
  name: string
  key?: Key
}

export type Key = (role: Role) => number | string

export enum RoleListView {
  List = 'list',
  Grid = 'grid',
}
