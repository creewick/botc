import { useEffect, useState } from 'react'
import type Role from '../types/Role'

const rolesPath = '/botc/roles.json'

let cachedRoles: Role[]
let promise: Promise<Role[]>

export const useRoles = () => {
  const [roles, setRoles] = useState<Role[]>(cachedRoles ?? [])

  useEffect(() => {
    if (cachedRoles) return

    if (!promise) {
      promise = fetch(rolesPath)
        .then((res) => res.json())
        .then((data) => {
          cachedRoles = data
          return data
        })
    }

    promise.then(setRoles)
  }, [])

  return roles
}