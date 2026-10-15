# Challenge: Build the adoption flow

👨‍💼 The shelter manager is happy with the website, but people can't adopt yet! Add the adoption flow.

YOUR TASKS:

- Add a **nested** route `/pets/:petId/adopt` that shows `AdoptForm` (inside `PetsLayout`, so the header stays)
- In `PetDetails`, add an "Adopt Luna" button that goes there
  - HINT: try a **relative** link: `to="adopt"`. Where does it take you? Why?
- In `AdoptForm`, read the pet from the URL (`useParams`) and show its name and emoji in the title
- If the pet doesn't exist (`/pets/999/adopt`), redirect to `/pets` with `<Navigate replace />`
- On submit, go to `/thank-you` with `useNavigate`, and send the pet name and the adopter name in the **query string**:
  `/thank-you?pet=Luna&adopter=Sara`
  - HINT: `new URLSearchParams({ pet, adopter })` builds the string for you (and handles spaces!)
- Create a `ThankYou` page that reads `pet` and `adopter` with `useSearchParams`
- IMPORTANT: if someone types `/thank-you` directly (no query string), send them to `/` instead

BONUS:

- After adopting, click the browser **back** button. Where do you land? Now try `navigate(url, { replace: true })` and compare
