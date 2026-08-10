const Trip = require('./travlr');
const trips = require('../../app_server/data/trips.json');

const errors = [];

trips.forEach((trip, index) => {
  const validationError = new Trip(trip).validateSync();
  if (validationError) {
    errors.push(`Record ${index + 1}: ${validationError.message}`);
  }
});

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${trips.length} trip records successfully.`);
