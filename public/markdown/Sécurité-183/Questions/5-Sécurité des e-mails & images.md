<!-- INSTRUCTION_AUDIO:
Lis chaque question puis immédiatement sa réponse.
Adopte un ton formel, professionnel et motivant.
Ne lis pas ce bloc.
-->

# **5. E-mails & images**

_(Source : I183-TS2-ListeDesQuestions.pdf)_

<a id="mail1"></a>

## **MAIL1 — Trois manières de protéger son adresse mail**

1. **Obfuscation simple** (ex: `bob [at] mail.com`)

- _Force_ : Très simple, lisible par l'humain.
- _Faiblesse_ : Inefficace, les bots modernes comprennent cette syntaxe.

2. **Encodage HTML** (Entités `&#64;`)
   - _Force_ : Invisible pour l'utilisateur, affichage normal.
   - _Faiblesse_ : Protection faible, les bots décodent le HTML.

3. **Encodage JavaScript**
   - _Force_ : L'adresse n'apparaît pas en clair dans le code source, nécessite un moteur JS.
   - _Faiblesse_ : Inaccessible si JS est désactivé, et les bots sophistiqués l'exécutent.

4. **Formulaire de contact**
   - _Force_ : L'adresse n'est jamais exposée, protection antispam (Captcha).
   - _Faiblesse_ : Plus complexe à mettre en place (backend nécessaire).

---

<a id="mail2"></a>

## **MAIL2 — Copyright dans une image**

Deux méthodes :

- **Stéganographie** : invisible, idéale pour prouver la paternité.
- **Watermarking** : visible, dissuasif contre la réutilisation.

Les professionnels combinent souvent les deux.

---

<a id="mail4"></a>

## **MAIL4 — Qui paie ?**

La signature numérique coûte :

- en matériel (clé privée sécurisée),
- en services de certification,
- en infrastructure.

C’est donc en général l'organisation ou le professionnel qui a besoin de prouver l’authenticité d’une image.

---
