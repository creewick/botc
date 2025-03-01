import React, { useCallback, useState } from 'react'
import Role from '../../../cli/src/models/Role'

interface RolesContextType {
  roles: Role[]
  loadRoles: () => Promise<void>
}

const RolesContext = React.createContext<RolesContextType>({
  roles: [],
  loadRoles: () => Promise.resolve()
})

interface Props {
  children: React.ReactNode
}

const ROLES_PATH = '/botc/assets/roles.json'

const RolesProvider: React.FC<Props> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>([])

  const loadRoles = useCallback(async () => {
    if (roles.length) return

    const response = await fetch(ROLES_PATH)
    const json = await response.json()
    setRoles(json)
  }, [])

  return (
    <RolesContext.Provider value={{ roles, loadRoles }}>
      {children}
    </RolesContext.Provider>
  )
}

export { RolesContext, RolesProvider }