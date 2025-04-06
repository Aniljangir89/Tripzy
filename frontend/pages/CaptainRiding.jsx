import React, { useEffect, useRef, useState } from 'react'
import {gsap} from 'gsap'
import FinishRide from '../components/FinishRide';
import { useLocation } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking';
const CaptainRiding = () => {
    const RideCompleteRef=useRef(null);
    const [RideComplete,setRideComplete]=useState(false);
  
    const location=useLocation();
    const rideData=location.state?.ride;
     console.log("rides data",rideData);


    useEffect(()=>{
            if(RideComplete){
                gsap.to(RideCompleteRef.current,{
                    transform:'translateY(0%)'
                })
            }else{
                gsap.to(RideCompleteRef.current,{
                    transform:'translateY(100%)'
                })
            }
    },[RideComplete])

  return (
    <div className='captain_riding_container'>
      <div className="captain_top_container">
        <img className='uber_logo_in_map' src="https://brandeps.com/logo-download/U/Uber-logo-vector-02.svg" alt="" />
        <LiveTracking/>
      </div>
      <div className="captain_bottom_container">
        <h4 onClick={()=>{
            setRideComplete(true);
        }} className="pop_up_for_remining"></h4>
        <div className="remaining_dist_for_driver">
          
            <p>2.5Km</p>
            <a href="#">Complete Ride</a>
        </div>
       
      </div>
      <div ref={RideCompleteRef} className="complete_ride_panel">
           <FinishRide setRideComplete={setRideComplete} ride={rideData}/>
        </div>
    </div>
  )
}

export default CaptainRiding
