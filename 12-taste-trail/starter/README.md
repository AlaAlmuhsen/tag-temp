# 🍴 TasteTrail — Starter

Track every dish you've tasted on a world map. Same flow as the WorldWise
project (React Router), with a different idea.

## Setup

```bash
npx create-react-app taste-trail
cd taste-trail
npm i react-router-dom@6 leaflet@1.9 react-leaflet@4 json-server@0.17.3
```

> `react-leaflet@4` needs React 18. If your new project came with React 19, use `react-leaflet@5` instead.

1. Delete everything inside `src/` except `index.js`
2. Copy `App.js`, `index.css`, `utils.js` and the `components/`, `pages/` and `hooks/` folders into `src/`
3. In `src/index.js`, import the map styles **before** `index.css`:
   ```js
   import "leaflet/dist/leaflet.css";
   import "./index.css";
   ```
4. Create `data/dishes.json` at the project root (copy `dishes.json`)
5. Add this to the `scripts` in `package.json`:
   ```json
   "server": "json-server --watch data/dishes.json --port 9000"
   ```
6. Run `npm run server` and `npm start`

## What's inside

| File | Status |
| --- | --- |
| `App.js` | Design preview: renders **every** page at once |
| `pages/*`, `components/*` | Design only: markup + CSS Modules are done, values are hardcoded. Look for `TODO` comments |
| `*.module.css` | CSS Modules: `styles.className` is scoped to one component |
| `hooks/useGeolocation.js` | Done. Gets the user's position from the browser |
| `utils.js` | Done. `formatDate`, `formatLongDate`, `convertToEmoji`, `DISH_EMOJIS` |

All links are plain `<a href>` for now. Click one and watch the Network tab: the **whole page reloads**.
That's the problem React Router solves.

## Route map

```
/                    Homepage
/about               About
/pricing             Pricing
/login               Login
/app                 AppLayout  (Sidebar + Map)
├── (index)          → redirect to /app/dishes
├── dishes           DishList
├── dishes/:id       Dish            ?lat=..&lng=..
├── countries        CountryList
└── form             Form            ?lat=..&lng=..
*                    PageNotFound
```

## Lessons

| # | Lesson | Where |
| --- | --- | --- |
| 1 | `BrowserRouter`, `Routes`, `Route`: one page per URL | `App.js` |
| 2 | `Link` and `NavLink` instead of `<a>` (no reload, `active` class) | `PageNav`, `Logo`, `Homepage`, `PageNotFound` |
| 3 | Nested routes + `<Outlet />` + `index` route | `App.js`, `Sidebar`, `AppNav` |
| 4 | Fetch dishes in `App`, pass them down as props | `App.js`, `DishList`, `CountryList`, `Map` |
| 5 | URL params: `dishes/:id` → `useParams()` | `DishItem`, `Dish` |
| 6 | Query string: `?lat=..&lng=..` → `useSearchParams()` (state in the URL!) | `DishItem`, `Map` |
| 7 | `useNavigate()`: click the map → open the form, `navigate(-1)` | `Map`, `BackButton` |
| 8 | Custom hook `useUrlPosition`, reverse geocoding in the form | `hooks/`, `Form` |
| 9 | `<Navigate replace to="dishes" />` and the `*` route | `App.js` |

After that → `CHALLENGE.md` in the final folder (Context API, fake auth, protected routes, lazy loading).

Data endpoint: `http://localhost:9000/dishes`.
Each dish has `{ id, dishName, emoji, cityName, country, flag, date, notes, position: { lat, lng } }`.
