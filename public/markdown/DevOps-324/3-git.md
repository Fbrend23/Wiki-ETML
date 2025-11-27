## Git – principes fondamentaux

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

## Branches Git : conventions

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

## Versioning SemVer

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

## Git Stash : indispensable

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

## Ce qui doit aller dans Git / ce qui ne doit pas

### ✔️ À mettre dans Git

- Code source
- Fichiers de config modèle (`.env.example`)
- Images et ressources statiques

### ❌ À ne pas mettre

- Secrets / `.env`
- Dépendances (`node_modules`, etc.)
- Artéfacts de build

---
