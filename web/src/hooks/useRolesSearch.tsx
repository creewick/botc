import { useState } from 'react'
import { useRoles } from './useRoles'
import { useTranslation } from 'i18nano'
import Role from '../types/Role'
import RoleType from '../types/RoleType'

export const useRolesSearch = () => {
  const t = useTranslation()
  const allRoles = useRoles()
  const [query, setQueryInternal] = useState('')
  const [type, setType] = useState<RoleType>()
  const [sortRoles, setSort] = useState<(a: Role, b: Role) => number>()
  const [showSpecial, setShowSpecial] = useState(false)

  const setQuery = (e: Event) => {
    const target = e.target as HTMLInputElement
    setQueryInternal(target.value)
  }

  const getRoles = () => { 
    const matchQuery = (path: string) => 
      t(path).toLowerCase().includes(query.toLowerCase())

    const defaultSort = (a: Role, b: Role) => 
      t(`${a.id}.name`).localeCompare(t(`${b.id}.name`))
  
    const filterRoles = (role: Role) => 
      (!type || role.type === type) &&
      (!query || matchQuery(`${role.id}.name`)) &&
      (showSpecial || role.edition !== 'special')
  
    return allRoles
      .filter(filterRoles)
      .sort(sortRoles ?? defaultSort)
  }

  return {
    roles: getRoles(),
    query,
    setQuery,
    type,
    setType,
    sort: sortRoles,
    setSort,
    showSpecial,
    setShowSpecial
  }
}