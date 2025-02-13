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
import React, { useEffect, useRef, useState } from 'react'
import characters from '../../../public/roles.json'
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


const RoleListPage: React.FC = () => {
  const pageRef = useRef(undefined)
  const [page, setPage] = useState<HTMLElement>()

  useEffect(() => {
    setPage(pageRef.current)
  }, [])

  const allRoles: Role[] = characters
    .filter(role => role.edition !== 'special')

  const allTypes: RoleType[] = Object.values(RoleType)

  const renderType = (type: RoleType) =>
    <IonChip
      key={type}
      color={state.type === type ? 'primary' : 'medium'}
      onClick={() => onTypeClick(type)}
    >
      {type}
    </IonChip>

  const sortOptions: KeyOption[] = [
    { name: 'Name', key: role => role.name.en },
    { name: 'First Night Order', key: role => role.firstNightOrder ?? -1 },
    { name: 'Other Night Order', key: role => role.otherNightOrder ?? -1 }
  ]

  const groupOptions: KeyOption[] = [
    { name: 'None' },
    { name: 'Name', key: role => role.name.en[0] },
    { name: 'Edition', key: role => role.edition }
  ]

  const [state, setState] = React.useState<RoleListState>({
    group: groupOptions[0],
    sort: sortOptions[0],
    view: RoleListView.List
  })

  function onSearchInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement
    const query = target.value!.toLowerCase()
    setState({ ...state, query })
  }

  function onTypeClick(type: RoleType) {
    setState({ ...state, type: state.type === type ? undefined : type })
  }

  function getRoles() {
    const filtered = filterRoles(allRoles, state.query, state.type)
    const sorted = sortRoles(filtered, state.sort?.key)
    const grouped = groupRoles(sorted, state.group?.key)
    return grouped
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

  function groupRoles(roles: Role[], key?: Key) {
    if (!key) return { '': roles }

    return roles.reduce((groups, role) => {
      groups[key(role)] = groups[key(role)] ?? []
      groups[key(role)].push(role)
      return groups
    }, {} as { [key: string]: Role[] })
  }

  function sortRoles(roles: Role[], key?: Key) {
    return roles.sort((a, b) => {
      return key && typeof key(a) === typeof key(b)
        ? key(a) < key(b) ? -1 : key(a) > key(b) ? 1 : 0
        : 0
    })
  }

  return (
    <IonPage ref={pageRef}>
      <IonHeader collapse='fade'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton />
          </IonButtons>
          <IonTitle>Characters</IonTitle>
          <IonButtons slot='end'>
            <RoleFilters
              state={state}
              setState={setState}
              sortOptions={sortOptions}
              groupOptions={groupOptions}
            />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Characters</IonTitle>
          </IonToolbar>
          <IonSearchbar onIonInput={onSearchInput} />
          <IonGrid style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
            {allTypes.map(renderType)}
          </IonGrid>
        </IonHeader>
        <RoleList groups={getRoles()} setState={setState} />
      </IonContent>

      <IonModal
        presentingElement={page}
        isOpen={!!state.role} 
        onDidDismiss={() => setState({ ...state, role: undefined })}
      >
        <IonContent>
          <IonTitle>{state.role?.name.en}</IonTitle>
        </IonContent>
      </IonModal>
    </IonPage>
  )
}

export default RoleListPage