import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileForm.css';
import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

const ProfileForm = () => {
  const navigate = useNavigate();

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    //Add validation

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAwU5zxtzpVyUmBs3_cIVt7rlHwM-mARzc', {
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }) .then((res) => {
      //Assumed : Always succeed
      navigate('/', { replace: true }); // redirect user to home page without pressing any button or back button
      
    });

  }

  return (
    <form className='form' onSubmit={submitHandler}>
      <div className='control'>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className='action'>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
