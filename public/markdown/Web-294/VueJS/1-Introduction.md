<!-- 'NoAudio' -->

# Touring Vue Router - Introduction

Source: C-294-ALL01-Touring Vue Router (ETML ICT 294).

## Objectif du module

Ce cours présente les fondamentaux de Vue Router et montre comment structurer une application à page unique (SPA) avec Vue.js.  
Les notions abordées incluent :

- Gestion des URL
- Navigation entre composants
- Paramètres de requête et paramètres dynamiques
- Pagination
- Routes imbriquées
- Redirections et alias

## Rôle de Vue Router

Vue Router permet de définir comment une application Vue réagit aux changements d’URL.  
La majorité de la configuration se trouve dans :

```
src/router/index.js
```

Ce fichier définit :

- Les chemins d’URL (path)
- Le composant associé (component)
- Le nom de la route (name)
- Les paramètres dynamiques (:id)
- La transmission de données via props
- Les routes enfants (children)

## Application utilisée

Le cours développe une application d’événements comprenant :

- Liste d'événements
- Pagination
- Page de détails
- Page d'inscription
- Page d'édition
- Layout partagé
- Gestion de redirections

Cette application sert d'exemple pour toute la suite du module.
