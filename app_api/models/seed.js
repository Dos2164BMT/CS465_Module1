const mongoose = require('mongoose');
const Trip = require('./travlr');
const trips = require('../../app_server/data/trips.json');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = process.env.MONGODB_URI || `mongodb://${host}/travlr`;

const seedDatabase = async () => {
  try {
    await mongoose.connect(dbURI);
    await Trip.deleteMany({});
    const records = await Trip.insertMany(trips);
    console.log(`Loaded ${records.length} trips into the travlr database.`);
  } catch (error) {
    console.error('Database seed failed:', error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
