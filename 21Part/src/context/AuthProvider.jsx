import React, { useEffect, useState } from 'react'
import AuthContext from './AuthContext';

const AuthProvider = (props) => {

    // Retrieving token and timestamp from localStorage
    const initialToken = localStorage.getItem('token');
    const storedLoginTime = localStorage.getItem('loginTime');

    const [token , setToken] = useState(initialToken);

    const userIsLoggedIn = !!token ; // true if token is not null or not empty string but false if it is null or empty string

    // Checking if the token is still valid after 5 minutes (5 minutes = 300,000 ms)
    const isTokenExpired = () => {
        const currentTime = new Date().getTime();

        // return storedLoginTime && currentTime - storedLoginTime > 5 * 60 * 1000; // elaborated this line to make it more readable
        
        if (!storedLoginTime) { // if there is no stored login time, the token is not expired
            return false; // No login time, so the token is valid or user isn't logged in.
        }
          
        const elapsedTime = currentTime - storedLoginTime; // Calculated time difference
        const tokenExpiryTime = 5 * 60 * 1000; // 5 minutes in milliseconds
          
        if (elapsedTime > tokenExpiryTime) {
            return true; // Token has expired
        }
          
        return false; // Token is still valid
          
    };

    // If token has expired, cleared it from logged in page that is logged out the user
    useEffect(() => {
        if (isTokenExpired()) { // if token has expired
            logoutHandler();
        } else {
            // Set auto logout timer for the remaining time
            const remainingTime = 5 * 60 * 1000 - (new Date().getTime() - storedLoginTime);
            setAutoLogout(remainingTime);
        }
    }, []);

    // Auto logout function
    const setAutoLogout = (duration) => {
        setTimeout(() => {
            logoutHandler();
        }, duration);
    };

    const loginHandler = (token) => {
        const loginTime = new Date().getTime(); // Current timestamp
        setToken(token);

        // Saved token and login time in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('loginTime', loginTime);

        // Set auto logout timer for 5 minutes
        setAutoLogout(5 * 60 * 1000);
    };

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('loginTime');
    };

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