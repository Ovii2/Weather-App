import { useEffect, useState } from 'react';
import { getWeatherDataByCityLongTerm } from '../services/get';
import cloudy from '../assets/cloudy.png';
import sunny from '../assets/sunny.png';
import lightRain from '../assets/lightRain.png';

const Card = ({ city }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true);
      try {
        const data = await getWeatherDataByCityLongTerm(city);
        setWeather(data);
      } catch (error) {
        setError('Failed to fetch weather info.');
        console.error('Error fetching weather info:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWeatherData();
  }, [city]);

  const formatDateToApiFormat = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const nowUtc = new Date();
  const nowFormatted = formatDateToApiFormat(nowUtc);

  const closestForecast = weather.forecastTimestamps?.find(
    (forecast) => forecast.forecastTimeUtc >= nowFormatted
  );

  const getWeatherImage = () => {
    if (!closestForecast) return cloudy;
    const condition = closestForecast.conditionCode;

    if (condition.includes('cloudy')) return cloudy;
    if (condition.includes('clear')) return sunny;
    if (condition.includes('light-rain')) return lightRain;
    return cloudy;
  };

  return (
    <div className='card' style={{ border: 'none', backgroundColor: 'transparent' }}>
      <div className='card-body'>
        {isLoading ? (
          <h2 className='card-title'>Loading...</h2>
        ) : error ? (
          <p className='error'>{error}</p>
        ) : (
          <>
            <div className='card-title d-flex flex-column align-items-center gap-1'>
              <h2 className='card-name'>
                {weather.place?.name}, {weather.place?.country}
              </h2>
              <h3 className='card-date'>{weather.forecastCreationTimeUtc?.split(' ')[0]}</h3>
            </div>
            {closestForecast ? (
              <>
                <div className='d-flex gap-2'>
                  <div className='card-image'>
                    <img
                      src={getWeatherImage()}
                      alt='Weather condition'
                      style={{ width: '10rem', height: '10rem' }}
                    />
                  </div>
                  <div className='me-5'>
                    <p className='card-temperature d-flex g-1' style={{ fontSize: '6rem' }}>
                      {closestForecast.airTemperature} <span style={{ fontSize: '2rem' }}>°C</span>{' '}
                    </p>
                    <p className='card-feels-like'>
                      Feels like {closestForecast.feelsLikeTemperature}°C
                    </p>
                  </div>
                  <div className='card-info d-flex gap-5'>
                    <div className='left-side-info'>
                      <p className='wind-speed'>Wind speed {closestForecast.windSpeed} m/s</p>
                      <p className='humidity'>Humidity {closestForecast.relativeHumidity} %</p>
                      <p className='cloud-cover'>Cloud cover {closestForecast.cloudCover} %</p>
                    </div>
                    <div className='right-side-info'>
                      <p className='wind-speed'>Wind gust {closestForecast.windGust} m/s</p>
                      <p className='humidity'>
                        Sea level pressure {closestForecast.seaLevelPressure} hpA
                      </p>
                      <p className='cloud-cover'>
                        Precipation {closestForecast.totalPrecipitation} mm
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <p>No forecast data available</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
