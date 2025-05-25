import { IonModal, IonContent, IonList, IonItem, IonLabel } from '@ionic/react'
import { Translation } from 'i18nano'
import React, { useContext } from 'react'
import Script from '../../../../cli/src/schema/Script'
import ScriptMeta from '../../../../cli/src/schema/ScriptMeta'
import { ScriptsContext } from '../../contexts/ScriptsContext'

interface Props {
  isOpen: boolean
  close: () => void
  setScript: (scriptId: string) => void
}

const ScriptListModal: React.FC<Props> = ({ isOpen, close, setScript }: Props) => {
  const { scripts } = useContext(ScriptsContext)

  const renderScript = (entry: [string, Script]) => {
    const [id, script] = entry
    const meta = script
      .find(item => (item as ScriptMeta).id === '_meta') as ScriptMeta

    const setScriptId = () => {
      setScript(id)
      close()
    }

    return (
      <IonItem onClick={setScriptId} detail={false} key={id} button>
        <IonLabel>
          <h2><Translation path={id} /></h2>
          <p>{meta?.author}</p>
        </IonLabel>
      </IonItem>
    )
  }
  
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={close}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
    >
      <IonContent>
        <IonList>
          {Object.entries(scripts).map(renderScript)}
        </IonList>
      </IonContent>
    </IonModal>
  )
}

export default ScriptListModal