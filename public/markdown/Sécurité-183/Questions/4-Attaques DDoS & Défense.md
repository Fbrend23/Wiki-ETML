<!-- INSTRUCTION_AUDIO:
Lis chaque question puis immédiatement sa réponse.
Adopte un ton formel, professionnel et motivant.
Ne lis pas ce bloc.
-->

# **4. DDoS**

_(Source : I183-TS2-ListeDesQuestions.pdf)_

<a id="ddos1"></a>

## **DDOS1 — Définition**

Une attaque DDoS consiste à submerger un serveur par des milliers ou millions de requêtes simultanées.
Objectif : rendre le service indisponible.

---

<a id="ddos2"></a>

## **DDOS2 — Un TTL faible pour limiter l’impact**

Le **TTL (Time To Live)** DNS détermine la durée de cache d'une IP. Un TTL faible (ex: 60s) permet :

- de **changer rapidement l'adresse IP** du serveur si l'actuelle est attaquée (Null routing),
- de rediriger le trafic vers un système de mitigation (Scrubbing center) sans attendre des heures,
- de faciliter le **DNS Round Robin** pour répartir la charge sur plusieurs serveurs.

Ce n’est pas une protection complète, mais un outil parmi d’autres.

---

<a id="ddos3"></a>

## **DDOS3 — Méthodes de mitigation**

- **CDN** : absorption du trafic.
- **Rate limiting** : limite les requêtes abusives.
- **Load balancing** : répartit la charge.
- **Firewall applicatif** : bloque les patterns suspects.
- **Scrubbing centers** : filtrage massif géré par les hébergeurs.

### Une bonne architecture combine plusieurs solutions.
