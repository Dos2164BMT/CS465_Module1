const Trip = require('../models/trip');

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).sort({ code: 1 }).lean().exec();
    return res.status(200).json(trips);
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to retrieve trips',
      error: error.message
    });
  }
};

const tripsFindByCode = async (req, res) => {
  try {
    const trip = await Trip.findOne({
      code: req.params.tripCode.toUpperCase()
    })
      .lean()
      .exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(200).json(trip);
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to retrieve trip',
      error: error.message
    });
  }
};

module.exports = {
  tripsList,
  tripsFindByCode
};
