# 🐾 Paws Shelter — Starter

A tiny pet adoption website to learn **React Router**.
No backend, no API: the pets live in `data/pets.js`.

## Setup

```bash
npx create-react-app paws-shelter
cd paws-shelter
npm i react-router-dom@6
```

1. Delete everything inside `src/` except `index.js`
2. Copy `App.js`, `index.css` and the `components/`, `pages/` and `data/` folders into `src/`
3. Run `npm start`

## What's inside

| File | Status |
| --- | --- |
| `App.js` | Design preview: renders **every** page at once |
| `pages/*`, `components/*` | Design only: markup + CSS are done, values are hardcoded. Look for `TODO` comments |
| `data/pets.js` | Done. `pets`, `PET_TYPES` and `getPet(id)` |
| `AdoptForm.js`, `ThankYou.js` | For the challenge 🏆 |

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
/adopt                 → redirect to /pets
*                      NotFound
```

## Lessons

| # | Concept | Where |
| --- | --- | --- |
| 1 | `BrowserRouter`, `Routes`, `Route`: one page per URL | `App.js` |
| 2 | `Link` & `NavLink` (no reload, `active` class, `end`) | `Navbar`, `Home`, `PetCard`, `NotFound` |
| 3 | The `*` route for unknown URLs | `App.js` |
| 4 | Nested routes, `index` route, `<Outlet />` | `App.js`, `PetsLayout` |
| 5 | URL params: `/pets/:petId` → `useParams()` | `PetDetails` |
| 6 | Query string: `?type=cat` → `useSearchParams()` | `FilterBar`, `PetList` |
| 7 | Navigate from code: `useNavigate()`, `navigate(-1)` | `PetsLayout`, `BackButton` |
| 8 | Redirects: `<Navigate to="..." replace />` | `App.js` (`/adopt`), `PetDetails` (unknown pet) |

Then → `CHALLENGE.md` in the final folder 🏆
