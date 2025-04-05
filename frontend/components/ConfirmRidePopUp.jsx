import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import axios from 'axios';


const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState(''); // State for OTP input
  const navigate = useNavigate(); // Initialize useNavigate
  const submitHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
          params: {
            rideId: props.rideData._id,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('captainToken')}`,
          },
        });
        if(response.status === 200) {
          props.setConfirmRidePopUpPanel(false); // Correctly toggling the panel state
          props.setRidePopUpPanel(false); // Correctly toggling the panel state
          navigate('/captains-riding',{state:{ride:props.rideData}}); // Navigate to the riding page
        }
  }


  return (
    <div className='confirm_ride_pop_up_container'>
      <div className="rpop_1">
        <h5 onClick={() => {
          props.setConfirmRidePopUpPanel(false);
          props.setRidePopUpPanel(true); // Correctly toggling the panel state
        }}></h5>
        <h4>Confirm this ride to start</h4>
      </div>
      <div className="rpop_2">  
        <img src="https://imgs.search.brave.com/uPCTTFLyXkUNYEktbyVFxuxVzAfBEaA-GVbHphftmvY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvc2lt/cGxlLWJlYXV0aWZ1/bC1naXJscy1pbi1w/b255dGFpbC1mMTd5/d2VxZHRmYmN2a2pj/LmpwZw" alt="" />
        <div className="name_of_rider">
          <h4>Esther Perry</h4>
          <p>Discount</p>
        </div>
        <div className="">
          <h4>$12.00</h4>
          <p>2.5Km</p>
        </div>
      </div>
      <div className="rpop_3">
        <div>
          <p>PICK UP</p>
          <h4>123 Main St, City</h4>
        </div>
        <div>
          <p>DROP OFF</p>
          <h4>456 Elm St, City</h4>
        </div>
      </div>
      <div className="rpop_4">
        <form className='rpops_form' onSubmit={submitHandler}>
          <input value={otp} onChange={(e)=>{     
              setOtp(e.target.value)
          }}  type="number" placeholder='OTP' required />
          <button type="button" onClick={() => {
            props.setConfirmRidePopUpPanel(false); // Correctly toggling the panel state
          }} className='btn_c1'>Ignore</button>
          <button type="submit" className='btn_c2'>Accept</button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
