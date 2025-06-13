import OfficialCharacter from './OfficialCharacter'
import ScriptCharacter from './ScriptCharacter'
import ScriptMeta from './ScriptMeta'

type CharacterId = string

type Script = (
  ScriptMeta |
  ScriptCharacter |
  OfficialCharacter |
  CharacterId
)[]

export default Script
