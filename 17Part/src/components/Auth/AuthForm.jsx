import { useState, useRef, useContext } from 'react';

import './AuthForm.css';
import AuthContext from '../../context/AuthContext';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    //optional: Add Validation

    let url;
    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAwU5zxtzpVyUmBs3_cIVt7rlHwM-mARzc';
    }
    else{
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAwU5zxtzpVyUmBs3_cIVt7rlHwM-mARzc';
    }
    fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    .then((res) => {
      setIsLoading(false);
      if(res.ok){
        //...
        return res.json();
      }
      else{
        return res.json() .then(data => {
          // //show an error modal
          // console.log(data);
          let errorMesssage = 'Authentication Failed!';
          // if(data && data.error && data.error.message){
          //   errorMesssage = data.error.message;
          // }
          // alert(errorMesssage);
          throw new Error(errorMesssage);
        })
      }
    })
    .then((data) => {
      // console.log(data);
      authCtx.login(data.idToken);
    })
    .catch(err =>{
      alert(err.message)
    });
  }

  return (
    <section className= 'auth'>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className='control'>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className='control'>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordInputRef}/>
        </div>
        <div className='actions'>
          {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {isLoading && <p>Sending Request...</p>}
          <button
            type='button'
            className='toggle'
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
