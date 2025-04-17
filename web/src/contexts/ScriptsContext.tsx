import React, { createContext, useEffect, useState } from 'react'
import Script from '../../../cli/src/schema/Script'

interface ScriptsContextType {
  scripts: Record<string, Script>
}

interface Props {
  children: React.ReactNode
}

const ScriptsContext = createContext<ScriptsContextType|null>(null)
ScriptsContext.displayName = 'ScriptsContext'

const ScriptsProvider: React.FC<Props> = ({ children }) => {
  const [scripts, setScripts] = useState<Record<string, Script>>({})

  useEffect(() => void loadScripts(), [])

  async function loadScripts() {
    const files = import.meta.glob('/public/assets/scripts/*.json')
    const result: Record<string, Script> = {}
    
    for (const path in files) {
      const module = await files[path]() as { default: Script }
      const id = path.split('/').pop()!.replace('.json', '')
      result[id] = module.default
    }
    setScripts(result)
  }

  return (
    <ScriptsContext.Provider value={{ scripts }}>
      {children}
    </ScriptsContext.Provider>
  )
}

export { ScriptsContext, ScriptsProvider }