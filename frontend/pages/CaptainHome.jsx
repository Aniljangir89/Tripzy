import React, { useState, useEffect, useRef,useContext } from 'react'; // Added missing imports
import { gsap } from 'gsap'; // Added gsap import
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import {SocketContext} from '../src/context/SocketContext'; // Added import for SocketContext
import { CaptainContext } from '../src/context/CaptainContext';
import axios from 'axios';
import LiveTracking from '../components/LiveTracking';


const CaptainHome = () => {
 
  const [RidePopUpPanel, setRidePopUpPanel] = useState(false); // Fixed initial state to boolean
  const [ConfirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false); // Added state for ConfirmRidePopUp  
 const PopUpRef = useRef(null);
 const PopUpRef2 = useRef(null); // Added ref for ConfirmRidePopUp
 const { captain } = useContext(CaptainContext); // Added context for captain
  const { socket } = useContext(SocketContext); // Added context for socket
  const [rideData, setRideData] = useState(null); // Added state for ride data


  useEffect(() => {
    if (!socket || !captain || !captain._id) return;
  
    const handleJoin = () => {
      console.log("🟢 Emitting join for captain:", captain._id);
      socket.emit("join", {
        userId: captain._id,
        userType: "captain",
      });
    };
  
    // Emit join once socket is connected
    if (socket.connected) {
      handleJoin();
    } else {
      socket.on("connect", handleJoin);
    }
  
    // Start location updates every 10s
    const locationInterval = setInterval(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          console.log("📍 Sending location:", latitude, longitude);
          socket.emit("update-location-captain", {
            userId: captain._id,
            latitude,
            longitude,
          });
        });
      }
    }, 10000);
  
    return () => {
      clearInterval(locationInterval);
      socket.off("connect", handleJoin);
    };
  }, [socket, captain]);
  


 socket.on("new-ride", (data) => {
  setRidePopUpPanel(true);
  setConfirmRidePopUpPanel(false);
  console.log("New ride data received:", data); // Log the received data
  setRideData(data); // Set ride data when new ride is received
});


async function confirmRide() {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
      userId: captain._id,
      rideId: rideData._id,
    },{headers:{
      Authorization: `Bearer ${localStorage.getItem('captainToken')}`,
    }});
    // Handle the response as needed
    console.log(response.data);
  } catch (error) {
    // Handle any errors
    console.error('Error confirming ride:', error);
  }
}


 
  useEffect(() => {
    if (RidePopUpPanel) {
      gsap.to(PopUpRef.current, {
        bottom: '0',
      });
    } else {
      gsap.to(PopUpRef.current, {
        bottom: '-100%',
      });
    }
  }, [RidePopUpPanel]);
  
  useEffect(() => {
    if (ConfirmRidePopUpPanel) {
      gsap.to(PopUpRef2.current, {
        bottom: '0',
      });
    } else {
      gsap.to(PopUpRef2.current, {
        bottom: '-100%',
      });
    }
  }, [ConfirmRidePopUpPanel]);
  return (
    <div className='captain_home_container'>
      <div className="captians_map">
        <img className='uber_logo_in_map' src="https://brandeps.com/logo-download/U/Uber-logo-vector-02.svg" alt="" />
    
        <LiveTracking/>
      </div>

      <div className="captains_details">
        <CaptainDetails />
      </div>

      <div ref={PopUpRef} className="ride_pop-up">
        <RidePopUp setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel} rideData={rideData} confirmRide={confirmRide} />
      </div>
      <div ref={PopUpRef2} className="confirm_ride_pop_up">
        <ConfirmRidePopUp setRidePopUpPanel={setRidePopUpPanel} rideData={rideData} setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}/>
      </div>
    </div>
  );
};

export default CaptainHome;
