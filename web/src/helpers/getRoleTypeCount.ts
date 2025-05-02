import RoleType from '../../../cli/src/enums/RoleType'

const getRoleTypeCount = (type: RoleType, players: number, travelers: number) => {
  const count = players - travelers

  if (type === RoleType.Townsfolk)
    return Math.max(0, Math.floor((count - 1) / 3) * 2 + 1)
  if (type === RoleType.Outsider)
    return Math.max(0, (count - 1) % 3 - (count < 7 ? 1 : 0))
  if (type === RoleType.Minion)
    return Math.max(1, Math.floor((count - 1) / 3) - 1)
  if (type === RoleType.Demon)
    return 1
  if (type === RoleType.Traveler)
    return travelers
}

export default getRoleTypeCount