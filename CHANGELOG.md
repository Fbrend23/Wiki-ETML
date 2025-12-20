# Changelog

## v1.3.0 - 2025-12-20

### Fonctionnalités Majeures (Quiz)

- **Interface Interactive** :
  - **Randomisation** : Les questions et les réponses sont mélangées à chaque essai pour éviter la mémorisation par position.

### Expérience Utilisateur

- **Signalement d'Erreurs** :
  - **Quiz** : Un bouton "Signaler une erreur" dans chaque question permet d'ouvrir une issue GitHub pré-remplie avec l'ID de la question.
  - **Wiki** : Un bouton "Signaler un problème sur cette page" est disponible au bas de chaque fiche de cours.
- **Audio Conditionnel** : Le widget audio ne s'affiche désormais que si le fichier audio correspondant existe réellement.

### DevOps & Automatisation

- **Workflow Unifié** : Le déploiement et la génération des quiz sont désormais entièrement automatisés via GitHub Actions lors de chaque modification du dossier `public/markdown` sur la branche principale (`main`).

## v1.2.0 - 2025-12-18

### Améliorations

- **Recherche** : Les extraits de recherche sont maintenant en "texte brut". Les liens Markdown et balises spéciales ne polluent plus l'affichage des résultats.
- **Table des Matières (TOC)** : Ajout d'un sommaire flottant sur la droite (version Desktop) qui liste dynamiquement les sections du cours.
- **Scroll Spy** : Le sommaire met en surbrillance automatiquement la section en cours de lecture et se déroule pour suivre votre progression.
- **Export PDF** : Ajout d'un bouton pour imprimer ou enregistrer le cours.
- **Fil d'Ariane (Breadcrumbs)** : Améliorer la visibilité de la navigation (`Accueil > Catégorie > Page`).
- **Quiz Interactifs** : Testez vos connaissances à la fin des cours avec des QCM interactifs
  - Feedback immédiat sur les réponses
  - Score final
  - Support des questions multi-choix

### Todo

- **Persistance des Scores** : Sauvegarder les résultats.

## v1.1.2 - 2025-12-18

### Améliorations

- **Recherche Avancée** : La barre de recherche prend désormais en charge plusieurs mots-clés. Par exemple, une recherche "vue router" affichera uniquement les fichiers contenant à la fois "vue" et "router", avec une mise en évidence simultanée de tous les termes.

### DevOps

- **Déploiement Continu** : Mise à jour du workflow de déploiement pour se déclencher automatiquement lors de la publication d'une "Release" GitHub ou lors de toute modification de fichier Markdown dans le dossier `public/markdown`.

## v1.1.1 - 2025-12-18

### Corrections

- **Génération Audio** : Correction de l'erreur `string_too_long` pour les fichiers volumineux. Le script découpe désormais automatiquement le texte en segments pour contourner la limite de 4096 caractères de l'API OpenAI, sans interrompre la fluidité de la lecture.

## v1.1.0 - 2025-12-18

### Ajouts

- **Recherche Globale** : Implémentation d'une fonctionnalité de recherche complète accessible depuis le nouvel en-tête de navigation.
- **Extraits de Recherche** : Les résultats de recherche fournissent désormais un contexte en affichant un extrait du contenu avec les termes correspondants mis en évidence.
- **Recherche Mobile** : Intégration de la barre de recherche dans le menu latéral mobile pour une expérience cohérente sur les petits écrans.
- **Retour en Haut** : Ajout d'un bouton flottant qui apparaît lors du défilement pour revenir rapidement en haut de la page.
- **Défilement Automatique** : La navigation entre les chapitres réinitialise désormais automatiquement la position de défilement en haut du contenu.

### Modifications

- **Logique de Navigation** : Les liens internes utilisent désormais un comportement de type routeur Vue.js (navigation SPA) pour éviter les rechargements complets de page, améliorant ainsi la vitesse et l'expérience utilisateur.
- **UI/UX** :
  - Amélioration du style visuel des mises en évidence de recherche (texte bleu gras sur fond bleu clair).
  - Amélioration du menu mobile pour se fermer automatiquement après la sélection d'un lien.
- **Indexation du Contenu** : Mise à jour de `generate-index.js` pour indexer le contenu complet des fichiers markdown, permettant des capacités de recherche approfondie.

# Wiki-ETML v1.0

Lancement de la première version stable de ce projet personnel. L'objectif de **Wiki-ETML** est de proposer un outil de révision moderne et efficace, combinant des fiches de cours claires en Markdown et leur version audio générée par IA.

> **Note :** Ce projet est une initiative indépendante et n'est pas affilié officiellement à l'école.

## Nouveautés et Fonctionnalités

### Mode Podcast (Audio IA)

- **Conversion Audio** : Un script dédié convertit automatiquement chaque fiche Markdown en un fichier MP3 de haute qualité.
- **Voix Naturelle** : Utilisation du modèle IA `4o` d'OpenAI avec un ton "professeur" pour une écoute fluide.
- **Intégration** : Un lecteur audio natif est intégré en haut de chaque page de cours.

### Accès et Navigation

- **Menu Dynamique** : L'arborescence du site est générée automatiquement en fonction des fichiers présents dans le dépôt.
- **Tri Intelligent** : Les fichiers sont triés par ordre numérique (1, 2, 10...) mais affichés avec des titres nettoyés.

### Confort & Performance

- **Mode Sombre** : Interface adaptée pour la lecture nocturne.
- **Architecture Statique** : Site généré sans base de données pour une rapidité de chargement maximale.

---

## Architecture Technique

Ce projet repose sur une stack moderne et automatisée :

- **Frontend** : Vue 3, TypeScript et Bootstrap.
- **Automatisation (Node.js)** : Scripts personnalisés pour la génération de l'index et des fichiers audio.
- **CI/CD** : Utilisation de **GitHub Actions** pour la compilation et le déploiement automatique sur Infomaniak.

---

### Utilisation et Contribution

Le site est désormais accessible en ligne. Le contenu est évolutif : les signalements d'erreurs ou propositions d'améliorations sont les bienvenus via les "Issues" ou "Pull Requests" du dépôt.

---
