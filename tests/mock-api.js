const express = require('express');
const path = require('path');
const seedTrips = require('../app_server/data/trips.json');

const app = express();
let trips = seedTrips.map((trip) => ({ ...trip }));

app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '..', 'public', 'images')));
app.get('/travel', (req, res) => res.send('<h1>Travlr customer website test route</h1>'));
app.get('/api/trips', (req, res) => res.json(trips));
app.get('/api/trips/:code', (req, res) => {
  const trip = trips.find((item) => item.code === req.params.code.toUpperCase());
  return trip ? res.json(trip) : res.status(404).json({ message: 'Trip not found.' });
});
app.post('/api/trips', (req, res) => {
  const trip = { ...req.body, code: String(req.body.code).toUpperCase() };
  trips.push(trip);
  return res.status(201).json(trip);
});
app.put('/api/trips/:code', (req, res) => {
  const index = trips.findIndex((item) => item.code === req.params.code.toUpperCase());
  if (index < 0) return res.status(404).json({ message: 'Trip not found.' });
  trips[index] = { ...req.body, code: req.params.code.toUpperCase() };
  return res.json(trips[index]);
});
app.delete('/api/trips/:code', (req, res) => {
  trips = trips.filter((item) => item.code !== req.params.code.toUpperCase());
  return res.status(204).send();
});

app.listen(3000, () => console.log('Mock API listening on http://localhost:3000'));
