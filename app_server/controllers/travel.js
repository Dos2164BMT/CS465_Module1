const Trip = require('../../app_api/models/trip');

const travel = async (req, res, next) => {
  try {
    const trips = await Trip.find({}).sort({ code: 1 }).lean().exec();

    return res.render('travel', {
      title: 'Travlr Getaways - Travel',
      activeTravel: true,
      trips
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  travel
};
