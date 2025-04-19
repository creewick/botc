import React from 'react'
import Player from '../../models/player/Player'
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonInput,
  IonTextarea,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonSearchbar,
  IonButtons,
  IonButton,
  IonAlert
} from '@ionic/react'
import { getRoles } from '@testing-library/react'
import { Translation } from 'i18nano'
import { closeCircle } from 'ionicons/icons'
import RoleList from '../../../_src/components/roles/RoleList'
import PlayerAlignment from '../../enums/PlayerAlignment'
import PlayerStatus from '../../enums/PlayerStatus'
import Token from '../roles/Token'

interface Props {
  player: Player
}

const PlayerView: React.FC<Props> = ({ player }) => {
  const t = useTranslation()
  return (
    <IonContent>
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
    </IonContent>
  )
}

export default PlayerView