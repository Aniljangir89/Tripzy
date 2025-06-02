import React, { useEffect, useState } from 'react';
import '../src/css/Fare.css'; // Import the Home.css file
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const RideFare = () => {
  const location = useLocation();
  const { location: startLocation, destination } = location.state || {};
  const [fare, setFare] = useState(null);

  useEffect(() => {
    if (startLocation && destination) {
      fetchFare();
    }
  }, [startLocation, destination]);
  
  const fetchFare = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: {
          pickup: startLocation,
          destination: destination,
        },
      });
  
      console.log('Fare data:', response.data);
      setFare(response.data); // ✅ now correctly set
    } catch (error) {
      console.error('Error fetching fare:', error);
    }
  };
  
  useEffect(() => {
    if (fare) {
      console.log('Updated Fare:', fare); // Now will log: { auto: ..., car: ..., motorcycle: ... }
    }
  }, [fare]);
  

  return (
    <div className='fare_container'>
        <div className="p_to_d">
         
        </div>
        <div className="location_dt">
        <div>
          <h4>Pickup:</h4>
          <p>{startLocation}</p>
        </div>
        <div>
          <h4>Destination:</h4>
          <p>{destination}</p>
        </div>
        </div>
        <div className="vehicles_type">
          <div>
            <img src="\auto.webp" alt="" />
            <p> ₹{Math.round(fare?.fareDetails?.auto?.toFixed(2) )|| "N/A"}</p>

          </div>
          <div><img src="\car.webp" alt="" />
          <p> ₹{Math.round(fare?.fareDetails?.car?.toFixed(2)) || "N/A"}</p>
          </div>
          <div>
            <img src="\bike.webp" alt="" />
            <p> ₹{Math.round(fare?.fareDetails?.motorcycle?.toFixed(2)) || "N/A"}</p>
          </div>
        </div>
        <div className="location_dt">
        <div>
          <h4>Distance:</h4>
          <p> {Math.round(fare?.distance?.toFixed(2) )|| "N/A "}{" M"}</p>
        </div>
        <div>
          <h4>Duration:</h4>
          <p> ₹{Math.round(fare?.duration.toFixed(2) )|| "N/A"}</p>
        </div>
        </div>
    </div>
  );
};

export default RideFare;
