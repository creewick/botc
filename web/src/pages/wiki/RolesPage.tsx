import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react'
import { useRolesSearch } from '../../hooks/useRolesSearch'
import { Translation, useTranslation } from 'i18nano'
import { RoleSearch } from '../../components/roles/RoleSearch'
import { RoleList } from '../../components/roles/RoleList'

export const RolesPage: React.FC = () => {
  const t = useTranslation()
  const { roles, query, setQuery, type, setType } = useRolesSearch()
  const router = useIonRouter()

  const mode = document.documentElement.getAttribute('mode')

  return (
    <IonPage>
      <IonHeader collapse='fade' translucent>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text={t('tab.wiki')} />
          </IonButtons>
          <IonTitle>
            <Translation path='wiki.roles.title' />
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {mode === 'ios' && (
          <IonHeader collapse='condense'>
            <IonToolbar>
              <IonTitle size='large'>
                <Translation path='wiki.roles.title' />
              </IonTitle>
            </IonToolbar>
            <RoleSearch query={query} setQuery={setQuery} type={type} setType={setType} />
          </IonHeader>
        )}
        {mode === 'md' && <RoleSearch query={query} setQuery={setQuery} type={type} setType={setType} />}
        <RoleList 
          roles={roles} 
          onSelect={(role) => router.push(`/wiki/role/${role.id}`, 'forward', 'push')}
          getText={(role) => t(`${role.id}.ability`)}
          group
        />
      </IonContent>
    </IonPage>
  )
}