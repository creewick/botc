import { IonTextarea } from '@ionic/react'
import { useTranslation } from 'i18nano'
import React, { Suspense } from 'react'

interface Props extends React.ComponentProps<typeof IonTextarea> {
  path?: string
}

const TextareaInternal: React.FC<Props> = ({ path, ...rest }) => {
  const t = useTranslation()
  return (
    <IonTextarea placeholder={t(path ?? '')} {...rest} />
  )
}

const Textarea: React.FC<Props> = ({ path, ...rest }) => {
  return (
    <Suspense fallback={<IonTextarea {...rest} />}>
      <TextareaInternal path={path} {...rest} />
    </Suspense>
  )
}

export default Textarea