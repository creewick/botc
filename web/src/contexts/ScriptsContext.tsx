import React, { createContext, useCallback, useState } from 'react'
import Script from '../../../cli/src/schema/Script'

interface ScriptsContextType {
  scripts: Record<string, Script>
  loadScripts(): Promise<void>
}

const ScriptsContext = createContext<ScriptsContextType>({
  scripts: {},
  loadScripts: () => Promise.resolve()
})

interface Props {
  children: React.ReactNode
}

const ScriptsProvider: React.FC<Props> = ({ children }) => {
  const [scripts, setScripts] = useState<Record<string, Script>>({})

  const loadScripts = useCallback(async () => {
    if (Object.values(scripts).length) return

    const files = import.meta.glob('/public/assets/scripts/*.json')
    const result: Record<string, Script> = {}
    
    for (const path in files) {
      const module = await files[path]() as { default: Script }
      const id = path.split('/').pop()!.replace('.json', '')
      result[id] = module.default
    }
    setScripts(result)
  }, [])

  return (
    <ScriptsContext.Provider value={{ scripts, loadScripts }}>
      {children}
    </ScriptsContext.Provider>
  )
}

export { ScriptsContext, ScriptsProvider }