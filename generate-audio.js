import fs from 'node:fs'
import path from 'node:path'
import MarkdownIt from 'markdown-it'
import { glob } from 'glob'
import 'dotenv/config'
import process from 'node:process'

const OPENAI_KEY = process.env.OPENAI_API_KEY
const MARKDOWN_DIR = 'public/markdown'
const AUDIO_DIR = 'public/audio'

const SYSTEM_INSTRUCTION = `
Tu es un professeur expert et bienveillant d'une école d'informatique.
Ta mission est de lire cette fiche de révision pour un étudiant.
- Adopte un ton clair, posé et engageant (style podcast éducatif).
- Fais des pauses marquées après les titres.
- N'hésite pas à varier l'intonation pour rendre le contenu vivant.
- Ne lis pas les symboles de mise en forme markdown (comme "dièse dièse"), lis juste le contenu.
`

const md = new MarkdownIt()
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function generateAudio() {
  if (!OPENAI_KEY) {
    console.error('Erreur : Pas de clé API OpenAI trouvée.')
    process.exit(1)
  }

  if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR, { recursive: true })

  const files = await glob(`${MARKDOWN_DIR}/**/*.md`)
  console.log(`${files.length} fichiers trouvés. Mode : gpt-4o-mini-tts.`)

  for (const file of files) {
    const filename = path.basename(file, '.md')
    const audioPath = path.join(AUDIO_DIR, `${filename}.mp3`)

    if (fs.existsSync(audioPath)) {
      console.log(`Existe déjà : ${filename}`)
      continue
    }

    console.log(`Enregistrement IA (${filename})...`)

    const content = fs.readFileSync(file, 'utf-8')

    // ---- Extraction des instructions personnalisées ----
    const instructionMatch = content.match(/<!-- INSTRUCTION_AUDIO:([\s\S]*?)-->/)
    const extraInstruction = instructionMatch ? instructionMatch[1].trim() : ''

    const contentWithoutInstruction = instructionMatch
      ? content.replace(instructionMatch[0], '')
      : content

    // ---- Markdown → texte ----
    const rawText = md
      .render(contentWithoutInstruction)
      .replace(/<[^>]*>/g, '')
      .trim()

    // ---- Fusion du prompt ----
    const finalPrompt =
      SYSTEM_INSTRUCTION +
      '\n\n' +
      (extraInstruction ? `Instruction spécifique : ${extraInstruction}\n\n` : '') +
      `Voici le texte à lire :\n\n${rawText}`

    try {
      const response = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini-tts',
          voice: 'alloy',
          input: finalPrompt,
          format: 'mp3',
        }),
      })

      if (!response.ok) {
        const err = await response.text()
        throw new Error(`API error ${response.status} : ${err}`)
      }

      // ---- Récupération correcte côté GPT-4o Final ----
      const arrayBuffer = await response.arrayBuffer()
      // eslint-disable-next-line no-undef
      const buffer = Buffer.from(arrayBuffer)

      fs.writeFileSync(audioPath, buffer)

      console.log(`${filename}.mp3 généré avec succès !`)
      await sleep(1500)
    } catch (err) {
      console.error(`Erreur sur ${filename} :`, err.message)
    }
  }
}

generateAudio()
