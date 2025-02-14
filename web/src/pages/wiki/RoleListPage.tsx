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
import React from 'react'
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
import RoleView from '../../components/roles/RoleView'


const RoleListPage: React.FC = () => {
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
    { name: 'First Night Order', key: role => role.firstNightOrder ?? Number.MAX_VALUE },
    { name: 'Other Night Order', key: role => role.otherNightOrder ?? Number.MAX_VALUE }
  ]

  const [state, setState] = React.useState<RoleListState>({
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
    <IonPage>
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
        <RoleList groups={getRoles()} state={state} setState={setState} />
      </IonContent>

      <IonModal
        className="modal-overflow"
        initialBreakpoint={0.33} 
        breakpoints={[0, 0.33, 0.66, 1]}
        isOpen={!!state.role}
        onDidDismiss={() => setState({ ...state, role: undefined })}
        handle={false}
      >
        <RoleView role={state.role!} />
      </IonModal>
    </IonPage>
  )
}

export default RoleListPage