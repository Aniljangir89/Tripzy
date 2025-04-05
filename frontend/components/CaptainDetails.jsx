import React, { useContext } from 'react';
import { CaptainContext } from '../src/context/CaptainContext'; // Adjust the import path as necessary

const CaptainDetails = () => {
  const { captain } = useContext(CaptainContext);

  if (!captain) {
    return <p>Loading captain details...</p>; // Prevents crashes
  }

  return (
    <div className='captain_details_container2'>
      <div className="name_with_earning">
        <div className="captains_name_in_home">
          <img src={captain.image || 'default_image_url'} alt="Captain" />
          <h4>{captain.fullname?.firstname} {captain.fullname?.lastname}</h4>

        </div>
        <div className="captains_earning_in_home">
          <h4>${captain.earnings || '0.00'}</h4>
          <p>Earned</p>
        </div> 
      </div>

      <div className="earning_with_time">
        <div className="captains_time">
          <i className="ri-time-line"></i>
          <h5>{captain.hoursOnline || '0.0'}</h5>
          <p>Hours Online</p>
        </div>
        <div className="captains_total_distance">
          <i className="ri-speed-up-line"></i>   
          <h5>{captain.distance || '0.0'}</h5>
          <p>Total Distance</p>
        </div>
        <div className="captains_note">
          <i className="ri-sticky-note-line"></i>
          <h5>{captain.notes || '0'}</h5>
          <p>Notes</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
