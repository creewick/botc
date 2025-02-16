import { createContext } from 'react'
import { Storage } from '@ionic/storage'

export default createContext<Storage | null>(null)