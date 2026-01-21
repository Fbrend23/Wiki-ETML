import fs from 'node:fs'
import path from 'node:path'
import { glob } from 'glob'
import 'dotenv/config'
import process from 'node:process'
import { Buffer } from 'node:buffer'

import crypto from 'node:crypto'

const OPENAI_KEY = process.env.OPENAI_API_KEY
const MARKDOWN_DIR = 'public/markdown'
const AUDIO_DIR = 'public/audio'
const MANIFEST_FILE = path.join(AUDIO_DIR, 'audio-manifest.json')

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

const MAX_CHARS = 4096

function splitTextIntoChunks(text) {
  if (text.length <= MAX_CHARS) return [text]

  const chunks = []
  let currentChunk = ''

  // Split by paragraphs first
  const paragraphs = text.split('\n')

  for (const paragraph of paragraphs) {
    if ((currentChunk + paragraph).length + 1 < MAX_CHARS) {
      currentChunk += (currentChunk ? '\n' : '') + paragraph
    } else {
      // If adding the paragraph exceeds the limit
      if (currentChunk) {
        chunks.push(currentChunk)
        currentChunk = ''
      }

      // If the paragraph itself is too long, split by sentences
      if (paragraph.length > MAX_CHARS) {
        const sentences = paragraph.match(/[^.!?]+[.!?]+(\s+|$)/g) || [paragraph]
        for (const sentence of sentences) {
          if ((currentChunk + sentence).length < MAX_CHARS) {
            currentChunk += sentence
          } else {
            if (currentChunk) chunks.push(currentChunk)
            currentChunk = sentence
          }
        }
      } else {
        currentChunk = paragraph
      }
    }
  }

  if (currentChunk) chunks.push(currentChunk)
  return chunks
}

function calculateHash(content) {
  return crypto.createHash('md5').update(content).digest('hex')
}

async function generateAudio() {
  if (!OPENAI_KEY) {
    console.error('Erreur : Pas de clé API OpenAI trouvée dans .env')
    process.exit(1)
  }

  const files = await glob(`${MARKDOWN_DIR}/**/*.md`)
  console.log(`${files.length} fichiers trouvés.`)

  // Load Manifest
  let manifest = {}
  if (fs.existsSync(MANIFEST_FILE)) {
    try {
      manifest = JSON.parse(fs.readFileSync(MANIFEST_FILE, 'utf-8'))
    } catch {
      console.warn('Manifest corrompu, redémarrage à zéro.')
    }
  }

  let hasChanges = false

  for (const file of files) {
    // Normalisation du chemin : Slashes '/' et Unicode NFC
    let relativePath = path.relative(MARKDOWN_DIR, file).split(path.sep).join('/').normalize('NFC')

    // Construction du chemin audio (OS dependent path is fine here, but we use the normalized relative path for consistency)
    const audioPath = path.join(AUDIO_DIR, relativePath.replace(/\.md$/, '.mp3'))

    // Création des dossiers si nécessaire
    const audioDir = path.dirname(audioPath)
    if (!fs.existsSync(audioDir)) {
      fs.mkdirSync(audioDir, { recursive: true })
    }

    const content = fs.readFileSync(file, 'utf-8')
    // Normalisation Agressive : Strip BOM + CRLF/CR => LF
    const contentNormalized = content.replace(/^\uFEFF/, '').replace(/\r\n|\r/g, '\n')

    if (content.includes('NoAudio')) {
      // Clean up if it exists
      if (fs.existsSync(audioPath)) {
        // fs.unlinkSync(audioPath) // Optional: delete existing?
      }
      continue
    }

    const currentHash = calculateHash(contentNormalized)
    const lastHash = manifest[relativePath]
    const audioExists = fs.existsSync(audioPath)

    // Cas 1 : Tout est à jour
    if (audioExists && lastHash === currentHash) {
      continue
    }

    // Cas 2 : Migration / Premier lancement avec fichiers existants
    // Si l'audio existe mais qu'on a pas de hash (nouveau système), on fait confiance au fichier existant
    // pour éviter de tout payer/régénérer.
    if (audioExists && !lastHash) {
      console.log(` Migration: Audio existant trouvé pour ${relativePath}. Ajout au manifest.`)
      manifest[relativePath] = currentHash
      hasChanges = true
      continue
    }

    console.log(`\nTraitement de : ${relativePath}`)
    if (!lastHash) console.log(' -> Nouveau fichier (absent du manifest).')
    else if (lastHash !== currentHash) {
      console.log(` -> Contenu modifié (Hash mismatch).`)
      console.log(`    Ancien: ${lastHash}`)
      console.log(`    Nouveau: ${currentHash}`)
    } else if (!audioExists) console.log(' -> Audio manquant.')

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

      const textChunks = splitTextIntoChunks(textToRead)
      const audioBuffers = []

      for (let i = 0; i < textChunks.length; i++) {
        const chunk = textChunks[i]
        // console.log(`   - Chunk ${i + 1}/${textChunks.length} (${chunk.length} chars)`)

        const audioResponse = await fetch('https://api.openai.com/v1/audio/speech', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${OPENAI_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'tts-1',
            voice: 'alloy',
            input: chunk,
          }),
        })

        if (!audioResponse.ok) {
          throw new Error(
            `Erreur Audio API (Chunk ${i + 1}): ${audioResponse.status} - ${await audioResponse.text()}`,
          )
        }

        const arrayBuffer = await audioResponse.arrayBuffer()
        audioBuffers.push(Buffer.from(arrayBuffer))
      }

      const finalBuffer = Buffer.concat(audioBuffers)
      fs.writeFileSync(audioPath, finalBuffer)
      console.log(`Succès ! Audio enregistré.`)

      // Update Manifest
      manifest[relativePath] = currentHash
      hasChanges = true

      await sleep(1000)
    } catch (err) {
      console.error(`Erreur sur ${relativePath} :`, err.message)
    }
  }

  // Save Manifest if updated
  if (hasChanges) {
    fs.writeFileSync(MANIFEST_FILE, JSON.stringify(manifest, null, 2))
    console.log('\nManifest audio mis à jour.')
  }
}

generateAudio()
