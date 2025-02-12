import RoleType from '../enums/RoleType'
import Limitation from './Limitation'
import LocalizedText from './LocalizedText'

interface Role {
  id: string;
  name: LocalizedText;
  ability: LocalizedText;
  flavor: LocalizedText;
  type: RoleType;
  edition: string;
  setup: boolean;
  reminders?: LocalizedText[];
  jinxes?: Limitation[];
  firstNightOrder?: number;
  otherNightOrder?: number;
  firstNightReminder?: LocalizedText;
  otherNightReminder?: LocalizedText;
}

export default Role