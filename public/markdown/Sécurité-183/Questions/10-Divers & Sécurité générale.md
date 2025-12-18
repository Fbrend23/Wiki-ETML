<!-- INSTRUCTION_AUDIO:
Lis chaque question puis immédiatement sa réponse.
Adopte un ton formel, professionnel et motivant.
Ne lis pas ce bloc.
-->

# **10. Divers**

_(Source : I183-TS2-ListeDesQuestions.pdf)_

<a id="misc1"></a>

## **MISC1 — Risques des librairies tierces**

Utiliser du code que l'on n'a pas écrit soi-même introduit plusieurs vecteurs d'attaque :

1. **Vulnérabilités connues (CVE)** : Une librairie peut contenir une faille découverte plus tard (ex: Log4j). Si elle n'est pas mise à jour, l'application est vulnérable.
2. **Attaques de la Supply Chain** : Un attaquant peut compromettre le compte d'un mainteneur de package (npm, PyPI) et injecter du code malveillant dans une mise à jour mineure.
3. **Abandon du projet** : Si une librairie n'est plus maintenue, les futures failles ne seront jamais corrigées.
4. **Dépendances transitives** : On installe une librairie A, qui installe B, qui installe C. Une faille dans C compromet A.

**Bonnes pratiques :**

- Utiliser `npm audit` ou **OWASP Dependency Check**.
- Verrouiller les versions (`package-lock.json`).
- Minimiser le nombre de dépendances.

---

<a id="misc2"></a>

## **MISC2 — Chiffrement au repos / en transit**

Il s'agit de protéger la donnée dans ses deux états principaux :

1. **En Transit (Data in Transit)** :
   - **Définition** : Données qui circulent sur le réseau (Internet, Wi-Fi).
   - **Risque** : Interception (Man-in-the-Middle), écoute (Sniffing).
   - **Solution** : Chiffrement via **TLS/SSL** (HTTPS, WSS, VPN). Cela crée un tunnel sécurisé entre le client et le serveur.

2. **Au Repos (Data at Rest)** :
   - **Définition** : Données stockées de manière persistante (Disque dur, Base de données, Backup).
   - **Risque** : Vol physique du serveur, vol de disque dur, accès non autorisé au système de fichiers.
   - **Solution** : Chiffrement du disque (BitLocker, LUKS) ou chiffrement de la base de données (AES-256). Si le disque est volé, les données sont illisibles sans la clé.

**Conclusion** : Une sécurité complète nécessite les deux. HTTPS ne protège pas une base de données volée, et le chiffrement disque ne protège pas les données interceptées sur le Wi-Fi.

---
