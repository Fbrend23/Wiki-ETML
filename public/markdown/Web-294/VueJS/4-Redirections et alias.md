<!-- 'NoAudio' -->

# Redirections et Alias

Source: C-294-ALL01-Touring Vue Router (ETML ICT 294).

> Pas d'audio

## 1. Redirections simples

```js
{
  path: "/about-us",
  name: "About",
  component: About
},
{
  path: "/about",
  redirect: { name: "About" }
}
```

## 2. Alias

```js
{
  path: "/about-us",
  component: About,
  alias: "/about"
}
```

## 3. Redirection dynamique

```js
{
  path: "/event/:id",
  redirect: "/events/:id"
}
```

## 4. Wildcard

```js
{
  path: "/event/:after(.*)",
  redirect: "/events/:after"
}
```

## 5. Recommandations

- Préférer redirect si l’ancienne URL doit disparaître
- Préférer alias si plusieurs URL doivent rester valides
