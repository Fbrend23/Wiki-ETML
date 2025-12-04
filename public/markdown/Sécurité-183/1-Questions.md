<!-- INSTRUCTION_AUDIO:
Lis chaque question puis immédiatement sa réponse.
Adopte un ton formel, professionnel et motivant.
Ne lis pas ce bloc.
-->

# **Liste des questions et réponses (Sécurité Web – I183)**

_(Source : I183-TS2-ListeDesQuestions.pdf)_

---

## LOGIN1 — À quoi sert le « salt » ajouté à un mot de passe ?

Un **salt** est une donnée aléatoire ajoutée au mot de passe avant le hachage.
Il empêche :

- l’utilisation de **rainbow tables**,
- la reconnaissance de deux mots de passe identiques,
- la prédictibilité des hachages.

Chaque utilisateur possède un hachage unique même si le mot de passe est identique.

---

## XSS2 — Comment se protéger d’une faille XSS en Node.js ?

- **Échapper** tout contenu utilisateur avant affichage.
- Utiliser des frameworks qui font l’escaping automatiquement (ex: React, Vue).
- **Sanitiser** les entrées (DOMPurify côté client, validator côté serveur).
- Paramétrer un **Content Security Policy (CSP)** strict.

---

## LOGIN2 — Exemples de mots de passe selon difficulté

1. **Cracké instantanément** : Mots de passe très courants ou trop simples (123456, password, azerty).
   Ces mots de passe figurent dans toutes les bases de données de dictionnaire et sont testés en premier par les outils d’attaque.
2. **Cracké en minutes/heures** : Mots de passe “un peu complexes” mais prévisibles (Bonjour123, P@ssword1).
   Ils combinent lettres/chiffres mais restent trop proches de mots du dictionnaire ou de patrons faciles à deviner
3. **Cracké en années** : Une longue phrase secrète mélangeant lettres, ponctuation et caractères spéciaux.
   Exemple :
   `Je!veux*gagner*à_l’ETML_en2025`
   ➜ Beaucoup plus difficile à craquer car la longueur augmente exponentiellement l’espace de recherche.

---

## XSS3 — Une faille XSS peut-elle voler un mot de passe ?

Oui. Une faille XSS permet d’exécuter du JavaScript dans le navigateur de la victime.

Cela peut notamment :

- voler les cookies de session (donc se faire passer pour l’utilisateur),

- injecter un faux formulaire de login pour voler les identifiants,

- enregistrer tout ce que l’utilisateur tape (keylogging),

- envoyer ses données à un serveur sous contrôle de l’attaquant.

Dans la pratique, ce n’est pas le mot de passe brut qui est volé, mais la session, ce qui revient souvent au même en termes d’accès non autorisé.

---

## LOGIN3 — Différence entre hachage et chiffrement

- **Hachage (hashing)** : opération à sens unique.
  Le résultat ne peut pas être inversé.
  Utilisé pour stocker les mots de passe.
  Pour vérifier un mot de passe, on rehash celui fourni et on compare les résultats.
- **Chiffrement(encryption)** : opération réversible.
  Une clé permet de chiffrer, et la même clé (ou une autre selon le type) permet de déchiffrer.
  Utilisé pour transporter ou stocker des données sensibles.

Conclusion :

- Le mot de passe hashé ne peut pas être récupéré, il doit être redeviné.

- Le mot de passe chiffré peut être récupéré si la clé est compromise.

---

## XSS4 — Que se passe-t-il si on soumet le script fourni ?

Le script :

- exécute `console.log("you have been hacked")`,
- redirige l’utilisateur vers `spoof.cookie.com?data=` contenant **ses cookies**.
  Conséquence : **vol de session**, prise de contrôle du compte.

Ce script malveillant :

- affiche un message dans la console,

- récupère les cookies de l’utilisateur,

- redirige la victime vers un site pirate qui reçoit ses cookies dans l’URL.

