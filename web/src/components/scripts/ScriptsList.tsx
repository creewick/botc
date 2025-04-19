import React, { Suspense, useMemo, useRef, useState } from 'react'
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonGrid, 
  IonChip, 
  IonIcon, 
  IonItem, 
  IonLabel, 
  IonList, 
  IonProgressBar, 
  IonItemSliding,
  IonItemOption,
  IonItemOptions
} from '@ionic/react'
import { Translation, useTranslation } from 'i18nano'
import Searchbar from '../common/suspense/Searchbar'
import { ScriptsListState } from '../../states/ScriptsListState'
import ScriptTag from '../../enums/ScriptTag'
import ScriptTagIcon from '../../enums/ScriptTagIcon'
import useSafeContext from '../../hooks/useSafeContext'
import { ScriptsContext } from '../../contexts/ScriptsContext'
import Script from '../../../../cli/src/schema/Script'
import { copyOutline, downloadOutline } from 'ionicons/icons'
import './ScriptsList.css'
import { copyScript } from '../../helpers/copyScript'
import { saveScript } from '../../helpers/saveScript'
import { getScriptMeta } from '../../helpers/getScriptMeta'

const ScriptsListInternal: React.FC<ScriptsListState> = ({ search, tag }) => {
  const { scripts } = useSafeContext(ScriptsContext)
  const list = useRef<HTMLIonListElement>(null)
  const t = useTranslation()

  const onCopy = async (id: string) => {
    await copyScript(scripts[id])
    list.current?.closeSlidingItems()
  }

  const onSave = async (id: string) => {
    await saveScript(scripts[id])
    list.current?.closeSlidingItems()
  }

  const visibleScripts = useMemo(() => {
    const getName = (id: string) => t(id).toLowerCase()
    const getTags = (script: Script) => getScriptMeta(script)?.tags

    return Object.entries(scripts)
      .filter(([id, script]: [string, Script]) => 
        (!search || getName(id).includes(search.toLowerCase())) &&
        (!tag || getTags(script)?.includes(tag) ||
          (tag === ScriptTag.Full && !getTags(script)?.includes(ScriptTag.Teen)) ||
          (tag === ScriptTag.Homebrew && !getTags(script)?.includes(ScriptTag.Official)
             && !getTags(script)?.includes(ScriptTag.WorldCup))
        ))
      .sort(([id1, _], [id2, __]) => getName(id1).localeCompare(getName(id2)))
  }, [scripts, search, tag, t])

  const getIcon = (script: Script) => {
    const tag = getScriptMeta(script).tags
      ?.find(tag => Object.values(ScriptTag).includes(tag as ScriptTag))

    if (tag) 
      return ScriptTagIcon[tag as ScriptTag]
    return ScriptTagIcon[ScriptTag.Full]
  }

  const renderScript = ([id, script]: [string, Script]) => (
    <IonItemSliding key={id}>
      <IonItem button detail={false} routerLink={`/wiki/scripts/${id}`}>
        <IonIcon slot='start' icon={getIcon(script)} color='medium' />
        <IonLabel className='ion-text-nowrap'>
          <h2>
            <Translation path={id} />
          </h2>
          <p className='ion-hide-sm-down'>
            {getScriptMeta(script)?.author}
          </p>
        </IonLabel>
      </IonItem>
      <IonItemOptions slot='end'>
        <IonItemOption color='primary' onClick={() => onCopy(id)}>
          <IonIcon slot='icon-only' icon={copyOutline} />
        </IonItemOption>
        <IonItemOption color='medium' onClick={() => onSave(id)}>
          <IonIcon slot='icon-only' icon={downloadOutline} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  )

  return (
    <IonList ref={list}>
      {visibleScripts.map(renderScript)}
    </IonList>
  )
}

const ScriptsList: React.FC = () => {
  const [state, setState] = useState<ScriptsListState>({})

  const onClick =(tag: ScriptTag) => setState(prev => ({ ...prev, tag: state.tag === tag ? undefined : tag }))
  const color = (tag: ScriptTag) => state.tag === tag ? 'primary' : 'dark'

  const renderTag = (tag: ScriptTag) => (
    <IonChip key={tag} color={color(tag)} onClick={() => onClick(tag)}>
      <IonIcon className='script-tag-icon' icon={ScriptTagIcon[tag]} />
      <Translation path={`scripts.tags.${tag}`} />
    </IonChip>
  )
  
  function onInput(event: Event) {
    const target = event.target as HTMLIonSearchbarElement
    const search = target.value!.toLowerCase()
    setState(prev => ({ ...prev, search }))
  }

  return (
    <IonContent fullscreen>
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">
            <Translation path='wiki.sections.scripts.title' />
          </IonTitle>
        </IonToolbar>
        <IonToolbar>
          <Searchbar path='scripts.search' onIonInput={onInput} />
          <IonGrid className='filters-row'>
            {Object.values(ScriptTag).map(renderTag)}
          </IonGrid>
        </IonToolbar>
      </IonHeader>
        <Suspense fallback={<IonProgressBar type='indeterminate' />}>
          <ScriptsListInternal {...state} />
        </Suspense>
    </IonContent>
  )
}

export default ScriptsList