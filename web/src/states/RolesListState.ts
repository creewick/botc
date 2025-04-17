import RoleType from '../../../cli/src/enums/RoleType'

export interface RolesListState {
  search?: string;
  type?: RoleType;
}