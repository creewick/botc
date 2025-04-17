interface Settings {
  lang: string
  darkMode: boolean | null
}

const DEFAULT_SETTINGS = {
  lang: 'ru',
  darkMode: null
}

export { type Settings, DEFAULT_SETTINGS }