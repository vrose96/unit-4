import React, { useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../store/authContext';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(true);
  const { dispatch } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      if (register) {
        // Register
        await axios.post('/register', { username, password });
        console.log('Registration successful!');
      } else {
        // Login
        const response = await axios.post('/login', { username, password });
        const token = response.data.token;

        // Store token in local storage or context for future requests
        localStorage.setItem('token', token);
        dispatch({ type: 'LOGIN', payload: { token } });

        console.log('Login successful!');
      }
    } catch (error) {
      console.error('Authentication error:', error.message);
    }
  };

  return (
    <main>
      <h1>Welcome!</h1>
      <form className="form auth-form" onSubmit={submitHandler}>
        <input
          className="form-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="form-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="form-btn">{register ? 'Sign Up' : 'Login'}</button>
      </form>
      <button className="form-btn" onClick={() => setRegister(!register)}>
        Need to {register ? 'Login' : 'Sign Up'}?
      </button>
    </main>
  );
};

export default Auth;
