export const locales = {
  ui: {
    en: () => import('./en/ui.json'),
    ru: () => import('./ru/ui.json'),
  },
  roles: {
    en: () => import('./en/roles.json'),
    ru: () => import('./ru/roles.json'),
  },
  scripts: {
    en: () => import('./en/scripts.json'),
    ru: () => import('./ru/scripts.json'),
  },
}

