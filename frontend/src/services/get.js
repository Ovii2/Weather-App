import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getAllWeatherData = async () => {
  try {
    const resp = await axios.get(`${BACKEND_URL}/weather`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};

export const getWeatherDataByCityLongTerm = async (city) => {
  try {
    const formattedCity = city.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    const response = await fetch(`${BACKEND_URL}/weather/${formattedCity}/forecasts/long-term`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching weather data: ${error.message}`);
  }
};

export const getAvailableCities = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/weather`);
    if (!response.ok) {
      throw new Error('Failed to fetch city names');
    }
    const data = await response.json();
    const filteredCities = data.filter(
      (city) => city.countryCode !== 'RU' && city.countryCode !== 'BY'
    );
    return filteredCities.map((city) => city.name);
  } catch (error) {
    throw new Error(`Error fetching cities: ${error.message}`);
  }
};
