<!-- INSTRUCTION_AUDIO:
Lis chaque question puis immédiatement sa réponse.
Adopte un ton formel, professionnel et motivant.
Ne lis pas ce bloc.
-->

# **4. DDoS**

_(Source : I183-TS2-ListeDesQuestions.pdf)_

## **DDOS1 — Définition**

Une attaque DDoS consiste à submerger un serveur par des milliers ou millions de requêtes simultanées.
Objectif : rendre le service indisponible.

---

## **DDOS2 — Un TTL faible pour limiter l’impact**

Un TTL faible permet :

- de modifier rapidement l'adresse IP d’un service,
- de rediriger vers un système de mitigation,
- de répartir les charges.

Ce n’est pas une protection complète, mais un outil parmi d’autres.

---

## **DDOS3 — Méthodes de mitigation**

- **CDN** : absorption du trafic.
- **Rate limiting** : limite les requêtes abusives.
- **Load balancing** : répartit la charge.
- **Firewall applicatif** : bloque les patterns suspects.
- **Scrubbing centers** : filtrage massif géré par les hébergeurs.

### Une bonne architecture combine plusieurs solutions.
