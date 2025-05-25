import {
  IonButton,
  IonIcon,
  IonPopover,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/react'
import { filterOutline } from 'ionicons/icons'
import React from 'react'
import { KeyOption, RoleListState } from '../../models/RoleListState'
import { Translation } from 'i18nano'

interface Props {
  state: RoleListState
  setState: (state: RoleListState) => void
  sortOptions: KeyOption[]
}

const RoleFilters: React.FC<Props> = ({ 
  state, setState, sortOptions 
}: Props) => (
  <IonButton id="filters">
    <IonIcon icon={filterOutline} />
    <IonPopover trigger="filters" triggerAction="click">
      <IonList>
        <IonItem button={true} id="sort-by">
          <IonLabel>
            <Translation path="roles.sortBy" />
            <p>{state.sort?.name}</p>
          </IonLabel>
        </IonItem>
        <IonPopover trigger="sort-by" dismissOnSelect={true}>
          <IonList>
            {sortOptions.map(option => (
              <IonItem
                key={option.name}
                button={true}
                detail={false}
                onClick={() => setState({ ...state, sort: option })}
              >
                {option.name}
              </IonItem>
            ))}
          </IonList>
        </IonPopover>
      </IonList>
    </IonPopover>
  </IonButton>
)

export default RoleFilters