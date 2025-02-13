import {
  IonButton,
  IonIcon,
  IonPopover,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react'
import { filterOutline } from 'ionicons/icons'
import React from 'react'
import { KeyOption, RoleListState } from '../../models/RoleListState'

interface Props {
  state: RoleListState
  setState: (state: RoleListState) => void
  sortOptions: KeyOption[]
  groupOptions: KeyOption[]
}

const RoleFilters: React.FC<Props> = (props: Props) => {
  const { state, setState, sortOptions, groupOptions } = props
  return (
    <>
      <IonButton id="filters">
        <IonIcon icon={filterOutline} />
      </IonButton>
      <IonPopover trigger="filters" triggerAction="click">
        <IonContent>
          <IonList>
            <IonItem button={true} id="group-by">
              <IonLabel>
                Group by
                <p>{state.group?.name}</p>
              </IonLabel>
            </IonItem>
            <IonItem button={true} id="sort-by">
              <IonLabel>
                Sort by
                <p>{state.sort?.name}</p>
              </IonLabel>
            </IonItem>
            <IonPopover trigger="group-by" dismissOnSelect={true}>
              <IonContent>
                <IonList>
                  {groupOptions.map(option => (
                    <IonItem
                      key={option.name}
                      button={true}
                      detail={false}
                      onClick={() =>
                        setState({ ...state, group: option })}
                    >
                      {option.name}
                    </IonItem>
                  ))}
                </IonList>
              </IonContent>
            </IonPopover>
            <IonPopover trigger="sort-by" dismissOnSelect={true}>
              <IonContent>
                <IonList>
                  {sortOptions.map(option => (
                    <IonItem
                      key={option.name}
                      button={true}
                      detail={false}
                      onClick={() =>
                        setState({ ...state, sort: option })}
                    >
                      {option.name}
                    </IonItem>
                  ))}
                </IonList>
              </IonContent>
            </IonPopover>
          </IonList>
        </IonContent>
      </IonPopover>
    </>
  )
}

export default RoleFilters