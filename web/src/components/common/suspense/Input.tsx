import { IonInput } from '@ionic/react'
import { useTranslation } from 'i18nano'
import React, { Suspense } from 'react'

interface Props extends React.ComponentProps<typeof IonInput> {
  path?: string
}

const InputInternal: React.FC<Props> = ({ path, ...rest }) => {
  const t = useTranslation()
  return (
    <IonInput placeholder={t(path ?? '')} {...rest} />
  )
}

const Input: React.FC<Props> = ({ path, ...rest }) => {
  return (
    <Suspense fallback={<IonInput {...rest} />}>
      <InputInternal path={path} {...rest} />
    </Suspense>
  )
}

export default Input