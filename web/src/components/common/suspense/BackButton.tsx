import { IonBackButton } from '@ionic/react'
import { useTranslation } from 'i18nano'
import React, { Suspense } from 'react'

interface Props {
  path?: string
}

const BackButtonInternal: React.FC<Props> = ({ path }) => {
  const t = useTranslation()
  return (
    <IonBackButton text={t(path ?? '')} />
  )
}

const BackButton: React.FC<Props> = ({ path }) => {
  return (
    <Suspense fallback={<IonBackButton />}>
      <BackButtonInternal path={path} />
    </Suspense>
  )
}

export default BackButton