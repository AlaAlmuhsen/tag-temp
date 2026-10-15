# 🐾 Paws Shelter — Starter

A tiny pet adoption website to learn **React Router**, with the Context API and fake authentication.
The pets live in a fake API made with json-server.

## Setup

```bash
npx create-react-app paws-shelter
cd paws-shelter
npm i react-router-dom@6 json-server@0.17.3
```

1. Delete everything inside `src/` except `index.js`
2. Copy `App.js`, `index.css`, `utils.js` and the `components/` and `pages/` folders into `src/`
3. Create `data/db.json` at the project root (copy `db.json`)
4. Add this to the `scripts` in `package.json`:
   ```json
   "server": "json-server --watch data/db.json --port 9000"
   ```
5. Run `npm run server` and `npm start`

## What's inside

| File | Status |
| --- | --- |
| `App.js` | Design preview: renders **every** page at once |
| `pages/*`, `components/*` | Design only: markup + CSS are done, values are hardcoded. Look for `TODO` comments |
| `utils.js` | Done. `API_URL`, `PET_TYPES`, `formatDate` |

All links are plain `<a href>`. Click one and watch the Network tab: the **whole page reloads**.
That's the problem React Router solves.

## Route map

```
/                      Home
/about                 About
/login                 Login
/pets                  PetsLayout
├── (index)            PetList       ?type=cat
├── :petId             PetDetails
└── :petId/adopt       AdoptForm     🔒
/thank-you             ThankYou      ?pet=Luna  🔒
/my-adoptions          MyAdoptions   🔒
/adopt                 → redirect to /pets
*                      NotFound

🔒 = logged in only (ProtectedRoute)
```

## API (json-server)

| Request | What it does |
| --- | --- |
| `GET /pets` | all pets |
| `PATCH /pets/3` | adopt it: `{ adopted: true, adopterId, adopter, reason, adoptedAt }` |

## Fake users

Password `1234`: `sara@paws.dev` · `omar@paws.dev` (Omar already adopted Rocky 🐕)

## Lessons

| # | Concept | Where |
| --- | --- | --- |
| 1 | `BrowserRouter`, `Routes`, `Route`: one page per URL | `App.js` |
| 2 | `Link` & `NavLink` (no reload, `active` class, `end`) | `Navbar`, `Home`, `PetCard`, `NotFound` |
| 3 | The `*` route for unknown URLs | `App.js` |
| 4 | Nested routes, `index` route, `<Outlet />` | `App.js`, `PetsLayout` |
| 5 | `PetsContext`: fetch all pets once with `useReducer`, `usePets()` everywhere | `contexts/PetsContext.js` |
| 6 | URL params: `/pets/:petId` → `useParams()` → `getPet(id)` | `PetDetails` |
| 7 | Query string: `?type=cat` → `useSearchParams()` → filter (derived state) | `FilterBar`, `PetList` |
| 8 | Navigate from code: `useNavigate()`, `navigate(-1)` | `PetsLayout`, `BackButton` |
| 9 | Redirects: `<Navigate to="..." replace />` | `App.js` (`/adopt`), `PetDetails` (unknown pet) |
| 10 | Adopting: relative link, `PATCH` with `adoptPet()`, data in the query string | `PetDetails`, `AdoptForm`, `ThankYou` |
| 11 | `AuthContext`: fake login/logout, user in the `Navbar` | `contexts/AuthContext.js`, `Login`, `Navbar` |
| 12 | `ProtectedRoute` + `useLocation`: back to the wanted page after login | `ProtectedRoute`, `Login` |
| 13 | My adoptions: only the logged in user's pets | `MyAdoptions` |
