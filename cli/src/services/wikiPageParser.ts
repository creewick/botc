import { JSDOM } from 'jsdom'
import { Context } from '../models/Context'
import WikiResponse from '../responses/WikiResponse'
import OldRoleResponse from '../responses/OldRoleResponse'

async function fetchWikiData(context: Context, limit = 10) {
  let results: WikiResponse[] = []

  for (let i = 0; i < context.roles!.length; i += limit) {
    const batchResults = await Promise.allSettled(
      context.roles!.slice(i, i + limit).map(role => fetchWikiPage(role))
    )

    results = results.concat(
      batchResults
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value)
    )

    batchResults
      .filter(result => result.status === 'rejected')
      .forEach(result => console.error(result.reason.message))

    console.timeLog(context.stepName, {
      success: results.length,
      failed: Math.min(i + limit, context.roles!.length) - results.length,
      total: context.roles!.length
    })
  }

  context.wiki = results

  for (const result of results) {
    const role = context.data?.find(role => role.id === result.id)
    if (role) {
      role.flavor = { en: result.flavor }
      role.ability = { en: result.summary }
    }
  }
}

async function fetchWikiPage(role: OldRoleResponse): Promise<WikiResponse> {
  const url = encodeURI(`${process.env.WIKI_URL}/${role.name}`)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(
      `HTTP Error: ${response.status} ${response.statusText} ${role.id}`
    )
  }

  const text = await response.text()
  const doc = new JSDOM(text).window.document
  
  const summary = doc.getElementById('Summary')
    ?.closest('div')
    ?.querySelector('p')
    ?.textContent
    ?.trim() ?? ''

  const flavor = doc.querySelector('p.flavour')
    ?.textContent
    ?.trim() ?? ''

  return { id: role.id, name: role.name, summary, flavor }
}

export default fetchWikiData
