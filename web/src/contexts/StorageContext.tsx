import { Storage } from '@ionic/storage'
import React, { createContext } from 'react'

interface Props {
  children: React.ReactNode
}

const StorageContext = createContext<Storage | null>(null)
StorageContext.displayName = 'StorageContext'

const storage = new Storage()
storage.create()

const StorageProvider: React.FC<Props> = ({ children }) =>
  <StorageContext.Provider value={storage}>
    {children}
  </StorageContext.Provider>

export { StorageContext, StorageProvider }