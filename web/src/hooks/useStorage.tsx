import { Storage } from '@ionic/storage'
import { createContext, useContext, useEffect, useState } from 'react'

const StorageContext = createContext<Storage>(null as never)

interface Props {
  children: React.ReactNode
}

export const StorageProvider: React.FC<Props> = ({ children }) => {
  const [storage, setStorage] = useState<Storage>()

  useEffect(() => { new Storage().create().then(setStorage) }, [])

  if (!storage) return null

  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  )
}

export const useStorage = () => useContext(StorageContext)
