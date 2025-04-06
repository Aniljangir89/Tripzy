import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect,useContext } from 'react';
import {SocketContext} from '../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';


function Riding() {
  const location = useLocation();
  const ride = location.state?.ride;

   const {socket} = useContext(SocketContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!socket) return;
  
    const handleRideCompleted = (data) => {
      console.log("🚀 Ride completed:", data);
      navigate("/Home");
    };
  
    socket.on("ride-completed", handleRideCompleted);
  
    // Cleanup to avoid multiple bindings
    return () => {
      socket.off("ride-completed", handleRideCompleted);
    };
  }, [socket, navigate]);
  

  console.log("🛣️ Captain - ride data:", ride);





  if (!ride) {
    return <div>Loading ride details...</div>;
  }

  return (
    <div className="riding_container">
      <div className="riding_to_home">
        <a href="/Home">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home">
            <path d="M3 9l9-7 9 7v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
            <polyline points="9 22 9 12 15 12 15 22" />
            <path d="M9 22h6" />
            <path d="M9 12h6" />
            <path d="M9 22v-10" />
            <path d="M15 22v-10" />
          </svg>
        </a>
      </div>

      <div className="riding_track">
      
         <LiveTracking/>
      
      </div>

      <div className="riding_division">
        <div className="confirmation-img">
          <div className="driver_img">
            <img
              src="https://www.pngall.com/wp-content/uploads/2016/04/Happy-Person.png"
              alt="Driver"
            />
            <div className="driver_info">
            <h2>{ride?.captain?.fullname?.firstname ?? 'Captain'} {ride?.captain?.fullname?.lastname ?? ''}</h2>

              <h4>To: {ride.destination}</h4>
              <p>From: {ride.pickup}</p>
            </div>
          </div>

          <div className="confirmation-info">
            <div className="confirm-data">
              <i className="ri-map-pin-time-fill"></i>
              <div className="confirmation-data2">
                <h3>Distance: {ride.distance.toFixed(1)} km</h3>
                <p>Estimated time: {Math.ceil(ride.duration)} mins</p>
              </div>
            </div>

            <div className="confirm-data">
              <i className="ri-bank-card-2-fill"></i>
              <div className="confirmation-data2">
                <h3>Fare: ₹{ride.fare.toFixed(2)}</h3>
                <p>Payment Mode: Cash/Online</p>
              </div>
            </div>

            <div className="confirm-data">
              <i className="ri-user-fill"></i>
              <div className="confirmation-data2">
                <h3>Passenger: {ride.user?.fullname?.firstName} {ride.user?.fullname?.lastName}</h3>
                <p>Email: {ride.user?.email}</p>
              </div>
            </div>

            <div className="confirm_payment">
              <button>Complete Ride</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Riding;
