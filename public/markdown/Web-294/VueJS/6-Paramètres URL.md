<!-- 'NoAudio' -->

# Paramètres d’URL : Query, Params et Props

Source: C-294-ALL01-Touring Vue Router (ETML ICT 294).

## 1. Paramètres de requête (query)

Exemple :

```
/events?page=4
```

Dans un template :

```vue
{{ $route.query.page }}
```

Dans le script :

```js
const page = computed(() => $route.query.page)
```

## 2. Paramètres dynamiques (params)

Exemple :

```
/events/4
```

Définition dans le routeur :

```js
{ path: "/events/:page", component: EventList }
```

Accès dans le composant :

```vue
{{ $route.params.page }}
```

## 3. Passer les paramètres comme props

Recommandé pour rendre les composants indépendants du routeur.

```js
{
  path: "/events/:page",
  component: EventList,
  props: true
}
```

Dans le composant :

```js
const props = defineProps(['page'])
```

## 4. Props en objet

```js
props: {
  showExtra: true
}
```

## 5. Props en fonction

```js
props: (route) => ({
  showExtra: route.query.e === 'true',
})
```

## 6. Points clés

- query = `$route.query`
- params = `$route.params`
- props = découplage recommandé
- props fonction = transformation possible
