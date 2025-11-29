import fs from 'node:fs'
import path from 'node:path'
import MarkdownIt from 'markdown-it'
import { glob } from 'glob'
import 'dotenv/config'

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
  console.log(`${files.length} fichiers trouvés. Mode: GPT-4o Audio (Instruct).`)

  for (const file of files) {
    const filename = path.basename(file, '.md')
    const audioPath = path.join(AUDIO_DIR, `${filename}.mp3`)

    if (fs.existsSync(audioPath)) {
      console.log(`Existe déjà : ${filename}`)
      continue
    }

    console.log(`Enregistrement IA (${filename})...`)

    // Lecture du fichier
    const content = fs.readFileSync(file, 'utf-8')
    const rawText = md
      .render(content)
      .replace(/<[^>]*>/g, '')
      .trim()

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-audio-preview',
          modalities: ['text', 'audio'],
          audio: {
            voice: 'alloy',
            format: 'mp3',
          },
          messages: [
            {
              role: 'system',
              content: SYSTEM_INSTRUCTION,
            },
            {
              role: 'user',
              content: `Voici le cours à lire : \n\n${rawText}`,
            },
          ],
        }),
      })

      if (!response.ok) {
        const err = await response.text()
        throw new Error(`API Error ${response.status}: ${err}`)
      }

      const data = await response.json()

      // GPT-4o Audio renvoie l'audio en base64 dans le JSON
      const audioBase64 = data.choices[0].message.audio.data
      const audioId = data.choices[0].message.audio.id

      // Conversion Base64 -> Fichier binaire
      const buffer = Buffer.from(audioBase64, 'base64')

      fs.writeFileSync(audioPath, buffer)
      console.log(`${filename} généré avec succès (ID: ${audioId})`)

      // Pause de sécurité
      await sleep(2000)
    } catch (err) {
      console.error(`Erreur sur ${filename}:`, err.message)
    }
  }
}

generateAudio()
