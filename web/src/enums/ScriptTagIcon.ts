import { checkbox, flask, people, person, trophy } from 'ionicons/icons'
import ScriptTag from './ScriptTag'

const ScriptTagIcon = {
  [ScriptTag.WorldCup]: trophy,
  [ScriptTag.Official]: checkbox,
  [ScriptTag.Homebrew]: flask,
  [ScriptTag.Teen]: person,
  [ScriptTag.Full]: people,
}

export default ScriptTagIcon