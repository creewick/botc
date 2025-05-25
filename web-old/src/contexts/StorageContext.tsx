import { Storage } from '@ionic/storage'
import React, { createContext } from 'react'

const StorageContext = createContext<Storage | null>(null)

const storage = new Storage()
storage.create()

interface Props {
  children: React.ReactNode
}

const StorageProvider: React.FC<Props> = ({ children }) =>
  <StorageContext.Provider value={storage}>
    {children}
  </StorageContext.Provider>

export { StorageContext, StorageProvider }