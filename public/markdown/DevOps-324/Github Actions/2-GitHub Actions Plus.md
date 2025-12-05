# Module 324 – GitHub Actions Plus

Source : S-324-04-GithubActions-Plus.pdf

## Variables

Types :

- Variables personnalisées
- Variables par défaut (GITHUB_REPOSITORY, GITHUB_RUN_ID, etc.)
- Variables système

### Définition

#### Niveau workflow

```yaml
env:
  VAR_GLOBAL: 'Valeur'
```

#### Niveau job

```yaml
jobs:
  build:
    env:
      VAR_JOB: 'Valeur job'
```

#### Niveau step

```yaml
steps:
  - env:
      VAR_STEP: 'Valeur step'
```

## Voir les variables présentes

```yaml
run: env
```

## Expressions

Écrites dans :

```
${{ ... }}
```

Exemple :

```yaml
if: ${{ env.MODE == 'production' }}
```

## Secrets

Caractéristiques :

- définis dans Settings > Secrets
- sensibles à la casse
- limite 48 Ko
- ne doivent pas commencer par GITHUB\_

Exemple d'utilisation :

```yaml
run: echo "Secret: ${{ secrets.MON_SECRET }}"
```

## Contextes

Types principaux :

- github
- env
- job
- steps
- runner
- secrets
- vars

Exemple :

```yaml
run: echo "URL du repo : ${{ github.repositoryUrl }}"
```

## Synthèse

- Les variables permettent de configurer un workflow.
- Les expressions ajoutent une logique conditionnelle.
- Les secrets permettent de gérer des données sensibles.
- Les contextes donnent accès aux informations d'exécution.
