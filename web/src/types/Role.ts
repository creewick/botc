import RoleType from './RoleType'

interface Role {
  id: string;
  type: RoleType;
  edition: string;
  setup: boolean;
  firstNightOrder?: number;
  otherNightOrder?: number;
  jinxes?: string[];
}

export default Role