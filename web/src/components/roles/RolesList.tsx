import React, { useState, useMemo, Suspense } from 'react'
import Role from '../../../../cli/src/models/Role'
import { 
  IonChip, 
  IonContent, 
  IonGrid, 
  IonHeader, 
  IonImg, 
  IonItem, 
  IonItemDivider, 
  IonLabel, 
  IonList, 
  IonTitle, 
  IonToolbar} from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'
import RoleType from '../../../../cli/src/enums/RoleType'
import { RolesListState } from '../../states/RolesListState'
import Searchbar from '../common/suspense/Searchbar'
import { getIcon } from '../../helpers/helpers'

interface Props {
  roles: Role[]
  onSelect: (role: Role) => void
  getText: (role: Role) => string | JSX.Element
  group?: boolean
}

interface PropsInternal extends Props {
  state: RolesListState
}

const RoleListInternal: React.FC<PropsInternal> = ({ roles, group, state, onSelect, getText }) => {
  const t = useTranslation()

  const visibleRoles = useMemo(() => {
    const getName = (role: Role) => t(`${role.id}.name`).toLowerCase()
    const search = state.search?.toLowerCase() || ''
    const type = state.type

    return roles
      .filter(role => 
        (!search || getName(role).includes(search)) && 
        (!type || role.type === type))
      .sort((a, b) => getName(a).localeCompare(getName(b)))
  }, [roles, state, t])

  const renderGroup = (type: RoleType) => 
    <>
      <IonItemDivider sticky className='ion-no-padding' color='light'>
        <IonImg className='role-icon' src={getIcon(type)} />
        <Translation path={`roles.types.${type}`} />
      </IonItemDivider>
      {visibleRoles.filter(role => role.type === type).map(renderRole)}
    </>

  const renderRole = (role: Role) =>
    <IonItem button detail={false} key={role.id} onClick={() => onSelect(role)}>
      <IonImg slot='start' className='role-icon' src={getIcon(role.id)} />
      <IonLabel className='ion-text-nowrap'>
        <h2>
          <Translation path={`${role.id}.name`} />
        </h2>
        <p className='ion-hide-sm-down'>
          {getText(role)}
        </p>
      </IonLabel>
    </IonItem>

  if (group)
    return Object.values(RoleType).map(renderGroup)
  return visibleRoles.map(renderRole)
}

const RolesList: React.FC<Props> = (props) => {  
  const [state, setState] = useState<RolesListState>({})

  function onInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement
    const search = target.value!.toLowerCase()
    setState(prev => ({ ...prev, search }))
  }

  function onClick(type: RoleType) {
    setState(prev => ({ ...prev, type: state.type === type ? undefined : type }))
  }

  const color = (type: RoleType) => state.type === type ? 'primary' : 'dark'

  const renderRoleType = (type: RoleType) => (
    <IonChip key={type} color={color(type)} onClick={() => onClick(type)}>
      <IonImg className='role-type-icon' src={getIcon(type)} />
      <Translation path={`characters.type.${type}`} />
    </IonChip>
  )

  return (
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">
            <Translation path='wiki.sections.characters.title' />
          </IonTitle>
        </IonToolbar>
        <IonToolbar>
          <Searchbar path='characters.search' onIonInput={onInput} />
          <IonGrid className='filters-row'>
            {Object.values(RoleType).map(renderRoleType)}
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <Suspense>
        <IonList>
          <RoleListInternal {...{...props, state}} />
        </IonList>
      </Suspense>
    </IonContent>
  )
}

export default RolesList