# 🐾 Paws Shelter — Starter

A tiny pet adoption website to learn **React Router**.
The pets live in a fake API made with json-server.

## Setup

```bash
npx create-react-app paws-shelter
cd paws-shelter
npm i react-router-dom@6 json-server@0.17.3
```

1. Delete everything inside `src/` except `index.js`
2. Copy `App.js`, `index.css`, `utils.js` and the `components/`, `pages/` and `hooks/` folders into `src/`
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
| `hooks/useFetch.js` | Done. `useFetch(url)` → `{ data, isLoading, error }`, fetches again when `url` changes |
| `utils.js` | Done. `API_URL`, `PET_TYPES`, `formatDate` |
| `AdoptForm.js`, `ThankYou.js`, `Adoptions.js` | For the challenge 🏆 |

All links are plain `<a href>`. Click one and watch the Network tab: the **whole page reloads**.
That's the problem React Router solves.

## Route map

```
/                      Home
/about                 About
/pets                  PetsLayout
├── (index)            PetList       ?type=cat
├── :petId             PetDetails
└── :petId/adopt       AdoptForm     🏆
/thank-you             ThankYou      ?pet=..&adopter=..  🏆
/adoptions             Adoptions     🏆
/adopt                 → redirect to /pets
*                      NotFound
```

## API (json-server)

| Request | What it does |
| --- | --- |
| `GET /pets` | all pets |
| `GET /pets?type=cat` | only cats |
| `GET /pets/3` | one pet (404 if it doesn't exist) |
| `GET /pets?adopted=false` | pets waiting for a home |
| `PATCH /pets/3` | adopt it 🏆 |
| `GET /pets?adopted=true&_sort=adoptedAt&_order=desc` | adopted pets, newest first 🏆 |

## Lessons

| # | Concept | Where |
| --- | --- | --- |
| 1 | `BrowserRouter`, `Routes`, `Route`: one page per URL | `App.js` |
| 2 | `Link` & `NavLink` (no reload, `active` class, `end`) | `Navbar`, `Home`, `PetCard`, `NotFound` |
| 3 | The `*` route for unknown URLs | `App.js` |
| 4 | Nested routes, `index` route, `<Outlet />` | `App.js`, `PetsLayout` |
| 5 | URL params: `/pets/:petId` → `useParams()` → fetch that pet | `PetDetails` |
| 6 | Query string: `?type=cat` → `useSearchParams()` → fetch only cats | `FilterBar`, `PetList` |
| 7 | Navigate from code: `useNavigate()`, `navigate(-1)` | `PetsLayout`, `BackButton` |
| 8 | Redirects: `<Navigate to="..." replace />` | `App.js` (`/adopt`), `PetDetails` (unknown pet) |

Then → `CHALLENGE.md` in the final folder 🏆
