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

export const getCityWeather = async (city) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/weather/${city}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching weather for ${city}:`, error);
    throw new Error(`Error fetching weather: ${error.message}`);
  }
};

export const getWeatherDataByCityLongTerm = async (city) => {
  try {
    const resp = await axios.get(`${BACKEND_URL}/weather/${city}/forecasts/long-term`);
    return resp.data;
  } catch (error) {
    throw new Error(`Error fetching all data: ${error.message}`);
  }
};
