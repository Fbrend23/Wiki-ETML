<!-- 'NoAudio' -->

# Vue Router - Synthèse

Résumé des notions clés du cours Touring Vue Router.

> Pas d'audio

## Query et Params

- query : `$route.query`
- params : `$route.params`

## Props dans les routes

- props: true
- props: { ... }
- props: route => ({ ... })

## Pagination

- Paramètres JSON Server : \_limit, \_page
- watchEffect pour la mise à jour
- Header x-total-count pour calculer les pages

## Routes imbriquées

- Layout avec `<router-view>`
- Routes enfants dans children
- Reduce duplication des requêtes API

## Redirections

- redirect pour modification d’URL
- alias pour double accès valide
- wildcard pour redirection globale

## Structure recommandée

```
router/
  index.js
views/
  event/
    Layout.vue
    Details.vue
    Register.vue
    Edit.vue
```
