const Header = () => {
  return (
    <header className='container-fluid text-white py-3 mb-3' style={{ backgroundColor: '#5995d0' }}>
      <nav className='navbar navbar-expand-lg container'>
        <a className='navbar-brand text-white fw-bold' href='/weather'>
          🌤️ Weather App
        </a>
      </nav>
    </header>
  );
};

export default Header;
