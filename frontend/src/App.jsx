import { Route, Routes, Navigate } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import NotFoundPage from './pages/NotFoundPage';
import WeatherPage from './pages/WeatherPage';
import { Flip, ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <ToastContainer autoClose={1000} position='top-center' transition={Flip} />
      <Header />
      <main className='flex-grow-1'>
        <Routes>
          <Route path='/' element={<Navigate to='/weather' />} />
          <Route path='/weather' element={<WeatherPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
