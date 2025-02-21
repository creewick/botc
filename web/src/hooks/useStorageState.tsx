import { useContext, useEffect, useState } from 'react'
import StorageContext from '../contexts/StorageContext'

function useStorageState<T>(key: string, defaultValue: T) {
  const storage = useContext(StorageContext)
  const [state, setState] = useState<T>(defaultValue)

  useEffect(() => void initValue(), [key, storage])

  const initValue = async () => {
    if (!storage) return
    const value = await storage.get(key)
    setState(value ?? defaultValue)
  }

  const setStorageState = async (value: T) => {
    await storage?.set(key, value)
    setState(value)
  }

  return [state, setStorageState, storage] as const
}

export default useStorageState