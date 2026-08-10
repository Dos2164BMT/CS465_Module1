# Travlr Getaways — CS 465 Module Six

This project adds a Bootstrap-styled Angular administrative SPA to the existing
Express/MongoDB customer website. The Angular UI uses reusable trip list, trip
card, and trip form components plus a shared data service. All changes flow
through REST endpoints backed by the same MongoDB trip collection displayed by
the Express `/travel` page.

## Project structure

- `app_admin/` — Angular SPA generated with Angular CLI
- `app_admin/src/app/components/trip-list/` — retrieves and displays all trips
- `app_admin/src/app/components/trip-card/` — reusable trip presentation and actions
- `app_admin/src/app/components/trip-form/` — add and edit form
- `app_admin/src/app/services/trip-data.ts` — Angular HttpClient API service
- `app_api/` — Mongoose model and Express CRUD controllers/routes
- `app_server/` — customer-facing Express/Handlebars website
- `tests/Travlr_Module6.postman_collection.json` — GET/POST/PUT/DELETE requests

## Install, seed, and run

MongoDB must be running locally. From the `travlr` folder:

```bash
npm install
npm --prefix app_admin install
npm run validate:data
npm run seed
npm start
```

In a second terminal:

```bash
npm run start:admin
```

Open the Angular admin at `http://localhost:4200`. Open the Express customer
website at `http://localhost:3000/travel`.

## REST endpoints

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/trips` | Retrieve all trips |
| GET | `/api/trips/:tripCode` | Retrieve one trip |
| POST | `/api/trips` | Add a trip |
| PUT | `/api/trips/:tripCode` | Update a trip |
| DELETE | `/api/trips/:tripCode` | Delete a trip |

## Browser and Postman testing

1. Import `tests/Travlr_Module6.postman_collection.json` and run the requests in order.
2. In Angular, add a new trip and capture the card listing screenshot.
3. Open the trip's Edit screen and capture the edit screenshot.
4. Change the trip name or price, save it, and capture the updated card screenshot.
5. Refresh `http://localhost:3000/travel` and confirm the same new/updated trip appears.
6. Run `npm test` and `npm run build:admin` before submission.
