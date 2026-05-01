# SMTS Group — Site web & API

Application full stack pour **SMTS Group** : vitrine React (Tailwind, Framer Motion, React Router v6) et API Express + MongoDB.

## Prérequis

- Node.js 18+
- Compte MongoDB Atlas (base **`SMTS`**)

## Installation et démarrage

### 1. API (`/server`)

```bash
cd server && npm install
```

### 2. Variables d’environnement

Renseignez `server/.env` (fichier fourni avec des placeholders) :

- `MONGODB_URI` — chaîne de connexion vers la base **SMTS**
- `PORT` — par défaut `5000`
- `JWT_SECRET` — secret pour signer les JWT admin
- `NODE_ENV` — `development` ou `production`

### 3. Compte administrateur (seed)

```bash
npm run seed
```

Compte de test : **admin** / **admin123** (à changer en production).

### 4. Lancer l’API

```bash
npm run dev
```

### 5. Frontend (`/client`)

```bash
cd ../client && npm install
```

Créez ou complétez `client/.env` :

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 6. Lancer le site

```bash
npm start
```

Le site : [http://localhost:3000](http://localhost:3000)  
L’API : [http://localhost:5000](http://localhost:5000)

## Collections MongoDB

| Collection   | Usage                          |
|-------------|---------------------------------|
| `contacts`  | Messages contact / partenariat |
| `admin`     | Comptes administrateurs        |
| `settings`  | Coordonnées du site public     |

## Routes API principales

- `POST /api/contacts` — formulaire public  
- `GET /api/contacts`, `PATCH /api/contacts/:id/lu` — admin (JWT)  
- `POST /api/admin/login` — connexion, réponse `{ token, admin }`  
- `GET /api/settings` — public : coordonnées (email, téléphone, localisation)  
- `PUT /api/settings` — admin : mise à jour des coordonnées

## Déploiement

- Build frontend : `cd client && npm run build`  
- Servir le dossier `build` derrière un reverse proxy et définir `REACT_APP_API_URL` vers l’URL publique de l’API.  
- En production, définir `CLIENT_URL` sur le serveur si vous restreignez CORS, et utiliser un `JWT_SECRET` fort.

## Charte

Couleurs : `#0A1628`, `#1E3A5F`, `#2563EB`, `#FFFFFF`, `#F8FAFC`, `#64748B`. Police : **Inter**.
