import React from 'react';

const ConfirmedVehicle = ({ setVehicleFound, setConfirmRidePanel ,CreateRide,pickup,destination,fare}) => {
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
     
              <p>{pickup}</p>
            </div>
          </div>
          <div className="confirm-data">
            <i class="ri-landscape-line"></i>
            <div className="confirmation-data2">
      
              <p>{destination}</p>
            </div>
          </div>
          <div className="confirm-data">
            <i class="ri-bank-card-2-fill"></i>
            <div className="confirmation-data2">
             <h3>{'\u20B9'}{parseInt(fare)}</h3>

              <p>Cash/Online</p>
            </div>
          </div>
        </div>
        <button onClick={() => {
          setVehicleFound(true);
          CreateRide(); // Call the function to create the ride
        }}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmedVehicle;
