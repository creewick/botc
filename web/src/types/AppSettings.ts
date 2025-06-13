export interface AppSettings {
  lang: string
  darkMode: boolean | null
}

export const defaultSettings: AppSettings = {
  lang: 'ru',
  darkMode: null
}
