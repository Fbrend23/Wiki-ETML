<!-- INSTRUCTION_AUDIO:
Lis chaque question puis immédiatement sa réponse.
Adopte un ton formel, professionnel et motivant.
Ne lis pas ce bloc.
-->

# **1. Authentification & Mots de passe**

_(Source : I183-TS2-ListeDesQuestions.pdf)_

## **LOGIN1 — À quoi sert le « salt » ajouté à un mot de passe ?**

Un **salt** est une valeur aléatoire ajoutée au mot de passe avant son hachage.
Il permet de renforcer massivement la sécurité en empêchant :

- l’utilisation de **rainbow tables**, car chaque hachage devient unique,
- la détection automatique de deux utilisateurs ayant le **même mot de passe**,
- les attaques basées sur des hachages prévisibles.

Même si une base de données est volée, un attaquant ne peut pas pré-calculer des correspondances.
Le salt doit être **unique**, **long**, **aléatoire** et **stocké avec le hash**, car il n’a pas besoin d’être secret.
Il rend les *Rainbow Tables* inutiles car il faudrait générer une table entière pour chaque salt différent.

---

## **LOGIN2 — Exemples de mots de passe selon difficulté**

**Cracké instantanément**
Mots de passe trop courts ou très connus.
Ils sont présents dans toutes les bases de données d’attaques (rockyou.txt).
Un pirate teste d’abord ces valeurs avant toute attaque plus coûteuse.
> *Exemples :* `123456`, `password`, `admin`, `qwerty`.

**Cracké en minutes/heures**
Combinaisons un peu variées mais basées sur des schémas prévisibles :

- ajout d’un chiffre en fin,
- remplacement de lettres évidentes (o → 0).
  Ces “stratégies” ne trompent pas les outils modernes.
> *Exemples :* `Maison123`, `P@ssw0rd!`, `Soleil2024`.

**Cracké en années**
Phrases secrètes longues, combinant plusieurs classes de caractères.
Leur longueur augmente **exponentiellement** l’espace de recherche.
Plus important encore : elles sont **difficiles à deviner et à retenir pour un attaquant**, mais **faciles à retenir pour l’utilisateur**.
> *Exemples :* `J'aime.Manger.Des.Pommes.Rouges!`, `Correct-Horse-Battery-Staple`.

---

## **LOGIN3 — Différence entre hachage et chiffrement**

**Hachage** : opération **à sens unique**.
On utilise des algorithmes conçus pour être **lents** (bcrypt, Argon2) et qui résistent aux attaques GPU.
Idéal pour les mots de passe, car un attaquant ne peut jamais “récupérer” la valeur d’origine.
> **Récupération :** Impossible mathématiquement. Seule méthode : **Brute-force** (essayer toutes les combinaisons).

**Chiffrement** : opération **réversible**.
Si une clé fuite, toute la donnée devient compromise.
Utile pour la confidentialité : numéros de cartes, documents privés, fichiers sensibles.
> **Récupération :** Possible instantanément si l'on possède la **clé de déchiffrement**.

Un système sécurisé doit savoir **quand utiliser l’un ou l’autre**.
Les mots de passe ne doivent **jamais** être chiffrés.

---

## **LOGIN4 — Temps de crack d’un mot de passe**

Le temps de crack provient de la combinaison :

- de la taille de l’alphabet (65 caractères dans l’exemple),
- de la longueur du mot de passe (12),
- et de la puissance de l'attaquant (60 000 essais/s dans l'exemple, mais des millions sur du matériel industriel).

**Démonstration mathématique :**
- **Combinaisons** : 65^12 ≈ 5,69 × 10^21
- **Temps (secondes)** : (5,69 × 10^21) / 60 000 ≈ 9,48 × 10^16 secondes
- **Temps (années)** : (9,48 × 10^16) / (3600 × 24 × 365) ≈ **3 milliards d'années**

Les GPU modernes permettent de tester **des milliards** d’essais par seconde.
C’est pour cela que :

- les mots de passe courts deviennent inutiles,
- les attaques de brute-force sont de plus en plus réalistes,
- et l’utilisation d’algorithmes de hash **lents** est absolument indispensable.

---

## **LOGIN5 — Étapes d’enregistrement d’un mot de passe**

1. Recevoir le mot de passe via un canal sécurisé (**HTTPS**).
2. Générer un salt cryptographiquement sûr (`crypto.randomBytes`).
3. Combiner le mot de passe au salt.
4. Hacher avec un algorithme **résistant au brute-force** (bcrypt, Argon2, scrypt).
5. Stocker **uniquement le résultat** :

- le hash,
- **+** le salt,
- **+** éventuellement le coût utilisé (`cost factor`).

Ainsi, même si la base est volée :

- chaque mot de passe demande une attaque individuelle,
- et le coût pour un attaquant devient astronomique.

---

## **AUTH1 — Authentification multi-facteurs**

L’AMF réduit fortement le risque de compromission en ajoutant une barrière physique ou biométrique.
Elle repose sur l'utilisation d'au moins deux facteurs parmi :
1. **Ce que je sais** (Mot de passe, PIN).
2. **Ce que je possède** (Smartphone, Clé YubiKey, Carte à puce).
3. **Ce que je suis** (Empreinte, FaceID, Iris).

Même si un attaquant obtient le mot de passe :

- il ne possède pas le téléphone (TOTP, SMS, clé FIDO2),
- il ne possède pas l’empreinte ou le visage.

Les systèmes modernes (Google, Microsoft, GitHub) recommandent **FIDO2** qui est résilient même contre le phishing.

---
