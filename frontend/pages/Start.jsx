import React from 'react';
import '../src/css/Start.css'; // Import the Home.css file

const Start = () => {
  return (
    <div className='container'>
      <div className='bodypage'>
        <div className='page1'>
          <img src="https://brandeps.com/logo-download/U/Uber-logo-vector-02.svg" alt="#" />
          <div className='page1-content'>
            <h2>Get Started with Uber</h2>
            <a href="/UserLogin">Continue</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Start;