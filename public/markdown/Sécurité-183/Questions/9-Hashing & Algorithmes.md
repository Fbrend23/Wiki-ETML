<!-- INSTRUCTION_AUDIO:
Lis chaque question puis immédiatement sa réponse.
Adopte un ton formel, professionnel et motivant.
Ne lis pas ce bloc.
-->

# **9. Hashing & Algorithmes**

_(Source : I183-TS2-ListeDesQuestions.pdf)_

## **HASH1 — Pourquoi MD5 est compromis ?**

MD5 (Message Digest 5) est considéré comme cryptographiquement brisé et dangereux à utiliser aujourd'hui pour la sécurité.
Pour comprendre pourquoi, il faut revenir à la promesse de base d'une fonction de hachage : elle doit agir comme une empreinte digitale numérique.

### 1. Les Collisions (Le problème d'unicité)
- C'est la faille la plus critique pour la signature numérique.
Le problème : Il est mathématiquement possible (et facile aujourd'hui) de créer deux fichiers différents qui produisent exactement la même empreinte MD5.

La conséquence : L'intégrité n'est plus garantie. Un pirate peut remplacer un fichier sain par un fichier malveillant sans que la signature ne change (attaque des "Jumeaux Maléfiques").

### 2. La Vitesse de calcul (Le problème des mots de passe)
C'est la faille critique pour le stockage des identifiants.
- Le problème : MD5 est trop léger et rapide. Un ordinateur moderne peut calculer des milliards de hashs MD5 par seconde.

La conséquence : Si une base de données est volée, les mots de passe hachés en MD5 sont cassés quasi instantanément par "brute-force" (essai de toutes les combinaisons). Il ne ralentit pas assez l'attaquant.

### 3. La Vulnérabilité prouvée (Le problème historique)
C'est le constat d'échec technique.

Le problème : L'algorithme est trop court (128 bits) et structurellement faible face aux méthodes de cryptanalyse actuelles.

La conséquence : Des attaques réelles et célèbres (comme le malware Flame) ont déjà exploité ces failles pour contourner la sécurité de Windows. Ce n'est plus une théorie, l'algorithme est officiellement "brisé".
### Les algorithmes recommandés :

- bcrypt,
- Argon2,
- PBKDF2,
- SHA-256/512 (pour intégrité, pas pour mots de passe).

---
