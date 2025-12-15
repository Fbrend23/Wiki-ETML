<!-- INSTRUCTION_AUDIO:
Lis chaque question puis immédiatement sa réponse.
Adopte un ton formel, professionnel et motivant.
Ne lis pas ce bloc.
-->

# **3. Injections SQL & NoSQL**

_(Source : I183-TS2-ListeDesQuestions.pdf)_

## **ISQL1 — MongoDB vulnérable aux injections ?**

Oui, et ces injections peuvent :

- contourner une authentification,
- modifier les filtres de recherche,
- exploiter les opérateurs `$ne`, `$gt`, `$regex`, `$or`.
```json
username: "admin"
password: { "$ne": null }
```
>Trouve l'utilisateur 'admin' dont le mot de passe N'EST PAS nul.

Dans des systèmes mal codés, une simple requête JSON peut retourner **tous les utilisateurs**.

---

## **ISQL2 — `' OR '1'='1`**

Ce payload fonctionne car il force la condition SQL à être **toujours vraie**, ce qui :

- contourne la connexion,
- permet l’accès à des données sensibles,
- prouve que l’application n’utilise pas de requêtes préparées.

Aujourd’hui, toute API doit utiliser :
→ **paramètres préparés**,
→ **ORM sécurisés**,
→ **filtres stricts**.

---

## **ISQL3 — Modification de base par injection**

Si aucune protection n’est appliquée, une injection peut non seulement lire les données, mais aussi :

- modifier,
- supprimer,
- créer des tables.

C’est la raison pour laquelle :

- les droits d’un compte SQL doivent être **minimaux**,
- aucune application ne devrait utiliser un compte admin sur la prod.

---

## **ISQL4 — Masquer les erreurs SQL**

Une bonne API :

- masque les messages techniques,
- logue l’erreur côté serveur,
- renvoie un message simple comme _"Erreur interne"_.

Exposer une erreur SQL revient à dévoiler :

- le type de base,
- la structure des tables,
- les noms de colonnes,
- et parfois des chemins internes.

Un cadeau pour un pirate.

---
