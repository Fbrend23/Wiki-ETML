<!-- INSTRUCTION_AUDIO:
Lis chaque question puis immédiatement sa réponse.
Adopte un ton formel, professionnel et motivant.
Ne lis pas ce bloc.
-->

# **8. JWT**

_(Source : I183-TS2-ListeDesQuestions.pdf)_

## **JWT1 — Structure**

`header.payload.signature`

- **header** : algorithme + type,
- **payload** : données (claims),
- **signature** : garantit l’intégrité.

---

## **JWT2 — Utilité**
Le JWT (prononcé "Jot", pour JSON Web Token) est un standard ouvert utilisé pour échanger des informations de manière sécurisée entre deux parties.
- Permet une authentification **stateless**,
- évite l'utilisation de sessions serveur,
- facilite les architectures distribuées.

Mais attention :
Un JWT volé est valide jusqu’à expiration → **ne jamais le stocker dans localStorage**.


### Le problème des sessions classiques (Le "Stateful")
Avant les JWT, la méthode standard fonctionnait ainsi :
- L'utilisateur se connecte.
- Le serveur crée une session et la stocke dans sa mémoire (RAM) ou sa base de données.
- Le serveur donne un ID de session (cookie) à l'utilisateur.
- À chaque requête de l'utilisateur, le serveur doit chercher cet ID dans sa mémoire pour savoir qui est l'utilisateur.
- Le problème : Si vous avez 1 million d'utilisateurs ou si vous utilisez plusieurs serveurs (cluster/microservices), synchroniser cette mémoire devient très lourd et complexe.

### La solution JWT (Le "Stateless")
Avec le JWT, on cherche à rendre le client (le navigateur) autonome.

- L'utilisateur se connecte.
- Le serveur ne stocke rien en mémoire. Il crée un jeton (JWT) contenant les infos de l'utilisateur (ID, rôle, expiration) et le signe électroniquement.
- Il donne ce jeton à l'utilisateur.
- À chaque requête, l'utilisateur présente son badge (le JWT).
- Le serveur vérifie juste la signature du badge. Si la signature est valide, il sait qui est l'utilisateur sans avoir besoin de consulter une base de données.

L'analogie du Festival
- Session classique : Vous donnez votre nom à l'entrée. Le vigile doit regarder sur une liste papier immense à chaque fois que vous voulez entrer dans une zone VIP.
- JWT : On vous donne un bracelet inaltérable à l'entrée. Le vigile regarde juste votre poignet. Si vous avez le bracelet, vous passez. Il n'a pas besoin de liste.
- 
#### Le piège de sécurité
Le stockage du JWT est un sujet critique :
- Si vous stockez le JWT dans le LocalStorage du navigateur : Il est accessible via JavaScript. Une faille XSS permettrait à un attaquant de voler le jeton et de se faire passer pour vous.
- Si vous le stockez dans un Cookie HttpOnly : Le JavaScript ne peut pas le lire (protège du vol via XSS), mais vous devenez vulnérable aux failles CSRF (Cross-Site Request Forgery).
---
