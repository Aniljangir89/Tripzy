import React from 'react';

const RidePopUp = (props) => {
  return (
    <div className='ride_pop_up_container'>
      <div className="cant_e">
        <h5 onClick={() => {
          props.setRidePopUpPanel(false);
        }}></h5>
        <h4>New ride request</h4>
      </div>
      <div className="incoming_ride_request cant_d">
        <img src="https://imgs.search.brave.com/uPCTTFLyXkUNYEktbyVFxuxVzAfBEaA-GVbHphftmvY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvc2lt/cGxlLWJlYXV0aWZ1/bC1naXJscy1pbi1w/b255dGFpbC1mMTd5/d2VxZHRmYmN2a2pj/LmpwZw" alt="" />
        <div className="name_of_rider">
          <h4>{props.rideData?.user?.fullname?.firstname || "Not available"} {props.rideData?.user?.fullname?.lastname || ""}</h4>

          <p>Discount</p>
        </div>
        <div className="estimated_dist">
          <h4>{props.rideData?.duration + "h" || "not available"}</h4>
          <p>{props.rideData?.distance + "km" || " not available"}</p>
        </div>
      </div>
      <div className="incoming_ride_request cant_a">
        <p>PICK UP</p>
        <h4>{props.rideData?.pickup || "Pickup location not available"}</h4>

      </div>
      <div className="incoming_ride_request cant_b">
        <p>DROP OFF</p>
        <h4>{props.rideData?.destination || "Drop-off location not available"}</h4>

      </div>
      <div className="incoming_ride_request cant_c">
        <button onClick={() => {
          props.setRidePopUpPanel(false);
        }} className='btn_c1'>Ignore</button>
        <button onClick={() => {
          props.setRidePopUpPanel(false);
          props.setConfirmRidePopUpPanel(true);
          props.confirmRide();
        }} className='btn_c2'>Accept</button>
      </div>
    </div>
  );
};

export default RidePopUp;
