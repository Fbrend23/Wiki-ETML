# Fiche de Révision : Sérialisation & Désérialisation

## 1. Définition

La **sérialisation** (ou _marshalling_) est le processus de conversion d'un objet en mémoire (état binaire complexe) en un format transportable ou stockable (séquence de bits, texte ou binaire compact).

- **Sérialisation** : Objet (Mémoire) Flux (JSON, XML, Binaire).
- **Désérialisation** : Flux Objet (Mémoire).

### Métaphore

Imaginez que vous deviez envoyer une armoire montée par la poste. Vous devez la démonter (sérialiser) pour la mettre dans un carton plat. Le destinataire devra suivre la notice pour la remonter (désérialiser) afin de l'utiliser.

---

## 2. Pourquoi sérialiser ?

1. **Transport** : Envoyer des données via réseau (API REST, systèmes distribués).
2. **Persistance** : Sauvegarder l'état d'un programme dans un fichier ou une base de données.
3. **Interopérabilité** : Faire communiquer deux programmes écrits dans des langages différents (ex: C# vers Java via JSON).

---

## 3. Comparaison des Formats

| Format              | Type    | Avantages                                        | Inconvénients                    |
| ------------------- | ------- | ------------------------------------------------ | -------------------------------- |
| **JSON**            | Texte   | Léger, **lisible par l'homme**, standard du Web. | Moins performant que le binaire. |
| **XML**             | Texte   | Structuré, supporte des schémas complexes.       | Très verbeux (lourd).            |
| **Protobuf / Avro** | Binaire | **Ultra-rapide**, très compact.                  | Illisible sans outil spécialisé. |

---

## 4. Exemple Concret (C#)

### L'objet en mémoire

```csharp
public class Actor {
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime BirthDate { get; set; }
}

// Instance
Actor Jen = new Actor { FirstName = "Jennifer", LastName = "Aniston", BirthDate = new DateTime(1969, 2, 11) };

```

### Le résultat sérialisé (JSON)

```json
{
  "FirstName": "Jennifer",
  "LastName": "Aniston",
  "BirthDate": "1969-02-11T00:00:00"
}
```

---

## 5. Contrôle de la Sérialisation (Attributs C#)

Il est crucial de pouvoir contrôler comment les objets sont transformés, notamment pour la sécurité ou la logique métier.

### A. Exclure des données sensibles : `[JsonIgnore]`

Permet d'éviter de propager des mots de passe ou des clés API.

```csharp
public class UserAccount {
    public string UserName { get; set; }
    [JsonIgnore]
    public string Password { get; set; } // Ce champ n'apparaîtra jamais dans le JSON
}

```

### B. Gérer les constructeurs : `[JsonConstructor]`

Si votre classe n'a pas de constructeur vide, vous devez indiquer au désérialiseur lequel utiliser.

```csharp
public class Person {
    public string Name { get; }
    public int Age { get; }

    [JsonConstructor] // Indique d'utiliser ce constructeur précis
    public Person(string name, int age) {
        Name = name;
        Age = age;
    }
}

```

---

## 6. Défis et Limites

- **Le temps (Dates)** : Les formats de date varient. **La norme à utiliser est l'ISO 8601** (ex: `2024-05-24T14:30:00Z`).
- **Sécurité** : La désérialisation de données inconnues est dangereuse (risques d'injections d'objets malveillants).
- **Performance** : Les formats texte (JSON/XML) consomment plus de CPU et de bande passante que le binaire.
- **Versioning** : Si vous ajoutez un champ obligatoire dans votre classe mais que vous lisez un vieux fichier JSON qui ne l'a pas, la désérialisation peut échouer.

---

## 💡 Résumé Flash pour l'examen

- **Binaire** = Performance & Taille réduite.
- **Texte (JSON)** = Lisibilité & Débogage facile.
- **ISO 8601** = Le standard indispensable pour les dates.
- **[JsonIgnore]** = Sécurité (ne pas envoyer le sensible).
- **[JsonConstructor]** = Aide le programme à reconstruire l'objet.

---

**Lien avec les chapitres précédents :** La sérialisation est l'outil qui permet aux **Microservices** de s'envoyer des messages compréhensibles à travers le réseau via des **Bus de messages** ou des requêtes **HTTP**.
