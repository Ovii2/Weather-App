import Card from '../components/Card/Card';
import Forecast from '../components/Forecast/Forecast';
import MostViewedCities from '../components/MostViewedCities/MostViewedCities';
import SeachBar from '../components/SeachBar';

const WeatherPage = () => {
  return (
    <>
      <div className='d-flex flex-column align-items-center'>
        <SeachBar className='w-50 text-center' />
        <MostViewedCities />
      </div>
      <Card />
      <Forecast />
    </>
  );
};

export default WeatherPage;
