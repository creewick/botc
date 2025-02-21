import ScriptMeta from '../schema/ScriptMeta'

interface ScriptMetaExtended extends ScriptMeta {
  tags?: string[];
  difficulty?: {
    storyteller: number;
    player: number;
  }
}

export default ScriptMetaExtended