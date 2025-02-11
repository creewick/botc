import { TargetLanguageCode } from 'deepl-node'

interface TranslationContext {
  lang: TargetLanguageCode;
  nameContext?: { context: string };
  summaryContext?: { context: string };
  flavorContext?: { context: string };
  jinxContext?: { context: string };
}


export default TranslationContext