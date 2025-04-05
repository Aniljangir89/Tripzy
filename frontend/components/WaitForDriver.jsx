import React from 'react'

const WaitForDriver = (props) => {
  return (
    <div className=' waiting_driver_container'>
      <i className="ri-arrow-down-wide-line" onClick={() => {
        props.setWaitingForDriver(false);
      }}></i>
      <div className="confirmation-img">
        <div className="driver_img">
          <img src="https://www.pngall.com/wp-content/uploads/2016/04/Happy-Person.png" alt="" />
          <div className="driver_info">
            <h2>
              {props.captainData?.captain?.fullname?.firstname ?? 'Default Firstname'}{' '}
              {props.captainData?.captain?.fullname?.lastname ?? 'Default Lastname'}
            </h2>


            <h4>  {props.captainData?.captain?.vehicle?.plate ?? 'Default Lastname'}</h4>
            <p>   {props.captainData?.captain?.vehicle?.vehicleType ?? 'Default Lastname'}</p>
            <p>{props.otp}</p>
          </div>
        </div>
        <div className="confirmation-info">
          <div className="confirm-data">
            <i class="ri-map-pin-time-fill"></i>
            <div className="confirmation-data2">
              <h3>565/A11</h3>
              <p>  {props.captainData?.pickup ?? 'Default Lastname'}</p>
            </div>
          </div>

          <div className="confirm-data">
            <i class="ri-bank-card-2-fill"></i>
            <div className="confirmation-data2">
              <h3>  {props.captainData?.fare ?? 'Default Lastname'}</h3>
              <p>Cash/Online</p>
            </div>
          </div>
          <div className="confirm-data m_for_driver">
            <input type="text" className='message-to-driver' placeholder='Send Message' />
            <input type="button" value="Send" className='send_to_driver' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitForDriver
