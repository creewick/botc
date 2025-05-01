import React, { useState, useMemo, ReactNode } from 'react'
import Role from '../../../../cli/src/models/Role'
import {
  IonCheckbox,
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
  IonToolbar
} from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'
import RoleType from '../../../../cli/src/enums/RoleType'
import Searchbar from '../common/suspense/Searchbar'
import { getIcon } from '../../helpers/getIcon'

interface Props {
  items: Role[]

  getText?: (item: Role) => string | ReactNode
  onClick?: (item: Role) => void

  selectedIds?: string[]
  select?: (item: Role) => void

  group?: boolean
  sort?: boolean

  header?: boolean
  searchbar?: boolean
  filters?: boolean
  checkboxes?: boolean
}

const RolesList: React.FC<Props> = (
  { items, onClick, selectedIds, select, searchbar, filters, header, getText, sort, group, checkboxes }
) => {
  const [type, setType] = useState<RoleType>()
  const [search, setSearch] = useState('')
  const t = useTranslation()

  const visibleRoles = useMemo(() => {
    const getName = (role: Role) => t(`${role.id}.name`).toLowerCase()
    const searchLower = search?.toLowerCase() || ''

    return items
      .filter(role =>
        (!searchLower || getName(role).includes(searchLower)) &&
        (!type || role.type === type))
      .sort((a, b) => !sort ? 0 : getName(a).localeCompare(getName(b)))
  }, [items, search, type, sort, t])

  const renderJinxes = (role: Role) =>
    role.jinxes && role.jinxes
      .filter(id => items.some(role => role.id === id))
      .map(id => <IonImg key={id} className='ion-margin-end jinx-icon' src={getIcon(id)} />)

  const selectRole = (event: React.MouseEvent, role: Role) => {
    select?.(role)
    event.stopPropagation()
  }

  const renderRole = (role: Role) =>
    <IonItem button detail={false} key={role.id} onClick={() => onClick?.(role)}>
      {selectedIds && 
        <IonCheckbox slot='start' checked={selectedIds.includes(role.id)} onClick={e => selectRole(e, role)} />
      }
      <IonImg slot='start' className='role-icon' src={getIcon(role.id)} />
      <IonLabel className='ion-text-nowrap overflow-visible'>
        <Translation path={`${role.id}.name`} />
        {renderJinxes(role)}
        <p className='ion-hide-sm-down'>
          {getText?.(role)}
        </p>
      </IonLabel>
    </IonItem>

  const renderGroup = (type: RoleType) => visibleRoles.some(role => role.type === type) &&
    <div key={type}>
      <IonItemDivider sticky className='ion-no-padding' color='light'>
        <IonImg className='role-type-icon' src={getIcon(type)} />
        <Translation path={`characters.type.${type}`} />
      </IonItemDivider>
      {visibleRoles.filter(role => role.type === type).map(renderRole)}
    </div>

  function onInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement
    const search = target.value!.toLowerCase()
    setSearch(search)
  }

  function onTypeClick(type: RoleType) {
    setType(prev => (prev === type ? undefined : type))
  }

  const color = (value: RoleType) => type === value ? 'primary' : 'dark'

  const renderRoleType = (value: RoleType) => (
    <IonChip key={value} color={color(value)} onClick={() => onTypeClick(value)}>
      <IonImg className='role-type-icon' src={getIcon(value)} />
      <Translation path={`characters.type.${value}`} />
    </IonChip>
  )

  return (
    <IonContent fullscreen>
      {(header || searchbar || filters) && 
        <IonHeader collapse={header ? 'condense' : undefined}>
          {header &&
            <IonToolbar>
              <IonTitle size="large">
                <Translation path='wiki.sections.characters.title' />
              </IonTitle>
            </IonToolbar>
          }
          <IonToolbar>
            {searchbar &&
              <Searchbar path='characters.search' onIonInput={onInput} />
            }
            {filters &&
              <IonGrid className='filters-row'>
                {Object.values(RoleType).map(renderRoleType)}
              </IonGrid>
            }
          </IonToolbar>
        </IonHeader>
      }
      <IonList>
        {group
          ? Object.values(RoleType).map(renderGroup)
          : visibleRoles.map(renderRole)}
      </IonList>
    </IonContent>
  )
}

export default RolesList