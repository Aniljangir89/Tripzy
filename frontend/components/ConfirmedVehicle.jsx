import React from 'react';

const ConfirmedVehicle = ({ setVehicleFound, setConfirmRidePanel }) => {
  return (
    <div className='confirmation_container'>
      <i className="ri-arrow-down-wide-line" onClick={() => {
        setConfirmRidePanel(false);
      }}></i>
      <h2> Confirm your Ride</h2>
      <div className="confirmation-img">
        <img src="https://media.istockphoto.com/id/1157395170/video/flat-cartoon-isolated-blue-vehicle-car-with-man-character-animation-side-view.jpg?s=640x640&k=20&c=wG6LmbdiOf_noS1_Q97fIe4ho46vWZ8SGoxcTjtxvuo=" alt="" />
        <div className="confirmation-info">
          <div className="confirm-data">
            <i class="ri-map-pin-time-fill"></i>
            <div className="confirmation-data2">
              <h3>565/A11</h3>
              <p>1'st Flor bombay street</p>
            </div>
          </div>
          <div className="confirm-data">
            <i class="ri-landscape-line"></i>
            <div className="confirmation-data2">
              <h3>565/A11</h3>
              <p>Sadar bazar,jaipur</p>
            </div>
          </div>
          <div className="confirm-data">
            <i class="ri-bank-card-2-fill"></i>
            <div className="confirmation-data2">
              <h3>$19.79</h3>
              <p>Cash/Online</p>
            </div>
          </div>
        </div>
        <button onClick={() => {
          setVehicleFound(true);
        }}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmedVehicle;
