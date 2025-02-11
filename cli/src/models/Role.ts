import RoleType from '../enums/RoleType'
import Limitation from './Limitation'
import LocalizedText from './LocalizedText'

interface Role {
  id: string;
  type: RoleType;
  edition: string;
  name: LocalizedText;
  summary: LocalizedText;
  flavor: LocalizedText;
  jinxes: Limitation[];
  firstNightOrder?: number;
  otherNightOrder?: number;
}

export default Role