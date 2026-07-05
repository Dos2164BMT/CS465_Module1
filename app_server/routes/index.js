var express = require('express');
var router = express.Router();

var travelController = require('../controllers/travel');

router.get('/', travelController.home);
router.get('/travel', travelController.travel);

module.exports = router;