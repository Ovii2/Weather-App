const axios = require('axios');

const BASE_URL = 'https://api.meteo.lt/v1/places';

const getWeather = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

const getWeatherByCityLongTerm = async (req, res) => {
  const { city } = req.params;
  try {
    const response = await axios.get(`${BASE_URL}/${city}/forecasts/long-term`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch ${city} weather long term data` });
  }
};

const logSelectedCity = (req, res) => {
  const { city } = req.params;

  if (!city || typeof city !== 'string') {
    return res.status(400).json({ error: 'City is required and must be a string.' });
  }

  const now = new Date().toISOString().replace('T', ' ').split('.')[0];
  console.log(`\x1b[36m[${now}] City selected: ${decodeURIComponent(city)}\x1b[0m`);

  return res.status(200).json({ message: `City "${city}" selection logged successfully.` });
};

module.exports = { getWeather, getWeatherByCityLongTerm, logSelectedCity };
