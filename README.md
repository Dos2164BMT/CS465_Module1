# Travlr Getaways — CS 465 Module Four

This submission adds MongoDB and Mongoose to the Express/HBS Travlr Getaways
application. It defines a validated Trip model, provides a JSON API, and
includes repeatable sample-data loading and verification steps.

## Project structure

- `app_server/controllers/main.js` renders the HBS home page.
- `app_server/controllers/travel.js` retrieves live trip documents through the
  Mongoose model and passes them to the HBS view.
- `app_server/routes/index.js` maps `/` and `/travel` to their controllers.
- `app_server/views/layout.hbs` contains the shared customer-facing layout.
- `app_server/views/index.hbs` and `travel.hbs` contain page-specific markup.
- `app_api/models/db.js` connects Mongoose to the `travlr` MongoDB database.
- `app_api/models/trip.js` defines and validates the Trip schema.
- `app_api/controllers/trips.js` retrieves trip documents as JSON.
- `app_api/routes/index.js` exposes `/api/trips` and `/api/trips/:tripCode`.
- `app_api/data/trips.json` contains the three required sample trips.
- `app_api/data/seed.js` loads the sample records into the `trips` collection.

## Install and validate the data

```bash
npm install
npm run validate:data
```

The validation command checks all records against the Mongoose schema without
requiring MongoDB.

## Populate MongoDB

Start MongoDB locally, then run:

```bash
npm run seed
```

By default, the application connects to
`mongodb://127.0.0.1:27017/travlr`. A different connection may be supplied with
the `MONGODB_URI` environment variable.

## Run the application

```bash
npm start
```

Open:

- `http://localhost:3000/` for Home
- `http://localhost:3000/travel` for the customer Travel page
- `http://localhost:3000/api/trips` for all trips as JSON
- `http://localhost:3000/api/trips/GALR` for one trip by code

Run all commands from this `travlr` folder.

## Database inspection test

After running the seed command, inspect the database with MongoDB Compass:

1. Connect to `mongodb://127.0.0.1:27017`.
2. Open the `travlr` database.
3. Open the `trips` collection.
4. Verify that three documents exist with codes `GALR`, `DAWR`, and `CLAR`.
5. Start the application and verify that `/api/trips` returns the same three
   records in JSON format.

The seed command clears and reloads only the `trips` collection, making the
test repeatable.
