import fs from 'node:fs'
import path from 'node:path'
import { glob } from 'glob'

const MARKDOWN_DIR = 'public/markdown'
const OUTPUT_FILE = 'public/content.json'

async function generateIndex() {
  // Trouver tous les fichiers
  let files = await glob(`${MARKDOWN_DIR}/**/*.md`)

  files = files.sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }),
  )

  const structure = {}

  for (const file of files) {
    // Récupérer le dossier parent (ex: DevOps-324)
    const category = path.dirname(file).split(path.sep).pop()

    const filename = path.basename(file, '.md')

    // Enlève la numérotation
    const displayName = filename.replace(/^\d+-/, '')

    // Chemin relatif pour le navigateur
    const webPath = '/' + file.replace('public/', '').replace(/\\/g, '/')

    if (!structure[category]) {
      structure[category] = []
    }

    structure[category].push({
      name: displayName,
      file: webPath,
    })
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(structure, null, 2))
  console.log(`Index généré et trié : ${Object.keys(structure).length} catégories.`)
}

generateIndex()
