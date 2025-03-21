import { createContext, useEffect, useState } from 'react';
import { getWeatherDataByCityLongTerm } from '../services/get';
import { toast } from 'react-toastify';
import cloudy from '../assets/forecast/cloudy.png';
import cloudyWithSunnyIntervals from '../assets/forecast/cloudyWithSunnyIntervals.png';
import clear from '../assets/forecast/clear.png';
import lightRain from '../assets/forecast/lightRain.png';
import heavyRain from '../assets/forecast/heavyRain.png';
import rain from '../assets/forecast/rain.png';
import partlyCloudy from '../assets/forecast/partlyCloudy.png';
import thunder from '../assets/forecast/thunder.png';
import sleet from '../assets/forecast/sleet.png';
import snow from '../assets/forecast/snow.png';
import heavySnow from '../assets/forecast/heavySnow.png';
import fog from '../assets/forecast/fog.png';
import hail from '../assets/forecast/hail.png';

const WeatherContext = createContext();
const selectedCity = localStorage.getItem('selectedCity') || 'Vilnius';

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(selectedCity);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [weather, setWeather] = useState({});

  const defaultCities = ['Vilnius', 'Kaunas', 'Klaipėda'];

  let storedCities = JSON.parse(localStorage.getItem('mostViewedCities')) || defaultCities;
  const [mostViewedCities, setMostViewedCities] = useState(storedCities);

  const weatherIcons = {
    clear: clear,
    'partly-cloudy': partlyCloudy,
    'cloudy-with-sunny-intervals': cloudyWithSunnyIntervals,
    cloudy: cloudy,
    'light-rain': lightRain,
    rain: rain,
    'heavy-rain': heavyRain,
    thunder: thunder,
    'isolated-thunderstorms': thunder,
    thunderstorms: thunder,
    'heavy-rain-with-thunderstorms': thunder,
    'light-sleet': sleet,
    sleet: sleet,
    'freezing-rain': sleet,
    hail: hail,
    'light-snow': snow,
    snow: snow,
    'heavy-snow': heavySnow,
    fog: fog,
    default: cloudy,
  };

  const updateMostViewedCities = (newCity) => {
    let updated = mostViewedCities.filter((c) => c !== newCity);
    updated.unshift(newCity);
    if (updated.length > 3) updated = updated.slice(0, 3);
    localStorage.setItem('mostViewedCities', JSON.stringify(updated));
    setMostViewedCities(updated);
  };

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
    <WeatherContext.Provider
      value={{
        weather,
        isLoading,
        error,
        city,
        setCity,
        weatherIcons,
        mostViewedCities,
        updateMostViewedCities,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

WeatherContext.displayName = 'WeatherContext';

export default WeatherContext;
