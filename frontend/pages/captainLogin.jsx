import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainContext } from '../src/context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { captain, setCaptain } = useContext(CaptainContext);
  const navigate = useNavigate();

  const submitHandler = async(e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password
    };
    try {
      console.log('Submitting form...');
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain);
      console.log('Response received:', response);
      if (response.status === 201 || response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('token', data.token); // Ensure token is set in local storage
        console.log(data.token);
        navigate('/captain-home');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className="page2">
      <div className='Login-page'>
        <img src="https://brandeps.com/logo-download/U/Uber-logo-vector-02.svg" alt="#" />
        <form onSubmit={submitHandler}>
          <h3>What's your E-mail</h3>
          <input
            className='email'
            type="email"
            placeholder='email@example.com'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3>Enter password</h3>
          <input
            className='password'
            type="password"
            required
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button>Login</button>
        </form>
        <p className='create'>New here? <Link to="/captainSignup">Create Account</Link></p>
      </div>
      <div>
        <Link className='login-as-user' to="/UserLogin">Login to User</Link>
      </div>
    </div>
  );
};

export default CaptainLogin;