# Wiki ETML

Une plateforme de révision interactive pour l'ETML. Ce projet transforme automatiquement des fichiers Markdown en un site web structuré, avec un menu dynamique et des versions audio générées par IA pour chaque cours.

![Vue.js](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

## Fonctionnalités Clés

- **Audio "Podcast"** : Chaque fiche est lue par une voix IA naturelle (OpenAI `4o`), générée automatiquement lors du build.
- **Menu Dynamique** : L'arborescence du site est générée automatiquement à partir des dossiers et fichiers Markdown.
- **Site Statique & Rapide** : Pas de base de données. Tout est pré-généré (HTML/MP3) pour une performance maximale.
- **Mode Sombre** : Support natif du thème clair/sombre.
- **Déploiement Automatisé** : Mise en ligne sur Infomaniak via GitHub Actions.

## Installation Locale

Pour développer ou tester le projet sur votre machine :

1.  **Cloner le projet**

    ```bash
    git clone https://github.com/Fbrend23/Wiki-ETML.git
    cd Wiki-ETML
    ```

2.  **Installer les dépendances**

    ```bash
    npm install
    ```

3.  **Configurer l'IA (Optionnel)**
    Pour générer les audios localement, créez un fichier `.env` à la racine :

    ```env
    OPENAI_API_KEY=sk-proj-VotreCleIci...
    ```

4.  **Lancer le site**
    ```bash
    npm run dev
    ```
    _Cette commande génère l'index du menu avant de lancer le serveur Vite._

## Comment ajouter un cours ?

Le système est conçu pour être **sans code**. Vous n'avez qu'à gérer des fichiers.

1.  **Créer un dossier** dans `public/markdown/` (ex: `Java-320`). Ce sera le nom de la catégorie dans le menu.
2.  **Ajouter un fichier Markdown** (`.md`) dans ce dossier.
    - **Nommage :** Utilisez un préfixe numérique pour l'ordre, suivi d'un tiret.
    - _Exemple :_ `1-introduction.md`, `2-variables.md`.
    - _Rendu :_ Le site affichera "Introduction" et "Variables" (sans les numéros) dans l'ordre correct.
3.  **Mettre à jour**
    - En local : Relancez `npm run dev`.
    - En ligne : Faites un `git push`, l'audio et le menu seront mis à jour automatiquement.

## Scripts d'Automatisation

Le projet repose sur deux scripts Node.js situés à la racine :

- **`generate-index.js`** (`npm run gen:content`) :
  Scanne le dossier `public/markdown`, trie les fichiers, nettoie les noms (retire "1-") et génère `public/content.json`. Ce fichier est lu par le site pour construire le menu.

- **`generate-audio.js`** (`npm run gen:audio`) :
  Compare les fichiers Markdown avec les MP3 existants. Si un fichier a changé ou est nouveau, il appelle l'API OpenAI et crée le MP3 dans `public/audio`.

## Déploiement (CI/CD)

Le déploiement est géré par **GitHub Actions** via le fichier `.github/workflows/deploy.yaml`.

**Processus déclenché manuellement ("Run workflow") :**

1.  Installation de l'environnement.
2.  **Génération Audio** : Création des MP3 manquants via OpenAI.
3.  **Génération Index** : Création du menu `content.json`.
4.  **Build Vite** : Compilation du site dans `dist/`.
5.  **FTP Infomaniak** : Envoi du dossier `dist/` sur le serveur.

### Secrets Requis (GitHub Settings)

| Secret           | Description                                    |
| :--------------- | :--------------------------------------------- |
| `OPENAI_API_KEY` | Clé pour la génération audio.                  |
| `FTP_SERVER`     | Adresse du serveur (ex: `ftp.infomaniak.com`). |
| `FTP_USERNAME`   | Utilisateur FTP.                               |
| `FTP_PASSWORD`   | Mot de passe FTP.                              |

## Structure des fichiers

```text
.
├── .github/workflows/   # Workflows GitHub (Deploy & Audio)
├── public/
│   ├── audio/           # MP3 générés (ne pas modifier manuellement)
│   ├── markdown/        # VOS COURS SONT ICI
│   │   ├── DevOps-324/  # Catégorie
│   │   │   ├── 1-lean.md
│   │   │   └── ...
│   │   └── ...
│   └── content.json     # Index généré automatiquement
├── src/
│   ├── components/      # Composants Vue (Lecteur, etc.)
│   └── App.vue          # Logique principale
├── generate-audio.js    # Script IA
├── generate-index.js    # Script Menu
└── package.json
```

---
