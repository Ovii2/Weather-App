const express = require('express');
const {
  getWeather,
  getCityInfo,
  getWeatherByCityLongTerm,
} = require('../controllers/weatherController');

const router = express.Router();

router.get('/', getWeather);
router.get('/:city', getCityInfo);
router.get('/:city/forecasts/long-term', getWeatherByCityLongTerm);

module.exports = router;
