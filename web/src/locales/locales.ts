export const locales = {
  common: {
    en: () => import('./en/common.json'),
    ru: () => import('./ru/common.json'),
  },
  home: {
    en: () => import('./en/home.json'),
    ru: () => import('./ru/home.json'),
  },
  wiki: {
    en: () => import('./en/wiki.json'),
    ru: () => import('./ru/wiki.json'),
  },
  settings: {
    en: () => import('./en/settings.json'),
    ru: () => import('./ru/settings.json'),
  },
  characters: {
    en: () => import('./en/characters.json'),
    ru: () => import('./ru/characters.json'),
  }
}

