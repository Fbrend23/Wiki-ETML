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

- Permet une authentification **stateless**,
- évite l'utilisation de sessions serveur,
- facilite les architectures distribuées.

Mais attention :
Un JWT volé est valide jusqu’à expiration → **ne jamais le stocker dans localStorage**.

---
