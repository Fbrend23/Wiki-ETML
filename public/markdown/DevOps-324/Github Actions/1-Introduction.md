# Module 324 – GitHub Actions Introduction

Source : S-324-03-GithubActions-Introduction.pdf

## Qu’est-ce que GitHub Actions

GitHub Actions est une plateforme CI/CD permettant d'automatiser des tâches telles que tests, déploiements, formatage du code et analyses.
Elle fonctionne via des workflows déclenchés par des événements ou une planification.

## Composants

- Workflow : fichier YAML décrivant l'automatisation.
- Event : déclencheur du workflow.
- Jobs : unités de travail regroupant des étapes.
- Steps : opérations exécutées séquentiellement.
- Actions : blocs réutilisables.
- Runner : machine d'exécution.

## Exemple minimal

```yaml
name: Exemple workflow
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
```

## Événements

Un workflow peut être déclenché par :

- push
- pull_request
- workflow_dispatch
- schedule

## Jobs

Les jobs s'exécutent par défaut en parallèle. Ils doivent définir un runner.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

## Runners

Deux types :

- runners GitHub hébergés
- runners self-hosted

## Steps

Deux types :

- steps "run" (shell)
- steps "uses" (actions)

## Actions

Exemple d’action officielle :

```yaml
- uses: actions/setup-node@v3
  with:
    node-version: 18
```

Exemple d’action locale :

```yaml
- uses: ./.github/actions/ma-super-action
```

## Runs

Exécution d'une commande shell :

```yaml
- run: npm ci
- run: npm test
```

## Synthèse

- Workflow → Event → Jobs → Steps → Actions → Runner.
- Les steps exécutent l’automatisation.
- Les jobs peuvent être parallèles ou séquentiels.
