import React, { useState } from 'react';
import '../src/css/Start.css';
import { useNavigate } from 'react-router-dom';

const Start = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');

  const submithandlar = (e) => {
    e.preventDefault();
    navigate('/RideFare', { state: { location, destination } });
  };

  return (
    <div className='container1'>
      <div className="page1">
        <div className="page1_header">
          <div className="logo_img">
            <h1>Trizpy</h1>
          </div>
          <div className="header_btn">
            <a href="/UserLogin">Log in</a>
            <a href="/UserSignup">Sign up</a>
          </div>
        </div>
        <div className="main_content">
           <div className="go_anywhare">
          <div className="heading">
            <h1>Go anywhere with us</h1>
            <p>Request a ride, hope in, and go</p>
          </div>
          <div className="prices_check">
            <form onSubmit={submithandlar}>
              <div className="location-container">
                <div className="input-group">
                  <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <svg class="icon right-icon" viewBox="0 0 24 24" fill="black">
                    <path d="M2 12l19-10-4 10 4 10z" />
                  </svg>
                </div>
                <div className="vertical-line"></div>
                <div className="input-group">
                  <svg class="icon" viewBox="0 0 24 24" fill="black">
                    <rect x="9" y="9" width="6" height="6" />
                  </svg>


                  <input
                    type="text"
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit">See prices</button>
            </form>
          </div>
        </div>
        <div className="go_anymap">
          <img src="\Screenshot 2025-06-01 203204.png" alt="map" />
        </div>
        </div>
      </div>

      <div className="page3">
        <div className="log_in_to_see">
          <h1>Log in to see your trips</h1>
          <p>View past trips, tailored suggestions, support resources, and more.</p>
          <a className='sdgdfxcc' href="/UserLogin">Log in to your account</a>
          <a className='sdadfdgd' href="/UserSignup">Don't have any account? Sign up</a>
        </div>
        <div className="random_trip_img">
          <img src="\10-1024x649.webp" alt="trip" />
        </div>
      </div>
      
      <div className="page5">
        <div className="page5_about">
          <h1>About Trizpy</h1>
          <p>Trizpy is a ride-hailing service that connects passengers with drivers for convenient transportation. Our platform offers a user-friendly app, competitive pricing, and a commitment to safety and reliability.</p> 
          <a href="/about">Learn more about us</a>
        </div>
        <div className="page5_data">
          <div className="data_container5_parent1">
            <div className="data_container5 r5">
              <h1>1K+</h1>
              <p>Active User</p>
            </div>
            <div className="data_container5 g1">
              <h1>5K+</h1>
              <p>Rides completed</p>
            </div>
            <div className="data_container5 b1">
                  <h1>50+</h1>
                 <p>Cities</p>
            </div>
          </div>
       
        </div>
      </div>


      <div className="page4">
        <div className="socialmedia">
          <ul>
            <li><a href=""><img src="\facebook.png" alt="" /></a></li>
            <li><a href=""><img src="\twitter.png" alt="" /></a></li>
            <li><a href=""><img src="\instagram.png" alt="" /></a></li>
            <li><a href=""><img src="\youtube.png" alt="" /></a></li>
            <li><a href=""><img src="\linkedin.png" alt="" /></a></li>
          </ul>
        </div>
        <div className="location_english">
          <ul>
            <li><a href=""> <span><img alt="" src="\earth.png" /></span>Location</a></li>
            <li><a href=""><span><img src="\location.jpg" alt="" /></span>English</a></li>
          </ul>
        </div>
        <div className="privacy_policy">
          <ul>
            <li>Privacy</li>
            <li>Accessibility</li>
            <li>Terms</li>
            <li>Blog</li>
            <li>Reviews</li>
          </ul>
        </div>
        <div className="privacy123">
           <div className="location_priv">
            <p>Location: <span>United States</span></p>
            <p>12H xyx road califo</p>
           </div>
          <p className='dafas'>© 2025 Travel Technologies Inc.</p>
        </div>
      </div>
    </div>
  );
};

export default Start;
