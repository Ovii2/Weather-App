import './App.css';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
