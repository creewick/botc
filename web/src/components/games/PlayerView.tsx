import React from 'react'
import Player from '../../models/player/Player'
import {
  IonList,
  IonItem,
  IonSegment,
  IonSegmentButton,
  IonInput,
  IonModal} from '@ionic/react'
import { Translation, TranslationProvider, useTranslation } from 'i18nano'
import PlayerStatus from '../../enums/PlayerStatus'
import Token from '../roles/Token'
import { GamesContext } from '../../contexts/GamesProvider'
import useSafeContext from '../../hooks/useSafeContext'
import { locales } from '../../locales/locales'
import roles from '../../pages/wiki/roles'
import RolesList from '../roles/RolesList'
import { ScriptsContext } from '../../contexts/ScriptsContext'

interface Props {
  gameId: string
  playerId: string
}

interface SegmentCustomEvent extends CustomEvent {
  target: HTMLIonSegmentElement
}

const PlayerView: React.FC<Props> = ({ gameId, playerId }) => {
  const { games, updateGame } = useSafeContext(GamesContext)
  const { scripts } = useSafeContext(ScriptsContext)
  const player = games[gameId].players.find(p => p.id === playerId) as Player
  const t = useTranslation()

  // const roles = games[gameId].scriptId ? 

  const setPlayer = (changes: Partial<Player>) => {
    const newPlayer = { ...player, ...changes }
    updateGame(gameId, { players: games[gameId].players.map(p => p.id === player.id ? newPlayer : p) })
  }

  const setName = (e: CustomEvent) => setPlayer({ name: e.detail.value })
  const setStatus = (e: SegmentCustomEvent) => setPlayer({ status: e.target.value as PlayerStatus })

  const renderStatus = (status: PlayerStatus) =>
    <IonSegmentButton key={status} value={status}>
      <Translation path={`games.status.${status.toLowerCase()}`} />
    </IonSegmentButton>

  return (
    <IonList lines='full'>
      <IonItem>
        <IonSegment value={player?.status} onIonChange={setStatus}>
          {Object.values(PlayerStatus).map(renderStatus)}
        </IonSegment>
      </IonItem>
      <IonItem>
        <IonInput readonly label={t('games.player.roles')} style={{ overflow: 'hidden' }}>
          <span slot='start' style={{ textWrap: 'nowrap', overflow: 'scroll', margin: 0 }}>
            {player?.roles?.map((role, id) =>
              <span key={id} onClick={(event) => removeRole(event, role)} style={{ marginRight: 4 }}>
                <Token size={32} roleId={role} status={PlayerStatus.Alive} />
              </span>
            )}
          </span>
        </IonInput>
      </IonItem>
      <IonModal
          isOpen={true}
          onDidDismiss={closeRolesModal}
          initialBreakpoint={0}
          backdropBreakpoint={1}
          breakpoints={[0, 1]}
          handle={false}
          focusTrap={false}
          keepContentsMounted
        >
          <TranslationProvider translations={locales.roles}>
            <TranslationProvider translations={customRolesLocale} language="en" key={Object.keys(customRoles).length}>
              <RolesList header roles={scriptRoles.length > 0 ? scriptRoles : roles} onClick={(role) => {
                setPlayer({
                  ...player!,
                  roles: [...player!.roles.filter(r => r !== role.id), role.id]
                })
                closeRolesModal()
              }} getText={() => ''} />
            </TranslationProvider>
          </TranslationProvider>
        </IonModal>
    </IonList>
  )
}

export default PlayerView