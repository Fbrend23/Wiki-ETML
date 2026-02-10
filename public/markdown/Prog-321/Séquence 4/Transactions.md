# Les Transactions

Les transactions sont essentielles pour garantir la **consistance** (ou cohérence) des données entre différents services. Elles sont étroitement liées à l'**idempotence** : ensemble, elles assurent que les opérations sont fiables, même en cas de panne.

## 1. Les Propriétés ACID

Une transaction est une unité de travail qui doit respecter quatre principes fondamentaux :

- **Atomicité** : C'est "tout ou rien". Si une étape échoue, toute la transaction est annulée.
- **Cohérence** : Le système passe d'un état valide à un autre état valide.
- **Isolation** : Les opérations d'une transaction sont invisibles pour les autres tant qu'elles ne sont pas validées (_commit_).
- **Durabilité** : Une fois validée, la modification est permanente (sauvegardée sur disque).

## 2. Transactions dans une Architecture Distribuée

Dans un système avec plusieurs microservices (ex: un client et un broker), garantir les propriétés ACID est complexe. On utilise alors deux stratégies majeures :

### A. Le Two-Phase Commit (2PC)

Le système demande à tous les participants s'ils sont prêts, puis ordonne la validation globale.

- **Inconvénient** : C'est un mécanisme bloquant et lent.

### B. Les Transactions Compensatoires (Sagas)

Au lieu de bloquer tout le système, on exécute les étapes les unes après les autres. Si une étape échoue, on lance une **action de compensation** pour annuler l'effet des étapes précédentes.

- _Exemple_ : Si la réservation d'un vol échoue après le paiement, le système lance un "remboursement".

## 3. Transactions et MQTT

MQTT est asynchrone par nature, ce qui demande une gestion spécifique :

1. **Idempotence obligatoire** : Les consommateurs doivent pouvoir traiter le même message plusieurs fois sans erreur (en cas de retransmission).
2. **Gestion des Sagas** : Chaque service publie des messages pour confirmer ou annuler une étape de la transaction globale.
3. **Outbox Pattern** : Utilisation d'un tampon (base de données) pour garantir que le message est bien envoyé au broker même si le service tombe en panne juste après une action.

---

## 💡 Résumé à mémoriser

- **ACID** = Le socle de la fiabilité des données.
- **Sagas** = La solution moderne pour les systèmes distribués (compensation au lieu de blocage).
- **Transaction + Idempotence** = La combinaison indispensable pour la résilience.
