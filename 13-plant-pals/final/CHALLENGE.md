# Challenge: filter by room + edit a plant

👩‍🌾 Your plant-obsessed client is happy, but they have 40 plants now and want to find them faster.

YOUR TASKS:

**Part 1: Filter by room (the server does the filtering)**

- Add a `<select>` above the list: `All rooms` + every room in `ROOMS`
- json-server can filter for you: `GET /plants?room=Kitchen`. Add a `room` argument to `getPlants(room)`
- Put the room in the query key: `["plants", { room }]`
  - QUESTION: what happens in the Devtools when you switch rooms back and forth?
  - QUESTION: does `invalidateQueries({ queryKey: ["plants"] })` still refresh the filtered lists? Why?
- Switching rooms shows a spinner and the list disappears. Use `placeholderData: keepPreviousData` to keep the old list on screen while the new one loads
  - HINT: now use `isFetching` to fade the list a bit while it loads

**Part 2: Edit a plant**

- Add an "Edit notes" button in `PlantDetails` that turns the notes into a `<textarea>`
- Create `editPlant(id, changes)` (PATCH) and a `useEditPlant()` hook
  - HINT: `mutationFn` only gets ONE argument. Pass an object: `mutate({ id, changes })`
- On success, don't refetch. Put the answer from the server straight into the cache with `setQueryData(["plants", id], updatedPlant)`. Then invalidate only the list

**Part 3: Optimistic delete**

- Make deleting feel instant, like watering: remove the plant from `["plants"]` in `onMutate`, and roll back in `onError`
- Test it with the server stopped
