# Gestion Demandes CHU - Frontend Angular

Application de gestion des demandes pour le CHU, développée avec Angular 20 (standalone) et PrimeNG.

## 📋 Fonctionnalités

- ✅ Authentification utilisateur (JWT)
- ✅ Gestion des demandes (CRUD)
- ✅ Création de nouvelles demandes
- ✅ Liste de toutes les demandes
- ✅ Gestion du personnel
- ✅ Upload/Download de fichiers Excel
- ✅ Protection des routes par guards (Auth, Admin, Responsable)
- ✅ Interface responsive avec PrimeNG

## 🏗️ Architecture

### Structure du projet

```
src/
├── app/
│   ├── guards/              # Guards pour protection des routes
│   │   └── auth.guard.ts
│   ├── interceptors/        # HTTP Interceptors (JWT)
│   │   └── auth.interceptor.ts
│   ├── layout/              # Composants de mise en page
│   │   ├── sidebar/
│   │   └── topbar/
│   ├── models/              # Modèles TypeScript
│   │   ├── demande.model.ts
│   │   ├── utilisateur.model.ts
│   │   ├── departement.model.ts
│   │   ├── fichier.model.ts
│   │   └── enums.ts
│   ├── pages/               # Pages de l'application
│   │   ├── login/
│   │   ├── toutes-demandes/
│   │   ├── creer-nouvelle-demande/
│   │   └── liste-personnel/
│   └── service/             # Services Angular
│       ├── auth.service.ts
│       ├── demande.service.ts
│       ├── user.service.ts
│       ├── fichier.service.ts
│       └── api.service.ts
├── environments/            # Configuration par environnement
└── assets/                  # Ressources statiques
```

### Modèles de données

**Enums:**
- `Role`: RESPONSABLE, ADMIN
- `TypeDemande`: CREATION, MODIFICATION, DESACTIVATION
- `StatusDemande`: RECU, TRAITEE, REJETEE, SUPPRIMEE

**Entités:**
- `Utilisateur`: Utilisateurs du système
- `Demande`: Demandes de gestion
- `Service`: Services hospitaliers
- `Departement`: Départements hospitaliers
- `Fichier`: Fichiers Excel

## 🚀 Installation et démarrage

### Prérequis

- Node.js 18+ et npm
- Angular CLI 20+
- Backend Spring Boot démarré sur `http://localhost:8080`

### Installation

```bash
# Cloner le projet
git clone <repository-url>
cd GestionDemandesCHU

# Installer les dépendances
npm install

# Démarrer le serveur de développement
ng serve
# ou
npm start
```

L'application sera accessible sur `http://localhost:4200/`

## 🔐 Authentification

Le système utilise JWT (JSON Web Token) pour l'authentification.

**Flux d'authentification:**
1. L'utilisateur se connecte via `/login`
2. Le backend retourne un token JWT
3. Le token est stocké dans localStorage
4. Toutes les requêtes HTTP incluent le token via l'intercepteur
5. Les guards protègent les routes selon les rôles

**Guards disponibles:**
- `authGuard`: Vérifie si l'utilisateur est authentifié
- `adminGuard`: Vérifie si l'utilisateur est admin
- `responsableGuard`: Vérifie si l'utilisateur est responsable

## 🌐 API Backend

L'application communique avec un backend Spring Boot sur `http://localhost:8080`

### Endpoints principaux

**Demandes:**
- `GET /demandes` - Liste toutes les demandes
- `GET /demande/{id}` - Détails d'une demande
- `POST /sendDemande` - Créer une demande
- `PUT /updateDemande/{id}` - Modifier une demande
- `PUT /answerDemande/{id}` - Répondre à une demande
- `DELETE /anullerDemande/{id}` - Annuler une demande

**Utilisateurs:**
- `POST /addNewUser` - Ajouter un utilisateur

**Fichiers:**
- `POST /upload_file` - Upload fichier Excel
- `GET /download_file/{id}` - Download fichier Excel

**Authentification:**
- `POST /auth/login` - Connexion (à implémenter côté backend)

## 🎨 Technologies utilisées

- **Angular 20** - Framework frontend (standalone components)
- **PrimeNG 20** - Bibliothèque de composants UI
- **RxJS 7** - Programmation réactive
- **TypeScript** - Langage typé
- **TailwindCSS** - Utility-first CSS
- **PrimeFlex** - CSS Flexbox utilities

## 📦 Scripts disponibles

```bash
# Développement
npm start                 # Démarrer le serveur de dev
npm run watch            # Build en mode watch

# Production
npm run build            # Build de production

# Tests
npm test                 # Lancer les tests unitaires

# Formatage
npm run format           # Formater le code avec Prettier
```

## 🔧 Configuration

### Environment variables

Modifier `src/environments/environment.ts` pour l'environnement de développement:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

### CORS

Assurez-vous que le backend Spring Boot autorise les requêtes depuis `http://localhost:4200`

## 👥 Rôles utilisateurs

- **ADMIN**: Accès complet (toutes les demandes, gestion personnel)
- **RESPONSABLE**: Création et consultation de ses propres demandes

## 📝 Notes importantes

1. **Backend requis**: Cette application nécessite le backend Spring Boot en fonctionnement
2. **Endpoint login**: L'endpoint `/auth/login` doit être implémenté côté backend
3. **JWT**: Le token JWT doit être retourné dans la réponse de login avec l'utilisateur

## 🐛 Dépannage

**Erreur CORS:**
```
Access-Control-Allow-Origin header is missing
```
→ Configurer CORS dans votre backend Spring Boot

**Token expiré:**
→ L'utilisateur sera redirigé vers `/login` automatiquement

**Port 4200 déjà utilisé:**
```bash
ng serve --port 4201
```

## 📄 License

Ce projet est développé pour le CHU.

---

**Développé avec Angular 20 + PrimeNG**
````

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
