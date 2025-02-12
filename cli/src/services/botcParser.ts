import RoleType from '../enums/RoleType'
import { Context } from '../models/Context'
import RoleResponse from '../responses/RoleResponse'

async function fetchBotcData(context: Context) {
  const accesssToken = await getAccessToken()
  const bearerToken = await getBearerToken(accesssToken)
  const rolesData = await fetchRolesData(bearerToken)
  
  context.roles = rolesData
  context.data = rolesData.map(role => ({
    id: role.id,
    name: textOrUndefined(role.name),
    ability: textOrUndefined(role.ability),
    flavor: textOrUndefined(role.flavor),
    type: role.team as RoleType,
    edition: role.edition,
    setup: role.setup,
    reminders: role.reminders?.map(reminder => ({ en: reminder })),
    jinxes: role.jinxes?.map(jinx => (
      { roleId: jinx.id, reason: { en: jinx.reason } }
    )),
    firstNightOrder: valueOrUndefined(role.firstNight),
    otherNightOrder: valueOrUndefined(role.otherNight),
    firstNightReminder: textOrUndefined(role.firstNightReminder), 
    otherNightReminder: textOrUndefined(role.otherNightReminder),
  }))
}

function textOrUndefined(value: string) {
  return !value || value === '' ? undefined : { en: value }
}

function valueOrUndefined(value: number) {
  return value === 0 ? undefined : value
}

async function getAccessToken(): Promise<string> {
  const response = await fetch(process.env.BOTC_GRAPHQL_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': process.env.BOTC_TOKEN!,
    },
    body: JSON.stringify({
      query: `mutation customerAccessTokenCreate
        ($input: CustomerAccessTokenCreateInput!) {
          customerAccessTokenCreate(input: $input) {
            customerUserErrors {code\nfield\nmessage}
            customerAccessToken {accessToken\nexpiresAt}
          }
        }`,
      variables: {
        input: {
          email: process.env.BOTC_LOGIN,
          password: process.env.BOTC_PASS,
        }
      }
    })
  })

  if (!response.ok) {
    throw new Error(
      `HTTP Error: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()

  return data?.data?.customerAccessTokenCreate?.customerAccessToken?.accessToken
}

async function getBearerToken(token: string): Promise<string> {
  const response = await fetch(`${process.env.BOTC_URL!}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  })

  if (!response.ok) {
    throw new Error(
      `HTTP Error: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()

  return data.accessToken
}

async function fetchRolesData(bearerToken: string): Promise<RoleResponse[]> {
  const response = await fetch(`${process.env.BOTC_URL!}/roles`, {
    headers: {
      'Authorization': `Bearer ${bearerToken}`,
    }
  })

  if (!response.ok) {
    throw new Error(
      `HTTP Error: ${response.status} ${response.statusText}`
    )
  }

  return await response.json()
}

export default fetchBotcData
