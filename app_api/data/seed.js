const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Trip = require('../models/trip');

const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbName = process.env.DB_NAME || 'travlr';
const dbURI = process.env.MONGODB_URI || `mongodb://${dbHost}:27017/${dbName}`;

const seedDatabase = async () => {
  const tripsPath = path.join(__dirname, 'trips.json');
  const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

  await mongoose.connect(dbURI);
  await Trip.deleteMany({});
  const insertedTrips = await Trip.insertMany(trips);

  console.log(`Loaded ${insertedTrips.length} trips into ${dbName}.trips`);
  await mongoose.connection.close();
};

seedDatabase().catch(async (error) => {
  console.error(`Database seed failed: ${error.message}`);
  await mongoose.connection.close();
  process.exit(1);
});
