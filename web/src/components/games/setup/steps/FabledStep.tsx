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
import Role from '../../../../../../cli/src/models/Role'

const FabledStep: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { games, updateGame } = useSafeContext(GamesContext)
  const { roles } = useSafeContext(RolesContext)
  const game = games[id] ?? undefined

  const fabledRoles = useMemo(() => {
    return roles.filter(role => role.type === RoleType.Fabled)
  }, [roles])

  const selectFabled = (role: Role) => {
    const fabled = game?.fabled.includes(role.id) 
      ? game?.fabled.filter((id: string) => id !== role.id) 
      : [...(game?.fabled ?? []), role.id]
    updateGame(id, { fabled })
  }

  return (
    <IonContent fullscreen>
      <TranslationProvider translations={locales.roles}>
        <Suspense>
          <RolesList items={fabledRoles} searchbar selectedIds={game?.fabled} select={selectFabled} />
        </Suspense>
      </TranslationProvider>
    </IonContent>
  )
}

export default FabledStep