import { createContext, useEffect, useState } from 'react';
import { getWeatherDataByCityLongTerm } from '../services/get';
import { toast } from 'react-toastify';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState('Vilnius');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city.trim()) {
        toast.warn('Please enter a valid city name');
        return;
      }
      setIsLoading(true);
      setError('');
      try {
        const data = await getWeatherDataByCityLongTerm(city);
        if (!data.forecastTimestamps || data.forecastTimestamps.length === 0) {
          throw new Error('City not found');
        }
        setWeather(data);
      } catch (error) {
        setError(error, 'Failed to fetch weather info.');
        toast.error('City not found');
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeatherData();
  }, [city]);
  return (
    <WeatherContext.Provider value={{ weather, isLoading, error, city, setCity }}>
      {children}
    </WeatherContext.Provider>
  );
};

WeatherContext.displayName = 'WeatherContext';

export default WeatherContext;
