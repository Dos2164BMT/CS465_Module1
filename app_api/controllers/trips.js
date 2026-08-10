const Trip = require('../models/travlr');

// GET /api/trips - return the complete trip collection.
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).sort({ code: 1 }).exec();
    return res.status(200).json(trips);
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to retrieve trips.',
      error: error.message
    });
  }
};

// POST /api/trips - create a trip from the Angular add form.
const tripsAddTrip = async (req, res) => {
  const payload = normalizeTrip(req.body);
  if (!hasRequiredFields(payload)) {
    return res.status(400).json({ message: 'All trip fields are required.' });
  }
  try {
    const existingTrip = await Trip.findOne({ code: payload.code }).exec();
    if (existingTrip) {
      return res.status(409).json({ message: `Trip ${payload.code} already exists.` });
    }
    const trip = await Trip.create(payload);
    return res.status(201).json(trip);
  } catch (error) {
    return res.status(400).json({ message: 'Unable to create the trip.', error: error.message });
  }
};

// PUT /api/trips/:tripCode - update the selected trip.
const tripsUpdateTrip = async (req, res) => {
  const tripCode = String(req.params.tripCode || '').trim().toUpperCase();
  const payload = normalizeTrip({ ...req.body, code: tripCode });
  if (!tripCode || !hasRequiredFields(payload)) {
    return res.status(400).json({ message: 'A trip code and all trip fields are required.' });
  }
  try {
    const trip = await Trip.findOneAndUpdate(
      { code: tripCode }, payload, { new: true, runValidators: true }
    ).exec();
    if (!trip) {
      return res.status(404).json({ message: `Trip ${tripCode} was not found.` });
    }
    return res.status(200).json(trip);
  } catch (error) {
    return res.status(400).json({ message: `Unable to update trip ${tripCode}.`, error: error.message });
  }
};

// DELETE /api/trips/:tripCode - remove the selected trip.
const tripsDeleteTrip = async (req, res) => {
  const tripCode = String(req.params.tripCode || '').trim().toUpperCase();
  if (!tripCode) {
    return res.status(400).json({ message: 'A trip code is required.' });
  }
  try {
    const trip = await Trip.findOneAndDelete({ code: tripCode }).exec();
    if (!trip) {
      return res.status(404).json({ message: `Trip ${tripCode} was not found.` });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: `Unable to delete trip ${tripCode}.`, error: error.message });
  }
};

const normalizeTrip = (source = {}) => ({
  code: String(source.code || '').trim().toUpperCase(),
  name: String(source.name || '').trim(),
  length: String(source.length || '').trim(),
  start: source.start,
  resort: String(source.resort || '').trim(),
  perPerson: String(source.perPerson || '').trim(),
  image: String(source.image || '').trim(),
  description: String(source.description || '').trim()
});

const hasRequiredFields = (trip) =>
  trip.code && trip.name && trip.length && trip.start && trip.resort &&
  trip.perPerson && trip.image && trip.description;

// GET /api/trips/:tripCode - return one trip selected with Mongoose findOne.
const tripsFindByCode = async (req, res) => {
  const tripCode = String(req.params.tripCode || '').trim().toUpperCase();

  if (!tripCode) {
    return res.status(400).json({ message: 'A trip code is required.' });
  }

  try {
    const trip = await Trip.findOne({ code: tripCode }).exec();

    if (!trip) {
      return res.status(404).json({
        message: `Trip ${tripCode} was not found.`
      });
    }

    return res.status(200).json(trip);
  } catch (error) {
    return res.status(500).json({
      message: `Unable to retrieve trip ${tripCode}.`,
      error: error.message
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
  tripsDeleteTrip
};
