import Jinx from './Jinx'
import SpecialFeature from './SpecialFeature'

interface ScriptCharacter {
  /**
   * Character ID, alphanumeric lowercase
   */
  id: string;
  /**
   * Character name
   */
  name: string;
  /**
   * Character icon URLs
   * 
   * For non-traveler characters, the icons should be regular alignment and 
   * flipped alignment, for travelers they should be unaligned, good 
   * alignment and evil alignment
   */
  image?: string | string[] | null;
  /**
   * Character team
   */
  team: 'townsfolk' | 'outsider' | 'minion' | 'demon' | 'traveler' | 'fabled';
  /**
   * The edition ID
   */
  edition?: string;
  /**
   * Character ability
   */
  ability: string;
  /**
   * Character flavor text
   */
  flavor?: string;
  /**
   * First night wake-up priority. 0 means this character doesn't wake during
   * the first night.
   */
  firstNight?: number;
  /**
   * First night Storyteller reminder
   */
  firstNightReminder?: string;
  /**
   * Other night wake-up priority. 0 means this character doesn't wake during
   * other nights.
   */
  otherNight?: number;
  /**
   * Other night Storyteller reminder
   */
  otherNightReminder?: string;
  /**
   * Character reminder tokens
   */
  reminders?: string[];
  /**
   * Global character reminder tokens, which will be selectable even when
   * the character is not in play.
   */
  remindersGlobal?: string[];
  /**
   * Whether this character has a ability that is relevant for the game setup.
   */
  setup?: boolean;
  /**
   * Jinxes with other characters on this script
   */
  jinxes?: Jinx[];
  /**
   * Special app integration features for this character
   */
  special?: SpecialFeature[];
}

export default ScriptCharacter