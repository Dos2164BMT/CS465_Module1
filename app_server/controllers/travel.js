const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
};

const travel = async (req, res) => {
  try {
    const response = await fetch(tripsEndpoint, options);

    if (!response.ok) {
      return res.status(response.status).render('error', {
        message: `Trip API returned HTTP ${response.status}`,
        error: {}
      });
    }

    const trips = await response.json();

    if (!Array.isArray(trips)) {
      return res.status(500).render('error', {
        message: 'Trip API returned data in an unexpected format.',
        error: {}
      });
    }

    if (trips.length === 0) {
      return res.status(404).render('error', {
        message: 'No trips were found.',
        error: {}
      });
    }

    return res.render('travel', {
      title: 'Travlr Getaways - Travel',
      activeTravel: true,
      trips
    });
  } catch (error) {
    return res.status(500).render('error', {
      message: `Unable to contact the Trip API: ${error.message}`,
      error: {}
    });
  }
};

module.exports = {
  travel
};
