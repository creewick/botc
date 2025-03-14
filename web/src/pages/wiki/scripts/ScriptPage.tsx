import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  useIonToast,
  IonButton,
  IonIcon,
  IonModal,
  IonSegmentButton,
  IonSegment,
  IonSegmentView,
  IonSegmentContent
} from '@ionic/react'
import { Translation, TranslationProvider, useTranslation } from 'i18nano'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Script from '../../../../../cli/src/schema/Script'
import Role from '../../../../../cli/src/models/Role'
import RoleList from '../../../components/roles/RoleList'
import { locales } from '../../../locales/locales'
import { shareOutline } from 'ionicons/icons'
import { RoleListState } from '../../../models/RoleListState'
import RoleView from '../../../components/roles/RoleView'
import { RolesContext } from '../../../contexts/RolesProvider'
import { ScriptsContext } from '../../../contexts/ScriptsContext'
import ScriptMeta from '../../../../../cli/src/schema/ScriptMeta'
import RoleType from '../../../../../cli/src/enums/RoleType'
import JinxList from '../../../components/roles/JinxList'


const ScriptPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [script, setScript] = useState<Script>()
  const [scriptRoles, setScriptRoles] = useState<Role[]>([])
  const { scripts, loadScripts } = useContext(ScriptsContext)
  const { roles, loadRoles } = useContext(RolesContext)
  const t = useTranslation()
  const [showToast] = useIonToast()
  const [state, setState] = React.useState<RoleListState>({})

  useEffect(() => {
    void loadRoles()
    void loadScripts()
  }, [])

  useEffect(() => void loadScript(), [scripts, id])

  const firstNightOrder = () => [...scriptRoles, ...specialRoles]
    .filter(role => role.firstNightOrder)
    .sort((a, b) => a.firstNightOrder! - b.firstNightOrder!)

  const otherNightOrder = () => [...scriptRoles, ...specialRoles]
    .filter(role => role.otherNightOrder)
    .sort((a, b) => a.otherNightOrder! - b.otherNightOrder!)

  function openRole(role: Role) {
    setState(({ ...state, role }))
  }

  function closeRole() {
    setState(({ ...state, role: undefined }))
  }

  const onCopy = async (script: Script) => {
    await navigator.clipboard.writeText(JSON.stringify(script))
    showToast({
      message: t('scripts.copied'),
      duration: 3000,
      position: 'top',
    })
  }

  const allRoles: Role[] = roles
    .filter(role => role.edition !== 'special') as Role[]

  const specialRoles = roles
    .filter(role => role.edition === 'special') as Role[]
  
  const meta = script
    ?.find(item => (item as ScriptMeta).id === '_meta') as ScriptMeta
  
  function getText(role: Role) {
    if (role.type === RoleType.Bootlegger)
      return meta.bootlegger![parseInt(role.id)]
    return t(`${role.id}.ability`)
  }

  const loadScript = async () => {
    if (!id || !scripts[id]) return
    const script = scripts[id]
    const meta = script
      ?.find(item => (item as ScriptMeta).id === '_meta') as ScriptMeta
    const roles: Role[] = []
    setScript(script)

    for (const item of script) {
      if (typeof item === 'string') {
        const role = allRoles
          .find(role => role.id === item.replaceAll('_', ''))
        if (role) roles.push(role)
      } else if (item.id) {
        const role = allRoles
          .find(role => role.id === item.id.replaceAll('_', ''))
        if (role) roles.push(role)
      }
    }

    meta?.bootlegger?.map((_, index) => roles.push({
      id: index.toString(),
      edition: '',
      type: RoleType.Bootlegger,
      setup: false
    }))

    setScriptRoles(roles)
  }

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text='' />
          </IonButtons>
          <IonTitle className='title-padding'>
            <Translation path={id} />
          </IonTitle>
          <IonButtons slot='end'>
            <IonButton
              className='ion-no-padding'
              fill='clear'
              size='default'
              onClick={() => onCopy(script!)}
              id='copyScript'
            >
              <IonIcon icon={shareOutline} color='primary' />
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonSegment>
            <IonSegmentButton contentId='roles' className='ion-text-wrap'>
              <Translation path='scripts.tabs.roles' />
            </IonSegmentButton>
            <IonSegmentButton contentId='jinxes' className='ion-text-wrap'>
              <Translation path='scripts.tabs.jinxes' />
            </IonSegmentButton>
            <IonSegmentButton contentId='firstNight' className='ion-text-wrap'>
              <Translation path='scripts.tabs.firstNight' />
            </IonSegmentButton>
            <IonSegmentButton contentId='otherNights' className='ion-text-wrap'>
              <Translation path='scripts.tabs.otherNight' />
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSegmentView>
            <IonSegmentContent className='height-100' id='roles'>
              <RoleList 
                roles={scriptRoles} 
                getText={getText}
                onSelect={openRole} 
                groupByType 
              />
            </IonSegmentContent>

            <IonSegmentContent className='height-100' id='jinxes'>
              <JinxList
                roles={scriptRoles}
              />
            </IonSegmentContent>
            <IonSegmentContent className='height-100' id='firstNight'>
              <RoleList 
                roles={firstNightOrder()}
                getText={role => t(`${role.id}.firstNightReminder`)} 
                onSelect={openRole} 
                />
            </IonSegmentContent>
            <IonSegmentContent className='height-100' id='otherNights'>
              <RoleList 
                roles={otherNightOrder()} 
                getText={role => t(`${role.id}.otherNightReminder`)}
                onSelect={openRole} 
              />
            </IonSegmentContent>
        </IonSegmentView>
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
        <TranslationProvider translations={locales.roles}>
          <RoleView role={state.role!} />
        </TranslationProvider>
      </IonModal>

    </IonPage>
  )
}

export default ScriptPage