import React, {
  MouseEvent,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  IonAlert,
  IonButton,
  IonButtons,
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
  IonTitle,
  IonToolbar
} from '@ionic/react'
import Player from '../../../src/models/player/Player'
import { Translation, useTranslation } from 'i18nano'
import Role from '../../../../cli/src/models/Role'
import { closeCircle, close as closeIcon } from 'ionicons/icons'
import Script from '../../../../cli/src/schema/Script'
import PlayerStatus from '../../../src/enums/PlayerStatus'
import { RolesContext } from '../../../src/contexts/RolesProvider'
import { ScriptsContext } from '../../../src/contexts/ScriptsContext'
import RoleList from '../roles/RoleList'
import Token from '../Token'
import PlayerAlignment from '../../../src/enums/PlayerAlignment'

interface Props {
  setPlayer: (player: Player | undefined) => void
  close: () => void
  player?: Player
  players?: Player[]
  scriptId?: string
}

const ZERO = 0.00001

const PlayerModal: React.FC<Props> = ({ player, setPlayer, players, scriptId, close }: Props) => {
  const { roles } = useContext(RolesContext)
  const { scripts } = useContext(ScriptsContext)

  const rolesModalRef = useRef<HTMLIonModalElement>(null)
  const rolesSearchRef = useRef<HTMLIonSearchbarElement>(null)
  const playersModalRef = useRef<HTMLIonModalElement>(null)
  const playersSearchRef = useRef<HTMLIonSearchbarElement>(null)

  const t = useTranslation()
  const [query, setQuery] = useState('')
  const [alignment, setAlignment] = useState<PlayerAlignment>(PlayerAlignment.Good)
  const [scriptRoles, setScriptRoles] = useState<Role[]>([])

  useEffect(() => loadScript(), [scripts, scriptId])

  const getRoles = () => (scriptId ? scriptRoles : roles as Role[])
    .filter(role => role.edition !== 'special' && (!query ||
      t(`${role.id}.name`).toLowerCase().includes(query.toLowerCase()) ||
      t(`${role.id}.ability`).toLowerCase().includes(query.toLowerCase())))
    .sort((a, b) => t(`${a.id}.name`).localeCompare(t(`${b.id}.name`)))

  function loadScript() {
    if (!scriptId || !scripts[scriptId]) return
    const script = scripts[scriptId] as Script
    const result: Role[] = []

    for (const item of script) {
      if (typeof item === 'string') {
        const role = roles
          .find(role => role.id === item.replaceAll('_', '')) as Role
        if (role) result.push(role)
      } else if (item.id) {
        const role = roles
          .find(role => role.id === item.id.replaceAll('_', '')) as Role
        if (role) result.push(role)
      }
    }

    setScriptRoles(result)
  }

  function openRolesModal() {
    setQuery('')
    rolesSearchRef.current!.value = ''
    rolesModalRef.current?.setCurrentBreakpoint(1)
    rolesSearchRef.current?.setFocus()
  }

  async function closeRolesModal() {
    rolesModalRef.current?.setCurrentBreakpoint(ZERO)
    rolesModalRef.current?.focus()
  }

  function openPlayersModal() {
    setQuery('')
    playersSearchRef.current!.value = ''
    playersModalRef.current?.setCurrentBreakpoint(1)
    playersSearchRef.current?.setFocus()
  }

  async function closePlayersModal() {
    playersModalRef.current?.setCurrentBreakpoint(ZERO)
    playersModalRef.current?.focus()
  }

  function changeStatus(e: Event) {
    const status = (e.target as HTMLIonSegmentElement).value as PlayerStatus
    setPlayer({ ...player!, status })
  }

  function removeRole(event: MouseEvent, role: string) {
    setPlayer({
      ...player!,
      roles: player!.roles.filter(r => r !== role)
    })
    event.preventDefault()
    event.stopPropagation()
  }

  function addPing(playerTo: Player) {
    setPlayer({
      ...player!,
      pings: [...player!.pings, { to: playerTo.id, alignment: alignment }]
    })
  } 

  return (
    <IonModal
      isOpen={!!player}
      onDidDismiss={close}
      initialBreakpoint={0.4}
      breakpoints={[0, 0.4, 0.6, 1]}
      backdropBreakpoint={0.4}
    >
      <div>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
            </IonButtons>
            <IonTitle>
              <IonInput
                autocapitalize='on'
                value={player?.name}
                onIonChange={e => setPlayer({ ...player!, name: e.detail.value! })}
              />
            </IonTitle>
            <IonButtons slot='end'>
              <IonButton onClick={close}>
                <IonIcon icon={closeIcon} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonList lines='full'>
          <IonItem>
            <IonLabel>
              <Translation path='games.players.status' />
            </IonLabel>
            <IonSegment value={player?.status} onIonChange={changeStatus}>
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
          <IonItem onClick={openRolesModal}>
            <IonLabel>
              <Translation path='games.players.roles' />
            </IonLabel>
            <IonInput readonly style={{ overflow: 'hidden' }}>
              <span slot='start' style={{ textWrap: 'nowrap', overflow: 'scroll', margin: 0 }}>
                {player?.roles?.map((role, id) =>
                  <span key={id} onClick={(event) => removeRole(event, role)} style={{ marginRight: 4 }}>
                    <Token size={32} roleId={role} status={PlayerStatus.Alive}
                      hideTitle
                    />
                  </span>
                )}
              </span>
            </IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>
              <Translation path='games.reminders' />
            </IonLabel>
          </IonItem>
          {/* <IonItem>
          <IonSegment value={player?.alignment} onIonChange={changeAlignment}>
            {[undefined].concat(Object.values(PlayerAlignment)).map(status =>
              <IonSegmentButton key={status} value={status}>
                <IonLabel>
                  <Translation
                    path={`games.alignments.${status?.toLowerCase()}`}
                  />
                </IonLabel>
              </IonSegmentButton>
            )}
          </IonSegment>
        </IonItem> */}
          {/* <IonItem onClick={openPlayersModal}>
            <IonLabel>
              <Translation path='games.players.pings' />
            </IonLabel>
            <IonInput readonly style={{ overflow: 'hidden' }}>

            </IonInput>
          </IonItem> */}
          <IonItem>
            <IonTextarea
              autocapitalize='on'
              label={t('games.players.note')}
              value={player?.note}
              autoGrow={true}
              onIonChange={e => setPlayer({ ...player!, note: e.detail.value! })}
            />
            <button
              className='input-clear-icon sc-ion-input-ios'
              onClick={() => setPlayer({ ...player!, note: undefined })}
            >
              <IonIcon color='medium' className='sc-ion-input-ios ios' icon={closeCircle} />
            </button>
          </IonItem>
          <IonItem id='delete-player' button detail={false}>
            <IonLabel color='danger'>
              <Translation path='actions.deletePlayer' />
            </IonLabel>
          </IonItem>
        </IonList>

        <IonModal
          ref={rolesModalRef}
          isOpen={true}
          onDidDismiss={closeRolesModal}
          initialBreakpoint={ZERO}
          backdropBreakpoint={1}
          breakpoints={[ZERO, 1]}
          handle={false}
          focusTrap={false}
          keepContentsMounted
        >
          <IonHeader>
            <IonToolbar>
              <IonSearchbar
                ref={rolesSearchRef}
                onIonInput={e => setQuery(e.detail.value!.toLowerCase())}
              />
              <IonButtons slot='end' className='ion-align-self-center'>
                <IonButton onClick={closeRolesModal}>
                  <IonIcon icon={closeIcon} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <RoleList
              roles={getRoles()}
              onSelect={(role) => {
                setPlayer({
                  ...player!,
                  roles: [...player!.roles.filter(r => r !== role.id), role.id]
                })
                closeRolesModal()
              }}
            />
          </IonContent>
        </IonModal>

        <IonModal
          ref={playersModalRef}
          isOpen={true}
          onDidDismiss={closePlayersModal}
          initialBreakpoint={ZERO}
          backdropBreakpoint={1}
          breakpoints={[ZERO, 1]}
          handle={false}
          focusTrap={false}
          keepContentsMounted
        >
          <IonHeader>
            <IonToolbar>
              <IonSearchbar
                ref={playersSearchRef}
                onIonInput={e => setQuery(e.detail.value!.toLowerCase())}
              />
              <IonButtons slot='end' className='ion-align-self-center'>
                <IonButton onClick={closeRolesModal}>
                  <IonIcon icon={closeIcon} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
            <IonToolbar>
              <IonSegment value={alignment} onIonChange={e => setAlignment(e.detail.value as PlayerAlignment)}>
                {Object.values(PlayerAlignment).map(alignment =>
                  <IonSegmentButton key={alignment} value={alignment}>
                    <IonLabel>
                      <Translation
                        path={`games.alignments.${alignment.toLowerCase()}`}
                      />
                    </IonLabel>
                  </IonSegmentButton>
                )}
              </IonSegment>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {players?.filter(player => player.name.toLowerCase().includes(query.toLowerCase())).map(player =>
                <IonItem button detail={false} key={player.id} onClick={() => addPing(player)}>
                  <span slot='start'>
                    <Token size={48} roleId={player.roles[player.roles.length - 1]} hideTitle />

                  </span>
                  <IonLabel className='ion-text-nowrap'>
                    <h2>{player.name}</h2>
                  </IonLabel>
                </IonItem>
              )}
            </IonList>
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
      </div>
    </IonModal>
  )
}

export default PlayerModal