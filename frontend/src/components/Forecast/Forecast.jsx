import { useContext } from 'react';
import WeatherContext from '../../context/WeatherContext';
import { format } from 'date-fns';
import './Forecast.scss';

const Forecast = () => {
  const { weather, weatherIcons } = useContext(WeatherContext);

  if (!weather || !weather.forecastTimestamps) return null;

  const groupedForecast = weather.forecastTimestamps.reduce((acc, forecast) => {
    const date = forecast.forecastTimeUtc.split(' ')[0];
    if (!acc[date]) {
      acc[date] = forecast;
    }
    return acc;
  }, {});

  const fiveDayForecast = Object.values(groupedForecast).slice(1, 6);

  return (
    <div className='forecast-container d-flex justify-content-center mt-4'>
      {fiveDayForecast.map((forecast, index) => (
        <div key={index} className='forecast-day text-center mx-2 p-2 shadow rounded bg-light'>
          <p className='fw-bold' style={{ fontSize: '1.5rem' }}>
            {format(new Date(forecast.forecastTimeUtc), 'EEE')}
          </p>
          <img
            src={weatherIcons[forecast.conditionCode]}
            alt={forecast.conditionCode}
            className='img-fluid w-50 mb-5'
          />
          <p style={{ fontSize: '1.5rem' }}>{forecast.airTemperature}°C</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
