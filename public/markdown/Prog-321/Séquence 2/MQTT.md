# MQTT — Fiche de révision

## Définition

MQTT (Message Queuing Telemetry Transport) est un protocole de communication léger conçu pour les systèmes à ressources limitées, notamment dans l’Internet des objets (IoT).

Il repose sur une architecture **publish–subscribe** et fonctionne au-dessus de **TCP/IP**.

---

## Architecture publish–subscribe

- Les clients ne communiquent jamais directement entre eux
- Tous les échanges passent par un **broker**
- Les clients :
  - publient des messages
  - s’abonnent à des topics

Le broker distribue les messages aux clients abonnés.

---

## Broker

Le broker est le serveur central MQTT.

Rôles principaux :

- gérer les connexions clients
- recevoir les messages publiés
- distribuer les messages aux abonnés
- gérer la QoS, le LWT et les sessions persistantes

---

## Topics

Les topics sont des chaînes hiérarchiques séparées par `/`.

Exemple :

```
maison/salon/temperature
```

Signification :

- maison : bâtiment
- salon : pièce
- temperature : type de donnée

Les topics permettent d’organiser et filtrer les messages.

---

## Wildcards

MQTT permet de s’abonner à plusieurs topics via des caractères génériques.

### `+` (un niveau)

```
maison/+/temperature
```

Reçoit toutes les températures des pièces.

### `#` (plusieurs niveaux)

```
maison/#
```

Reçoit tous les messages liés à la maison.

---

## Qualité de service (QoS)

MQTT propose trois niveaux de QoS :

### QoS 0 — au plus une fois

- aucune garantie
- messages possibles perdus
- très rapide

### QoS 1 — au moins une fois

- livraison garantie
- doublons possibles

### QoS 2 — exactement une fois

- livraison unique garantie
- plus coûteux en ressources

---

## Last Will and Testament (LWT)

Mécanisme permettant de signaler une déconnexion anormale.

- défini lors de la connexion
- stocké par le broker
- publié uniquement si le client disparaît brutalement

Utile pour détecter les appareils hors ligne.

---

## Keep-Alive

Intervalle défini par le client :

- envoi régulier de `PINGREQ`
- réponse `PINGRESP` du broker
- absence de ping = client considéré comme déconnecté

Peut déclencher le LWT.

---

## Session persistante

Permet de conserver l’état d’un client entre deux connexions :

- abonnements conservés
- messages non délivrés stockés
- récupération à la reconnexion

Idéal pour les appareils à connexion intermittente.

---

## Retained messages

Le dernier message publié sur un topic peut être conservé par le broker.

- envoyé automatiquement aux nouveaux abonnés
- permet d’avoir un état initial

---

## Bufferisation

Lors d’une perte de connexion :

- les messages sont stockés localement
- envoyés dans l’ordre à la reconnexion

Améliore la fiabilité globale.

---

## Option NoLocal (MQTT 5.0)

Empêche un client de recevoir ses propres messages.

- utile pour éviter les boucles
- surtout dans les scénarios de bridging

Exemple :

- publication sur `sensors/temperature`
- abonnement avec NoLocal activé
- le client ne reçoit pas ses propres messages

---

## Points clés à retenir

- MQTT est léger et adapté à l’IoT
- architecture publish–subscribe
- communication via broker
- topics hiérarchiques
- QoS pour la fiabilité
- LWT pour gérer les déconnexions
- sessions persistantes pour connexions instables
- NoLocal disponible en MQTT 5.0
