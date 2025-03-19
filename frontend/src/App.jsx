import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import NotFoundPage from './pages/NotFoundPage';
import WeatherPage from './pages/WeatherPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/weather' element={<WeatherPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
