import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const FinishRide = (props) => {

   const endRide = async () => {
    try {
      const rideId = props.ride?._id;
      console.log("Ending ride with ID:", rideId);
      const response =await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, 
        {rideId},
        { headers: { Authorization: `Bearer ${localStorage.getItem("captainToken")}` } }
      );
      console.log("Ride ended successfully:", response);
      props.setRideComplete(false);
      Navigate("/captain-home"); 
    } catch (error) {
      console.error("Error ending ride:", error.message);
    }
  };


  console.log("FinishRide received ride:", props.ride);

  const userName = props.ride?.user?.fullname?.firstname ?? "Guest User";
  const fare = props.ride?.fare ?? "$12.00";
  const distance = props.ride?.distance ? `${props.ride.distance} Km` : "2.5 Km";
  const pickup = props.ride?.pickup ?? "123 Main St, City";
  const dropoff = props.ride?.destination ?? "456 Elm St, City";

  return (
    <div className="confirm_ride_pop_up_container">
      <div className="rpop_1">
        <h5 onClick={() => props.setRideComplete(false)}>✖</h5>
        <h4>Complete this Ride</h4>
      </div>
      <div className="rpop_2">
        <img 
          src="https://imgs.search.brave.com/uPCTTFLyXkUNYEktbyVFxuxVzAfBEaA-GVbHphftmvY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvc2lt/cGxlLWJlYXV0aWZ1/bC1naXJscy1pbi1w/b255dGFpbC1mMTd5/d2VxZHRmYmN2a2pj/LmpwZw"
          alt="Rider illustration"
        />
        <div className="name_of_rider">
          <h4>{userName}</h4>
          <p>Discount</p>
        </div>
        <div>
          <h4>{fare}</h4>
          <p>{distance}</p>
        </div>
      </div>
      <div className="rpop_3">
        <div>
          <p>PICK UP</p>
          <h4>{pickup}</h4>
        </div>
        <div>
          <p>DROP OFF</p>
          <h4>{dropoff}</h4>
        </div>
      </div>
      <div className="rpop_4">
        <a href="/captain-home" onClick={endRide}>Complete Ride</a>
        <p>Click on "Complete Ride" if payment has been received.</p>
      </div>
    </div>
  );
};

export default FinishRide;
