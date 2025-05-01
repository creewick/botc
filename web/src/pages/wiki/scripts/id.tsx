import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonSegmentContent,
  IonSegmentView,
  IonTitle,
  IonToolbar,
  useIonViewWillLeave
} from '@ionic/react'
import React, { ReactNode, Suspense, useEffect, useMemo, useState } from 'react'
import BackButton from '../../../components/common/suspense/BackButton'
import { Translation, TranslationProvider, TranslationValues } from 'i18nano'
import { locales } from '../../../locales/locales'
import { useParams } from 'react-router-dom'
import { copyOutline, downloadOutline } from 'ionicons/icons'
import Script from '../../../../../cli/src/schema/Script'
import useSafeContext from '../../../hooks/useSafeContext'
import { ScriptsContext } from '../../../contexts/ScriptsContext'
import Role from '../../../../../cli/src/models/Role'
import { getScriptMeta } from '../../../helpers/getScriptMeta'
import { copyScript } from '../../../helpers/copyScript'
import { saveScript } from '../../../helpers/saveScript'
import RolesList from '../../../components/roles/RolesList'
import { RolesContext } from '../../../contexts/RolesProvider'
import ScriptCharacter from '../../../../../cli/src/schema/ScriptCharacter'
import RoleType from '../../../../../cli/src/enums/RoleType'
import RoleModal from '../../../components/roles/RoleModal'

const ScriptPage: React.FC = () => {
  const { id, roleId } = useParams<{ id: string, roleId?: string }>()
  const { scripts } = useSafeContext(ScriptsContext)
  const { roles, specialRoles } = useSafeContext(RolesContext)
  const [role, setRole] = useState<Role>()
  const [scriptRoles, setScriptRoles] = useState<Role[]>([])
  const [customRoles, setCustomRoles] = useState<TranslationValues>({})
  const script = scripts[id] ?? {} as Script

  useEffect(() => void loadScript(), [scripts, id])
  useIonViewWillLeave(() => setRole(undefined))

  function openRole(role?: Role) {
    setRole(role)
    if (window.location.href.includes('/wiki/scripts/')) {
      window.history.replaceState(null, '', role
        ? `/botc/#/wiki/scripts/${id}/${role.id}`
        : `/botc/#/wiki/scripts/${id}`)
    }
  }

  const getText = (role: Role) => <Translation path={`${role.id}.ability`} />
  const getFirstNightText = (role: Role) => <Translation path={`${role.id}.firstNightReminder`} />
  const getOtherNightText = (role: Role) => <Translation path={`${role.id}.otherNightReminder`} />

  async function loadScript() {
    if (!id || !scripts[id]) return
    const script = scripts[id]
    const meta = getScriptMeta(script)

    const scriptRoles = script
      .map(item => {
        if (typeof item === 'string')
          return loadByCharacterId(item)
        if ('ability' in item)
          return loadCustomCharacter(item as ScriptCharacter)
        return loadByCharacterId(item.id)
      })
      .filter(role => !!role)

    const bootleggers = meta.bootlegger?.map((_, index) => ({
      id: index.toString(),
      edition: '',
      type: RoleType.Bootlegger,
      setup: false
    })) ?? []

    setScriptRoles([...scriptRoles, ...bootleggers])

    const customRoles = script
      .filter(item => typeof item !== 'string' && 'ability' in item)
      .map(role => ({
        id: role.id,
        name: role.name,
        ability: role.ability,
        flavor: role.flavor ?? '',
        firstNightReminder: role.firstNightReminder ?? '',
        otherNightReminder: role.otherNightReminder ?? '',
        reminders: role.reminders ?? [],
        jinxes: role.jinxes?.reduce((acc, jinx) => ({ ...acc, [jinx.id]: jinx.reason }), {}),
      }))
      .reduce((acc, role) => ({ ...acc, [role.id]: role }), {})

    setCustomRoles(customRoles)
    setRole([...scriptRoles, ...bootleggers].find(role => role.id === roleId))
  }

  const loadCustomCharacter = (role: ScriptCharacter): Role => ({
    id: role.id,
    type: role.team as RoleType,
    edition: role.edition ?? '',
    setup: role.setup ?? false,
    firstNightOrder: role.firstNight,
    otherNightOrder: role.otherNight,
    jinxes: role.jinxes?.map(jinx => jinx.id),
  })

  const loadByCharacterId = (id: string) =>
    roles.find((role: Role) => role.id === id.replaceAll('_', ''))

  const customRolesLocale = useMemo(() => ({ en: () => Promise.resolve(customRoles) }), [customRoles])

  const firstNightRoles = useMemo(() =>
    [...scriptRoles, ...specialRoles]
      .filter(role => role.firstNightOrder)
      .sort((a, b) => a.firstNightOrder! - b.firstNightOrder!)
    , [scriptRoles])

  const otherNightRoles = useMemo(() =>
    [...scriptRoles, ...specialRoles]
      .filter(role => role.otherNightOrder)
      .sort((a, b) => a.otherNightOrder! - b.otherNightOrder!)
    , [scriptRoles])

  const useLocale = (children: ReactNode) => 
    <TranslationProvider translations={locales.roles}>
      <TranslationProvider translations={customRolesLocale} language="en" key={Object.keys(customRoles).length}>
        {children}
      </TranslationProvider>
    </TranslationProvider>

  const renderTabButton = (id: string) =>
    <IonSegmentButton contentId={id} className='ion-text-wrap'>
      <Translation path={`scripts.tabs.${id}`} />
    </IonSegmentButton>

  const renderTab = (id: string, children: ReactNode) =>
    <IonSegmentContent id={id}>
      {useLocale(children)}
    </IonSegmentContent>

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar>
          <IonButtons slot='start'>
            <BackButton path='wiki.sections.scripts.title' />
          </IonButtons>
          <IonTitle>
            <TranslationProvider translations={locales.scripts}>
              <Translation path={id} />
            </TranslationProvider>
          </IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => copyScript(script)}>
              <IonIcon icon={copyOutline} />
            </IonButton>
            <IonButton onClick={() => saveScript(script)}>
              <IonIcon icon={downloadOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment>
            {renderTabButton('roles')}
            {renderTabButton('jinxes')}
            {renderTabButton('firstNight')}
            {renderTabButton('otherNight')}
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSegmentView>
          <Suspense>
            {renderTab('roles', 
              <RolesList items={scriptRoles} onClick={openRole} getText={getText} group searchbar />)}
            {renderTab('jinxes', null)}
            {renderTab('firstNight', 
              <RolesList items={firstNightRoles} onClick={openRole} getText={getFirstNightText} selected={[]} />)}
            {renderTab('otherNight', 
              <RolesList items={otherNightRoles} onClick={openRole} getText={getOtherNightText} selected={[]} />)}
          </Suspense>
        </IonSegmentView>
        {useLocale(<RoleModal role={role} close={() => openRole()} />)}
      </IonContent>
    </IonPage>
  )
}

export default ScriptPage