# The Local Board — React frontend

This is the React version of "The Local Board" design, wired with client-side routing
and real component state (cart quantities, filters, tabs) so it's ready to connect
to a Spring Boot backend instead of being static HTML.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Pages

| Route          | File                          | What it shows                                   |
|----------------|-------------------------------|--------------------------------------------------|
| `/`            | `src/pages/Landing.jsx`       | Marketing landing page                            |
| `/shop`        | `src/pages/Shop.jsx`          | Listing grid with working category/price filters  |
| `/product/:id` | `src/pages/ProductDetail.jsx` | Product detail with live quantity + price calc    |
| `/cart`        | `src/pages/Cart.jsx`          | Basket with quantity steppers, live totals        |
| `/dashboard`   | `src/pages/Dashboard.jsx`     | Farmer console — sales chart, listings, advisory  |
| `/login`       | `src/pages/Auth.jsx`          | Sign in / sign up with buyer-vs-farmer role toggle|

## Where the fake data lives

`src/data/listings.js` holds the sample product data. In the real app, delete this file
and instead fetch from your Spring Boot API, e.g.:

```jsx
// src/api/client.js
const BASE_URL = 'http://localhost:8080/api'

export async function getListings() {
  const res = await fetch(`${BASE_URL}/listings`)
  if (!res.ok) throw new Error('Failed to load listings')
  return res.json()
}
```

Then in `Shop.jsx`, replace the static import with:

```jsx
import { useEffect, useState } from 'react'
import { getListings } from '../api/client.js'

const [listings, setListings] = useState([])
useEffect(() => {
  getListings().then(setListings).catch(console.error)
}, [])
```

## Suggested next additions

- Add a `src/context/CartContext.jsx` (React Context) so the cart persists across
  pages instead of resetting — right now `Cart.jsx` uses local dummy state.
- Add `src/context/AuthContext.jsx` to store the JWT after login and attach it to
  API requests (`Authorization: Bearer <token>`).
- Enable CORS on your Spring Boot backend for `http://localhost:5173` during development.
- Once the backend is live, swap every hardcoded array (`listings.js`, `myListings`,
  `salesByDay`) for a real fetch call.
