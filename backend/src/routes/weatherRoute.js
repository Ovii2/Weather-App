const express = require('express');
const {
  getWeather,
  getWeatherByCityLongTerm,
  logSelectedCity,
} = require('../controllers/weatherController');

const router = express.Router();

router.get('/', getWeather);
router.get('/:city/forecasts/long-term', getWeatherByCityLongTerm);
router.post('/log/:city', logSelectedCity);

module.exports = router;
