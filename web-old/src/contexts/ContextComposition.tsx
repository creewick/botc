import React from 'react'
import { RolesProvider } from './RolesProvider'
import { ScriptsProvider } from './ScriptsContext'
import { GamesProvider } from './GamesProvider'
import { TranslationProvider } from 'i18nano'
import { locales } from '../locales/locales'
import { SettingsProvider } from './SettingsContext'
import { StorageProvider } from './StorageContext'

interface Props {
  children: React.ReactNode
}

const ContextComposition: React.FC<Props> = ({ children }: Props) =>
  <TranslationProvider translations={locales.ui} fallback='en'>
    <StorageProvider>
      <SettingsProvider>
        <RolesProvider>
          <ScriptsProvider>
            <GamesProvider>
              {children}
            </GamesProvider>
          </ScriptsProvider>
        </RolesProvider>
      </SettingsProvider>
    </StorageProvider>
  </TranslationProvider>

export default ContextComposition