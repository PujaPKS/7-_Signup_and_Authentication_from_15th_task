import { useContext } from 'react';
import { Link } from 'react-router-dom';

import AuthContext from '../../context/AuthContext';
import './MainNavigation.css';

const MainNavigation = () => {

  const authCtx = useContext(AuthContext);

  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <header className='header'>
      <Link to='/'>
        <div className='logo'>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
          
          {isLoggedIn && (
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
          )}
          
          {isLoggedIn && (
            <li>
              <Link to='/logout'>Logout</Link>
            </li>
          )}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
