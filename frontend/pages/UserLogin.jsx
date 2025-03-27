import React, { useState, useContext } from 'react';
import "../src/css/UserLogin.css";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../src/context/UserContext';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password
    };
    try {

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, newUser);

      if (response.status === 201 || response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem('token', data.token);
        navigate('/home');

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
          />
          <button>Login</button>
        </form>
        <p className='create'>New here? <Link to="/UserSignup">Create Account</Link></p>
      </div>
      <div>
        <Link className='login-as-user' to="/CaptainLogin">Login to Captain</Link>
      </div>
    </div>
  );
};

export default UserLogin;