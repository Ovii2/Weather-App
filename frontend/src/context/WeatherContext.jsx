import { createContext, useEffect, useState } from 'react';
import { getWeatherDataByCityLongTerm } from '../services/get';
import { toast } from 'react-toastify';

const WeatherContext = createContext();
const selectedCity = localStorage.getItem('selectedCity') || 'Vilnius';

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(selectedCity);
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
        if (!data?.forecastTimestamps?.length) {
          throw new Error('City not found');
        }
        setWeather(data);
      } catch (error) {
        setError('Failed to fetch weather info.');
        toast.error('City not found');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, [city]);

  useEffect(() => {
    localStorage.setItem('selectedCity', city);
  }, [city]);

  return (
    <WeatherContext.Provider value={{ weather, isLoading, error, city, setCity }}>
      {children}
    </WeatherContext.Provider>
  );
};

WeatherContext.displayName = 'WeatherContext';

export default WeatherContext;
