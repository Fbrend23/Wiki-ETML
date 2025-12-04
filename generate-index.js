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
    // Calcul du chemin relatif (ex: DevOps-324/Chapitre1/cours.md)
    const relativePath = path.relative(MARKDOWN_DIR, file)
    const parts = relativePath.split(path.sep)

    // Ignore les fichiers à la racine pure de 'markdown' s'il y en a
    if (parts.length < 2) continue

    // Le premier dossier est TOUJOURS le Module (ex: DevOps-324)
    const moduleName = parts[0]

    // Le reste est le Sujet (ex: Chapitre1). Si pas de sous-dossier => Général
    let subCategory = 'Général'
    if (parts.length > 2) {
      subCategory = parts.slice(1, parts.length - 1).join(' > ')
    }

    const category = `${moduleName} > ${subCategory}`

    const filename = path.basename(file, '.md')
    const displayName = filename.replace(/^\d+-/, '')
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
  console.log(`Index généré : ${Object.keys(structure).length} catégories.`)
}

generateIndex()
