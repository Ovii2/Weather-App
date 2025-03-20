import { useContext, useState } from 'react';
import WeatherContext from '../context/WeatherContext';

const SeachBar = () => {
  const { setCity } = useContext(WeatherContext);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className=''>
      <input
        type='text'
        name=''
        id=''
        placeholder='Enter city name'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => (e.key === 'Enter' ? setCity(inputValue.trim()) : null)}
      />
    </div>
  );
};

export default SeachBar;
