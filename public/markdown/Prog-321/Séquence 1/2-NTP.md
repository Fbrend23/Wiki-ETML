# Fiche de Révision : Synchronisation & Temps Distribué

## 1. Pourquoi le temps est-il un problème ?

Dans un réseau distribué, chaque nœud a sa propre horloge matérielle. Ces horloges "dérivent" naturellement, créant des écarts.

- **Désynchronisation :** Empêche de déterminer l'ordre réel des événements.
- **Incohérence :** Dans une base de données, un événement "futur" pourrait sembler arriver avant un événement "passé".
- **Métaphore de l'orchestre :** Sans chef (ou horloge commune), les musiciens (nœuds) se décalent, et la symphonie (système) devient cacophonique.

---

## 2. NTP vs PTP : Comparaison technique

| Caractéristique  | **NTP** (Network Time Protocol)      | **PTP** (Precision Time Protocol)          |
| ---------------- | ------------------------------------ | ------------------------------------------ |
| **Précision**    | Milliseconde (ms)                    | **Microseconde ()** à Nanoseconde          |
| **Échelle**      | Global (Internet / WAN)              | Local (LAN optimisé)                       |
| **Support**      | Logiciel uniquement                  | **Matériel dédié** (Timestamping hardware) |
| **Architecture** | **Stratum** (Hiérarchie de serveurs) | **Grandmaster** / Slaves                   |
| **Résilience**   | Très tolérant aux délais réseau      | Sensible aux variations du LAN             |

---

## 3. La Mécanique NTP (Calculs à connaître)

Le protocole ajuste l'horloge locale en calculant le trajet d'un paquet entre un client et un serveur.

### Les 4 Horodatages (Timestamps)

1. **T1** : Départ de la requête (Client)
2. **T3** : Réception de la requête (Serveur)
3. **T2** : Envoi de la réponse (Serveur)
4. **T4** : Réception de la réponse (Client)

### Formules Mathématiques

- **Le Décalage (Offset) :** C'est la valeur de correction à appliquer.

- **Le Délai (Delay) :** Mesure la qualité de la ligne.

> **Note :** Si le _Delay_ est trop élevé, le système peut décider d'ignorer la correction car elle n'est plus jugée fiable.

---

## 4. Alternative : L'Ordre Logique (Lamport)

Quand l'heure physique exacte n'est pas possible ou nécessaire, on utilise des **horloges logiques**.

- **Concept :** Chaque message envoyé inclut un compteur. À la réception, le nœud met à jour son propre compteur : .
- **Objectif :** Garantir la **causalité** (l'ordre relatif) plutôt que l'heure réelle.

---

## 5. NTP en Pratique (C# & NodaTime)

En développement, utiliser `DateTime.Now` rend les tests impossibles car le temps avance toujours. La solution est l'**Injection de Dépendance**.

### L'interface `IClock`

Au lieu d'appeler l'horloge système directement, on passe une interface au constructeur de nos classes.

- **Production :** On utilise `SystemClock.Instance`.
- **Tests Unitaires :** On utilise `FakeClock`.

### Exemple de Test avec `FakeClock`

Le `FakeClock` permet de simuler des scénarios temporels complexes (ex: le passage à la nouvelle année) sans attendre.

```csharp
// 1. Initialiser une heure fixe pour le test
var fakeClock = new FakeClock(Instant.FromUtc(2023, 12, 31, 23, 59));

// 2. Injecter l'horloge dans le programme
var program = new TimeSensitiveProgram(fakeClock);

// 3. Vérifier le comportement avant le changement
Assert.AreEqual("Before 2024", program.GetMessage());

// 4. Avancer le temps de 2 minutes manuellement
fakeClock.AdvanceBy(Duration.FromMinutes(2));

// 5. Vérifier que la logique s'est adaptée
Assert.AreEqual("Welcome to 2024!", program.GetMessage());

```

---

## 💡 Points clés pour l'examen

1. **NTP** est la solution standard pour le web (précision ms).
2. **PTP** est requis pour le trading ou les télécoms (précision ).
3. L'**Offset** est la moyenne des différences de temps entre l'aller et le retour.
4. **NodaTime** est préférable au type `DateTime` natif car il permet d'isoler le temps dans les tests grâce à `FakeClock`.

---
