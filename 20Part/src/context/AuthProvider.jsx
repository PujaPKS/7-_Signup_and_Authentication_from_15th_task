import React, { useState } from 'react'
import AuthContext from './AuthContext';

const AuthProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const [token , setToken] = useState(initialToken);

    const userIsLoggedIn = !!token ; // true if token is not null or not empty string but false if it is null or empty string

    const loginHandler = (token) =>{
        setToken(token); // update the token state to the particular token passed to this function
        localStorage.setItem('token' , token); // store the token in local storage
    }

    const logoutHandler = () => {
        setToken(null); // cleared token that is set token to null to logout
        localStorage.removeItem('token'); // remove the token from local storage
    }

    const contextValue = {
        token : token ,
        isLoggedIn : userIsLoggedIn ,
        login : loginHandler ,
        logout : logoutHandler ,
    }

  return (
    <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;