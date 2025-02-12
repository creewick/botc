import SpecialFeature from '../schema/SpecialFeature'
import { JinxInnerResponse } from './JinxResponse'

interface RoleResponse {
  id: string;
  name: string;
  edition: string;
  team: string;
  firstNightReminder: string;
  otherNightReminder: string;
  setup: boolean;
  ability: string;
  flavor: string;
  firstNight: number;
  otherNight: number;
  reminders?: string[];
  jinxes?: JinxInnerResponse[];
  special?: SpecialFeature[];
}

export default RoleResponse