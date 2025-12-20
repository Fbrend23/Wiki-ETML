import fs from 'node:fs'
import path from 'node:path'
import { glob } from 'glob'
import 'dotenv/config'
import process from 'node:process'

const OPENAI_KEY = process.env.OPENAI_API_KEY
const MARKDOWN_DIR = 'public/markdown'
const QUIZ_DATA_FILE = 'src/data/quizData.json'

const SYSTEM_PROMPT = `
Tu es un expert pédagogique strict. Ta tâche est de générer un Quiz à Choix Multiples (QCM) à partir du texte éducatif fourni.

RÈGLES :
1.  **Ancrage Strict** : Tu dois UNIQUEMENT utiliser les informations présentes dans le texte. N'utilise pas de connaissances externes.
2.  **Format de Sortie** : Renvoie UNIQUEMENT un tableau JSON valide d'objets. Pas de formatage markdown.
3.  **Format des questions** :
    - Mélange de types :
      - QCM à choix unique (1 bonne réponse).
      - QCM à choix multiples (PLUSIEURS bonnes réponses).
      - Vrai/Faux.
4.  **Langue** : TOUT le contenu (questions, options, explications) doit être en FRANÇAIS.
5.  **Structure** :
    - "text": La question.
    - "options": Tableau de chaînes (4 pour QCM, 2 pour Vrai/Faux).
    - "correctAnswer":
      - Soit un Entier (index 0-3) pour choix unique.
      - Soit un Tableau d'Entiers (ex: [0, 2]) pour choix multiples.
    - "explanation": Une explication disant POURQUOI, en CITANT la phrase exacte du texte qui prouve la réponse.

EXEMPLE DE SORTIE :
[
  {
    "id": 1,
    "text": "Quelle est la capitale de la France ?",
    "options": ["Londres", "Berlin", "Paris", "Madrid"],
    "correctAnswer": 2,
    "explanation": "Le texte indique : 'Paris est la capitale de la France.'"
  }
]
`

async function generateQuiz() {
  if (!OPENAI_KEY) {
    console.error('Error: No OPENAI_API_KEY in .env')
    process.exit(1)
  }

  // 1. Load existing data
  let quizData = {}
  if (fs.existsSync(QUIZ_DATA_FILE)) {
    // Determine if it was JS or JSON before. The user might have a JS file currently.
    // Ideally we assume we've migrated to JSON or we handle the JS format.
    // For simplicity, let's assume valid JSON structure if the file exists as .json
    try {
      const raw = fs.readFileSync(QUIZ_DATA_FILE, 'utf-8')
      quizData = JSON.parse(raw)
    } catch (e) {
      console.warn('Could not parse existing quiz data, starting fresh.', e)
    }
  }

  const files = await glob(`${MARKDOWN_DIR}/**/*.md`)
  console.log(`Found ${files.length} markdown files.`)

  let updatedCount = 0

  for (const file of files) {
    // Normalize path key to match what the frontend expects (starts with /)
    // The glob returns partial paths like 'public/markdown/...'
    // Frontend expects '/markdown/...' check MarkdownViewer.vue logic
    // Actually MarkdownViewer strips 'public', so it wants '/this/that'.
    // Wait, let's align with the confirmed fix:
    // "CleanPath: /markdown/Sécurité-183/Questions/7-OWASP.md"
    // So the key should be exactly that.

    // file = 'public/markdown/...' (or 'public\markdown\...')
    // key = '/markdown/...'
    // Normalize to forward slashes first for Windows compatibility
    const normalizedFile = file.replace(/\\/g, '/')
    const key = '/' + normalizedFile.replace(/^public\//, '') // e.g. /markdown/Num/Name.md

    if (quizData[key]) {
      // Skip if exists (or maybe add a --force flag logic later)
      console.log(`[SKIP] Quiz exists for: ${key}`)
      continue
    }

    const content = fs.readFileSync(file, 'utf-8')
    if (content.includes('NoQuiz')) {
      console.log(`[SKIP] Quiz disabled for: ${key}`)
      continue
    }

    if (content.length < 200) {
      console.log(`[SKIP] Content too short: ${key}`)
      continue
    }

    // Calculate number of questions based on length
    // Min 5, Max 25, ~1 per 500 chars.
    const questionCount = Math.max(5, Math.min(25, Math.ceil(content.length / 500)))

    console.log(
      `[GEN] Generating quiz for: ${key} (${content.length} chars -> ${questionCount} questions)...`,
    )

    try {
      const completion = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${OPENAI_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            {
              role: 'user',
              content: `Génère exactement ${questionCount} questions pour ce texte :\n\n${content}`,
            },
          ],
          temperature: 0.2, // Low temp for factual accuracy
        }),
      })

      if (!completion.ok) {
        throw new Error(`API Error: ${completion.status}`)
      }

      const data = await completion.json()
      const rawContent = data.choices[0].message.content

      // Clean up potential markdown code blocks ```json ... ```
      const jsonString = rawContent
        .replace(/^```json/, '')
        .replace(/```$/, '')
        .trim()

      const questions = JSON.parse(jsonString)

      // Add IDs
      questions.forEach((q, idx) => (q.id = idx + 1))

      // Get Title from filename
      const title = path.basename(file, '.md').replace(/^\d+-/, '').replace(/-/g, ' ')

      quizData[key] = {
        title: `Quiz: ${title}`,
        questions: questions,
      }

      updatedCount++
      console.log(`  -> Success! Generated ${questions.length} questions.`)
    } catch (err) {
      console.error(`  -> Failed: ${err.message}`)
    }

    // Save periodically or at end? Let's save each time to be safe
    fs.writeFileSync(QUIZ_DATA_FILE, JSON.stringify(quizData, null, 2))
  }

  console.log(`\nDone. Generated ${updatedCount} new quizzes.`)
}

generateQuiz()
