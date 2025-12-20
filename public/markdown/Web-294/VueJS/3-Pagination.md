<!-- 'NoAudio' -->

# Pagination avec Vue Router

Source: C-294-ALL01-Touring Vue Router (ETML ICT 294).

## 1. Modification du service API

```js
getEvents(perPage, page) {
  return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
}
```

## 2. Lecture de la page via le routeur

```js
props: (route) => ({
  page: parseInt(route.query.page) || 1,
})
```

## 3. Chargement réactif dans EventList.vue

```js
watchEffect(async () => {
  events.value = null
  const response = await EventService.getEvents(perPage, props.page)
  events.value = response.data
  totalEvents.value = parseInt(response.headers['x-total-count'])
})
```

## 4. Liens de pagination

```vue
<router-link
  v-if="page > 1"
  :to="{ name: 'EventList', query: { page: page - 1 } }"
>Previous</router-link>

<router-link
  v-if="isNextPage"
  :to="{ name: 'EventList', query: { page: page + 1 } }"
>Next</router-link>
```

## 5. Détection de la dernière page

```js
const isNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPage)
  return props.page < totalPages
})
```

## 6. Style minimal

```css
.pagination {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}
```

## 7. Points importants

- watchEffect déclenche un rechargement lorsque la page change
- x-total-count détermine le nombre de pages
- Utiliser des routes nommées pour éviter les erreurs
