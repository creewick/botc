import RoleType from '../../../cli/src/enums/RoleType'
import Role from '../../../cli/src/models/Role'
import Script from '../../../cli/src/schema/Script'
import ScriptCharacter from '../../../cli/src/schema/ScriptCharacter'
import { RolesContext } from '../contexts/RolesProvider'
import useSafeContext from '../hooks/useSafeContext'
import { getScriptMeta } from './getScriptMeta'

const parseScript = (script: Script) => {
  const meta = getScriptMeta(script)

  const roles = script
    .map(item => {
      if (typeof item === 'string')
        return loadByCharacterId(item)
      if ('ability' in item)
        return loadCustomCharacter(item)
      return loadByCharacterId(item.id)
    })
    .filter(role => !!role)

  const bootleggers = meta.bootlegger?.map((_, index) => ({
    id: index.toString(),
    edition: '',
    type: RoleType.Bootlegger,
    setup: false
  })) ?? []

  const customRolesLocale = script
    .filter(item => typeof item !== 'string' && 'ability' in item)
    .map(role => ({
      id: role.id,
      name: role.name,
      ability: role.ability,
      flavor: role.flavor ?? '',
      firstNightReminder: role.firstNightReminder ?? '',
      otherNightReminder: role.otherNightReminder ?? '',
      reminders: role.reminders ?? [],
      jinxes: role.jinxes
        ?.reduce((acc, jinx) => ({ ...acc, [jinx.id]: jinx.reason }), {}),
    }))
    .reduce((acc, role) => ({ ...acc, [role.id]: role }), {})

  const locale = { en: () => Promise.resolve(customRolesLocale) }

  return ({ roles, bootleggers, locale })
}

const loadCustomCharacter = (role: ScriptCharacter): Role => ({
  id: role.id,
  type: role.team as RoleType,
  edition: role.edition ?? '',
  setup: role.setup ?? false,
  firstNightOrder: role.firstNight,
  otherNightOrder: role.otherNight,
  jinxes: role.jinxes?.map(jinx => jinx.id),
})

const loadByCharacterId = (id: string) => {
  const { roles } = useSafeContext(RolesContext)
  
  return roles.find((role: Role) => role.id === id.replaceAll('_', ''))
}

export default parseScript
