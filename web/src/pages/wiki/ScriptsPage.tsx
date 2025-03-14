import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  useIonToast,
  IonProgressBar,
  IonChip,
  IonGrid,
  IonSearchbar
} from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'
import React, { MouseEvent, useContext, useEffect, useState } from 'react'
import Script from '../../../../cli/src/schema/Script'
import ScriptMeta from '../../../../cli/src/schema/ScriptMeta'
import ScriptMetaExtended from '../../../../cli/src/models/ScriptMetaExtended'
import { shareOutline } from 'ionicons/icons'
import { ScriptListState } from '../../models/ScriptListState'
import { ScriptsContext } from '../../contexts/ScriptsContext'


const ScriptsPage: React.FC = () => {
  const t = useTranslation()
  const { scripts, loadScripts } = useContext(ScriptsContext)
  const [state, setState] = useState<ScriptListState>({})
  const [showToast] = useIonToast()

  function getScripts() {
    return Object
      .entries(scripts ?? {})
      .filter(([id, script]) => {
        const meta = script.find(item =>
          (item as ScriptMeta).id === '_meta') as ScriptMetaExtended

        return (!state.query || t(id)
          .toLowerCase().includes(state.query)) &&
          (!state.tag ||
            (state.tag === 'full' && !meta.tags?.includes('teen')) ||
            meta.tags?.includes(state.tag))
      })
  }
  useEffect(() => void loadScripts(), [])

  const onCopy = async (event: MouseEvent, script: Script) => {
    event.preventDefault()
    event.stopPropagation()
    await navigator.clipboard.writeText(JSON.stringify(script))
    showToast({
      message: t('scripts.copied'),
      duration: 3000,
      position: 'top',
    })
  }

  const tags = ['world_cup', 'official', 'teen', 'full']

  const onTagClick = (tag: string) => {
    setState({ ...state, tag: state.tag === tag ? undefined : tag })
  }

  function onSearch(event: Event) {
    const target = event.target as HTMLIonSearchbarElement
    const query = target.value!.toLowerCase()
    setState({ ...state, query })
  }

  const renderTag = (tag: string) =>
    <IonChip
      key={tag}
      color={state.tag === tag ? 'primary' : 'medium'}
      onClick={() => onTagClick(tag)}
    >
      <Translation path={`scripts.tags.${tag}`} />
    </IonChip>

  const renderScript = (id: string, script: Script, index: number) => {
    const meta = script
      .find(item => (item as ScriptMeta).id === '_meta') as ScriptMeta

    return (
      <IonItem
        routerLink={`/wiki/scripts/${id}`}
        detail={false}
        key={index}
        button
      >
        <IonLabel>
          <h2><Translation path={id} /></h2>
          <p>{meta?.author}</p>
        </IonLabel>
        <IonButton
          className='ion-no-padding'
          fill='clear'
          size='default'
          onClick={(e) => onCopy(e, script)}
          id='copyScript'
        >
          <IonIcon icon={shareOutline} color='primary' />
        </IonButton>
      </IonItem>
    )
  }

  return (
    <IonPage>
      <IonHeader collapse='fade'>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonBackButton text={t('wiki.title')} />
          </IonButtons>
          <IonTitle>
            <Translation path='scripts.title' />
          </IonTitle>
          {!scripts && <IonProgressBar type="indeterminate" />}
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              <Translation path='scripts.title' />
            </IonTitle>
          </IonToolbar>
          <IonSearchbar
            placeholder={t('scripts.search')}
            onIonInput={onSearch}
          />
          <IonGrid style={{ whiteSpace: 'nowrap', overflowX: 'auto' }}>
            {tags.map(renderTag)}
          </IonGrid>
        </IonHeader>

        <IonList>
          {getScripts()
            .map(([id, script], index) =>
              renderScript(id, script, index))
          }
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default ScriptsPage