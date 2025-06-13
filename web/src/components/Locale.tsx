import { TranslationLoader, TranslationProvider } from 'i18nano'
import { Suspense } from 'react'

interface Props {
  children: React.ReactNode
  locales: Record<string, TranslationLoader>
}

export const Locale = ({ locales, children }: Props) =>
  <TranslationProvider translations={locales} fallback='en'>
    <Suspense>
      {children}
    </Suspense>
  </TranslationProvider>