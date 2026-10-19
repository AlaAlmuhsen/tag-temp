# 🪴 Plant Pals — Starter

A tiny plant care app to learn **React Query** (TanStack Query v5).
The plants live in a fake API made with json-server. Every request waits 800ms on purpose, so you can see what's going on.

## Setup

```bash
npx create-react-app plant-pals
cd plant-pals
npm i json-server@0.17.3
```

1. Delete everything inside `src/` except `index.js`
2. Copy `App.js`, `index.css`, `utils.js` and the `components/`, `features/` and `services/` folders into `src/`
3. Create `data/db.json` at the project root (copy `db.json`)
4. Add this to the `scripts` in `package.json`:
   ```json
   "server": "json-server --watch data/db.json --port 9000"
   ```
5. Run `npm run server` and `npm start`

## What's inside

This starter **works**. It fetches data the classic way: `useEffect` + `useState`.
Play with it and try to spot the problems 👇

| Try this | What goes wrong |
| --- | --- |
| Open a plant, close it, open it again | A spinner **every time**. Nothing is cached |
| Open a plant, then click 💧 Water on its card | The details still say the **old** date. There are 2 copies of the same plant (list + details) |
| Click 💧 Water | Nothing happens for 800ms. Feels slow |
| Edit `data/db.json` by hand, switch tabs and come back | The app never knows. Data is never refreshed |
| Stop the server and reload | Error message, but no way to retry |
| Count the lines | `isLoading`, `error`, `isSaving`, `isWatering`, `ignore` flags... most of the code is about **loading and syncing**, not about plants |

This data comes from a **server**. We don't own it, it can change without us, and it can be out of date.
`useState` was made for UI state (is the modal open?). For server state we need a **cache**. That's React Query.

## Setup React Query

```bash
npm i @tanstack/react-query @tanstack/react-query-devtools
```

## Lessons

| # | Concept | Where |
| --- | --- | --- |
| 1 | `QueryClient` + `QueryClientProvider` + Devtools | `index.js` |
| 2 | `useQuery({ queryKey, queryFn })`: replace the whole `useEffect` | `features/plants/usePlants.js`, `PlantList` |
| 3 | `isPending` vs `isFetching`, `error`, `refetch()` (Try again button) | `PlantList` |
| 4 | `staleTime`: fresh vs stale, refetch on window focus | `index.js` |
| 5 | Query keys with variables: `["plants", id]`, `enabled` | `features/plants/usePlant.js`, `PlantDetails` |
| 6 | `useMutation` + `invalidateQueries` (add a plant) | `features/plants/useAddPlant.js`, `AddPlantForm` |
| 7 | Mutations with `removeQueries` and per-call `onSuccess` (delete) | `features/plants/useDeletePlant.js`, `PlantDetails` |
| 8 | Optimistic updates: `onMutate` / `onError` / `onSettled` (water) | `features/plants/useWaterPlant.js`, `PlantCard` |
| 9 | Prefetching on hover with `queryOptions()` | `features/plants/usePlant.js`, `PlantCard` |
| 10 | Global loading indicator with `useIsFetching()` | `Header` |

Look for the `TODO (React Query)` comments. At the end, `App.js` has **no** `useEffect` and only one piece of state: `selectedId`.

## API (json-server)

| Request | What it does |
| --- | --- |
| `GET /plants` | all plants |
| `GET /plants/3` | one plant |
| `POST /plants` | add a plant |
| `PATCH /plants/3` | water it: `{ lastWatered }` |
| `DELETE /plants/3` | delete it |
