import Script from '../../../cli/src/schema/Script'

export const saveScript = async (script: Script) => {
  const blob = new Blob([JSON.stringify(script)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'script.json'
  a.click()
  URL.revokeObjectURL(url)
  a.remove()
}