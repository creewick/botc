import {
  IonBackButton,
  IonButtons,
  IonChip,
  IonContent,
  IonGrid,
  IonHeader,
  IonModal,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import React, { useEffect } from 'react'
import characters from '../../../public/assets/roles.json'
import Role from '../../../../cli/src/models/Role'
import {
  Key,
  KeyOption,
  RoleListState,
  RoleListView
} from '../../models/RoleListState'
import RoleList from '../../components/roles/RoleList'
import RoleType from '../../../../cli/src/enums/RoleType'
import RoleFilters from '../../components/roles/RoleFilters'
import RoleView from '../../components/roles/RoleView'
import { Translation, useTranslation } from 'i18nano'
import { useParams } from 'react-router-dom'

const RolesPage: React.FC = () => {
  const t = useTranslation()
  const { id } = useParams<{ id?: string }>()

  const allRoles: unknown[] = characters
    .filter(role => role.edition !== 'special')

  const allTypes: RoleType[] = Object.values(RoleType)

  useEffect(() => {
    if (id) {
      const foundRole = (allRoles as Role[]).find(role => role.id === id)
      if (foundRole) {
        setState(prev => ({ ...prev, role: foundRole }))
      }
    }
  }, [id])

  function closeRole() {
    setState(({ ...state, role: undefined }))
    window.history.replaceState(null, '', '/botc/#/wiki/roles')
  }

  const renderType = (type: RoleType) =>
    <IonChip
      key={type}
      color={state.type === type ? 'primary' : 'medium'}
      onClick={() => onTypeClick(type)}
    >
      <Translation path={`roles.types.${type}`} />
    </IonChip>

  const sortOptions: KeyOption[] = [
    { name: t('roles.sortOptions.name'), 
      key: role => t(`${role.id}.name`)
    },
    { 
      name: t('roles.sortOptions.firstNight'), 
      key: role => role.firstNightOrder ?? Number.MAX_VALUE 
    },
    { 
      name: t('roles.sortOptions.otherNight'),
      key: role => role.otherNightOrder ?? Number.MAX_VALUE 
    }
  ]

  const [state, setState] = React.useState<RoleListState>({
    sort: sortOptions[0],
    view: RoleListView.List
  })

  function onSearch(event: Event) {
    const target = event.target as HTMLIonSearchbarElement
    const query = target.value!.toLowerCase()
    setState({ ...state, query })
  }

  function onTypeClick(type: RoleType) {
    setState({ ...state, type: state.type === type ? undefined : type })
  }

  function getRoles() {
    const filtered = filterRoles(allRoles as Role[], state.query, state.type)
    const sorted = sortRoles(filtered, state.sort?.key)
    return sorted
  }

  function filterRoles(roles: Role[], query?: string, type?: RoleType) {
    return roles
      .filter(role => !type || role.type === type)
      .filter(role => !query || searchInObject(role, query))
  }

  function searchInObject(obj: unknown, query: string): boolean {
    return obj && typeof obj === 'object'
      ? Object.values(obj).some(value => searchInObject(value, query))
      : typeof obj === 'string'
        ? obj.toLowerCase().includes(query)
        : false
  }

  function sortRoles(roles: Role[], key?: Key) {
    return roles.sort((a, b) => {
      return key && typeof key(a) === typeof key(b)
        ? key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0
        : 0
    })
  }

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text={t('wiki.title')} />
          </IonButtons>
          <IonTitle>
            <Translation path='roles.title' />
          </IonTitle>
          <IonButtons slot='end'>
            <RoleFilters
              state={state}
              setState={setState}
              sortOptions={sortOptions}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              <Translation path='roles.title' />
            </IonTitle>
          </IonToolbar>
          <IonSearchbar placeholder={t('roles.search')} onIonInput={onSearch} />
          <IonGrid style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
            {allTypes.map(renderType)}
          </IonGrid>
        </IonHeader>
        <RoleList roles={getRoles()} state={state} setState={setState} />
      </IonContent>

      <IonModal
        className="modal-overflow"
        initialBreakpoint={0.25} 
        breakpoints={[0, 0.25, 0.66, 1]}
        isOpen={!!state.role}
        onDidDismiss={closeRole}
        backdropBreakpoint={0.25}
        handle={false}
      >
        <RoleView role={state.role!} />
      </IonModal>
    </IonPage>
  )
}

export default RolesPage