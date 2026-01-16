# Fiche de Révision : Synchronisation & Temps Distribué

## 1. Problématique du Temps en Réseau

Dans un système distribué, l'absence de synchronisation cause :

* **Incohérence des données :** Difficulté à ordonner les transactions dans une base de données.
* **Problèmes de causalité :** Un événement futur peut sembler s'être produit avant un événement passé.
* **Audit impossible :** Les logs de différents serveurs ne peuvent pas être corrélés.

---

## 2. NTP vs PTP : Le duel des protocoles

| Caractéristique | **NTP** (Network Time Protocol) | **PTP** (Precision Time Protocol) |
| --- | --- | --- |
| **Précision** | Milliseconde (ms) | Micro (µs) à Nanoseconde (ns) |
| **Échelle** | Global (Internet) | Local (LAN) |
| **Architecture** | Hiérarchie **Stratum** (0 à 15) | **Grandmaster** / Slave |
| **Support** | Principalement logiciel | Nécessite du **matériel dédié** |
| **Usage type** | Serveurs web, Logs, BDD | Trading, Télécoms, Audio/Vidéo |

---

## 3. Mécanique de NTP (Le calcul)

Le client NTP échange des messages avec le serveur pour calculer deux variables clés.

### Les 4 horodatages (Timestamps) :

* **T1 :** Envoi requête (Client)
* **T3 :** Réception requête (Serveur)
* **T2 :** Envoi réponse (Serveur)
* **T4 :** Réception réponse (Client)

### Formules essentielles :

1. **Offset (Décalage) :** 
* Sert à ajuster l'horloge locale.


2. **Delay (Délai réseau) :** 
* Sert à évaluer la **fiabilité** de la synchronisation (plus le délai est haut, moins la précision est garantie).



---

## 4. Alternatives : L'ordre logique (Lamport)

Si l'heure exacte n'est pas requise, on utilise des **horloges logiques**.

* **Concept :** Chaque nœud possède un compteur incrémenté à chaque événement.
* **But :** Garantir l'ordre relatif (causalité) plutôt que l'heure réelle.
* **Limitation :** Ne donne pas l'heure physique, seulement "qui est arrivé avant qui".

---

## 5. Bonnes pratiques de développement (C# / NodaTime)

Pour gérer le temps de manière robuste dans vos applications, évitez `DateTime.Now` directement dans le code métier.

### Utilisation de NodaTime

* **Pourquoi ?** Permet d'injecter une horloge pour les tests unitaires.
* **Interface `IClock` :**
* `SystemClock.Instance` : Utilisé en production (heure réelle).
* `FakeClock` : Utilisé en test (permet de figer ou d'avancer le temps via `AdvanceBy()`).



### Exemple Flash (Test Unitaire)

```csharp
// 1. Initialiser une fausse horloge à une date précise
var fakeClock = new FakeClock(Instant.FromUtc(2023, 12, 31, 23, 59));

// 2. Injecter dans le service
var service = new MyService(fakeClock);

// 3. Avancer le temps artificiellement
fakeClock.AdvanceBy(Duration.FromMinutes(2)); // On passe en 2024 !

```

---

## 💡 Résumé pour l'examen

* **NTP** = Robuste, logiciel, milliseconde, partout.
* **PTP** = Précis, matériel, microseconde, local.
* **Offset** = Correction de l'heure.
* **Delay** = Indicateur de qualité.
* **Lamport** = Ordre logique sans horloge physique.
* **Testabilité** = Toujours injecter `IClock` pour pouvoir simuler le temps.