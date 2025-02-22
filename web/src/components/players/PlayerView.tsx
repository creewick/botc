import React, { MouseEvent, useEffect, useState } from 'react'
import {
  IonAlert,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonSearchbar,
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

interface Props {
  player: Player
  setPlayer: (player?: Player) => void
  scriptId?: string
}

const scriptFiles = import.meta.glob('/public/assets/scripts/*.json')

const RoleView: React.FC<Props> = ({ player, setPlayer, scriptId }: Props) => {
  const t = useTranslation()
  const [rolesModal, setRolesModal] = useState(false)
  const [query, setQuery] = useState('')
  const [scriptRoles, setScriptRoles] = useState<Role[]>([])

  const playerRoles = player
    .roles
    .map(role => t(`${role}.name`))
    .join(', ')

  const getRoles = () => (scriptId ? scriptRoles : characters as Role[])
    .filter(role => role.edition !== 'special' && (!query || 
      t(`${role.id}.name`).toLowerCase().includes(query) ||
      t(`${role.id}.ability`).toLowerCase().includes(query)))

  const renderClearButton = (condition: boolean, action: () => void) => {
    if (!condition) return

    function onClick(event: MouseEvent) {
      action()
      event.stopPropagation()
    }

    return <IonIcon size='small' icon={closeCircle} onClick={onClick} />
  }

  const loadScript = async () => {
    const path = `/public/assets/scripts/${scriptId}.json`
    const module = await scriptFiles[path]() as { default: Script }
    const script: Script = module.default
    const roles: Role[] = []

    for (const item of script) {
      if (typeof item === 'string') {
        const role = characters.find(role => role.id === item.replaceAll('_', '')) as Role
        if (role) roles.push(role)
      } else if (item.id) {
        const role = characters.find(role => role.id === item.id.replaceAll('_', '')) as Role
        if (role) roles.push(role)
      }
    }

    setScriptRoles(roles)
  }

  useEffect(() => {
    if (scriptId) void loadScript()
  }, [])

  return (
    <IonList inset>
      <IonItem color='light'>
        <IonInput
          labelPlacement='stacked'
          label={t('games.players.name')}
          value={player.name}
          onIonChange={e => setPlayer({ ...player, name: e.detail.value! })}
        />
        {renderClearButton(
          !!player.name,
          () => setPlayer({...player, name: ''})
        )}
      </IonItem>
      <IonItem color='light' onClick={() => setRolesModal(true)}>
        <IonInput
          clearInput
          labelPlacement='stacked'
          label={t('games.players.roles')}
          value={playerRoles}
          readonly
        />
        {renderClearButton(
          !!player.roles.length,
          () => setPlayer({...player, roles: []})
        )}
      </IonItem>
      <IonItem color='light'>
        <IonTextarea
          labelPlacement='stacked'
          label={t('games.players.note')}
          value={player.note}
          onIonInput={e => setPlayer({ ...player, note: e.detail.value! })}
        />
        {renderClearButton(
          !!player.note,
          () => setPlayer({...player, note: undefined})
        )}
      </IonItem>
      <IonItem color='light' id='delete-player' button detail={false}>
        <IonLabel color='danger'>
          <Translation path='actions.deletePlayer' />
        </IonLabel>
      </IonItem>
      <IonModal
        isOpen={rolesModal}
        onDidDismiss={() => setRolesModal(false)}
        initialBreakpoint={1}
        breakpoints={[0, 1]}
        handle={false}
      >
        <IonHeader>
          <IonToolbar>
            <IonSearchbar 
              autoFocus 
              onIonInput={e => setQuery(e.detail.value!.toLowerCase())} 
            />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <RoleList 
            roles={getRoles()}
            onSelectRole={(role) => {
              setPlayer({ ...player, roles: [...player.roles, role.id] })
              setRolesModal(false)
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