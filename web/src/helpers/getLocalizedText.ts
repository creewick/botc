import LocalizedText from '../../../cli/src/models/LocalizedText'

export default function getLocalizedText(text: LocalizedText, lang: string)
: string {
  return text[lang] || text.en
}