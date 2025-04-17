import { IonSearchbar } from '@ionic/react'
import { useTranslation } from 'i18nano'
import React, { Suspense } from 'react'

interface Props extends React.ComponentProps<typeof IonSearchbar> {
  path?: string
}

const SearchbarInternal: React.FC<Props> = ({ path, ...rest }) => {
  const t = useTranslation()
  return (
    <IonSearchbar placeholder={t(path ?? '')} {...rest} />
  )
}

const Searchbar: React.FC<Props> = ({ path, ...rest }) => {
  return (
    <Suspense fallback={<IonSearchbar {...rest} />}>
      <SearchbarInternal path={path} {...rest} />
    </Suspense>
  )
}

export default Searchbar