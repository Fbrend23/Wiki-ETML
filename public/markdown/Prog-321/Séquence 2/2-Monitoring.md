# Monitoring d’un système informatique complexe

## Définition du monitoring

Le monitoring désigne l’ensemble des mécanismes permettant de **surveiller en continu l’état, la performance et la disponibilité** d’un système informatique, en particulier dans un contexte distribué ou complexe.

Il fournit des données exploitables pour l’exploitation, la maintenance et l’amélioration continue des services.

---

## Importance du monitoring

Le monitoring est un pilier fondamental de l’exploitation d’un système informatique moderne.

Il permet de :

- Vérifier la **disponibilité** des services et détecter rapidement les pannes
- Maintenir les **performances** (latence, débit, saturation des ressources)
- **Anticiper les incidents** grâce à l’analyse des tendances
- Faciliter le **diagnostic** lors d’incidents par la corrélation des données
- Respecter les **engagements de service** vis-à-vis des utilisateurs

Sans monitoring fiable, l’exploitation devient réactive au mauvais sens du terme : les problèmes sont découverts par les utilisateurs avant d’être détectés techniquement.

---

## Indicateurs de niveau de service

### Service Level Indicator (SLI)

Un SLI est une **mesure chiffrée** représentant l’état ou la performance d’un élément du système.

Exemples :

- taux de disponibilité
- temps de réponse moyen
- taux d’erreur

### Service Level Objective (SLO)

Le SLO correspond à la **valeur cible** que l’on cherche à atteindre pour un SLI.

Exemple :

- 99,9 % de disponibilité mensuelle

### Service Level Agreement (SLA)

Le SLA est un **engagement contractuel** envers les utilisateurs.

Il définit :

- une valeur minimale garantie
- des pénalités en cas de non-respect

Relation :
SLI → mesure  
SLO → objectif  
SLA → engagement

---

## Monitoring actif (polling)

### Principe

Le monitoring actif repose sur une **interrogation périodique** des composants surveillés.  
Le système de monitoring envoie des requêtes à intervalles réguliers afin de vérifier l’état ou mesurer des indicateurs.

---

### Exemples

- Ping ICMP pour vérifier la disponibilité d’un hôte
- Requêtes HTTP pour tester une API
- Collecte CPU, mémoire ou disque via un agent
- Scripts de vérification d’état (health checks)

---

### Avantages

- Contrôle centralisé
- Mesures régulières et comparables dans le temps
- Détection rapide des pannes franches
- Facilité de mise en place

---

### Limites

- Charge supplémentaire sur les systèmes surveillés
- Granularité limitée par la fréquence de polling
- Difficulté à détecter des événements très brefs
- Problèmes de scalabilité à grande échelle

---

## Monitoring réactif (événementiel)

### Principe

Le monitoring réactif repose sur la **remontée d’événements ou de données à l’initiative du système surveillé**.  
Les composants envoient des informations lorsqu’un événement significatif se produit.

---

### Exemples

- Logs applicatifs envoyés en continu
- Événements système (crash, redémarrage, exception)
- Métriques poussées vers un collecteur
- Alertes générées par les applications

---

### Avantages

- Charge minimale sur le réseau et les systèmes
- Absence de données redondantes
- Meilleure détection des événements ponctuels
- Réactivité élevée

---

### Limites

- Détection des crashs plus complexe
- Consolidation de l’état global à un instant donné difficile
- Dépend fortement de la fiabilité de l’émission des événements

---

## Comparaison monitoring actif / réactif

| Critère               | Monitoring actif      | Monitoring réactif |
| --------------------- | --------------------- | ------------------ |
| Initiative            | Système de monitoring | Système surveillé  |
| Fréquence             | Régulière             | À l’événement      |
| Charge                | Plus élevée           | Faible             |
| Détection instantanée | Limitée               | Excellente         |
| Vision globale        | Facile                | Plus complexe      |

---

## Points clés à retenir

- Le monitoring est indispensable à l’exploitation fiable d’un système
- Il permet d’anticiper, diagnostiquer et prévenir les incidents
- Les SLI, SLO et SLA structurent les engagements de service
- Le monitoring actif est simple et prévisible
- Le monitoring réactif est plus fin mais plus complexe
- Les systèmes modernes combinent souvent les deux approches
