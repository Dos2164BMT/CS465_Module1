const fs = require('fs');
const path = require('path');
const Trip = require('../models/trip');

const tripsPath = path.join(__dirname, 'trips.json');
const trips = JSON.parse(fs.readFileSync(tripsPath, 'utf8'));

const validateTrips = async () => {
  const seenCodes = new Set();

  for (const tripData of trips) {
    const trip = new Trip(tripData);
    await trip.validate();

    if (seenCodes.has(trip.code)) {
      throw new Error(`Duplicate trip code found: ${trip.code}`);
    }
    seenCodes.add(trip.code);
  }

  console.log(`Validated ${trips.length} trip records successfully.`);
};

validateTrips().catch((error) => {
  console.error(`Trip data validation failed: ${error.message}`);
  process.exit(1);
});
