import { IonContent } from '@ionic/react'
import React, { Suspense, useMemo } from 'react'
import RolesList from '../../../roles/RolesList'
import { useParams } from 'react-router'
import { GamesContext } from '../../../../contexts/GamesProvider'
import useSafeContext from '../../../../hooks/useSafeContext'
import { RolesContext } from '../../../../contexts/RolesProvider'
import RoleType from '../../../../../../cli/src/enums/RoleType'
import { TranslationProvider } from 'i18nano'
import { locales } from '../../../../locales/locales'
import parseScript from '../../../../helpers/parseScript'
import { ScriptsContext } from '../../../../contexts/ScriptsContext'
import Role from '../../../../../../cli/src/models/Role'
const RolesStep: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { games, updateGame } = useSafeContext(GamesContext)
  const { scripts } = useSafeContext(ScriptsContext)
  const { roles } = useSafeContext(RolesContext)
  const game = games[id] ?? undefined

  const visibleRoles = () => {
    if (!game || !game.scriptId)
      return roles.filter(role => role.type !== RoleType.Fabled)

    const { roles: scriptRoles } = parseScript(scripts[game.scriptId])

    return [
      ...scriptRoles,
      ...roles.filter(role => role.type === RoleType.Traveler)
    ]
  }

  const selectRole = (role: Role) => {
    const roles = game?.roles.includes(role.id)
      ? game?.roles.filter((id: string) => id !== role.id)
      : [...(game?.roles ?? []), role.id]
    updateGame(id, { roles })
  }

  return (
    <IonContent fullscreen>
      <TranslationProvider translations={locales.roles}>
        <Suspense>
          <RolesList 
            playersCount={game?.players?.length ?? 0}
            items={visibleRoles()}
            selectedIds={game?.roles}
            onSelect={selectRole}
            searchbar
            filters
            group
          />
        </Suspense>
      </TranslationProvider>
    </IonContent>
  )
}

export default RolesStep