export const quizData = {
  '/markdown/Sécurité-183/Questions/7-OWASP.md': {
    title: 'Quiz OWASP Top 10',
    questions: [
      {
        id: 1,
        text: "Quelle est la faille de sécurité la plus courante selon l'OWASP ?",
        options: [
          'Injection SQL',
          'Cross-Site Scripting (XSS)',
          'Mauvaise configuration de sécurité',
          'Composants vulnérables',
        ],
        correctAnswer: 0,
        explanation:
          "L'injection (SQL, NoSQL, OS, LDAP) est souvent classée numéro 1 ou très haut dans le top 10 OWASP.",
      },
      {
        id: 2,
        text: 'Que signifie XSS ?',
        options: [
          'Extra Safe Security',
          'Cross-Site Scripting',
          'XML Site Sheet',
          'Xtreme Security Standard',
        ],
        correctAnswer: 1,
        explanation:
          "XSS signifie Cross-Site Scripting, une faille permettant d'injecter du code client malveillant.",
      },
    ],
  },
  '/markdown/Web-294/General/intro.md': {
    title: 'Quiz Introduction Web',
    questions: [
      {
        id: 1,
        text: 'Quel est le but principal de ce Wiki ?',
        options: [
          'Partager des recettes de cuisine',
          'Centraliser les ressources de cours ETML',
          'Vendre des livres',
          'Aucune de ces réponses',
        ],
        correctAnswer: 1,
        explanation:
          "Ce wiki sert à centraliser et partager les connaissances et ressources des cours de l'ETML.",
      },
    ],
  },
}
