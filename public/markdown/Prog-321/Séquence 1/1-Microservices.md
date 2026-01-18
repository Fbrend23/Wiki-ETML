# Fiche de Révision : Architecture Microservices

## 1. Définition et Philosophie

L'architecture microservices consiste à décomposer une application monolithique en une série de **services petits, autonomes et spécialisés**.

- **Indépendance** : Chaque service peut être codé, testé et déployé sans impacter les autres.
- **Responsabilité unique** : Un service = une fonction métier (ex: gestion des stocks).
- **Autonomie technologique** : Possibilité d'utiliser des langages différents selon les besoins (Polyglot programming)
- **Métaphore** : Passer d'un paquebot géant (monolithe) à une flottille de petits bateaux agiles (microservices).

## <img src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQ5pzU_eYCcpMzxOl4BUzi0cJHLk3KzMLbvKG9w5g5KLIlh45mZ3DLJwjkaePesF7yCtKL-LqAb-yZLLgazJ0ldQiOWe2ng4jfp7WBqqEILXPqyWdw" width="50%" text-align="center">

## 2. Communication Réseau (Le transport)

Les services doivent échanger des données. Le choix du protocole dépend du besoin de fiabilité vs vitesse.

### A. Protocoles de bas niveau

- **UDP (User Datagram Protocol)** :
- _Vitesse_ : Très rapide (pas de vérification).
- _Usage_ : Streaming vidéo, jeux en ligne (on accepte de perdre une image).

- **TCP (Transmission Control Protocol)** :
- _Fiabilité_ : Garantit que les paquets arrivent et dans le bon ordre.
- _Usage_ : Transactions bancaires, transferts de fichiers.

### B. Protocole Applicatif : HTTP & JSON

C'est le mode de communication **synchrone** le plus courant. Un service appelle l'autre et attend.

**Exemple de requête entre un service "Utilisateurs" et un service "Commandes" :**

```http
// Requête envoyée (POST)
POST /api/orders/checkout HTTP/1.1
Content-Type: application/json

{
  "userId": 12345,
  "productId": 67890,
  "quantity": 2
}

// Réponse reçue
HTTP/1.1 200 OK
{
  "success": true,
  "message": "Commande validée"
}

```

---

## 3. Le Bus de Messages (Communication Asynchrone)

Pour éviter qu'un service ne soit bloqué en attendant une réponse, on utilise un **Bus de messages** (RabbitMQ, Kafka).

### Fonctionnement :

1. **Publication** : Le service source envoie un message sur le bus.
2. **Abonnement** : Les services intéressés "écoutent" le bus et traitent le message quand ils sont prêts.

**Exemple de message JSON publié lors de la création d'un compte :**

```json
{
  "event": "user_created",
  "data": {
    "userId": 12345,
    "email": "john.doe@example.com",
    "firstName": "John"
  }
}
```

> **Avantages :** Si le service de notification tombe en panne, le message reste dans le bus et sera traité dès qu'il redémarre (**Résilience**).

---

## 4. Avantages vs Inconvénients (Analyse détaillée)

### ✅ Les Forces

- **Scalabilité** : Si le service "Paiement" est très sollicité, on peut le dupliquer lui seul sans toucher au reste.
- **Résilience** : La panne du module "Recommandations" n'empêche pas l'utilisateur de "Payer".
- **Évolutivité** : Déploiement de nouvelles fonctionnalités beaucoup plus rapide.
- **Flexibilité** : Possibilité d'utiliser Python pour l'IA et C# pour le moteur de calcul sur le même projet.

### ❌ Les Défis

- **Complexité** : Gérer 50 services est plus dur qu'un seul (déploiement, surveillance).
- **Latence** : Les appels réseau entre services sont plus lents qu'un appel de fonction interne.
- **Sécurité** : Multiplications des points d'entrée vulnérables.
- **Gestion des données** : Les données sont réparties. Assurer que le service "Commande" et "Stock" disent la même chose nécessite des mécanismes complexes de synchronisation.

---

## 💡 Résumé pour l'examen

- **Microservice** = Unité logicielle indépendante.
- **Synchrone (HTTP)** = Dépendance forte (si le receveur est mort, l'appel échoue).
- **Asynchrone (Bus)** = Découplage total et meilleure tolérance aux pannes.
- **Trade-off** : On gagne en **agilité** et en **passage à l'échelle** (scalabilité), mais on perd en **simplicité** et en **performance pure** (latence).

---

**Note sur la synchronisation :** Ce chapitre est lié au suivant (NTP). Pour que les microservices coordonnent leurs actions (notamment via les bus de messages), ils doivent avoir des horloges synchronisées pour que l'ordre des événements reste cohérent.
