import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CaptainContext } from '../context/CaptainContext';

const CaptainSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  
  const { setCaptain } = useContext(CaptainContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newUserData = {
      email,
      password,
      fullname: { firstname, lastname },
      vehicle: {
        capacity: vehicleCapacity,
        vehicleType,
        plate: vehiclePlate,
        color: vehicleColor,
      },
    };

    try {
      console.log('Submitting form...');
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        newUserData
      );

      console.log('Response received:', response);
      console.log('Response data:', response.data);

      if (response.status === 201 || response.status === 200) {
        const { token, captain } = response.data;

        if (!token) {
          console.error('Token is missing in API response!', response.data);
        }

        setCaptain(captain);
        localStorage.setItem('token', token);
        localStorage.setItem('captain', JSON.stringify(captain));

        navigate('/captain-home');
      } else {
        console.error('Unexpected response status:', response.status);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }

    // Clear form fields after submission
    setEmail('');
    setPassword('');
    setFirstname('');
    setLastname('');
    setVehicleCapacity('');
    setVehicleType('');
    setVehiclePlate('');
    setVehicleColor('');
  };

  return (
    <div className="page2">
      <div className='Login-page'>
        <img src="https://brandeps.com/logo-download/U/Uber-logo-vector-02.svg" alt="Uber Logo" />
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
          <h3>Vehicle Information</h3>
          <div className="vehicle-info">
            <div className="vehicle-details">
              <input
                className='vdata'
                type="text"
                placeholder='Vehicle Color'
                required
                value={vehicleColor}
                onChange={(e) => setVehicleColor(e.target.value)}
              />
              <select
                className='vdata'
                required
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </div>
            <div className="vehicle-details">
              <input
                className='vdata'
                type="text"
                placeholder='Vehicle Plate'
                required
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
              <input
                className='vdata'
                type="text"
                placeholder='Vehicle Capacity'
                required
                value={vehicleCapacity}
                onChange={(e) => setVehicleCapacity(e.target.value)}
              />
            </div>
          </div>
          <button>Create Account</button>
        </form>
        <p className='create'>Already have an account? <Link to="/captain-login">Login here</Link></p>
      </div>
      <div className='policy'>
        <p>This site is protected by reCAPTCHA and the <span>Google Privacy Policy</span>
          and <span>Terms of Services apply</span>.</p>
      </div>
    </div>
  );
}

export default CaptainSignup;
 