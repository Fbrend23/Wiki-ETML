<!-- INSTRUCTION_AUDIO:
Lis chaque question puis immédiatement sa réponse.
Adopte un ton formel, professionnel et motivant.
Ne lis pas ce bloc.
-->

# **6. Outils d’audit & méthodologies**

_(Source : I183-TS2-ListeDesQuestions.pdf)_

## **OUTIL1 — Trois outils d’audit**

- **OWASP ZAP** : open-source, idéal pour étudiants.
- **Burp Suite** : complet, intègre proxy, scanner, repeater.
- **Nmap** : analyse des ports, versioning, découverte réseau.

---

## **OUTIL2 — Metasploit**

C'est un framework permettant :

- exploitation de failles connues (modules),
- création d’exploits personnalisés,
- automatisation des attaques.

Outil puissant : utilisé uniquement en environnement autorisé.
**Exemple concret** :
Utiliser le module `exploit/windows/smb/ms17_010_eternalblue` pour prendre le contrôle d'un serveur Windows non patché.

---

## **OUTIL3 — Metasploit sur Swisscom ?**

Non.
Toute attaque sans autorisation :

- viole la loi suisse,
- peut mener à des poursuites pénales,
- viole les conditions d'utilisation des opérateurs.

Seuls les **tests autorisés** (bug bounty, pentest contractuel) sont légaux.

---

## **OUTIL4 — Black Box Testing**

Le testeur ne connaît rien de l’application :

- pas de code,
- pas de documentation,
- pas d’accès interne.

Il simule le point de vue d’un pirate réel.

**Avantages** :
- Conditions réalistes (simulation d'attaque externe).
- Indépendance vis-à-vis de la documentation (souvent fausse).

**Inconvénients** :
- Couverture de test incomplète (on ne trouve pas tout).
- Plus lent (tâtonnement).
- Peut rater des failles évidentes dans le code source (**White Box** préférable pour l'exhaustivité).

---
