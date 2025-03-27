import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmedVehicle from '../components/ConfirmedVehicle';
import LookingForDriver from '../components/LookingForDriver';
import WaitForDriver from '../components/WaitForDriver';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehicleFoundRef = useRef(null); 
  const [vehiclepanel, setVehiclePanel] = useState(false);
  const vehiclepanelRef = useRef(null);
  const confirmRiderPanelRef = useRef(null);
  const WaitingForDriverRef=useRef(null);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (vehiclepanel) {
      gsap.to(vehiclepanelRef.current, {
        transform: 'translateY(0)',
      });
    } else {
      gsap.to(vehiclepanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [vehiclepanel]);

  useEffect(() => {
    gsap.to(panelRef.current, {
      height: panelOpen ? '70%' : 0,
      display: panelOpen ? 'block' : 'none',
    });

    if (!panelOpen) {
      gsap.to(panelCloseRef.current, {
        display: 'none',
      });
    } else {
      gsap.to(panelCloseRef.current, {
        display: 'block',
      });
    }
  }, [panelOpen]);

  useEffect(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRiderPanelRef.current, {
        transform: 'translateY(0%)',
      });
    } else {
      gsap.to(confirmRiderPanelRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [confirmRidePanel]);

  useEffect(() => {
    if (waitingForDriver) {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(0%)',
      });
    }
    else {
      gsap.to(WaitingForDriverRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [waitingForDriver]);

  useEffect(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(0%)',
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        transform: 'translateY(100%)',
      });
    }
  }, [vehicleFound]);

  return (
    <div>
      <img
        className="home_logo"
        src="https://brandeps.com/logo-download/U/Uber-logo-vector-02.svg"
        alt=""
      />
      <div className="home_map12">
        <img
          src="https://media.gettyimages.com/id/1188394093/vector/person-using-a-ride-sharing-technology-mobile-application.jpg?s=612x612&w=0&k=20&c=hMAQNUD8qIAGz6kM6KS4XY-wW0OJ9yV-30IyX5-ytWg="
          alt=""
        />
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
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
            />
            <input
              type="text"
              placeholder="Add destination location"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onClick={() => setPanelOpen(true)}
            />
          </form>
        </div>

        <div className="select_suggestion" ref={panelRef}>
          {/* Suggestions content */}
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            vehiclepanel={vehiclepanel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>

        <div ref={vehiclepanelRef} className="ride-options">
          <VehiclePanel
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
          />
        </div>

        <div ref={confirmRiderPanelRef} className="confirmations">
          <ConfirmedVehicle confirmRidePanel={confirmRidePanel} setVehicleFound={setVehicleFound} setConfirmRidePanel={setConfirmRidePanel} />
        </div>
        <div ref={vehicleFoundRef} className="confirmation-forWaiting">
            <LookingForDriver setVehicleFound={setVehicleFound} />
        </div>
        <div ref={WaitingForDriverRef} className="watching-for-driver">
            <WaitForDriver setWaitingForDriver={setWaitingForDriver}  />
        </div>
      </div>
    </div>
  );
};

export default Home;
