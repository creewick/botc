import dotenv from 'dotenv'
import { Context } from './models/Context'
import { readData, saveData } from './services/fileService'
import fetchBotcData from './services/botcParser'

async function main() {
  dotenv.config()
  const context: Context = {
    rolesPath: '../data/roles.json',
    iconsPath: '../data/icons',
  }

  await runStep('STEP 1: Read Existing Data', readData, context)
  await runStep('STEP 2: Fetch BOTC Data', fetchBotcData, context)
  await runStep('STEP 3: Save Roles Data', saveData, context)
  // await runStep('STEP 2: Fetch Script Tool Data', fetchScriptToolData, context)
  // await runStep('STEP 3: Fetch Wiki Data', fetchWikiData, context)
  // await runStep('STEP 4: Translate Wiki Data', translateRoles, context)
  // await runStep('STEP 6: Save Roles Icons', saveRoleIcons, context)
}

async function runStep(
  name: string,
  action: (context: Context, ...args: any[]) => Promise<void>,
  context: Context,
  ...args: any[]
) {
  console.time(name)
  context.stepName = name
  await action(context, ...args)
  console.timeEnd(name)
}

main()
