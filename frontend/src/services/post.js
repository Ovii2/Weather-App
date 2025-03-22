import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const postSelectedCity = async (city) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/weather/log/${encodeURIComponent(city)}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to log city: ${error.message}`);
  }
};
