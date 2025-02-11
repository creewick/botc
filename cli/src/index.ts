import { fetchScriptToolData, saveRoleIcons } from './services/scriptToolParser'
import fetchWikiData from './services/wikiPageParser'
import dotenv from 'dotenv'
import { Context } from './models/Context'
import { readData, saveData } from './services/fileService'
import translateRoles from './services/translatorService'

async function main() {
  const context: Context = {
    rolesPath: '../data/roles.json',
    iconsPath: '../data/icons',
    translations: [
      {
        lang: 'ru',
        nameContext: {
          context: `Название роли в игре "Кровь на Часовой Башне". 
          Перевод должен быть прост в произношении, либо похож на оригинал.`,
        },
        summaryContext: {
          context: `Краткое описание способности роли в игре 
          "Кровь на Часовой Башне". Чаще всего должно начинаться со слов 
          "Знает", "В первую ночь", "В первый день", "Каждую ночь", 
          "Каждую ночь*", "Каждый день", "Один раз за игру". 
          Перевод должен быть кратким, но не упускать нюансов игры.`,
        }
      }
    ]
  }
  await runStep('STEP 1: Read Existing Data', readData, context)
  await runStep('STEP 2: Fetch Script Tool Data', fetchScriptToolData, context)
  await runStep('STEP 3: Fetch Wiki Data', fetchWikiData, context)
  await runStep('STEP 4: Translate Wiki Data', translateRoles, context)
  await runStep('STEP 5: Save Roles Data', saveData, context)
  await runStep('STEP 6: Save Roles Icons', saveRoleIcons, context)
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

dotenv.config()
main()
