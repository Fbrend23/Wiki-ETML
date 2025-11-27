# 📘 Feuille de révision – Module 324 : DevOps / CI/CD / Git

## 1. Lean Software Development

_(Source : DevOps Introduction)_

### ✔️ Les 7 principes

1. Éliminer le gaspillage
2. Renforcer l’apprentissage
3. Décider le plus tard possible
4. Livraison rapide
5. Donner la responsabilité à l’équipe
6. Développer l’intégrité
7. Optimiser le tout

### Avantages

- Plus de fonctionnalités en moins de temps
- Réduction des activités inutiles → baisse des coûts
- Équipe plus autonome

---

## 2. DevOps : principes essentiels

_(Source : DevOps Introduction)_

### Définition

Culture + pratiques + outils pour rapprocher :

- **Dev** (besoin de changement)
- **Ops** (besoin de stabilité)

### Problème : le "wall of confusion"

Objectifs opposés entre Dev et Ops → manque de communication et d’outils intégrés.

### Comment DevOps résout ce problème ?

- Culture collaborative
- Automatisation
- CI
- CD
- Feedback continu

---

## 3. CI/CD : les 8 étapes DevOps

_(Source : S-324 DevOps – 8 étapes)_

1. **Plan** – User stories, objectifs, critères d’acceptation
2. **Code** – Développement, branches Git
3. **Build** – Compilation, création des artefacts
4. **Test** – Unitaires, intégration, performance
5. **Release** – Préparation et documentation de la version
6. **Deploy** – Déploiement (bleu/vert, canary, staging…)
7. **Operate** – Surveillance, gestion incidents
8. **Monitor** – Logs, métriques, amélioration continue

---

## 4. CI vs CD

_(Source : DevOps 8 étapes)_

### Continuous Integration (CI)

À chaque push :

- Build
- Tests automatisés
- Analyse du code
  → Garantit que les changements n’introduisent pas de régressions.

### Continuous Delivery & Continuous Deployment (CD)

- **Delivery** : automatisé jusqu’au _staging_, déploiement en prod manuel.
- **Deployment** : déploiement _automatique_ en production.

---

## 5. Construire un plan CI/CD

_(Source : Plan CI/CD)_

### Étapes clés

- Définir les objectifs (sécurité, rollback, fréquence, performance)
- Étudier l’architecture (frameworks, dépendances, type d’application)
- Automatiser les tests (unitaires, intégration, e2e)
- Identifier les environnements (dev / test / staging / prod)
- Intégrer la sécurité (scans, audit dépendances, lint)
- Documenter le pipeline complet

---

## 6. Git – principes fondamentaux

_(Source : DevOps Introduction + Git conventions)_

### Workflow Git de base

```
Working directory → Staging → Repository local → Repository distant
```

Commandes clés :

```
git add
git commit
git push
git pull
git reset
```

---

## 7. Branches Git : conventions

### Branches régulières

- **main** : production
- **develop** : intégration
- **test** : QA

### Branches temporaires

- `feature/...` – nouvelles fonctionnalités
- `bugfix/...` – correction de bugs
- `hotfix/...` – correctif urgent en production
- `release/...` – préparation d’une version
- `docs/...` – documentation

### Règles de nommage

- minuscules, pas d’espace
- éviter `.`, ne pas terminer par `/`
- ne pas utiliser les noms réservés (HEAD, etc.)

---

## 8. Versioning SemVer

_(Source : Git Conventions)_

Format : **MAJEUR.MINOR.PATCH**

- **MAJEUR** : rupture de compatibilité
- **MINEUR** : nouvelle fonctionnalité rétrocompatible
- **PATCH** : correction de bug

Exemples :

```
v1.0.0
v2.1.7
```

---

## 9. Git Stash : indispensable

_(Source : Git Stash)_

### À quoi sert `git stash` ?

Mettre de côté du travail sans commit :

- changement de branche
- pull
- test rapide

### Commandes

```
git stash           # ranger le travail
git stash list      # lister
git stash apply     # restaurer sans supprimer
git stash pop       # restaurer + supprimer
git stash drop      # supprimer un stash
git stash clear     # tout supprimer
git stash push -m "message"
git stash -u        # inclure les non-trackés
git stash -a        # inclure absolument tout
```

---

## 10. Ce qui doit aller dans Git / ce qui ne doit pas

### ✔️ À mettre dans Git

- Code source
- Fichiers de config modèle (`.env.example`)
- Images et ressources statiques

### ❌ À ne pas mettre

- Secrets / `.env`
- Dépendances (`node_modules`, etc.)
- Artéfacts de build

---

## 📝 Résumé Express

- Lean : efficacité, livraison rapide, amélioration continue
- DevOps = collaboration + automatisation
- CI = tests + build à chaque push
- CD = déploiement automatique prod/staging
- 8 étapes : Plan → Code → Build → Test → Release → Deploy → Operate → Monitor
- Git : branches `feature/`, `hotfix/`, `release/`
- SemVer : X.Y.Z
- Stash = ranger travail non committé

---
