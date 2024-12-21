import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './context/AuthContext';

function App() {

  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<HomePage />} />
        {!authCtx.isLoggedIn &&(//if user is not logged in then only auth page will be visible
          <Route path='/auth' element={<AuthPage />} />
        )}
        
        {/* {authCtx.isLoggedIn &&(  //if user is logged in then only profile page will come
          <Route path='/profile' element={<UserProfile />} />
        )}

        <Route path='*' element={<Navigate to='/' replace />} /> */}

        {/* If user is logged in then only profile page will be visible  else auth page will be visible */}
        <Route
          path='/profile'
          element={
            authCtx.isLoggedIn ? <UserProfile /> : <Navigate to='/auth' replace />
          }
        />

        <Route path='*' element={<Navigate to='/' replace />} />

      </Routes>

    </Layout>
  );
}

export default App;
