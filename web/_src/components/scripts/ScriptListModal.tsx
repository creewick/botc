import { IonModal, IonContent, IonList, IonItem, IonLabel } from '@ionic/react'
import { Translation, TranslationProvider } from 'i18nano'
import React from 'react'
import Script from '../../../../cli/src/schema/Script'
import { ScriptsContext } from '../../../src/contexts/ScriptsContext'
import useSafeContext from '../../../src/hooks/useSafeContext'
import { locales } from '../../../src/locales/locales'
import { getScriptMeta } from '../../../src/helpers/getScriptMeta'

interface Props {
  isOpen: boolean
  close: () => void
  setScript: (scriptId: string) => void
}

const ScriptListModal: React.FC<Props> = ({ isOpen, close, setScript }: Props) => {
  const { scripts } = useSafeContext(ScriptsContext)

  const onClick = (scriptId: string) => {
    setScript(scriptId)
    close()
  }

  const renderScript = ([id, script]: [string, Script]) => (
    <IonItem onClick={() => onClick(id)} detail={false} key={id} button>
      <IonLabel>
        <h2><Translation path={id} /></h2>
        <p>{getScriptMeta(script).author}</p>
      </IonLabel>
    </IonItem>
  )
  
  return (
    <IonModal
      isOpen={isOpen}
      onDidDismiss={close}
      initialBreakpoint={1}
      breakpoints={[0, 1]}
    >
      <IonContent>
        <IonList>
          <TranslationProvider translations={locales.scripts}>
            {Object.entries(scripts).map(renderScript)}
          </TranslationProvider>
        </IonList>
      </IonContent>
    </IonModal>
  )
}

export default ScriptListModal