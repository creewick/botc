import Script from '../../../cli/src/schema/Script'

export const copyScript = async (script: Script) => {
  await navigator.clipboard.writeText(JSON.stringify(script))
}
