interface SpecialFeature {
  /**
   * The integration type, where the feature will be used.
   */
  type: 'selection' | 'ability' | 'signal' | 'vote' | 'reveal';
  /**
   * The feature name reference
   */
  name:
  | 'grimoire'
  | 'pointing'
  | 'ghost-votes'
  | 'distribute-roles'
  | 'bag-disabled'
  | 'bag-duplicate'
  | 'multiplier'
  | 'hidden'
  | 'replace-character'
  | 'player'
  | 'card';
  /**
   * Special ability value
   */
  value?: string | number;
  /**
   * At which point during the game can the ability be used
   */
  time?:
  | 'pregame'
  | 'day'
  | 'night'
  | 'firstNight'
  | 'firstDay' | 'otherNight' | 'otherDay';
  /**
   * If it's a global ability that can be used without the character being 
   * in play, this property defines on which characters it can be used. 
   * This does not work on Fabled, because they are not considered to be 
   * on the Script.
   */
  global?: 'townsfolk' | 'outsider' | 'minion' | 'demon' | 'traveler';
}

export default SpecialFeature