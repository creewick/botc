import { IonChip, IonGrid, IonImg, IonSearchbar } from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'
import './Role.css'
import RoleType from '../../types/RoleType'

interface Props {
  query: string
  setQuery: (e: Event) => void
  type?: RoleType
  setType: (type?: RoleType) => void
}

export const RoleSearch = ({ query, setQuery, type, setType }: Props) => {
  const t = useTranslation()

  const renderRoleType = (roleType: RoleType) => 
    <IonChip 
      key={roleType} 
      className='role-type-chip'
      color={roleType === type ? 'primary' : 'medium'} 
      onClick={() => setType(type === roleType ? undefined : roleType)}
    >
      <IonImg className='role-type-icon' src={`/botc/images/roleType/${roleType}.webp`} />
      <Translation path={`roles.type.${roleType}`} />
    </IonChip>

  return (
    <>
      <IonSearchbar
        className='role-searchbar'
        placeholder={t('wiki.roles.search')} 
        inputmode='search' 
        enterkeyhint='search' 
        value={query} 
        onIonInput={setQuery} 
      />
      <IonGrid className='role-type-grid'>
        {Object
          .values(RoleType)
          .filter(type => type !== RoleType.Bootlegger)
          .map(renderRoleType)}
      </IonGrid>
    </>
  )
}