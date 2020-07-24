import React, { useState } from 'react';
import axios from 'axios';

// make a post request to retrieve a token from the api
// when you have handled the token, navigate to the BubblePage route

const Login = (props) => {
  const initialState = {
    username: '',
    password: '',
  };

  const [loginCredentials, setLoginCredentials] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:5000/api/login', loginCredentials)
      .then((res) => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubbles');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (e) => {
    setLoginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={loginCredentials.username}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={loginCredentials.password}
          onChange={handleChange}
        />

        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
