# 🐾 Paws Shelter — Final

A tiny pet adoption website to learn **React Router**, with the Context API and fake authentication.

```bash
npm install
npm run server   # fake API on http://localhost:9000/pets
npm start        # app on http://localhost:3000
```

Fake users (password `1234`): `sara@paws.dev` · `omar@paws.dev` (Omar already adopted Rocky 🐕).

## What's where

| File | What it does |
| --- | --- |
| `App.js` | All the routes, wrapped in `AuthProvider` + `PetsProvider` |
| `contexts/PetsContext.js` | Fetches all pets once (`useReducer`), `getPet(id)`, `adoptPet()` (PATCH) |
| `contexts/AuthContext.js` | Fake login/logout with 2 hardcoded users |
| `components/ProtectedRoute.js` | Not logged in → `/login`, remembering where you wanted to go |
| `pages/MyAdoptions.js` | Only the logged in user's pets |

Adoptions are saved in `data/db.json` (each adopted pet gets `adopted: true`, `adopterId`, `adopter`, `reason`, `adoptedAt`).
To start over, set `adopted` back to `false` on the pets you adopted.
