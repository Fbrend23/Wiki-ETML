<!-- 'NoAudio' -->

# Routes imbriquées (Nested Routes)

Source: C-294-ALL01-Touring Vue Router (ETML ICT 294).

> Pas d'audio

## 1. Structure de fichiers recommandée

```
views/event/
  Layout.vue
  Details.vue
  Register.vue
  Edit.vue
```

## 2. Routage initial (moins optimal)

```js
{
  path: "/event/:id",
  name: "EventDetails",
  component: EventDetails,
  props: true
}
```

Problèmes :

- Duplication de code
- Requêtes API répétées

## 3. Layout centralisé

```vue
<router-view :event="event" />
```

## 4. Routes imbriquées

```js
{
  path: "/event/:id",
  component: EventLayout,
  props: true,
  children: [
    { path: "", name: "EventDetails", component: EventDetails, props: true },
    { path: "register", name: "EventRegister", component: EventRegister, props: true },
    { path: "edit", name: "EventEdit", component: EventEdit, props: true }
  ]
}
```

## 5. Avantages

- Une seule requête API
- Navigation cohérente
- Code simplifié

## 6. Composants enfants

Exemple Details.vue :

```vue
<p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
<p>{{ event.description }}</p>
```

## 7. Optimisation

Vue Router réutilise automatiquement les params si non fournis dans router-link.
