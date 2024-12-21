import React, { useCallback, useEffect, useState } from 'react'
import AuthContext from './AuthContext';

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjustedExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjustedExpirationTime - currentTime;

    return remainingDuration;
};

const retrivedStoreToken = () =>{
    const storedToken = localStorage.getItem('token');
    const storedExpirationTime = localStorage.getItem('expirationTime');
    
    const remainingTime = calculateRemainingTime(storedExpirationTime);

    if(remainingTime <= 3600) {
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        return null;
    }
    return{
        token: storedToken,
        duration: remainingTime,
    }
}

const AuthProvider = (props) => {

    const tokenData = retrivedStoreToken();

    // Retrieving token and timestamp from localStorage
    // const initialToken = localStorage.getItem('token');

    let initialToken;
    if(tokenData){
        initialToken = tokenData.token;
    }

    const [token , setToken] = useState(initialToken);

    const userIsLoggedIn = !!token ; // true if token is not null or not empty string but false if it is null or empty string

    const logoutHandler = useCallback(() => {
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');

        if(logoutTimer){
            clearTimeout(logoutTimer);
        }
    }, []);


    const loginHandler = (token, expirationTime) => {
        setToken(token);

        // Saved token in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('expirationTime', expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);  // logout happens after token expires as here remainingTime doesnt have any value so it will logout after 1 hour
    };

    useEffect(() => {
        if(tokenData){
            console.log(tokenData.duration);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

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