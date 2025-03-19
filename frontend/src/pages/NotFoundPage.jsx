import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='not-found-container'>
      <h1>Page not found!</h1>
      <p className='message'>Sorry, the page you are looking for does not exist.</p>
      <Link className='not-found-link' to='/weather'>
        Back to home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
