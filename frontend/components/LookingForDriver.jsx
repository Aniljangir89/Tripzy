import React from 'react'
import '../src/css/UserPart2.css';
const LookingForDriver = (props) => {
  return (
    <div className='Looking_container'>
          <i className="ri-arrow-down-wide-line" onClick={() => {
          props.setVehicleFound(false);
      }}></i>
      <h2>Looking for Driver</h2>
      <div className="confirmation-img">
      <img src="https://media.istockphoto.com/id/1157395170/video/flat-cartoon-isolated-blue-vehicle-car-with-man-character-animation-side-view.jpg?s=640x640&k=20&c=wG6LmbdiOf_noS1_Q97fIe4ho46vWZ8SGoxcTjtxvuo=" alt="" />
      <div className="confirmation-info">
        <div className="confirm-data">
        <i class="ri-map-pin-time-fill"></i>
          <div className="confirmation-data2">
            <p>{props.pickup}</p>
          </div>
        </div>
        <div className="confirm-data">
        <i class="ri-landscape-line"></i>
        <div className="confirmation-data2">
            <p>{props.destination}</p>
          </div>
        </div>
        <div className="confirm-data">
        <i class="ri-bank-card-2-fill"></i>
        <div className="confirmation-data2">
        <h3>{parseInt(props.fare)}</h3>
            <p>Cash/Online</p>
          </div>
        </div>
      </div>
    
        </div>  
    </div>
  )
}

export default LookingForDriver
