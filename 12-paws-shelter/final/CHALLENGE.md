# Challenge: Build the adoption flow

👨‍💼 The shelter manager is happy with the website, but people can't adopt yet! Add the adoption flow, saved on the server, and a page where everyone can see the adopted pets.

YOUR TASKS:

**Part 1: The form**

- Add a **nested** route `/pets/:petId/adopt` that shows `AdoptForm` (inside `PetsLayout`, so the header stays)
- In `PetDetails`, add an "Adopt Luna" button that goes there
  - HINT: try a **relative** link: `to="adopt"`. Where does it take you? Why?
- In `AdoptForm`, fetch the pet from the URL (`useParams` + `useFetch`) and show its name and emoji in the title
- If the pet doesn't exist (`/pets/999/adopt`), redirect to `/pets` with `<Navigate replace />`
- If the pet is already adopted, redirect to its page `/pets/:petId`

**Part 2: Save the adoption**

- On submit, send a `PATCH` request to `http://localhost:9000/pets/:petId` with:
  ```js
  { adopted: true, adopter, reason, adoptedAt: new Date().toISOString() }
  ```
  - `PATCH` updates only these fields, the rest of the pet stays the same
  - Disable the button while sending ("Sending...")
- In `PetDetails`, adopted pets show `🏡 Adopted by Sara` instead of the Adopt button
- In `PetCard`, adopted pets get the `adopted` class and a `🏡 Adopted` badge

**Part 3: Thank you page**

- After saving, go to `/thank-you` with `useNavigate`, and send the pet name and the adopter name in the **query string**:
  `/thank-you?pet=Luna&adopter=Sara`
  - HINT: `new URLSearchParams({ pet, adopter })` builds the string for you (and handles spaces!)
- Create a `ThankYou` page that reads `pet` and `adopter` with `useSearchParams`
- IMPORTANT: if someone types `/thank-you` directly (no query string), send them to `/` instead

**Part 4: Adoptions page**

- Add a route `/adoptions` and a NavLink "Adoptions" in the `Navbar`
- Fetch only adopted pets, newest first. json-server can do it for you:
  `/pets?adopted=true&_sort=adoptedAt&_order=desc`
- Show each pet with its emoji, name, who adopted it, the date and the reason. Each row links to the pet's page
- No adoptions yet? Show a message with a link to `/pets`

BONUS:

- After adopting, click the browser **back** button. You land on the form of a pet that's already adopted. What happens? Now try `navigate(url, { replace: true })` and compare
- Want to start over? Stop the server and reset `data/db.json` (or set `adopted` back to `false`)
