import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
      fullname: {
        firstname: firstname,
        lastname: lastname
      }
    };
    try {
      console.log('Submitting form...');
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser);
      console.log('Response received:', response);
      if (response.status === 201 || response.status === 200) {
        const data = response.data;
        setUser(data.user);
        console.log('User registered successfully, navigating to /home...');
        navigate('/home');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }

    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
  };

  return (
    <div className="page2">
      <div className='Login-page'>
        <img src="https://brandeps.com/logo-download/U/Uber-logo-vector-02.svg" alt="#" />
        <form onSubmit={submitHandler}>
          <h3>What's your Name</h3>
          <div className='name'>
            <input
              className='name1'
              type="text"
              placeholder='Firstname'
              required
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              className='name1'
              type="text"
              placeholder='Lastname'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <h3>What's your email</h3>
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
          <button>Create Account</button>
        </form>
        <p className='create'>Already have an account? <Link to="/UserLogin">Login here</Link></p>
      </div>
      <div className='policy'>
        <p>By proceeding, you consent to get calls, WhatsApp or SMS messages, including by automated means, from Uber and its affiliates to the email provided.</p>
      </div>
    </div>
  );
};

export default UserSignup;