import Card from '../components/Card';
import SeachBar from '../components/SeachBar';

const WeatherPage = () => {
  return (
    <>
      <div className='d-flex flex-column align-items-center'>
        <SeachBar className='w-50 text-center' />
      </div>
      <Card city='Vilnius' />
    </>
  );
};

export default WeatherPage;
