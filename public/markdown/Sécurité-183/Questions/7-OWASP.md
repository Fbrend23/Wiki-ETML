<!-- INSTRUCTION_AUDIO:
Lis chaque question puis immédiatement sa réponse.
Adopte un ton formel, professionnel et motivant.
Ne lis pas ce bloc.
-->

# **7. OWASP**

_(Source : I183-TS2-ListeDesQuestions.pdf)_

## **OWASP1 — Broken Access Control**

Failles liées aux droits d’accès :
Elles permettent souvent :

- consultation de données d'un autre utilisateur,
- modification non autorisée,
- escalade de privilèges.

C’est la vulnérabilité **la plus courante** dans les applications modernes.

---

## **OWASP2 — Cryptographic Failures**

Problèmes liés :

- au mauvais choix d’algorithmes,
- à des clés trop courtes,
- à des données non chiffrées.

Les conséquences peuvent être désastreuses : fuite massive de données, déchiffrement, accès non autorisé.

---

## **OWASP3 — Top 5 + Insecure Design**

L’OWASP Top 5 met en avant les risques majeurs.
La section « Insecure Design » insiste sur le fait que :

> “La sécurité doit être pensée dès la conception.”

Une application peut avoir un code propre, mais une **mauvaise architecture** suffit à la rendre vulnérable.

---

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

## **OWASP5 — Security Misconfiguration**

Erreurs fréquentes :

- debug actif en prod,
- ports/admin exposés,
- headers de sécurité absents,
- fichiers sensibles non supprimés.

Très simple à exploiter, extrêmement courant.

---

## **OWASP6 — Qu’est-ce qu’OWASP ?**

OWASP est une organisation mondiale dédiée à la sécurité :
Elle produit :

- outils (ZAP),
- guides pratiques,
- le célèbre **OWASP Top 10**,
- une base complète de bonnes pratiques.

Référence essentielle pour tout développeur web.

---
