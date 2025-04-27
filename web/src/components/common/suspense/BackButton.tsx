import { IonBackButton } from '@ionic/react'
import { useTranslation } from 'i18nano'
import React, { Suspense } from 'react'

interface Props {
  path?: string
  style?: React.CSSProperties
}

const BackButtonInternal: React.FC<Props> = ({ path, ...rest }) => {
  const t = useTranslation()
  return (
    <IonBackButton text={t(path ?? '')} {...rest} />
  )
}

const BackButton: React.FC<Props> = ({ path, ...rest }) => {
  return (
    <Suspense fallback={<IonBackButton {...rest} />}>
      <BackButtonInternal path={path} {...rest} />
    </Suspense>
  )
}

export default BackButton