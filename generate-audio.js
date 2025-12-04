import fs from 'node:fs'
import path from 'node:path'
import { glob } from 'glob'
import 'dotenv/config'
import process from 'node:process'

const OPENAI_KEY = process.env.OPENAI_API_KEY
const MARKDOWN_DIR = 'public/markdown'
const AUDIO_DIR = 'public/audio'

const BASE_SYSTEM_INSTRUCTION = `
Tu es un expert pédagogique chargé de préparer des scripts pour un podcast éducatif destiné à des étudiants en informatique.
Ta tâche est de transformer des fiches de cours Markdown en un texte fluide, optimisé pour être lu à haute voix (Text-to-Speech).

Règles de réécriture :
1. TON : Adopte un ton clair, posé, professionnel mais engageant.
2. STRUCTURE : Ignore les titres de bas niveau s'ils cassent le rythme. Fais des transitions naturelles.
3. NETTOYAGE : Ne lis JAMAIS les symboles Markdown (*, #, -). Ne dis pas "Titre", "Sous-titre".
4. CODE : Si il y a du code, ne le lis pas caractère par caractère. Résume ce que fait le code ou lis les parties essentielles si c'est court.
5. TABLEAUX : Ne lis pas les tableaux ligne par ligne. Transforme-les en phrases descriptives.
6. SORTIE : Tu ne dois répondre QUE par le texte à lire, sans introduction ("Voici le texte...") ni conclusion.
`

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function generateAudio() {
  if (!OPENAI_KEY) {
    console.error('Erreur : Pas de clé API OpenAI trouvée dans .env')
    process.exit(1)
  }

  const files = await glob(`${MARKDOWN_DIR}/**/*.md`)
  console.log(`${files.length} fichiers trouvés.`)

  for (const file of files) {
    const relativePath = path.relative(MARKDOWN_DIR, file)
    const audioPath = path.join(AUDIO_DIR, relativePath.replace(/\.md$/, '.mp3'))

    // Création des dossiers si nécessaire
    const audioDir = path.dirname(audioPath)
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true })
    }
    if (fs.existsSync(audioPath)) {
      continue
    }

    console.log(`\nTraitement de : ${relativePath}`)

    const content = fs.readFileSync(file, 'utf-8')

    const instructionMatch = content.match(/<!-- INSTRUCTION_AUDIO:([\s\S]*?)-->/)
    const extraInstruction = instructionMatch ? instructionMatch[1].trim() : ''

    const contentBody = instructionMatch ? content.replace(instructionMatch[0], '') : content

    try {
      console.log(`1/2 Réécriture du script (GPT-4o)...`)

      const chatResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content:
                BASE_SYSTEM_INSTRUCTION +
                (extraInstruction
                  ? `\n\nInstructions Spécifiques pour ce fichier :\n${extraInstruction}`
                  : ''),
            },
            {
              role: 'user',
              content: `Voici le contenu Markdown à transformer en script audio :\n\n${contentBody}`,
            },
          ],
          temperature: 0.7,
        }),
      })

      if (!chatResponse.ok) {
        throw new Error(`Erreur Chat API: ${chatResponse.status} - ${await chatResponse.text()}`)
      }

      const chatData = await chatResponse.json()
      const textToRead = chatData.choices[0].message.content
      console.log(`2/2 Génération audio (TTS)...`)

      const audioResponse = await fetch('https://api.openai.com/v1/audio/speech', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'tts-1',
          voice: 'alloy',
          input: textToRead,
        }),
      })

      if (!audioResponse.ok) {
        throw new Error(`Erreur Audio API: ${audioResponse.status} - ${await audioResponse.text()}`)
      }

      const arrayBuffer = await audioResponse.arrayBuffer()
      // eslint-disable-next-line no-undef
      const buffer = Buffer.from(arrayBuffer)

      fs.writeFileSync(audioPath, buffer)
      console.log(`Succès ! Audio enregistré.`)

      await sleep(1000)
    } catch (err) {
      console.error(`Erreur sur ${relativePath} :`, err.message)
    }
  }
}

generateAudio()
