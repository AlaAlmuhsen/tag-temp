# 🍴 TasteTrail — Final

Track every dish you've tasted on a world map. React Router project
(same flow as the WorldWise project, with a different idea).

## Run it

```bash
npm install
npm run server   # fake API on http://localhost:9000/dishes
npm start        # app on http://localhost:3000
```

Login: `lina@tastetrail.dev` / `qwerty` (pre-filled).

## Two versions

| Folder | What it is |
| --- | --- |
| `src-no-context` | End of the **React Router** lesson. State lives in `App` and is passed as props. Run it by renaming it to `src` |
| `src` | After the **challenge** (`CHALLENGE.md`): `DishesContext` + `useReducer`, fake auth, protected routes, lazy loading |

## Routes

| URL | Element | Concept |
| --- | --- | --- |
| `/` | `Homepage` | `index` route |
| `/about`, `/pricing`, `/login` | pages | `Route path` + `NavLink` |
| `/app` | `AppLayout` | parent of nested routes, `<Outlet />` in `Sidebar` |
| `/app` (exactly) | `<Navigate replace to="dishes" />` | index redirect |
| `/app/dishes` | `DishList` | nested route |
| `/app/dishes/:id?lat=..&lng=..` | `Dish` | `useParams` + `useSearchParams` |
| `/app/countries` | `CountryList` | nested route |
| `/app/form?lat=..&lng=..` | `Form` | `useNavigate` from a map click |
| `*` | `PageNotFound` | catch-all |
