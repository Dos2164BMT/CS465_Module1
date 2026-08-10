const mongoose = require('mongoose');
const readline = require('readline');

const host = process.env.DB_HOST || '127.0.0.1';
const dbURI = process.env.MONGODB_URI || `mongodb://${host}/travlr`;

const connect = () => {
  setTimeout(() => {
    mongoose.connect(dbURI).catch((error) => {
      console.error('Initial Mongoose connection failed:', error.message);
    });
  }, 1000);
};

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});

mongoose.connection.on('error', (error) => {
  console.error('Mongoose connection error:', error.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

if (process.platform === 'win32') {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.on('SIGINT', () => process.emit('SIGINT'));
}

const gracefulShutdown = async (message) => {
  await mongoose.connection.close();
  console.log(`Mongoose disconnected through ${message}`);
};

process.once('SIGUSR2', async () => {
  await gracefulShutdown('nodemon restart');
  process.kill(process.pid, 'SIGUSR2');
});

process.once('SIGINT', async () => {
  await gracefulShutdown('application termination');
  process.exit(0);
});

process.once('SIGTERM', async () => {
  await gracefulShutdown('application shutdown');
  process.exit(0);
});

connect();
require('./travlr');

module.exports = mongoose;
