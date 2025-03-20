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

module.exports = { getWeather, getWeatherByCityLongTerm };
