import React from 'react'

const WaitForDriver = (props) => {
  return (
    <div className=' waiting_driver_container'>
      <i className="ri-arrow-down-wide-line" onClick={() => {
        props.setWaitingForDriver(false);
      }}></i>
      <div className="confirmation-img">
        <div className="driver_img">
           <img src="\src\assets\3f9f5b8c9f31ce16c79d48b9eeda4de0.jpg" alt="" />
          <div className="driver_info">
            <h2>
              {props.captainData?.captain?.fullname?.firstname ?? 'ram'}{' '}
              {props.captainData?.captain?.fullname?.lastname ?? 'singh'}
            </h2>
            <h4>  {props.captainData?.captain?.vehicle?.plate ?? 'RJ 07 CE 004'}</h4>
            <p>   {props.captainData?.captain?.vehicle?.vehicleType ?? 'car'}</p>
         
          </div>
        </div>
        <div className="confirmation-info">
          <div className="otp_information">
          <p>OTP is provided don't share with anyone before ride start</p>
          </div>
          <div className="confirm-data">
            <i class="ri-map-pin-time-fill"></i>
            <div className="confirmation-data2">
              
              <p>  {props.captainData?.pickup ?? 'delhi'}</p>
            </div>
          </div>

          <div className="confirm-data">
            <i class="ri-bank-card-2-fill"></i>
            <div className="confirmation-data3">
              <h3>  ₹{props.captainData?.fare ?? '299'}</h3>
              <p>Cash/Online</p>
            </div>
          </div>
          <div className="confirm-data m_for_driver">
            <input type="text" className='message-to-driver' placeholder='Send Message' />
            <input type="button" value="Send" className='send_to_driver' />
          </div>
        </div>
        <div className="otp_section">
            <p>{props.otp ??'X X X X X X' } </p>
        </div>
      </div>
    </div>
  )
}

export default WaitForDriver
