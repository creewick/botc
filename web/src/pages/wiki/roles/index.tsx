import { IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillLeave } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RolesContext } from '../../../contexts/RolesProvider'
import useSafeContext from '../../../hooks/useSafeContext'
import RolesList from '../../../components/roles/RolesList'
import { Translation, TranslationProvider } from 'i18nano'
import { locales } from '../../../locales/locales'
import Role from '../../../../../cli/src/models/Role'
import './index.css'
import BackButton from '../../../components/common/suspense/BackButton'
import RoleModal from '../../../components/roles/RoleModal'

const RolesPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>()
  const { roles } = useSafeContext(RolesContext)
  const [role, setRole] = useState<Role>()

  useEffect(() => setRole(roles.find(role => role.id === id)), [id, roles])
  useIonViewWillLeave(() => setRole(undefined))

  function onSelect(role?: Role) {
    setRole(role)
    if (window.location.href.includes('/wiki/roles')) {
      window.history.replaceState(null, '', role
        ? `/botc/#/wiki/roles/${role.id}`
        : '/botc/#/wiki/roles')
    }
  }

  const getText = (role: Role) => <Translation path={`${role.id}.ability`} />

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar>
          <IonButtons slot='start'>
            <BackButton path='tabs.wiki' />
          </IonButtons>
          <IonTitle>
            <Translation path='wiki.sections.characters.title' />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <TranslationProvider translations={locales.roles}>
        <RolesList roles={roles} getText={getText} onSelect={onSelect} />
        <RoleModal role={role} close={() => onSelect()} />
      </TranslationProvider>
    </IonPage>
  )
}

export default RolesPage