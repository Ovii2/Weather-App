import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className='d-flex flex-column flex-grow-1 justify-content-center align-items-center mt-5 text-center'>
      <h1>Page not found!</h1>
      <p className='message'>Sorry, the page you are looking for does not exist.</p>
      <Link className='btn btn-primary mt-3' to='/weather'>
        Back to Home Page
      </Link>
    </div>
  );
};

export default NotFoundPage;
