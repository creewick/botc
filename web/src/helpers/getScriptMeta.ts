import ScriptMetaExtended from '../../../cli/src/models/ScriptMetaExtended'
import Script from '../../../cli/src/schema/Script'
import ScriptMeta from '../../../cli/src/schema/ScriptMeta'

export const getScriptMeta = (script: Script) => 
  script.find(item => (item as ScriptMeta).id === '_meta') as ScriptMetaExtended
