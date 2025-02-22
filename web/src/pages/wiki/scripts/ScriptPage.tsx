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
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Script from '../../../../../cli/src/schema/Script'
import characters from '../../../../public/assets/roles.json'
import Role from '../../../../../cli/src/models/Role'
import RoleList from '../../../components/roles/RoleList'
import { locales } from '../../../locales/locales'
import { shareOutline } from 'ionicons/icons'
import { RoleListState } from '../../../models/RoleListState'
import RoleView from '../../../components/roles/RoleView'

const scriptFiles = import.meta.glob('/public/assets/scripts/*.json')

const ScriptPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [script, setScript] = useState<Script>()
  const [scriptRoles, setScriptRoles] = useState<Role[]>([])
  const t = useTranslation()
  const [showToast] = useIonToast()

  const [state, setState] = React.useState<RoleListState>({})

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

  const allRoles: Role[] = characters
    .filter(role => role.edition !== 'special') as Role[]

  const specialRoles = characters
    .filter(role => role.edition === 'special') as Role[]

  const loadScript = async () => {
    const path = `/public/assets/scripts/${id}.json`
    const module = await scriptFiles[path]() as { default: Script }
    const script: Script = module.default
    const roles: Role[] = []
    setScript(script)

    for (const item of script) {
      if (typeof item === 'string') {
        const role = allRoles.find(role => role.id === item.replaceAll('_', ''))
        if (role) roles.push(role)
      } else if (item.id) {
        const role = allRoles.find(role => role.id === item.id.replaceAll('_', ''))
        if (role) roles.push(role)
      }
    }

    setScriptRoles(roles)
  }

  useEffect(() => void loadScript(), [id])


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
            <IonSegmentButton contentId='firstNight' className='ion-text-wrap'>
              <Translation path='scripts.tabs.firstNight' />
            </IonSegmentButton>
            <IonSegmentButton contentId='otherNights' className='ion-text-wrap'>
              <Translation path='scripts.tabs.otherNight' />
            </IonSegmentButton>
            {/* <IonSegmentButton contentId='jinxes' className='ion-text-wrap'>
              <Translation path='scripts.tabs.jinxes' />
            </IonSegmentButton> */}
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSegmentView>
          <TranslationProvider translations={locales.roles}>
            <IonSegmentContent id='roles'>
              <RoleList 
                roles={scriptRoles} 
                getText={role => `${role.id}.ability`}
                onSelectRole={openRole} 
                groupByType 
              />
            </IonSegmentContent>
            <IonSegmentContent id='firstNight'>
              <RoleList 
                roles={firstNightOrder()}
                getText={role => `${role.id}.firstNightReminder`} 
                onSelectRole={openRole} 
                />
            </IonSegmentContent>
            <IonSegmentContent id='otherNights'>
              <RoleList 
                roles={otherNightOrder()} 
                getText={role => `${role.id}.otherNightReminder`}
                onSelectRole={openRole} 
              />
            </IonSegmentContent>
            {/* <IonSegmentContent id='jinxes' /> */}
          </TranslationProvider>
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