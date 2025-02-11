import { writeFile } from 'fs/promises'
import { Context } from '../models/Context'
import JinxResponse from '../responses/JinxResponse'
import NightOrderResponse from '../responses/NightOrderResponse'
import RoleResponse from '../responses/RoleResponse'
import TetherResponse from '../responses/TetherResponse'
import RoleType from '../enums/RoleType'

async function fetchScriptToolData(context: Context) {
  const baseUrl = process.env.SCRIPT_TOOL_URL

  const [roles, nightOrders, jinxes] = await Promise.all([
    fetchJson<RoleResponse[]>(baseUrl + '/data/roles.json'),
    fetchJson<NightOrderResponse>(baseUrl + '/data/nightsheet.json'),
    fetchJson<JinxResponse[]>(baseUrl + '/data/jinx.json'),
    fetchJson<TetherResponse[]>(baseUrl + '/data/tether.json'),
  ])

  context.roles = roles
  context.data = roles.map(role => ({
    id: role.id,
    type: RoleType[role.roleType as keyof typeof RoleType],
    edition: role.version,
    name: {
      en: role.name,
    },
    jinxes: getJinxes(role, jinxes),
    firstNight: getNightOrder(role, nightOrders.firstNight),
    otherNight: getNightOrder(role, nightOrders.otherNight),
  }))
}


function getNightOrder(role: RoleResponse, orders: string[]) {
  const index = orders.indexOf(role.id)
  return index === -1 ? undefined : index + 1
}

function getJinxes(role: RoleResponse, jinxes: JinxResponse[]) {
  return jinxes
    .find(jinx => jinx.id === role.id)?.jinx
    .map(jinx => ({
      roleId: jinx.id,
      reason: {
        en: jinx.reason,
      }
    })) ?? []
}

async function fetchJson<T>(url?: string): Promise<T> {
  if (!url) {
    throw new Error('No URL provided. Probably missing .env')
  }

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
  }

  return await response.json()
}

async function saveRoleIcons(context: Context, limit = 10) {
  let failed = 0

  for (let i = 0; i < context.roles!.length; i += limit) {
    const batchResults = await Promise.allSettled(
      context.roles!
        .slice(i, i + limit)
        .map(role => saveImage(role, context.iconsPath))
    )

    failed += batchResults
      .filter(result => result.status === 'rejected')
      .length

    batchResults
      .filter(result => result.status === 'rejected')
      .forEach(result => console.error(result.reason.message))

    console.timeLog(context.stepName, {
      success: Math.min(i + limit, context.roles!.length) - failed,
      failed: failed,
      total: context.roles!.length
    })
  }
}

async function saveImage(role: RoleResponse, path: string): Promise<void> {
  const url = `${process.env.SCRIPT_TOOL_URL}/${role.icon}`
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`)
  }

  const buffer = await response.arrayBuffer()
  await writeFile(`${path}/${role.id}.webp`, Buffer.from(buffer))
}

export { fetchScriptToolData, saveRoleIcons }
