import { useContext } from 'react';
import WeatherContext from '../../context/WeatherContext';
import { postSelectedCity } from '../../services/post';

const MostViewedCities = () => {
  const { setCity, mostViewedCities, updateMostViewedCities } = useContext(WeatherContext);

  const handleClick = async (selectedCity) => {
    updateMostViewedCities(selectedCity);
    setCity(selectedCity);
    await postSelectedCity(selectedCity);
  };

  if (!mostViewedCities?.length) return null;

  return (
    <div className='d-flex gap-2 justify-content-center mt-3 flex-wrap'>
      {mostViewedCities.map((city, idx) => (
        <button key={idx} className='btn btn-outline-primary' onClick={() => handleClick(city)}>
          {city}
        </button>
      ))}
    </div>
  );
};

export default MostViewedCities;
