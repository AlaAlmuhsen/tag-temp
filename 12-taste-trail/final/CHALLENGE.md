# Challenge: Context API + fake authentication + protected routes + lazy loading

👨‍💼 Your project manager loved the routing. Now the app needs to grow up: creating and deleting dishes, users, and a faster first load.

YOUR TASKS:

**Part 1: DishesContext**

- Duplicate `src` folder to `src-no-context`
- Review how `dishes` flows: `App` → `AppLayout` → `Map`. That's prop drilling
- Create a new context `DishesContext` with a custom provider `DishesProvider` and a custom hook `useDishes`
- Move the fetching of all dishes from `App` into the provider
- Refactor to `useReducer` with these actions: `loading` · `dishes/loaded` · `dish/loaded` · `dish/created` · `dish/deleted` · `rejected`
- Move the fetching of ONE dish from `Dish` into the provider as `getDish(id)`, and store the result as `currentDish`
  - HINT: `id` comes from the URL, so it's a **string**. Compare with `Number(id)`
  - HINT: `getDish` is used inside a `useEffect` dependency array. Wrap it in `useCallback` or you'll get an infinite loop
- Highlight the active dish in `DishItem` (class `dishItem--active`) using `currentDish`
- Add `createDish(newDish)` (POST) and use it in `Form`. After creating, navigate to `/app/dishes`
- Add a `×` button to `DishItem` and `deleteDish(id)` (DELETE)
  - IMPORTANT: the button is inside a `<Link>`. What does `e.preventDefault()` do here?
- Delete all unnecessary props

**Part 2: Fake authentication**

- Create `FakeAuthContext` with `AuthProvider` and `useAuth`, state: `user` · `isAuthenticated`
- Use this fake user (no backend, just practice!):
  ```js
  const FAKE_USER = {
    name: "Lina",
    email: "lina@tastetrail.dev",
    password: "qwerty",
    avatar: "👩‍🍳",
  };
  ```
- Make `Login` work: on success, go to `/app` with `{ replace: true }`. Why `replace`? Try the browser back button without it
- Create a `User` component (avatar + "Welcome, Lina" + Logout button) and show it in `AppLayout`
- Change the homepage CTA to go to `/login`

**Part 3: Protected routes**

- Create a `ProtectedRoute` component that wraps `AppLayout`
- If the user is not authenticated, redirect to `/` with `useNavigate` inside a `useEffect`
- Test it: log out, then type `/app/dishes` directly in the address bar

**Part 4: Lazy loading**

- Run `npm run build` and note the size of the JS bundle
- Load every page with `lazy(() => import(...))`
- Wrap `<Routes>` in `<Suspense>` with `SpinnerFullPage` as the fallback
- Run `npm run build` again and compare the chunks
