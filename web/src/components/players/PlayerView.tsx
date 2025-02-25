import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import {
  IonAlert,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonTextarea,
  IonToolbar
} from '@ionic/react'
import Player from '../../models/games/Player'
import { Translation, useTranslation } from 'i18nano'
import characters from '../../../public/assets/roles.json'
import Role from '../../../../cli/src/models/Role'
import RoleList from '../roles/RoleList'
import { closeCircle } from 'ionicons/icons'
import Script from '../../../../cli/src/schema/Script'
import RoleIcon from '../roles/RoleIcon'
import PlayerStatus from '../../models/games/PlayerStatus'

interface Props {
  player: Player
  setPlayer: (player: Player | undefined) => void
  scriptId?: string
}

const scriptFiles = import.meta.glob('/public/assets/scripts/*.json')
const ZERO = 0.00001


const RoleView: React.FC<Props> = ({ player, setPlayer, scriptId }: Props) => {
  const modalRef = useRef<HTMLIonModalElement>(null)
  const searchRef = useRef<HTMLIonSearchbarElement>(null)

  const t = useTranslation()
  const [query, setQuery] = useState('')
  const [scriptRoles, setScriptRoles] = useState<Role[]>([])

  const getRoles = () => (scriptId ? scriptRoles : characters as Role[])
    .filter(role => role.edition !== 'special' && (!query ||
      t(`${role.id}.name`).toLowerCase().includes(query.toLowerCase()) ||
      t(`${role.id}.ability`).toLowerCase().includes(query.toLowerCase())))
    .sort((a, b) => t(`${a.id}.name`).localeCompare(t(`${b.id}.name`)))

  const loadScript = async () => {
    const path = `/public/assets/scripts/${scriptId}.json`
    const module = await scriptFiles[path]() as { default: Script }
    const script: Script = module.default
    const roles: Role[] = []

    for (const item of script) {
      if (typeof item === 'string') {
        const role = characters
          .find(role => role.id === item.replaceAll('_', '')) as Role
        if (role) roles.push(role)
      } else if (item.id) {
        const role = characters
          .find(role => role.id === item.id.replaceAll('_', '')) as Role
        if (role) roles.push(role)
      }
    }

    setScriptRoles(roles)
  }

  function openModal() {
    modalRef.current?.setCurrentBreakpoint(1)
    searchRef.current?.setFocus()
  }

  async function closeModal() {
    modalRef.current?.setCurrentBreakpoint(ZERO)
    const input = await searchRef.current?.getInputElement()
    input?.blur()
  }

  function changeStatus(e: Event) {
    const status = (e.target as HTMLIonSegmentElement).value as PlayerStatus
    setPlayer({ ...player, status })
  }

  useEffect(() => {
    if (scriptId) void loadScript()
  }, [])

  function removeRole(event: MouseEvent, role: string) {
    setPlayer({
      ...player,
      roles: player.roles.filter(r => r !== role)
    })
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <IonList inset>
      <IonItem color='light'>
        <IonInput
          clearInput
          autocapitalize='on'
          labelPlacement='stacked'
          label={t('games.players.name')}
          value={player.name}
          onIonChange={e => setPlayer({ ...player, name: e.detail.value! })}
        />
      </IonItem>
      <IonItem color='light'>
        <IonSegment value={player.status} onIonChange={changeStatus}>
          {Object.values(PlayerStatus).map(status => 
            <IonSegmentButton key={status} value={status}>
              <IonLabel>
                <Translation 
                  path={`games.statuses.${status.toLowerCase()}`} 
                />
              </IonLabel>
            </IonSegmentButton>
          )}
        </IonSegment>
      </IonItem>
      <IonItem color='light' onClick={openModal}>
        <IonInput
          labelPlacement='stacked'
          label={t('games.players.roles')}
          readonly
        >
          <span slot='start' style={{ margin: '8px -4px' }}>
            {player.roles?.map((role, id) =>
              <IonChip key={id}>
                <span style={{ position: 'absolute', left: 0, top: 0 }}>
                  <RoleIcon size={32} roleId={role} status={PlayerStatus.Alive}
                    hideShadow hideTitle
                  />
                </span>
                <span style={{ paddingLeft: 26 }}>
                  <Translation path={`${role}.name`} />
                </span>
                <IonIcon
                  icon={closeCircle}
                  onClick={(event) => removeRole(event, role)}
                />
              </IonChip>
            )}
          </span>
        </IonInput>
      </IonItem>
      <IonItem color='light'>
        <IonTextarea
          autocapitalize='on'
          labelPlacement='stacked'
          label={t('games.players.note')}
          value={player.note}
          autoGrow={true}
          onIonInput={e => setPlayer({ ...player, note: e.detail.value! })}
        />
        <button
          className='input-clear-icon sc-ion-input-ios'
          onClick={() => setPlayer({ ...player, note: undefined })}
        >
          <IonIcon className='sc-ion-input-ios ios' icon={closeCircle} />
        </button>
      </IonItem>
      <IonItem color='light' id='delete-player' button detail={false}>
        <IonLabel color='danger'>
          <Translation path='actions.deletePlayer' />
        </IonLabel>
      </IonItem>

      <IonModal
        ref={modalRef}
        isOpen={true}
        onDidDismiss={closeModal}
        initialBreakpoint={ZERO}
        backdropBreakpoint={1}
        breakpoints={[ZERO, 1]}
        handle={false}
        keepContentsMounted
      >
        <IonHeader>
          <IonToolbar>
            <IonSearchbar
              ref={searchRef}
              onIonInput={e => setQuery(e.detail.value!.toLowerCase())}
            />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <RoleList
            roles={getRoles()}
            onSelectRole={(role) => {
              setPlayer({
                ...player,
                roles: [...player.roles.filter(r => r !== role.id), role.id]
              })
              closeModal()
            }}
          />
        </IonContent>
      </IonModal>

      <IonAlert
        trigger="delete-player"
        header={t('actions.deletePlayer') + '?'}
        message={t('actions.youCantUndoThisAction')}
        buttons={[
          {
            text: t('actions.cancel'),
            role: 'cancel'
          }, {
            text: t('actions.delete'),
            role: 'destructive',
            handler: () => setPlayer(undefined)
          }
        ]}
      />

    </IonList>
  )
}

export default RoleView