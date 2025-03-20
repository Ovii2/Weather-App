const express = require('express');
const {
  getWeather,
  getWeatherByCityLongTerm,
} = require('../controllers/weatherController');

const router = express.Router();

router.get('/', getWeather);
router.get('/:city/forecasts/long-term', getWeatherByCityLongTerm);

module.exports = router;
