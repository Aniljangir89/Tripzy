import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainContext } from '../context/CaptainContext';

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setCaptain } = useContext(CaptainContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting form...');
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        { email, password }
      );

      console.log('Response received:', response);
      if (response.status === 201 || response.status === 200) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem('captainToken', data.token); // ✅ Fix localStorage key

        console.log("Navigating to captain-home...");
        navigate('/captain-home'); // ✅ Debugging added
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
        <h1>Trizpy</h1>
        <form onSubmit={submitHandler}>
          <h3>Enter Captain's E-mail</h3>
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
