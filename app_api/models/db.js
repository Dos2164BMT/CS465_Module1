const mongoose = require('mongoose');

const dbHost = process.env.DB_HOST || '127.0.0.1';
const dbName = process.env.DB_NAME || 'travlr';
const dbURI = process.env.MONGODB_URI || `mongodb://${dbHost}:27017/${dbName}`;

mongoose.connect(dbURI);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbName}`);
});

mongoose.connection.on('error', (error) => {
  console.error(`Mongoose connection error: ${error.message}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

const gracefulShutdown = async (message) => {
  await mongoose.connection.close();
  console.log(`Mongoose disconnected through ${message}`);
};

process.once('SIGINT', async () => {
  await gracefulShutdown('application termination');
  process.exit(0);
});

process.once('SIGTERM', async () => {
  await gracefulShutdown('application shutdown');
  process.exit(0);
});

require('./trip');

module.exports = mongoose.connection;
