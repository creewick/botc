import { Translator } from 'deepl-node'
import { Context } from '../models/Context'
import Role from '../models/Role'

async function translateRoles(context: Context) {
  const translator = new Translator(process.env.DEEPL_API_KEY!)
  let [ success, failed, skipped ] = [0, 0, 0]

  for (const role of context.data!) {
    const prevRole = context.prevData?.find(prev => prev.id === role.id)
    
    if (prevRole && 
      prevRole.name.en === role.name!.en &&
      prevRole.summary.en === role.summary!.en &&
      prevRole.flavor.en === role.flavor!.en) {
      skipped++
      continue
    }

    try {
      await translateRole(context, translator, role)
      success++
    }
    catch (error) {
      console.error(error)
      failed++
    }

    console.timeLog(context.stepName, {
      success,
      skipped,
      failed,
      total: context.data!.length
    })
  }
}

async function translateRole(context: Context, translator: Translator, 
  role: Partial<Role>) 
{
  for (const target of context.translations) {
    const [name, summary, flavor, ...jinxes] = await Promise.all([
      translator.translateText(
        role.name!.en, 'en', target.lang, target.nameContext),
      translator.translateText(
        role.summary!.en, 'en', target.lang, target.summaryContext),
      translator.translateText(
        role.flavor!.en, 'en', target.lang, target.flavorContext),
      ...(role.jinxes ?? []).map(jinx => translator.translateText(
        jinx.reason.en, 'en', target.lang, target.jinxContext)
      )
    ])

    role.name![target.lang] = name.text
    role.summary![target.lang] = summary.text
    role.flavor![target.lang] = flavor.text
    for (let i = 0; i < jinxes.length; i++) {
      role.jinxes![i].reason![target.lang] = jinxes[i].text
    }
  }
}

export default translateRoles
