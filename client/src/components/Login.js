import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route

const Login = () => {
  const initialState = {
    username: '',
    password: '',
  };

  const [loginCredentials, setLoginCredentials] = useState(initialState);

  const handleChange = () => {};

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>

      <form>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value=''
          onChange=''
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value=''
          onChange=''
        />
      </form>
    </>
  );
};

export default Login;
