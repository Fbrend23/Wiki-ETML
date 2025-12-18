<!-- INSTRUCTION_AUDIO:
Lis chaque question puis immédiatement sa réponse.
Adopte un ton formel, professionnel et motivant.
Ne lis pas ce bloc.
-->

# **7. OWASP**

_(Source : I183-TS2-ListeDesQuestions.pdf)_

<a id="owasp1"></a>

## **OWASP1 — Broken Access Control**

Failles liées aux droits d’accès :
Elles permettent souvent :

- consultation de données d'un autre utilisateur,
- modification non autorisée,
- escalade de privilèges.

C’est la vulnérabilité **la plus courante** dans les applications modernes.

---

<a id="owasp2"></a>

## **OWASP2 — Cryptographic Failures**

Problèmes liés :

- au mauvais choix d’algorithmes,
- à des clés trop courtes,
- à des données non chiffrées.

Les conséquences peuvent être désastreuses : fuite massive de données, déchiffrement, accès non autorisé.

---

<a id="owasp3"></a>

## **OWASP3 — Top 5 + Insecure Design**

1. Broken Access Control (Contrôle d’accès défaillant)

- C'est la nouvelle faille numéro 1 (elle était 5ème en 2017). Elle survient lorsque les restrictions sur ce que les utilisateurs authentifiés peuvent faire ne sont pas appliquées correctement.
  > Concrètement : Un utilisateur normal change l'URL de app.com/user/123 vers app.com/user/124 et accède aux données de quelqu'un d'autre. Ou un utilisateur standard accède à une page /admin sans en avoir les droits.

2. Cryptographic Failures (Défaillances cryptographiques)

- Auparavant appelée "Exposition de données sensibles". Cela concerne la protection des données au repos (base de données) et en transit (réseau).
  > Concrètement : Stocker des mots de passe en clair, ne pas utiliser HTTPS, utiliser des algorithmes de hachage obsolètes (comme MD5 ou SHA1), ou mal gérer les clés de chiffrement.

3. Injection

- Elle glisse de la 1ère à la 3ème place, mais reste critique. Cela regroupe les injections SQL, NoSQL (comme vu pour MongoDB), les injections de commandes OS, et désormais les failles XSS (Cross-Site Scripting) qui ont été fusionnées dans cette catégorie.
  > Concrètement : Envoyer des données non fiables à un interpréteur qui les exécute comme une commande.

4. Insecure Design (Conception non sécurisée)

- C'est une nouvelle catégorie apparue en 2021. Elle met l'accent sur le fait que la sécurité doit être pensée dès l'architecture, et pas seulement au niveau du code.
  > Concrètement : Une application e-commerce qui ne limite pas le nombre de tentatives de paiement (permettant à un bot de tester des milliers de cartes volées). Ce n'est pas un bug de code, c'est un bug de logique métier/conception.

5. Security Misconfiguration (Mauvaise configuration de sécurité)

- Elle remonte de la 6ème place. Avec la complexification des systèmes (Cloud, conteneurs), les erreurs de config sont fréquentes.
  > Concrètement : Laisser les mots de passe par défaut ("admin/admin"), laisser le mode "Debug" activé en production (qui affiche des erreurs détaillées aux pirates), ou des permissions cloud (AWS S3) trop ouvertes.

---

<a id="owasp4"></a>

## **OWASP4 — Injection**

Types :

- SQL
- NoSQL
- OS command
- LDAP
- Email header
- Template injection

C’est l'une des failles les plus anciennes, mais toujours présente.

---

<a id="owasp5"></a>

## **OWASP5 — Security Misconfiguration**

Erreurs fréquentes :

- debug actif en prod,
- ports/admin exposés,
- headers de sécurité absents,
- fichiers sensibles non supprimés.

Très simple à exploiter, extrêmement courant.

---

<a id="owasp6"></a>

## **OWASP6 — Qu’est-ce qu’OWASP ?**

OWASP est une organisation mondiale dédiée à la sécurité :
Elle produit :

- guides pratiques,
- le célèbre **OWASP Top 10**,
- une base complète de bonnes pratiques.
- **OWASP ZAP** (Scanner de vulnérabilités).
- **OWASP Juice Shop** (Application vulnérable pour l'entraînement).
- **Web Security Testing Guide (WSTG)**.

Référence essentielle pour tout développeur web.

---
