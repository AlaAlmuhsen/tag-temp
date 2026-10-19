# 🪴 Plant Pals — Final

A tiny plant care app to learn **React Query** (TanStack Query v5).

```bash
npm install
npm run server   # fake API on http://localhost:9000/plants
npm start        # app on http://localhost:3000
```

Every request waits 800ms on purpose (`wait()` in `utils.js`). Open the **React Query Devtools** (the floating button, bottom corner) and watch the cache while you click.

## The big idea

|  | `useEffect` + `useState` | React Query |
| --- | --- | --- |
| Where the data lives | In a component's state | In **one shared cache** (`QueryClient`) |
| Loading / error state | You write it, every time | `isPending`, `isFetching`, `error` |
| Open the same thing twice | Fetch again + spinner | Instant from the cache |
| Data changes on the server | You never know | Refetch when stale (focus, mount, reconnect) |
| After a POST / PATCH / DELETE | Update state by hand, in every copy | `invalidateQueries(["plants"])` and it refetches |
| Retry on failure | Write it yourself | 3 retries by default |

## What's where

```
src/
├── services/          talks to the API (plain fetch, no React)
│   └── apiPlants.js
├── features/
│   └── plants/        everything about plants: React Query hooks + their components
│       ├── usePlants.js · usePlant.js                          ← queries
│       ├── useAddPlant.js · useWaterPlant.js · useDeletePlant.js ← mutations
│       └── PlantList.js · PlantCard.js · PlantDetails.js · AddPlantForm.js
├── components/        shared UI, not tied to a feature (Header, Loader, Message)
├── App.js · index.js · utils.js
```

The flow is always **component → feature hook → service**. Components never call `fetch` or `useQuery` directly.

| File | What it does |
| --- | --- |
| `index.js` | `QueryClient` (with `staleTime: 30s`), `QueryClientProvider`, Devtools |
| `services/apiPlants.js` | Plain `fetch` functions. They **throw** on error, so React Query knows it failed |
| `features/plants/usePlants.js` | `useQuery` with key `["plants"]` |
| `features/plants/usePlant.js` | `queryOptions` with key `["plants", id]`, `enabled` when there's an id |
| `features/plants/useAddPlant.js` | `useMutation` → `invalidateQueries` |
| `features/plants/useDeletePlant.js` | `useMutation` → `removeQueries` + `invalidateQueries` |
| `features/plants/useWaterPlant.js` | **Optimistic update**: `onMutate` (change the cache now), `onError` (roll back), `onSettled` (sync) |
| `features/plants/PlantCard.js` | Prefetches the details on hover |
| `components/Header.js` | `useIsFetching()` → "🔄 Syncing..." |

## Things to try

1. **Cache**: open a plant, close it, open it again → no spinner
2. **Prefetch**: hover a card for a second before clicking "Details" → no spinner, even the first time
3. **Stale data**: wait 30s, switch to another tab and come back → "Syncing..." in the header
4. **Shared keys**: open a plant, then water it from its card → the details update too, because `["plants"]` also matches `["plants", id]`
5. **Optimistic update**: click 💧 Water → it changes instantly. Now stop the server and click it again → it changes, then rolls back
6. **Retries**: stop the server and reload → React Query retries 3 times (watch the Devtools) before showing the error. Start the server, click "Try again"

To start over, copy `db.json` from the starter folder back into `data/`.
