const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');
const travelController = require('../controllers/travel');

router.get('/', mainController.index);
router.get('/travel', travelController.travel);
router.get('/travel.html', (req, res) => res.redirect(301, '/travel'));

module.exports = router;
