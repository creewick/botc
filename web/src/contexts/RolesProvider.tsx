import React, { createContext, useEffect, useState } from 'react'
import Role from '../../../cli/src/models/Role'

interface RolesContextType {
  roles: Role[]
  specialRoles: Role[]
}

interface Props {
  children: React.ReactNode
}

const RolesContext = createContext<RolesContextType|null>(null)
RolesContext.displayName = 'RolesContext'

const ROLES_PATH = '/botc/assets/roles.json'

const RolesProvider: React.FC<Props> = ({ children }) => {
  const [roles, setRoles] = useState<Role[]>([])
  const [specialRoles, setSpecialRoles] = useState<Role[]>([])

  useEffect(() => void loadRoles(), [])

  async function loadRoles() {
    const response = await fetch(ROLES_PATH)
    const json = await response.json()
    const special = json.filter((role: Role) => role.edition === 'special')
    const normal = json.filter((role: Role) => role.edition !== 'special')
    setSpecialRoles(special)
    setRoles(normal)
  }

  return (
    <RolesContext.Provider value={{ roles, specialRoles }}>
      {children}
    </RolesContext.Provider>
  )
}

export { RolesContext, RolesProvider }