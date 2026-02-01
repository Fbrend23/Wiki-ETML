# Idempotence

## Définition

L’idempotence est une propriété d’une opération garantissant que son exécution **une ou plusieurs fois** produit **exactement le même état final**.

Dans les systèmes distribués et les microservices, cette propriété est essentielle pour éviter :

- les doublons
- les effets cumulés non désirés
- les incohérences en cas de retransmission

---

## Pourquoi l’idempotence est essentielle

Dans un système réel :

- les messages peuvent être perdus
- les requêtes peuvent être rejouées
- les clients peuvent réessayer automatiquement

Sans idempotence, une simple erreur réseau peut provoquer :

- plusieurs créations identiques
- une corruption de l’état applicatif

---

## Idempotence et MQTT

MQTT repose sur un modèle **publish / subscribe**.  
Selon le niveau de QoS, un message peut être livré **plusieurs fois**.

### QoS concernés

- QoS 0 : livré au plus une fois (pas garanti)
- QoS 1 : livré au moins une fois → **duplications possibles**
- QoS 2 : livré exactement une fois

Le **QoS 1** impose donc obligatoirement un **traitement idempotent côté consommateur**.

---

## Principe fondamental

Un consommateur MQTT doit être capable de :

- recevoir le même message plusieurs fois
- n’appliquer l’effet métier **qu’une seule fois**

# Idempotence et HTTP (PUT / POST)

## Rappel des méthodes HTTP

Selon la norme HTTP (RFC 9110), les méthodes n’ont pas toutes les mêmes garanties.

---

## POST — Non idempotent

### Caractéristiques

- Utilisé pour créer une ressource
- L’identifiant est généré par le serveur
- Chaque appel crée une nouvelle ressource

### Conséquence

Une même requête POST répétée :

- crée plusieurs ressources
- provoque des doublons si aucune protection n’est mise en place

---

## PUT — Idempotent

### Caractéristiques

- Crée ou remplace une ressource à une URL donnée
- L’identifiant est fourni par le client
- L’état final reste identique, même après plusieurs appels

### Conséquence

Répéter la même requête PUT :

- ne modifie pas l’état final
- ne crée pas de duplication

---

## Comparaison synthétique

| Aspect             | POST            | PUT                              |
| ------------------ | --------------- | -------------------------------- |
| Idempotence        | Non             | Oui                              |
| Génération de l’ID | Serveur         | Client                           |
| Effet si répété    | Duplication     | État identique                   |
| Usage              | Création simple | Création contrôlée / mise à jour |

---

## Rendre POST idempotent

Plusieurs stratégies existent :

- fournir un identifiant unique côté client
- stocker un identifiant de requête (`ClientRequestId`)
- refuser les doublons côté serveur

Cette logique rapproche POST d’un comportement idempotent, au prix de validations supplémentaires.

# Idempotence dans un système distribué (MQTT & Microservices)

## Stratégie générale

Pour garantir l’idempotence dans un système événementiel :

1. Chaque message possède un identifiant unique
2. Le consommateur conserve la trace des messages déjà traités
3. Un message déjà traité est ignoré

---

## Message idempotent avec identifiant

Exemple de message MQTT :

```json
{
  "MessageId": "abc123",
  "DateTime": "2024-11-15T12:00:00Z",
  "Clouds": 50,
  "SolarEnergy": 70,
  "WindSpeed": 10,
  "WindDirection": "N"
}
```

Le champ `MessageId` permet de détecter les doublons.

---

## Traitement côté consommateur

Principe :

- vérifier si le message a déjà été traité
- sinon, appliquer la logique métier
- mémoriser l’identifiant

Cette mémoire peut être :

- une base de données
- un cache
- une table dédiée

---

## Exemple : TownEnvironment

Objectifs :

- éviter toute duplication
- garantir un état cohérent même avec des messages répétés

Le système doit rester correct :

- avec QoS 1
- lors de retransmissions
- en cas de redémarrage partiel

---

## Cas Powercher

Choix d’architecture :

- séparation claire entre technique et métier
- enveloppe (`Envelope`) contenant l’identifiant
- UUID généré à chaque envoi

Avantages :

- traçabilité
- déduplication fiable
- extensibilité du protocole

---

# Conclusion

L’idempotence est un **pilier de la résilience** dans :

- les microservices
- les architectures événementielles
- les systèmes IoT

Un système fiable n’est pas celui qui ne tombe jamais,
mais celui qui **résiste aux répétitions, aux erreurs et aux retries**.

---
