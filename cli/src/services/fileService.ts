import { readFile, writeFile } from 'fs/promises'
import { Context } from '../models/Context'

async function readData(context: Context) {
  try {
    const data = await readFile(context.rolesPath, 'utf-8')
    context.prevData = JSON.parse(data)
  }
  catch (error) {
    console.error(error)
    context.prevData = []
  }
}

async function saveData(context: Context): Promise<void> {
  await writeFile(context.rolesPath, JSON.stringify(context.data, null, 2))
}

export { readData, saveData }