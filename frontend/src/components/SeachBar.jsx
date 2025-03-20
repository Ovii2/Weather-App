import { useContext, useEffect, useState } from 'react';
import WeatherContext from '../context/WeatherContext';
import Select from 'react-select';
import { getAvailableCities } from '../services/get';

const SearchBar = () => {
  const { setCity } = useContext(WeatherContext);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const cityList = await getAvailableCities();
        const formattedCities = cityList.map((city) => ({
          value: city,
          label: city,
        }));
        setCities(formattedCities);
      } catch (error) {
        throw new Error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
    setCity(selectedOption.value);
  };

  return (
    <div className='d-flex justify-content-center mt-3'>
      <Select
        options={cities}
        value={selectedCity}
        onChange={handleCityChange}
        placeholder='Select or search city...'
        isSearchable
        styles={{
          control: (provided) => ({
            ...provided,
            width: 250,
            fontSize: '1rem',
          }),
        }}
      />
    </div>
  );
};

export default SearchBar;
