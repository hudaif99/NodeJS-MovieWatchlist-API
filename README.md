# Movie Watchlist API

Base URL: `https://nodejs-moviewatchlist-api.onrender.com`

---

## Auth

### `POST /auth/register`
```json
{ "name": "John", "email": "john@example.com", "password": "secret123" }
```
Returns the created user and a JWT token.

### `POST /auth/login`
```json
{ "email": "john@example.com", "password": "secret123" }
```
Returns the user and a JWT token.

### `POST /auth/logout`
Clears the auth cookie. No body needed.

---

## Movies

### `GET /movies/get-movies`
Returns all movies. No auth required.

---

## Watchlist

> All watchlist routes require `Authorization: Bearer <token>`

### `POST /watchlist/add-to-watchlist`
```json
{
  "movieId": "uuid",
  "status": "PLANNED",
  "rating": 8,
  "notes": "optional"
}
```
`status` defaults to `PLANNED`. Options: `PLANNED` `WATCHING` `COMPLETED` `DROPPED`  
`rating` is an integer between 1–10.

### `PUT /watchlist/update-watchlist/:id`
Same fields as above, all optional. Only the owner can update.

### `DELETE /watchlist/remove-watchlist/:id`
Removes the item. Only the owner can delete.
