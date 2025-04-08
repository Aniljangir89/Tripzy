import React, { useState, useEffect, useRef, createRef, use } from 'react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedVehicle from '../components/ConfirmedVehicle';
import LookingForDriver from '../components/LookingForDriver';
import WaitForDriver from '../components/WaitForDriver';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import LiveTracking from '../components/LiveTracking';


const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [pickupQuery, setPickupQuery] = useState('');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeInput, setActiveInput] = useState('pickup');  // Track which input is active
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const [vehiclepanel, setVehiclePanel] = useState(false);
  const vehiclepanelRef = useRef(null);
  const confirmRiderPanelRef = useRef(null);
  const WaitingForDriverRef = useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null); // State to store selected vehicle type
  const [captainData, setCaptainData] = useState(null); // State to store captain data
  const [otp, setOtp] = useState(null); // State to store OTP

  const submitHandler = (e) => e.preventDefault();
  const { user } = useContext(UserDataContext); // Use the UserDataContext to get user data
  const { socket } = useContext(SocketContext); // Use the SocketContext to get socket instance
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    if (!socket || !user || !user._id) return;

    const joinUser = () => {
      console.log("📢 Emitting 'join' with userId:", user._id);
      socket.emit('join', { userType: 'user', userId: user._id });
    };

    if (socket.connected) {
      joinUser(); // emit immediately if already connected
    } else {
      socket.on('connect', joinUser); // emit on future connection
    }

    return () => {
      socket.off('connect', joinUser); // cleanup
    };
  }, [socket, user]);
  // Ensure dependencies are correct


  useEffect(() => {
    if (vehiclepanel) {
      gsap.to(vehiclepanelRef.current, { transform: 'translateY(0)' });
    } else {
      gsap.to(vehiclepanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [vehiclepanel]);

  useEffect(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? '100%' : 0,
      display: panelOpen ? 'block' : 'none',
    });
    gsap.to(panelCloseRef.current, { display: panelOpen ? 'block' : 'none' });
  }, [panelOpen]);

  useEffect(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRiderPanelRef.current, { transform: 'translateY(0%)' });
    } else {
      gsap.to(confirmRiderPanelRef.current, { transform: 'translateY(100%)' });
    }
  }, [confirmRidePanel]);

  useEffect(() => {
    if (waitingForDriver) {
      gsap.to(WaitingForDriverRef.current, { transform: 'translateY(0%)' });
    } else {
      gsap.to(WaitingForDriverRef.current, { transform: 'translateY(100%)' });
    }
  }, [waitingForDriver]);

  useEffect(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(0%)' });
    } else {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(100%)' });
    }
  }, [vehicleFound]);


  async function FindTrip() {
    try {
      setPanelOpen(false);
      setVehiclePanel(true);

      // Ensure pickup and destination are provided
      if (!pickup || !destination) {
        console.error("Pickup and destination must be set before fetching fare.");
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: {
            pickup: pickup,  // Ensure these match your backend expectations
            destination: destination,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const { fareDetails } = response.data; // Destructure fare details from response
      console.log("Fare Response:", fareDetails); // Log the fare details
      setFare(fareDetails);  // Store fare data in state

    } catch (error) {
      console.error("Error fetching fare:", error.response ? error.response.data : error.message);
    }
  }


  async function CreateRide() {
    try {
      if (!pickup || !destination) {
        console.error("Pickup and destination must be set before creating a ride.");
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const ride = response.data; // No need to do `response.data.ride` if backend is directly sending ride object

      console.log("Ride Created:", ride);

      if (ride.otp) {
        setOtp(ride.otp); // ✅ Store OTP in state
      } else {
        console.warn("No OTP received with ride data.");
      }

    } catch (error) {
      console.error("Error creating ride:", error.response ? error.response.data : error.message);
    }
  }


  socket.on('ride-confirmed', (data) => {
    console.log("🚗 Ride confirmed:", data);
    setCaptainData(data); // Assuming you have a state to store captain data
    setWaitingForDriver(true); // Show the waiting for driver panel
  });




  socket.on('ride-started', (data) => {
    setWaitingForDriver(false); // Hide the waiting for driver panel
    navigate('/riding', { state: { ride: data } }); // Navigate to the riding page with ride data
  });













  return (
    <div >
      <img className="home_logo" src="https://brandeps.com/logo-download/U/Uber-logo-vector-02.svg" alt="Uber Logo" />
      <div className="home_map12">
        <LiveTracking />
      </div>
      <div className="suggestions">
        <div className="location_container">
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)}>
            <i className="ri-arrow-down-wide-line"></i>
          </h5>
          <h4>Find a Trip</h4>
          <form onSubmit={submitHandler} className="trip_form">
            <input
              type="text"
              placeholder="Add a pickup location"
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
                setPickupQuery(e.target.value);
                setActiveInput('pickup');  // Mark pickup input as active
              }}
              onClick={() => setPanelOpen(true)}
            />
            <input
              type="text"
              placeholder="Add destination location"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setDestinationQuery(e.target.value);
                setActiveInput('destination');  // Mark destination input as active
              }}
              onClick={() => setPanelOpen(true)}
            />
          </form>
          <button onClick={() => {
            FindTrip();

          }} className='find_trip_button'>Find Trip</button>
        </div>

        <div className="select_suggestion" ref={panelRef}>
          {panelOpen && (
            <>
              {/* Conditionally render pickup suggestion panel if pickup input is active */}
              {activeInput === 'pickup' && (
                <LocationSearchPanel
                  setPanelOpen={setPanelOpen}
                  vehiclepanel={vehiclepanel}
                  setVehiclePanel={setVehiclePanel}
                  setPickup={setPickup}
                  setDestination={setDestination}
                  isPickup={true}
                  query={pickupQuery}
                />
              )}

              {/* Conditionally render destination suggestion panel if destination input is active */}
              {activeInput === 'destination' && (
                <LocationSearchPanel
                  setPanelOpen={setPanelOpen}
                  vehiclepanel={vehiclepanel}
                  setVehiclePanel={setVehiclePanel}
                  setPickup={setPickup}
                  setDestination={setDestination}
                  isPickup={false}
                  query={destinationQuery}
                />
              )}
            </>
          )}
        </div>

        <div ref={vehiclepanelRef} className="ride-options">
          <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} fare={fare} setVehicleType={setVehicleType} />
        </div>

        <div ref={confirmRiderPanelRef} className="confirmations">
          <ConfirmedVehicle confirmRidePanel={confirmRidePanel} setVehicleFound={setVehicleFound} setConfirmRidePanel={setConfirmRidePanel} CreateRide={CreateRide} pickup={pickup} destination={destination} fare={vehicleType ? fare[vehicleType] : 0} />
        </div>
        <div ref={vehicleFoundRef} className="confirmation-forWaiting">
          <LookingForDriver setVehicleFound={setVehicleFound} CreateRide={CreateRide} pickup={pickup} destination={destination} fare={fare[vehicleType]} />
        </div>
        <div ref={WaitingForDriverRef} className="watching-for-driver">
          <WaitForDriver setWaitingForDriver={setWaitingForDriver} captainData={captainData} otp={otp} />
        </div>
      </div>
    </div>
  );
};

export default Home;