Conséquence directe :
Le pirate peut voler la session de l’utilisateur, accéder à son compte, et agir à sa place.

---

## LOGIN4 — Démonstration mathématique du temps de crack

Pour comprendre la difficulté :

Alphabet :

- 26 minuscules

- 26 majuscules

- 10 chiffres

3 caractères spéciaux (# ; !)
➜ Total : 65 caractères possibles

Mot de passe de 12 caractères :
➜ 65¹² ≈ 2,4 × 10²¹ combinaisons

Capacité de Hashcat :
➜ 60 000 essais/s sur une architecture 4x GPU

Temps estimé :
➜ 2,4 × 10²¹ / 60 000 = 4 × 10¹⁶ secondes
➜ ≈ 1,2 milliard d’années

Conclusion :
Un mot de passe réellement complexe et long est inaccessible par brute-force, même avec du matériel puissant.

---

## ISQL1 — MongoDB est-il vulnérable à des injections ?

Oui, mais pas sous forme SQL.

MongoDB utilise un langage basé sur des objets JSON.
Cependant, si l'application construit ses requêtes en injectant directement les données utilisateur, un attaquant peut ajouter des opérateurs MongoDB tels que :

`$ne` (not equal)

`$gt` (greater than)

`$regex` (expression régulière)

Exemple :

```json
{ "username": { "$ne": null } }
```

Cela peut contourner une authentification ou filtrer des données de manière non prévue.

---

## XSS1 — Définition XSS

**Cross-Site Scripting / Script intersites** :
Faille permettant l’injection de JavaScript malveillant.
Risques :

- vol de session,
- modification du DOM,
- redirections forcées.

---

## ISQL2 — Texte pour tester une injection SQL simple

`' OR '1'='1`

Ce test est utilisé car il force la condition WHERE d’une requête SQL à être toujours vraie.
Par exemple, dans une requête du type :

```sql
SELECT * FROM users WHERE username = '<input>' AND password = '<input>';
```

Si tu remplaces `<input>` par ' OR '1'='1, la requête devient :

SELECT \* FROM users WHERE username = '' OR '1'='1' AND password = '' OR '1'='1';

La condition '1'='1' est toujours vraie, ce qui peut permettre :

de contourner une connexion,

d’extraire des données qui ne devraient pas être accessibles,

ou de repérer que le site n’utilise pas de requêtes paramétrées.

## ISQL3 — Modifier une base via injection ?

Oui, si le backend est vulnérable et exécute les requêtes sans paramétrage.
Exemple :
`'; DROP TABLE users; --`

---

## MAIL4 — Qui paie pour une signature numérique dans une image ?

- Photographes,
- agences de presse,
- entreprises qui veulent prouver l’authenticité d’un document visuel.

---

## ISQL4 — Comment éviter que les erreurs SQL soient retournées ?

- Désactiver les **stack traces** en production,
- utiliser un `try/catch` global,
- retourner un **message générique**.

---

## MAIL1 — Trois manières de protéger son adresse mail

1. `contact [at] site [dot] ch` — simple mais contournable.
2. Encodage HTML — protège des bots simples.
3. Formulaire de contact — solution la plus robuste.

---

## DDOS1 — Signification de DDoS

**Distributed Denial of Service**
→ Saturation d’un service via de multiples sources.

---

## MAIL2 — Comment cacher un copyright dans une image ?

Par **stéganographie** (invisible), ou **watermarking** (marque visible).

---

## DDOS2 — Quel paramètre DNS réduit un DDoS ?

**Time To Live (TTL)** faible pour permettre un reroutage plus rapide.

---

## LOGIN5 — Étapes d’enregistrement d’un mot de passe

1. Générer un **salt** unique.
2. Hacher le mot de passe + salt avec un algorithme sécurisé (bcrypt).
3. Stocker : salt + hash (jamais le mot de passe).

---

## DDOS3 — Mitiger un DDoS

- Load balancing
- CDN
- Limitation de débit (rate limiting)
- Firewall applicatif

---

## OUTIL1 — Trois outils d’audit de sécurité

- **OWASP ZAP**
- **Burp Suite**
- **Nmap**

---

## OUTIL2 — Metasploit ?

Framework permettant l’exploitation automatisée de failles.
Ex : tester un service vulnérable en exploitant une faille connue.

---

## OUTIL3 — Peut-on utiliser Metasploit sur Swisscom ?

Non.
Attaquer un site sans autorisation est **illégal**.
Tests autorisés uniquement via **bug bounty** ou permissions contractuelles.

---

## OUTIL4 — Qu'est-ce que le Black Box Testing ?

Le testeur n’a aucune information sur l’application :

- as accès au code source,

- pas accès aux bases de données,

- pas de documentation interne.

Il teste comme un véritable pirate externe.

### Avantages :

- reproduit fidèlement un scénario d’attaque réel,

- force à considérer la sécurité “de l’extérieur”.

### Inconvénients :

- couverture limitée,

- certaines failles internes peuvent rester invisibles,

- nécessite souvent plus de temps pour comprendre le fonctionnement de l’application.

Généralement, il est complémentaire du White Box (tout ouvert) et du Grey Box (semi-ouvert).

---

## OWASP1 — Broken Access Control

Mauvaise gestion des permissions entraînant :

- accès non autorisé,
- escalade de privilèges.

---

## JWT1 — Structure d’un JWT

`header.payload.signature`
Encodé en Base64URL.

---

## OWASP2 — Cryptographic Failures

Ces failles regroupent tout ce qui concerne :

- l’utilisation de protocoles obsolètes (ex: MD5, SHA1, TLS 1.0),

- les clés trop faibles ou mal protégées,

- l’absence de chiffrement pour des données sensibles,

- l’utilisation de chiffrements maison non vérifiés.

En pratique, cela mène à :

- récupération de données sensibles,

- interception (attaque Man-in-the-Middle),

- déchiffrement facilité.

## Ce point est crucial pour tout site manipulant des données personnelles.

## OWASP3 — Top 5 OWASP

1. Broken Access Control
2. Cryptographic Failures
3. Injection
4. Insecure Design
5. Security Misconfiguration

---

## OWASP3 (suite) — Insecure Design

Mauvaise conception initiale : absence de règles de sécurité dès le design.

---

## OWASP4 — Injection

Quand des données non filtrées sont interprétées comme des commandes :
SQL, NoSQL, OS injection…

---

## OWASP5 — Security Misconfiguration

Erreur de configuration :

- ports ouverts,
- debug actif,
- droits excessifs.

---

## OWASP6 — Qu’est-ce qu’OWASP ?

Organisation mondiale dédiée à la sécurité web.
Projets :

- OWASP Top 10,
- ZAP Proxy,
- Cheat Sheets.

---

## JWT2 — Utilité d’un JWT

- Authentification stateless,
- Transport d’informations signées,
- Pas besoin de stocker une session côté serveur.

---

## XSS5 — DOM Injection

Manipulation ou injection malveillante dans le DOM côté client, sans requête serveur.

---

## HASH1 — Algorithmes de hash & pourquoi MD5 est compromis

Algorithmes : SHA-256, SHA-3, bcrypt, Argon2.
MD5 → collisions faciles → non sécurisé.

---

## AUTH1 — Authentification multi-facteurs

Combinaison de plusieurs éléments :

- quelque chose que tu sais (mot de passe),
- que tu as (téléphone),
- que tu es (biométrie).

---

## MISC1 — Risques des librairies tierces

- vulnérabilités non corrigées,
- dépendance externe,
- risques supply chain.

---

## MISC2 — Chiffrement au repos et en transit

- **Au repos** : données chiffrées sur disque.
- **En transit** : données chiffrées durant le transport réseau (HTTPS).

---
