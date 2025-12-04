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
    const dir = path.dirname(file)
    let categoryPath = path.relative(MARKDOWN_DIR, dir)

    // Gestion des fichiers à la racine (s'il y en a)
    if (!categoryPath || categoryPath === '.') {
      categoryPath = 'Général'
    }

    // Remplace les slashs (/) ou backslashs (\) par un séparateur visuel " > "
    // Ex: "DevOps-324/Chapitre-1" deviendra "DevOps-324 > Chapitre-1"
    const category = categoryPath.replace(/[\\/]/g, ' > ')

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
  console.log(
    `Index généré : ${Object.keys(structure).length} catégories (y compris sous-dossiers).`,
  )
}

generateIndex()
