## DevOps : principes essentiels

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

## CI/CD : les 8 étapes DevOps

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

## CI vs CD

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

## Construire un plan CI/CD

_(Source : Plan CI/CD)_

### Étapes clés

- Définir les objectifs (sécurité, rollback, fréquence, performance)
- Étudier l’architecture (frameworks, dépendances, type d’application)
- Automatiser les tests (unitaires, intégration, e2e)
- Identifier les environnements (dev / test / staging / prod)
- Intégrer la sécurité (scans, audit dépendances, lint)
- Documenter le pipeline complet

---
